import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { CandidatesPage } from "@/components/hiring-lead/CandidatesPage";

export function CandidatesPageWrapper_TALeader() {
  return (
    <AppLayout>
      <CandidatesPage />
    </AppLayout>
  );
}

export default CandidatesPageWrapper_TALeader;