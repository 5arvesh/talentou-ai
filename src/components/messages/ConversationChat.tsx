
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import YourTAPlanSoFar from "@/components/Reuseable/YourTAPlanSoFar";
import CustomAccordion from "../Reuseable/Accordion";
import { Target, Users, TrendingUp, Award, Gift, DollarSign, Building, ChevronDown, ChevronUp, Expand, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string;
  name: string;
}
interface WorkspacePanelProps {
  currentStageIndex?: number;
  onStageChange?: (newStageIndex: number) => void;
}

export function ConversationChat({ currentStageIndex = 0, onStageChange }: WorkspacePanelProps) {
  const navigate = useNavigate();
  const {
    setValuePropositionAligned,
    setCollateralsAligned,
    setComponentProgress,
  } = useAlignment();
  const [selectedTab, setSelectedTab] = useState("Company USP");
  const [currentMessage, setCurrentMessage] = useState("");
  const [conversationStep, setConversationStep] = useState(0);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const [isPlanSectionCollapsed, setIsPlanSectionCollapsed] = useState(false);
  const [areAllExpanded, setAreAllExpanded] = useState(false);

  const [summary, setSummary] = useState([
    {
      id: 1,
      title: "Mission & Vision",
      content: "Mission: To deliver outcome-driven digital solutions through frugal innovation, enabling clients to accelerate business impact with agility and efficiency.\nVision: To be a global leader in digital engineering by empowering entrepreneurial talent to drive innovation and create real world value.",
      colr: "#ae6bf2",
      icon: Target
    },
    {
      id: 2,
      title: "Work Culture",
      content: "Ignitho empowers entrepreneurial talent to lead innovation at scale. Fosters a collaborative and delivery-driven culture.",
      colr: "#4a8ff7",
      icon: Users
    },
    {
      id: 3,
      title: "Career Growth",
      content: "Offers client-facing roles with early ownership.\nEnables rapid career growth through fast-track promotions. Acts as a launchpad for professionals aiming to grow into leadership roles.",
      colr: "#90e0c5",
      icon: TrendingUp
    },
    {
      id: 4,
      title: "Training Opportunities",
      content: "Provides global exposure across US and Europe.",
      colr: "#ae6bf2",
      icon: Building
    },
    {
      id: 5,
      title: "Benefits",
      content: "Hybrid roles available with flexible work timings.",
      colr: "#90e0c5",
      icon: Gift
    },
    {
      id: 6,
      title: "Incentives",
      content: "Performance based bonus.",
      colr: "#4a8ff7",
      icon: DollarSign
    },
    {
      id: 7,
      title: "Awards and Brand Recognition",
      content: "Renowned for their delivery excellence.",
      colr: "#ae6bf2",
      icon: Award
    },
  ]);

  const totalExpectedUserMessages = 10;

  useEffect(() => {
    const progress = Math.round(
      (userMessageCount / totalExpectedUserMessages) * 100
    );
    setComponentProgress("companyUSP", Math.min(progress, 100));
  }, [userMessageCount, setComponentProgress]);

  const conversationFlow = [
    {
      ai: "Thank you. Let's begin setting up the new position. I'll ask you a few brief questions to gather the necessary details.\n\nWhat is the name of the position you're hiring for?",
      expectedResponse: "Senior Backend Developer",
    },
    {
      ai: "Noted. Now, could you list the key skills required for this role? You can also rank them by importance.",
      expectedResponse: "1. Node.js\n2. MongoDB\n3. AWS\n4. TypeScript",
    },
    {
      ai: "Understood. What is the expected range of experience for this position?",
      expectedResponse: "3 to 5 years",
    },
    {
      ai: "Thanks. What's the salary budget range for this role?",
      expectedResponse: "₹12 to ₹15 LPA",
    },
    {
      ai: "Understood. Are there any preferred certifications, institutions, or companies the candidate should be from?",
      expectedResponse: "AWS Certified Developers preferred. From NITs or VIT. Experience at product companies would be great.",
    },
    {
      ai: "Perfect. Can you describe the key responsibilities for this role?",
      expectedResponse: "Build scalable APIs, work with cloud integrations, and mentor junior devs.",
    },
    {
      ai: "Thanks. What is the maximum acceptable notice period for candidates?",
      expectedResponse: "Up to 60 days",
    },
    {
      ai: "Got it. Would you like to nominate an Interviewer to help define the job requirements or review candidates?",
      expectedResponse: "Yes, Shreya M",
    },
    {
      ai: "Shreya M has been selected as the Interviewer for this position. Please give me their Email Address.",
      expectedResponse: "Shreya.m@company.com",
    },
    {
      ai: "Shreya M has been added as the Interviewer for this position.",
      expectedResponse: "Thank you",
    },
  ];

  const messages: Message[] = conversationFlow.flatMap((step, index) => [
    {
      id: index * 2 + 1,
      sender: "ai",
      content: step.ai,
      name: "Talentou AI",
    },
    {
      id: index * 2 + 2,
      sender: "user",
      content: step.expectedResponse,
      name: "Hiring Lead",
    },
  ]);

  const handleBackClick = () => {
    setValuePropositionAligned(true);
    setCollateralsAligned(true);
    navigate("/sales-plan");
  };

  const handleExpandAll = () => {
    if (areAllExpanded) {
      setOpenAccordionId(null);
    } else {
      // Don't set a specific ID, we'll handle this in the accordion rendering
    }
    setAreAllExpanded(!areAllExpanded);
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

      {/* Company USP Section with Border and Scrollable */}
      <div className="flex-1 border border-gray-200 rounded-lg p-2.5 m-2.5 overflow-hidden">
        {selectedTab === "Company USP" && (
          <div className="bg-white dark:bg-gray-900 rounded-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 res-1200:mb-2">
              <h4 className="font-semibold text-[19px] res-1200:text-[13px] res-1400:text-[15px] res-1600:text-[17px]">
                Company USP for Ignitho :
              </h4>
              <button
                onClick={handleExpandAll}
                className="flex items-center gap-1 px-2 py-1 text-xs border rounded hover:bg-gray-50 res-1200:text-[10px] res-1400:text-[11px]"
              >
                {areAllExpanded ? <Minimize2 className="w-3 h-3" /> : <Expand className="w-3 h-3" />}
                {areAllExpanded ? "Collapse All" : "Expand All"}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {summary.map((value) => {
                const IconComponent = value.icon;
                const isExpanded = areAllExpanded ? true : openAccordionId === value.id;
                
                return (
                  <div key={value.id} className="mb-2">
                    <div
                      className="p-3.5 flex items-center justify-between rounded-md cursor-pointer hover:opacity-80 transition-opacity res-1200:p-2 res-1400:p-2.5 res-1600:p-1.5"
                      style={{ backgroundColor: `${value.colr}1A` }}
                      onClick={() => setOpenAccordionId(isExpanded ? -1 : value.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center res-1200:w-6 res-1200:h-6 res-1400:w-7 res-1400:h-7"
                          style={{ backgroundColor: value.colr }}
                        >
                          <IconComponent className="w-4 h-4 text-white res-1200:w-3 res-1200:h-3 res-1400:w-3.5 res-1400:h-3.5" />
                        </div>
                        <div className="font-semibold dark:text-gray-900 text-[17px] res-1200:text-[11px] res-1400:text-[13px] res-1600:text-[15px]">
                          {value.title}
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="whitespace-pre-line p-3 leading-[1.4] text-base res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px] bg-gray-50 rounded-b-md mx-1">
                        {value.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ChatWindow
      title="Conversation"
      messages={messages}
      currentMessage=""
      onCurrentMessageChange={() => {}}
      onSendMessage={(e) => e.preventDefault()}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
    />
  );
}
