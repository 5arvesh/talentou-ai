import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { InterviewerJobList } from '@/components/interviewer/InterviewerJobList';

export function InterviewerJobsPage() {
  return (
    <Layout>
      <InterviewerJobList />
    </Layout>
  );
}

export default InterviewerJobsPage;