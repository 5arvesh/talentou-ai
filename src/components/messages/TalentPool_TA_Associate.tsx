import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building,
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
  School,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TabNav } from "../navigation/TabNav";
import { useToast } from "@/hooks/use-toast";
import { useAlignment } from "@/context/AlignmentContext";

export function TalentPool_TA_Associate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(false);
  const { setMarketCriteriaAligned } = useAlignment();
  const [isTaTeam, setIsTaTeam] = useState<boolean>(false);

  const handleAlignClick = () => {
    setIsAligned(true);
    toast({
      title: "Alignment Successful!",
      description: "Talent pool has been marked as aligned.",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/ta-associate-plan");
      setMarketCriteriaAligned(true);
    }, 1000);
  };

  const handleSuggestFeedbackClick = () => {
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
      <TabNav />

      {/* Back button */}
      {isTaTeam ? (
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/ta-associate-plan")}
            className="px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
                  <ArrowLeft size={18} className="mr-2" /> Talent Pool
          </Button>
        </div>
      ) : (
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/sales-plan")}
            className="px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
                  <ArrowLeft size={18} className="mr-2" /> Talent Pool
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 mt-[120px]">
        <div className="grid grid-cols-4 gap-6 max-w-full mx-auto">
          {/* Work Mode Card */}
          <Card className="min-h-64">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Briefcase
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
                Work Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>On-site</span>
              </div>
            </CardContent>
          </Card>

          {/* Work Mode Card */}
          <Card className="min-h-64">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                <MapPin
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
                Hiring Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Country:
                    </strong>{" "}
                    India
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900 dark:text-gray-100">
                      State:
                    </strong>{" "}
                    Tamil Nadu
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900 dark:text-gray-100">
                      City:
                    </strong>{" "}
                    Chennai
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Industries and Companies Card */}
          <Card className="min-h-64">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <Building
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
                Target Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Target Industries:
                    </strong>{" "}
                    IT services or consulting companies
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Target Companies:
                    </strong>{" "}
                    Mindtree & Wipro
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campus Category Card */}
          <Card className="min-h-64">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                <School
                  size={24}
                  className="text-orange-600 dark:text-orange-400"
                />
                Campus Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <span className="text-orange-600 dark:text-orange-400 mt-1">
                  •
                </span>
                <strong className="text-gray-900 dark:text-gray-100">
                  Ideal Educational Institutions:
                </strong>{" "}
                Tier 2 Colleges
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
