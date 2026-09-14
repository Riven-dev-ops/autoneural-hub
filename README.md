# Autoneural Hub

Build a **frontend-only internal CRM web application** for my company, **Autoneural**.

This is a UI/UX prototype for a future production CRM. Focus on creating a polished, modern, responsive frontend with realistic mock data and functional client-side interactions.

**Do not implement a backend, database, Supabase authentication, API integrations, or real email provisioning.** Use mock data and local state where necessary. Every major button and interaction should work visually in the prototype.

---

# 1. Product Overview

The application is called **Autoneural CRM**.

It is an internal company platform for:

* Employee management
* Team and department management
* Project management
* Task assignment
* Progress tracking
* Work reviews
* Reports and analytics
* Notifications
* Role and permission management
* Company administration

The design should feel like a premium modern SaaS application used by a technology and AI company.

Use a clean, professional, minimal interface with excellent spacing, typography, hierarchy, and responsive behavior.

Avoid making it look like a generic template.

---

# 2. Design Direction

Create a modern enterprise dashboard with:

* Clean light theme
* Optional dark mode toggle
* Professional typography
* Subtle borders
* Soft shadows
* Rounded cards
* Clear data visualization
* Consistent spacing
* Responsive layouts
* Accessible contrast
* Smooth but subtle transitions

Use a sophisticated neutral color palette with a distinctive Autoneural accent color.

The interface should feel suitable for a company working in:

* Artificial intelligence
* Software engineering
* Automation
* Research and development
* Technical projects

Use icons consistently throughout the application.

---

# 3. Main Application Layout

Create a responsive dashboard layout with:

### Left Sidebar

* Autoneural logo and name
* Dashboard
* Employees
* Teams & Departments
* Projects
* Tasks
* Calendar
* Reports & Analytics
* Notifications
* Roles & Permissions
* Audit Logs
* Settings

At the bottom of the sidebar:

* Help / Support
* User profile
* Logout

The sidebar should collapse on smaller screens.

### Top Navigation Bar

Include:

* Page title
* Breadcrumbs where appropriate
* Global search
* Notification icon
* Quick-add button
* Theme toggle
* User avatar
* User name
* Current role

---

# 4. Frontend Role Simulation

Create a **role switcher for demo purposes** so the UI can be previewed as different users.

Available demo roles:

1. Founder
2. CTO
3. Technical Lead
4. AI Agents Lead
5. Employee

The role switcher can appear in a development/demo control or user profile menu.

Changing the selected role should update the visible navigation items, dashboard content, and available actions.

### Default Access

Founder, CTO, and Technical Lead:

* Full admin interface

AI Agents Lead:

* Limited admin interface by default

Employee:

* Employee workspace

### Important

This is only a frontend simulation. Do not implement real security or authorization yet.

---

# 5. Full Admin Dashboard

Create a polished admin dashboard for:

* Founder
* CTO
* Technical Lead

Include:

### Summary Cards

* Total Employees
* Active Projects
* Total Tasks
* Completed Tasks
* Overdue Tasks
* Tasks Awaiting Review

### Charts

* Task completion trend
* Project progress overview
* Team workload distribution
* Tasks by status
* Department performance

### Dashboard Sections

* Recent activity
* Upcoming deadlines
* Overdue tasks
* Tasks awaiting review
* Team workload
* Active projects
* Recent employee additions

Use realistic mock data for Autoneural.

Add filters for:

* Date range
* Department
* Team
* Project
* Employee

---

# 6. AI Agents Lead Dashboard

Create a specialized dashboard for the AI Agents Lead.

Include:

* AI-related projects
* AI team members
* AI development tasks
* Model development progress
* Dataset preparation
* Training tasks
* Evaluation tasks
* Deployment tasks
* Blocked tasks
* Tasks awaiting review
* Team workload
* Upcoming deadlines

The layout should feel relevant to an AI-focused technical lead.

If the demo role is granted full system access through the permissions interface, the UI should show the full admin navigation and dashboard.

---

# 7. Employee Dashboard

Create a separate employee workspace.

Include:

### Summary Cards

* My Active Tasks
* Due Today
* Overdue
* In Review
* Completed This Week

### Main Sections

* My tasks
* Today's priorities
* Upcoming deadlines
* Recent activity
* Notifications
* My workload
* Quick progress update

Employees should be able to interact with their tasks through the frontend.

---

# 8. Employee Management

Create an **Employees** page with:

### Header

* Page title
* Search employees
* Filter by department
* Filter by team
* Filter by role
* Filter by status
* Add Employee button

### Employee Table

Columns:

