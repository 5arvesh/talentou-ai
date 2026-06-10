
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { OnboardHiringLeadChat } from '@/components/assign/OnboardHiringLeadChat';

export function OnboardHiringLeadPage() {
  return (
    <AppLayout>
      <div className="w-full mx-auto">
        <OnboardHiringLeadChat />
      </div>
    </AppLayout>
  );
}

export default OnboardHiringLeadPage;
