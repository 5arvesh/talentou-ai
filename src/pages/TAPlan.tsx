
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { TalentPlanContent } from '@/components/TA-plan/TalentPlanContent';

export function TAPlan() {
  return (
    <Layout>
      <div className="w-full mx-auto">
        <TalentPlanContent />
      </div>
    </Layout>
  );
}

export default TAPlan;
