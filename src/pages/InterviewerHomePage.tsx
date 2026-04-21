import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { InterviewerDashboard } from '@/components/dashboard/InterviewerDashboard';

export function InterviewerHomePage() {
  return (
    <Layout>
      <InterviewerDashboard />
    </Layout>
  );
}

export default InterviewerHomePage;