# Talentou AI — Project Context

## Overview

**Talentou AI** (formerly Piqual AI) is a multi-role SaaS recruitment and talent acquisition platform. It manages the full hiring lifecycle: job creation, candidate sourcing, interview administration, offer generation, and HR operations — all with AI assistance.

**Live API Base:** `https://piqualai-api-dev.ignithocloud.com/api/v1`  
**Dev API Base:** `http://localhost:5555/api/v1`  
**Dev Server Port:** `8080`

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18.3.1 + TypeScript 5.5.3 |
| Build Tool | Vite 5.4.1 (SWC plugin) |
| Routing | React Router DOM 6.26.2 |
| Styling | Tailwind CSS 3.4.11 + shadcn/ui + Radix UI |
| Icons | Lucide React 0.462.0 |
| Server State | TanStack React Query 5.56.2 |
| Client State | Zustand 5.0.11 + React Context API |
| Forms | React Hook Form 7.53.0 + Zod 3.23.8 |
| HTTP | Axios 1.10.0 |
| Auth | JWT Decode 4.0.0 + JS Cookie 3.0.5 |
| Charts | Recharts 2.12.7 |
| Notifications | Sonner 1.5.0 |
| Drag & Drop | @dnd-kit |
| ML/NLP | @huggingface/transformers 3.7.0 |
| Deployment | Vercel (GitHub integration, deploys on push to `main`) |

---

## User Roles

The app has 6 distinct roles, each with separate dashboards, onboarding flows, and routes:

| Role | Route Prefix | Responsibilities |
|---|---|---|
| Recruitment Lead | `/sales-plan` | Strategic planning, team management, analytics |
| Recruiter | `/ta-associate` | Daily recruiting, JD creation, candidate sourcing |
| Hiring Lead | `/hiring-lead` | Job creation, candidate screening, collaborative planning |
| Interviewer | `/interviewer` | Questionnaire creation, video interviews, AI scoring |
| HR | `/hr` | Offer letter generation, templates, candidate management |
| Super Admin | `/super-admin` | Tenant/org management, multi-tenancy |

Role is stored in `localStorage` after login. Users with multiple roles select on the `/role-selection` page.

> **Terminology note:** user-facing "TA" wording was renamed to "Recruitment" ("TA Leader" → **Recruitment Lead**, "TA Associate" → **Recruiter**, "TA Plan" → **Recruitment Plan**). This is **visible-text only** — route prefixes, component/context names, and localStorage role keys still use the original identifiers (`/sales-plan`, `/ta-associate`, `ta-leader`, `ta-associate`, `TAPlanContext`, etc.). The 3 primary roles (Recruitment Lead, Recruiter, Hiring Lead) have the redesigned onboarding flows and per-role dashboards.

---

## Project Structure

```
src/
├── App.tsx                  # Route definitions (all role-based routes)
├── main.tsx                 # App entry point
├── global.ts                # API URLs, reCAPTCHA keys, env detection
├── common/common.ts         # localStorage helpers (setAuthData, etc.)
├── context/
│   ├── AuthContext.tsx      # JWT auth, token expiry checking (60s interval)
│   ├── PositionApprovalContext.tsx  # Per-position recruitment plan + Playbooks (Position Approval flow)
│   ├── TAAssociateJDFlowContext.tsx  # JD creation flow state
│   ├── HiringLeadConversationContext.tsx
│   ├── AlignmentContext.tsx # LEGACY — old planning-stage completion tracking
│   ├── TAPlanContext.tsx    # LEGACY — old multi-stage TA-plan flow (removed from UI)
│   └── NewPositionContext.tsx
├── pages/
│   ├── Login.tsx / Register.tsx / RoleSelection.tsx
│   └── [role-specific dashboard pages]
├── components/
│   ├── ui/                  # shadcn/ui base components
│   ├── shared/              # Shared reusable components (ModernJobList/ModernCandidateList, KPIStrip, cards)
│   ├── layout/ / sidebar/ / header/
│   ├── dashboard/           # Role-specific dashboards (SalesPlanQuadrant / TAAssociate / HiringLeadCommand)
│   ├── onboarding/          # Redesigned onboarding (OnboardingShell, LeftPanel, HorizontalStepper, RL/recruiter/HL wizards)
│   ├── position-approval/   # Per-position Recruitment Plan flow + Playbooks (PositionApprovalPage)
│   ├── candidates/          # Candidate management + bulk-import/ (4-stage CV upload modal)
│   ├── settings/            # Settings sub-pages (Profile, Playbooks, Application Form, Approval History, …)
│   ├── interviewer/         # Interview recording, questionnaires, scoring
│   ├── hr/                  # Offer letter generation and templates
│   ├── hiring-lead/         # Job openings, KanbanBoard (candidate pipeline)
│   ├── recruiter/           # Recruiter features
│   ├── market/ / media/ / measure/   # LEGACY — market DB, outreach, KPI (old TA-plan flow)
│   ├── ta-plan-flow/        # LEGACY — old multi-step TA-plan flow
│   └── super-admin/         # Tenant management
├── store/                   # Zustand stores (tour-store, chat-panel-store)
├── hooks/                   # use-mobile, use-toast, useScreenTour (namespaced/resumable tour wiring)
└── constants/               # App-wide constants and assets (incl. tourScreens.ts — cross-screen tour sequence)
```

