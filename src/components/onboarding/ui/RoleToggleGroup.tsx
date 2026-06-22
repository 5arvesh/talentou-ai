import React from 'react';
import { User, Building2 } from 'lucide-react';

type Role = 'recruiter' | 'hiring_lead';

interface RoleToggleGroupProps {
  activeRoles: Role[];
  onChange: (roles: Role[]) => void;
}

export function RoleToggleGroup({ activeRoles, onChange }: RoleToggleGroupProps) {
  const toggle = (role: Role) => {
    const next = activeRoles.includes(role)
      ? activeRoles.filter((r) => r !== role)
      : [...activeRoles, role];
    onChange(next);
  };

  return (
    <div className="flex gap-1 border-[0.5px] border-[#e0e0e0] rounded-[10px] p-1 shrink-0">
      {(['recruiter', 'hiring_lead'] as const).map((role) => {
        const isActive = activeRoles.includes(role);
        return (
          <button
            key={role}
            type="button"
            onClick={() => toggle(role)}
            className={`inline-flex items-center gap-[6px] px-3 py-[7px] rounded-[8px] text-[12px] font-medium transition-all whitespace-nowrap ${
              isActive
                ? 'bg-[#f6f4ff] text-[#7800D3] border-[0.5px] border-[#e4ddff]'
                : 'text-[#bbb] hover:text-[#888]'
            }`}
          >
            {role === 'recruiter' ? (
              <User className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <Building2 className="h-3.5 w-3.5 shrink-0" />
            )}
            {role === 'recruiter' ? 'Recruiter' : 'Hiring Lead'}
          </button>
        );
      })}
    </div>
  );
}
