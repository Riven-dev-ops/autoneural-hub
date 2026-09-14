import { cn } from "@/lib/utils";
import type { Priority, ProjectStatus, TaskStatus } from "@/lib/crm/types";
import type { ReactNode } from "react";

const tintMap: Record<string, string> = {
  "bg-primary": "bg-primary text-primary-foreground",
  "bg-accent": "bg-accent text-accent-foreground",
  "bg-foreground": "bg-foreground text-background",
  "bg-success": "bg-success text-success-foreground",
  "bg-warning": "bg-warning text-warning-foreground",
  "bg-destructive": "bg-destructive text-destructive-foreground",
};

export function Avatar({
  initials,
  tint = "bg-primary",
  size = "md",
  className,
}: {
  initials: string;
  tint?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    xs: "size-6 text-[10px]",
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-16 text-lg",
  };
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full font-semibold tracking-tight",
        tintMap[tint] ?? tintMap["bg-primary"],
        sizes[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}

const statusTone: Record<string, string> = {
  Backlog: "bg-muted text-muted-foreground",
  Assigned: "bg-info/15 text-info",
  "In Progress": "bg-primary/12 text-primary",
  Blocked: "bg-destructive/12 text-destructive",
  "In Review": "bg-warning/18 text-warning",
  Approved: "bg-success/15 text-success",
  Completed: "bg-success/15 text-success",
  Planning: "bg-muted text-muted-foreground",
  "On track": "bg-success/15 text-success",
  "At risk": "bg-destructive/12 text-destructive",
  Ahead: "bg-info/15 text-info",
  Archived: "bg-muted text-muted-foreground",
  Active: "bg-success/15 text-success",
  "On Leave": "bg-warning/18 text-warning",
  Deactivated: "bg-muted text-muted-foreground",
  Invited: "bg-info/15 text-info",
  Success: "bg-success/15 text-success",
  Failed: "bg-destructive/12 text-destructive",
  Pending: "bg-warning/18 text-warning",
};

export function StatusPill({
  status,
  className,
}: {
  status: TaskStatus | ProjectStatus | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        statusTone[status] ?? "bg-muted text-muted-foreground",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

const priorityTone: Record<Priority, string> = {
  Low: "text-muted-foreground border-border",
  Medium: "text-info border-info/40",
  High: "text-warning border-warning/50",
  Critical: "text-destructive border-destructive/50",
};

export function PriorityTag({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold",
        priorityTone[priority],
      )}
    >
      {priority}
    </span>
  );
}

export function Meter({ value, className }: { value: number; className?: string }) {
  const tone =
    value >= 100 ? "bg-success" : value >= 50 ? "bg-primary" : value > 0 ? "bg-accent" : "bg-border";
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", tone)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  tone?: "default" | "success" | "warning" | "destructive";
}) {
  const tones = {
    default: "text-primary bg-primary/10",
    success: "text-success bg-success/12",
    warning: "text-warning bg-warning/15",
    destructive: "text-destructive bg-destructive/12",
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="label-xs">{label}</div>
        {icon ? (
          <span className={cn("grid size-8 place-items-center rounded-lg", tones[tone])}>
            {icon}
          </span>
        ) : null}
      </div>
      <div className="num mt-3 text-2xl font-semibold text-foreground">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
      <p className="text-sm font-medium text-foreground">{title}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function relTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.round(diff / 3600000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const dd = Math.round(h / 24);
  return dd === 1 ? "yesterday" : `${dd}d ago`;
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
