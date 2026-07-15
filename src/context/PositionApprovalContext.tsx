import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import type { Playbook } from '@/components/position-approval/playbooks';

export type NotificationGroup = 'new' | 'earlier';
export type ViewState = 'default' | 'edit' | 'approved';
export type SectionKey = 'usp' | 'talentPool' | 'channels' | 'recruiter' | 'targets';
export type EditSource = 'none' | 'manual' | 'chat';

export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
  triggeredSection?: SectionKey;
}

export interface EarlierBadge {
  label: string;
  className: string;
}

export interface PositionDetail {
  jobTitle: string;
  requestedBy: string;
  dept: string;
  submittedHoursAgo: number;
  priority: 'High' | 'Medium' | 'Low';
  status: string;
  location: string;
  experience: string;
  budget: string;
  openings: number;
  jdSummary: string;
  jdFull: string;
}

export interface BriefChannel {
  rank: number;
  name: string;
  aiTag?: string;
  yield: 'high' | 'medium' | 'low';
}

export interface RecruiterOption {
  id: string;
  name: string;
  initials: string;
  title: string;
  bandwidthPct: number;
  activeReqs: number;
  closedRoles: string;
  otherActivePositions: string[];
  aiPick: boolean;
  planSteps: string[];
}

export interface Brief {
  usp: string;
  talentPool: { locations: string[]; industries: string[] };
  channels: BriefChannel[];
  recruiter: {
    id: string;
    name: string;
    title: string;
    initials: string;
    bandwidthPct: number;
    activeReqs: number;
    closesCount: number;
    avgCloseDays: number;
    aiPick: boolean;
    otherActivePositions: string[];
    planSteps: string[];
  };
  targets: { closeDays: number; dailySourcingGoal: number; confidence: number };
  relatedJobId: string;
}

export interface ApprovalNotification {
  id: string;
  group: NotificationGroup;
  isRead: boolean;
  title: string;
  sender: string;
  timestamp: string;
  deptBadge?: string;
  earlierBadge?: EarlierBadge;
  relatedJobId?: string;
  position?: PositionDetail;
}

// Channel IDs used in checkbox grid
export const CHANNEL_IDS = {
  linkedin: 'LinkedIn Recruiter',
  github: 'GitHub Jobs',
  naukri: 'Naukri.com',
  angellist: 'AngelList',
  stackoverflow: 'Stack Overflow Jobs',
  referrals: 'Employee Referrals',
  indeed: 'Indeed',
  glassdoor: 'Glassdoor',
  iimjobs: 'IIMJobs',
} as const;

const RECRUITER_LIST: RecruiterOption[] = [
  {
    id: 'rohan-kapoor',
    name: 'Rohan Kapoor',
    initials: 'RK',
    title: 'Recruiter',
    bandwidthPct: 78,
    activeReqs: 2,
    closedRoles: '3 React closes',
    otherActivePositions: ['UX Designer (Day 8)', 'Data Engineer (Day 31)'],
    aiPick: true,
    planSteps: [
      'Lead with LinkedIn targeting SaaS/fintech engineers in Bangalore & Pune. Set 2/day goal from this channel alone.',
      "Open GitHub Jobs in parallel — Rohan's last React hire came from here. Low-effort, high signal-to-noise ratio.",
      'Run light screening on Naukri alongside UX Designer pipeline to hit daily targets without overloading bandwidth.',
    ],
  },
  {
    id: 'preethi-s',
    name: 'Preethi S.',
    initials: 'PS',
    title: 'Recruiter',
    bandwidthPct: 45,
    activeReqs: 1,
    closedRoles: '1 open req',
    otherActivePositions: ['Product Manager (Day 14)'],
    aiPick: false,
    planSteps: [
      'Preethi has strong bandwidth — prioritise LinkedIn and referrals for fast initial outreach.',
      "Leverage Preethi's PM network to surface candidates from adjacent product-engineering roles.",
      'Run GitHub Jobs as secondary channel with daily check-ins.',
    ],
  },
  {
    id: 'arjun-m',
    name: 'Arjun M.',
    initials: 'AM',
    title: 'Recruiter',
    bandwidthPct: 62,
    activeReqs: 2,
    closedRoles: '2 open reqs',
    otherActivePositions: ['Backend Engineer (Day 5)', 'DevOps Lead (Day 19)'],
    aiPick: false,
    planSteps: [
      "Arjun's backend focus complements React sourcing — tap LinkedIn for full-stack candidates.",
      "Use GitHub Jobs given Arjun's track record with engineering hires.",
      'Keep Naukri as a supplemental channel to widen the pool.',
    ],
  },
];

