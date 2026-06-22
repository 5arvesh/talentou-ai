import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

// The separate Recruiter TA-plan flow (including /collaterals) has been removed —
// recruitment plans are now built per-position. Any /ta-associate-plan/* path
// redirects to the Recruiter dashboard.
export const TalentPlanContent_TA_Associate = () => {
  return (
    <div className="w-full overflow-hidden">
      <Routes>
        <Route path="*" element={<Navigate to="/ta-associate/dashboard" replace />} />
      </Routes>
    </div>
  );
};
