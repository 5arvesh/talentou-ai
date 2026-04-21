import React from 'react';
import { TAPlanReviewProvider } from '@/context/TAPlanReviewContext';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ReviewProgressSidebar } from './ReviewProgressSidebar';
import { ReviewChatPanel } from './ReviewChatPanel';
import { ReviewDetailsPanel } from './ReviewDetailsPanel';

export function TAPlanReviewInterface() {
  return (
    <TAPlanReviewProvider>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-[calc(100vh-64px)] w-full"
      >
        {/* Left: Progress Sidebar */}
        <ResizablePanel defaultSize={20} minSize={18} maxSize={25}>
          <ReviewProgressSidebar />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Middle: Feedback Chat */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <ReviewChatPanel />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Plan Details */}
        <ResizablePanel defaultSize={40} minSize={35}>
          <ReviewDetailsPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TAPlanReviewProvider>
  );
}
