import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  CURRENT_USER_BY_ROLE,
  auditLogs as seedLogs,
  calendarEvents as seedEvents,
  employees as seedEmployees,
  notifications as seedNotifications,
  projects as seedProjects,
  roleDefs,
  tasks as seedTasks,
  teams as seedTeams,
  departments as seedDepartments,
  ago,
} from "./data";
import type {
  AppNotification,
  AuditLog,
  CalendarEvent,
  Employee,
  Project,
  RoleName,
  Task,
  TaskStatus,
} from "./types";

let seq = 1000;
const uid = (p: string) => `${p}${++seq}`;
const nowIso = () => new Date().toISOString();

interface CrmState {
  role: RoleName | string;
  setRole: (r: RoleName | string) => void;
  currentUser: Employee;
  employees: Employee[];
  teams: typeof seedTeams;
  departments: typeof seedDepartments;
  tasks: Task[];
  projects: Project[];
  notifications: AppNotification[];
  logs: AuditLog[];
  events: CalendarEvent[];
  rolePermissions: Record<string, string[]>;
  can: (key: string) => boolean;
  scopedTasks: Task[];
  addEmployee: (e: Omit<Employee, "id" | "initials" | "tint" | "employeeId">) => void;
  updateEmployee: (id: string, patch: Partial<Employee>) => void;
  addTask: (t: Partial<Task> & { title: string; assigneeId: string; projectId: string }) => void;
  updateTask: (id: string, patch: Partial<Task>, note?: string) => void;
  setTaskStatus: (id: string, status: TaskStatus) => void;
  addComment: (id: string, body: string) => void;
  addProject: (p: Partial<Project> & { name: string }) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  toggleRolePermission: (role: string, key: string) => void;
  setRolePermissions: (role: string, keys: string[]) => void;
  addEvent: (e: Omit<CalendarEvent, "id">) => void;
  log: (action: string, module: string, description: string) => void;
}

const Ctx = createContext<CrmState | null>(null);

const tints = ["indigo", "cyan", "emerald", "amber", "rose", "violet"];

