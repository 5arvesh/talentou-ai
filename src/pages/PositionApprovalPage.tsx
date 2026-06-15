import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PositionApprovalProvider } from '@/context/PositionApprovalContext';
import { PositionApprovalNotificationList } from '@/components/position-approval/PositionApprovalNotificationList';
import { PositionDetailPanel } from '@/components/position-approval/PositionDetailPanel';

export function PositionApprovalPage() {
  return (
    <Layout>
      <PositionApprovalProvider>
        <div className="h-full flex">
          <PositionApprovalNotificationList />
          <PositionDetailPanel />
        </div>
      </PositionApprovalProvider>
    </Layout>
  );
}

export default PositionApprovalPage;
