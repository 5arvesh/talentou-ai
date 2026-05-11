import { useTourStore } from "@/store/tour-store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import mascot from "@/assets/talentou-mascot-new.png";

export function TourGuide() {
  const { steps, currentStep, isVisible, nextStep, prevStep, skipTour } = useTourStore();

  if (!isVisible || steps.length === 0) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[360px] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #7800D3, #503afd)" }} />

        <div className="flex gap-4 p-5">
          {/* Mascot */}
          <div className="shrink-0">
            <img
              src={mascot}
              alt="Talentou guide"
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7800D3]">
                Step {currentStep + 1} of {steps.length}
              </span>
              <button
                onClick={skipTour}
                className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded"
                aria-label="Close tour"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Step dots */}
            <div className="flex gap-1 mb-3">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === currentStep ? "16px" : "6px",
                    backgroundColor: i <= currentStep ? "#7800D3" : "#e5e7eb",
                  }}
                />
              ))}
            </div>

            <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-1">
              {step.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-5 pb-4 gap-3">
          <button
            onClick={skipTour}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline-offset-2 hover:underline"
          >
            Skip tour
          </button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                className="h-8 px-3 text-xs gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Back
              </Button>
            )}
            <Button
              size="sm"
              onClick={nextStep}
              className="h-8 px-4 text-xs gap-1 text-white"
              style={{ backgroundColor: "#7800D3" }}
            >
              {isLast ? "Finish" : "Next"}
              {!isLast && <ChevronRight className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
