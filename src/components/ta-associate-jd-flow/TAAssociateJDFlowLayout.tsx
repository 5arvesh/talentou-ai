import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { TAAssociateJDFlowProvider } from '@/context/TAAssociateJDFlowContext';
import { TAAssociateJDFlowProgress } from './TAAssociateJDFlowProgress';
import { TAAssociateJDFlowChat } from './TAAssociateJDFlowChat';
import { TAAssociateJDFlowPanel } from './TAAssociateJDFlowPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useChatPanelStore } from "@/store/chat-panel-store";

export function TAAssociateJDFlowLayout() {
  const { jobId } = useParams<{ jobId: string }>();
  const scrollToStageRef = useRef<((stage: number) => void) | undefined>();
  const { isChatOpen } = useChatPanelStore();

  return (
    <TAAssociateJDFlowProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-64px)] w-full">
        {/* Left Progress Sidebar */}
        <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
          <TAAssociateJDFlowProgress scrollToStageRef={scrollToStageRef} jobId={jobId || ''} />
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
              <TAAssociateJDFlowChat scrollToStageRef={scrollToStageRef} jobId={jobId || ''} />
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Right Interactive Form Panel */}
        <ResizablePanel defaultSize={55} minSize={35} maxSize={70}>
          <TAAssociateJDFlowPanel jobId={jobId || ''} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TAAssociateJDFlowProvider>
  );
}
