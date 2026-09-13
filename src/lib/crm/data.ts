import type {
  ActivityEntry,
  AppNotification,
  AuditLog,
  CalendarEvent,
  Department,
  Employee,
  PermissionGroup,
  Project,
  RoleDef,
  Task,
  Team,
} from "./types";

/** Deterministic per-day anchor so mock data always looks current. */
const anchor = new Date();
anchor.setHours(12, 0, 0, 0);

export function d(offsetDays: number): string {
  const dt = new Date(anchor);
  dt.setDate(dt.getDate() + offsetDays);
  return dt.toISOString().slice(0, 10);
}

export function ago(hours: number): string {
  const dt = new Date(anchor);
  dt.setHours(dt.getHours() - hours);
  return dt.toISOString();
}

export const COMPANY = {
  name: "Autoneural",
  domain: "autoneural.com",
  tagline: "Applied AI systems & automation",
  version: "v2.4.1",
};

export const DEPARTMENT_NAMES = [
  "Engineering",
  "AI & Research",
  "Product",
  "Design",
  "Operations",
  "Business Development",
];

const tints = [
  "bg-primary",
  "bg-accent",
  "bg-foreground",
  "bg-success",
  "bg-warning",
  "bg-destructive",
];

function emp(
  i: number,
  name: string,
  jobTitle: string,
  department: string,
  team: string,
  role: Employee["role"],
  joinedOffset: number,
  status: Employee["status"] = "Active",
): Employee {
  const local = name.split(" ")[0].toLowerCase();
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return {
    id: `e${i}`,
    name,
    employeeId: `AN-${String(1000 + i)}`,
    email: `${local}@${COMPANY.domain}`,
    jobTitle,
    department,
    team,
    role,
    status,
    joined: d(joinedOffset),
    phone: `+1 (415) 555-0${String(100 + i)}`,
    initials,
    tint: tints[i % tints.length],
  };
}

export const employees: Employee[] = [
  emp(1, "Aria Voss", "Chief Technology Officer", "Engineering", "Platform Core", "CTO", -1180),
  emp(2, "Rohan Mehta", "Founder & CEO", "Operations", "Leadership", "Founder", -1460),
  emp(3, "Marcus Kane", "Technical Lead", "Engineering", "Platform Core", "Technical Lead", -880),
  emp(4, "Alex Ferran", "AI Agents Lead", "AI & Research", "Agents Lab", "AI Agents Lead", -640),
  emp(5, "Priya Talwar", "Senior AI Researcher", "AI & Research", "Agents Lab", "Employee", -540),
  emp(6, "Leo Duarte", "ML Engineer", "AI & Research", "Model Ops", "Employee", -300),
  emp(7, "Hana Sato", "ML Engineer", "AI & Research", "Model Ops", "Employee", -410),
  emp(8, "Jonas Weber", "Backend Developer", "Engineering", "Platform Core", "Employee", -720),
  emp(9, "Riya Shah", "Frontend Developer", "Engineering", "Interfaces", "Employee", -260),
  emp(10, "Tomas Petrov", "Data Engineer", "Engineering", "Data Infrastructure", "Employee", -480),
  emp(11, "Elena Nunez", "Product Manager", "Product", "Product Core", "Employee", -600),
  emp(12, "Kai Okafor", "Product Designer", "Design", "Design Studio", "Employee", -210),
  emp(13, "Mira Lindqvist", "Design Lead", "Design", "Design Studio", "Employee", -760),
  emp(14, "Daniel Osei", "DevOps Engineer", "Engineering", "Data Infrastructure", "Employee", -150),
  emp(15, "Sofia Bianchi", "Operations Manager", "Operations", "Business Ops", "Employee", -520),
  emp(16, "Noah Greenberg", "Partnerships Manager", "Business Development", "Growth", "Employee", -95),
  emp(17, "Yuki Tanaka", "Research Scientist", "AI & Research", "Agents Lab", "Employee", -45),
  emp(18, "Clara Mendes", "QA Engineer", "Engineering", "Interfaces", "Employee", -330, "On Leave"),
];

