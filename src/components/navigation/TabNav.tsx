
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Database, Share2, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavTab {
  label: string;
  value: string;
  icon: React.ElementType;
  path: string;
}

export function TabNav() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Debug log to see current pathname
  console.log("TabNav - Current pathname:", location.pathname);
  
  const tabs: NavTab[] = [
    { 
      label: "Company USP", 
      value: "message", 
      icon: MessageCircle, 
      path: "/ta-associate-plan/message-plan-chat" 
    },
    { 
      label: "Talent Pool", 
      value: "market", 
      icon: Database, 
      path: "/ta-associate-plan/talent-pool" 
    },
    { 
      label: "Recruitment Channel", 
      value: "media", 
      icon: Share2, 
      path: "/ta-associate-plan/recruitment-channel" 
    },
    { 
      label: "Success Metrics", 
      value: "measure", 
      icon: LineChart, 
      path: "/ta-associate-plan/success-metrics" 
    }
  ];
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    if (location.pathname === "/ta-associate-plan/message-plan-chat" || location.pathname.includes("value-proposition") || location.pathname.includes("collaterals")) {
      return "message";
    } else if (location.pathname.includes("talent-pool")) {
      return "market";
    } else if (location.pathname.includes("recruitment-channel")) {
      return "media";
    } else if (location.pathname.includes("measure") || location.pathname.includes("success-metrics")) {
      return "measure";
    }
    return "message"; // Default
  };
  
  const handleTabChange = (value: string) => {
    const tab = tabs.find(tab => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  // Don't show tabs on specific pages including template and hiring lead conversation
  const shouldHideTabs = location.pathname === "/" || 
      location.pathname === "/dashboard" || 
      location.pathname === "/sales-plan/message" ||
      location.pathname === "/sales-plan" || 
      location.pathname === "/chat" ||
      location.pathname === "/template" ||
      location.pathname === "/company-list" ||
      location.pathname === "/job-list" ||
      location.pathname === "/candidates" ||
      location.pathname === "/view-companyusp" ||
      location.pathname === "/view-talent-pool" ||
      location.pathname === "/view-recruitment-channel" ||
      location.pathname === "/view-success-metrics" ||
      location.pathname.includes("/company-detail") ||
      location.pathname.includes("/contacts") ||
      location.pathname === "/message" ||
      location.pathname.includes("/value-proposition") ||
      location.pathname.includes("/collaterals") ||
      location.pathname === "/hiring-lead/conversation";

  console.log("TabNav - Should hide tabs:", shouldHideTabs);

  if (shouldHideTabs) {
    return null;
  }

  return (
    <div>
      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full bg-transparent space-between gap-4">
          {tabs.map((tab) => {
            const isActive = getActiveTab() === tab.value;
            
            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className={cn(
                  "flex justify-start gap-4 py-3 px-4 border-2 data-[state=active]:border-brand-500 data-[state=inactive]:border-grey-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-grey-600 dark:data-[state=active]:text-brand-400  transition-all",
                  "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-1/4",
                  "focus:outline-none focus:ring-0"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}
