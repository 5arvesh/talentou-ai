
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { ValueProposition_TA_Associate } from "./ValueProposition_TA_Associate";
import { Collaterals_TA_Associate } from "./Collaterals_TA_Associate";

export const MessageStep1_TA_Associate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("value-proposition");
  const { isValuePropositionAligned, isCollateralsAligned } = useAlignment();
  
  const handleBackClick = () => {
    navigate("/ta-associate-plan");
  };

  const tabs = [
    { 
      id: "value-proposition", 
      label: "Value Proposition", 
      isCompleted: isValuePropositionAligned 
    },
    { 
      id: "collaterals", 
      label: "Collaterals", 
      isCompleted: isCollateralsAligned 
    }
  ];

  return (
    <div className="flex flex-col h-[838px] bg-white dark:bg-gray-900 res-1200:h-[562px] res-1400:h-[655px] res-1600:h-[754px]">
      <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 res-1200:p-0.5 res-1400:p-1 res-1600:p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackClick}
          className="mr-2 res-1200:-mr-0.5 bg-transparent text-black hover:bg-transparent border-none shadow-none cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5 res-1200:h-3 res-1200:w-3" />
        </Button>
        <h2 className="text-xl font-semibold flex-grow res-1200:text-[14px] res-1400:text-[16px] res-1600:text-[18px]">
          Company USP
        </h2>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 res-1200:px-3 res-1200:py-1.5 res-1200:text-xs res-1400:px-4 res-1400:py-2 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600 bg-white dark:bg-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
            {tab.isCompleted && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
