import React from 'react';
import { Check } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: React.ReactNode;
}

const TEMPLATES: Template[] = [
  {
    id: 'classic-list',
    name: 'Classic List',
    description: 'Clean rows with titles and apply buttons',
    thumbnail: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        {[0, 14, 28].map((y) => (
          <g key={y}>
            <rect x="4" y={y + 4} width="52" height="6" rx="1" fill="#d1d5db" />
            <rect x="60" y={y + 4} width="16" height="6" rx="2" fill="#9ca3af" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: 'card-grid',
    name: 'Card Grid',
    description: 'Modern cards in a responsive grid',
    thumbnail: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect x="4" y="4" width="34" height="20" rx="2" fill="#d1d5db" />
        <rect x="42" y="4" width="34" height="20" rx="2" fill="#d1d5db" />
        <rect x="4" y="28" width="34" height="18" rx="2" fill="#e5e7eb" />
        <rect x="42" y="28" width="34" height="18" rx="2" fill="#e5e7eb" />
      </svg>
    ),
  },
  {
    id: 'compact-table',
    name: 'Compact Table',
    description: 'Dense sortable table layout',
    thumbnail: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect x="4" y="4" width="72" height="5" rx="0" fill="#9ca3af" />
        {[13, 21, 29, 37].map((y) => (
          <rect key={y} x="4" y={y} width="72" height="4" rx="0" fill="#e5e7eb" />
        ))}
      </svg>
    ),
  },
  {
    id: 'magazine',
    name: 'Magazine',
    description: 'Hero banner with featured jobs',
    thumbnail: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect x="4" y="4" width="72" height="22" rx="2" fill="#9ca3af" />
        <rect x="4" y="30" width="34" height="16" rx="2" fill="#d1d5db" />
        <rect x="42" y="30" width="34" height="16" rx="2" fill="#d1d5db" />
      </svg>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Accordion grouped by department',
    thumbnail: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        {[4, 14, 24, 34, 44].map((y) => (
          <g key={y}>
            <rect x="4" y={y} width="72" height="1.5" rx="0" fill="#d1d5db" />
            <rect x="4" y={y + 3} width="48" height="4" rx="1" fill="#e5e7eb" />
          </g>
        ))}
      </svg>
    ),
  },
];

interface TemplateSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {TEMPLATES.map((t) => {
        const selected = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`relative rounded-xl border-2 p-3 text-left transition-all ${
              selected ? 'border-[#4EAD3B] bg-green-50' : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            {selected && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#4EAD3B] flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
            <div className="h-12 mb-2">{t.thumbnail}</div>
            <p className="text-xs font-semibold text-foreground">{t.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{t.description}</p>
          </button>
        );
      })}
    </div>
  );
}
