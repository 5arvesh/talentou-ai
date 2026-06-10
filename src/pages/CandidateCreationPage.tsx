
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { CandidateCreationConversation } from "@/components/candidates/CandidateCreationConversation";

export function CandidateCreationPage() {
  return (
    <AppLayout>
      <CandidateCreationConversation />
    </AppLayout>
  );
}

export default CandidateCreationPage;
