import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import YourTAPlanSoFar from "@/components/Reuseable/YourTAPlanSoFar";
import CustomAccordion from "../Reuseable/Accordion";
import {
  Target,
  Users,
  TrendingUp,
  Award,
  Gift,
  DollarSign,
  Building,
  ChevronDown,
  ChevronUp,
  Expand,
  Minimize2,
} from "lucide-react";
import { log } from "node:console";

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
interface Summary {
  id: number;
  title: string;
  content: string | JSX.Element;
  colr: string;
}

export function MessagePlanChat({
  currentStageIndex = 0,
  onStageChange,
}: WorkspacePanelProps) {
  const navigate = useNavigate();
  const { setComponentProgress, componentProgress } = useAlignment();
  const [selectedTab, setSelectedTab] = useState("Company USP");
  const [currentMessage, setCurrentMessage] = useState("");
  const [conversationStep, setConversationStep] = useState(0);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const [isPlanSectionCollapsed, setIsPlanSectionCollapsed] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<Set<number>>(
    new Set()
  );
  const [areAllExpanded, setAreAllExpanded] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const areAllAccordionsExpanded = () =>
    expandedAccordions.size === summary.length;
  const [summary, setSummary] = useState([
    {
      id: 1,
      title: "Elevator Pitch",
      content: (
        <div className="">
          <ul className="list-disc pl-5">
            <li>
              At Ignitho, you’ll work at the intersection of innovation and
              impact, building cutting-edge digital products for global
              enterprises.
            </li>
            <li>
              With the agility of a startup and the stability of a growth-stage
              company, we offer a highly collaborative and entrepreneurial
              environment where teams work closely with senior leaders and
              clients.
            </li>
            <li>
              You’ll have the freedom to lead, the opportunity to upskill
              rapidly, and the ability to see your work make a real difference.
            </li>
            <li>
              If you’re seeking purpose, growth, and a future-proof tech career,
              this is where it begins.
            </li>
          </ul>
        </div>
      ),
      colr: "#ae6bf2",
      icon: Target,
    },
    {
      id: 2,
      title: "Career Growth & Development",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>
              Career Growth & Development : Offers client-facing roles with
              early ownership.
            </li>
            <li>
              Enables rapid career growth through fast-track promotions. Acts as
              a launchpad for professionals aiming to grow into leadership
              roles.
            </li>
            <li>Provides global exposure across US and Europe.</li>
          </ul>
        </div>
      ),
      colr: "#4a8ff7",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Compensation & Benefits",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>Hybrid roles available with flexible work timings.</li>
            <li>Performance based bonus.</li>
          </ul>
        </div>
      ),
      colr: "#90e0c5",
      icon: Gift,
    },
    {
      id: 4,
      title: "Awards & Brand Recognition",
      content: (
        <div className="w-full">
          <ul className="list-disc pl-5">
            <li>Awarded the great place to work certification in 2025.</li>
            <li>Renowned for their delivery excellence.</li>
          </ul>
        </div>
      ),
      colr: "#ae6bf2",
      icon: Award,
    },
  ]);

  const totalExpectedUserMessages = 6;

  useEffect(() => {
    localStorage.setItem("CollateralsAligned", "true");
    localStorage.setItem("ValuePropositionAligned", "true");
  }, []);

  useEffect(() => {
    const calculatedProgress = Math.round(
      (userMessageCount / totalExpectedUserMessages) * 100
    );

    const newProgress = Math.min(calculatedProgress, 100);

    // ✅ Avoid repeated state updates that cause infinite loop
    if (componentProgress.companyUSP !== newProgress) {
      setComponentProgress("companyUSP", newProgress);
    }
  }, [userMessageCount, componentProgress.companyUSP, setComponentProgress]);

  const conversationFlow = [
    {
      ai: "Hi Roney, Let’s begin with your TA Plan. The first step is defining your Company’s Unique Selling Proposition, or simply, why a candidate should join your organization. You can chat with me about your company's USP, attach a pre-written company profile or brand document, or share your company's website link.  An ideal USP will cover these four broad topics Elevator Pitch, Career growth & development, Compensation & Benefits, Awards & Brand Recognition. ",
      expectedResponse: "Let's chat",
    },
    {
      ai: "How would you describe your company in a few lines to inspire a candidate to join? Think of it as your elevator pitch,  what makes your organization the right place for talent seeking purpose, growth, and impact? ",
      expectedResponse:
        "At Ignitho, you’ll work at the intersection of innovation and impact, helping build cutting-edge digital products for global enterprises. We offer the agility of a startup with the stability of a growth-stage company. You’ll collaborate with industry leaders, upskill rapidly, and see your work make a real difference. If you’re looking for purpose, growth, and a future-proof tech career, this is where it begins",
    },
    {
      ai: "That’s a strong foundation. How would you describe the work culture at Ignitho?",
      expectedResponse:
        "It’s highly collaborative and entrepreneurial. Teams work closely with senior leaders and clients, with a lot of freedom to lead.",
    },
    {
      ai: "Noted. What kind of career growth or development opportunities do you offer?",
      expectedResponse:
        "We promote fast. High performers take on leadership roles early, and we invest in mentorship and cross-skill training.",
    },
    {
      ai: "Great! And what are the top benefits and perks the candidates should know about?",
      expectedResponse:
        "Hybrid work, flexibility, upskilling programs, and Health care Insurance",
    },
    {
      ai: "Thanks! What types of performance-based rewards or recognition programs are currently offered to employees?",
      expectedResponse:
        "Yes – we offer performance-based bonuses and are known for our delivery excellence.",
    },
    {
      ai: "And finally, has Ignitho received any awards or recognitions that reinforce its brand?",
      expectedResponse:
        "We’ve been recognized by clients for our delivery excellence. Our alumni go on to lead teams in major tech firms, and we’re scaling across the US and Europe. We've received the Great Place to Work Certification due to our high Employee Satisfaction Scores",
    },
    {
      ai: "We have captured your company's USP in the right panel.\n Would you like to: Edit this, or; Proceed to the next step - Talent Pool",
      expectedResponse: "",
      type: "summary",
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
      name: "J. Olassa",
    },
  ]);

  const handleBackClick = () => {
    // setValuePropositionAligned(true);
    // setCollateralsAligned(true);
    navigate("/sales-plan");
    setPercentage(100);
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
      title="Company USP"
      messages={messages}
      currentMessage=""
      onCurrentMessageChange={() => {}}
      onSendMessage={(e) => e.preventDefault()}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
      showProceedButton={true}
      progressTitle={"companyUSP"}
    />
  );
}
