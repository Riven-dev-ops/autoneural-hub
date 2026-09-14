import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  FolderKanban,
  Gauge,
  ListChecks,
  Menu,
  Moon,
  PieChart,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, roleDefs } from "@/lib/crm/data";
import { useCrm } from "@/lib/crm/store";
import { Avatar, relTime } from "./bits";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const NAV = [
  { to: "/", label: "Dashboard", icon: Gauge, perm: null },
  { to: "/tasks", label: "Tasks", icon: ListChecks, perm: "tasks.view.own" },
  { to: "/projects", label: "Projects", icon: FolderKanban, perm: "projects.view" },
  { to: "/employees", label: "Employees", icon: Users, perm: "employees.view" },
  { to: "/teams", label: "Teams", icon: UsersRound, perm: "employees.view" },
  { to: "/calendar", label: "Calendar", icon: CalendarDays, perm: null },
  { to: "/reports", label: "Reports", icon: PieChart, perm: "reports.own" },
] as const;

const ADMIN_NAV = [
  { to: "/permissions", label: "Roles & Permissions", icon: ShieldCheck, perm: "system.roles" },
  { to: "/audit", label: "Audit Logs", icon: ScrollText, perm: "system.audit" },
  { to: "/settings", label: "Settings", icon: Settings, perm: null },
] as const;

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return [dark, setDark] as const;
}

export function AppShell({ children }: { children: ReactNode }) {
  const crm = useCrm();
  const [open, setOpen] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [dark, setDark] = useDark();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmd((v) => !v);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const unread = crm.notifications.filter((n) => !n.read).length;
  const visible = NAV.filter((n) => !n.perm || crm.can(n.perm));
  const admin = ADMIN_NAV.filter((n) => !n.perm || crm.can(n.perm));

  const sidebar = (
    <div className="flex h-full flex-col gap-1 border-r border-sidebar-border bg-sidebar px-3 py-4">
      <Link to="/" className="mb-4 flex items-center gap-2.5 px-2">
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          AN
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-sidebar-foreground">
            {COMPANY.name}
          </span>
          <span className="block text-[11px] text-muted-foreground">Internal CRM</span>
        </span>
      </Link>

      <nav className="flex flex-col gap-0.5">
        {visible.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
          >
            <n.icon className="size-4" />
            {n.label}
          </Link>
        ))}
      </nav>

      {admin.length ? (
        <>
          <div className="label-xs mt-5 px-3 pb-1">Administration</div>
          <nav className="flex flex-col gap-0.5">
            {admin.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
              >
                <n.icon className="size-4" />
                {n.label}
              </Link>
            ))}
          </nav>
        </>
      ) : null}

      <div className="mt-auto rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
        <div className="label-xs">Viewing as</div>
        <DropdownMenu>
          <DropdownMenuTrigger className="mt-2 flex w-full items-center gap-2 rounded-lg bg-card px-2 py-2 text-left text-sm ring-1 ring-border transition-colors hover:bg-muted">
            <Avatar initials={crm.currentUser.initials} tint={crm.currentUser.tint} size="sm" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-xs font-semibold text-foreground">
                {crm.currentUser.name}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">{crm.role}</span>
            </span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            <DropdownMenuLabel>Switch role (prototype)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roleDefs
              .filter((r) => !r.custom)
              .map((r) => (
                <DropdownMenuItem key={r.name} onSelect={() => crm.setRole(r.name)}>
                  <span className="flex-1">{r.name}</span>
                  {crm.role === r.name ? (
                    <span className="text-[11px] text-primary">current</span>
                  ) : null}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="mt-2 text-[11px] text-muted-foreground">
          {COMPANY.version} · frontend prototype
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64">{sidebar}</div>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>

          <button
            onClick={() => setCmd(true)}
            className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-muted sm:max-w-md"
          >
            <Search className="size-4" />
            <span className="flex-1 text-left">Search tasks, people, projects…</span>
            <kbd className="num hidden rounded border border-border px-1.5 text-[10px] sm:inline">
              ⌘K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Theme">
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="size-5" />
                  {unread ? (
                    <span className="num absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                      {unread}
                    </span>
                  ) : null}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  <button
                    className="text-[11px] font-medium text-primary hover:underline"
                    onClick={() => crm.markAllRead()}
                  >
                    Mark all read
                  </button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {crm.notifications.slice(0, 5).map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className="items-start gap-2"
                    onSelect={() => crm.markRead(n.id)}
                  >
                    <span
                      className={cn(
                        "mt-1.5 size-1.5 shrink-0 rounded-full",
                        n.read ? "bg-border" : "bg-primary",
                      )}
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-foreground">{n.title}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {n.body}
                      </span>
                      <span className="block text-[10px] text-muted-foreground">
                        {relTime(n.at)}
                      </span>
                    </span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/notifications" className="justify-center text-xs font-medium">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="ml-1">
                <Avatar
                  initials={crm.currentUser.initials}
                  tint={crm.currentUser.tint}
                  size="sm"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="leading-tight">
                  {crm.currentUser.name}
                  <span className="block text-[11px] font-normal text-muted-foreground">
                    {crm.currentUser.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/employees/$id" params={{ id: crm.currentUser.id }}>
                    My profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>

      <CommandDialog open={cmd} onOpenChange={setCmd}>
        <CommandInput placeholder="Search across Autoneural…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {[...visible, ...admin].map((n) => (
              <CommandItem key={n.to} value={n.label} asChild onSelect={() => setCmd(false)}>
                <Link to={n.to}>
                  <n.icon className="mr-2 size-4" />
                  {n.label}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="People">
            {crm.employees.slice(0, 6).map((e) => (
              <CommandItem key={e.id} value={e.name} asChild onSelect={() => setCmd(false)}>
                <Link to="/employees/$id" params={{ id: e.id }}>
                  {e.name}
                  <span className="ml-2 text-xs text-muted-foreground">{e.jobTitle}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Projects">
            {crm.projects.map((p) => (
              <CommandItem key={p.id} value={p.name} asChild onSelect={() => setCmd(false)}>
                <Link to="/projects/$id" params={{ id: p.id }}>
                  {p.name}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
