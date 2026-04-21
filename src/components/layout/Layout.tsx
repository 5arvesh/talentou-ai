import { ReactNode } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { Header } from "../header/Header";
import { TabNav } from "../navigation/TabNav";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isSuccessPage = location.pathname === "/success";
  const isSettingsPage = location.pathname === "/settings";
  const isNotificationsPage = location.pathname === "/notifications";
  const isTemplatePage = location.pathname === "/template";
  const isCompanyDetailPage = location.pathname.includes("/company-detail");
  const isContactDetailPage = location.pathname.includes("/contacts");
  const isMarketDatabaseChat = location.pathname.includes("/market-database-chat");
  const isMediaOutreachChat = location.pathname.includes("/media-outreach-chat");
  const isMeasureKpiChat = location.pathname.includes("/measure-kpi-chat");
  const isAssignSdr = location.pathname.includes("/assign-sdrs");
  const isViewCompanyUSP = location.pathname.includes("/view-companyusp");
  const isViewTalentPool = location.pathname.includes("/view-talent-pool");
  const isViewRecruitmentChannel = location.pathname.includes("/view-recruitment-channel");
  const isViewSuccessMetrics = location.pathname.includes("/view-success-metrics");
  const isMessagePlanChat = location.pathname.includes("/message-plan-chat");
  const isAssignTATeam = location.pathname.includes("/assign-ta-team");
  const isHiringLeadDashboard = location.pathname === "/dashboard" || location.pathname === "/hiring-lead/dashboard";
  const isHiringLeadConversation = location.pathname === "/hiring-lead/conversation";
  const isHiringLeadPlan = location.pathname.includes("/hiring-lead-plan");
  const isHiringLeadCandidates =
    location.pathname === "/hiring-lead/candidates" ||
    location.pathname === "/sales-plan/candidates" ||
    location.pathname === "/ta-associate/candidates";

  return (
    <div className="flex h-screen dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        {!isSuccessPage &&
          !isSettingsPage &&
          !isNotificationsPage &&
          !isTemplatePage &&
          !isViewCompanyUSP &&
          !isViewTalentPool &&
          isViewRecruitmentChannel &&
          isViewSuccessMetrics &&
          !isCompanyDetailPage &&
          !isContactDetailPage &&
          !isMarketDatabaseChat &&
          !isMediaOutreachChat &&
          !isMeasureKpiChat &&
          !isAssignSdr &&
          !isMessagePlanChat &&
          !isAssignTATeam &&
          !isHiringLeadDashboard &&
          !isHiringLeadConversation &&
          !isHiringLeadPlan &&
          isHiringLeadCandidates && (
            <div className="px-6 mt-6">
              <TabNav />
            </div>
          )}

        <main
          className={`flex-1 overflow-y-auto dark:text-gray-100  ${
            !isSuccessPage &&
            !isSettingsPage &&
            !isNotificationsPage &&
            !isTemplatePage &&
            !isCompanyDetailPage &&
            !isContactDetailPage &&
            !isMessagePlanChat &&
            !isMarketDatabaseChat &&
            !isMediaOutreachChat &&
            !isMeasureKpiChat &&
            isHiringLeadCandidates &&
            !isAssignTATeam
              ? "px-4"
              : ""
          }`}
        >
          {children}
        </main>

        <Toaster />
        <SonnerToaster />
      </div>
    </div>
  );
}
