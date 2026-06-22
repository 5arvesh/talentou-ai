import React from 'react';
import { Mail, X } from 'lucide-react';

type Role = 'recruiter' | 'hiring_lead';

interface InvitedPersonRowProps {
  email: string;
  roles: Role[];
  onRemove: () => void;
}

export function InvitedPersonRow({ email, roles, onRemove }: InvitedPersonRowProps) {
  return (
    <div className="flex items-center gap-[10px] px-3 py-[9px] border-[0.5px] border-[#eee] rounded-[10px] bg-[#faf9ff]">
      <Mail className="h-3.5 w-3.5 text-[#bbb] shrink-0" />
      <span className="text-[12px] font-medium text-[#333] flex-1 truncate">{email}</span>
      <div className="flex gap-[4px] shrink-0">
        {roles.includes('recruiter') && (
          <span className="text-[11px] px-[8px] py-[3px] rounded-[99px] bg-[#EAF3DE] text-[#27500A]">
            Recruiter
          </span>
        )}
        {roles.includes('hiring_lead') && (
          <span className="text-[11px] px-[8px] py-[3px] rounded-[99px] bg-[#E6F1FB] text-[#0C447C]">
            Hiring Lead
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-[#ccc] hover:text-[#A32D2D] transition-colors leading-none shrink-0"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
