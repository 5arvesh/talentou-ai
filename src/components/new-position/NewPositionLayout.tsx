import React, { useEffect } from 'react';
import { NewPositionProvider } from '@/context/NewPositionContext';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { NewPositionProgress } from './NewPositionProgress';
import { NewPositionChat } from './NewPositionChat';
import { NewPositionPanel } from './NewPositionPanel';
import { useChatPanelStore } from "@/store/chat-panel-store";
import { useTourStore } from "@/store/tour-store";

const NEW_POSITION_TOUR_STEPS = [
  {
    title: "Request a new position",
    description: "Describe the new role you need to open. The AI will help you structure the request, define requirements, and set priorities.",
    targetSelector: '[data-tour-id="np-chat"]',
  },
  {
    title: "Review the generated position details",
    description: "This panel shows the JD preview, priority level, and recruiter assignment for your new position. Make any edits before submitting.",
    targetSelector: '[data-tour-id="np-panel"]',
  },
  {
    title: "Complete all 3 steps to submit",
    description: "Work through JD Preview → Priority Management → Recruiter Assignment. Once done, the request is sent for approval.",
    targetSelector: '[data-tour-id="np-progress"]',
  },
];

export function NewPositionLayout() {
  const { isChatOpen } = useChatPanelStore();
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("new-position", NEW_POSITION_TOUR_STEPS);
  }, []);

  return (
    <NewPositionProvider>
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        {/* Left Progress Sidebar */}
        <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
          <div data-tour-id="np-progress" className="h-full">
            <NewPositionProgress />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {isChatOpen && (
          <>
            {/* Center Chat */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <div data-tour-id="np-chat" className="h-full">
                <NewPositionChat />
              </div>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Right Panel - Dynamic based on step */}
        <ResizablePanel defaultSize={55} minSize={35} maxSize={70}>
          <div data-tour-id="np-panel" className="h-full">
            <NewPositionPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </NewPositionProvider>
  );
}