---

## Authentication Flow

1. User POSTs credentials + reCAPTCHA token to `POST /auth/login`
2. Server returns JWT + user metadata
3. Token stored in `localStorage`; expiry checked every 60 seconds via `jwtDecode`
4. Auto-logout on expiration
5. `AuthContext` reads localStorage on app load for session persistence

**Auth response shape:**
```typescript
{
  token: string
  user_id: string
  tenant_key: string
  email: string
  first_name: string
  last_name: string
  active_role_key: string
  user_role_key: string[]
  active_project_id?: string
  chat_status: string
  show_welcome_slider: boolean
  logo_url?: string
  is_db_empty: boolean
  is_outreach_empty: boolean
  db_companies_count: number
  db_contacts_count: number
  sas_url?: string        // Azure Blob SAS URL
  sas_token?: string
}
```

---

## Key Features

### Interview Management
- Video recording playback with synced transcripts
- AI scoring (0–100) with strengths/improvement analysis
- Proctoring alerts: multiple faces, tab switching, clipboard activity
- Written response capture alongside video

### Recruitment Plan (per-position) — Position Approval flow
At `/notifications/new-position` (entry: the **"Create Plan"** button on an approval notification). Managed by `PositionApprovalContext`. The old standalone multi-stage TA-plan flow has been **removed** — recruitment plans are now built **per position**:
- **Default state:** AI-generated plan summary (recruiter, channels, targets) + confirm/approve.
- **Edit mode:** a live AI chat (left) drives a fully editable brief (right) — company pitch, talent pool, channels, recruiter & plan steps, targets.
- Approve → plan sent to the assigned recruiter.

### Playbooks (reusable recruitment plans)
Reusable per-position plans. On the Position Approval screen the AI suggests the best-matching Playbooks (with Job ID, when the source job closed, and an AI "what's different" note); a **Playbook Library** page (`/notifications/new-position/playbooks`) lists all and supports **creating your own**. Built-in + custom Playbooks live in `playbooks.ts`; custom ones persist in `localStorage` and are also manageable in **Settings → Playbooks**.

### Bulk Candidate Import (v2)
The **Add Candidate** button opens a 4-stage CV-upload modal (`candidates/bulk-import/`): **Upload** (drop a folder / multi-select PDF·DOC·DOCX) → **Parsing** (sub-steps + live count) → **Review & Assign** (AI-suggested position + confidence, Incomplete/duplicate flags, per-row confirm/skip, "Confirm all high-confidence") → **Complete** (Imported / Unassigned / Merged dupes). Front-end simulation — file selection is real; parsing/matching are mock.

### Candidate Views & Pipeline
The shared candidate list (`ModernCandidateList`) has three views — **Cards / List / Kanban** — with **Kanban as the default**. Kanban embeds `KanbanBoard` (drag-drop pipeline with a job selector). "View Pipeline" on a job opens the Kanban view inline (`?view=kanban&jobId=`). The Jobs list (`ModernJobList`) offers **Cards / List**.

### Role Dashboards
Per-role dashboards: Recruitment Lead `SalesPlanQuadrantDashboard` (`/sales-plan/dashboard`), Recruiter `TAAssociateDashboard` (`/ta-associate/dashboard`), Hiring Lead `HiringLeadCommandDashboard` (`/hiring-lead/dashboard`). All currently mock-data driven.

