import React, { useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquareText } from 'lucide-react';
import { TAAssociateJDFlowProvider, useTAAssociateJDFlow } from '@/context/TAAssociateJDFlowContext';
import { TAAssociateJDFlowProgress } from './TAAssociateJDFlowProgress';
import { TAAssociateJDFlowChat } from './TAAssociateJDFlowChat';
import { TAAssociateJDFlowPanel } from './TAAssociateJDFlowPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useChatPanelStore } from "@/store/chat-panel-store";
import { TourStep } from "@/store/tour-store";
import { useScreenTour } from "@/hooks/useScreenTour";

function buildJDFlowTourSteps(goToStage: (stage: number) => void): TourStep[] {
  return [
    {
      variant: 'intro',
      icon: MessageSquareText,
      title: "Build the JD in a conversation",
      description: "Instead of filling out a form, you talk through the role with the AI. It drafts the job description as you go.",
    },
    {
      targetSelector: '[data-tour-id="jd-progress"]',
      title: "Track your JD stages",
      description: "Review JD, then Screening Questions, then Generate Link — three stages, tracked here.",
      onEnter: () => goToStage(0),
    },
    {
      targetSelector: '[data-tour-id="jd-review-btn"]',
      title: "Review, then confirm",
      description: "This first stage is read-only — review the AI-drafted JD, then click \"I've Reviewed the JD\" to continue. There's no inline editing here.",
      onEnter: () => goToStage(0),
    },
    {
      targetSelector: '[data-tour-id="jd-save-questions-btn"]',
      title: "Screening questions",
      description: "Add, edit, or delete screening questions here, then Save Questions to lock them in.",
      onEnter: () => goToStage(1),
    },
    {
      targetSelector: '[data-tour-id="jd-generate-link-btn"]',
      title: "Share it",
      description: "Generate Link produces a shareable JD/application link — there's no separate \"Publish\" step.",
      onEnter: () => goToStage(2),
    },
    {
      targetSelector: '[data-tour-id="jd-chat"]',
      title: "The chat assists throughout",
      description: "Describe the role or ask follow-up questions — the chat is available across all 3 stages.",
      onEnter: () => goToStage(0),
    },
  ];
}

function TAAssociateJDFlowInner({ jobId }: { jobId: string }) {
  const scrollToStageRef = useRef<((stage: number) => void) | undefined>();
  const { isChatOpen } = useChatPanelStore();
  const { goToStage } = useTAAssociateJDFlow();

  const tourSteps = useMemo(() => buildJDFlowTourSteps(goToStage), []); // eslint-disable-line react-hooks/exhaustive-deps
  useScreenTour("recruiter", "jd-flow", tourSteps);

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-64px)] w-full">
      {/* Left Progress Sidebar */}
      <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
        <div data-tour-id="jd-progress" className="h-full">
          <TAAssociateJDFlowProgress scrollToStageRef={scrollToStageRef} jobId={jobId} />
        </div>
      </ResizablePanel>

      <ResizableHandle />

      {isChatOpen && (
        <>
          {/* Center Continuous Chat */}
          <ResizablePanel defaultSize={30} minSize={20}>
            <div data-tour-id="jd-chat" className="h-full">
              <TAAssociateJDFlowChat scrollToStageRef={scrollToStageRef} jobId={jobId} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
        </>
      )}

      {/* Right Interactive Form Panel */}
      <ResizablePanel defaultSize={55} minSize={35} maxSize={70}>
        <div data-tour-id="jd-panel" className="h-full bg-[#F8F7FF]">
          <TAAssociateJDFlowPanel jobId={jobId} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function TAAssociateJDFlowLayout() {
  const { jobId } = useParams<{ jobId: string }>();

  return (
    <TAAssociateJDFlowProvider>
      <TAAssociateJDFlowInner jobId={jobId || ''} />
    </TAAssociateJDFlowProvider>
  );
}
