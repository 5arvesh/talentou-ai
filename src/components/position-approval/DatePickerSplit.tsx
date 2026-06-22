import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuickOption {
  label: string;
  days: number;
}

export const DEFAULT_QUICK_OPTIONS: QuickOption[] = [
  { label: 'Today', days: 0 },
  { label: '1 week', days: 7 },
  { label: '2 weeks', days: 14 },
  { label: '4 weeks', days: 28 },
  { label: '6 weeks', days: 42 },
  { label: '8 weeks', days: 56 },
  { label: '10 weeks', days: 70 },
  { label: '12 weeks', days: 84 },
];

const SEPARATORS_AFTER = [4]; // insert separator after index 4 (after "6 weeks")

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDate(d: Date) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function formatShort(d: Date) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

interface DatePickerSplitProps {
  value: Date;
  aiSuggestedDate: Date;
  onChange: (date: Date) => void;
  quickOptions?: QuickOption[];
}

export function DatePickerSplit({ value, aiSuggestedDate, onChange, quickOptions = DEFAULT_QUICK_OPTIONS }: DatePickerSplitProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentMonth, setCurrentMonth] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const [exactMode, setExactMode] = useState(false);

  // Find which quick option matches the current value
  const matchingOption = quickOptions.findIndex((opt) => {
    const optDate = addDays(today, opt.days);
    return sameDay(value, optDate);
  });

  const handleQuickSelect = (opt: QuickOption) => {
    const d = addDays(today, opt.days);
    onChange(d);
    setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    setExactMode(false);
  };

  const handleCalendarDay = (d: Date) => {
    onChange(d);
    setExactMode(true);
  };

  const prevMonth = () => setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  // Build calendar days
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const isAiSuggested = sameDay(value, aiSuggestedDate);

  return (
    <div className="flex border border-border rounded-lg overflow-hidden text-[11px]">
      {/* Left: quick select */}
      <div className="w-[120px] shrink-0 border-r border-border bg-muted/20 py-1">
        {quickOptions.map((opt, i) => {
          const optDate = addDays(today, opt.days);
          const isActive = exactMode ? false : i === matchingOption;
          return (
            <React.Fragment key={opt.label}>
              {SEPARATORS_AFTER.includes(i) && (
                <hr className="border-t border-border my-0.5" />
              )}
              <button
                onClick={() => handleQuickSelect(opt)}
                className={cn(
                  'w-full flex justify-between px-[10px] py-[6px] text-left transition-colors',
                  isActive
                    ? 'border-l-2 border-l-primary text-primary font-medium bg-background rounded-l-none'
                    : 'border-l-2 border-l-transparent text-muted-foreground hover:bg-background hover:text-foreground'
                )}
              >
                <span>{opt.label}</span>
                <span className={cn('text-[10px]', isActive ? 'text-primary opacity-70' : 'text-muted-foreground')}>
                  {formatShort(optDate)}
                </span>
              </button>
            </React.Fragment>
          );
        })}
        <hr className="border-t border-border my-0.5" />
        <div className={cn(
          'px-[10px] py-[6px] text-[10px] text-muted-foreground',
          exactMode && 'text-primary font-medium'
        )}>
          Pick exact →
        </div>
      </div>

      {/* Right: calendar */}
      <div className="flex-1 p-[10px] min-w-0">
        {/* Nav */}
        <div className="flex items-center justify-between mb-2">
          <button onClick={prevMonth} className="w-5 h-5 border border-border rounded flex items-center justify-center hover:bg-muted">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <span className="font-sora text-[11px] font-medium">
            {MONTH_NAMES[month]} {year}
          </span>
          <button onClick={nextMonth} className="w-5 h-5 border border-border rounded flex items-center justify-center hover:bg-muted">
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-[9px] text-muted-foreground">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((d, i) => {
            if (!d) return <div key={`empty-${i}`} />;
            const isToday = sameDay(d, today);
            const isSelected = sameDay(d, value);
            const isAiDate = sameDay(d, aiSuggestedDate);
            return (
              <button
                key={d.getDate()}
                onClick={() => handleCalendarDay(d)}
                className={cn(
                  'text-[10px] p-[4px_2px] rounded text-center transition-colors',
                  isSelected
                    ? 'bg-primary text-white'
                    : isAiDate
                      ? 'border border-primary/50 text-primary'
                      : isToday
                        ? 'font-semibold text-foreground hover:bg-muted'
                        : 'text-muted-foreground hover:bg-muted'
                )}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>

        {/* Selected display */}
        <div className="border-t border-border mt-2 pt-1 text-center text-[10px] text-muted-foreground">
          {formatDate(value)} selected
          {isAiSuggested && (
            <span className="ml-1 bg-[#0e0020] text-[#c084fc] rounded-full text-[9px] px-[5px] py-px">AI suggested</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DatePickerSplit;
