import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { TAPlanFlowLayout } from '@/components/ta-plan-flow/TAPlanFlowLayout';

export function TAPlanFlowPage() {
  return (
    <Layout>
      <div className="h-[calc(100vh-64px)]">
        <TAPlanFlowLayout />
      </div>
    </Layout>
  );
}

export default TAPlanFlowPage;