const SENIOR_REACT_DEVELOPER_DETAIL: PositionDetail = {
  jobTitle: 'Senior React Developer',
  requestedBy: 'Priya Menon',
  dept: 'Engineering',
  submittedHoursAgo: 2,
  priority: 'High',
  status: 'Active',
  location: 'Bangalore',
  experience: '4–7 yrs',
  budget: '₹18–24L',
  openings: 2,
  jdSummary:
    'Seeking a Senior React Developer to lead frontend architecture for our core product suite. Strong React, TypeScript, and state management experience required, with close collaboration across design and backend teams.',
  jdFull:
    "About the role\nWe're hiring a Senior React Developer to own frontend architecture decisions across our core product suite, mentor mid-level engineers, and partner closely with design and backend teams to ship high-quality user experiences.\n\nResponsibilities\n- Lead architecture and code reviews for the frontend codebase\n- Build reusable component libraries and design-system primitives\n- Collaborate with product and design on technical feasibility\n- Mentor junior and mid-level engineers\n- Drive adoption of testing and performance best practices\n\nRequirements\n- 4-7 years of experience building production React applications\n- Strong TypeScript and modern state management (Context, Zustand, Redux)\n- Experience with component-driven design systems (Tailwind, shadcn or similar)\n- Familiarity with REST APIs and async data fetching (React Query)\n- Excellent communication and cross-functional collaboration skills",
};

const SENIOR_REACT_DEVELOPER_BRIEF: Brief = {
  usp: "Talentou is where engineers ship real product from day one — no JIRA backlog theatre, no committee-driven decisions. Our React team owns the full stack and has shipped 4 major product releases in the last 6 months.",
  talentPool: {
    locations: ['Bangalore', 'Pune', 'Hyderabad', 'Chennai'],
    industries: ['SaaS / B2B', 'Fintech', 'HR Tech', 'E-commerce', 'EdTech'],
  },
  channels: [
    { rank: 1, name: 'LinkedIn Recruiter', aiTag: 'Tech', yield: 'high' },
    { rank: 2, name: 'GitHub Jobs', aiTag: 'Tech', yield: 'high' },
    { rank: 3, name: 'Employee Referrals', yield: 'medium' },
    { rank: 4, name: 'Naukri.com', yield: 'medium' },
    { rank: 5, name: 'Stack Overflow Jobs', aiTag: 'Tech', yield: 'medium' },
    { rank: 6, name: 'AngelList', yield: 'low' },
  ],
  recruiter: {
    id: 'rohan-kapoor',
    name: 'Rohan Kapoor',
    title: 'Recruiter',
    initials: 'RK',
    bandwidthPct: 78,
    activeReqs: 2,
    closesCount: 3,
    avgCloseDays: 31,
    aiPick: true,
    otherActivePositions: ['UX Designer (Day 8)', 'Data Engineer (Day 31)'],
    planSteps: [
      'Lead with LinkedIn targeting SaaS/fintech engineers in Bangalore & Pune. Set 2/day goal from this channel alone.',
      "Open GitHub Jobs in parallel — Rohan's last React hire came from here. Low-effort, high signal-to-noise ratio.",
      'Run light screening on Naukri alongside UX Designer pipeline to hit daily targets without overloading bandwidth.',
    ],
  },
  targets: { closeDays: 42, dailySourcingGoal: 4, confidence: 83 },
  relatedJobId: '3',
};

const BRIEF_MAP: Record<string, Brief> = {
  'notif-senior-react-developer': SENIOR_REACT_DEVELOPER_BRIEF,
};

