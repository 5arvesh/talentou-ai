import React from 'react';
import { Navigate } from 'react-router-dom';
import { RecruiterWelcome } from './screens/RecruiterWelcome';
import { HiringLeadProfile } from './screens/HiringLeadProfile';

export function WelcomeRouter() {
  const role = localStorage.getItem('userRole');
  if (role === 'Hiring Lead') return <HiringLeadProfile />;
  if (role === 'TA Associate' || role === 'Recruiter') return <RecruiterWelcome />;
  return <Navigate to="/login" replace />;
}

export default WelcomeRouter;
