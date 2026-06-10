import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { HiringLeadConversationLayout } from "@/components/hiring-lead-conversation/HiringLeadConversationLayout";

export function HiringLeadConversationPage() {
  return (
    <AppLayout>
      <HiringLeadConversationLayout />
    </AppLayout>
  );
}

export default HiringLeadConversationPage;
