import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { useTAPlanReview } from '@/context/TAPlanReviewContext';
import { toast } from 'sonner';

export function ReviewDetailsPanel() {
  const navigate = useNavigate();
  const {
    currentSection,
    sectionViewed,
    markSectionAsViewed,
    addFeedback,
    setIsAligned,
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
    setTimeout(() => navigate('/ta-associate/jobs'), 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#F8F7FF]">
      {/* Header */}
      <div className="px-5 py-4">
        <h2 className="text-base font-medium tracking-tight text-gray-900">TA Plan Review</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Review the plan and provide feedback</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {/* Completed section banners */}
          {sectionViewed.companyUSP && currentSection !== 1 && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="text-sm font-semibold text-emerald-700">Company USP</span>
              <span className="ml-auto text-xs text-emerald-600 font-medium">Reviewed</span>
            </div>
          )}
          {sectionViewed.talentPool && currentSection !== 2 && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="text-sm font-semibold text-emerald-700">Talent Pool</span>
              <span className="ml-auto text-xs text-emerald-600 font-medium">Reviewed</span>
            </div>
          )}

          {/* Section 1: Company USP */}
          {currentSection === 1 && (
            <div className="rounded-2xl bg-white border border-border p-6 shadow-sm space-y-5">
              <h3 className="text-base font-medium tracking-tight text-gray-800">Company USP & Value Propositions</h3>

              {sectionViewed.companyUSP && (
                <Badge className="bg-emerald-500 text-white">Reviewed</Badge>
              )}

              {/* Elevator Pitch */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Elevator Pitch</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-border">
                  <p className="text-sm text-foreground leading-relaxed">
                    We offer a compelling work environment that prioritizes employee growth and wellbeing. Our flexible work arrangements accommodate diverse lifestyles, while our comprehensive benefits package demonstrates our commitment to your overall welfare. Join us to be part of a culture that values innovation, collaboration, and continuous learning, where your contributions directly impact our success and growth.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">605/1000 characters</p>
                </div>
              </div>

              {/* Feedback */}
              <Card className="border border-primary/20 bg-white">
                <CardContent className="pt-5">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Your Feedback (Optional)</h4>
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
                      className="w-full"
                      disabled={!companyUSPFeedback.trim()}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="flex justify-center">
                <Button
                  onClick={handleViewTalentPool}
                  className="px-8 h-11 rounded-full bg-gradient-to-r from-[#7800D3] to-[#5600ad] hover:from-[#6a00bb] hover:to-[#5000a0] text-white font-semibold text-sm border-0"
                >
                  View Talent Pool
                </Button>
              </div>
            </div>
          )}

          {/* Section 2: Talent Pool */}
          {currentSection === 2 && (
            <div className="rounded-2xl bg-white border border-border p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium tracking-tight text-gray-800">Talent Pool Criteria</h3>
                {sectionViewed.talentPool && (
                  <Badge className="bg-emerald-500 text-white">Reviewed</Badge>
                )}
              </div>

              {/* Work Arrangement */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Work Arrangement</h4>
                <div className="flex gap-3 flex-wrap">
                  <div className="px-4 py-2 border-2 rounded-lg bg-gray-50 text-muted-foreground text-sm">Remote</div>
                  <div className="px-4 py-2 border-2 border-primary rounded-lg bg-primary text-white text-sm font-semibold">On-site</div>
                  <div className="px-4 py-2 border-2 border-primary rounded-lg bg-primary text-white text-sm font-semibold">Hybrid</div>
                </div>
              </div>

              {/* Hiring Region */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Hiring Region</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-white px-4 py-2 text-sm">Chennai</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Cities where we're actively hiring</p>
              </div>

              {/* Target Industries */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Industries</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-white px-4 py-2 text-sm">IT</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Industries we target for talent acquisition</p>
              </div>

              {/* Educational Institutions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Educational Institutions</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-white px-4 py-2 text-sm">XIME Chennai</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Target educational backgrounds</p>
              </div>

              {/* Feedback */}
              <Card className="border border-primary/20 bg-white">
                <CardContent className="pt-5">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Your Feedback (Optional)</h4>
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
                      className="w-full"
                      disabled={!talentPoolFeedback.trim()}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={handleAlign}
                  disabled={!sectionViewed.companyUSP}
                  className="px-8 h-11 rounded-full bg-gradient-to-r from-[#7800D3] to-[#5600ad] hover:from-[#6a00bb] hover:to-[#5000a0] text-white font-semibold text-sm border-0 disabled:opacity-40"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Align to TA Plan
                </Button>
                {!sectionViewed.companyUSP && (
                  <p className="text-xs text-center text-muted-foreground">
                    Please review Company USP section first
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
