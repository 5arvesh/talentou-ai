
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { AssignTATeamChat } from '@/components/assign/AssignTATeamChat';

export function AssignTATeamPage() {
  return (
    <AppLayout>
      <div className="w-full mx-auto">
        <AssignTATeamChat />
      </div>
    </AppLayout>
  );
}

export default AssignTATeamPage;