const INITIAL_NOTIFICATIONS: ApprovalNotification[] = [
  {
    id: 'notif-senior-react-developer',
    group: 'new',
    isRead: false,
    title: 'Senior React Developer',
    sender: 'Priya Menon',
    timestamp: '2h ago',
    deptBadge: 'Engineering',
    relatedJobId: '3',
    position: SENIOR_REACT_DEVELOPER_DETAIL,
  },
  {
    id: 'notif-data-engineer-ready',
    group: 'earlier',
    isRead: true,
    title: 'Plan ready: Data Engineer',
    sender: 'Talentou AI',
    timestamp: 'Yesterday',
    earlierBadge: { label: 'AI-handled', className: 'bg-[#0e0020] text-[#c084fc]' },
  },
  {
    id: 'notif-ux-designer-target-change',
    group: 'earlier',
    isRead: true,
    title: 'Target change: UX Designer',
    sender: 'Rohan Kapoor',
    timestamp: '2 days ago',
    earlierBadge: { label: 'Pending your approval', className: 'bg-destructive/10 text-destructive' },
    relatedJobId: '4',
  },
];

interface PositionApprovalContextValue {
  notifications: ApprovalNotification[];
  selected: ApprovalNotification | null;
  selectedId: string | null;
  viewState: ViewState;
  brief: Brief | null;
  appliedPlaybookName: string | null;
  appliedPlaybookNote: string | null;
  editSourceMap: Partial<Record<SectionKey, EditSource>>;
  chatMessages: ChatMessage[];
  editingSection: SectionKey | null;
  recruiterList: RecruiterOption[];
  // USP edit
  editDraft: string;
  // TalentPool edit
  editLocations: string[];
  editIndustries: string[];
  // Channels edit
  editChannels: string[];
  editCustomChannels: string[];
  // Recruiter edit
  editSelectedRecruiterId: string;
  editPlanSteps: string[];
  editingPlanStepIndex: number | null;
  editPlanStepDraft: string;
  // Targets edit
  editCloseDays: number;
  editDailySourcing: number;
  // Actions
  selectNotification: (id: string) => void;
  enterEditMode: () => void;
  markEditedViaChat: (section: SectionKey) => void;
  discardEditMode: () => void;
  applyPlaybook: (pb: Playbook) => void;
  sendChatMessage: (content: string) => void;
  startEditing: (section: SectionKey) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  setEditDraft: (value: string) => void;
  setEditLocations: (v: string[]) => void;
  setEditIndustries: (v: string[]) => void;
  setEditChannels: (selected: string[], custom: string[]) => void;
  selectRecruiter: (id: string) => void;
  startEditingPlanStep: (index: number) => void;
  savePlanStep: () => void;
  cancelPlanStepEdit: () => void;
  setPlanStepDraft: (v: string) => void;
  addPlanStep: () => void;
  removePlanStep: (index: number) => void;
  setEditCloseDays: (v: number) => void;
  setEditDailySourcing: (v: number) => void;
  confirmSend: () => void;
}

const PositionApprovalContext = createContext<PositionApprovalContextValue | undefined>(undefined);

