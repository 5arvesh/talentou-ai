import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PositionApprovalProvider, usePositionApproval } from '@/context/PositionApprovalContext';
import { PositionApprovalNotificationList } from '@/components/position-approval/PositionApprovalNotificationList';
import { AIPlanPanel } from '@/components/position-approval/AIPlanPanel';
import { EditModeChatPanel } from '@/components/position-approval/EditModeChatPanel';
import { RecruitmentBrief } from '@/components/position-approval/RecruitmentBrief';
import { getPlaybook } from '@/components/position-approval/playbooks';

function PositionApprovalInner() {
  const { viewState, applyPlaybook } = usePositionApproval();
  const location = useLocation();
  const navigate = useNavigate();

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
