
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { CandidatesPage } from "@/components/hiring-lead/CandidatesPage";

export function CandidatesPageWrapper() {
  return (
    <Layout>
      <CandidatesPage />
    </Layout>
  );
}

export default CandidatesPageWrapper;
