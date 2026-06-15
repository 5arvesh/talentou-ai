import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export type NotificationGroup = 'new' | 'earlier';
export type ViewState = 'detail' | 'auto-approve-confirm' | 'generating' | 'ready';

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

export const LOADING_STEPS = [
  'Analysing recruiter bandwidth',
  'Matching past similar plans',
  'Ranking sourcing channels',
  'Resurfacing candidates',
];

const SENIOR_REACT_DEVELOPER_DETAIL: PositionDetail = {
  jobTitle: 'Senior React Developer',
  requestedBy: 'Priya Menon',
  dept: 'Engineering',
  submittedHoursAgo: 2,
  priority: 'High',
  status: 'Active',
  location: 'Bangalore',
  experience: '5-8 Yrs',
  budget: '₹28L - ₹38L',
  openings: 2,
  jdSummary:
    "Seeking a Senior React Developer to lead frontend architecture for our core product suite. Strong React, TypeScript, and state management experience required, with close collaboration across design and backend teams.",
  jdFull:
    "About the role\nWe're hiring a Senior React Developer to own frontend architecture decisions across our core product suite, mentor mid-level engineers, and partner closely with design and backend teams to ship high-quality user experiences.\n\nResponsibilities\n- Lead architecture and code reviews for the frontend codebase\n- Build reusable component libraries and design-system primitives\n- Collaborate with product and design on technical feasibility\n- Mentor junior and mid-level engineers\n- Drive adoption of testing and performance best practices\n\nRequirements\n- 5-8 years of experience building production React applications\n- Strong TypeScript and modern state management (Context, Zustand, Redux)\n- Experience with component-driven design systems (Tailwind, shadcn or similar)\n- Familiarity with REST APIs and async data fetching (React Query)\n- Excellent communication and cross-functional collaboration skills",
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

const STEP_INTERVAL_MS = 1200;

interface PositionApprovalContextValue {
  notifications: ApprovalNotification[];
  selected: ApprovalNotification | null;
  selectedId: string | null;
  viewState: ViewState;
  loadingStepIndex: number;
  selectNotification: (id: string) => void;
  openAutoApproveConfirm: () => void;
  cancelAutoApproveConfirm: () => void;
  confirmAutoApprove: () => void;
  reviewAndApprove: () => void;
}

const PositionApprovalContext = createContext<PositionApprovalContextValue | undefined>(undefined);

export function PositionApprovalProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<ApprovalNotification[]>(INITIAL_NOTIFICATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(
    INITIAL_NOTIFICATIONS.find((n) => n.group === 'new')?.id ?? null
  );
  const [viewState, setViewState] = useState<ViewState>('detail');
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const selected = notifications.find((n) => n.id === selectedId) ?? null;

  const selectNotification = (id: string) => {
    setSelectedId(id);
    setViewState('detail');
    setLoadingStepIndex(0);
  };

  const openAutoApproveConfirm = () => setViewState('auto-approve-confirm');
  const cancelAutoApproveConfirm = () => setViewState('detail');

  const startGeneration = (method: 'auto' | 'manual') => {
    const targetId = selectedId;
    const jobTitle = selected?.position?.jobTitle ?? 'this position';

    setViewState('generating');
    setLoadingStepIndex(0);

    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      if (step >= LOADING_STEPS.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setViewState('ready');
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === targetId
              ? {
                  ...n,
                  isRead: true,
                  group: 'earlier',
                  earlierBadge:
                    method === 'auto'
                      ? { label: 'AI-handled', className: 'bg-[#0e0020] text-[#c084fc]' }
                      : { label: 'Manually approved', className: 'bg-success/10 text-success' },
                }
              : n
          )
        );
        toast.success(`Recruitment plan ready for ${jobTitle}`);
      } else {
        setLoadingStepIndex(step);
      }
    }, STEP_INTERVAL_MS);
  };

  const confirmAutoApprove = () => startGeneration('auto');
  const reviewAndApprove = () => startGeneration('manual');

  return (
    <PositionApprovalContext.Provider
      value={{
        notifications,
        selected,
        selectedId,
        viewState,
        loadingStepIndex,
        selectNotification,
        openAutoApproveConfirm,
        cancelAutoApproveConfirm,
        confirmAutoApprove,
        reviewAndApprove,
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
