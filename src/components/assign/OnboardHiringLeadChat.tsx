
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import YourTAPlanSoFar from "@/components/Reuseable/YourTAPlanSoFar";

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

export function OnboardHiringLeadChat({ currentStageIndex = 0, onStageChange }: WorkspacePanelProps) {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleBackClick = () => {
    navigate("/sales-plan");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", currentMessage);
    setCurrentMessage("");
  };

  const messages: Message[] = [
    {
      id: 1,
      sender: "ai",
      content: `Hi Roney Soloman,
Great! Now that you've assigned your Recruiters, it's time to onboard your Hiring Lead.

Email ID
Please provide the email ID of your Hiring Lead.`,
      name: "Talentou AI",
    },
    {
      id: 2,
      sender: "user",
      content: "manager@nuivio.com",
      name: "J. Olassa",
    },
    {
      id: 3,
      sender: "ai",
      content: "Thank you for providing the Hiring Lead's email. They will receive an invitation to join the platform.",
      name: "Talentou AI",
    },
  ];

  // List of assigned Hiring Lead email address
  const assignedEmail = "manager@nuivio.com";

  const sidebarComponent = (
    <div className="border-gray-200 px-6 py-8 h-full overflow-y-hidden flex flex-col gap-[20px] res-1200:gap-2 res-1200:px-5 res-1400:py-6 res-1600:py-7">
      <div className="mt-auto">
        <YourTAPlanSoFar
            currentStageIndex={currentStageIndex}
            onStageClick={onStageChange}
          />
      </div>
      <div className="flex-1 py-8 space-y-4 res-1200:py-5 res-1400:py-6 res-1600:py-7">
        <div className="bg-white rounded-lg mb-4">
          <h4 className="font-semibold text-[19px] mb-4 res-1200:text-[13px] res-1200:mb-2 res-1400:text-[15px] res-1600:text-[17px]">
            Assigned Hiring Lead:
          </h4>
          <div className="mt-4 res-1200:mt-1 res-1400:mt-2 res-1600:mt-3">
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                  {assignedEmail.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {assignedEmail}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ChatWindow
      title="Onboard Hiring Lead"
      messages={messages}
      currentMessage={currentMessage}
      onCurrentMessageChange={setCurrentMessage}
      onSendMessage={handleSendMessage}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
    />
  );
}
