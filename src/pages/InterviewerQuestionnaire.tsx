import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { QuestionnaireHub } from '@/components/interviewer/QuestionnaireHub';

export function InterviewerQuestionnaire() {
  return (
    <Layout>
      <QuestionnaireHub />
    </Layout>
  );
}

export default InterviewerQuestionnaire;