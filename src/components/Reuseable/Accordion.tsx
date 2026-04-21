
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionProps {
  bgclr: string;
  key: number;
  isCollapsed: boolean;
  title: string;
  content: string | JSX.Element;
  toggleCollapse: () => void;
  icon: React.ReactNode;
}

const CustomAccordion = ({
  bgclr,
  key,
  isCollapsed,
  title,
  content,
  toggleCollapse,
  icon,
}: AccordionProps) => {
  return (
    <div>
      <div
        key={key}
        className="p-3.5 flex items-center justify-between mt-1.5 rounded-md cursor-pointer res-1200:p-2 res-1400:p-2.5 res-1600:p-1.5"
        style={{backgroundColor: `${bgclr}1A`}} // 10% opacity
        onClick={toggleCollapse}
      >
        <div className="flex items-center gap-3 res-1200:gap-1.5 res-1400:gap-2 res-1600:gap-2.5">
          {icon && (
            <div 
              className="w-8 h-8 rounded-md flex items-center justify-center res-1200:w-5 res-1200:h-5 res-1400:w-6 res-1400:h-6 res-1600:w-7 res-1600:h-7"
              style={{backgroundColor: bgclr}}
            >
              <div className="text-white text-sm res-1200:text-xs res-1400:text-xs res-1600:text-sm">
                {icon}
              </div>
            </div>
          )}
          <div className="font-semibold dark:text-white text-[17px] res-1200:text-[11px] res-1400:text-[13px] res-1600:text-[15px]">
            {title}
          </div>
        </div>
        <div className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400">
          {!isCollapsed ? (
            <ChevronDown className="h-5 w-5 res-1200:h-3 res-1200:w-3 res-1400:h-4 res-1400:w-4" />
          ) : (
            <ChevronUp className="h-5 w-5 res-1200:h-3 res-1200:w-3 res-1400:h-4 res-1400:w-4" />
          )}
        </div>
      </div>
      {isCollapsed && (
        <div className="whitespace-pre-line p-1.5 leading-[1.4] text-base res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]">
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
