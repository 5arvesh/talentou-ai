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
| Deployment | Lovable.dev platform |

---

## User Roles

The app has 6 distinct roles, each with separate dashboards, onboarding flows, and routes:

| Role | Route Prefix | Responsibilities |
|---|---|---|
| TA Leader | `/sales-plan` | Strategic planning, team management, analytics |
| TA Associate / Recruiter | `/ta-associate` | Daily recruiting, JD creation, candidate sourcing |
| Hiring Lead | `/hiring-lead` | Job creation, candidate screening, collaborative planning |
| Interviewer | `/interviewer` | Questionnaire creation, video interviews, AI scoring |
| HR | `/hr` | Offer letter generation, templates, candidate management |
| Super Admin | `/super-admin` | Tenant/org management, multi-tenancy |

Role is stored in `localStorage` after login. Users with multiple roles select on the `/role-selection` page.

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
│   ├── AlignmentContext.tsx # Tracks completion of planning stages
│   ├── TAPlanContext.tsx    # TA planning multi-stage state
│   ├── NewPositionContext.tsx
│   ├── TAAssociateJDFlowContext.tsx  # JD creation flow state
│   └── HiringLeadConversationContext.tsx
├── pages/
│   ├── Login.tsx / Register.tsx / RoleSelection.tsx
│   └── [role-specific dashboard pages]
├── components/
│   ├── ui/                  # shadcn/ui base components
│   ├── shared/              # Shared reusable components
│   ├── layout/ / sidebar/ / header/
│   ├── dashboard/           # Role-specific dashboards
│   ├── interviewer/         # Interview recording, questionnaires, scoring
│   ├── hr/                  # Offer letter generation and templates
│   ├── hiring-lead/         # Job openings, hiring conversations
│   ├── recruiter/           # TA Associate features
│   ├── market/              # Market database and criteria
│   ├── media/               # Media outreach campaigns
│   ├── measure/             # KPI and performance metrics
│   ├── candidates/          # Candidate management
│   ├── ta-plan-flow/        # Multi-step TA planning flow
│   └── super-admin/         # Tenant management
├── hooks/                   # use-mobile, use-toast
└── constants/               # App-wide constants and assets
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

### TA Planning (Multi-Stage)
Managed by `TAPlanContext`. 5 stages:
1. Company USP
2. Talent Pool definition
3. Recruitment Channels
4. Success Metrics
5. Team Invitation

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

### Onboarding
Each role has a 4-step onboarding flow:
- `/onboarding/step1-4` — TA Leader
- `/onboarding-ta-associate/step1-4` — TA Associate
- `/onboarding-hiring-lead/step2-4` — Hiring Lead

---

## External Integrations

| Service | Purpose | Notes |
|---|---|---|
| Google reCAPTCHA v3 | Login form security | Dev/prod keys in `global.ts` |
| Azure Blob Storage | Document/resume storage | SAS token-based, returned in auth response |
| HuggingFace Transformers | NLP tasks (resume parsing, text analysis) | `@huggingface/transformers 3.7.0` |
| Lovable.dev | Hosting/deployment platform | Auto-deploys on git push |

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
| Multi-step planning flows | React Context (`TAPlanContext`, `AlignmentContext`, etc.) |
| Server data / API calls | TanStack React Query |
| Lightweight UI state | Zustand (where used) |
| Form state | React Hook Form |

---

## Multi-Tenancy

Super Admin role (`/super-admin/tenants`) manages tenant organizations. Each user belongs to a tenant (`tenant_key` in auth response). Plans: Basic, Professional, Enterprise.

---

## Notes for Future Development

- The project was originally called **Piqual AI** — some internal API URLs and variable names still reference `piqual`
- `global.ts` is the single source of truth for environment detection (localhost = dev) and API base URL switching
- All localStorage keys for auth data are centralized in `src/common/common.ts`
- Route guards are handled implicitly via `AuthContext` — token presence/validity determines access
- The `AlignmentContext` tracks which planning stages are "complete" to drive progress UI across onboarding and planning flows