### Job Description Flow
`TAAssociateJDFlowContext` manages a conversational multi-step JD creation workflow at `/ta-associate/jd/:jobId`.

### Offer Letter Generation (`/hr/offer-letter/:candidateId`)
- Multiple template support
- CTC breakdown by components
- Custom field mapping
- Preview before sending

### Market Database & Outreach
- Lead database with buyer intent scoring
- AI chat for market research (`MarketDatabaseChat`)
- Multi-channel outreach campaigns with timeline visualization

### Onboarding (redesigned)
Centered sliding wizards built on `OnboardingShell` (dark `#0e0020` `LeftPanel` + top `HorizontalStepper`), reached after `/role-selection`:
- **Recruitment Lead** — `RLSetupFlow` (`/onboarding/company-pitch` → `/onboarding/invite-team`): company pitch (with culture-doc attach) + invite team.
- **Recruiter** — `RecruiterProfile` (`/onboarding/recruiter/profile`): sourcing regions (broad → specific) → expertise sectors → Tech/Non-tech domain (+ "Others") → seniority.
- **Hiring Lead** — `HLProfile` (`/onboarding/hiring-lead/profile`): project (create-your-own) + department.

Finishing routes to the role dashboard. All answers persist in `localStorage` (`recruiterProfile`, `hlProfile`, `companyPitch`) and are **editable later in Settings → Profile**. (Legacy `/onboarding/step1-4`, `/onboarding-ta-associate/*`, `/onboarding-hiring-lead/*` step pages still exist but are superseded.)

### Product Tour (onboarding coach marks)
An in-app guided-tour engine — `src/store/tour-store.ts` (zustand `useTourStore`) + `src/components/shared/TourGuide.tsx` (portal-rendered overlay), mounted once globally in `Layout.tsx`. Two step types: **coach marks** (spotlight cutout + pointer arrow around a real `[data-tour-id="..."]` element) and **full-bleed intro slides** (`variant: 'intro'` — dark `#0e0020` welcome card with a pulsing icon and a cross-screen progress bar). A "?" icon in `Header.tsx` re-launches the current page's tour at any time. New tours should use the `useScreenTour(role, screen, steps)` hook (`src/hooks/useScreenTour.ts`), which namespaces persistence as `talentou:tour-seen:{role}:{screen}` (resumable — Skip is permanent, Exit (×) saves the current step and resumes on next visit/relaunch). Recruitment Lead has tours on all 6 of its primary screens (dashboard, job list, job dashboard, new-position approval, bulk import, license/credits); see the **Notes for Future Development** caveat on legacy vs. namespaced tour keys before adding more.

### Settings
Sub-pages under `/settings/*` (rendered by `Settings.tsx`, listed in `SettingsNav.tsx`): **Profile** (role-aware editor for onboarding answers), **Playbooks**, **Application Form** (form builder), **Approval History**, plus Account, Theme, Members, Careers, Integrations, Billing, **License** (credit usage, animated usage ring), etc.

---

## External Integrations

| Service | Purpose | Notes |
|---|---|---|
| Google reCAPTCHA v3 | Login form security | Dev/prod keys in `global.ts` |
| Azure Blob Storage | Document/resume storage | SAS token-based, returned in auth response |
| HuggingFace Transformers | NLP tasks (resume parsing, text analysis) | `@huggingface/transformers 3.7.0` |
| Vercel | Hosting/deployment platform | GitHub integration; production deploys on push to `main` |

---

## Styling Conventions

- Utility-first Tailwind CSS
- Custom breakpoints: `res-1200`, `res-1400`, `res-1600`
- Custom brand colors: Piqual orange/green, Talentou colors (in `tailwind.config.ts`)
- Dark mode via `next-themes`
- shadcn/ui for all base components — extend via `cn()` utility

---

## Common Commands

```bash
npm i            # Install dependencies
npm run dev      # Start dev server at localhost:8080
npm run build    # Production build
npm run build:dev  # Dev mode build
npm run preview  # Preview production build
npm run lint     # ESLint
```

---

## State Management Strategy

