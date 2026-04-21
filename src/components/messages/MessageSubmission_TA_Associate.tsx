
import React from 'react';
import { MessageCircle, Database, Megaphone, ChartBar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MessageStep1_TA_Associate } from "./MessageStep1_TA_Associate";

export const MessageSubmission_TA_Associate = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden">
      <MessageStep1_TA_Associate />
    </div>
  );
};
