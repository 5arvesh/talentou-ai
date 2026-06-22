import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { OnboardingDoneState } from '../ui/OnboardingDoneState';

export function RecruiterDone() {
  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem('recruiterProfile') || '{}');
  const allTags = [
    ...(profile.regions || []),
    ...(profile.industries || []),
    ...(profile.domains || []),
    ...(profile.seniority || []),
    ...(profile.jobTypes || []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <OnboardingShell
      progressPct={100}
      leftPanel={{
        eyebrow: 'All set',
        headline: 'Ready to <span class="text-[#c084fc]">go.</span>',
        body: 'Your profile is saved. The AI will use it from the moment you start working on positions.',
        steps: [
          { label: 'Region & Industry', status: 'done' },
          { label: 'Domain & Seniority', status: 'done' },
          { label: 'Job type', status: 'done' },
        ],
        progressLabel: 'Your profile',
      }}
      footer={{
        right: (
          <button
            type="button"
            onClick={() => navigate('/ta-associate-plan')}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            Go to dashboard
            <LayoutDashboard className="h-3.5 w-3.5" />
          </button>
        ),
      }}
    >
      <OnboardingDoneState tags={allTags} />
    </OnboardingShell>
  );
}

export default RecruiterDone;
