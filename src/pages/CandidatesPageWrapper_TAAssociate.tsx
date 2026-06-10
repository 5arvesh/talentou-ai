import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { CandidatesPage } from "@/components/hiring-lead/CandidatesPage";

export function CandidatesPageWrapper_TAAssociate() {
  return (
    <AppLayout>
      <CandidatesPage role="recruiter" />
    </AppLayout>
  );
}

export default CandidatesPageWrapper_TAAssociate;
