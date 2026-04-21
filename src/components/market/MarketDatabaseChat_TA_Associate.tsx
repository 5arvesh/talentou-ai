
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import { YourTAPlanSoFar_TA_Associate } from "@/components/Reuseable/YourTAPlanSoFar_TA_Associate";
import { TabNav } from "../navigation/TabNav";
import { MarketCriteria } from "./MarketCriteria";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string;
  name: string;
}

export function MarketDatabaseChat_TA_Associate() {
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
Let's define your ideal talent pool for Ignitho's recruitment needs.

I'll help you identify:
• Target candidate profiles
• Required skills and experience levels
• Geographic preferences
• Industry backgrounds

What specific roles are you currently looking to fill?`,
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
    <div className="px-8 mt-6">
      <TabNav></TabNav>
      <MarketCriteria/>

    </div>
  );
}
