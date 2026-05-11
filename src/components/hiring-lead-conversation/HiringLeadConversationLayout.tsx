import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HiringLeadConversationProvider, useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { HiringLeadConversationProgress } from "./HiringLeadConversationProgress";
import { HiringLeadConversationChat } from "./HiringLeadConversationChat";
import { HiringLeadConversationPanel } from "./HiringLeadConversationPanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useChatPanelStore } from "@/store/chat-panel-store";
import { useTourStore } from "@/store/tour-store";

const HL_CONVERSATION_TOUR_STEPS = [
  {
    title: "Describe your hiring requirements",
    description: "Chat naturally with the AI about the role you're hiring for. Ask questions, share context, or let it guide you through the process.",
    targetSelector: '[data-tour-id="hl-chat"]',
  },
  {
    title: "Fill in the job details panel",
    description: "Complete the structured fields here — job title, budget, start date, skills, and more. The AI helps generate content based on your conversation.",
    targetSelector: '[data-tour-id="hl-panel"]',
  },
  {
    title: "Complete each stage in order",
    description: "The left sidebar tracks your progress through 5 stages: Job Details → Skills → Screening → Interview Setup → JD Preview. Each stage unlocks the next.",
    targetSelector: '[data-tour-id="hl-progress"]',
  },
];

function ConversationContent() {
  const scrollToStageRef = useRef<((stage: number) => void) | undefined>();
  const { currentStage } = useHiringLeadConversation();
  const { isChatOpen } = useChatPanelStore();
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("hl-conversation", HL_CONVERSATION_TOUR_STEPS);
  }, []);

  // View JD section (stage 4) - bigger right panel, smaller chat
  const isViewJDStage = currentStage === 4;

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      {/* Left Progress Sidebar */}
      <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
        <div data-tour-id="hl-progress" className="h-full">
          <HiringLeadConversationProgress scrollToStageRef={scrollToStageRef} />
        </div>
      </ResizablePanel>

      <ResizableHandle>
        <div 
          className="absolute z-50 flex h-6 w-5 items-center justify-center rounded-full border border-gray-200 bg-white cursor-pointer shadow-md text-gray-500 hover:text-gray-800 hover:bg-gray-50"
          onClick={() => useChatPanelStore.getState().toggleChat()}
          title="Toggle Chat"
        >
          {isChatOpen ? <ChevronLeft className="h-4 w-4 pr-0.5" /> : <ChevronRight className="h-4 w-4 pl-0.5" />}
        </div>
      </ResizableHandle>

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
