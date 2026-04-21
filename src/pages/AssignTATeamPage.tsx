
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { AssignTATeamChat } from '@/components/assign/AssignTATeamChat';

export function AssignTATeamPage() {
  return (
    <Layout>
      <div className="w-full mx-auto">
        <AssignTATeamChat />
      </div>
    </Layout>
  );
}

export default AssignTATeamPage;