export const CURRENT_USER_BY_ROLE: Record<string, string> = {
  Founder: "e2",
  CTO: "e1",
  "Technical Lead": "e3",
  "AI Agents Lead": "e4",
  Employee: "e6",
};

export const departments: Department[] = [
  {
    id: "d1",
    name: "Engineering",
    description: "Platform, infrastructure and product engineering.",
    headId: "e1",
    teams: ["Platform Core", "Interfaces", "Data Infrastructure"],
  },
  {
    id: "d2",
    name: "AI & Research",
    description: "Agent systems, model training and evaluation research.",
    headId: "e4",
    teams: ["Agents Lab", "Model Ops"],
  },
  {
    id: "d3",
    name: "Product",
    description: "Roadmap, discovery and delivery coordination.",
    headId: "e11",
    teams: ["Product Core"],
  },
  {
    id: "d4",
    name: "Design",
    description: "Product design, design systems and research.",
    headId: "e13",
    teams: ["Design Studio"],
  },
  {
    id: "d5",
    name: "Operations",
    description: "People operations, finance and internal tooling.",
    headId: "e15",
    teams: ["Business Ops", "Leadership"],
  },
  {
    id: "d6",
    name: "Business Development",
    description: "Partnerships, pilots and enterprise relationships.",
    headId: "e16",
    teams: ["Growth"],
  },
];

