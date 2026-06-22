import type { Brief } from '@/context/PositionApprovalContext';

export interface Playbook {
  id: string;
  name: string;          // e.g. "Senior Frontend Engineer"
  context: string;       // e.g. "Engineering · 5–8 yrs · Bangalore"
  usageNote: string;     // e.g. "Used for 3 hires · last Apr 2026"
  jobId: string;         // originating job, e.g. "JOB-3041"
  closedDaysAgo: number; // days since that job closed
  diffNote: string;      // AI note on what differs vs the current role
  matchPct: number;      // similarity to the current position (ranking + badge)
  tags: string[];        // ['Engineering', 'Senior', 'Bangalore']
  summary: { recruiter: string; channels: string; closeDays: number };
  brief: Brief;          // full reusable plan
  custom?: boolean;      // true for user-created playbooks
}

export const PLAYBOOK_LIST: Playbook[] = [
  {
    id: 'pb-senior-frontend',
    name: 'Senior Frontend Engineer',
    context: 'Engineering · 5–8 yrs · Bangalore',
    usageNote: 'Used for 3 hires · last Apr 2026',
    jobId: 'JOB-3041',
    closedDaysAgo: 38,
    diffNote: 'Built for a Senior Frontend Engineer (5–8 yrs, Bangalore) — a touch more senior than this 4–7 yr React role, but the channels and recruiter are a strong match.',
    matchPct: 92,
    tags: ['Engineering', 'Senior', 'Bangalore'],
    summary: { recruiter: 'Rohan Kapoor', channels: 'LinkedIn + GitHub Jobs', closeDays: 38 },
    brief: {
      usp: "Talentou is where engineers ship real product from day one — no JIRA backlog theatre, no committee-driven decisions. Our frontend team owns the full stack and has shipped 4 major releases in the last 6 months.",
      talentPool: {
        locations: ['Bangalore', 'Pune', 'Hyderabad', 'Chennai'],
        industries: ['SaaS / B2B', 'Fintech', 'HR Tech', 'E-commerce'],
      },
      channels: [
        { rank: 1, name: 'LinkedIn Recruiter', aiTag: 'Tech', yield: 'high' },
        { rank: 2, name: 'GitHub Jobs', aiTag: 'Tech', yield: 'high' },
        { rank: 3, name: 'Employee Referrals', yield: 'medium' },
        { rank: 4, name: 'Naukri.com', yield: 'medium' },
      ],
      recruiter: {
        id: 'rohan-kapoor',
        name: 'Rohan Kapoor',
        title: 'Recruiter',
        initials: 'RK',
        bandwidthPct: 78,
        activeReqs: 2,
        closesCount: 3,
        avgCloseDays: 34,
        aiPick: true,
        otherActivePositions: ['UX Designer (Day 8)', 'Data Engineer (Day 31)'],
        planSteps: [
          'Lead with LinkedIn targeting SaaS/fintech engineers in Bangalore & Pune. Set 2/day goal from this channel alone.',
          "Open GitHub Jobs in parallel — strong signal-to-noise for senior frontend candidates.",
          'Run light screening on Naukri to widen the pool without overloading bandwidth.',
        ],
      },
      targets: { closeDays: 38, dailySourcingGoal: 4, confidence: 86 },
      relatedJobId: '3',
    },
  },
  {
    id: 'pb-fullstack',
    name: 'Full-Stack Engineer (Node + React)',
    context: 'Engineering · 4–7 yrs · Bangalore / Remote',
    usageNote: 'Used for 2 hires · last Mar 2026',
    jobId: 'JOB-2987',
    closedDaysAgo: 52,
    diffNote: 'Built for a Full-Stack Engineer (Node + React, 4–7 yrs) — same seniority as this role but broader scope, so expect a wider candidate pool.',
    matchPct: 78,
    tags: ['Engineering', 'Mid', 'Remote'],
    summary: { recruiter: 'Arjun M.', channels: 'LinkedIn + GitHub Jobs', closeDays: 45 },
    brief: {
      usp: "Full-stack ownership at Talentou means shipping end to end — API to pixel. Small teams, fast feedback loops, and engineers who close the loop with customers directly.",
      talentPool: {
        locations: ['Bangalore', 'Remote (India)', 'Pune', 'Hyderabad'],
        industries: ['SaaS / B2B', 'Cloud / DevOps', 'Fintech', 'E-commerce'],
      },
      channels: [
        { rank: 1, name: 'LinkedIn Recruiter', aiTag: 'Tech', yield: 'high' },
        { rank: 2, name: 'GitHub Jobs', aiTag: 'Tech', yield: 'high' },
        { rank: 3, name: 'Naukri.com', yield: 'medium' },
        { rank: 4, name: 'Employee Referrals', yield: 'medium' },
      ],
      recruiter: {
        id: 'arjun-m',
        name: 'Arjun M.',
        title: 'Recruiter',
        initials: 'AM',
        bandwidthPct: 62,
        activeReqs: 2,
        closesCount: 2,
        avgCloseDays: 41,
        aiPick: false,
        otherActivePositions: ['Backend Engineer (Day 5)', 'DevOps Lead (Day 19)'],
        planSteps: [
          "Tap LinkedIn for full-stack candidates with both Node and React depth.",
          'Use GitHub Jobs to surface engineers with public full-stack projects.',
          'Keep Naukri as a supplemental channel to broaden reach.',
        ],
      },
      targets: { closeDays: 45, dailySourcingGoal: 3, confidence: 79 },
      relatedJobId: '3',
    },
  },
  {
    id: 'pb-frontend-pune',
    name: 'Frontend Engineer · Pune',
    context: 'Engineering · 2–4 yrs · Pune',
    usageNote: 'Used for 4 hires · last Feb 2026',
    jobId: 'JOB-2810',
    closedDaysAgo: 74,
    diffNote: 'Built for a mid-level Frontend Engineer (2–4 yrs, Pune) — more junior and Pune-focused; widen the seniority and location if you need senior Bangalore talent.',
    matchPct: 74,
    tags: ['Engineering', 'Mid', 'Pune'],
    summary: { recruiter: 'Preethi S.', channels: 'Naukri + LinkedIn', closeDays: 32 },
    brief: {
      usp: "Talentou's Pune team is the proving ground for our component system. Mid-level engineers here own real surface area and grow fast under senior mentorship.",
      talentPool: {
        locations: ['Pune', 'Bangalore', 'Mumbai'],
        industries: ['SaaS / B2B', 'E-commerce', 'EdTech', 'HR Tech'],
      },
      channels: [
        { rank: 1, name: 'Naukri.com', yield: 'high' },
        { rank: 2, name: 'LinkedIn Recruiter', aiTag: 'Tech', yield: 'high' },
        { rank: 3, name: 'Employee Referrals', yield: 'medium' },
      ],
      recruiter: {
        id: 'preethi-s',
        name: 'Preethi S.',
        title: 'Recruiter',
        initials: 'PS',
        bandwidthPct: 45,
        activeReqs: 1,
        closesCount: 4,
        avgCloseDays: 29,
        aiPick: false,
        otherActivePositions: ['Product Manager (Day 14)'],
        planSteps: [
          'Lead with Naukri for the Pune mid-level frontend pool — strongest yield here historically.',
          'Run LinkedIn in parallel for candidates with modern React/TypeScript stacks.',
          'Activate referrals from the Pune engineering team for warm intros.',
        ],
      },
      targets: { closeDays: 32, dailySourcingGoal: 5, confidence: 81 },
      relatedJobId: '3',
    },
  },
  {
    id: 'pb-mobile-rn',
    name: 'Mobile Engineer (React Native)',
    context: 'Engineering · 3–6 yrs · Bangalore',
    usageNote: 'Used for 1 hire · last Jan 2026',
    jobId: 'JOB-2604',
    closedDaysAgo: 120,
    diffNote: 'Built for a React Native Mobile Engineer (3–6 yrs) — mobile-leaning, so the web React overlap is only partial; shift the skills emphasis if this is a pure web role.',
    matchPct: 63,
    tags: ['Engineering', 'Mid', 'Bangalore'],
    summary: { recruiter: 'Rohan Kapoor', channels: 'LinkedIn + GitHub Jobs', closeDays: 52 },
    brief: {
      usp: "Mobile at Talentou is React Native done right — shared logic with web, native feel where it counts. One codebase, two platforms, real impact.",
      talentPool: {
        locations: ['Bangalore', 'Hyderabad', 'Remote (India)'],
        industries: ['SaaS / B2B', 'Fintech', 'Gaming', 'E-commerce'],
      },
      channels: [
        { rank: 1, name: 'LinkedIn Recruiter', aiTag: 'Tech', yield: 'high' },
        { rank: 2, name: 'GitHub Jobs', aiTag: 'Tech', yield: 'high' },
        { rank: 3, name: 'AngelList', yield: 'medium' },
      ],
      recruiter: {
        id: 'rohan-kapoor',
        name: 'Rohan Kapoor',
        title: 'Recruiter',
        initials: 'RK',
        bandwidthPct: 78,
        activeReqs: 2,
        closesCount: 1,
        avgCloseDays: 48,
        aiPick: false,
        otherActivePositions: ['UX Designer (Day 8)', 'Data Engineer (Day 31)'],
        planSteps: [
          'Target React Native engineers on LinkedIn with shipped app-store credits.',
          'Use GitHub Jobs to find candidates with open-source RN contributions.',
          'Tap AngelList for startup-seasoned mobile engineers open to a move.',
        ],
      },
      targets: { closeDays: 52, dailySourcingGoal: 3, confidence: 71 },
      relatedJobId: '3',
    },
  },
  {
    id: 'pb-eng-manager',
    name: 'Engineering Manager',
    context: 'Engineering · 8–12 yrs · Bangalore',
    usageNote: 'Used for 2 hires · last Dec 2025',
    jobId: 'JOB-2455',
    closedDaysAgo: 165,
    diffNote: 'Built for an Engineering Manager (8–12 yrs) — a leadership hire leaning on referrals; quite different from this individual-contributor React role.',
    matchPct: 58,
    tags: ['Engineering', 'Leadership', 'Bangalore'],
    summary: { recruiter: 'Arjun M.', channels: 'Referrals + LinkedIn', closeDays: 60 },
    brief: {
      usp: "Managers at Talentou stay close to the code. We hire leaders who coach through craft, not just process — players who still ship and mentors who scale teams.",
      talentPool: {
        locations: ['Bangalore', 'Hyderabad', 'Pune'],
        industries: ['SaaS / B2B', 'Fintech', 'Cloud / DevOps'],
      },
      channels: [
        { rank: 1, name: 'Employee Referrals', yield: 'high' },
        { rank: 2, name: 'LinkedIn Recruiter', aiTag: 'Tech', yield: 'high' },
        { rank: 3, name: 'IIMJobs', yield: 'medium' },
      ],
      recruiter: {
        id: 'arjun-m',
        name: 'Arjun M.',
        title: 'Recruiter',
        initials: 'AM',
        bandwidthPct: 62,
        activeReqs: 2,
        closesCount: 2,
        avgCloseDays: 57,
        aiPick: false,
        otherActivePositions: ['Backend Engineer (Day 5)', 'DevOps Lead (Day 19)'],
        planSteps: [
          'Prioritise warm referrals — leadership hires convert best through trusted intros.',
          'Run targeted LinkedIn outreach to EMs at comparable-stage product companies.',
          'Use IIMJobs for leadership candidates open to a structured move.',
        ],
      },
      targets: { closeDays: 60, dailySourcingGoal: 2, confidence: 68 },
      relatedJobId: '3',
    },
  },
];

