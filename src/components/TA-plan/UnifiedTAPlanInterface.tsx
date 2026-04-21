import React, { useRef } from 'react';
import { TAPlanProvider } from '@/context/TAPlanContext';
import { TAPlanProgressSidebar } from './TAPlanProgressSidebar';
import { TAPlanContinuousChat } from './TAPlanContinuousChat';
import { TAPlanInteractiveEditor } from './TAPlanInteractiveEditor';

export function UnifiedTAPlanInterface() {
  const scrollToStageRef = useRef<((stage: number) => void) | undefined>();

  return (
    <TAPlanProvider>
      <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
        {/* Left Progress Sidebar */}
        <TAPlanProgressSidebar scrollToStageRef={scrollToStageRef} />

        {/* Center Continuous Chat */}
        <TAPlanContinuousChat scrollToStageRef={scrollToStageRef} />

        {/* Right Interactive Plan Editor */}
        <TAPlanInteractiveEditor />
      </div>
    </TAPlanProvider>
  );
}