export const teams: Team[] = [
  {
    id: "t1",
    name: "Platform Core",
    department: "Engineering",
    leadId: "e3",
    memberIds: ["e1", "e3", "e8"],
    workload: 78,
    focus: "Core services, APIs and auth",
  },
  {
    id: "t2",
    name: "Interfaces",
    department: "Engineering",
    leadId: "e9",
    memberIds: ["e9", "e18"],
    workload: 64,
    focus: "Web clients and internal tooling",
  },
  {
    id: "t3",
    name: "Data Infrastructure",
    department: "Engineering",
    leadId: "e10",
    memberIds: ["e10", "e14"],
    workload: 71,
    focus: "Pipelines, warehousing and compute",
  },
  {
    id: "t4",
    name: "Agents Lab",
    department: "AI & Research",
    leadId: "e4",
    memberIds: ["e4", "e5", "e17"],
    workload: 92,
    focus: "Autonomous agent architecture",
  },
  {
    id: "t5",
    name: "Model Ops",
    department: "AI & Research",
    leadId: "e7",
    memberIds: ["e6", "e7"],
    workload: 85,
    focus: "Training, evaluation and deployment",
  },
  {
    id: "t6",
    name: "Product Core",
    department: "Product",
    leadId: "e11",
    memberIds: ["e11"],
    workload: 61,
    focus: "Discovery and delivery",
  },
  {
    id: "t7",
    name: "Design Studio",
    department: "Design",
    leadId: "e13",
    memberIds: ["e12", "e13"],
    workload: 54,
    focus: "Product design and systems",
  },
  {
    id: "t8",
    name: "Business Ops",
    department: "Operations",
    leadId: "e15",
    memberIds: ["e15"],
    workload: 43,
    focus: "Internal operations",
  },
  {
    id: "t9",
    name: "Growth",
    department: "Business Development",
    leadId: "e16",
    memberIds: ["e16"],
    workload: 38,
    focus: "Pilots and partnerships",
  },
  {
    id: "t10",
    name: "Leadership",
    department: "Operations",
    leadId: "e2",
    memberIds: ["e2"],
    workload: 50,
    focus: "Company direction",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    name: "AI Customer Support Agent",
    code: "CSA",
    summary:
      "Production support agent with retrieval grounding, escalation routing and human handoff.",
    leadId: "e4",
    department: "AI & Research",
    memberIds: ["e4", "e5", "e6", "e9", "e12"],
    progress: 72,
    status: "On track",
    priority: "High",
    deadline: d(24),
    ai: true,
    milestones: [
      { id: "m1", title: "Retrieval layer hardened", due: d(-12), done: true },
      { id: "m2", title: "Escalation routing live", due: d(6), done: false },
      { id: "m3", title: "Beta rollout to 3 pilots", due: d(24), done: false },
    ],
    files: [
      { id: "f1", name: "csa-architecture.pdf", size: "2.4 MB", by: "Alex Ferran" },
      { id: "f2", name: "eval-results-v7.csv", size: "812 KB", by: "Priya Talwar" },
    ],
  },
  {
    id: "p2",
    name: "Neural Automation Platform",
    code: "NAP",
    summary: "Workflow automation runtime that orchestrates model calls across customer systems.",
    leadId: "e3",
    department: "Engineering",
    memberIds: ["e3", "e8", "e10", "e14", "e11"],
    progress: 45,
    status: "At risk",
    priority: "Critical",
    deadline: d(41),
    ai: false,
    milestones: [
      { id: "m4", title: "Runtime scheduler v1", due: d(-3), done: true },
      { id: "m5", title: "Connector SDK", due: d(15), done: false },
      { id: "m6", title: "Multi-tenant isolation", due: d(41), done: false },
    ],
    files: [{ id: "f3", name: "nap-runtime-spec.md", size: "146 KB", by: "Marcus Kane" }],
  },
  {
    id: "p3",
    name: "Internal CRM Development",
    code: "CRM",
    summary: "Company-wide platform for employees, projects, tasks and access control.",
    leadId: "e11",
    department: "Product",
    memberIds: ["e11", "e9", "e12", "e13", "e18"],
    progress: 58,
    status: "On track",
    priority: "Medium",
    deadline: d(33),
    ai: false,
    milestones: [
      { id: "m7", title: "Design system locked", due: d(-8), done: true },
      { id: "m8", title: "Permissions module", due: d(9), done: false },
      { id: "m9", title: "Release candidate", due: d(33), done: false },
    ],
    files: [{ id: "f4", name: "crm-flows.fig", size: "18 MB", by: "Mira Lindqvist" }],
  },
  {
    id: "p4",
    name: "Model Evaluation Pipeline",
    code: "MEP",
    summary: "Automated benchmark harness for agent quality, safety and regression tracking.",
    leadId: "e7",
    department: "AI & Research",
    memberIds: ["e7", "e6", "e17", "e5"],
    progress: 88,
    status: "Ahead",
    priority: "High",
    deadline: d(11),
    ai: true,
    milestones: [
      { id: "m10", title: "Benchmark suite v3", due: d(-2), done: true },
      { id: "m11", title: "Nightly regression runs", due: d(11), done: false },
    ],
    files: [{ id: "f5", name: "benchmark-v3.json", size: "3.1 MB", by: "Hana Sato" }],
  },
  {
    id: "p5",
    name: "Data Processing Infrastructure",
    code: "DPI",
    summary: "Ingestion, labelling and feature pipelines feeding all training workloads.",
    leadId: "e10",
    department: "Engineering",
    memberIds: ["e10", "e14", "e8"],
    progress: 61,
    status: "On track",
    priority: "Medium",
    deadline: d(52),
    ai: true,
    milestones: [
      { id: "m12", title: "Streaming ingest", due: d(-20), done: true },
      { id: "m13", title: "Labelling console", due: d(18), done: false },
      { id: "m14", title: "Feature store GA", due: d(52), done: false },
    ],
    files: [{ id: "f6", name: "dpi-throughput.xlsx", size: "540 KB", by: "Tomas Petrov" }],
  },
];

