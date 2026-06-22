
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import SalesPlanQuadrantDashboard from '../dashboard/SalesPlanQuadrantDashboard';
import TeamPerformanceDetail from '../dashboard/TeamPerformanceDetail';
import HiringMetricsDetail from '../dashboard/HiringMetricsDetail';
import RecruiterMetricsDetail from '../dashboard/RecruiterMetricsDetail';
import FunnelDetail from '../dashboard/FunnelDetail';

// The separate TA-plan flow has been removed — recruitment plans are now built
// per-position. Only the Recruitment Lead dashboard (and its detail screens)
// remain under /sales-plan/*; everything else redirects to the dashboard.
export const TalentPlanContent = () => {
  return (
    <div className="w-full overflow-hidden">
      <Routes>
        <Route path="/dashboard" element={<SalesPlanQuadrantDashboard />} />
        <Route path="/dashboard/team-performance" element={<TeamPerformanceDetail />} />
        <Route path="/dashboard/hiring-metrics" element={<HiringMetricsDetail />} />
        <Route path="/dashboard/recruiter-metrics" element={<RecruiterMetricsDetail />} />
        <Route path="/dashboard/funnel" element={<FunnelDetail />} />
        <Route path="*" element={<Navigate to="/sales-plan/dashboard" replace />} />
      </Routes>
    </div>
  );
};
