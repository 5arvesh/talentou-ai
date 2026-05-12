import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ImportCandidatesLayout } from "@/components/candidates/ImportCandidatesLayout";

interface ImportCandidatesPageProps {
  role: "ta-leader" | "hiring-lead" | "recruiter";
}

export function ImportCandidatesPage({ role }: ImportCandidatesPageProps) {
  const { jobId } = useParams<{ jobId: string }>();
  const [searchParams] = useSearchParams();
  const jobRole = searchParams.get("jobRole") || "Open Position";

  return (
    <Layout>
      <ImportCandidatesLayout
        jobId={jobId || ""}
        jobRole={jobRole}
        role={role}
      />
    </Layout>
  );
}

export default ImportCandidatesPage;
