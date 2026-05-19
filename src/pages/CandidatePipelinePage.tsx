import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { KanbanBoard } from '@/components/hiring-lead/KanbanBoard';

export function CandidatePipelinePage() {
  const { jobId } = useParams<{ jobId: string }>();
  return (
    <Layout>
      <div className="h-full flex flex-col">
        <KanbanBoard jobId={jobId!} />
      </div>
    </Layout>
  );
}

export default CandidatePipelinePage;
