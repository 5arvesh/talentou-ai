
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { UnifiedTAPlanInterface } from "./UnifiedTAPlanInterface";
import { SalesPlanDashboard } from "./TalentPlanDashboard";
import { TAPlanFlowLayout } from "@/components/ta-plan-flow/TAPlanFlowLayout";
import SalesPlanQuadrantDashboard from '../dashboard/SalesPlanQuadrantDashboard';
import TeamPerformanceDetail from '../dashboard/TeamPerformanceDetail';
import HiringMetricsDetail from '../dashboard/HiringMetricsDetail';
import RecruiterMetricsDetail from '../dashboard/RecruiterMetricsDetail';
import FunnelDetail from '../dashboard/FunnelDetail';
import { MessageSubmission } from "@/components/messages/MessageSubmission";
import { MessageChat } from "@/components/messages/MessageChat";
import { MessagePlanChat } from "@/components/messages/MessagePlanChat";
import { ValueProposition } from "@/components/messages/ValueProposition";
import { Collaterals } from "@/components/messages/Collaterals";
import { MarketCriteria } from "@/components/market/MarketCriteria";
import { MarketDatabase } from "@/components/market/MarketDatabase";
import { MarketDatabaseChat } from "@/components/market/MarketDatabaseChat";
import { MediaOutreach } from "@/components/media/MediaOutreach";
import { MediaOutreachChat } from "@/components/media/MediaOutreachChat";
import { OutreachTimeline } from "@/components/media/OutreachTimeline";
import { MeasureKPI } from "@/components/measure/MeasureKPI";
import { MeasureKPIChat } from "@/components/measure/MeasureKPIChat";
import { Milestones } from "@/components/measure/Milestones";
import { PerformanceAnalytics } from "@/components/measure/PerformanceAnalytics";
import { AssignSDRs } from "@/components/assign/AssignSDRs";
import { AssignTATeamChat } from "@/components/assign/AssignTATeamChat";
import CompanyList from '@/TAAssociate/Company/CompanyList';
import JobList from '@/TAAssociate/Job/JobList';
import { CandidatesPageSalesPlan } from '@/components/sales-plan/CandidatesPageSalesPlan';

export const TalentPlanContent = () => {
  // Mock job data for the candidates page
  const jobs = [
    { id: 1, jobRole: "Software Engineer" },
    { id: 2, jobRole: "Product Manager" },
    { id: 3, jobRole: "Senior Developer" },
    { id: 4, jobRole: "UX Designer" },
    { id: 5, jobRole: "Data Analyst" },
    { id: 6, jobRole: "DevOps Engineer" },
    { id: 7, jobRole: "Frontend Developer" },
    { id: 8, jobRole: "QA Engineer" },
    { id: 9, jobRole: "Marketing Manager" },
    { id: 10, jobRole: "Sales Representative" },
    { id: 11, jobRole: "Backend Developer" },
    { id: 12, jobRole: "Data Scientist" },
    { id: 13, jobRole: "Mobile Developer" },
    { id: 14, jobRole: "Security Engineer" },
    { id: 15, jobRole: "Technical Writer" },
    { id: 16, jobRole: "Business Analyst" },
    { id: 17, jobRole: "Cloud Architect" },
    { id: 18, jobRole: "Scrum Master" },
    { id: 19, jobRole: "Database Administrator" },
    { id: 20, jobRole: "AI Engineer" },
    { id: 21, jobRole: "Network Engineer" },
    { id: 22, jobRole: "System Administrator" },
  ];

  return (
    <div className="w-full overflow-hidden">
      <Routes>
        <Route path="/" element={<TAPlanFlowLayout />} />
        <Route path="/home" element={<UnifiedTAPlanInterface />} />
        <Route path="/create-plan" element={<TAPlanFlowLayout />} />
        <Route path="/old-dashboard" element={<SalesPlanDashboard />} />
        <Route path="/dashboard" element={<SalesPlanQuadrantDashboard />} />
        <Route path="/dashboard/team-performance" element={<TeamPerformanceDetail />} />
        <Route path="/dashboard/hiring-metrics" element={<HiringMetricsDetail />} />
        <Route path="/dashboard/recruiter-metrics" element={<RecruiterMetricsDetail />} />
        <Route path="/dashboard/funnel" element={<FunnelDetail />} />
        <Route path="/message" element={<MessageSubmission />} />
        <Route path="/message-chat" element={<MessageChat />} />
        <Route path="/message-plan-chat" element={<MessagePlanChat />} />
        <Route path="/value-proposition" element={<ValueProposition />} />
        <Route path="/collaterals" element={<Collaterals />} />
        <Route path="/market-criteria" element={<MarketCriteria />} />
        <Route path="/market-database" element={<MarketDatabase />} />
        <Route path="/market-database-chat" element={<MarketDatabaseChat />} />
        <Route path="/media-outreach" element={<MediaOutreach />} />
        <Route path="/media-outreach-chat" element={<MediaOutreachChat />} />
        <Route path="/outreach-timeline" element={<OutreachTimeline />} />
        <Route path="/measure-kpi" element={<MeasureKPI />} />
        <Route path="/measure-kpi-chat" element={<MeasureKPIChat />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
        <Route path="/assign-sdrs" element={<AssignSDRs />} />
        <Route path="/assign-ta-team" element={<AssignTATeamChat />} />
        <Route path="/projects" element={<CompanyList />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/candidates" element={<CandidatesPageSalesPlan jobs={jobs} />} />
      </Routes>
    </div>
  );
};
