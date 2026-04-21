import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, Target, 
  Check, Clock, MessageSquare, ChevronLeft, ChevronRight,
  ArrowLeft, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SectionStatus {
  aligned: boolean;
  feedback: string;
}

const mockTAPlanData = {
  companyUSP: {
    elevatorPitch: "Ignitho is a leading technology consulting firm specializing in AI-driven solutions for enterprise clients. We offer competitive compensation, flexible work arrangements, and a culture of innovation that empowers engineers to work on cutting-edge projects with Fortune 500 companies.",
    careerGrowth: "Fast-track promotions, mentorship programs, learning budgets up to $5000/year",
    compensation: "Above market rates, equity options, performance bonuses",
    awards: "Great Place to Work 2024, Top 50 Tech Companies to Watch"
  },
  talentPool: {
    workArrangements: ["Remote", "Hybrid", "On-site"],
    geographicPreferences: ["United States", "Canada", "United Kingdom", "India"],
    targetIndustries: ["Technology", "Finance", "Healthcare", "E-commerce"],
    targetCompanies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
    educationalInstitutions: ["MIT", "Stanford", "Carnegie Mellon", "IIT"],
    keySkills: ["React", "Node.js", "Python", "AWS", "Machine Learning", "TypeScript"]
  }
};

const sections = ["companyUSP", "talentPool"] as const;
type SectionKey = typeof sections[number];

