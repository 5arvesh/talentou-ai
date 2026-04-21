import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { AIInterviewPerformanceViewer } from "@/components/shared/AIInterviewPerformanceViewer";

export function AIInterviewPerformancePage_TAAssociate() {
  return (
    <Layout>
      <AIInterviewPerformanceViewer role="recruiter" />
    </Layout>
  );
}

export default AIInterviewPerformancePage_TAAssociate;
