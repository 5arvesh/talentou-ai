import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HiringLeadConversationProvider, useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { HiringLeadConversationProgress } from "./HiringLeadConversationProgress";
import { HiringLeadConversationChat } from "./HiringLeadConversationChat";
import { HiringLeadConversationPanel } from "./HiringLeadConversationPanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useChatPanelStore } from "@/store/chat-panel-store";

function ConversationContent() {
  const scrollToStageRef = useRef<((stage: number) => void) | undefined>();
  const { currentStage } = useHiringLeadConversation();
  const { isChatOpen } = useChatPanelStore();

  // View JD section (stage 3) - bigger right panel, smaller chat
  const isViewJDStage = currentStage === 3;

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      {/* Left Progress Sidebar */}
      <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
        <HiringLeadConversationProgress scrollToStageRef={scrollToStageRef} />
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
            <HiringLeadConversationChat scrollToStageRef={scrollToStageRef} />
          </ResizablePanel>
          <ResizableHandle />
        </>
      )}

      {/* Right Form Panel - bigger for View JD */}
      <ResizablePanel 
        defaultSize={isViewJDStage ? 65 : 55} 
        minSize={30}
      >
        <HiringLeadConversationPanel />
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
