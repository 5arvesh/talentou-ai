
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useAlignment } from "@/context/AlignmentContext";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import YourTAPlanSoFar from "@/components/Reuseable/YourTAPlanSoFar";
import CustomAccordion from "../Reuseable/Accordion";
import {
  ChevronDown,
  ChevronUp,
  Briefcase,
  MapPin,
  Building,
  GraduationCap,
  Users,
  School,
  Expand,
  Minimize2,
} from "lucide-react";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string | JSX.Element;
  name: string;
}

interface Summary {
  id: number;
  title: string;
  content: string | JSX.Element;
  colr: string;
}

interface WorkspacePanelProps {
  currentStageIndex?: number;
  onStageChange?: (newStageIndex: number) => void;
}

export function MarketDatabaseChat({
  currentStageIndex = 1,
  onStageChange,
}: WorkspacePanelProps) {
  const navigate = useNavigate();
  const { setMarketCriteriaAligned, setComponentProgress } = useAlignment();
  const [message, setMessage] = useState("");
  const [conversationStep, setConversationStep] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Talent Pool");
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [expandedAccordions, setExpandedAccordions] = useState<Set<number>>(
    new Set()
  );

  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const [isPlanSectionCollapsed, setIsPlanSectionCollapsed] = useState(false);
  const [areAllExpanded, setAreAllExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem("MarketCriteriaAligned", "true");
  }, []);

  const areAllAccordionsExpanded = () =>
    expandedAccordions.size === summary.length;

  const [summary, setSummary] = useState([
    {
      id: 1,
      title: "Work Mode",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>On Site</li>
          </ul>
        </div>
      ),
      colr: "#ae6bf2",
      icon: Briefcase,
    },
    {
      id: 2,
      title: "Hiring Region",
      content: (
        <div className="w-full">
          <table className="table-auto w-full text-sm overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-[#eef4fe] dark:bg-gray-800">
                <th className="px-4 py-2 text-left rounded-tl-md">Country</th>
                <th className="px-4 py-2 text-left">State</th>
                <th className="px-4 py-2 text-left rounded-tr-md">Cities</th>
              </tr>
            </thead>
            <tbody className="bg-[#f8fbff]">
              <tr>
                <td className={`px-4 py-2`}>India </td>
                <td className="px-4 py-2">Tamil Nadu</td>
                <td className={`px-4 py-2`}>Chennai</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      colr: "#4a8ff7",
      icon: MapPin,
    },
    {
      id: 3,
      title: "Target Industries and Companies",
      content: (
        <div className="w-full">
          <table className="table-auto w-full text-sm overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-[#eef4fe] dark:bg-gray-800">
                <th className="px-4 py-2 text-left rounded-tl-md">
                  Target Industries
                </th>
                <th className="px-4 py-2 text-left">Target Companies</th>
              </tr>
            </thead>
            <tbody className="bg-[#f2fcf8]">
              <tr>
                <td className={`px-4 py-2`}>
                  IT services or consulting companies{" "}
                </td>
                <td className="px-4 py-2">Mindtree & Wipro</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      colr: "#90e0c5",
      icon: Building,
    },
    {
      id: 4,
      title: "Campus Category",
      content: (
        <div className="w-full">
          <table className="table-auto w-full text-sm overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-[#eef4fe] dark:bg-gray-800">
                <th className="px-4 py-2 text-left rounded-tl-md">
                  Ideal Educational Institutions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#f8fbff]">
              <tr>
                <td className={`px-4 py-2`}>Tier 2 Colleges</td>{" "}
              </tr>
            </tbody>
          </table>
        </div>
      ),
      colr: "#ae6bf2",
      icon: School,
    },
  ]);

  const totalExpectedUserMessages = 5;

  useEffect(() => {
    const progress = Math.round(
      (userMessageCount / totalExpectedUserMessages) * 100
    );
    setComponentProgress("talentPool", Math.min(progress, 100));
  }, [userMessageCount, setComponentProgress]);

  const handleProceedToNext = () => {
    // Mark current step as completed and move to next
    setComponentProgress("talentPool", 100);
    if (onStageChange) {
      onStageChange(currentStageIndex + 1);
    }
  };

  const conversationFlow = [
    {
      ai: "Let’s define your ideal Talent Pool. This helps us filter candidates based on geography, Industry, Companies and Institutions. ",
      expectedResponse: "",
    },
    {
      ai: "Please tell me about the work arrangement applicable. Are you looking for a Remote Working candidate, On Site or are there openings for both?",
      expectedResponse: "Onsite",
    },
    {
      ai: "Got it, we'll focus only on candidates available for on-site roles. Which Countries should we target for sourcing?",
      expectedResponse: "India",
    },
    {
      ai: "Which State in India should we target?",
      expectedResponse: "Tamil Nadu",
    },
    {
      ai: "Any specific city / town in Tamil Nadu for sourcing?",
      expectedResponse: "Chennai",
    },
    {
      ai: "Thank you. Now, are there any specific sectors or industries your ideal candidates should come from?",
      expectedResponse: "Yes, IT services or consulting companies.",
    },
    {
      ai: "Understood. Any target companies you prefer sourcing from?",
      expectedResponse: "Mindtree, Wipro",
    },
    {
      ai: "Got it. Could you share any preferences you have for a candidate's educational institutions?",
      expectedResponse: "Tier 2",
    },
    {
      ai: "We have captured your Talent Pool in the right panel.\nWould you like to: Edit or refine this, or, proceed to the next step - Recruitment Channels",
      expectedResponse: "",
      type: "summary",
    },
  ];

  const messages: Message[] = conversationFlow.flatMap((step, index) => {
    const result: Message[] = [];

    result.push({
      id: index * 2 + 1,
      sender: "ai",
      content: step.ai,
      name: "Talentou AI",
    });

    if (step.expectedResponse) {
      result.push({
        id: index * 2 + 2,
        sender: "user",
        content: step.expectedResponse,
        name: "TA Lead",
      });
    }

    return result;
  });

  const handleBackClick = () => {
    // setMarketCriteriaAligned(true);
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

      {/* Talent Pool Section with Border and Scrollable */}
      <div className="flex-1 border border-gray-200 rounded-lg p-2.5 m-2.5 overflow-hidden">
        {selectedTab === "Talent Pool" && (
          <div className="bg-white dark:bg-gray-900 rounded-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 res-1200:mb-2">
              <h4 className="font-semibold text-[19px] res-1200:text-[13px] res-1400:text-[15px] res-1600:text-[17px]">
                Talent Pool for Ignitho :
              </h4>
              <button
                onClick={handleExpandAll}
                className="flex items-center gap-1 px-2 py-1 text-xs border rounded hover:bg-gray-50 res-1200:text-[9px] res-1400:text-[10px]"
              >
                {areAllExpanded ? (
                  <Expand className="w-3 h-3 res-1200:w-2 res-1200:h-2" />
                ) : (
                  <Minimize2 className="w-3 h-3 res-1200:w-2 res-1200:h-2" />
                )}
                {areAllExpanded && areAllAccordionsExpanded
                  ? "Expand All"
                  : "Collapse All"}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {summary.map((value, index) => (
                <CustomAccordion
                  bgclr={value.colr}
                  key={value.id}
                  title={value.title}
                  content={
                    areAllAccordionsExpanded() ? "Collapse" : value.content
                  }
                  icon={React.createElement(value.icon)}
                  isCollapsed={!expandedAccordions.has(value.id)}
                  toggleCollapse={() => handleAccordionToggle(value.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ChatWindow
      title="Talent Pool"
      messages={messages}
      currentMessage=""
      onCurrentMessageChange={() => {}}
      onSendMessage={(e) => e.preventDefault()}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
      currentStageIndex={currentStageIndex}
      onProceedToNext={handleProceedToNext}
      showProceedButton={true}
      progressTitle={"talentPool"}
    />
  );
}
