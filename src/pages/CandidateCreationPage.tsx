
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { CandidateCreationConversation } from "@/components/candidates/CandidateCreationConversation";

export function CandidateCreationPage() {
  return (
    <Layout>
      <CandidateCreationConversation />
    </Layout>
  );
}

export default CandidateCreationPage;
