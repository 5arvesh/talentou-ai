import React from 'react';
import { NewPositionProvider } from '@/context/NewPositionContext';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { NewPositionProgress } from './NewPositionProgress';
import { NewPositionChat } from './NewPositionChat';
import { NewPositionPanel } from './NewPositionPanel';
import { useChatPanelStore } from "@/store/chat-panel-store";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function NewPositionLayout() {
  const { isChatOpen } = useChatPanelStore();

  return (
    <NewPositionProvider>
      <ResizablePanelGroup direction="horizontal" className="h-full w-full bg-white">
        {/* Left Progress Sidebar */}
        <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
          <NewPositionProgress />
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
            {/* Center Chat */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <NewPositionChat />
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Right Panel - Dynamic based on step */}
        <ResizablePanel defaultSize={55} minSize={35} maxSize={70}>
          <NewPositionPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </NewPositionProvider>
  );
}
