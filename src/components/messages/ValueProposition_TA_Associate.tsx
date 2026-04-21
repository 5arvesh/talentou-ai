import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  TrendingUp,
  DollarSign,
  Award,
  ArrowLeft,
  MessageCircle,
  Database,
  Share2,
  LineChart,
  Gift,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAlignment } from "@/context/AlignmentContext";

export function ValueProposition_TA_Associate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(false);
  const [isTaTeam, setIsTaTeam] = useState<boolean>(false);
  const { setValuePropositionAligned, setCollateralsAligned } = useAlignment();

  const handleAlignClick = () => {
    setIsAligned(true);
    toast({
      title: "Alignment Successful!",
      description: "Value proposition has been marked as aligned.",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/ta-associate-plan");
      setValuePropositionAligned(true);
      setCollateralsAligned(true);
    }, 1000);
  };

  const handleSuggestFeedbackClick = () => {
    // Navigate to feedback page or show feedback modal
    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been recorded.",
      duration: 3000,
    });
  };

  let role = localStorage.getItem("userRole");
  useEffect(() => {
    if (role === "ta-associate") {
      setIsTaTeam(true);
    } else {
      setIsTaTeam(false);
    }
  }, [role]);

  return (
    <div className="px-8 mt-6 h-screen flex flex-col">
      {/* Custom Tabs */}
      <div className="mt-4">
        <Tabs value="company-usp" className="w-full">
          <TabsList className="w-full bg-transparent space-between gap-4">
            <TabsTrigger
              value="company-usp"
              className="flex justify-start gap-4 py-3 px-4 border-2 data-[state=active]:border-brand-500 data-[state=inactive]:border-grey-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-grey-600 dark:data-[state=active]:text-brand-400 transition-all text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-1/4 focus:outline-none focus:ring-0"
            >
              <MessageCircle size={18} />
              Company USP
            </TabsTrigger>
            <TabsTrigger
              value="talent-pool"
              className="flex justify-start gap-4 py-3 px-4 border-2 data-[state=active]:border-brand-500 data-[state=inactive]:border-grey-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-grey-600 dark:data-[state=active]:text-brand-400 transition-all text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-1/4 focus:outline-none focus:ring-0"
            >
              <Database size={18} />
              Talent Pool
            </TabsTrigger>
            <TabsTrigger
              value="recruitment-channel"
              className="flex justify-start gap-4 py-3 px-4 border-2 data-[state=active]:border-brand-500 data-[state=inactive]:border-grey-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-grey-600 dark:data-[state=active]:text-brand-400 transition-all text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-1/4 focus:outline-none focus:ring-0"
            >
              <Share2 size={18} />
              Recruitment Channel
            </TabsTrigger>
            <TabsTrigger
              value="success-metrics"
              className="flex justify-start gap-4 py-3 px-4 border-2 data-[state=active]:border-brand-500 data-[state=inactive]:border-grey-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-grey-600 dark:data-[state=active]:text-brand-400 transition-all text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-1/4 focus:outline-none focus:ring-0"
            >
              <LineChart size={18} />
              Success Metrics
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Back button */}
      {isTaTeam ? (
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/ta-associate-plan")}
            className="px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
                  <ArrowLeft size={18} className="mr-2" /> Company USP
          </Button>
        </div>
      ) : (
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/sales-plan")}
            className="px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
                  <ArrowLeft size={18} className="mr-2" /> Company USP
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 mt-[120px]">
        <div className="grid grid-cols-4 gap-6 max-w-full mx-auto">
          {/* Elevator Pitch Card */}
          <Card className="min-h-64">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <Target
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
                Elevator Pitch
              </CardTitle>
            </CardHeader>
            <CardContent>
             <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>At Ignitho, you’ll work at the intersection of innovation and
              impact, building cutting-edge digital products for global
              enterprises.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>
                    With the agility of a startup and the stability of a growth-stage
              company, we offer a highly collaborative and entrepreneurial
              environment where teams work closely with senior leaders and
              clients.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>
                     You’ll have the freedom to lead, the opportunity to upskill
              rapidly, and the ability to see your work make a real difference.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>If you’re seeking purpose, growth, and a future-proof tech career,
              this is where it begins.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Growth & Development Card */}
          <Card className="min-h-64">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                <TrendingUp
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
                Career Growth & Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>Offers client-facing roles with early ownership.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>
                    Enables rapid career growth through fast-track promotions.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>
                    Acts as a launchpad for professionals aiming to grow into
                    leadership roles.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>Provides global exposure across US and Europe.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation & Benefits Card */}
          <Card className="min-h-64">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Gift
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
                Compensation & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>
                    Hybrid roles available with flexible work timings.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">
                    •
                  </span>
                  <span>Performance based bonus.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Awards and Brand Recognition Card */}
          <Card className="min-h-64">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                <Award
                  size={24}
                  className="text-orange-600 dark:text-orange-400"
                />
                Awards & Brand Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">
                    •
                  </span>
                  <span>
                    Awarded the great place to work certification in 2025.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">
                    •
                  </span>
                  <span>Renowned for their delivery excellence.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Centered Action Buttons */}

        {isTaTeam ? (
          <div className="flex justify-center gap-4 mt-[60px] pb-8">
               {" "}
            <Button
              variant="outline"
              onClick={handleSuggestFeedbackClick}
              className="border-brand-500 text-brand-600 dark:border-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20"
            >
                    Suggest Feedback    {" "}
            </Button>
               {" "}
            <Button
              onClick={handleAlignClick}
              className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-800 text-white"
            >
                    {isAligned ? "Continue" : "I'm Aligned"}   {" "}
            </Button>
             {" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