// ---- Custom (user-created) playbooks, persisted in localStorage ----

const CUSTOM_KEY = 'customPlaybooks';

export function getCustomPlaybooks(): Playbook[] {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Playbook[]) : [];
  } catch {
    return [];
  }
}

export function addCustomPlaybook(pb: Playbook): void {
  const list = getCustomPlaybooks();
  localStorage.setItem(CUSTOM_KEY, JSON.stringify([{ ...pb, custom: true }, ...list]));
}

export function deleteCustomPlaybook(id: string): void {
  const list = getCustomPlaybooks().filter((p) => p.id !== id);
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
}

/** Custom playbooks first, then the built-in library. */
export function getAllPlaybooks(): Playbook[] {
  return [...getCustomPlaybooks(), ...PLAYBOOK_LIST];
}

export function getTopPlaybooks(n = 3): Playbook[] {
  return [...getAllPlaybooks()].sort((a, b) => b.matchPct - a.matchPct).slice(0, n);
}

export function getPlaybook(id: string): Playbook | undefined {
  return getAllPlaybooks().find((p) => p.id === id);
}

/** "Job closed today" / "Job closed 38 days ago" */
export function formatClosed(daysAgo: number): string {
  if (daysAgo <= 0) return 'Job closed today';
  if (daysAgo === 1) return 'Job closed 1 day ago';
  return `Job closed ${daysAgo} days ago`;
}