export function TAPlanReviewPage() {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sectionStatus, setSectionStatus] = useState<Record<string, SectionStatus>>({
    companyUSP: { aligned: false, feedback: "" },
    talentPool: { aligned: false, feedback: "" }
  });

  const alignedCount = Object.values(sectionStatus).filter(s => s.aligned).length;
  const totalSections = 2;
  const progressPercentage = (alignedCount / totalSections) * 100;

  const goToNextCard = () => {
    if (currentCardIndex < sections.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const handleAlignSection = (section: string) => {
    setSectionStatus(prev => ({
      ...prev,
      [section]: { ...prev[section], aligned: true }
    }));
    toast({
      title: "Section Aligned",
      description: `You've aligned with the ${getSectionTitle(section)} section.`
    });
    // Auto-advance to next card
    if (currentCardIndex < sections.length - 1) {
      setTimeout(() => goToNextCard(), 500);
    }
  };

  const handleFeedbackChange = (section: string, feedback: string) => {
    setSectionStatus(prev => ({
      ...prev,
      [section]: { ...prev[section], feedback }
    }));
  };

  const handleSubmitFeedback = (section: string) => {
    if (!sectionStatus[section].feedback.trim()) {
      toast({
        title: "No Feedback",
        description: "Please enter feedback before submitting.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Feedback Submitted",
      description: `Your feedback for ${getSectionTitle(section)} has been sent to the TA Leader.`
    });
    handleFeedbackChange(section, "");
  };

  const handleAlignToFullPlan = () => {
    // Align all remaining sections
    const updatedStatus = { ...sectionStatus };
    sections.forEach(section => {
      updatedStatus[section] = { ...updatedStatus[section], aligned: true };
    });
    setSectionStatus(updatedStatus);
    
    toast({
      title: "Aligned to TA Plan",
      description: "You've successfully aligned with the complete TA Plan!"
    });
    navigate("/ta-associate/jobs");
  };

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      companyUSP: "Company USP & Value Proposition",
      talentPool: "Talent Pool Criteria"
    };
    return titles[section] || section;
  };

  const getSectionIcon = (section: string) => {
    const icons: Record<string, React.ReactNode> = {
      companyUSP: <Building2 className="h-5 w-5" />,
      talentPool: <Target className="h-5 w-5" />
    };
    return icons[section];
  };

  const renderSectionHeader = (section: string) => {
    const status = sectionStatus[section];

    return (
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            status.aligned 
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" 
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          )}>
            {getSectionIcon(section)}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{getSectionTitle(section)}</h3>
            <p className="text-xs text-muted-foreground">
              {status.aligned ? "Aligned" : "Pending Review"}
            </p>
          </div>
        </div>
        <Badge variant={status.aligned ? "default" : "secondary"} className={cn(
          status.aligned && "bg-emerald-500 hover:bg-emerald-600"
        )}>
          {status.aligned ? <><Check className="h-3 w-3 mr-1" /> Aligned</> : <><Clock className="h-3 w-3 mr-1" /> Pending</>}
        </Badge>
      </div>
    );
  };

  const renderFeedbackArea = (section: string) => (
    <div className="mt-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="h-4 w-4 text-talentou-primary" />
        <span className="text-sm font-medium text-foreground">Your Feedback</span>
      </div>
      <Textarea
        placeholder="Share your thoughts, suggestions, or concerns about this section..."
        value={sectionStatus[section].feedback}
        onChange={(e) => handleFeedbackChange(section, e.target.value)}
        className="min-h-[80px] mb-3 bg-white dark:bg-slate-800 shadow-sm"
      />
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleSubmitFeedback(section)}
          disabled={!sectionStatus[section].feedback.trim()}
        >
          <Send className="h-4 w-4 mr-1" />
          Submit Feedback
        </Button>
        <Button 
          size="sm"
          onClick={() => handleAlignSection(section)}
          disabled={sectionStatus[section].aligned}
          className={cn(
            "bg-emerald-500 hover:bg-emerald-600 text-white",
            sectionStatus[section].aligned && "bg-emerald-400 hover:bg-emerald-400"
          )}
        >
          <Check className="h-4 w-4 mr-1" />
          {sectionStatus[section].aligned ? "Aligned" : "Align Section"}
        </Button>
      </div>
    </div>
  );

  const renderCompanyUSPCard = () => (
    <Card className="overflow-hidden border-talentou-primary/10 shadow-sm">
      {renderSectionHeader("companyUSP")}
      <CardContent className="pt-0 pb-4 px-4">
        <div className="bg-talentou-primary-light/30 rounded-lg p-4 border border-talentou-primary/10">
          <h4 className="font-medium text-foreground mb-2">Elevator Pitch</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{mockTAPlanData.companyUSP.elevatorPitch}</p>
        </div>
        {renderFeedbackArea("companyUSP")}
      </CardContent>
    </Card>
  );

  const renderTalentPoolCard = () => (
    <Card className="overflow-hidden border-talentou-primary/10 shadow-sm">
      {renderSectionHeader("talentPool")}
      <CardContent className="pt-0 pb-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-talentou-primary-light/30 rounded-lg p-4 border border-talentou-primary/10">
            <h4 className="font-medium text-foreground mb-3 text-sm">Work Arrangements</h4>
            <ul className="space-y-1.5">
              {mockTAPlanData.talentPool.workArrangements.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-talentou-primary/60"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-talentou-primary-light/30 rounded-lg p-4 border border-talentou-primary/10">
            <h4 className="font-medium text-foreground mb-3 text-sm">Geographic Preferences</h4>
            <ul className="space-y-1.5">
              {mockTAPlanData.talentPool.geographicPreferences.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-talentou-primary/60"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-talentou-primary-light/30 rounded-lg p-4 border border-talentou-primary/10">
            <h4 className="font-medium text-foreground mb-3 text-sm">Target Industries</h4>
            <ul className="space-y-1.5">
              {mockTAPlanData.talentPool.targetIndustries.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-talentou-primary/60"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-talentou-primary-light/30 rounded-lg p-4 border border-talentou-primary/10">
            <h4 className="font-medium text-foreground mb-3 text-sm">Educational Institutions</h4>
            <ul className="space-y-1.5">
              {mockTAPlanData.talentPool.educationalInstitutions.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-talentou-primary/60"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {renderFeedbackArea("talentPool")}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-talentou-primary/10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/ta-associate")} className="hover:bg-talentou-primary-light">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">TA Plan Review</h1>
                <p className="text-sm text-muted-foreground">Senior Frontend Developer • Ignitho Technologies</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-32">
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{alignedCount}/{totalSections} Aligned</span>
              </div>
              <Button onClick={handleAlignToFullPlan} className="bg-talentou-primary hover:bg-talentou-primary/90">
                Align to Full Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Carousel View */}
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto relative">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={goToPrevCard}
              disabled={currentCardIndex === 0}
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center transition-all",
                currentCardIndex === 0 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer shadow-sm"
              )}
            >
              <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>

            {/* Card Container */}
            <div className="flex-1 overflow-hidden">
              <div 
                className="transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
              >
                <div className="flex">
                  <div className="w-full flex-shrink-0">
                    {renderCompanyUSPCard()}
                  </div>
                  <div className="w-full flex-shrink-0">
                    {renderTalentPoolCard()}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNextCard}
              disabled={currentCardIndex === sections.length - 1}
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center transition-all",
                currentCardIndex === sections.length - 1 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer shadow-sm"
              )}
            >
              <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => setCurrentCardIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  index === currentCardIndex 
                    ? "bg-talentou-primary" 
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
