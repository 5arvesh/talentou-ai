import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { AIInterviewPerformanceViewer } from "@/components/shared/AIInterviewPerformanceViewer";

export function AIInterviewPerformancePage_HiringLead() {
  return (
    <Layout>
      <AIInterviewPerformanceViewer role="hiring-lead" />
    </Layout>
  );
}

export default AIInterviewPerformancePage_HiringLead;
