import React, { useRef, useMemo } from "react";
import { MessageSquare, ListChecks } from "lucide-react";
import { HiringLeadConversationProvider, useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { HiringLeadConversationProgress } from "./HiringLeadConversationProgress";
import { HiringLeadConversationChat } from "./HiringLeadConversationChat";
import { HiringLeadConversationPanel } from "./HiringLeadConversationPanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useChatPanelStore } from "@/store/chat-panel-store";
import { useScreenTour } from "@/hooks/useScreenTour";
import { TourStep } from "@/store/tour-store";
import { HL_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";

function buildCreatePositionTourSteps(currentStage: number): TourStep[] {
  const steps: TourStep[] = [
    {
      variant: 'intro',
      icon: MessageSquare,
      screenSequence: HL_TOUR_SCREEN_SEQUENCE,
      screenKey: 'create-position',
      title: "Create a position in a conversation",
      description: "Instead of filling out a form alone, you work through each step with Talentou's AI. It asks questions, suggests defaults, and builds the position details as you go.",
    },
    {
      variant: 'intro',
      icon: ListChecks,
      screenSequence: HL_TOUR_SCREEN_SEQUENCE,
      screenKey: 'create-position',
      title: "Five steps, one conversation",
      description: "Job details, skills and responsibilities, screening questions, job description review, and interview setup. The left sidebar tracks your progress — you can jump back to any completed step.",
    },
    {
      targetSelector: '[data-tour-id="hl-progress"]',
      title: "Your progress",
      description: "Each numbered step lights up as you complete it. Green means done, purple means in progress, gray means upcoming. Click any completed step to go back and edit.",
    },
    {
      targetSelector: '[data-tour-id="hl-chat"]',
      title: "Talk through it",
      description: "The AI guides you step by step. Answer its questions in your own words — it fills in the form on the right as you go. You can also type questions if something isn't clear.",
    },
    {
      targetSelector: '[data-tour-id="hl-chat-input"]',
      title: "Type your responses",
      description: "Type your answers here and press Enter to send. The AI reads what you write and updates the form on the right automatically.",
    },
    {
      targetSelector: '[data-tour-id="hl-panel"]',
      title: "The form fills as you talk",
      description: "This panel updates in real time as you chat. You can also edit fields directly here — changes from either side (chat or form) sync automatically.",
    },
  ];

  if (currentStage === 0) {
    steps.push(
      {
        targetSelector: '[data-tour-id="hl-job-title-field"]',
        title: "Start with the title",
        description: "This is the one required field to get going. Everything else the AI can help you fill in or suggest based on similar past roles.",
      },
      {
        targetSelector: '[data-tour-id="hl-role-logistics"]',
        title: "Role logistics",
        description: "Full-time vs contract, onsite vs remote vs hybrid, and where. These feed into the AI's channel and candidate matching later.",
      },
      {
        targetSelector: '[data-tour-id="hl-ctc-experience"]',
        title: "Compensation and seniority",
        description: "Sets the salary range and experience floor. The AI uses these to filter candidates and suggest realistic close timelines.",
      },
      {
        targetSelector: '[data-tour-id="hl-sample-links"]',
        title: "Show the AI what good looks like",
        description: "Paste LinkedIn profile URLs or link to sample CVs. The AI uses these to calibrate its candidate matching — the more examples, the better the matches.",
      }
    );
  }

  steps.push(
    {
      targetSelector: '[data-tour-id="hl-required-footer"]',
      title: "When you're ready",
      description: "Once required fields are filled (via chat or form), the AI moves to the next step automatically. You don't need to click a \"next\" button.",
    },
    {
      targetSelector: '[data-tour-id="hl-step-4"]',
      title: "The last step",
      description: "Configure how the AI interview will work for this role — question types, duration, evaluation criteria. Once set, the position is ready to publish and goes to your Recruitment Lead for plan creation.",
    }
  );

  return steps;
}

function ConversationContent() {
  const scrollToStageRef = useRef<((stage: number) => void) | undefined>();
  const { currentStage } = useHiringLeadConversation();
  const { isChatOpen } = useChatPanelStore();

  const tourSteps = useMemo(
    () => buildCreatePositionTourSteps(currentStage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useScreenTour("hiring-lead", "create-position", tourSteps);

  // View JD section (stage 3) - bigger right panel, smaller chat
  const isViewJDStage = currentStage === 3;

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      {/* Left Progress Sidebar */}
      <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
        <div data-tour-id="hl-progress" className="h-full">
          <HiringLeadConversationProgress scrollToStageRef={scrollToStageRef} />
        </div>
      </ResizablePanel>

      <ResizableHandle />

      {isChatOpen && (
        <>
          {/* Center Continuous Chat - smaller for View JD */}
          <ResizablePanel
            defaultSize={isViewJDStage ? 20 : 30}
            minSize={15}
          >
            <div data-tour-id="hl-chat" className="h-full">
              <HiringLeadConversationChat scrollToStageRef={scrollToStageRef} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
        </>
      )}

      {/* Right Form Panel - bigger for View JD */}
      <ResizablePanel
        defaultSize={isViewJDStage ? 65 : 55}
        minSize={30}
      >
        <div data-tour-id="hl-panel" className="h-full">
          <HiringLeadConversationPanel />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function HiringLeadConversationLayout() {
  return (
    <HiringLeadConversationProvider>
      <ConversationContent />
    </HiringLeadConversationProvider>
  );
}
