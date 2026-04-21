# Talentou - Product Context & Workflow Documentation

## Overview
Talentou is a comprehensive talent acquisition platform with role-based access control. It streamlines the hiring process from job creation to candidate onboarding through AI-assisted workflows.

## Technology Stack
- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui components
- **State Management:** React Context, TanStack Query
- **Routing:** React Router v6

## User Roles

### 1. TA Leader (Talent Acquisition Leader)
- **Primary Routes:** `/sales-plan/*`
- **Dashboard:** `TALeaderDashboard`
- **Responsibilities:**
  - Approve/reject new positions
  - Assign recruiters to jobs
  - Set job priorities (Low/Medium/High)
  - Monitor overall hiring metrics
  - Create and manage TA plans and strategies
  - Review team performance analytics

### 2. Recruiter (TA Associate)
- **Primary Routes:** `/ta-associate/*`
- **Dashboard:** `TAAssociateDashboard`
- **Responsibilities:**
  - Review assigned JDs
  - Set screening questions for candidates
  - Source and manage candidates
  - Coordinate with hiring leads
  - Generate shareable JD links
  - Track candidate pipeline

### 3. Hiring Lead
- **Primary Routes:** `/hiring-lead/*`
- **Dashboard:** `HiringLeadDashboard`
- **Responsibilities:**
  - Create new job positions
  - Define job requirements and skills
  - Nominate interviewers
  - Review candidate progress
  - Make final hiring decisions

### 4. Interviewer
- **Primary Routes:** `/interviewer/*`
- **Dashboard:** `InterviewerDashboard`
- **Responsibilities:**
  - Create interview questionnaires
  - Review interview recordings
  - Evaluate candidates with AI assistance
  - Rate candidate responses
  - Select candidates for next rounds (Face-to-Face)
  - Reject unsuitable candidates

### 5. HR (Human Resources)
- **Primary Routes:** `/hr/*`
- **Dashboard:** `HRDashboard`
- **Responsibilities:**
  - Manage offer letter templates
  - Generate offer letters
  - Handle onboarding documentation
  - Track candidates through final stages

### 6. Super Admin
- **Primary Routes:** `/super-admin/*`
- **Responsibilities:**
  - Tenant management
  - System configuration
  - User management across organizations

## Key Workflows

### Position Creation Flow
1. **Hiring Lead** creates a new position via `/hiring-lead/conversation`
   - Provides job details, skills, responsibilities
   - Nominates interviewers
   - Submits for approval
2. **TA Leader** reviews and approves/rejects via `/notifications/new-position`
   - Reviews complete JD in right panel
   - Approves or rejects with feedback
   - If approved: assigns recruiter
   - Sets job priority (Low/Medium/High)
3. **Recruiter** is notified and begins sourcing

### Recruiter JD Review Flow (TA Associate)
1. Recruiter navigates to `/ta-associate/jd/:jobId`
2. **Step 1:** Reviews complete Job Description
3. **Step 2:** Sets screening questions for applicants
   - Pre-generated AI questions available
   - Can add/edit/remove questions
4. **Step 3:** Generates shareable JD link
   - Copy link for distribution
   - Share with candidates

### Candidate Evaluation Flow
1. Candidate applies via JD link
2. **Recruiter** screens candidates
3. **Interviewer** conducts async video interview
4. **Interviewer** reviews recording via `/interviewer/candidates/recording`
   - Views AI analysis score (0-100)
   - Reviews important timestamps (suspicious moments)
   - Rates individual question responses
   - Makes decision: Select for F2F or Reject
5. Selected candidates proceed to face-to-face interviews

### Interview Questionnaire Flow
1. Interviewer navigates to `/interviewer/questionnaire/create`
2. **Step 1:** Choose question source
   - AI-generated questions based on JD
   - Manual question input
3. **Step 2:** Configure questions
   - Edit questions and answer keys
   - Set overall interview time limit
4. **Step 3:** Review and save questionnaire
5. Questionnaire linked to job position

## UI Patterns

### 3-Panel Conversational Layout
Used for complex multi-step workflows:
- **Left Panel (15-20%):** Progress/Steps sidebar
  - Shows completed, in-progress, and upcoming steps
  - Visual indicators for step status
