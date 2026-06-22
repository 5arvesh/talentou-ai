import React, { useState, useRef, useEffect } from 'react';
import { Search, Check, Plus, X } from 'lucide-react';

interface PredictiveSearchInputProps {
  placeholder: string;
  selected: string[];
  suggestions: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  allowFreeform?: boolean;
}

export function PredictiveSearchInput({
  placeholder,
  selected,
  suggestions,
  onAdd,
  onRemove,
  allowFreeform = true,
}: PredictiveSearchInputProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      const match = suggestions.find((s) => s.toLowerCase() === trimmed.toLowerCase());
      if (match) {
        selected.includes(match) ? onRemove(match) : onAdd(match);
      } else if (allowFreeform && !selected.includes(trimmed)) {
        onAdd(trimmed);
      }
      setQuery('');
    }
    if (e.key === 'Escape') setOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 150);
  };

  const toggle = (item: string) => {
    selected.includes(item) ? onRemove(item) : onAdd(item);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef}>
      {/* Chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-[6px] mb-[10px]">
          {selected.map((item) => (
            <span
              key={item}
              className="bg-[#EEEDFE] text-[#3C3489] text-[12px] font-medium px-[10px] py-[5px] rounded-[99px] inline-flex items-center gap-[5px]"
            >
              {item}
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="text-[#3C3489] opacity-60 hover:opacity-100 transition-opacity leading-none"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Search className="h-4 w-4 text-[#bbb] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-[10px] border border-[#e0e0e0] rounded-[10px] text-[13px] outline-none focus:border-[#7800D3] focus:shadow-[0_0_0_3px_rgba(120,0,211,0.07)] transition-all"
        />

        {/* Dropdown */}
        {open && filtered.length > 0 && (
          <div className="absolute w-full bg-white border border-[#e8e8e8] rounded-[10px] max-h-[180px] overflow-y-auto mt-[3px] z-10 shadow-sm">
            {filtered.map((item) => {
              const isSelected = selected.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggle(item)}
                  className={`w-full px-3 py-2 text-[13px] flex items-center gap-2 cursor-pointer text-left transition-colors hover:bg-[#f9f7ff] ${
                    isSelected ? 'text-[#7800D3]' : 'text-[#333]'
                  }`}
                >
                  {isSelected ? (
                    <Check className="h-3 w-3 text-[#7800D3] shrink-0" />
                  ) : (
                    <Plus className="h-3 w-3 text-[#bbb] shrink-0" />
                  )}
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
