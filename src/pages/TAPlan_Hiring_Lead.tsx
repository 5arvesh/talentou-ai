
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { TalentPlanContent_Hiring_Lead } from '@/components/TA-plan/TalentPlanContent_Hiring_Lead';

export function TAPlan_Hiring_Lead() {
  return (
    <Layout>
      <div className="w-full mx-auto">
        <TalentPlanContent_Hiring_Lead />
      </div>
    </Layout>
  );
}

export default TAPlan_Hiring_Lead;