let taskSeq = 0;
function task(
  title: string,
  description: string,
  projectId: string,
  assigneeId: string,
  status: Task["status"],
  priority: Task["priority"],
  progress: number,
  dueOffset: number,
  tags: string[],
  extra: Partial<Task> = {},
): Task {
  taskSeq += 1;
  const project = projects.find((p) => p.id === projectId)!;
  const id = `k${taskSeq}`;
  const activity: ActivityEntry[] = [
    { id: `${id}-a1`, text: "Task created", at: ago(72 + taskSeq), kind: "create" },
    { id: `${id}-a2`, text: `Assigned to ${employees.find((e) => e.id === assigneeId)?.name}`, at: ago(70 + taskSeq), kind: "assign" },
    { id: `${id}-a3`, text: `Status set to ${status}`, at: ago(6 + taskSeq), kind: "status" },
  ];
  return {
    id,
    title,
    description,
    projectId,
    department: project.department,
    assigneeId,
    collaboratorIds: [],
    createdById: project.leadId,
    priority,
    status,
    progress,
    startDate: d(dueOffset - 14),
    dueDate: d(dueOffset),
    estimatedHours: 8 + (taskSeq % 5) * 6,
    actualHours: Math.round(((8 + (taskSeq % 5) * 6) * progress) / 100),
    tags,
    attachments: [],
    subtasks: [
      { id: `${id}-s1`, title: "Scope and write approach note", done: progress > 20 },
      { id: `${id}-s2`, title: "Implementation", done: progress > 60 },
      { id: `${id}-s3`, title: "Review and handoff", done: progress >= 100 },
    ],
    comments: [],
    activity,
    ...extra,
  };
}

export const tasks: Task[] = [
  task("Tune RAG retrieval thresholds", "Recall dropped on long-tail support intents. Re-tune hybrid retrieval weights and re-run eval set.", "p1", "e5", "In Progress", "High", 55, -2, ["retrieval", "quality"]),
  task("Escalation routing rules", "Define deterministic handoff rules for billing and security intents.", "p1", "e4", "In Review", "High", 90, 3, ["agents"]),
  task("Support agent tone guidelines", "Write response tone spec with Design and Product.", "p1", "e12", "Completed", "Low", 100, -6, ["content"]),
  task("Latency budget instrumentation", "Trace per-hop latency across retrieval, planner and generation.", "p1", "e6", "Assigned", "Medium", 10, 9, ["observability"]),
  task("Pilot onboarding checklist", "Prepare rollout checklist for three pilot accounts.", "p1", "e9", "Backlog", "Medium", 0, 17, ["rollout"]),
  task("Connector SDK scaffolding", "Public interface for third-party workflow connectors.", "p2", "e8", "In Progress", "Critical", 40, 7, ["sdk", "platform"]),
  task("Runtime scheduler backpressure", "Queue saturates under burst load; add backpressure and retry policy.", "p2", "e3", "Blocked", "Critical", 35, -1, ["runtime"], { blocker: "Waiting on capacity approval from Operations for the load-test cluster." }),
  task("Multi-tenant isolation review", "Security review of tenant boundaries in the runtime.", "p2", "e14", "Assigned", "High", 15, 12, ["security"]),
  task("Provision training compute cluster", "Reserve GPU capacity for Q4 training runs.", "p2", "e10", "In Progress", "High", 60, -1, ["infra"]),
  task("Workflow templates library", "Ship ten starter automation templates.", "p2", "e11", "Backlog", "Low", 0, 26, ["content"]),
  task("Permissions matrix UI", "Grouped permission cards with category select-all.", "p3", "e9", "In Progress", "High", 65, 4, ["frontend"]),
  task("Resolve auth token drift bug", "Sessions expire early for users in non-UTC timezones.", "p3", "e18", "Blocked", "High", 45, -3, ["bug"], { blocker: "Reproduction only occurs on staging; awaiting logs access." }),
  task("Employee directory filters", "Department, team, role and status filters on the employees table.", "p3", "e9", "Completed", "Medium", 100, -5, ["frontend"]),
  task("Audit log retention policy", "Decide retention window and export format.", "p3", "e15", "In Review", "Medium", 85, 2, ["policy"]),
  task("Reports export formats", "CSV and PDF export for analytics views.", "p3", "e12", "Assigned", "Low", 20, 14, ["reports"]),
  task("Finalize benchmark dataset v3", "Freeze dataset, document provenance and licensing.", "p4", "e7", "In Review", "High", 95, -1, ["dataset", "evaluation"]),
  task("Nightly regression harness", "Schedule nightly runs and publish diff reports.", "p4", "e6", "In Progress", "High", 70, 5, ["evaluation", "training"]),
  task("Safety eval rubric", "Define rubric for refusal quality and harmful output detection.", "p4", "e17", "Assigned", "Critical", 25, 8, ["evaluation", "safety"]),
  task("Model card automation", "Generate model cards from run metadata.", "p4", "e5", "Backlog", "Low", 0, 21, ["training"]),
  task("Deploy eval dashboard", "Internal dashboard for run comparisons.", "p4", "e6", "Approved", "Medium", 100, -4, ["deployment"]),
  task("Streaming ingest backfill", "Backfill six months of historical events.", "p5", "e10", "In Progress", "Medium", 50, 10, ["pipeline", "dataset"]),
  task("Labelling console MVP", "Internal console for dataset labelling workflows.", "p5", "e14", "Assigned", "High", 30, 16, ["dataset"]),
  task("Feature store schema review", "Review schema with AI & Research before GA.", "p5", "e8", "Backlog", "Medium", 0, 29, ["pipeline"]),
  task("Cost monitoring alerts", "Alert when pipeline spend exceeds daily budget.", "p5", "e14", "Completed", "Low", 100, -9, ["infra"]),
  task("Agent planner refactor", "Split planner into deterministic and model-driven stages.", "p1", "e17", "In Progress", "High", 45, 6, ["agents", "training"]),
  task("Weekly AI progress digest", "Summarise model and agent progress for leadership.", "p4", "e4", "Assigned", "Low", 35, 1, ["reporting"]),
];

