import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { WelcomeAvatar } from '../ui/WelcomeAvatar';

export function RecruiterWelcome() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('firstName') || 'there';
  const lastName = localStorage.getItem('lastName') || '';
  const initials = `${firstName[0] ?? '?'}${lastName[0] ?? ''}`.toUpperCase();
  const company = localStorage.getItem('tenantName') || 'Talentou';

  const [first, setFirst] = useState(firstName === 'there' ? '' : firstName);
  const [last, setLast] = useState(lastName);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const inputCls = 'w-full px-[13px] py-[10px] border-[0.5px] border-[#ddd] rounded-[10px] text-[13px] outline-none transition-all focus:border-[#7800D3] focus:shadow-[0_0_0_3px_rgba(120,0,211,0.08)]';

  return (
    <OnboardingShell
      leftPanel={{
        eyebrow: "You've been invited",
        headline: 'Good to have <span class="text-[#c084fc]">you here.</span>',
        body: "Takes 30 seconds. Tell us what kinds of roles you recruit for and we'll make sure the right positions find you.",
        steps: [
          { label: 'Set up your account', status: 'current' },
          { label: 'Your specialities', status: 'locked' },
        ],
      }}
      footer={{
        dots: { total: 2, active: 1 },
        right: (
          <button
            type="button"
            onClick={() => navigate('/onboarding/specialities')}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ),
      }}
    >
      <div className="max-w-md">
        {/* Welcome block */}
        <div className="text-center mb-8">
          <WelcomeAvatar initials={initials} gradient="purple" />
          <h1 className="font-sora text-[18px] font-semibold text-[#0e0020] mb-1">
            Welcome, {firstName} 👋
          </h1>
          <span className="inline-block bg-[#EEEDFE] text-[#3C3489] rounded-[99px] text-[11px] px-[10px] py-[3px] mb-3">
            Recruiter · {company}
          </span>
          <p className="text-[13px] text-[#888] leading-[1.6] max-w-[320px] mx-auto">
            Before you dive in, take a moment to set up your profile — it helps the AI match you to the right positions.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-1">First name</label>
              <input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-1">Last name</label>
              <input value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last name" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-1">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className={`${inputCls} pr-9`}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute inset-y-0 right-0 px-3 text-[#aaa] hover:text-[#666]">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}

export default RecruiterWelcome;
