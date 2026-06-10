import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTourStore } from "@/store/tour-store";
import mascot from "@/assets/talentou-mascot-new.png";

const PADDING = 12;
const TOOLTIP_WIDTH = 340;
const TOOLTIP_HEIGHT = 200;

interface Rect { top: number; left: number; width: number; height: number; }

export function TourGuide() {
  const { steps, currentStep, isVisible, nextStep, prevStep, skipTour } = useTourStore();
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const measureTarget = useCallback(() => {
    if (!step?.targetSelector) {
      setTargetRect(null);
      return;
    }
    const el = document.querySelector(step.targetSelector);
    if (!el) {
      setTargetRect(null);
      return;
    }
    // Scroll the element into view instantly so the spotlight always lands on a visible element
    el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' });
    const r = el.getBoundingClientRect();
    setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height });

    const spaceBelow = window.innerHeight - r.bottom;
    const spaceAbove = r.top;
    let tTop: number;
    if (spaceBelow >= TOOLTIP_HEIGHT + PADDING + 24) {
      tTop = r.bottom + PADDING;
    } else if (spaceAbove >= TOOLTIP_HEIGHT + PADDING + 24) {
      tTop = r.top - TOOLTIP_HEIGHT - PADDING;
    } else {
      tTop = r.top + r.height / 2 - TOOLTIP_HEIGHT / 2;
    }
    let tLeft = r.left + r.width / 2 - TOOLTIP_WIDTH / 2;
    tLeft = Math.max(16, Math.min(tLeft, window.innerWidth - TOOLTIP_WIDTH - 16));
    setTooltipPos({ top: tTop, left: tLeft });
  }, [step]);

  useEffect(() => {
    if (!isVisible) return;
    step?.onEnter?.();
    // Give more time when onEnter modifies the DOM (tab switches, popovers)
    const delay = step?.onEnter ? 350 : 150;
    const t = setTimeout(measureTarget, delay);
    return () => clearTimeout(t);
  }, [currentStep, isVisible, measureTarget]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
      measureTarget();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureTarget]);

  if (!isVisible || steps.length === 0 || !step) return null;

  // Fallback: fixed bottom-right card when no selector or element not found
  if (!step.targetSelector || !targetRect) {
    return (
      <div className="fixed bottom-6 right-6 z-[100] w-[360px] animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-white rounded-card shadow-2xl border border-gray-100 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-talentou-purple to-talentou-action-from" />
          <div className="flex gap-4 p-5">
            <div className="shrink-0">
              <img src={mascot} alt="Talentou guide" className="w-16 h-16 object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <button onClick={skipTour} className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex gap-1 mb-3">
                {steps.map((_, i) => (
                  <div key={i} className="h-1 rounded-full transition-all duration-300"
                    style={{ width: i === currentStep ? "16px" : "6px", backgroundColor: i <= currentStep ? "hsl(var(--primary))" : "hsl(var(--muted))" }} />
                ))}
              </div>
              <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-1">{step.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 pb-4 gap-3">
            <button onClick={skipTour} className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline-offset-2 hover:underline">
              Skip tour
            </button>
            <div className="flex items-center gap-2">
              {!isFirst && (
                <Button variant="outline" size="sm" onClick={prevStep} className="h-8 px-3 text-xs gap-1">
                  <ChevronLeft className="h-3.5 w-3.5" /> Back
                </Button>
              )}
              <Button size="sm" onClick={nextStep} className="h-8 px-4 text-xs gap-1 text-white" style={{ backgroundColor: "hsl(var(--primary))" }}>
                {isLast ? "Finish" : "Next"}{!isLast && <ChevronRight className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Spotlight mode â€” SVG overlay with mask cutout
  const sx = targetRect.left - PADDING;
  const sy = targetRect.top - PADDING;
  const sw = targetRect.width + PADDING * 2;
  const sh = targetRect.height + PADDING * 2;

  return createPortal(
    <>
      {/* SVG overlay â€” dims everything except the spotlight */}
      <svg
        style={{ position: "fixed", top: 0, left: 0, width: windowSize.w, height: windowSize.h, zIndex: 9998, pointerEvents: "all" }}
        onClick={(e) => {
          const el = document.elementFromPoint(e.clientX, e.clientY);
          if (el?.closest("[data-tour-tooltip]")) return;
          const inSpotlight = e.clientX >= sx && e.clientX <= sx + sw && e.clientY >= sy && e.clientY <= sy + sh;
          if (inSpotlight) {
            // Pass the click through to the underlying element
            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            const underlying = elements.find(
              (elem) => !(elem instanceof SVGElement) && elem instanceof HTMLElement
            ) as HTMLElement | undefined;
            underlying?.click();
            if (step?.hideNext) setTimeout(() => nextStep(), 50);
          } else {
            e.stopPropagation();
          }
        }}
      >
        <defs>
          <mask id="tour-spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect x={sx} y={sy} width={sw} height={sh} rx="10" fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.72)" mask="url(#tour-spotlight-mask)" style={{ pointerEvents: "all" }} />
        {/* Purple dashed highlight border */}
        <rect x={sx} y={sy} width={sw} height={sh} rx="10" fill="none"
          stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 3" opacity="0.8"
          style={{ pointerEvents: "none" }} />
      </svg>

      {/* Tooltip card */}
      <div
        data-tour-tooltip
        style={{ position: "fixed", top: tooltipPos.top, left: tooltipPos.left, width: TOOLTIP_WIDTH, zIndex: 9999, pointerEvents: "all" }}
        className="bg-white rounded-card shadow-2xl border border-primary/20 overflow-hidden"
      >
        <div className="h-1 w-full bg-gradient-to-r from-talentou-purple to-talentou-action-from" />
        <div className="flex gap-4 p-5">
          <div className="shrink-0">
            <img src={mascot} alt="Talentou guide" className="w-14 h-14 object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Step {currentStep + 1} of {steps.length}
              </span>
              <button onClick={skipTour} className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex gap-1 mb-3">
              {steps.map((_, i) => (
                <div key={i} className={cn("h-1.5 rounded-full transition-all", i === currentStep ? "w-5 bg-primary" : i < currentStep ? "w-1.5 bg-success" : "w-1.5 bg-muted")} />
              ))}
            </div>
            <h3 className="text-sm font-semibold text-primary leading-snug mb-1">{step.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 pb-4 gap-3">
          <button onClick={skipTour} className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline-offset-2 hover:underline">
            Skip tour
          </button>
          <div className="flex items-center gap-2">
            {step?.hideNext ? (
              <span className="text-[10px] text-primary italic">Click the highlighted element to continue</span>
            ) : (
              <>
                {!isFirst && (
                  <Button variant="outline" size="sm" onClick={prevStep} className="h-7 px-3 text-xs border-primary/30 text-primary hover:bg-primary/10 gap-1">
                    <ChevronLeft className="h-3 w-3" /> Back
                  </Button>
                )}
                <Button size="sm" onClick={nextStep} className="h-7 px-3 text-xs bg-primary hover:bg-primary/90 text-white gap-1">
                  {isLast ? "Done" : "Next"}{!isLast && <ChevronRight className="h-3 w-3" />}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