export const notifications: AppNotification[] = [
  { id: "n1", type: "Task assigned", title: "New task assigned", body: "Safety eval rubric was assigned to you by Hana Sato.", at: ago(1), read: false },
  { id: "n2", type: "Deadline approaching", title: "Deadline in 2 days", body: "Escalation routing rules is due soon on AI Customer Support Agent.", at: ago(3), read: false },
  { id: "n3", type: "Task overdue", title: "Task overdue", body: "Tune RAG retrieval thresholds is 2 days past its due date.", at: ago(5), read: false },
  { id: "n4", type: "Work approved", title: "Work approved", body: "Aria Voss approved Deploy eval dashboard.", at: ago(9), read: false },
  { id: "n5", type: "Mention", title: "You were mentioned", body: "Marcus Kane mentioned you on Connector SDK scaffolding.", at: ago(12), read: false },
  { id: "n6", type: "Permission changed", title: "Permissions updated", body: "Alex Ferran was granted additional report permissions.", at: ago(20), read: true },
  { id: "n7", type: "Work rejected", title: "Changes requested", body: "Audit log retention policy was sent back with comments.", at: ago(26), read: true },
  { id: "n8", type: "Project added", title: "New project", body: "Data Processing Infrastructure was created by Rohan Mehta.", at: ago(38), read: true },
  { id: "n9", type: "Announcement", title: "Company announcement", body: "All-hands moved to Thursday 16:00 in the main room.", at: ago(44), read: true },
  { id: "n10", type: "Task reassigned", title: "Task reassigned", body: "Labelling console MVP moved from Tomas Petrov to Daniel Osei.", at: ago(52), read: true },
];

