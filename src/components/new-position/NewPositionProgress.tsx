import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check } from 'lucide-react';
import { useNewPosition } from '@/context/NewPositionContext';

export function NewPositionProgress() {
  const navigate = useNavigate();
  const { 
    getVisibleSteps, 
    getStepStatus, 
    progressPercentage, 
    isApproved, 
    completedSteps 
  } = useNewPosition();

  const approvalSteps = getVisibleSteps();

  const handleBackClick = () => {
    navigate('/notifications');
  };

  return (
    <div className="h-full bg-white border-r border-[#7800D3]/15 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#7800D3]/15">
        <Button variant="ghost" size="sm" onClick={handleBackClick} className="mb-4 -ml-2 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-xl font-bold text-[#7800D3]">Position Approval</h2>
        <p className="text-xs text-muted-foreground mt-1">Review and approve</p>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {approvalSteps.map((step) => {
          const status = getStepStatus(step.id);
          const isRejected = step.id === 1 && isApproved === false && completedSteps.includes(1);
          return (
            <Card
              key={step.id}
              className={`p-4 transition-all duration-200 border
                ${status === 'completed' && !isRejected ? 'border-[#4ead3b] bg-white' : ''}
                ${status === 'completed' && isRejected ? 'border-red-500 bg-white' : ''}
                ${status === 'in-progress' ? 'border-[#7800D3] shadow-md bg-white' : ''}
                ${status === 'upcoming' ? 'border-gray-100 bg-white opacity-60' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm
                  ${status === 'completed' && !isRejected ? 'bg-[#4ead3b] text-white' : ''}
                  ${status === 'completed' && isRejected ? 'bg-red-500 text-white' : ''}
                  ${status === 'in-progress' ? 'bg-[#7800D3] text-white' : ''}
                  ${status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
                `}>
                  {status === 'completed' ? <Check className="h-4 w-4" /> : step.id + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm
                    ${status === 'completed' && !isRejected ? 'text-[#4ead3b]' : ''}
                    ${status === 'completed' && isRejected ? 'text-red-500' : ''}
                    ${status === 'in-progress' ? 'text-[#7800D3]' : ''}
                    ${status === 'upcoming' ? 'text-muted-foreground' : ''}
                  `}>
                    {step.title}
                  </h3>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Progress */}
      <div className="p-6 border-t border-[#7800D3]/15 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-xl font-bold text-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  );
}
