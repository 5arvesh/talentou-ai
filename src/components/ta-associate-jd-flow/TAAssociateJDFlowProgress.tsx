import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, FileText, MessageSquare, Link2 } from 'lucide-react';
import { useTAAssociateJDFlow } from '@/context/TAAssociateJDFlowContext';

interface TAAssociateJDFlowProgressProps {
  scrollToStageRef: React.MutableRefObject<((stage: number) => void) | undefined>;
  jobId: string;
}

const stages = [
  { id: 0, title: 'Review JD', icon: FileText, description: 'Review the job description' },
  { id: 1, title: 'Screening Questions', icon: MessageSquare, description: 'Set candidate screening questions' },
  { id: 2, title: 'Generate Link', icon: Link2, description: 'Generate shareable JD link' }
];

export function TAAssociateJDFlowProgress({ scrollToStageRef, jobId }: TAAssociateJDFlowProgressProps) {
  const navigate = useNavigate();
  const { currentStage, completedStages } = useTAAssociateJDFlow();

  const totalSteps = stages.length;
  const progressPercentage = (completedStages.length / totalSteps) * 100;

  const getStepStatus = (stepId: number) => {
    if (completedStages.includes(stepId)) return 'completed';
    if (stepId === currentStage) return 'in-progress';
    return 'upcoming';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-[#7800D3]/15">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/ta-associate/jobs')} 
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
        <h2 className="text-xl font-bold text-foreground">JD Setup</h2>
        <p className="text-xs text-muted-foreground mt-1">{jobId}</p>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {stages.map((stage) => {
          const status = getStepStatus(stage.id);
          const Icon = stage.icon;
          return (
            <Card
              key={stage.id}
              className={`p-4 transition-all duration-200 cursor-pointer
                ${status === 'completed' ? 'border-[#4ead3b] bg-background' : ''}
                ${status === 'in-progress' ? 'border-[#7800D3] bg-background shadow-md' : ''}
                ${status === 'upcoming' ? 'border-border bg-background opacity-60' : ''}
              `}
              onClick={() => scrollToStageRef.current?.(stage.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm
                  ${status === 'completed' ? 'bg-[#4ead3b] text-white' : ''}
                  ${status === 'in-progress' ? 'bg-[#7800D3] text-white' : ''}
                  ${status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
                `}>
                  {status === 'completed' ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm
                    ${status === 'completed' ? 'text-[#4ead3b]' : ''}
                    ${status === 'in-progress' ? 'text-[#7800D3]' : ''}
                    ${status === 'upcoming' ? 'text-muted-foreground' : ''}
                  `}>
                    {stage.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stage.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Progress */}
      <div className="p-6 border-t border-[#7800D3]/15">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-xl font-bold text-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  );
}
