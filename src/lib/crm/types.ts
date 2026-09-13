export type RoleName =
  | "Founder"
  | "CTO"
  | "Technical Lead"
  | "AI Agents Lead"
  | "Employee";

export type AccessLevel = "Full System Access" | "Custom Access" | "Restricted Access";

export type EmploymentStatus = "Active" | "On Leave" | "Deactivated" | "Invited";

export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  jobTitle: string;
  department: string;
  team: string;
  role: RoleName;
  status: EmploymentStatus;
  joined: string;
  phone: string;
  initials: string;
  tint: string;
}

export type TaskStatus =
  | "Backlog"
  | "Assigned"
  | "In Progress"
  | "Blocked"
  | "In Review"
  | "Approved"
  | "Completed";

export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  body: string;
  at: string;
}

export interface ActivityEntry {
  id: string;
  text: string;
  at: string;
  kind: "status" | "comment" | "progress" | "assign" | "create";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  department: string;
  assigneeId: string;
  collaboratorIds: string[];
  createdById: string;
  priority: Priority;
  status: TaskStatus;
  progress: number;
  startDate: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  attachments: { id: string; name: string; size: string }[];
  subtasks: Subtask[];
  comments: Comment[];
  activity: ActivityEntry[];
  blocker?: string;
}

export type ProjectStatus = "Planning" | "On track" | "At risk" | "Ahead" | "Completed" | "Archived";

export interface Milestone {
  id: string;
  title: string;
  due: string;
  done: boolean;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  summary: string;
  leadId: string;
  department: string;
  memberIds: string[];
  progress: number;
  status: ProjectStatus;
  priority: Priority;
  deadline: string;
  milestones: Milestone[];
  files: { id: string; name: string; size: string; by: string }[];
  ai: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headId: string;
  teams: string[];
}

export interface Team {
  id: string;
  name: string;
  department: string;
  leadId: string;
  memberIds: string[];
  workload: number;
  focus: string;
}

export type NotificationType =
  | "Task assigned"
  | "Task reassigned"
  | "Deadline approaching"
  | "Task overdue"
  | "Mention"
  | "Work approved"
  | "Work rejected"
  | "Permission changed"
  | "Project added"
  | "Announcement";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  at: string;
  read: boolean;
  forRole?: RoleName[];
}

export interface AuditLog {
  id: string;
  at: string;
  userId: string;
  action: string;
  module: string;
  description: string;
  ip: string;
  status: "Success" | "Failed" | "Pending";
}

export type EventType = "Deadline" | "Milestone" | "Meeting" | "Leave" | "Event";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: EventType;
  projectId?: string;
  employeeId?: string;
}

export interface PermissionDef {
  key: string;
  label: string;
}

export interface PermissionGroup {
  key: string;
  label: string;
  permissions: PermissionDef[];
}

export interface RoleDef {
  name: RoleName | string;
  description: string;
  accessLevel: AccessLevel;
  custom?: boolean;
  defaults: string[];
}
