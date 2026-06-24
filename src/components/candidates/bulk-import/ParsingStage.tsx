import React, { useEffect, useState } from 'react';
import { Check, Loader2, Circle } from 'lucide-react';

interface ParsingStageProps {
  total: number;
  onDone: () => void;
}

const SUB_STEPS = (total: number) => [
  `Extracting text from ${total} ${total === 1 ? 'file' : 'files'}`,
  'Identifying name, contact & experience',
  'Matching candidates to open positions…',
  'Checking for existing duplicates',
];

export function ParsingStage({ total, onDone }: ParsingStageProps) {
  const steps = SUB_STEPS(total);
  const [active, setActive] = useState(0);
  const [matched, setMatched] = useState(0);

  // Steps 0,1,3 advance on fixed timers; step 2 (matching) drives the live count.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setActive(1), 700));
    timers.push(setTimeout(() => setActive(2), 1400));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (active !== 2) return;
    const perTick = Math.max(40, Math.round(1600 / Math.max(1, total)));
    const interval = setInterval(() => {
      setMatched((m) => {
        if (m + 1 >= total) {
          clearInterval(interval);
          setTimeout(() => setActive(3), 300);
          return total;
        }
        return m + 1;
      });
    }, perTick);
    return () => clearInterval(interval);
  }, [active, total]);

  useEffect(() => {
    if (active !== 3) return;
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [active, onDone]);

  return (
    <div className="flex flex-col items-center py-6">
      {/* Spinner */}
      <div
        className="w-16 h-16 rounded-full animate-spin"
        style={{ border: '5px solid #EEEDFE', borderTopColor: '#7800D3' }}
      />
      <p className="font-sora text-[17px] font-semibold mt-5" style={{ color: '#1A0B2E' }}>Reading and parsing CVs…</p>
      <p className="text-[12px] text-[#888] mt-1">This usually takes a few seconds per candidate.</p>

      <div className="w-full max-w-[340px] mt-6 space-y-2.5">
        {steps.map((label, i) => {
          const done = i < active;
          const isActive = i === active;
          return (
            <div key={i} className="flex items-center gap-2.5">
              {done ? (
                <Check className="h-4 w-4 shrink-0" style={{ color: '#2F7A10' }} />
              ) : isActive ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" style={{ color: '#7800D3' }} />
              ) : (
                <Circle className="h-4 w-4 shrink-0" style={{ color: '#CFC9DA' }} />
              )}
              <span
                className="text-[13px]"
                style={{
                  color: done ? '#2F7A10' : isActive ? '#1A0B2E' : '#999',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}

        <p className="text-[12px] text-[#999] text-center pt-2">
          {Math.min(active >= 3 ? total : matched, total)} of {total} candidates parsed
        </p>
      </div>
    </div>
  );
}

export default ParsingStage;
