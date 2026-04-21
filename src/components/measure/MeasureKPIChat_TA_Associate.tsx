
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import { YourTAPlanSoFar_TA_Associate } from "@/components/Reuseable/YourTAPlanSoFar_TA_Associate";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string;
  name: string;
}

export function MeasureKPIChat_TA_Associate() {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");

  const messages: Message[] = [
    {
      id: 1,
      sender: "ai",
      content: `Hi Darshana,
Let's establish success metrics to track your recruitment performance.

I'll help you set up:
• Key performance indicators (KPIs)
• Response rate targets
• Time-to-hire goals
• Quality metrics

What specific metrics are most important for measuring your recruitment success?`,
      name: "Talentou AI",
    }
  ];

  const sidebarComponent = (
    <div className="border-gray-200 px-6 py-8 h-full overflow-y-hidden flex flex-col gap-[20px]">
      <div className="mt-auto">
        <YourTAPlanSoFar_TA_Associate
          stepLabels={["Company USP", "Talent Pool", "Recruitment Channels", "Success Metrics"]}
        />
      </div>
    </div>
  );

  return (
    <ChatWindow
      title="Success Metrics Setup"
      messages={messages}
      currentMessage={currentMessage}
      onCurrentMessageChange={setCurrentMessage}
      onSendMessage={(e: React.FormEvent) => {
        e.preventDefault();
        console.log("Message sent:", currentMessage);
        setCurrentMessage("");
      }}
      onBackClick={() => navigate("/ta-associate-plan")}
      sidebarComponent={sidebarComponent}
    />
  );
}
