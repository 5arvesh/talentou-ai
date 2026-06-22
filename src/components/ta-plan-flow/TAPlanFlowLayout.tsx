import React, { useRef, useEffect } from 'react';
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
    targetSelector: '[data-tour-id="ta-plan-chat"]',
  },
  {
    title: "Your plan builds here in real time",
    description: "This panel reflects your Recruitment plan as it's created. You can edit any section directly — click the Edit button on any field to update it.",
    targetSelector: '[data-tour-id="ta-plan-panel"]',
  },
  {
    title: "Track your progress",
    description: "The sidebar on the left shows all 4 planning stages. Each stage turns green as you complete it. You can jump between stages anytime.",
    targetSelector: '[data-tour-id="ta-plan-progress"]',
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
        <ResizablePanel defaultSize={18} minSize={14} maxSize={26}>
          <div data-tour-id="ta-plan-progress" className="h-full">
            <TAPlanFlowProgress scrollToStageRef={scrollToStageRef} />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {isChatOpen && (
          <>
            {/* Center Continuous Chat */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <div data-tour-id="ta-plan-chat" className="h-full">
                <TAPlanFlowChat scrollToStageRef={scrollToStageRef} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Right Interactive Form Panel */}
        <ResizablePanel defaultSize={55} minSize={35} maxSize={70}>
          <div data-tour-id="ta-plan-panel" className="h-full bg-[#F8F7FF]">
            <TAPlanFlowPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TAPlanFlowProvider>
  );
}
