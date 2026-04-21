
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import { YourTAPlanSoFar_TA_Associate } from "@/components/Reuseable/YourTAPlanSoFar_TA_Associate";
import { TabNav } from "../navigation/TabNav";
import { OutreachTimeline } from "./OutreachTimeline";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string;
  name: string;
}

export function MediaOutreachChat_TA_Associate() {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");

  const messages: Message[] = [
    {
      id: 1,
      sender: "ai",
      content: `Hi Darshana,
Let's set up your recruitment channels for maximum candidate engagement.

I'll help you configure:
• Email outreach sequences
• LinkedIn messaging strategies
• Phone call schedules
• Multi-channel cadences

Which channels do you prefer to use for initial candidate outreach?`,
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
      <TabNav />
      <OutreachTimeline/>
    </div>
  );
}