export function CrmProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<RoleName | string>("Founder");
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees);
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);
  const [logs, setLogs] = useState<AuditLog[]>(seedLogs);
  const [events, setEvents] = useState<CalendarEvent[]>(seedEvents);
  const [rolePermissions, setRolePerms] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(roleDefs.map((r) => [r.name, [...r.defaults]])),
  );

  const currentUser =
    employees.find((e) => e.id === CURRENT_USER_BY_ROLE[role as string]) ?? employees[0];

  const value = useMemo<CrmState>(() => {
    const perms = rolePermissions[role] ?? [];
    const can = (key: string) => perms.includes(key);

    const log = (action: string, module: string, description: string) =>
      setLogs((prev) => [
        {
          id: uid("l"),
          at: nowIso(),
          userId: currentUser.id,
          action,
          module,
          description,
          ip: "10.4.19.22",
          status: "Success",
        },
        ...prev,
      ]);

    const scopedTasks = can("tasks.view.all")
      ? tasks
      : can("tasks.view.team")
        ? tasks.filter((t) => {
            const a = employees.find((e) => e.id === t.assigneeId);
            return (
              t.assigneeId === currentUser.id ||
              a?.department === currentUser.department ||
              t.collaboratorIds.includes(currentUser.id)
            );
          })
        : tasks.filter(
            (t) => t.assigneeId === currentUser.id || t.collaboratorIds.includes(currentUser.id),
          );

    const touch = (t: Task, text: string, kind: "status" | "comment" | "progress" | "assign") => ({
      ...t,
      activity: [{ id: uid("a"), text, at: nowIso(), kind }, ...t.activity],
    });

    return {
      role,
      setRole: (r) => {
        setRole(r);
      },
      currentUser,
      employees,
      teams: seedTeams,
      departments: seedDepartments,
      tasks,
      projects,
      notifications,
      logs,
      events,
      rolePermissions,
      can,
      scopedTasks,
      log,
      addEmployee: (e) => {
        const id = uid("e");
        const initials = e.name
          .split(" ")
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();
        const next: Employee = {
          ...e,
          id,
          employeeId: `AN-${1000 + employees.length + 1}`,
          initials,
          tint: tints[employees.length % tints.length],
        };
        setEmployees((prev) => [next, ...prev]);
        log("employee.create", "Employees", `Created employee ${e.name} (${next.employeeId})`);
      },
      updateEmployee: (id, patch) => {
        setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
        const name = employees.find((e) => e.id === id)?.name ?? id;
        log("employee.update", "Employees", `Updated ${name}`);
      },
      addTask: (t) => {
        const id = uid("t");
        const task: Task = {
          id,
          title: t.title,
          description: t.description ?? "",
          projectId: t.projectId,
          department: t.department ?? currentUser.department,
          assigneeId: t.assigneeId,
          collaboratorIds: t.collaboratorIds ?? [],
          createdById: currentUser.id,
          priority: t.priority ?? "Medium",
          status: "Assigned",
          progress: 0,
          startDate: t.startDate ?? new Date().toISOString().slice(0, 10),
          dueDate: t.dueDate ?? new Date().toISOString().slice(0, 10),
          estimatedHours: t.estimatedHours ?? 8,
          actualHours: 0,
          tags: t.tags ?? [],
          attachments: [],
          subtasks: [],
          comments: [],
          activity: [{ id: uid("a"), text: "Task created", at: nowIso(), kind: "create" }],
        };
        setTasks((prev) => [task, ...prev]);
        log("task.create", "Tasks", `Created task ${t.title}`);
      },
      updateTask: (id, patch, note) => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? note
                ? touch({ ...t, ...patch }, note, patch.progress !== undefined ? "progress" : "assign")
                : { ...t, ...patch }
              : t,
          ),
        );
        if (note) log("task.update", "Tasks", note);
      },
      setTaskStatus: (id, status) => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? touch(
                  {
                    ...t,
                    status,
                    progress:
                      status === "Completed" || status === "Approved" ? 100 : t.progress,
                  },
                  `Status changed to ${status}`,
                  "status",
                )
              : t,
          ),
        );
        const title = tasks.find((t) => t.id === id)?.title ?? id;
        log("task.status", "Tasks", `${title} moved to ${status}`);
      },
      addComment: (id, body) => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? touch(
                  {
                    ...t,
                    comments: [
                      ...t.comments,
                      { id: uid("c"), authorId: currentUser.id, body, at: nowIso() },
                    ],
                  },
                  `${currentUser.name} commented`,
                  "comment",
                )
              : t,
          ),
        );
      },
      addProject: (p) => {
        const id = uid("p");
        const project: Project = {
          id,
          name: p.name,
          code: p.code ?? p.name.slice(0, 3).toUpperCase(),
          summary: p.summary ?? "",
          leadId: p.leadId ?? currentUser.id,
          department: p.department ?? currentUser.department,
          memberIds: p.memberIds ?? [currentUser.id],
          progress: 0,
          status: "Planning",
          priority: p.priority ?? "Medium",
          deadline: p.deadline ?? new Date().toISOString().slice(0, 10),
          milestones: [],
          files: [],
          ai: p.ai ?? false,
        };
        setProjects((prev) => [project, ...prev]);
        log("project.create", "Projects", `Created project ${p.name}`);
      },
      updateProject: (id, patch) =>
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))),
      markRead: (id) =>
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))),
      markAllRead: () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
      toggleRolePermission: (r, key) =>
        setRolePerms((prev) => {
          const cur = prev[r] ?? [];
          return {
            ...prev,
            [r]: cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key],
          };
        }),
      setRolePermissions: (r, keys) => setRolePerms((prev) => ({ ...prev, [r]: keys })),
      addEvent: (e) => setEvents((prev) => [...prev, { ...e, id: uid("c") }]),
    };
  }, [role, employees, tasks, projects, notifications, logs, events, rolePermissions, currentUser]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCrm() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCrm must be used inside CrmProvider");
  return ctx;
}

export { ago };
