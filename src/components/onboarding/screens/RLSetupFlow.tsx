import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingShell } from '../OnboardingShell';
import { PitchStep } from './RLCompanyPitch';
import { InviteStep } from './RLInviteTeam';

type Step = 'pitch' | 'invite';

const LEFT_PANEL = {
  pitch: {
    eyebrow: 'Step 2 of 3',
    headline: 'Your company <span class="text-[#c084fc]">pitch is ready.</span>',
    body: 'The AI read your website and drafted a pitch your recruiters will use to attract candidates. Make it yours.',
    steps: [
      { label: 'Create your account', status: 'done' as const },
      { label: 'Review your pitch', status: 'current' as const },
      { label: 'Invite your team', status: 'locked' as const },
    ],
  },
  invite: {
    eyebrow: 'Step 3 of 3',
    headline: 'Build your <span class="text-[#c084fc]">hiring team.</span>',
    body: "Invite your team — choose Recruiter, Hiring Lead, or both for each person. They'll set up their own profile when they log in.",
    steps: [
      { label: 'Create your account', status: 'done' as const },
      { label: 'Review your pitch', status: 'done' as const },
      { label: 'Invite your team', status: 'current' as const },
    ],
  },
};

const PITCH_STEPS = [
  { label: 'Create your account', status: 'done' as const },
  { label: 'Review your pitch', status: 'current' as const },
  { label: 'Invite your team', status: 'locked' as const },
];
const INVITE_STEPS = [
  { label: 'Create your account', status: 'done' as const },
  { label: 'Review your pitch', status: 'done' as const },
  { label: 'Invite your team', status: 'current' as const },
];

interface RLSetupFlowProps {
  initialStep?: Step;
}

export function RLSetupFlow({ initialStep = 'pitch' }: RLSetupFlowProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(initialStep);

  return (
    <OnboardingShell
      fullBleedBody
      stepperInContent
      progressPct={step === 'pitch' ? 66 : 95}
      leftPanel={LEFT_PANEL[step]}
    >
      <div className="h-full overflow-hidden">
        <div
          className="flex h-full w-[200%] transition-transform duration-[450ms] ease-out motion-reduce:transition-none"
          style={{ transform: step === 'pitch' ? 'translateX(0)' : 'translateX(-50%)' }}
        >
          <div className="w-1/2 h-full overflow-y-auto">
            <PitchStep steps={PITCH_STEPS} onBack={() => navigate(-1)} onNext={() => setStep('invite')} />
          </div>
          <div className="w-1/2 h-full overflow-y-auto">
            <InviteStep steps={INVITE_STEPS} onBack={() => setStep('pitch')} onFinish={() => navigate('/sales-plan/dashboard')} />
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}

export default RLSetupFlow;
