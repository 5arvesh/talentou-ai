import React from 'react';
import { Routes, Route } from "react-router-dom";
import { SalesPlanDashboard_TA_Associate } from "./TalentPlanDashboard_TA_Associate";
import TAAssociateDashboard from '../dashboard/TAAssociateDashboard';
import { TAPlanReviewPage } from "@/components/ta-associate-review/TAPlanReviewPage";
import { MessageSubmission_TA_Associate } from "@/components/messages/MessageSubmission_TA_Associate";
import { MessageChat_TA_Associate } from "@/components/messages/MessageChat_TA_Associate";
import { ValueProposition_TA_Associate } from "@/components/messages/ValueProposition_TA_Associate";
import { Collaterals_TA_Associate } from "@/components/messages/Collaterals_TA_Associate";
import { TalentPool_TA_Associate } from "@/components/messages/TalentPool_TA_Associate";
import { RecruitmentChannel_TA_Associate } from "@/components/messages/RecruitmentChannel_TA_Associate";
import { MarketDatabase_TA_Associate } from "@/components/market/MarketDatabase_TA_Associate";
import { MarketDatabaseChat_TA_Associate } from "@/components/market/MarketDatabaseChat_TA_Associate";
import { MediaOutreach_TA_Associate } from "@/components/media/MediaOutreach_TA_Associate";
import { MediaOutreachChat_TA_Associate } from "@/components/media/MediaOutreachChat_TA_Associate";
import { MeasureKPI_TA_Associate } from "@/components/measure/MeasureKPI_TA_Associate";
import { MeasureKPIChat_TA_Associate } from "@/components/measure/MeasureKPIChat_TA_Associate";
import { SuccessMetrics_TA_Associate } from "@/components/measure/SuccessMetrics_TA_Associate";
import { AssignSDRs_TA_Associate } from "@/components/assign/AssignSDRs_TA_Associate";
import { AssignTATeamChat_TA_Associate } from "@/components/assign/AssignTATeamChat_TA_Associate";
import CompanyList from '@/TAAssociate/Company/CompanyList';
import JobList from '@/TAAssociate/Job/JobList';
import Candidates from '@/TAAssociate/Candidate/Candidates';

export const TalentPlanContent_TA_Associate = () => {
  return (
    <div className="w-full overflow-hidden">
      <Routes>
        <Route path="/" element={<TAPlanReviewPage />} />
        <Route path="/plan-dashboard" element={<SalesPlanDashboard_TA_Associate />} />
        <Route path="/dashboard" element={<TAAssociateDashboard />} />
        <Route path="/message" element={<MessageSubmission_TA_Associate />} />
        <Route path="/message-chat" element={<MessageChat_TA_Associate />} />
        <Route path="/message-plan-chat" element={<ValueProposition_TA_Associate />} />
        <Route path="/value-proposition" element={<ValueProposition_TA_Associate />} />
        <Route path="/collaterals" element={<Collaterals_TA_Associate />} />
        <Route path="/talent-pool" element={<TalentPool_TA_Associate />} />
        <Route path="/recruitment-channel" element={<RecruitmentChannel_TA_Associate />} />
        <Route path="/success-metrics" element={<SuccessMetrics_TA_Associate />} />
        <Route path="/market-database" element={<MarketDatabase_TA_Associate />} />
        <Route path="/market-database-chat" element={<MarketDatabaseChat_TA_Associate />} />
        <Route path="/media-outreach" element={<MediaOutreach_TA_Associate />} />
        <Route path="/media-outreach-chat" element={<MediaOutreachChat_TA_Associate />} />
        <Route path="/measure-kpi" element={<MeasureKPI_TA_Associate />} />
        <Route path="/measure-kpi-chat" element={<MeasureKPIChat_TA_Associate />} />
        <Route path="/assign-sdrs" element={<AssignSDRs_TA_Associate />} />
        <Route path="/assign-ta-team" element={<AssignTATeamChat_TA_Associate />} />
        <Route path="/projects" element={<CompanyList />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </div>
  );
};
