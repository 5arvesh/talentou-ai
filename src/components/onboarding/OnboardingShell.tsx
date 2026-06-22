import React, { ReactNode } from 'react';
import { LeftPanel } from './LeftPanel';
import { HorizontalStepper } from './HorizontalStepper';

interface Step {
  label: string;
  status: 'done' | 'current' | 'locked';
}

interface OnboardingShellProps {
  leftPanel: {
    eyebrow: string;
    headline: string;
    body: string;
    steps?: Step[];
    progressLabel?: string;
  };
  progressPct?: number;
  footer?: {
    dots?: { total: number; active: number };
    left?: ReactNode;
    right: ReactNode;
  };
  fullBleedBody?: boolean;
  stepperInContent?: boolean;
  children: ReactNode;
}

function StepDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center gap-[6px]">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`transition-all duration-200 rounded-[3px] ${
            i + 1 === active
              ? 'w-[18px] h-[6px] bg-[#7800D3]'
              : 'w-[6px] h-[6px] rounded-full bg-[#ddd]'
          }`}
        />
      ))}
    </div>
  );
}

export function OnboardingShell({ leftPanel, progressPct, footer, fullBleedBody, stepperInContent, children }: OnboardingShellProps) {
  const { steps, ...leftRest } = leftPanel;
  const hasSteps = !!steps && steps.length > 0;

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel {...leftRest} />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top progress — suppressed when the host renders the stepper inside content */}
        {!stepperInContent && (
          hasSteps ? (
            <div className="shrink-0 px-11 pt-8 pb-3">
              <HorizontalStepper steps={steps!} />
            </div>
          ) : (
            progressPct !== undefined && (
              <div className="h-[3px] bg-[#f0eeff] shrink-0">
                <div
                  className="h-full bg-[#7800D3]"
                  style={{ width: `${progressPct}%`, transition: 'width 0.35s ease' }}
                />
              </div>
            )
          )
        )}

        {/* Body */}
        {fullBleedBody ? (
          <div className="flex-1 overflow-hidden">{children}</div>
        ) : (
          <div className="flex-1 overflow-y-auto px-11 pt-8 pb-6">
            <div className="max-w-[760px]">{children}</div>
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="shrink-0 border-t border-[#f0eeff] bg-white px-11 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {footer.dots && (
                <StepDots total={footer.dots.total} active={footer.dots.active} />
              )}
              {footer.left}
            </div>
            <div>{footer.right}</div>
          </div>
        )}
      </div>
    </div>
  );
}
