import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { CandidatesPage } from '@/components/hiring-lead/CandidatesPage';

export function InterviewerCandidatesPage() {
  return (
    <Layout>
      <CandidatesPage role="interviewer" />
    </Layout>
  );
}

export default InterviewerCandidatesPage;