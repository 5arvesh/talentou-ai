import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TabNav } from "../navigation/TabNav";
import { useToast } from "@/hooks/use-toast";
import { useAlignment } from "@/context/AlignmentContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SuccessMetrics_TA_Associate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(false);
  const { setMilestonesAligned } = useAlignment();
  const [isTaTeam, setIsTaTeam] = useState<boolean>(false);

  const handleAlignClick = () => {
    setIsAligned(true);
    toast({
      title: "Alignment Successful!",
      description: "Success metrics have been marked as aligned.",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/ta-associate-plan");
      setMilestonesAligned(true);
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

  const metricsData = [
    {
      category: "Proactive Sourcing Metrics",
      metrics: [
        {
          name: "Number of CVs to be added to the ATS",
          daily: "5",
          weekly: "25",
          monthly: "100",
          quarterly: "300",
          yearly: "1200",
        },
        {
          name: "Prospect engagements via Calls",
          daily: "10",
          weekly: "50",
          monthly: "200",
          quarterly: "600",
          yearly: "2400",
        },
        {
          name: "Prospect engagements via Email",
          daily: "10",
          weekly: "50",
          monthly: "200",
          quarterly: "600",
          yearly: "2400",
        },
        {
          name: "Prospect engagements via LinkedIn",
          daily: "10",
          weekly: "50",
          monthly: "200",
          quarterly: "600",
          yearly: "2400",
        },
      ],
    },
  ];

  const metricsData2 = [
    {
      category: "Recruitment Metrics",
      metrics: [
        {
          name: "Lead time to close a position: ",
          day: "2",
        },
        {
          name: "Recruiter workload limit:",
          day: "4",
        },
      ],
    },
  ];

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
                  <ArrowLeft size={18} className="mr-2" /> Success Metrics
          </Button>
        </div>
      ) : (
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/sales-plan")}
            className="px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
                  <ArrowLeft size={18} className="mr-2" /> Success Metrics
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 mt-[20px]">
        <div className="max-w-6xl mx-auto">
          <CardContent className="p-3">
            <div className="p-3">
              <Table className="border border-collapse">
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead
                      className="font-semibold text-purple-600 bg-purple-50 py-3.5 align-middle border-r"
                      style={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    >
                      Milestones
                    </TableHead>
                    <TableHead
                      className="text-center font-semibold text-purple-600 bg-purple-50 py-3.5 align-middle border-r"
                      style={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    >
                      Daily
                    </TableHead>
                    <TableHead
                      className="text-center font-semibold text-purple-600 bg-purple-50 py-3.5 align-middle border-r"
                      style={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    >
                      Weekly
                    </TableHead>
                    <TableHead
                      className="text-center font-semibold text-purple-600 bg-purple-50 py-3.5 align-middle border-r"
                      style={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    >
                      Monthly
                    </TableHead>
                    <TableHead
                      className="text-center font-semibold text-purple-600 bg-purple-50 py-3.5 align-middle border-r"
                      style={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    >
                      Quarterly
                    </TableHead>
                    <TableHead
                      className="text-center font-semibold text-purple-600 bg-purple-50 py-3.5 align-middle"
                      style={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    >
                      Yearly
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metricsData.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                      <TableRow className="border-b">
                        <TableCell
                          colSpan={6}
                          className="font-semibold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-r py-3.5"
                        >
                          {section.category}
                        </TableCell>
                      </TableRow>
                      {section.metrics.map((metric, metricIndex) => (
                        <TableRow
                          key={`${sectionIndex}-${metricIndex}`}
                          className="border-b"
                        >
                          <TableCell className="pl-6 border-r py-3.5">
                            {metric.name}
                          </TableCell>
                          <TableCell
                            className="text-center font-bold border-r py-3.5"
                            style={{ color: "#0095FF" }}
                          >
                            {metric.daily}
                          </TableCell>
                          <TableCell
                            className="text-center font-bold border-r py-3.5"
                            style={{ color: "#0095FF" }}
                          >
                            {metric.weekly}
                          </TableCell>
                          <TableCell
                            className="text-center font-bold border-r py-3.5"
                            style={{ color: "#0095FF" }}
                          >
                            {metric.monthly}
                          </TableCell>
                          <TableCell
                            className="text-center font-bold border-r py-3.5"
                            style={{ color: "#0095FF" }}
                          >
                            {metric.quarterly}
                          </TableCell>
                          <TableCell
                            className="text-center font-bold py-3.5"
                            style={{ color: "#0095FF" }}
                          >
                            {metric.yearly}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </div>
        <div className="flex-1 mt-[20px]">
          <div className="max-w-6xl mx-auto">
            <CardContent className="p-3">
              <div className="p-3">
                <Table className="border border-collapse">
                <TableBody>
                  {metricsData2.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                      <TableRow className="border-b">
                        <TableCell
                          colSpan={2}
                          className="font-semibold text-[#4a8ff7] dark:text-gray-200 bg-blue-50 dark:bg-gray-800 border-r py-3.5"
                        >
                          {section.category}
                        </TableCell>
                      </TableRow>
                      {section.metrics.map((metric, metricIndex) => (
                        <TableRow
                          key={`${sectionIndex}-${metricIndex}`}
                          className="border-b"
                        >
                          <TableCell className="pl-6 border-r py-3.5" >
                            {metric.name}
                          </TableCell>
                          <TableCell className="pl-6 border-r py-3.5 font-bold text-purple-600">
                            {metric.day}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
              </div>
              
            </CardContent>
          </div>
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
