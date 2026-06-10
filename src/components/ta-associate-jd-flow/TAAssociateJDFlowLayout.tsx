import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TAAssociateJDFlowProvider } from '@/context/TAAssociateJDFlowContext';
import { TAAssociateJDFlowProgress } from './TAAssociateJDFlowProgress';
import { TAAssociateJDFlowChat } from './TAAssociateJDFlowChat';
import { TAAssociateJDFlowPanel } from './TAAssociateJDFlowPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useChatPanelStore } from "@/store/chat-panel-store";
import { useTourStore } from "@/store/tour-store";

const JD_FLOW_TOUR_STEPS = [
  {
    title: "Build your job description here",
    description: "Chat with the AI to describe the role. You can ask it to generate a JD from scratch, refine an existing one, or answer specific questions about the position.",
    targetSelector: '[data-tour-id="jd-chat"]',
  },
  {
    title: "Review & edit your JD in the panel",
    description: "Your job description is generated live in this panel. Edit any section directly, add or remove fields, and preview before publishing.",
    targetSelector: '[data-tour-id="jd-panel"]',
  },
  {
    title: "Track your JD stages",
    description: "The left sidebar tracks your progress — from initial details through skills, responsibilities, and final approval. Complete each step to publish.",
    targetSelector: '[data-tour-id="jd-progress"]',
  },
];

export function TAAssociateJDFlowLayout() {
  const { jobId } = useParams<{ jobId: string }>();
  const scrollToStageRef = useRef<((stage: number) => void) | undefined>();
  const { isChatOpen } = useChatPanelStore();
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("jd-flow", JD_FLOW_TOUR_STEPS);
  }, []);

  return (
    <TAAssociateJDFlowProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-64px)] w-full">
        {/* Left Progress Sidebar */}
        <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
          <div data-tour-id="jd-progress" className="h-full">
            <TAAssociateJDFlowProgress scrollToStageRef={scrollToStageRef} jobId={jobId || ''} />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {isChatOpen && (
          <>
            {/* Center Continuous Chat */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <div data-tour-id="jd-chat" className="h-full">
                <TAAssociateJDFlowChat scrollToStageRef={scrollToStageRef} jobId={jobId || ''} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Right Interactive Form Panel */}
        <ResizablePanel defaultSize={55} minSize={35} maxSize={70}>
          <div data-tour-id="jd-panel" className="h-full bg-[#F8F7FF]">
            <TAAssociateJDFlowPanel jobId={jobId || ''} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TAAssociateJDFlowProvider>
  );
}
