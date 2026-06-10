import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useTAPlanReview } from '@/context/TAPlanReviewContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import mascotImg from '@/assets/talentou-mascot-new.png';

const sections = [
  { id: 1 as const, title: 'Company USP', number: 1 },
  { id: 2 as const, title: 'Talent Pool', number: 2 },
];

export function ReviewProgressSidebar() {
  const { currentSection, setCurrentSection, sectionViewed } = useTAPlanReview();

  const getSectionStatus = (sectionId: 1 | 2) => {
    if (currentSection === sectionId) return 'active';
    if (sectionId === 1 && sectionViewed.companyUSP) return 'viewed';
    if (sectionId === 2 && sectionViewed.talentPool) return 'viewed';
    return 'pending';
  };

  const rawName = localStorage.getItem('userName') ?? 'there';
  const userName = rawName.split(' ')[0];
  const viewedCount = (sectionViewed.companyUSP ? 1 : 0) + (sectionViewed.talentPool ? 1 : 0);
  const stepsLeft = sections.length - viewedCount;

  return (
    <div className="h-full flex flex-col bg-[#F8F7FF]">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium tracking-tight text-gray-900">TA Plan Review</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Review and provide feedback</p>
        </div>
      </div>

      {/* Sections */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-3">
          {sections.map((section) => {
            const status = getSectionStatus(section.id);
            const isActive = status === 'active';
            const isViewed = status === 'viewed';

            return (
              <Card
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`
                  rounded-card p-4 cursor-pointer transition-all duration-300
                  ${isActive ? 'bg-white border-2 border-primary shadow-sm hover:shadow-md' : ''}
                  ${isViewed ? 'bg-white border-2 border-emerald-500 hover:shadow-md' : ''}
                  ${!isActive && !isViewed ? 'bg-white border border-border opacity-50' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center shrink-0
                      font-bold text-base transition-all
                      ${isActive ? 'bg-primary text-white' : ''}
                      ${isViewed ? 'bg-emerald-500 text-white' : ''}
                      ${!isActive && !isViewed ? 'bg-muted text-muted-foreground' : ''}
                    `}
                  >
                    {isViewed ? <Check className="h-4 w-4" /> : section.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`font-semibold text-sm
                      ${isActive ? 'text-gray-900' : ''}
                      ${isViewed ? 'text-gray-700' : ''}
                      ${!isActive && !isViewed ? 'text-gray-400' : ''}
                    `}>
                      {section.title}
                    </span>
                    <p className={`text-xs mt-0.5
                      ${isActive ? 'text-primary/70' : ''}
                      ${isViewed ? 'text-emerald-600' : ''}
                      ${!isActive && !isViewed ? 'text-muted-foreground' : ''}
                    `}>
                      {isActive && 'In Progress...'}
                      {isViewed && 'Reviewed'}
                      {!isActive && !isViewed && 'Upcoming'}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

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
            <span className="text-xs text-emerald-700 font-medium flex-1">Review complete!</span>
            <img src={mascotImg} alt="" className="h-7 w-auto object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
