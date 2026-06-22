import React, { useState } from 'react';
import { Linkedin, Github, Globe, Rocket, Users, Briefcase, Star, GraduationCap, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface Platform {
  id: string;
  label: string;
  Icon: LucideIcon;
}

const PLATFORMS: Platform[] = [
  { id: 'LinkedIn Recruiter', label: 'LinkedIn', Icon: Linkedin },
  { id: 'GitHub Jobs', label: 'GitHub Jobs', Icon: Github },
  { id: 'Naukri.com', label: 'Naukri.com', Icon: Globe },
  { id: 'AngelList', label: 'AngelList', Icon: Rocket },
  { id: 'Employee Referrals', label: 'Referrals', Icon: Users },
  { id: 'Indeed', label: 'Indeed', Icon: Briefcase },
  { id: 'Glassdoor', label: 'Glassdoor', Icon: Star },
  { id: 'IIMJobs', label: 'IIMJobs', Icon: GraduationCap },
];

interface ChannelCheckboxGridProps {
  selected: string[];
  customChannels: string[];
  onChange: (selected: string[], custom: string[]) => void;
}

export function ChannelCheckboxGrid({ selected, customChannels, onChange }: ChannelCheckboxGridProps) {
  const [customInput, setCustomInput] = useState('');

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    onChange(next, customChannels);
  };

  const addCustom = () => {
    const val = customInput.trim();
    if (!val || customChannels.includes(val)) return;
    onChange(selected, [...customChannels, val]);
    setCustomInput('');
  };

  const removeCustom = (ch: string) => {
    onChange(selected, customChannels.filter((c) => c !== ch));
  };

  return (
    <div className="space-y-2.5">
      {/* Checkbox grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {PLATFORMS.map(({ id, label, Icon }) => {
          const checked = selected.includes(id);
          return (
            <label
              key={id}
              className={cn(
                'flex items-center gap-[7px] p-[6px_9px] border rounded-md text-[11px] cursor-pointer select-none transition-colors',
                checked
                  ? 'bg-[#EEEDFE] border-primary/40 text-[#3C3489]'
                  : 'bg-background border-border text-foreground hover:bg-muted'
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(id)}
                className="sr-only"
              />
              <Icon
                className={cn('h-3.5 w-3.5 shrink-0', checked ? 'text-primary' : 'text-muted-foreground')}
              />
              {label}
            </label>
          );
        })}
      </div>

      {/* Custom channels */}
      {customChannels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {customChannels.map((ch) => (
            <span
              key={ch}
              className="inline-flex items-center gap-1 rounded-full text-[10px] border border-[#B4B2A9] bg-[#F1EFE8] text-[#444441] px-[7px] py-[2px]"
            >
              {ch}
              <button onClick={() => removeCustom(ch)} className="opacity-60 hover:opacity-100 transition-opacity">
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Custom channel input */}
      <div className="flex gap-1.5">
        <input
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }}
          placeholder="+ Add custom channel…"
          className="flex-1 border border-dashed border-border rounded-md bg-transparent text-[11px] px-[8px] py-[5px] outline-none focus:border-primary focus:border-solid transition-colors"
        />
        <button
          onClick={addCustom}
          className="border border-primary/30 text-primary text-[11px] rounded-md px-[10px] py-[5px] hover:bg-primary/5 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ChannelCheckboxGrid;
