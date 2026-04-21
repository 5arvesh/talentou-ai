
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import YourTAPlanSoFar from "@/components/Reuseable/YourTAPlanSoFar";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string | JSX.Element;
  name?: string;
}

interface WorkspacePanelProps {
  currentStageIndex?: number;
  onStageChange?: (newStageIndex: number) => void;
}

export function AssignTATeamChat({
  currentStageIndex = 0,
  onStageChange,
}: WorkspacePanelProps) {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleProceedToOnboardHiringLead = () => {
    // Set flag in localStorage to enable the Onboard Hiring Lead button
    localStorage.setItem("canOnboardHiringLead", "true");
    navigate("/sales-plan");
  };

  const handleBackClick = () => {
    navigate("/sales-plan");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the email submission logic here if needed
    console.log("Email submitted:", currentMessage);
    setCurrentMessage("");
  };

  // Updated conversation as requested
  const messages: Message[] = [
    {
      id: 1,
      sender: "ai",
      content: `Hi Roney Soloman,
Now that you've defined your Company USP and Talent Pool, it's time to proceed with onboarding and assigning your TA Associates.

Email ID
Please provide the email IDs of your TA Associates.`,
      name: "Talentou AI",
    },
    {
      id: 2,
      sender: "user",
      content: (
        <div>
                <p>Vivin - vivin@nuivio.com</p>      <p>Sherin - sherina@nuivio.com</p>     {" "}
          <p>Shreya - shreya@nuivio.com</p>   {" "}
        </div>
      ),
    },
    {
      id: 3,
      sender: "ai",
      content: "Thank you for providing the Recruiter's emails.",
      name: "Talentou AI",
    },
  ];

  // List of assigned Recruiter email addresses
  const assignedEmails = [
    "Vivin",
    "Sherin",
    "Shreya",
  ];

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
            Assigned Recruiters:
          </h4>
          <div className="mt-4 res-1200:mt-1 res-1400:mt-2 res-1600:mt-3">
            <div className="space-y-3">
              {assignedEmails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {email}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const suggestionButtons = (
    <div className="p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleProceedToOnboardHiringLead}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-900/30"
        >
          Proceed to Onboard Hiring Lead
        </button>
      </div>
    </div>
  );

  return (
    <ChatWindow
      title="Invite Recruiter"
      messages={messages}
      currentMessage={currentMessage}
      onCurrentMessageChange={setCurrentMessage}
      onSendMessage={handleSendMessage}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
      additionalContent={suggestionButtons}
    />
  );
}
