# Talentou AI — Living Project Context

> This file is the canonical reference for all project context. Update it as the project evolves.  
> Last updated: 2026-05-06

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Environment & API Configuration](#environment--api-configuration)
4. [User Roles & Routes](#user-roles--routes)
5. [Authentication Flow](#authentication-flow)
6. [Project Structure](#project-structure)
7. [State Management](#state-management)
8. [Key Feature Areas](#key-feature-areas)
9. [Component Patterns & Conventions](#component-patterns--conventions)
10. [Styling Conventions](#styling-conventions)
11. [External Integrations](#external-integrations)
12. [Common Commands](#common-commands)
13. [Ongoing Decisions & Context Log](#ongoing-decisions--context-log)

---

## Project Overview

**Talentou AI** (formerly Piqual AI) is a multi-role SaaS recruitment and talent acquisition platform. It manages the full hiring lifecycle: job creation, candidate sourcing, interview administration, offer generation, and HR operations — all with AI assistance.

- ~65 page components, ~268 component files
- 8 React Context providers
- 6 distinct user roles
- 80+ route definitions

> **Legacy note:** The project was originally called **Piqual AI**. Some internal API URLs, component names, and variable names still reference `piqual`. Do not rename unless explicitly working on a rebrand task.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React + TypeScript | 18.3.1 / 5.5.3 |
| Build Tool | Vite (SWC plugin) | 5.4.1 |
| Routing | React Router DOM | 6.26.2 |
| Styling | Tailwind CSS + shadcn/ui + Radix UI | 3.4.11 |
| Icons | Lucide React | 0.462.0 |
| Server State | TanStack React Query | 5.56.2 |
| Client State | Zustand + React Context API | 5.0.11 |
| Forms | React Hook Form + Zod | 7.53.0 / 3.23.8 |
| HTTP | Axios (+ native fetch in some places) | 1.10.0 |
| Auth | JWT Decode + JS Cookie | 4.0.0 / 3.0.5 |
| Charts | Recharts | 2.12.7 |
| Notifications | Sonner | 1.5.0 |
| Drag & Drop | @dnd-kit | latest |
| ML/NLP | @huggingface/transformers | 3.7.0 |
| Deployment | Lovable.dev | — |

---

## Environment & API Configuration

**File:** `src/global.ts` — single source of truth for environment detection.

| Environment | API Base | reCAPTCHA |
|---|---|---|
| Production | `https://piqualai-api-dev.ignithocloud.com/api/v1` | prod key |
| Dev (localhost) | `http://localhost:5555/api/v1` | dev key |

Detection: `window.location.hostname === "localhost"` switches both endpoint and reCAPTCHA key.

**Dev server:** `localhost:8080`

---

## User Roles & Routes

| Role | Route Prefix | Onboarding | Key Responsibilities |
|---|---|---|---|
| **TA Leader** | `/sales-plan` | `/onboarding/step1-4` | Strategic planning, team management, analytics |
| **TA Associate** | `/ta-associate` | `/onboarding-ta-associate/step1-4` | Daily recruiting, JD creation, candidate sourcing |
| **Hiring Lead** | `/hiring-lead` | `/onboarding-hiring-lead/step2-4` | Job creation, candidate screening, collaborative planning |
| **Interviewer** | `/interviewer` | N/A | Questionnaire creation, video interviews, AI scoring |
| **HR** | `/hr` | N/A | Offer letter generation, templates, candidate management |
| **Super Admin** | `/super-admin` | N/A | Tenant/org management, multi-tenancy |

- Role stored in `localStorage['role']` post-login
- Multi-role users select role at `/role-selection`
- All routes defined in `src/App.tsx` (80+ routes)

---

## Authentication Flow

1. User POSTs credentials + reCAPTCHA token → `POST /auth/login`
2. Server returns JWT + user metadata
3. `setAuthData()` in `src/common/common.ts` stores ~15 keys in localStorage
4. `AuthContext` checks token expiry every 60 seconds via `jwtDecode`
5. Auto-logout on expiration; session persists across page reloads

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
  sas_token?: string      // Azure Blob SAS token
}
```

**localStorage keys:** `token`, `sas_url`, `sas_token`, `userId`, `tenantId`, `userEmail`, `role`, `first_name`, `last_name`, `chat_history`, `project_id`, `is_db_empty`, `is_outreach_empty`, `db_companies_count`, `db_contacts_count`, `logo_url`, `last_login_date`, `accordionState`

**Route guards:** Implicit via `AuthContext` — token presence/validity determines access. No explicit route guard components.

---

## Project Structure

```
src/
├── App.tsx                        # Master route definitions (80+ routes)
├── main.tsx                       # Entry point — AlignmentProvider wraps App
├── global.ts                      # API URLs, reCAPTCHA keys, env detection
├── common/common.ts               # localStorage helpers — setAuthData()
│
├── context/                       # React Context providers (8 total)
│   ├── AuthContext.tsx            # JWT auth, token expiry (60s interval)
│   ├── AlignmentContext.tsx       # Planning stage completion tracking
│   ├── TAPlanContext.tsx          # 5-stage TA planning multi-step state
│   ├── TAPlanFlowContext.tsx      # TA plan flow navigation
│   ├── TAPlanReviewContext.tsx    # TA Associate review interface
│   ├── NewPositionContext.tsx     # New job position workflow
│   ├── TAAssociateJDFlowContext.tsx  # JD creation conversational flow
│   └── HiringLeadConversationContext.tsx
│
├── pages/                         # ~65 page components
│   ├── Login.tsx / Register.tsx / RoleSelection.tsx / EULA.tsx
│   ├── onboarding/                # Step1-4 for each role
│   ├── hr/                        # HRHomePage, HRTemplatesPage, HRCandidatesPage, HROfferLetterPage
│   ├── super-admin/               # TenantManagementPage
│   └── [role-specific pages — job lists, candidates, JD views, AI performance, etc.]
│
├── components/                    # ~268 component files
│   ├── ui/                        # 45+ shadcn/ui base components
│   ├── layout/                    # Layout, HRLayout, SuperAdminLayout
│   ├── sidebar/ & header/
│   ├── dashboard/                 # Role-specific dashboard components
│   ├── hiring-lead-conversation/  # Multi-stage panel with panel-stages/
│   ├── ta-plan-flow/              # 5-stage TA plan with panel-stages/
│   ├── ta-associate-jd-flow/      # JD creation flow
│   ├── ta-associate-review/       # Review interface
│   ├── messages/                  # Message campaign components (role variants)
│   ├── TA-plan/                   # Master TA plan, sections/
│   ├── market/                    # Market database & lead scoring
│   ├── media/                     # Outreach campaigns, chat/
│   ├── measure/                   # KPIs & performance metrics
│   ├── hr/                        # HR offer letter, templates
│   ├── recruiter/                 # TA Associate JD tools
│   ├── hiring-lead/               # Hiring lead job/candidate views
│   ├── sales-plan/                # TA Leader candidates & jobs
│   ├── database/                  # Company database management
│   ├── candidates/                # Candidate creation conversation
│   ├── shared/                    # ModernCandidateList, ModernJobList, AIInterviewPerformanceViewer
│   ├── assign/                    # Team assignment
│   ├── new-position/              # New position workflow, panel-stages/
│   ├── settings/                  # All settings pages
│   ├── super-admin/               # Tenant management dialogs
│   └── [+ inbox, notifications, feedback, lead-tracker, success, etc.]
│
├── hooks/                         # use-mobile.tsx, use-toast.ts
├── lib/utils.ts                   # cn() = clsx + tailwind-merge
├── constants/Constant.ts          # Asset/logo URLs from Lovable uploads
├── types/candidate.ts
├── utils/                         # backgroundRemoval.ts, cvParser.ts
├── store/chat-panel-store.ts      # Zustand store for chat panel UI state
├── TAAssociate/                   # Legacy TA Associate pages
└── Layout/AuthLayout/             # Auth page right panel layout
```

---

## State Management

| State Type | Tool |
|---|---|
| Auth / session | `AuthContext` + localStorage |
| Multi-step planning | `TAPlanContext`, `AlignmentContext`, flow-specific contexts |
| Server data / caching | TanStack React Query |
| Lightweight UI | Zustand (`chat-panel-store.ts`) |
| Form state | React Hook Form + Zod |

### AlignmentContext
Tracks completion of planning stages. Only allows forward progress (no backward). Flags:
- `isValuePropositionAligned`
- `isCollateralsAligned`
- `isMarketCriteriaAligned`
- `isOutreachTimelineAligned`
- `isMilestonesAligned`
- Component progress: `companyUSP`, `talentPool`, `recruitmentChannels`, `successMetrics`

### TAPlanContext — 5 Stages
1. Company USP (elevator pitch, career growth, compensation, awards)
2. Talent Pool (work arrangement, geography, industries, companies, institutions, skills)
3. Recruitment Channels (channels, outreach sequence, templates, cadence)
4. Success Metrics (KPIs, targets, milestones)
5. Team Invitation (recruiters, hiring leads, HR members)

Progress: `(completed stages / 5) * 100`

---

## Key Feature Areas

### Interview Management
- Video recording playback with synced transcripts
- AI scoring (0–100) with strengths/improvement analysis
- Proctoring: multiple faces, tab switching, clipboard activity alerts
- Written response capture alongside video

### TA Planning Flow
Multi-stage conversational UI at `/ta-associate/jd/:jobId`. Context: `TAPlanContext`.

### JD Creation Flow
Conversational multi-step at `/ta-associate/jd/:jobId`. Context: `TAAssociateJDFlowContext`.

### Offer Letter Generation
Route: `/hr/offer-letter/:candidateId`. Features: multiple templates, CTC breakdown by components, custom field mapping, preview before send.

### Market Database & Outreach
- Lead DB with buyer intent scoring
- AI chat for market research (`MarketDatabaseChat`)
- Multi-channel outreach campaigns with timeline visualization

### Hiring Lead Conversation
Multi-stage panel flow. Stages: Job Details → Skills/Responsibilities → Screening Questions → Interview Setup → JD Preview.

### New Position Workflow
Context: `NewPositionContext`. Panel stages: JD Preview → Priority Management → Recruiter Assignment.

---

## Component Patterns & Conventions

### Multi-Role Variants
Most shared components have role-specific copies:
- `Component.tsx` — TA Leader
- `Component_Hiring_Lead.tsx` — Hiring Lead
- `Component_TA_Associate.tsx` — TA Associate

### Multi-Step Workflow Structure
Each major flow follows this pattern:
```
<FeatureName>Layout.tsx
├── <FeatureName>Chat.tsx
├── <FeatureName>Panel.tsx
│   └── panel-stages/
│       ├── Stage1.tsx
│       └── Stage2.tsx
└── <FeatureName>Progress.tsx
```

### UI Component Usage
- All base components from `@/components/ui/` (shadcn/ui)
- Extend via `cn()` utility — never raw CSS class overrides
- Icons: Lucide React exclusively
- Toasts: Sonner (`src/hooks/use-toast.ts`)

### HTTP Calls
- Axios: primary HTTP client for most API calls
- Native `fetch()`: used in some older files (e.g., Login.tsx)
- Consistent pattern: call in TanStack Query `queryFn` or `mutationFn`

---

## Styling Conventions

- **Approach:** Utility-first Tailwind, no custom CSS files
- **Dark mode:** `next-themes` (class strategy, `dark:` variants)
- **CSS utility:** `cn()` from `src/lib/utils.ts` for conditional classes
- **Path alias:** `@` → `src/`

### Custom Breakpoints
- `res-1200`, `res-1400`, `res-1600` (defined in `tailwind.config.ts`)

### Color System
| Prefix | Usage |
|---|---|
| `talentou.*` | Brand primary/accent |
| `piqual.*` | Legacy orange, green, purple |
| `brand.*` | Gradient purples (50–900) |
| `orange.*` | Extended orange range |

### Tailwind Plugins
- `tailwindcss-animate` — animation utilities
- `tailwind-scrollbar-hide` — hide scrollbar utility

---

## External Integrations

| Service | Purpose | Config Location |
|---|---|---|
| Google reCAPTCHA v3 | Login security | `src/global.ts` |
| Azure Blob Storage | Document/resume storage | SAS tokens from auth response |
| HuggingFace Transformers | NLP/resume parsing | `@huggingface/transformers` package |
| Lovable.dev | Hosting / git-push deploy | Project dashboard at lovable.dev |

---

## Common Commands

```bash
npm i               # Install dependencies
npm run dev         # Start dev server at localhost:8080
npm run build       # Production build
npm run build:dev   # Dev-mode build
npm run preview     # Preview production build locally
npm run lint        # Run ESLint
```

---

## Ongoing Decisions & Context Log

> Add entries here whenever a significant architectural decision, breaking change, or important context is established. Newest first.

| Date | Topic | Decision / Context |
|---|---|---|
| 2026-05-06 | Initial context capture | Full project structure, roles, and conventions documented from codebase exploration |

---

*This file is maintained collaboratively. When Claude makes a significant architectural change or discovers new patterns, update this file.*
