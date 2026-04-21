
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Target, TrendingUp, DollarSign, Award } from "lucide-react";
import { TabNav } from "../navigation/TabNav";
import { useAlignment } from "@/context/AlignmentContext";
import { useToast } from "@/hooks/use-toast";

export function MessagePlanChat_TA_Associate() {
  const navigate = useNavigate();
  const { setValuePropositionAligned, isValuePropositionAligned } = useAlignment();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(isValuePropositionAligned);
  const [buttonText, setButtonText] = useState(isValuePropositionAligned ? "Continue" : "I'm Aligned");

  const handleAlignClick = () => {
    if (!isAligned) {
      setValuePropositionAligned(true);
      setIsAligned(true);
      setButtonText("Continue");

      toast({
        title: "Alignment Successful!",
        description: "Value proposition has been marked as aligned.",
        duration: 3000,
      });

      // Navigate back to the main plan screen
      navigate("/ta-associate-plan");
    } else {
      // Navigate to the next step when already aligned
      navigate("/ta-associate-plan/talent-pool");
    }
  };

  const handleSuggestFeedbackClick = () => {
    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been recorded.",
      duration: 3000,
    });
  };

  const handleNavigationClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Tab Navigation */}
      <div className="px-8 pt-6">
        <TabNav />
      </div>

      {/* Cards Section - 80px gap from tabs */}
      <div className="px-8 mt-20 flex-1 flex flex-col">
        {/* 4 USP Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Elevator Pitch Card */}
          <Card className="h-44">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <Target size={16} className="text-purple-600 dark:text-purple-400" />
                Elevator Pitch
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-1">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  <span>Experience the agility of a startup with the stability of a growth-stage company</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  <span>Thrive in a collaborative and entrepreneurial environment</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  <span>Gain the freedom to lead and take ownership of your work</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Growth & Development Card */}
          <Card className="h-44">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
                Career Growth & Development
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-1">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                  <span>Offers client-facing roles with early ownership</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                  <span>Enables rapid career growth through fast-track promotions</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                  <span>Provides global exposure across US and Europe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation & Benefits Card */}
          <Card className="h-44">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <DollarSign size={16} className="text-blue-600 dark:text-blue-400" />
                Compensation & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-1">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Hybrid roles available with flexible work timings</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Performance based bonus</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Health care Insurance coverage</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Awards and Brand Recognition Card */}
          <Card className="h-44">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                <Award size={16} className="text-orange-600 dark:text-orange-400" />
                Awards and Brand Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-1">
                  <span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
                  <span>Awarded the great place to work certification in 2025</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
                  <span>Renowned for their delivery excellence</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Cards Section */}
        <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
          {/* Left Card - Company USP Plan */}
          <Card className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Company USP Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-3 flex-1">
                This section highlights the heart of who we are our mission, our vision, and the culture that drives us. It gives candidates a clear sense of what we stand for, what we're working toward, and what it feels like to be part of our journey. From our inclusive and collaborative work environment to the awards and industry recognition we've earned, this message is designed to inspire. It helps the TA team confidently pitch our story - why we exist, how we make a difference, and why this is a great place to build a meaningful career. In this section, you can also suggest feedback or align with existing messaging based on what you observe.
              </p>
              <div className="flex gap-3 mt-auto">
                <Button 
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => navigate("/ta-associate-plan/value-proposition")}
                >
                  <Eye size={16} />
                  View
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleAlignClick}
                >
                  {buttonText}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Card - Collaterals */}
          <Card className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Collaterals
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-3 flex-1">
                This section includes decks, documents and other materials that reinforce your message and help drive consistent, impactful communication. These assets provide visual and narrative support to your employer value proposition, enabling TA teams to confidently present your organization to candidates, address their motivations and concerns, and accelerate decision-making through well-crafted, purpose-driven content.
              </p>
              <Button 
                className="w-fit flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white mt-auto disabled:bg-gray-600"
                disabled={true}
                onClick={() => navigate("/ta-associate-plan/collaterals")}
              >
                <Eye size={16} />
                View
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 py-6">
          <Button
            variant="outline"
            onClick={handleSuggestFeedbackClick}
            className="border-brand-500 text-brand-600 dark:border-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20"
          >
            Suggest Feedback
          </Button>

          <Button
            onClick={handleAlignClick}
            className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-800 text-white"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
