import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Check, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LOCATION_SUGGESTIONS = [
  'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Remote (India)',
];

export const INDUSTRY_SUGGESTIONS = [
  'SaaS / B2B', 'Fintech', 'HR Tech', 'E-commerce', 'EdTech',
  'HealthTech', 'Gaming', 'Cybersecurity', 'Cloud / DevOps',
  'InsurTech', 'LegalTech', 'BFSI',
];

interface PredictiveSearchInputProps {
  label: string;
  selected: string[];
  suggestions: string[];
  placeholder: string;
  chipType: 'location' | 'industry';
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  allowFreeform?: boolean;
}

export function PredictiveSearchInput({
  label, selected, suggestions, placeholder, chipType, onAdd, onRemove, allowFreeform,
}: PredictiveSearchInputProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleAdd = (item: string) => {
    if (!selected.includes(item)) onAdd(item);
    setQuery('');
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      if (allowFreeform) handleAdd(query.trim());
      else if (filtered.length > 0) handleAdd(filtered[0]);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  const isLocation = chipType === 'location';

  return (
    <div className="space-y-1.5" ref={wrapperRef}>
      <span className="text-[10px] text-muted-foreground">{label}</span>

      {/* Chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => (
            <span
              key={item}
              className={cn(
                'inline-flex items-center gap-[3px] rounded-full text-[10px] font-medium px-[7px] py-[2px]',
                isLocation ? 'bg-[#E6F1FB] text-[#0C447C]' : 'bg-[#EEEDFE] text-[#3C3489]'
              )}
            >
              {isLocation && <MapPin className="h-2.5 w-2.5 shrink-0" />}
              {item}
              <button
                onClick={() => onRemove(item)}
                className="opacity-60 hover:opacity-100 transition-opacity ml-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full border border-primary rounded-md text-[11px] pl-[26px] pr-2 py-[5px] outline-none bg-background"
        />
      </div>

      {/* Dropdown */}
      {open && query.length > 0 && (
        <div className="border border-border rounded-md bg-background max-h-[160px] overflow-y-auto mt-[3px] z-10 relative">
          {filtered.map((item) => {
            const isSelected = selected.includes(item);
            return (
              <button
                key={item}
                onClick={() => isSelected ? onRemove(item) : handleAdd(item)}
                className={cn(
                  'w-full flex items-center gap-2 px-[10px] py-[6px] text-[11px] text-left',
                  'hover:bg-muted transition-colors',
                  isSelected ? 'text-primary' : 'text-foreground'
                )}
              >
                {isSelected
                  ? <Check className="h-3 w-3 text-primary shrink-0" />
                  : <Plus className="h-3 w-3 text-muted-foreground shrink-0" />}
                {item}
              </button>
            );
          })}
          {allowFreeform && query.trim() && !suggestions.includes(query.trim()) && (
            <button
              onClick={() => handleAdd(query.trim())}
              className="w-full flex items-center gap-2 px-[10px] py-[6px] text-[11px] text-left text-primary hover:bg-muted"
            >
              <Plus className="h-3 w-3 shrink-0" />
              Add "{query.trim()}"
            </button>
          )}
          {filtered.length === 0 && !(allowFreeform && query.trim()) && (
            <div className="px-[10px] py-[6px] text-[11px] text-muted-foreground">No matches</div>
          )}
        </div>
      )}
    </div>
  );
}

export default PredictiveSearchInput;
