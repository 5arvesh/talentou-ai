import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { CandidatesPage } from "@/components/hiring-lead/CandidatesPage";

export function CandidatesPageWrapper_TAAssociate() {
  return (
    <Layout>
      <CandidatesPage role="recruiter" />
    </Layout>
  );
}

export default CandidatesPageWrapper_TAAssociate;
