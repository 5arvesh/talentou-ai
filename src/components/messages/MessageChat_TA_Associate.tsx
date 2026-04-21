
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

export function MessageChat_TA_Associate() {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleBackClick = () => {
    navigate("/ta-associate-plan");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Message sent:", currentMessage);
    setCurrentMessage("");
  };

  const messages: Message[] = [
    {
      id: 1,
      sender: "ai",
      content: `Hi Darshana,
Let's create compelling recruitment messages that showcase Ignitho's unique value proposition.

I'll help you develop personalized outreach templates for different channels - LinkedIn, email, and phone calls.

What specific aspects of Ignitho's culture or opportunities would you like to highlight in your recruitment messages?`,
      name: "Talentou AI",
    }
  ];

  const sidebarComponent = (
    <div className="border-gray-200 px-6 py-8 h-full overflow-y-hidden flex flex-col gap-[20px]">
      {/* <div className="mt-auto">
      </div> */}
    </div>
  );

  return (
    <ChatWindow
      title="Company USP"
      messages={messages}
      currentMessage={currentMessage}
      onCurrentMessageChange={setCurrentMessage}
      onSendMessage={handleSendMessage}
      onBackClick={handleBackClick}
      sidebarComponent={sidebarComponent}
    />
  );
}
