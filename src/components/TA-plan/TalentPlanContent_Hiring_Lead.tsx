
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { SalesPlanDashboard_Hiring_Lead } from "./TalentPlanDashboard_Hiring_Lead";
import { MessageSubmission_Hiring_Lead } from "@/components/messages/MessageSubmission_Hiring_Lead";
import { MessageChat_Hiring_Lead } from "@/components/messages/MessageChat_Hiring_Lead";
import { MessagePlanChat_Hiring_Lead } from "@/components/messages/MessagePlanChat_Hiring_Lead";
import { MarketDatabase_Hiring_Lead } from "@/components/market/MarketDatabase_Hiring_Lead";
import { MarketDatabaseChat_Hiring_Lead } from "@/components/market/MarketDatabaseChat_Hiring_Lead";
import { MediaOutreach_Hiring_Lead } from "@/components/media/MediaOutreach_Hiring_Lead";
import { MediaOutreachChat_Hiring_Lead } from "@/components/media/MediaOutreachChat_Hiring_Lead";
import { MeasureKPI_Hiring_Lead } from "@/components/measure/MeasureKPI_Hiring_Lead";
import { MeasureKPIChat_Hiring_Lead } from "@/components/measure/MeasureKPIChat_Hiring_Lead";
import { AssignSDRs_Hiring_Lead } from "@/components/assign/AssignSDRs_Hiring_Lead";
import { AssignTATeamChat_Hiring_Lead } from "@/components/assign/AssignTATeamChat_Hiring_Lead";
import { HiringLeadDashboard } from '../dashboard/HiringLeadDashboard';
import TALeaderDashboard from '../dashboard/TALeaderDashboard';
import CompanyList from '@/TAAssociate/Company/CompanyList';
import JobList from '@/TAAssociate/Job/JobList';
import Candidates from '@/TAAssociate/Candidate/Candidates';
import { HiringLeadConversationLayout } from '@/components/hiring-lead-conversation/HiringLeadConversationLayout';

export const TalentPlanContent_Hiring_Lead = () => {
  return (
    <div className="w-full overflow-hidden">
      <Routes>
        <Route path="/home" element={<HiringLeadDashboard />} />
        <Route path="/dashboard" element={<HiringLeadDashboard />} />
        <Route path="/" element={<Navigate to="/hiring-lead-plan/home" replace />} />
        <Route path="/plan" element={<SalesPlanDashboard_Hiring_Lead />} />
        <Route path="/message" element={<MessageSubmission_Hiring_Lead />} />
        <Route path="/message-chat" element={<MessageChat_Hiring_Lead />} />
        <Route path="/message-plan-chat" element={<MessagePlanChat_Hiring_Lead />} />
        <Route path="/market-database" element={<MarketDatabase_Hiring_Lead />} />
        <Route path="/market-database-chat" element={<MarketDatabaseChat_Hiring_Lead />} />
        <Route path="/media-outreach" element={<MediaOutreach_Hiring_Lead />} />
        <Route path="/media-outreach-chat" element={<MediaOutreachChat_Hiring_Lead />} />
        <Route path="/measure-kpi" element={<MeasureKPI_Hiring_Lead />} />
        <Route path="/measure-kpi-chat" element={<MeasureKPIChat_Hiring_Lead />} />
        <Route path="/assign-sdrs" element={<AssignSDRs_Hiring_Lead />} />
        <Route path="/assign-ta-team" element={<AssignTATeamChat_Hiring_Lead />} />
        <Route path="/conversation" element={<HiringLeadConversationLayout />} />
        <Route path="/projects"element={<CompanyList/>} />
        <Route path="/job-list" element={<JobList/>} />
        <Route path="/candidates" element={<Candidates/>} />
      </Routes>
    </div>
  );
};
