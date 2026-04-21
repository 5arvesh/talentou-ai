
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { JobList } from "@/components/hiring-lead/JobList";

export function JobListPage() {
  return (
    <Layout>
      <JobList />
    </Layout>
  );
}

export default JobListPage;