export const auditLogs: AuditLog[] = [
  { id: "l1", at: ago(1), userId: "e1", action: "permission.grant", module: "Roles & Permissions", description: "Granted full system access to Alex Ferran (AI Agents Lead)", ip: "10.4.19.22", status: "Success" },
  { id: "l2", at: ago(3), userId: "e3", action: "employee.create", module: "Employees", description: "Created employee Yuki Tanaka (AN-1017)", ip: "10.4.19.8", status: "Success" },
  { id: "l3", at: ago(6), userId: "e2", action: "project.create", module: "Projects", description: "Created project Data Processing Infrastructure", ip: "10.4.11.3", status: "Success" },
  { id: "l4", at: ago(9), userId: "e4", action: "task.assign", module: "Tasks", description: "Assigned Safety eval rubric to Yuki Tanaka", ip: "10.4.22.40", status: "Success" },
  { id: "l5", at: ago(12), userId: "e6", action: "task.progress", module: "Tasks", description: "Updated Nightly regression harness progress to 70%", ip: "10.4.22.51", status: "Success" },
  { id: "l6", at: ago(18), userId: "e1", action: "permission.update", module: "Roles & Permissions", description: "Changed Technical Lead role permissions (reports.export enabled)", ip: "10.4.19.22", status: "Success" },
  { id: "l7", at: ago(22), userId: "e9", action: "auth.login", module: "Authentication", description: "Sign-in from new device (Chrome / macOS)", ip: "10.4.30.77", status: "Success" },
  { id: "l8", at: ago(27), userId: "e18", action: "task.block", module: "Tasks", description: "Marked Resolve auth token drift bug as blocked", ip: "10.4.30.12", status: "Pending" },
  { id: "l9", at: ago(34), userId: "e15", action: "settings.update", module: "Settings", description: "Updated company email domain settings", ip: "10.4.9.5", status: "Success" },
  { id: "l10", at: ago(40), userId: "e16", action: "export.download", module: "Reports", description: "Exported department performance report", ip: "10.4.9.19", status: "Failed" },
  { id: "l11", at: ago(48), userId: "e3", action: "employee.deactivate", module: "Employees", description: "Deactivated contractor account AN-0994", ip: "10.4.19.8", status: "Success" },
  { id: "l12", at: ago(56), userId: "e7", action: "task.approve", module: "Tasks", description: "Approved Deploy eval dashboard", ip: "10.4.22.14", status: "Success" },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "c1", title: "Escalation routing sign-off", date: d(3), time: "10:00", type: "Deadline", projectId: "p1", employeeId: "e4" },
  { id: "c2", title: "Benchmark v3 freeze", date: d(-1), time: "17:00", type: "Milestone", projectId: "p4", employeeId: "e7" },
  { id: "c3", title: "Weekly AI sync", date: d(1), time: "09:30", type: "Meeting", projectId: "p4", employeeId: "e4" },
  { id: "c4", title: "Platform architecture review", date: d(2), time: "14:00", type: "Meeting", projectId: "p2", employeeId: "e3" },
  { id: "c5", title: "Clara Mendes — parental leave", date: d(4), type: "Leave", employeeId: "e18" },
  { id: "c6", title: "Connector SDK milestone", date: d(15), type: "Milestone", projectId: "p2", employeeId: "e8" },
  { id: "c7", title: "Company all-hands", date: d(5), time: "16:00", type: "Event" },
  { id: "c8", title: "CRM permissions module due", date: d(9), type: "Deadline", projectId: "p3", employeeId: "e9" },
  { id: "c9", title: "Design critique", date: d(0), time: "11:00", type: "Meeting", projectId: "p3", employeeId: "e13" },
  { id: "c10", title: "Labelling console MVP due", date: d(16), type: "Deadline", projectId: "p5", employeeId: "e14" },
  { id: "c11", title: "Pilot rollout kickoff", date: d(24), time: "13:00", type: "Milestone", projectId: "p1", employeeId: "e4" },
  { id: "c12", title: "Quarterly research review", date: d(7), time: "15:00", type: "Meeting", projectId: "p4", employeeId: "e5" },
];

