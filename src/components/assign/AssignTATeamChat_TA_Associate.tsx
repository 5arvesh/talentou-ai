
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import { YourTAPlanSoFar_TA_Associate } from "@/components/Reuseable/YourTAPlanSoFar_TA_Associate";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string;
  name: string;
}

export function AssignTATeamChat_TA_Associate() {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleBackClick = () => {
    navigate("/ta-associate-plan");
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
      content: `Hi Darshana,
Now that you've defined your Company USP and Talent Pool, it's time to proceed with your recruitment execution plan.

Ready to start your candidate outreach?`,
      name: "Talentou AI",
    },
    {
      id: 2,
      sender: "user",
      content: "Yes, I'm ready to begin reaching out to candidates.",
      name: "Darshana",
    },
    {
      id: 3,
      sender: "ai",
      content: "Great! Let's start your recruitment campaign with the profiles and messaging we've prepared.",
      name: "Talentou AI",
    },
  ];

  const assignedEmails = ["vivin@nuivio.com", "sherina@nuivio.com", "shreya@nuivio.com"];

  const sidebarComponent = (
    <div className="border-gray-200 px-6 py-8 h-full overflow-y-hidden flex flex-col gap-[20px] res-1200:gap-2 res-1200:px-5 res-1400:py-6 res-1600:py-7">
      <div className="mt-auto">
        <YourTAPlanSoFar_TA_Associate
          stepLabels={["Company USP", "Talent Pool", "Recruitment Channels", "Success Metrics"]}
        />
      </div>
      <div className="flex-1 py-8 space-y-4 res-1200:py-5 res-1400:py-6 res-1600:py-7">
        <div className="bg-white rounded-lg mb-4">
          <h4 className="font-semibold text-[19px] mb-4 res-1200:text-[13px] res-1200:mb-2 res-1400:text-[15px] res-1600:text-[17px]">
            Your Recruitment Plan:
          </h4>
          <div className="mt-4 res-1200:mt-1 res-1400:mt-2 res-1600:mt-3">
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                  ✓
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Company USP Defined
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                  ✓
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Target Profiles Ready
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                  ✓
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Outreach Templates Set
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
      title="Start Recruiting"
      messages={messages}
      currentMessage={currentMessage}
      onCurrentMessageChange={setCurrentMessage}
      onSendMessage={handleSendMessage}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
    />
  );
}
