import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { JobDashboard } from '@/components/job-dashboard/JobDashboard';
import { RoleType, JobItem } from '@/components/shared/ModernJobList';

export function JobDashboardPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const location = useLocation();
  const role: RoleType = location.pathname.startsWith('/sales-plan')
    ? 'ta-leader'
    : location.pathname.startsWith('/ta-associate')
    ? 'recruiter'
    : 'hiring-lead';

  const job = (location.state as { job?: JobItem } | null)?.job;

  return (
    <Layout>
      <JobDashboard jobId={jobId!} role={role} jobOverride={job} />
    </Layout>
  );
}

export default JobDashboardPage;
