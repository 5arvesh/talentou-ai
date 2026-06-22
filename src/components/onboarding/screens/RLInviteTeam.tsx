import React, { useState } from 'react';
import { ArrowRight, UserPlus } from 'lucide-react';
import { RoleToggleGroup } from '../ui/RoleToggleGroup';
import { InvitedPersonRow } from '../ui/InvitedPersonRow';
import { SkipButton } from '../ui/SkipButton';
import { HorizontalStepper } from '../HorizontalStepper';

type Role = 'recruiter' | 'hiring_lead';
type StepState = { label: string; status: 'done' | 'current' | 'locked' };

interface Invite {
  email: string;
  roles: Role[];
}

interface InviteStepProps {
  onBack: () => void;
  onFinish: () => void;
  steps?: StepState[];
}

export function InviteStep({ onBack, onFinish, steps }: InviteStepProps) {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [inputEmail, setInputEmail] = useState('');
  const [activeRoles, setActiveRoles] = useState<Role[]>([]);
  const [selfOpen, setSelfOpen] = useState(false);
  const [selfRoles, setSelfRoles] = useState<Role[]>([]);

  const selfEmail = localStorage.getItem('userEmail') || 'you@yourcompany.com';
  const selfAdded = invites.some((i) => i.email === selfEmail);
  const canSend = inputEmail.trim() !== '' && activeRoles.length > 0;

  const sendInvite = () => {
    if (!canSend) return;
    setInvites((prev) => [...prev, { email: inputEmail.trim(), roles: activeRoles }]);
    setInputEmail('');
    setActiveRoles([]);
  };

  const removeInvite = (idx: number) => {
    setInvites((prev) => prev.filter((_, i) => i !== idx));
  };

  const addSelf = () => {
    if (selfRoles.length === 0) return;
    setInvites((prev) => [...prev, { email: selfEmail, roles: selfRoles }]);
    setSelfRoles([]);
    setSelfOpen(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 py-8">
      {steps && (
        <div className="w-full max-w-[640px] mb-8">
          <HorizontalStepper steps={steps} />
        </div>
      )}
      <div className="w-full max-w-[560px]">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-sora text-[22px] font-semibold text-[#0e0020] mb-1">Invite your team</h1>
          <p className="text-[13px] text-[#888]">
            Add people by email and choose their role. You can assign someone as both Recruiter and Hiring Lead if needed.
          </p>
        </div>

        {/* Invite row */}
        <div className="flex gap-2 items-center mb-2 flex-wrap">
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendInvite(); } }}
            placeholder="colleague@yourcompany.com"
            className="flex-1 min-w-[180px] px-3 py-[10px] border border-[#ddd] rounded-[10px] text-[12px] outline-none focus:border-[#7800D3] transition-colors"
          />
          <RoleToggleGroup activeRoles={activeRoles} onChange={setActiveRoles} />
          <button
            type="button"
            onClick={sendInvite}
            disabled={!canSend}
            className="bg-[#7800D3] text-white rounded-[10px] px-[18px] py-[11px] text-[13px] font-medium whitespace-nowrap hover:opacity-90 transition-opacity shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send invite
          </button>
        </div>

        {/* Invited list */}
        {invites.length > 0 && (
          <div className="flex flex-col gap-[6px] mb-[14px]">
            {invites.map((invite, i) => (
              <InvitedPersonRow
                key={i}
                email={invite.email}
                roles={invite.roles}
                onRemove={() => removeInvite(i)}
              />
            ))}
          </div>
        )}

        {/* Self-invite — hidden once you've added yourself */}
        {!selfAdded && (
          selfOpen ? (
            <div className="flex items-center gap-2 w-full border-[0.5px] border-dashed border-[#7800D3]/40 rounded-[10px] px-[14px] py-[10px] mt-1.5 flex-wrap">
              <span className="text-[12px] text-[#888] shrink-0">Add yourself as</span>
              <RoleToggleGroup activeRoles={selfRoles} onChange={setSelfRoles} />
              <button
                type="button"
                onClick={addSelf}
                disabled={selfRoles.length === 0}
                className="ml-auto bg-[#7800D3] text-white rounded-[10px] px-4 py-[8px] text-[12px] font-medium whitespace-nowrap hover:opacity-90 transition-opacity shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add me
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSelfOpen(true)}
              className="flex items-center gap-2 w-full border-[0.5px] border-dashed border-[#ddd] rounded-[10px] px-[14px] py-[10px] text-[12px] text-[#7800D3] cursor-pointer mt-1.5 hover:border-[#7800D3]/40 transition-colors bg-transparent"
            >
              <UserPlus className="h-3.5 w-3.5 shrink-0" />
              <span>Add yourself as a Recruiter and/or Hiring Lead too</span>
            </button>
          )
        )}

        {/* Context note */}
        <div className="bg-[#faf8ff] border-[0.5px] border-[#f0eeff] rounded-[10px] p-[14px_16px] mt-[18px] text-[12px] text-[#888] leading-[1.6]">
          Once invited, your team receives an email with a link to set up their account. They'll complete their own profile — specialities for recruiters, project and department for hiring leads — the first time they log in.
        </div>

        {/* Centered actions */}
        <div className="flex items-center justify-center gap-3 mt-7">
          <button
            type="button"
            onClick={onBack}
            className="border border-[#ddd] rounded-[10px] px-5 py-[10px] text-[13px] text-[#888] bg-transparent hover:bg-[#fafafa] transition-colors"
          >
            Back
          </button>
          <SkipButton onClick={onFinish} />
          <button
            type="button"
            onClick={onFinish}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            Go to dashboard
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteStep;