* Employee
* Employee ID
* Email
* Department
* Team
* Role
* Status
* Joined Date
* Actions

### Employee Profile Page

Include:

* Profile header
* Avatar
* Full name
* Job title
* Employee ID
* Official company email
* Department
* Team
* Role
* Joining date
* Employment status

Tabs:

* Overview
* Assigned Tasks
* Projects
* Activity
* Permissions

### Employee Actions

* Edit employee
* Deactivate account
* View profile
* Change role
* Manage permissions
* Reset password (UI only)
* View activity

Use modals or drawers for forms.

---

# 9. Create Employee Flow

Create a polished **Add Employee** modal or page.

Fields:

* Full name
* Employee ID
* Job title
* Department
* Team
* Role
* Phone number
* Joining date
* Employment status
* Email address

### Autoneural Email

The company domain should be shown as:

**@autoneural.com**

Allow the admin to:

* Enter an official Autoneural email
* Generate an email address from the employee's name
* Preview the email address

Example:

`alex@autoneural.com`

Include a small informational note:

> The employee will use their official Autoneural email address to access the CRM. Actual mailbox creation will be handled through the company's email provider.

Add:

* Send Invitation checkbox
* Create Employee button
* Cancel button

Since this is frontend-only, simulate successful creation with a toast notification and update the mock employee list.

---

# 10. Roles & Permissions Page

This is a major feature.

Create a professional **Access Control** interface.

### Roles List

Display:

* Founder
* CTO
* Technical Lead
* AI Agents Lead
* Employee
* Custom Roles

Each role should show:

* Role name
* Description
* Number of users
* Access level
* Edit button

### User Permissions

Create a page where an admin can select an employee and manage their permissions.

Example:

**Employee:** Alex
**Role:** AI Agents Lead

### Access Level Selector

* Full System Access
* Custom Access
* Restricted Access

If **Full System Access** is selected, show a confirmation modal:

> Granting full system access will give this user access to all administrative features.

Buttons:

* Cancel
* Confirm Access

### Custom Permissions

Use grouped permission cards or a clean permission matrix.

#### Employee Management

* View employees
* Add employees
* Edit employees
* Deactivate employees
* Delete employees
* Manage employee roles
* Manage employee permissions

#### Task Management

* View own tasks
* View team tasks
* View all tasks
* Create tasks
* Assign tasks
* Edit tasks
* Delete tasks
* Approve completed tasks

#### Project Management

* View projects
* Create projects
* Edit projects
* Delete projects
* Manage project members

#### Reports

* View own reports
* View team reports
* View department reports
* View company-wide reports
* Export reports

#### System Administration

* Manage roles
* Manage permissions
* Manage system settings
* View audit logs
* Manage integrations

Include:

* Search permissions
* Select all within category
* Reset permissions
* Save Changes button
* Permission history preview

Use realistic interactive toggles and checkboxes.

---

# 11. Teams & Departments

Create a page for managing:

* Departments
* Teams
* Team leads
* Team members

Include:

* Department cards
* Team cards
* Employee counts
* Team workload
* Create department modal
* Create team modal
* Edit team
* View team members

Example departments:

* Engineering
* AI & Research
* Product
* Design
* Operations
* Business Development

---

# 12. Projects Page

Create a project management interface.

### Project List

Include:

* Project name
* Project lead
* Department
* Members
* Progress
* Status
* Priority
* Deadline

Views:

* Grid view
* List view
* Kanban view

### Project Details

Include:

* Project overview
* Progress bar
* Project status
* Project lead
* Team members
* Milestones
* Tasks
* Activity
* Files

### Project Actions

* Create project
* Edit project
* Add members
* Create milestone
* Archive project
* View project report

Use mock projects related to Autoneural's AI and software work.

---

# 13. Task Management

Create a complete task management interface.

### Task Views

* All Tasks
* My Tasks
* Assigned by Me
* Team Tasks
* Overdue
* In Review
* Completed

Include:

* List view
* Kanban board
* Calendar view

### Task Fields

* Task title
* Description
* Project
* Department
* Primary assignee
* Additional assignees
* Created by
* Priority
* Status
* Progress percentage
* Start date
* Due date
* Estimated hours
* Actual hours
* Tags
* Attachments
* Comments
* Subtasks
* Blockers

### Task Statuses

* Backlog
* Assigned
* In Progress
* Blocked
* In Review
* Approved
* Completed

### Task Actions

* Create task
* Assign task
* Reassign task
* Edit task
* Update status
* Update progress
* Add comment
* Upload attachment (UI only)
* Add subtask
* Mark as blocked
* Submit for review
* Approve work
* Archive task

---