| State Type | Tool |
|---|---|
| Auth / session | React Context (`AuthContext`) + localStorage |
| Position approval / recruitment plan + Playbooks | React Context (`PositionApprovalContext`) |
| Onboarding answers / Playbooks persistence | `localStorage` |
| Server data / API calls | TanStack React Query |
| Lightweight UI state | Zustand (where used) |
| Form state | React Hook Form |
| Legacy multi-step planning flows | React Context (`TAPlanContext`, `AlignmentContext`) — no longer reachable from the UI |

---

## Multi-Tenancy

Super Admin role (`/super-admin/tenants`) manages tenant organizations. Each user belongs to a tenant (`tenant_key` in auth response). Plans: Basic, Professional, Enterprise.

---

## Notes for Future Development

- The project was originally called **Piqual AI** — some internal API URLs and variable names still reference `piqual`
- `global.ts` is the single source of truth for environment detection (localhost = dev) and API base URL switching
- All localStorage keys for auth data are centralized in `src/common/common.ts`
- Route guards are handled implicitly via `AuthContext` — token presence/validity determines access
- **Visible "TA" → "Recruitment" rename** is text-only: routes, component/context names, and role keys keep `ta-`/`sales-plan` identifiers (see the Terminology note under User Roles). The one intentional exception is `WelcomeRouter`, which still compares `role === 'TA Associate'`.
- The **standalone TA-plan flow is removed** — bare `/sales-plan` and `/ta-associate-plan` redirect to the role dashboards; `TAPlanContext`/`AlignmentContext`/`ta-plan-flow/` + the `market`/`media`/`measure` components are legacy/unreachable. Recruitment plans are built per-position via `PositionApprovalContext`.
- **Mock-data caveat:** the new flows (role dashboards, Position Approval, Playbooks, bulk import, onboarding) are front-end only — no parsing/AI/backend wiring; data is hard-coded mock or `localStorage`.
- **Two tour-persistence conventions coexist, don't assume one covers both:** the ~10 original tours (job list, candidates, careers, new-position chat flow, etc.) use a flat `tour_done_{key}` localStorage flag and always restart from step 0 via the "?" icon. The 6 Recruitment Lead tours added later use the namespaced, resumable `talentou:tour-seen:{role}:{screen}` JSON format (`{step, done}`) via `useScreenTour` — Skip marks it permanently done, Exit (×) saves progress, and the "?" icon resumes at the saved step. New tours should use `useScreenTour`, not call `useTourStore().startTour` with a bare key.
- **Tour coach-mark copy standard:** explain the insight or action a section gives the user toward their goal — not the UI element itself (avoid "this card"/"this chart"/"these cards" framing). Applied to the RL Dashboard tour (`SalesPlanQuadrantDashboard.tsx`) as the reference example; the other tours still use the older, more literal UI-description style and are due a dedicated copy pass to match. A `TourStep` can also carry optional `completionTitle`/`completionDescription` to override the shared generic "You're all set" completion-card copy for that specific tour.
- **Deployment is Vercel** (GitHub integration, deploys on push to `main`) — not Lovable.dev.

---

## Agent Instructions for Claude Code

Conventions Claude Code must follow when making changes to this codebase:

- **Do not hand-edit files in `src/components/ui/`** — these are shadcn/ui primitives; always regenerate via CLI (`npx shadcn-ui add <component>`)
- **Use design tokens, not raw hex values** — use `bg-primary`, `text-primary`, `hsl(var(--primary))` not `#7800D3`; use `bg-gradient-to-r from-[#7800D3] to-[#5600ad]` only for the standard CTA gradient
- **Role-specific components must use the `role: RoleType` prop pattern** — follow the pattern in `TalentPlanCard.tsx` and `ModernJobList.tsx`; do not create separate `_Hiring_Lead` or `_TA_Associate` variants
- **No inline `style={{}}` for colours** — all colours must go through Tailwind token classes; `style={{}}` is only acceptable for dynamic computed values (e.g. `style={{ width: pct + '%' }}`)
- **New chat bubble components must include `animate-in fade-in slide-in-from-bottom-1`** on the message wrapper div for entrance animation
- **Use `bg-primary text-white` for all CTA buttons** — not green (`#22C55E`) or navy (`#1e1b4b`); the gradient `from-[#7800D3] to-[#5600ad]` is acceptable for 3-panel flow primary actions
- **localStorage keys**: use existing keys set in `src/common/common.ts`; read `userName`, `userRole`, `token` — do not invent new key names
