import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, BookMarked } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PositionApprovalProvider, usePositionApproval } from '@/context/PositionApprovalContext';
import { PositionApprovalNotificationList } from '@/components/position-approval/PositionApprovalNotificationList';
import { AIPlanPanel } from '@/components/position-approval/AIPlanPanel';
import { EditModeChatPanel } from '@/components/position-approval/EditModeChatPanel';
import { RecruitmentBrief } from '@/components/position-approval/RecruitmentBrief';
import { getPlaybook } from '@/components/position-approval/playbooks';
import { TourStep } from '@/store/tour-store';
import { useScreenTour } from '@/hooks/useScreenTour';
import { RL_TOUR_SCREEN_SEQUENCE } from '@/constants/tourScreens';

function buildNewPositionTourSteps(
  enterEditMode: () => void,
  discardEditMode: () => void,
  markEditedViaChat: (section: 'usp') => void
): TourStep[] {
  return [
    {
      variant: 'intro',
      icon: Sparkles,
      screenSequence: RL_TOUR_SCREEN_SEQUENCE,
      screenKey: 'new-position',
      title: "AI drafts, you decide",
      description: "When a hiring manager submits a new role, Talentou reads the requirements and drafts a full plan for you to review — you're never starting from a blank page.",
    },
    {
      variant: 'intro',
      icon: BookMarked,
      screenSequence: RL_TOUR_SCREEN_SEQUENCE,
      screenKey: 'new-position',
      title: "Playbooks speed things up",
      description: "If you've hired for a similar role before, the AI suggests a matching Playbook — a reusable plan you can apply with one click and tweak from there.",
    },
    {
      targetSelector: '[data-tour-id="pa-ai-review-btn"]',
      title: "Start here",
      description: "Opens the AI's draft plan for this new position.",
    },
    {
      targetSelector: '[data-tour-id="pa-plan-summary"]',
      title: "What the AI drafted",
      description: "Assigned recruiter and bandwidth, talent pool, sourcing channels, days to close, daily sourcing goal, and confidence — all pre-filled from the job requirements.",
    },
    {
      targetSelector: '[data-tour-id="pa-playbook-suggestions"]',
      title: "Suggested Playbooks",
      description: "The AI matched this role to past plans that worked. Each shows the source Job ID, when it closed, and what's different this time. Apply one to pre-fill the plan, then adjust.",
    },
    {
      targetSelector: '[data-tour-id="pa-footer-actions"]',
      title: "Three ways forward",
      description: "View JD to see the full job description, Edit the AI plan to make changes before approving, or Approve & implement plan to send it straight to the recruiter.",
    },
    {
      targetSelector: '[data-tour-id="pa-chat-input"]',
      title: "Editing by conversation",
      description: "Type here to change any part of the plan — just say what you want, and the AI updates it for you.",
      onEnter: () => enterEditMode(),
    },
    {
      targetSelector: '[data-tour-id="pa-chat-flag"]',
      title: "What changed",
      description: "Fields you change via chat get marked so you know what the AI touched vs. what you wrote yourself.",
      onEnter: () => {
        enterEditMode();
        markEditedViaChat('usp');
      },
    },
    {
      targetSelector: '[data-tour-id="pa-approve-btn"]',
      title: "Approving",
      description: "Sends the plan straight to the assigned recruiter — no extra confirmation, so only click this when you're done editing.",
      onEnter: () => discardEditMode(),
    },
  ];
}

function PositionApprovalInner() {
  const { viewState, applyPlaybook, enterEditMode, discardEditMode, markEditedViaChat } = usePositionApproval();
  const location = useLocation();
  const navigate = useNavigate();

  const tourSteps = useMemo(
    () => buildNewPositionTourSteps(enterEditMode, discardEditMode, markEditedViaChat),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useScreenTour('ta-leader', 'new-position', tourSteps);

  // A Playbook selected from the Library returns here via navigation state.
  useEffect(() => {
    const applyPlaybookId = (location.state as { applyPlaybookId?: string } | null)?.applyPlaybookId;
    if (!applyPlaybookId) return;
    const pb = getPlaybook(applyPlaybookId);
    if (pb) applyPlaybook(pb);
    // Clear the state so it doesn't re-fire on refresh/back.
    navigate(location.pathname, { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <div className="h-full flex overflow-hidden">
      <PositionApprovalNotificationList />
      {viewState === 'default' && <AIPlanPanel />}
      {viewState === 'edit' && (
        <>
          <EditModeChatPanel />
          <RecruitmentBrief />
        </>
      )}
      {viewState === 'approved' && <RecruitmentBrief />}
    </div>
  );
}

export function PositionApprovalPage() {
  return (
    <Layout>
      <PositionApprovalProvider>
        <PositionApprovalInner />
      </PositionApprovalProvider>
    </Layout>
  );
}

export default PositionApprovalPage;
