
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import YourTAPlanSoFar from "@/components/Reuseable/YourTAPlanSoFar";
import CustomAccordion from "../Reuseable/Accordion";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  CheckCircle,
  Users,
  Target,
  Star,
  Award,
  TrendingUp,
  Expand,
  Minimize2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string | JSX.Element;
  name: string;
}
interface WorkspacePanelProps {
  currentStageIndex?: number;
  onStageChange?: (newStageIndex: number) => void;
}

interface Summary {
  id: number;
  title: string;
  content: string | JSX.Element;
  colr: string;
}

export function MeasureKPIChat({
  currentStageIndex = 0,
  onStageChange,
}: WorkspacePanelProps) {
  const navigate = useNavigate();
  const { setMilestonesAligned, setComponentProgress } = useAlignment();
  const [selectedTab, setSelectedTab] = useState("Success Metrics");
  const [conversationStep, setConversationStep] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const [expandedAccordions, setExpandedAccordions] = useState<Set<number>>(
    new Set()
  );

  const [isPlanSectionCollapsed, setIsPlanSectionCollapsed] = useState(false);
  const [areAllExpanded, setAreAllExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem("MilestonesAligned", "true");
  }, []);

  const accordionIcons = [
    <Clock className="w-4 h-4" />,
    <DollarSign className="w-4 h-4" />,
    <CheckCircle className="w-4 h-4" />,
    <Users className="w-4 h-4" />,
    <Target className="w-4 h-4" />,
    <Star className="w-4 h-4" />,
    <Award className="w-4 h-4" />,
    <TrendingUp className="w-4 h-4" />,
  ];

  const areAllAccordionsExpanded = () =>
    expandedAccordions.size === summary.length;

  const [summary, setSummary] = useState<Summary[]>([
    {
      id: 1,
      title: "Time-to-Hire ",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>6 Weeks</li>
          </ul>
        </div>
      ),
      colr: "#ae6bf2",
    },
    {
      id: 2,
      title: "Proactive Sourcing Metrics",
      content: (
        <div className="w-full">
          <table className="">
            <tbody>
              {[
                {
                  label: "Number of CVs added to ATS/Week",
                  value: "20 per week",
                },
                {
                  label: "Weekly Prospect Engagements via Email",
                  value: "2 per week",
                },
                {
                  label: "Weekly Prospect Engagements via Calls",
                  value: "1 per week",
                },
                {
                  label: "Weekly Prospect Engagements via Linkedln",
                  value: "2 per week",
                },
              ].map((item) => (
                <tr key={item.label}>
                  <th className="text-left" scope="row">
                    {item.label}
                  </th>
                  <td>:</td>
                  <td className="px-3">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      colr: "#4a8ff7",
    },
  ]);

  const totalExpectedUserMessages = 3; // Total user interactions expected in this chat

  // Calculate progress based on user messages
  useEffect(() => {
    const progress = Math.round(
      (userMessageCount / totalExpectedUserMessages) * 100
    );
    setComponentProgress("successMetrics", Math.min(progress, 100));
  }, [userMessageCount, totalExpectedUserMessages, setComponentProgress]);

  const conversationFlow = [
    {
      ai: "You're at the final step of your TA Plan, setting a success benchmark to help monitor overall progress and hiring effectiveness.\nTo begin, what's the maximum number of open positions you'd prefer each Recruiter to handle at a time?",
      expectedResponse: "Let's keep it at 4 active positions per Associate.",
    },
    {
      ai: "Glad to hear that! Now, let's define productivity goals for your TA Team\nTo begin with, how many CVs would you like each Recruiter to add to the ATS on a daily basis?",
      expectedResponse: "Let's go with 5 per day.",
    },
    {
      ai: "Perfect. Next, how many calls should each Recruiter send daily to keep potential candidates warm?",
      expectedResponse: "10 calls per day should suffice.",
    },
    {
      ai: "Perfect. Next, how many engagement emails should each Recruiter send daily to keep potential candidates warm?",
      expectedResponse: "10 emails per day should suffice.",
    },
    {
      ai: "Great, how many LinkedIn outreach messages would you like each associate to send per week to candidates?",
      expectedResponse: "Let's go with 10 LinkedIn outreaches per day.",
    },
    {
      ai: "Understood. I'll also track detailed metrics for each position, such - Number of open positions, Average time of open positions, Profiles sourced, Candidates shortlisted, One-way interviews completed\nAll these activity metrics will be tracked and made visible through your Talentou dashboard in real time, so you can easily monitor progress, identify trends, and make adjustments where needed.\n\nWould you like to: Edit or refine this, or; Finalize my TA Plan",
    },
  ];

  const messages: Message[] = conversationFlow.flatMap((step, index) => {
    const result: Message[] = [];

    // AI Message
    result.push({
      id: index * 2 + 1,
      sender: "ai",
      content: step.ai,
      name: "Talentou AI",
    });

    // User message (only if expectedResponse exists)
    if (step.expectedResponse) {
      result.push({
        id: index * 2 + 2,
        sender: "user",
        content: step.expectedResponse,
        name: "TA Leader",
      });
    }

    return result;
  });

  const handleBackClick = () => {
    // setMilestonesAligned(true);
    navigate("/sales-plan");
  };

  const handleExpandAll = () => {
    setAreAllExpanded((prev) => !prev);
    if (!areAllExpanded) {
      setExpandedAccordions(new Set(summary.map((item) => item.id)));
    } else {
      setExpandedAccordions(new Set());
    }
  };

  const handleAccordionToggle = (id: number) => {
    setExpandedAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // Collapse the clicked accordion
      } else {
        newSet.add(id); // Expand the clicked accordion
      }
      return newSet;
    });
  };

  // Success metrics data for the table
  const metricsData1 = [
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

  const metricsData2=[
    {
      category: "Recruitment Metrics",
      metrics: [
        {
          name: "Lead time to close a position: ",
          day: "2 Weeks",
        },
        {
          name:"Recruiter workload limit:",
          day: "4 Open Positions",
        }
      ]
    }
  ]

  const sidebarComponent = (
    <div className="h-full overflow-y-hidden flex flex-col">
      {/* Your TA Plan So Far Section with Border and Collapsible */}
      <div className="border border-gray-200 rounded-lg p-2.5 m-2.5">
        <div
          className="flex justify-between items-center cursor-pointer mb-4 res-1200:mb-2"
          onClick={() => setIsPlanSectionCollapsed(!isPlanSectionCollapsed)}
        >
          <h3 className="font-semibold text-[19px] res-1200:text-[13px] res-1400:text-[15px] res-1600:text-[17px]">
            Your TA Plan So Far
          </h3>
          {isPlanSectionCollapsed ? (
            <ChevronDown className="h-5 w-5 res-1200:h-3 res-1200:w-3 res-1400:h-4 res-1400:w-4" />
          ) : (
            <ChevronUp className="h-5 w-5 res-1200:h-3 res-1200:w-3 res-1400:h-4 res-1400:w-4" />
          )}
        </div>

        {!isPlanSectionCollapsed && (
          <YourTAPlanSoFar
            currentStageIndex={currentStageIndex}
            onStageClick={onStageChange}
          />
        )}
      </div>

      {/* Success Metrics Section with Border and Scrollable */}
      <div className="flex-1 border border-gray-200 rounded-lg p-2.5 m-2.5 overflow-hidden">
        {selectedTab === "Success Metrics" && (
          <div className="bg-white dark:bg-gray-900 rounded-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 res-1200:mb-2">
              <h4 className="font-semibold text-[19px] res-1200:text-[13px] res-1400:text-[15px] res-1600:text-[17px]">
                Success Metrics for Ignitho :
              </h4>
              
            </div>
            <div className="flex-1 overflow-y-auto p-3">
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
                  {metricsData1.map((section, sectionIndex) => (
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
            <div className="flex-1 overflow-y-auto p-3">
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
                          <TableCell className="pl-6 border-r py-3.5">
                            {metric.name}
                          </TableCell>
                           <TableCell className="pl-6 border-r py-3.5">
                            {metric.day}
                          </TableCell>
                          
                          
                          
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ChatWindow
      title="Success Metrics"
      messages={messages}
      currentMessage=""
      onCurrentMessageChange={() => {}}
      onSendMessage={(e) => e.preventDefault()}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
      showProceedButton={true}
      progressTitle={"successMetrics"}
      proceedButtonText="Finalize TA Plan"
    />
  );
}
