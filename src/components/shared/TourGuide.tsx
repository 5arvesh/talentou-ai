import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTourStore } from "@/store/tour-store";

const PADDING = 12;
const TOOLTIP_WIDTH = 340;
const TOOLTIP_HEIGHT = 200;
const ARROW_SIZE = 8;
const EXIT_CARD_FADE_START_MS = 1900;

interface Rect { top: number; left: number; width: number; height: number; }

function ScreenProgressBar({ sequence, currentKey }: { sequence: { key: string; label: string; path?: string }[]; currentKey?: string }) {
  const navigate = useNavigate();
  const currentIndex = sequence.findIndex((s) => s.key === currentKey);
  return (
    <div className="w-full max-w-md flex items-center gap-1.5 mb-8">
      {sequence.map((s, i) => {
        const isCurrent = i === currentIndex;
        const isClickable = !isCurrent && !!s.path;
        return (
          <button
            key={s.key}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && s.path && navigate(s.path)}
            className={cn("flex-1 flex flex-col items-center gap-1.5 group bg-transparent border-0 p-0", isClickable ? "cursor-pointer" : "cursor-default")}
          >
            <div
              className={cn(
                "h-0.5 w-full rounded-full transition-colors duration-300",
                isCurrent ? "bg-[#7800D3]" : i < currentIndex ? "bg-[#7800D3]/40" : "bg-[#2a1a3e]",
                isClickable && "group-hover:bg-[#7800D3]/70"
              )}
            />
            <span
              className={cn(
                "text-[9px] uppercase tracking-wide text-center leading-tight font-sora",
                isCurrent ? "text-white font-semibold" : "text-[#a78bca]/60"
              )}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function TourGuide() {
  const { steps, currentStep, isVisible, justCompleted, nextStep, prevStep, skipTour, exitTour } = useTourStore();
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [arrowSide, setArrowSide] = useState<"top" | "bottom">("bottom");
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [exitCardFading, setExitCardFading] = useState(false);

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const isLastIntroSlide = step?.variant === "intro" && steps[currentStep + 1]?.variant !== "intro";

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
      setArrowSide("top"); // tooltip sits below target -> arrow points up, at tooltip's top edge
    } else if (spaceAbove >= TOOLTIP_HEIGHT + PADDING + 24) {
      tTop = r.top - TOOLTIP_HEIGHT - PADDING;
      setArrowSide("bottom"); // tooltip sits above target -> arrow points down, at tooltip's bottom edge
    } else {
      tTop = r.top + r.height / 2 - TOOLTIP_HEIGHT / 2;
      setArrowSide("top");
    }
    let tLeft = r.left + r.width / 2 - TOOLTIP_WIDTH / 2;
    tLeft = Math.max(16, Math.min(tLeft, window.innerWidth - TOOLTIP_WIDTH - 16));
    setTooltipPos({ top: tTop, left: tLeft });
  }, [step]);

  useEffect(() => {
    if (!isVisible) return;
    if (step?.variant === "intro") return; // no target to measure for full-bleed intro slides
    step?.onEnter?.();
    // Give more time when onEnter modifies the DOM (tab switches, popovers)
    const delay = step?.onEnter ? 350 : 150;
    const t = setTimeout(measureTarget, delay);
    return () => clearTimeout(t);
  }, [currentStep, isVisible, measureTarget, step]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
      measureTarget();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureTarget]);

  useEffect(() => {
    if (!justCompleted) {
      setExitCardFading(false);
      return;
    }
    const t = setTimeout(() => setExitCardFading(true), EXIT_CARD_FADE_START_MS);
    return () => clearTimeout(t);
  }, [justCompleted]);

  const lastStep = steps[steps.length - 1];
  const completionTitle = lastStep?.completionTitle ?? "You're all set!";
  const completionDescription = lastStep?.completionDescription;

  const exitCard = justCompleted
    ? createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              "bg-white rounded-card shadow-2xl border border-primary/20 px-5 py-4",
              exitCardFading ? "animate-out fade-out duration-300" : "animate-in fade-in zoom-in-95 duration-300"
            )}
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{completionTitle}</p>
              <p className="text-xs text-muted-foreground">
                {completionDescription ?? (
                  <>Look for the <span className="font-medium text-primary">?</span> icon in the top bar anytime you want to see this again.</>
                )}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  if (!isVisible || steps.length === 0 || !step) return exitCard;

  // Full-bleed dark intro slide
  if (step.variant === "intro") {
    return (
      <>
        {exitCard}
        {createPortal(
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0e0020] animate-in fade-in duration-300">
            <div className="absolute top-6 right-8 text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Step {currentStep + 1} of {steps.length}
            </div>
            <button
              onClick={exitTour}
              title="Exit"
              className="absolute top-5 right-24 text-white/40 hover:text-white/80 transition-colors p-1 rounded"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center text-center px-6 max-w-lg">
              {step.screenSequence && step.screenSequence.length > 0 && (
                <ScreenProgressBar sequence={step.screenSequence} currentKey={step.screenKey} />
              )}

              {step.icon && (
                <div
                  className="relative mb-6 h-16 w-16 rounded-full bg-[rgba(192,132,252,0.12)] border border-[rgba(192,132,252,0.3)] flex items-center justify-center animate-intro-icon-pulse animate-in zoom-in-50 duration-500"
                  style={{
                    boxShadow: "0 0 0 32px rgba(120,0,211,0.08), 0 0 0 64px rgba(120,0,211,0.04)",
                  }}
                >
                  <step.icon className="h-7 w-7 text-[#c084fc]" />
                </div>
              )}

              <h2 className="font-sora text-2xl font-semibold text-white leading-tight mb-3">
                {step.title}
              </h2>
              <p className="text-sm text-[#a78bca] leading-relaxed max-w-md">
                {step.description}
              </p>
            </div>

            <div className="absolute bottom-8 left-8">
              <button
                onClick={skipTour}
                className="text-xs text-[#6b5a8a] hover:text-[#a78bca] transition-colors underline-offset-2 hover:underline"
              >
                Skip tour
              </button>
            </div>
            <div className="absolute bottom-8 right-8">
              <Button
                size="sm"
                onClick={nextStep}
                className="h-8 px-5 text-sm text-white gap-1"
                style={{ backgroundColor: "hsl(var(--primary))" }}
              >
                {isLastIntroSlide ? "Get started" : "Next"}
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }

  // Fallback: fixed bottom-right card when no selector or element not found
  if (!step.targetSelector || !targetRect) {
    return (
      <>
        {exitCard}
        <div className="fixed bottom-6 right-6 z-[100] w-[360px] animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white rounded-card shadow-2xl border border-gray-100 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-talentou-purple to-talentou-action-from" />
            <div className="p-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <button onClick={exitTour} title="Exit" className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded">
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
      </>
    );
  }

  // Spotlight mode — SVG overlay with mask cutout
  const sx = targetRect.left - PADDING;
  const sy = targetRect.top - PADDING;
  const sw = targetRect.width + PADDING * 2;
  const sh = targetRect.height + PADDING * 2;
  const dashTotal = 2 * (sw + sh);

  const arrowLeft = Math.max(
    20,
    Math.min(targetRect.left + targetRect.width / 2 - tooltipPos.left - ARROW_SIZE, TOOLTIP_WIDTH - 20 - ARROW_SIZE * 2)
  );

  return (
    <>
      {exitCard}
      {createPortal(
        <>
          {/* SVG overlay — dims everything except the spotlight */}
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
            {/* Purple dashed highlight ring — draws itself in around the target */}
            <rect
              key={currentStep}
              x={sx} y={sy} width={sw} height={sh} rx="10" fill="none"
              stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray={dashTotal}
              className="animate-coachmark-dash-draw"
              style={{ pointerEvents: "none", ["--dash-total" as string]: dashTotal }}
            />
          </svg>

          {/* Directional arrow pointing from the tooltip toward the highlighted element */}
          <div
            className={cn(
              "fixed animate-in fade-in duration-150",
              arrowSide === "top" ? "slide-in-from-bottom-1" : "slide-in-from-top-1"
            )}
            style={{
              top: arrowSide === "top" ? tooltipPos.top - ARROW_SIZE : tooltipPos.top + TOOLTIP_HEIGHT,
              left: tooltipPos.left + arrowLeft,
              zIndex: 9999,
              width: 0,
              height: 0,
              borderLeft: `${ARROW_SIZE}px solid transparent`,
              borderRight: `${ARROW_SIZE}px solid transparent`,
              ...(arrowSide === "top"
                ? { borderBottom: `${ARROW_SIZE}px solid hsl(var(--primary))` }
                : { borderTop: `${ARROW_SIZE}px solid hsl(var(--primary))` }),
              pointerEvents: "none",
            }}
          />

          {/* Tooltip card */}
          <div
            data-tour-tooltip
            style={{ position: "fixed", top: tooltipPos.top, left: tooltipPos.left, width: TOOLTIP_WIDTH, zIndex: 9999, pointerEvents: "all" }}
            className="bg-white rounded-card shadow-2xl border border-primary/20 overflow-hidden"
          >
            <div className="flex gap-4 p-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <button onClick={exitTour} title="Exit" className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded">
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
                      <Button variant="outline" size="sm" onClick={prevStep} className="h-8 px-3 text-xs border-primary/30 text-primary hover:bg-primary/10 gap-1">
                        <ChevronLeft className="h-3 w-3" /> Back
                      </Button>
                    )}
                    <Button size="sm" onClick={nextStep} className="h-8 px-3 text-xs bg-primary hover:bg-primary/90 text-white gap-1">
                      {isLast ? "Done" : "Got it"}{!isLast && <ChevronRight className="h-3 w-3" />}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