function makeMsgId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function PositionApprovalProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<ApprovalNotification[]>(INITIAL_NOTIFICATIONS);
  const initialId = INITIAL_NOTIFICATIONS.find((n) => n.group === 'new')?.id ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(initialId);
  const [viewState, setViewState] = useState<ViewState>('default');
  const [brief, setBrief] = useState<Brief | null>(
    initialId ? (BRIEF_MAP[initialId] ?? null) : null
  );
  const [editSourceMap, setEditSourceMap] = useState<Partial<Record<SectionKey, EditSource>>>({});
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [editingSection, setEditingSection] = useState<SectionKey | null>(null);
  const [appliedPlaybookName, setAppliedPlaybookName] = useState<string | null>(null);
  const [appliedPlaybookNote, setAppliedPlaybookNote] = useState<string | null>(null);
  // Pristine AI brief for the selected notification — used to fully revert on Discard
  const aiBriefRef = useRef<Brief | null>(initialId ? (BRIEF_MAP[initialId] ?? null) : null);
  // USP
  const [editDraft, setEditDraft] = useState('');
  // TalentPool
  const [editLocations, setEditLocations] = useState<string[]>([]);
  const [editIndustries, setEditIndustries] = useState<string[]>([]);
  // Channels
  const [editChannels, setEditChannelsState] = useState<string[]>([]);
  const [editCustomChannels, setEditCustomChannels] = useState<string[]>([]);
  // Recruiter
  const [editSelectedRecruiterId, setEditSelectedRecruiterId] = useState('');
  const [editPlanSteps, setEditPlanSteps] = useState<string[]>([]);
  const [editingPlanStepIndex, setEditingPlanStepIndex] = useState<number | null>(null);
  const [editPlanStepDraft, setEditPlanStepDraft] = useState('');
  // Targets
  const [editCloseDays, setEditCloseDays] = useState(42);
  const [editDailySourcing, setEditDailySourcing] = useState(4);

  const selected = notifications.find((n) => n.id === selectedId) ?? null;

  const selectNotification = (id: string) => {
    setSelectedId(id);
    setViewState('default');
    const aiBrief = BRIEF_MAP[id] ?? null;
    aiBriefRef.current = aiBrief;
    setBrief(aiBrief);
    setEditSourceMap({});
    setChatMessages([]);
    setEditingSection(null);
    setAppliedPlaybookName(null);
    setAppliedPlaybookNote(null);
    setEditDraft('');
  };

  const enterEditMode = useCallback(() => {
    setViewState('edit');
  }, []);

  // Demo-only: lets the product tour guarantee a section is flagged "Updated via chat"
  // to point its coach mark at, without driving a real AI chat message.
  const markEditedViaChat = useCallback((section: SectionKey) => {
    setEditSourceMap((prev) => (prev[section] === 'chat' ? prev : { ...prev, [section]: 'chat' }));
  }, []);

  const discardEditMode = useCallback(() => {
    setViewState('default');
    if (aiBriefRef.current) setBrief(aiBriefRef.current);
    setEditSourceMap({});
    setChatMessages([]);
    setEditingSection(null);
    setAppliedPlaybookName(null);
    setAppliedPlaybookNote(null);
    setEditDraft('');
  }, []);

  const applyPlaybook = useCallback((pb: Playbook) => {
    setBrief(pb.brief);
    setEditSourceMap({});
    setChatMessages([]);
    setEditingSection(null);
    setAppliedPlaybookName(pb.name);
    setAppliedPlaybookNote(pb.diffNote);
    setViewState('edit');
  }, []);

  const sendChatMessage = useCallback((content: string) => {
    const userMsg: ChatMessage = {
      id: makeMsgId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMsg]);

    const lower = content.toLowerCase();

    setTimeout(() => {
      let aiContent = '';
      let triggeredSection: SectionKey | undefined;

      if (lower.includes('close') || lower.includes('target') || lower.includes('week') || lower.includes('day')) {
        const newDays = 56;
        setBrief((prev) => prev ? { ...prev, targets: { ...prev.targets, closeDays: newDays } } : prev);
        setEditSourceMap((prev) => ({ ...prev, targets: 'chat' }));
        triggeredSection = 'targets';
        aiContent = `Done — I've updated the close target to ${newDays} days (8 weeks). The daily sourcing goal stays at 4/day to keep the pace realistic. You can fine-tune it with the pencil if you'd like.`;
      } else if (lower.includes('channel') || lower.includes('github') || lower.includes('linkedin') || lower.includes('naukri')) {
        setBrief((prev) => {
          if (!prev) return prev;
          const reordered = [
            { rank: 1, name: 'GitHub Jobs', aiTag: 'Tech', yield: 'high' as const },
            { rank: 2, name: 'LinkedIn Recruiter', aiTag: 'Tech', yield: 'high' as const },
            { rank: 3, name: 'Employee Referrals', yield: 'medium' as const },
            { rank: 4, name: 'Naukri.com', yield: 'medium' as const },
          ];
          return { ...prev, channels: reordered };
        });
        setEditSourceMap((prev) => ({ ...prev, channels: 'chat' }));
        triggeredSection = 'channels';
        aiContent = "Updated — I've moved GitHub Jobs to the top channel since it had the best signal for React roles in the past 3 months. LinkedIn stays as a strong secondary. Review the order on the right.";
      } else if (lower.includes('recruiter') || lower.includes('assign') || lower.includes('preethi') || lower.includes('bandwidth')) {
        const preethi = RECRUITER_LIST.find((r) => r.id === 'preethi-s')!;
        setBrief((prev) => prev ? {
          ...prev,
          recruiter: {
            ...prev.recruiter,
            id: preethi.id,
            name: preethi.name,
            initials: preethi.initials,
            title: preethi.title,
            bandwidthPct: preethi.bandwidthPct,
            activeReqs: preethi.activeReqs,
            aiPick: false,
            otherActivePositions: preethi.otherActivePositions,
            planSteps: preethi.planSteps,
          },
        } : prev);
        setEditSourceMap((prev) => ({ ...prev, recruiter: 'chat' }));
        triggeredSection = 'recruiter';
        aiContent = "Switched — I've reassigned to Preethi S. She has more bandwidth right now (45% vs 78%) and her PM network should surface good product-adjacent engineers. Plan steps updated accordingly.";
      } else {
        aiContent = "I've reviewed the plan — it looks well-optimized for the role. Is there a specific section you'd like me to adjust? For example, I can update the close date, change the channel priority, or reassign the recruiter.";
      }

      const aiMsg: ChatMessage = {
        id: makeMsgId(),
        role: 'ai',
        content: aiContent,
        timestamp: new Date(),
        triggeredSection,
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 900);
  }, []);

  const startEditing = (section: SectionKey) => {
    if (!brief) return;
    setEditingSection(section);
    if (section === 'usp') {
      setEditDraft(brief.usp);
    } else if (section === 'talentPool') {
      setEditLocations([...brief.talentPool.locations]);
      setEditIndustries([...brief.talentPool.industries]);
    } else if (section === 'channels') {
      setEditChannelsState(brief.channels.map((c) => c.name));
      setEditCustomChannels([]);
    } else if (section === 'recruiter') {
      setEditSelectedRecruiterId(brief.recruiter.id);
      setEditPlanSteps([...brief.recruiter.planSteps]);
      setEditingPlanStepIndex(null);
      setEditPlanStepDraft('');
    } else if (section === 'targets') {
      setEditCloseDays(brief.targets.closeDays);
      setEditDailySourcing(brief.targets.dailySourcingGoal);
    }
  };

  const saveEdit = () => {
    if (!brief || !editingSection) return;
    setBrief((prev) => {
      if (!prev) return prev;
      if (editingSection === 'usp') {
        return { ...prev, usp: editDraft.trim() };
      }
      if (editingSection === 'talentPool') {
        return {
          ...prev,
          talentPool: { locations: editLocations, industries: editIndustries },
        };
      }
      if (editingSection === 'channels') {
        const knownChannelIds = Object.values(CHANNEL_IDS);
        const known = editChannels
          .filter((ch) => knownChannelIds.includes(ch as typeof knownChannelIds[number]))
          .map((name, i) => ({
            rank: i + 1,
            name,
            aiTag: ['LinkedIn Recruiter', 'GitHub Jobs'].includes(name) ? 'Tech' : undefined,
            yield: (name === 'LinkedIn Recruiter' || name === 'GitHub Jobs' ? 'high' : 'medium') as BriefChannel['yield'],
          }));
        const custom = editCustomChannels.map((name, i) => ({
          rank: known.length + i + 1,
          name,
          yield: 'medium' as BriefChannel['yield'],
        }));
        return { ...prev, channels: [...known, ...custom] };
      }
      if (editingSection === 'recruiter') {
        const rec = RECRUITER_LIST.find((r) => r.id === editSelectedRecruiterId);
        if (!rec) return prev;
        return {
          ...prev,
          recruiter: {
            ...prev.recruiter,
            id: rec.id,
            name: rec.name,
            initials: rec.initials,
            title: rec.title,
            bandwidthPct: rec.bandwidthPct,
            activeReqs: rec.activeReqs,
            aiPick: rec.aiPick,
            otherActivePositions: rec.otherActivePositions,
            planSteps: editPlanSteps,
          },
        };
      }
      if (editingSection === 'targets') {
        return {
          ...prev,
          targets: { ...prev.targets, closeDays: editCloseDays, dailySourcingGoal: editDailySourcing },
        };
      }
      return prev;
    });
    // Manual edit always overwrites chat source
    setEditSourceMap((prev) => ({ ...prev, [editingSection]: 'manual' }));
    setEditingSection(null);
    setEditDraft('');
    setEditingPlanStepIndex(null);
    setEditPlanStepDraft('');
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setEditDraft('');
    setEditingPlanStepIndex(null);
    setEditPlanStepDraft('');
  };

  const setEditChannels = (selected: string[], custom: string[]) => {
    setEditChannelsState(selected);
    setEditCustomChannels(custom);
  };

  const selectRecruiter = (id: string) => {
    setEditSelectedRecruiterId(id);
    const rec = RECRUITER_LIST.find((r) => r.id === id);
    if (rec) setEditPlanSteps([...rec.planSteps]);
  };

  const startEditingPlanStep = (index: number) => {
    setEditingPlanStepIndex(index);
    setEditPlanStepDraft(editPlanSteps[index] ?? '');
  };

  const savePlanStep = () => {
    if (editingPlanStepIndex === null) return;
    setEditPlanSteps((prev) =>
      prev.map((s, i) => (i === editingPlanStepIndex ? editPlanStepDraft.trim() || s : s))
    );
    setEditingPlanStepIndex(null);
    setEditPlanStepDraft('');
  };

  const cancelPlanStepEdit = () => {
    setEditingPlanStepIndex(null);
    setEditPlanStepDraft('');
  };

  const setPlanStepDraft = (v: string) => setEditPlanStepDraft(v);

  const addPlanStep = () => {
    const newSteps = [...editPlanSteps, ''];
    setEditPlanSteps(newSteps);
    setEditingPlanStepIndex(newSteps.length - 1);
    setEditPlanStepDraft('');
  };

  const removePlanStep = (index: number) => {
    setEditPlanSteps((prev) => prev.filter((_, i) => i !== index));
    setEditingPlanStepIndex(null);
    setEditPlanStepDraft('');
  };

  const confirmSend = () => {
    const targetId = selectedId;
    const jobTitle = selected?.position?.jobTitle ?? 'this position';
    const recruiterName = brief?.recruiter.name ?? 'the recruiter';
    setViewState('approved');
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === targetId
          ? {
              ...n,
              isRead: true,
              group: 'earlier',
              earlierBadge: { label: 'Sent', className: 'bg-success/10 text-success' },
            }
          : n
      )
    );
    toast.success(`Plan sent to ${recruiterName} for ${jobTitle}`);
  };

  return (
    <PositionApprovalContext.Provider
      value={{
        notifications,
        selected,
        selectedId,
        viewState,
        brief,
        appliedPlaybookName,
        appliedPlaybookNote,
        editSourceMap,
        chatMessages,
        editingSection,
        recruiterList: RECRUITER_LIST,
        editDraft,
        editLocations,
        editIndustries,
        editChannels,
        editCustomChannels,
        editSelectedRecruiterId,
        editPlanSteps,
        editingPlanStepIndex,
        editPlanStepDraft,
        editCloseDays,
        editDailySourcing,
        selectNotification,
        enterEditMode,
        markEditedViaChat,
        discardEditMode,
        applyPlaybook,
        sendChatMessage,
        startEditing,
        saveEdit,
        cancelEdit,
        setEditDraft,
        setEditLocations,
        setEditIndustries,
        setEditChannels,
        selectRecruiter,
        startEditingPlanStep,
        savePlanStep,
        cancelPlanStepEdit,
        setPlanStepDraft,
        addPlanStep,
        removePlanStep,
        setEditCloseDays,
        setEditDailySourcing,
        confirmSend,
      }}
    >
      {children}
    </PositionApprovalContext.Provider>
  );
}

export function usePositionApproval() {
  const context = useContext(PositionApprovalContext);
  if (!context) {
    throw new Error('usePositionApproval must be used within PositionApprovalProvider');
  }
  return context;
}

export { RECRUITER_LIST };
