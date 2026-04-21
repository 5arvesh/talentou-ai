import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useTAPlanReview } from '@/context/TAPlanReviewContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const sections = [
  { id: 1 as const, title: 'Company USP', number: 1 },
  { id: 2 as const, title: 'Talent Pool', number: 2 },
];

export function ReviewProgressSidebar() {
  const { currentSection, setCurrentSection, sectionViewed, isAligned } = useTAPlanReview();

  const getSectionStatus = (sectionId: 1 | 2) => {
    if (currentSection === sectionId) return 'active';
    if (sectionId === 1 && sectionViewed.companyUSP) return 'viewed';
    if (sectionId === 2 && sectionViewed.talentPool) return 'viewed';
    return 'pending';
  };

  const handleSectionClick = (sectionId: 1 | 2) => {
    setCurrentSection(sectionId);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#7800D3]/5 via-background to-background border-r">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-[#7800D3]/10 to-transparent">
        <h2 className="text-xl font-bold text-foreground mb-1">TA Plan Review</h2>
        <p className="text-sm text-muted-foreground">Review and provide feedback</p>
      </div>

      {/* Sections */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-4">
          {sections.map((section) => {
            const status = getSectionStatus(section.id);
            const isActive = status === 'active';
            const isViewed = status === 'viewed';
            const isPending = status === 'pending';

            return (
              <Card
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`
                  p-4 cursor-pointer transition-all duration-200 border-2
                  ${isActive ? 'border-[#7800d3] bg-[#7800d3]/5 shadow-md' : ''}
                  ${isViewed ? 'border-[#4ead3b] bg-[#4ead3b]/5' : ''}
                  ${isPending ? 'border-black bg-white dark:border-white dark:bg-gray-900' : ''}
                  hover:shadow-lg
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Number/Check icon */}
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      font-bold text-lg transition-all
                      ${isActive ? 'bg-[#7800d3] text-white' : ''}
                      ${isViewed ? 'bg-[#4ead3b] text-white' : ''}
                      ${isPending ? 'bg-black text-white dark:bg-white dark:text-black' : ''}
                    `}
                  >
                    {isViewed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      section.number
                    )}
                  </div>

                  {/* Section title */}
                  <div className="flex-1">
                    <span
                      className={`
                        font-semibold text-sm
                        ${isActive ? 'text-[#7800d3]' : ''}
                        ${isViewed ? 'text-[#4ead3b]' : ''}
                        ${isPending ? 'text-black dark:text-white' : ''}
                      `}
                    >
                      {section.title}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
