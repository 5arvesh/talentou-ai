
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { OnboardHiringLeadChat } from '@/components/assign/OnboardHiringLeadChat';

export function OnboardHiringLeadPage() {
  return (
    <Layout>
      <div className="w-full mx-auto">
        <OnboardHiringLeadChat />
      </div>
    </Layout>
  );
}

export default OnboardHiringLeadPage;