- **Center Panel (35-40%):** AI Chat interface
  - Conversational guidance through workflow
  - User input and AI responses
- **Right Panel (40-50%):** Interactive forms/preview
  - Dynamic content based on current step
  - Forms, previews, and action buttons

**Screens using this layout:**
- `/hiring-lead/conversation` - Create new position
- `/notifications/new-position` - Approve/reject positions
- `/ta-associate/jd/:jobId` - Review JD & set questions
- `/interviewer/questionnaire/create` - Create questionnaire

### Color Conventions
- **Primary:** `#7800D3` (Purple) - Brand color, CTAs
- **Success/Confirm:** `#4ead3b` (Green) - Positive actions
- **Warning:** Amber tones - Caution states
- **Error/Urgent:** Red tones - Destructive actions, high priority

### Status Badges
- **Active:** Green background
- **Closed:** Gray background
- **Cancelled:** Red background
- **Interview:** Blue background
- **Shortlisted:** Emerald background
- **Applied:** Purple background
- **Under Review:** Amber background

### Priority Levels
- **High:** Red - "Urgent - fill ASAP"
- **Medium:** Amber - "Priority hire"
- **Low:** Slate - "Standard timeline"

## Component Architecture

### Layout Components
- `Layout` - Standard page layout with Sidebar and Header
- `HRLayout` - HR-specific layout
- `SuperAdminLayout` - Admin-specific layout

### Reusable Components
- `ChatWindow` - Standardized chat interface
- `ResizablePanelGroup` - 3-panel layouts
- `ScrollArea` - Scrollable content areas
- `Card` - Content containers
- `Badge` - Status indicators
- `Button` - Action triggers with variants

### Context Providers
- `AlignmentContext` - TA plan progress tracking
- `AuthContext` - Authentication state
- `HiringLeadConversationContext` - Position creation flow
- `TAPlanFlowContext` - TA plan configuration
- `TAPlanReviewContext` - Plan review state

## AI Features

### Interview Analysis
- **Overall Score:** 0-100 rating
- **Reasoning:** Detailed explanation of score
- **Summary:** Brief performance overview
- **Strengths:** Identified positive areas
- **Improvements:** Areas needing development

### Important Moment Detection
- **Multiple Faces:** Critical - Potential cheating
- **Eye Tracking:** Warning - Looking away from screen
- **Background Voices:** Warning - Audio interference
- **Tab Switching:** Critical - Potential reference lookup
- **Clipboard Activity:** Info - Copy/paste detection

### Question Generation
- AI-generated based on job requirements
- Technical and behavioral categories
- Customizable difficulty levels
- Answer key suggestions

## Navigation Structure

### Main Navigation (Sidebar)
Role-specific menu items:
- Dashboard
- Projects/Jobs
- Candidates
- Notifications
- Settings

### Settings Navigation
- Theme
- Members
- Integrations
- Billing
- Interview Settings
- Email Templates
- ATS Integration
- Authentication
- Policy Documents
- License

## File Organization

```
src/
├── components/
│   ├── dashboard/          # Dashboard components per role
│   ├── hiring-lead-conversation/  # Position creation flow
│   ├── interviewer/        # Interview-related components
│   ├── notifications/      # Notification handling
│   ├── sales-plan/         # TA Leader components
│   ├── ta-associate-jd-flow/  # Recruiter JD flow
│   ├── ta-plan-flow/       # TA plan configuration
│   └── ui/                 # shadcn/ui components
├── context/                # React contexts
├── pages/                  # Route pages
├── docs/                   # Documentation
└── assets/                 # Static assets
```

## Data Patterns

### Mock Data
Currently using mock data for:
- Job listings
- Candidate profiles
- Interview questions
- AI analysis results
- Recruiter assignments

### State Management
- Local component state for UI interactions
- Context for cross-component state
- URL params for route-specific data

## Future Considerations

### Backend Integration
- Supabase for database and authentication
- Real-time updates for notifications
- File storage for resumes/documents

### Enhancements
- Real AI analysis integration
- Video recording/playback
- Email notifications
- Calendar integration for scheduling
- Advanced analytics dashboard
