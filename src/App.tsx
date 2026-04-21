import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import EULA from "./pages/EULA";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetSent from "./pages/PasswordResetSent";
import NotFound from "./pages/NotFound";
import OnboardingStep1 from "./pages/onboarding/Step1";
import OnboardingStep2 from "./pages/onboarding/Step2";
import OnboardingStep3 from "./pages/onboarding/Step3";
import OnboardingStep4 from "./pages/onboarding/Step4";
import OnboardingStep1_TA_Associate from "./pages/onboarding/Step1_TA_Associate";
import OnboardingStep2_TA_Associate from "./pages/onboarding/Step2_TA_Associate";
import OnboardingStep3_TA_Associate from "./pages/onboarding/Step3_TA_Associate";
import OnboardingStep4_TA_Associate from "./pages/onboarding/Step4_TA_Associate";
import { AlignmentProvider } from "./context/AlignmentContext";
import { ThemeProvider } from "next-themes";
import { DatabaseBuilder } from "./components/database/DatabaseBuilder";
import Settings from "./pages/Settings";
import { NotificationsPage } from "./pages/NotificationsPage";
import RoleSelection from "./pages/RoleSelection";
import TAPlan from "./pages/TAPlan";
import TAPlan_TA_Associate from "./pages/TAPlan_TA_Associate";
import { MediaOutreach } from "./components/media/MediaOutreach";
import { MediaOutreachChat } from "./components/media/MediaOutreachChat";
import { OutreachTimeline } from "./components/media/OutreachTimeline";
import Success from "./pages/Success";
import { PerformanceAnalytics } from "./components/measure/PerformanceAnalytics";
import { Milestones } from "./components/measure/Milestones";
import CompaniesAdded from "./pages/CompaniesAdded";
import Chat from "./components/chat/Chat";
import { Template } from "./components/template/Template";
import { SuggestFeedback } from "./pages/SuggestFeedback";
import LeadTrackerPage from "./pages/LeadTracker";
import { MessageSubmission } from "./components/messages/MessageSubmission";
import { MarketDatabaseChat } from "./components/market/MarketDatabaseChat";
import { AssignSDRs } from "./components/assign/AssignSDRs";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import TAPlan_Hiring_Lead from "./pages/TAPlan_Hiring_Lead";
import OnboardingStep2_Hiring_Lead from "./pages/onboarding/Step2_Hiring_Lead";
import OnboardingStep3_Hiring_Lead from "./pages/onboarding/Step3_Hiring_Lead";
import OnboardingStep4_Hiring_Lead from "./pages/onboarding/Step4_Hiring_Lead";
import { MessageSubmission_Hiring_Lead } from "./components/messages/MessageSubmission_Hiring_Lead";
import HiringLeadConversationPage from "./pages/HiringLeadConversationPage";
import { Index } from "./pages/Index";
import { HiringLeadDashboard } from "./components/dashboard/HiringLeadDashboard";
import JobListPage from "./pages/JobListPage";
import JobOpeningsPage from "./pages/JobOpeningsPage";
import CandidatesPageWrapper from "./pages/CandidatesPageWrapper";
import ProjectListPage from "./pages/ProjectListPage";
import NewPositionApprovalPage from "./pages/NewPositionApprovalPage";
import RecruiterJobsPage from "./pages/RecruiterJobsPage";
import JDConversationPage from "./pages/JDConversationPage";
import { JobDetailsAccordion } from "./components/recruiter/JobDetailsAccordion";
import { JDConversationChat } from "./components/recruiter/JDConversationChat";
import { RecruiterJobAccordions } from "./components/recruiter/RecruiterJobAccordions";
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/sidebar/Sidebar";
import ProjectListPage_TAAssociate from "./pages/ProjectListPage_TAAssociate";
import JobListPage_TAAssociate from "./pages/JobListPage_TAAssociate";
import JDViewPage from "./pages/JDViewPage";
import TAAssociateJDFlowPage from "./pages/TAAssociateJDFlowPage";
import CandidatesPageWrapper_TAAssociate from "./pages/CandidatesPageWrapper_TAAssociate";
import ProjectListPage_TALeader from "./pages/ProjectListPage_TALeader";
import JobListPage_TALeader from "./pages/JobListPage_TALeader";
import CandidatesPageWrapper_TALeader from "./pages/CandidatesPageWrapper_TALeader";
import CandidateCreationPage from "./pages/CandidateCreationPage";
import CandidatesPageWrapper_SalesPlan from "./pages/CandidatesPageWrapper_SalesPlan";
import CandidateProfilePage from "./pages/CandidateProfilePage";
import InterviewerJobsPage from "./pages/InterviewerJobsPage";
import InterviewerHomePage from "./pages/InterviewerHomePage";
import InterviewerQuestionnaireChat from "./pages/InterviewerQuestionnaireChat";
import InterviewerCandidatesPage from "./pages/InterviewerCandidatesPage";
import InterviewRecordingPage from "./pages/InterviewRecordingPage";
import HRHomePage from "./pages/hr/HRHomePage";
import HRTemplatesPage from "./pages/hr/HRTemplatesPage";
import HRCandidatesPage from "./pages/hr/HRCandidatesPage";
import HROfferLetterPage from "./pages/hr/HROfferLetterPage";
import TAAssociateDashboard from "./components/dashboard/TAAssociateDashboard";
import TenantManagementPage from "./pages/super-admin/TenantManagementPage";
import AIInterviewPerformancePage_TAAssociate from "./pages/AIInterviewPerformancePage_TAAssociate";
import AIInterviewPerformancePage_HiringLead from "./pages/AIInterviewPerformancePage_HiringLead";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light">
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Auth flow routes */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/registration" element={<Register />} />
                <Route path="/eula" element={<EULA />} />
                <Route path="/registration-success" element={<RegistrationSuccess />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/password-reset-sent" element={<PasswordResetSent />} />
                
                {/* App routes */}
                <Route path="/role-selection" element={<RoleSelection />} />
                
                {/* TA Leader Onboarding */}
                <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
                <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
                <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
                <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
                
                {/* Recruiter Onboarding */}
                <Route path="/onboarding-ta-associate/step1" element={<OnboardingStep1_TA_Associate />} />
                <Route path="/onboarding-ta-associate/step2" element={<OnboardingStep2_TA_Associate />} />
                <Route path="/onboarding-ta-associate/step3" element={<OnboardingStep3_TA_Associate />} />
                <Route path="/onboarding-ta-associate/step4" element={<OnboardingStep4_TA_Associate />} />
                
                {/* Hiring Lead Onboarding - removed step1, kept remaining steps */}
                <Route path="/onboarding-hiring-lead/step2" element={<OnboardingStep2_Hiring_Lead />} />
                <Route path="/onboarding-hiring-lead/step3" element={<OnboardingStep3_Hiring_Lead />} />
                <Route path="/onboarding-hiring-lead/step4" element={<OnboardingStep4_Hiring_Lead />} />
                
                {/* Hiring Lead specific routes */}
                <Route path="/hiring-lead/jobs" element={<JobListPage />} />
                <Route path="/hiring-lead/job-openings" element={<JobOpeningsPage />} />
                <Route path="/hiring-lead/candidates" element={<CandidatesPageWrapper />} />
                <Route path="/hiring-lead/candidates/interview/:candidateId" element={<AIInterviewPerformancePage_HiringLead />} />
                <Route path="/hiring-lead/projects" element={<ProjectListPage />} />
                <Route path="/hiring-lead/conversation" element={<HiringLeadConversationPage />} />
                
                {/* Recruiter specific routes */}
                <Route path="/ta-associate/projects" element={<ProjectListPage_TAAssociate />} />
                <Route path="/ta-associate/jobs" element={<JobListPage_TAAssociate />} />
                <Route path="/ta-associate/candidates" element={<CandidatesPageWrapper_TAAssociate />} />
                <Route path="/ta-associate/candidates/interview/:candidateId" element={<AIInterviewPerformancePage_TAAssociate />} />
                <Route path="/ta-associate/jd/:jobId" element={<TAAssociateJDFlowPage />} />
                <Route path="/ta-associate/dashboard" element={
                  <div className="flex h-screen">
                    <Sidebar />
                    <div className="flex flex-col flex-1">
                      <Header />
                      <div className="flex-1 overflow-y-auto">
                        <TAAssociateDashboard />
                      </div>
                    </div>
                  </div>
                } />
                
                {/* TA Leader specific routes */}
                <Route path="/sales-plan/projects" element={<ProjectListPage_TALeader />} />
                <Route path="/sales-plan/jobs" element={<JobListPage_TALeader />} />
                <Route path="/sales-plan/candidates" element={<CandidatesPageWrapper_SalesPlan />} />
                
                {/* Recruiter specific routes */}
                <Route path="/recruiter/jobs" element={<RecruiterJobsPage />} />
        <Route path="/recruiter/jd-conversation/:jobId" element={
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1">
                  <JDConversationChat />
                </div>
                <div className="w-80 border-l border-gray-200 dark:border-gray-700">
                  <RecruiterJobAccordions />
                </div>
              </div>
            </div>
          </div>
        } />
                
                <Route path="/ta-associate/candidates/create" element={<CandidateCreationPage />} />
                
                <Route path="/companies-added" element={<CompaniesAdded />} />
                
                {/* TA Leader Plan Routes */}
                <Route path="/sales-plan/*" element={<TAPlan />} />
                
                {/* Recruiter Plan Routes */}
                <Route path="/ta-associate-plan/*" element={<TAPlan_TA_Associate />} />
                   {/* <Route path="/view-companyusp" element={<ValueProposition_TA_Associate/>}/> */}
                {/* Hiring Lead Plan Routes */}
                <Route path="/hiring-lead-plan/*" element={<TAPlan_Hiring_Lead />} />
                
                <Route path="/message" element={<TAPlan />} />
                <Route path="/value-proposition" element={<TAPlan />} />
                <Route path="/collaterals" element={<TAPlan />} />
                <Route path="/market-database" element={<TAPlan />} />
                <Route path="/market-criteria" element={<TAPlan />} />
                <Route path="/market-database-chat" element={<TAPlan />} />
                <Route path="/media-outreach" element={<TAPlan />} />
                <Route path="/media-outreach-chat" element={<TAPlan />} />
                <Route path="/outreach-timeline" element={<TAPlan />} />
                <Route path="/measure-kpi" element={<TAPlan />} />
                <Route path="/measure-kpi-chat" element={<TAPlan />} />
                <Route path="/milestones" element={<TAPlan />} />
                <Route path="/performance-analytics" element={<TAPlan />} />
                <Route path="/assign-sdrs" element={<TAPlan />} />
                <Route path="/success" element={<Success />} />
                <Route path="/sales-plan/candidate-profile/:candidateId" element={<CandidateProfilePage />} />
                <Route path="/database-builder" element={<Index contentType="database-builder" />} />
                <Route path="/chat" element={<Index contentType="chat" />} />
                <Route path="/company-list"element={<Index contentType="company-list" />} />
                <Route path="/job-list" element={<Index contentType="job-list" />} />
                <Route path="/candidates" element={<Index contentType="candidates" />} />
                <Route path="/template" element={<Index contentType="template" />} />
                <Route path="/company-detail/:id" element={<Index contentType="company-detail" />} />
                <Route path="/contact-detail/:id" element={<Index contentType="contact-detail" />} />
                
                {/* Interviewer Routes */}
                <Route path="/interviewer/home" element={<InterviewerHomePage />} />
                <Route path="/interviewer/jobs" element={<InterviewerJobsPage />} />
                <Route path="/interviewer/questionnaire/create" element={<InterviewerQuestionnaireChat />} />
                <Route path="/interviewer/candidates" element={<InterviewerCandidatesPage />} />
                <Route path="/interviewer/candidates/recording" element={<InterviewRecordingPage />} />
                
                {/* HR Routes */}
          <Route path="/hr/home" element={<HRHomePage />} />
          <Route path="/hr/templates" element={<HRTemplatesPage />} />
          <Route path="/hr/candidates" element={<HRCandidatesPage />} />
          <Route path="/hr/offer-letter/:candidateId" element={<HROfferLetterPage />} />
                
                {/* Super Admin Routes */}
                <Route path="/super-admin/tenants" element={<TenantManagementPage />} />
                
                {/* Settings routes */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/theme" element={<Settings />} />
                <Route path="/settings/members" element={<Settings />} />
                <Route path="/settings/integrations" element={<Settings />} />
                <Route path="/settings/billing" element={<Settings />} />
                <Route path="/settings/credit" element={<Settings />} />
                <Route path="/settings/referrals" element={<Settings />} />
                <Route path="/settings/interview" element={<Settings />} />
                <Route path="/settings/email-templates" element={<Settings />} />
                <Route path="/settings/ats-integration" element={<Settings />} />
                <Route path="/settings/authentication" element={<Settings />} />
                <Route path="/settings/policy" element={<Settings />} />
                <Route path="/settings/license" element={<Settings />} />
                
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/suggest-feedback" element={<SuggestFeedback />} />
                <Route path="/lead-tracker" element={<LeadTrackerPage />} />
                <Route path="/notifications/new-position" element={<NewPositionApprovalPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