export const permissionGroups: PermissionGroup[] = [
  {
    key: "employees",
    label: "Employee Management",
    permissions: [
      { key: "employees.view", label: "View employees" },
      { key: "employees.add", label: "Add employees" },
      { key: "employees.edit", label: "Edit employees" },
      { key: "employees.deactivate", label: "Deactivate employees" },
      { key: "employees.delete", label: "Delete employees" },
      { key: "employees.roles", label: "Manage employee roles" },
      { key: "employees.permissions", label: "Manage employee permissions" },
    ],
  },
  {
    key: "tasks",
    label: "Task Management",
    permissions: [
      { key: "tasks.view.own", label: "View own tasks" },
      { key: "tasks.view.team", label: "View team tasks" },
      { key: "tasks.view.all", label: "View all tasks" },
      { key: "tasks.create", label: "Create tasks" },
      { key: "tasks.assign", label: "Assign tasks" },
      { key: "tasks.edit", label: "Edit tasks" },
      { key: "tasks.delete", label: "Delete tasks" },
      { key: "tasks.approve", label: "Approve completed tasks" },
    ],
  },
  {
    key: "projects",
    label: "Project Management",
    permissions: [
      { key: "projects.view", label: "View projects" },
      { key: "projects.create", label: "Create projects" },
      { key: "projects.edit", label: "Edit projects" },
      { key: "projects.delete", label: "Delete projects" },
      { key: "projects.members", label: "Manage project members" },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    permissions: [
      { key: "reports.own", label: "View own reports" },
      { key: "reports.team", label: "View team reports" },
      { key: "reports.department", label: "View department reports" },
      { key: "reports.company", label: "View company-wide reports" },
      { key: "reports.export", label: "Export reports" },
    ],
  },
  {
    key: "system",
    label: "System Administration",
    permissions: [
      { key: "system.roles", label: "Manage roles" },
      { key: "system.permissions", label: "Manage permissions" },
      { key: "system.settings", label: "Manage system settings" },
      { key: "system.audit", label: "View audit logs" },
      { key: "system.integrations", label: "Manage integrations" },
    ],
  },
];

export const allPermissionKeys = permissionGroups.flatMap((g) =>
  g.permissions.map((p) => p.key),
);

const employeeDefaults = [
  "tasks.view.own",
  "tasks.view.team",
  "projects.view",
  "reports.own",
  "employees.view",
];

const aiLeadDefaults = [
  ...employeeDefaults,
  "tasks.view.all",
  "tasks.create",
  "tasks.assign",
  "tasks.edit",
  "tasks.approve",
  "projects.create",
  "projects.edit",
  "projects.members",
  "reports.team",
  "reports.department",
];

export const roleDefs: RoleDef[] = [
  {
    name: "Founder",
    description: "Company owner with unrestricted access to every module.",
    accessLevel: "Full System Access",
    defaults: allPermissionKeys,
  },
  {
    name: "CTO",
    description: "Technology leadership. Full administrative control.",
    accessLevel: "Full System Access",
    defaults: allPermissionKeys,
  },
  {
    name: "Technical Lead",
    description: "Manages engineering delivery, people and project execution.",
    accessLevel: "Full System Access",
    defaults: allPermissionKeys,
  },
  {
    name: "AI Agents Lead",
    description: "Leads AI agent programmes with a limited administrative surface.",
    accessLevel: "Custom Access",
    defaults: aiLeadDefaults,
  },
  {
    name: "Employee",
    description: "Individual contributor workspace scoped to their own work.",
    accessLevel: "Restricted Access",
    defaults: employeeDefaults,
  },
  {
    name: "Research Observer",
    description: "Custom read-only role for visiting researchers and auditors.",
    accessLevel: "Restricted Access",
    custom: true,
    defaults: ["tasks.view.team", "projects.view", "reports.team", "employees.view"],
  },
];

export const trendSeries = Array.from({ length: 14 }).map((_, i) => {
  const completed = [8, 11, 6, 14, 10, 16, 12, 19, 9, 15, 12, 17, 13, 21][i];
  const review = [3, 4, 2, 5, 3, 6, 4, 7, 2, 5, 3, 6, 4, 7][i];
  return { day: d(i - 13).slice(5), completed, review };
});

export const departmentPerformance = [
  { department: "Engineering", completion: 82, onTime: 76 },
  { department: "AI & Research", completion: 74, onTime: 68 },
  { department: "Product", completion: 88, onTime: 84 },
  { department: "Design", completion: 91, onTime: 89 },
  { department: "Operations", completion: 79, onTime: 81 },
  { department: "Business Dev", completion: 70, onTime: 72 },
];

export const timeTracking = [
  { week: "W-5", estimated: 320, actual: 298 },
  { week: "W-4", estimated: 340, actual: 361 },
  { week: "W-3", estimated: 355, actual: 330 },
  { week: "W-2", estimated: 370, actual: 392 },
  { week: "W-1", estimated: 362, actual: 344 },
  { week: "This", estimated: 380, actual: 251 },
];
