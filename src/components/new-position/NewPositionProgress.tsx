import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check, MessageSquareText } from 'lucide-react';
import mascotImg from '@/assets/talentou-mascot-new.png';
import { useNewPosition } from '@/context/NewPositionContext';
import { useChatPanelStore } from '@/store/chat-panel-store';

export function NewPositionProgress() {
  const navigate = useNavigate();
  const { getVisibleSteps, getStepStatus, isApproved, completedSteps } = useNewPosition();
  const { isChatOpen, toggleChat } = useChatPanelStore();

  const approvalSteps = getVisibleSteps();

  const stepsLeft = approvalSteps.filter((s) => {
    const st = getStepStatus(s.id);
    return st === 'in-progress' || st === 'upcoming';
  }).length;

  const rawName = localStorage.getItem('userName') ?? 'there';
  const userName = rawName.split(' ')[0];

  return (
    <div className="h-full flex flex-col bg-[#F8F7FF]">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/notifications')}
            className="mb-2 -ml-2 h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Back
          </Button>
          <h2 className="text-base font-medium tracking-tight text-gray-900">Position Approval</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Review and approve</p>
        </div>
        {!isChatOpen && (
          <button
            onClick={toggleChat}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors shrink-0"
            title="Open chat"
          >
            <MessageSquareText className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {approvalSteps.map((step) => {
          const status = getStepStatus(step.id);
          const isRejected = step.id === 1 && isApproved === false && completedSteps.includes(1);
          return (
            <Card
              key={step.id}
              className={`
                rounded-card transition-all duration-300
                ${status === 'completed' && !isRejected ? 'p-4 bg-white border-2 border-emerald-500 hover:shadow-md' : ''}
                ${status === 'completed' && isRejected ? 'p-4 bg-white border-2 border-red-500' : ''}
                ${status === 'in-progress' ? 'p-4 bg-white border-2 border-primary shadow-sm hover:shadow-md' : ''}
                ${status === 'upcoming' ? 'p-4 bg-white border border-border opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm
                  ${status === 'completed' && !isRejected ? 'bg-emerald-500 text-white' : ''}
                  ${status === 'completed' && isRejected ? 'bg-red-500 text-white' : ''}
                  ${status === 'in-progress' ? 'bg-primary text-white' : ''}
                  ${status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
                `}>
                  {status === 'completed' ? <Check className="h-4 w-4" /> : step.id + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm
                    ${status === 'completed' && !isRejected ? 'text-gray-700' : ''}
                    ${status === 'completed' && isRejected ? 'text-red-500' : ''}
                    ${status === 'in-progress' ? 'text-gray-900' : ''}
                    ${status === 'upcoming' ? 'text-gray-400' : ''}
                  `}>
                    {step.title}
                  </h3>
                  <p className={`text-xs mt-0.5
                    ${status === 'completed' && !isRejected ? 'text-emerald-600' : ''}
                    ${status === 'completed' && isRejected ? 'text-red-400' : ''}
                    ${status === 'in-progress' ? 'text-primary/70' : ''}
                    ${status === 'upcoming' ? 'text-muted-foreground' : ''}
                  `}>
                    {status === 'completed' && !isRejected && 'Completed'}
                    {status === 'completed' && isRejected && 'Rejected'}
                    {status === 'in-progress' && 'In Progress...'}
                    {status === 'upcoming' && 'Upcoming'}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Steps left pill */}
      <div className="p-4">
        {stepsLeft > 0 ? (
          <div className="flex items-center gap-3 bg-white border border-border rounded-full px-4 py-2.5 shadow-sm">
            <span className="text-xs text-gray-600 font-medium flex-1">
              Hi {userName}, Just{' '}
              <span key={stepsLeft} className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold mx-0.5 animate-in fade-in duration-300">
                {stepsLeft}
              </span>{' '}
              steps left
            </span>
            <img src={mascotImg} alt="" className="h-7 w-auto object-contain" />
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2.5">
            <span className="text-xs text-emerald-700 font-medium flex-1">All done!</span>
            <img src={mascotImg} alt="" className="h-7 w-auto object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
