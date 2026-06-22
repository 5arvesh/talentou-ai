import React from 'react';
import { User } from 'lucide-react';

interface InviteChipProps {
  email: string;
  role: 'Recruiter' | 'Hiring Lead';
  onRemove: () => void;
}

export function InviteChip({ email, role, onRemove }: InviteChipProps) {
  const isRecruiter = role === 'Recruiter';
  return (
    <span
      className={`inline-flex items-center gap-[5px] text-[11px] px-[10px] py-[3px] rounded-[99px] ${
        isRecruiter ? 'bg-[#EAF3DE] text-[#27500A]' : 'bg-[#E6F1FB] text-[#0C447C]'
      }`}
    >
      <User className="h-3 w-3" />
      {email} · {role}
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 hover:opacity-60 transition-opacity leading-none"
      >
        ×
      </button>
    </span>
  );
}
