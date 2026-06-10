import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { KanbanBoard } from '@/components/hiring-lead/KanbanBoard';
import { RoleType } from '@/components/shared/ModernJobList';

export function CandidatePipelinePage() {
  const { jobId } = useParams<{ jobId: string }>();
  const location = useLocation();
  const role: RoleType = location.pathname.startsWith('/sales-plan')
    ? 'ta-leader'
    : location.pathname.startsWith('/ta-associate')
    ? 'recruiter'
    : 'hiring-lead';

  return (
    <Layout>
      <div className="h-full flex flex-col">
        <KanbanBoard jobId={jobId!} role={role} />
      </div>
    </Layout>
  );
}

export default CandidatePipelinePage;
