import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TAPlanFlowProvider } from '@/context/TAPlanFlowContext';
import { TAPlanFlowProgress } from './TAPlanFlowProgress';
import { TAPlanFlowChat } from './TAPlanFlowChat';
import { TAPlanFlowPanel } from './TAPlanFlowPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useChatPanelStore } from "@/store/chat-panel-store";
import { useTourStore } from "@/store/tour-store";

const TA_PLAN_TOUR_STEPS = [
  {
    title: "Chat with your AI assistant",
    description: "Type here to have a conversation with Talentou AI. Describe your company, talent needs, or ask questions — the AI builds your plan as you chat.",
  },
  {
    title: "Your plan builds here in real time",
    description: "This panel reflects your TA plan as it's created. You can edit any section directly — click the Edit button on any field to update it.",
  },
  {
    title: "Track your progress",
    description: "The sidebar on the left shows all 5 planning stages. Each stage turns green as you complete it. You can jump between stages anytime.",
  },
];

export function TAPlanFlowLayout() {
  const scrollToStageRef = useRef<((stage: number) => void) | undefined>();
  const { isChatOpen } = useChatPanelStore();
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("ta-plan-flow", TA_PLAN_TOUR_STEPS);
  }, []);

  return (
    <TAPlanFlowProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-64px)] w-full">
        {/* Left Progress Sidebar */}
        <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
          <TAPlanFlowProgress scrollToStageRef={scrollToStageRef} />
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
            {/* Center Continuous Chat */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <TAPlanFlowChat scrollToStageRef={scrollToStageRef} />
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Right Interactive Form Panel */}
        <ResizablePanel defaultSize={55} minSize={35} maxSize={70}>
          <TAPlanFlowPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TAPlanFlowProvider>
  );
}
