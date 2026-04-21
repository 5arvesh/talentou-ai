import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { TAAssociateJobList } from "@/TAAssociate/Job/TAAssociateJobList";

export function JobListPage_TAAssociate() {
  return (
    <Layout>
      <TAAssociateJobList />
    </Layout>
  );
}

export default JobListPage_TAAssociate;