import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { useTAPlanReview } from '@/context/TAPlanReviewContext';
import { toast } from 'sonner';

export function ReviewDetailsPanel() {
  const navigate = useNavigate();
  const { 
    currentSection, 
    setCurrentSection,
    sectionViewed,
    markSectionAsViewed,
    addFeedback,
    setIsAligned 
  } = useTAPlanReview();

  const [companyUSPFeedback, setCompanyUSPFeedback] = useState('');
  const [talentPoolFeedback, setTalentPoolFeedback] = useState('');

  const handleSubmitCompanyUSPFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyUSPFeedback.trim()) {
      addFeedback('companyUSP', companyUSPFeedback);
      setCompanyUSPFeedback('');
      toast.success('Company USP feedback submitted!');
    }
  };

  const handleSubmitTalentPoolFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (talentPoolFeedback.trim()) {
      addFeedback('talentPool', talentPoolFeedback);
      setTalentPoolFeedback('');
      toast.success('Talent Pool feedback submitted!');
    }
  };

  const handleViewTalentPool = () => {
    markSectionAsViewed('companyUSP');
    setCurrentSection(2);
    toast.success('Company USP section reviewed!');
  };

  const handleAlign = () => {
    if (!sectionViewed.companyUSP) {
      toast.error('Please review Company USP section first');
      return;
    }
    
    markSectionAsViewed('talentPool');
    setIsAligned(true);
    toast.success('Successfully aligned with TA Plan!');
    
    setTimeout(() => {
      navigate('/ta-associate/jobs');
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-[#7800d3]">TA Plan Review</h2>
        <p className="text-sm text-muted-foreground">Review the plan and provide feedback</p>
      </div>

      {/* Main Content with Internal Scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Single Accordion - only one section can be open at a time */}
          <Accordion 
            type="single" 
            collapsible 
            value={currentSection === 1 ? 'company-usp' : 'talent-pool'}
            onValueChange={(value) => {
              if (value === 'company-usp') setCurrentSection(1);
              else if (value === 'talent-pool') setCurrentSection(2);
            }}
            className="space-y-4"
          >
            {/* ====== SECTION 1: COMPANY USP ACCORDION ====== */}
            <AccordionItem
              value="company-usp"
              className="border-2 border-[#e5c8fa] rounded-lg bg-[#faf5ff] dark:bg-[#7800d3]/10"
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-semibold text-[#7800d3] text-lg">
                    1. Company USP & Value Propositions
                  </span>
                  {sectionViewed.companyUSP && (
                    <Badge className="bg-green-500 text-white">Reviewed</Badge>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4">
                {/* Just the Elevator Pitch - NO nested accordion */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#7800d3] mb-3 text-base">
                    Elevator Pitch
                  </h4>
                  <div className="bg-background rounded-lg p-4 border-2 border-gray-200">
                    <p className="text-sm text-foreground leading-relaxed">
                      We offer a compelling work environment that prioritizes employee growth and wellbeing. Our flexible work arrangements accommodate diverse lifestyles, while our comprehensive benefits package demonstrates our commitment to your overall welfare. Join us to be part of a culture that values innovation, collaboration, and continuous learning, where your contributions directly impact our success and growth.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">605/1000 characters</p>
                  </div>
                </div>

                {/* === FEEDBACK TEXT BOX === */}
                <Card className="border-2 border-[#7800d3]/30 bg-purple-50/50 dark:bg-[#7800d3]/5 mb-4">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-[#7800d3] mb-3">
                      Your Feedback (Optional)
                    </h4>
                    <form onSubmit={handleSubmitCompanyUSPFeedback}>
                      <Textarea
                        value={companyUSPFeedback}
                        onChange={(e) => setCompanyUSPFeedback(e.target.value)}
                        placeholder="Share your thoughts or suggestions about the Company USP..."
                        className="mb-3 min-h-[100px]"
                        rows={4}
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20"
                        disabled={!companyUSPFeedback.trim()}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* === CTA BUTTON === */}
                <div className="border-t-2 pt-4">
                  <Button
                    onClick={handleViewTalentPool}
                    className="w-full h-12 bg-[#7800d3] hover:bg-[#7800d3]/90 text-white font-semibold text-base"
                  >
                    View Talent Pool
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ====== SECTION 2: TALENT POOL ACCORDION ====== */}
            <AccordionItem
              value="talent-pool"
              className={`
                border-2 rounded-lg
                ${sectionViewed.talentPool 
                  ? 'border-[#4ead3b] bg-green-50 dark:bg-green-900/10' 
                  : 'border-[#e5c8fa] bg-[#faf5ff] dark:bg-[#7800d3]/10'
                }
              `}
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className={`
                    font-semibold text-lg
                    ${sectionViewed.talentPool 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-[#7800d3]'
                    }
                  `}>
                    2. Talent Pool Criteria
                  </span>
                  {sectionViewed.talentPool && (
                    <Badge className="bg-green-500 text-white">Reviewed</Badge>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4">
                {/* Nested accordion for each field - all open by default */}
                <Accordion 
                  type="multiple" 
                  defaultValue={['work-arrangement', 'hiring-region', 'target-industries', 'educational-institutions']}
                  className="space-y-3"
                >
                  {/* Work Arrangement */}
                  <AccordionItem value="work-arrangement" className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <h4 className="font-semibold text-[#7800d3] text-base">
                        Work Arrangement
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="flex gap-3 flex-wrap">
                        <div className="px-4 py-2 border-2 rounded-lg bg-background text-muted-foreground">
                          Remote
                        </div>
                        <div className="px-4 py-2 border-2 border-[#7800d3] rounded-lg bg-[#7800d3] text-white font-semibold">
                          On-site
                        </div>
                        <div className="px-4 py-2 border-2 border-[#7800d3] rounded-lg bg-[#7800d3] text-white font-semibold">
                          Hybrid
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Hiring Region */}
                  <AccordionItem value="hiring-region" className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <h4 className="font-semibold text-[#7800d3] text-base">
                        Hiring Region
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-[#7800d3] text-white px-4 py-2 text-sm">
                          Chennai
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Cities where we're actively hiring
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Target Industries */}
                  <AccordionItem value="target-industries" className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <h4 className="font-semibold text-[#7800d3] text-base">
                        Target Industries
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-[#7800d3] text-white px-4 py-2 text-sm">
                          IT
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Industries we target for talent acquisition
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Educational Institutions */}
                  <AccordionItem value="educational-institutions" className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <h4 className="font-semibold text-[#7800d3] text-base">
                        Educational Institutions
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-[#7800d3] text-white px-4 py-2 text-sm">
                          XIME Chennai
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Target educational backgrounds
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* === FEEDBACK TEXT BOX === */}
                <Card className="border-2 border-[#4ead3b]/50 bg-green-50/50 dark:bg-green-900/5 mb-4">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">
                      Your Feedback (Optional)
                    </h4>
                    <form onSubmit={handleSubmitTalentPoolFeedback}>
                      <Textarea
                        value={talentPoolFeedback}
                        onChange={(e) => setTalentPoolFeedback(e.target.value)}
                        placeholder="Share your thoughts or suggestions about the Talent Pool criteria..."
                        className="mb-3 min-h-[100px]"
                        rows={4}
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
                        disabled={!talentPoolFeedback.trim()}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* === CTA BUTTON === */}
                <div className="border-t-2 pt-4">
                  <Button
                    onClick={handleAlign}
                    className="w-full h-12 bg-[#4ead3b] hover:bg-[#4ead3b]/90 text-black font-semibold text-base"
                    disabled={!sectionViewed.companyUSP}
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Align to TA Plan
                  </Button>
                  {!sectionViewed.companyUSP && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Please review Company USP section first
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
