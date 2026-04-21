import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import YourTAPlanSoFar from "@/components/Reuseable/YourTAPlanSoFar";
import CustomAccordion from "../Reuseable/Accordion";
import { ChevronDown, ChevronUp, Linkedin, Mail, Users, Expand, Minimize2, Briefcase, Globe, Building, Handshake } from 'lucide-react';


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

export function MediaOutreachChat({
  currentStageIndex = 0,
  onStageChange,
}: WorkspacePanelProps) {
  const navigate = useNavigate();
  const { setOutreachTimelineAligned, setComponentProgress } = useAlignment();
  const [selectedTab, setSelectedTab] = useState("Recruitment Channels");
  const [conversationStep, setConversationStep] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const [isPlanSectionCollapsed, setIsPlanSectionCollapsed] = useState(false);
  const [areAllExpanded, setAreAllExpanded] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<Set<number>>(
  new Set()
);

  useEffect(() => {
    localStorage.setItem("OutreachTimelineAligned", "true");
  }, []);

  const areAllAccordionsExpanded = () =>
    expandedAccordions.size === summary.length;

  const [summary, setSummary] = useState([
    {
      id: 1,
      title: "Digital Platforms",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>LinkedIn</li>
            <li>Naukri</li>
            <li>Indeed</li>
            <li>Foundit</li>
            <li>Work India</li>
          </ul>
        </div>
      ),
      colr: "#ae6bf2",
      icon: Globe,
    },
    {
      id: 2,
      title: "Internal Channels",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>Company careers page</li>
            <li> Employee referrals</li>
            <li>Past applicants</li>
            <li>Internal job boards</li>
          </ul>
        </div>
      ),
      colr: "#4a8ff7",
      icon: Building,
    },
    {
      id: 3,
      title: "Recruitment Agencies",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>Randstad</li>
            <li>Michael Page</li>
          </ul>
        </div>
      ),
      colr: "#90e0c5",
      icon: Handshake,
    },
    {
      id: 4,
      title: "Offline Events",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>Campus Recruitment</li>
          </ul>
        </div>
      ),
      colr: "#ae6bf2",
      icon: Users,
    },
  ]);

  const totalExpectedUserMessages = 4;

  useEffect(() => {
    const progress = Math.round(
      (userMessageCount / totalExpectedUserMessages) * 100
    );
    setComponentProgress("recruitmentChannels", Math.min(progress, 100));
  }, [userMessageCount, setComponentProgress]);

  const conversationFlow = [
    {
      ai: "You’re doing great! The third step in your TA Plan is defining your Recruitment Channels, this will guide your TA Team on where to source candidates for this role.",
      expectedResponse: "",
    },
    {
      ai: "",
      expectedResponse: "Let's get started",
    },
    {
      ai: "Let’s start with Digital Platforms. Which of the following would you like to post this role on : LinkedIn, Naukri, Indeed, Foundit, or any others?",
      expectedResponse: "LinkedIn, Naukri, Indeed, Foundit, Work India",
    },
    {
      ai: "Great! Now let’s look at Internal Channels. Would you like to use your company’s careers page, internal job board, or employee referral programs to source candidates?",
      expectedResponse:
        "Company careers page,  Employee referrals, Past applicants, Internal job boards",
    },
    {
      ai: "Great! Now let's look at partner led hiring channel. would you prefer to use any Recruitment agencies as part of your sourcing strategy?",
      expectedResponse: "Yes",
    },
    {
      ai: "Great! Please list down the Recruitment Agencies you would like to use as part of your recruitment channels",
      expectedResponse: "Randstad, Michael Page",
    },
    {
      ai: "Great! What kind of Offline Events do you want to use for your recruitment?",
      expectedResponse: "Campus Recruitment",
    },
    {
      ai: (
        <div>
          <p>Great! Your Recruitment Channels are:</p>
          <p>Digital Platforms - LinkedIn, Naukri, Indeed, Foundit, Work India</p>
          <p>Internal Channels - Company careers page,  Employee referrals, Past applicants, Internal job boards</p>
          <p>Recruitment Agencies - Randstad, Michael Page</p>
          <p>Offline Events - Campus Recruitment</p>
        </div>
      ),
      expectedResponse: "",
    },
    {
      ai: "Would you like to: Edit or refine this, or, proceed to the next step - Success Metrics",
      expectedResponse: "Let’s proceed to the next step",
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
    // setOutreachTimelineAligned(true);
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

      {/* Recruitment Channels Section with Border and Scrollable */}
      <div className="flex-1 border border-gray-200 rounded-lg p-2.5 m-2.5 overflow-hidden">
        {selectedTab === "Recruitment Channels" && (
          <div className="bg-white dark:bg-gray-900 rounded-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 res-1200:mb-2">
              <h4 className="font-semibold text-[19px] res-1200:text-[13px] res-1400:text-[15px] res-1600:text-[17px]">
                Recruitment Channels for Ignitho :
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
                key={value.id}
                bgclr={value.colr}
                title={value.title}
                content={areAllAccordionsExpanded() ? "Collapse" : value.content}
                icon={value.icon ? React.createElement(value.icon) : null} 
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
      title="Recruitment Channels"
      messages={messages}
      currentMessage=""
      onCurrentMessageChange={() => {}}
      onSendMessage={(e) => e.preventDefault()}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
      showProceedButton={true}
      progressTitle={"recruitmentChannels"}
    />
  );
}