# 14. Task Details Page

Create a detailed task page or side panel.

Include:

### Header

* Task title
* Status
* Priority
* Assignee
* Due date
* Progress percentage

### Main Content

* Description
* Subtasks checklist
* Progress update section
* Comments
* Attachments
* Activity timeline

### Progress Update

Allow employees to:

* Change status
* Update percentage
* Add progress note
* Log time
* Mark blocker
* Submit for review

Admins should be able to:

* Edit task
* Reassign task
* Change deadline
* Review submitted work
* Approve or reject work

Use mock interactions and toast notifications.

---

# 15. Calendar

Create a calendar page showing:

* Task deadlines
* Project milestones
* Meetings
* Employee leave
* Upcoming events

Views:

* Month
* Week
* Day

Include:

* Create event button
* Event details modal
* Filter by project
* Filter by employee
* Filter by event type

---

# 16. Reports & Analytics

Create a modern analytics page.

Include:

* Task completion rate
* Average task completion time
* Overdue task percentage
* Project progress
* Team workload
* Employee performance
* Department performance
* Time tracking summary

Add:

* Date range selector
* Department filter
* Team filter
* Project filter
* Export button (frontend-only simulation)

Use charts with realistic mock data.

---

# 17. Notifications

Create a notifications center.

Notification types:

* New task assigned
* Task reassigned
* Deadline approaching
* Task overdue
* Comment mention
* Work approved
* Work rejected
* Permission changed
* Project added
* Company announcement

Include:

* Unread indicator
* Mark as read
* Mark all as read
* Notification filters

---

# 18. Audit Logs

Create an **Audit Logs** page for admins.

Display:

* Timestamp
* User
* Action
* Module
* Description
* IP address (mock)
* Status

Example activities:

* CTO granted full system access to AI Agents Lead
* Technical Lead created a new employee
* Founder created a project
* AI Agents Lead assigned a task
* Employee updated task progress
* Admin changed a user's permissions

Include:

* Search
* Filters
* Date range
* User filter
* Action filter
* View details modal

---

# 19. Settings

Create a settings page with sections:

### Company Settings

* Company name
* Company logo
* Company email domain
* Company information

### Profile Settings

* Name
* Profile photo
* Job title
* Email
* Password UI

### Notification Settings

* Email notifications
* Task reminders
* Deadline alerts
* Mention notifications

### Appearance

* Light mode
* Dark mode
* Theme preferences

### Task Settings

* Default statuses
* Default priorities
* Task workflow

### Email Settings

* Company email domain
* Invitation email preview
* Email provider information
* Mailbox provisioning note

---

# 20. UI Components & Interactions

Create reusable components for:

* Sidebar
* Topbar
* Dashboard cards
* Data tables
* Search bars
* Filter dropdowns
* Tabs
* Modals
* Drawers
* Forms
* Toast notifications
* Confirmation dialogs
* Status badges
* Priority badges
* Progress bars
* Avatars
* Charts
* Empty states
* Loading states

All major interactions should work in the frontend using mock data and local state.

Examples:

* Add employee → employee appears in table
* Create task → task appears in task list
* Assign task → assignee updates
* Update progress → progress bar changes
* Change role → role badge updates
* Grant permission → permission toggle updates
* Grant full access → dashboard/navigation changes
* Mark notification as read → unread count changes

---

# 21. Demo Data

Use realistic mock data for Autoneural.

Create sample users:

* Founder
* CTO
* Technical Lead
* AI Agents Lead
* Software Engineer
* AI Researcher
* ML Engineer
* Backend Developer
* Frontend Developer
* Product Manager
* Designer

Create sample projects such as:

* AI Customer Support Agent
* Neural Automation Platform
* Internal CRM Development
* Model Evaluation Pipeline
* Data Processing Infrastructure

Create realistic tasks, teams, departments, notifications, and activity logs.

---

# 22. Important Frontend-Only Constraints

* Do not build a backend.
* Do not connect Supabase.
* Do not implement real authentication.
* Do not implement real email sending.
* Do not implement real mailbox creation.
* Do not use fake API calls that imply a working backend.
* Use mock data and local state.
* Make the prototype visually complete and interactive.
* Keep the code organized so a backend can be integrated later.

The final result should look like a **real, polished internal CRM product**, not a basic dashboard mockup.

Prioritize:

1. Excellent UI/UX
2. Clear navigation
3. Role-based frontend views
4. Employee management
5. Task management
6. Permission management
7. Responsive design
8. Consistent visual system
9. Realistic mock data
10. Smooth interactions

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/89242c21-be97-47be-bcad-5df58a54f9d1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
