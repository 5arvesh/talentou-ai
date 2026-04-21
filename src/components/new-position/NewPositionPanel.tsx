import React from 'react';
import { useNewPosition } from '@/context/NewPositionContext';
import { JDPreviewStage } from './panel-stages/JDPreviewStage';
import { RecruiterAssignmentStage } from './panel-stages/RecruiterAssignmentStage';

export function NewPositionPanel() {
  const { showRecruiterPanel } = useNewPosition();

  return (
    <div className="h-full bg-background flex flex-col">
      {showRecruiterPanel && <RecruiterAssignmentStage />}
      {!showRecruiterPanel && <JDPreviewStage />}
    </div>
  );
}
