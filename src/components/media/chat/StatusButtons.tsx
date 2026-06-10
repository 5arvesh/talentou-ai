
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export function StatusButtons() {
  const navigate = useNavigate();

  const handleTabClick = (tabValue: string) => {
    switch (tabValue) {
      case "message":
        navigate("/ta-associate-plan/message-plan-chat");
        break;
      case "market":
        navigate("/ta-associate-plan/talent-pool");
        break;
      case "media":
        navigate("/ta-associate-plan/recruitment-channels");
        break;
      case "measure":
        navigate("/ta-associate-plan/success-metrics");
        break;
      default:
        break;
    }
  };

  return (
    <div className="my-4">
      <Tabs defaultValue="message" className="w-full">
        <TabsList className="w-full grid grid-cols-4 gap-2">
          <TabsTrigger 
            value="message"
            onClick={() => handleTabClick("message")}
            className="bg-success text-success-foreground font-bold py-2 px-4 rounded-lg shadow-sm cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-white mr-1 inline-block"></span> Company USP
          </TabsTrigger>
          
          <TabsTrigger 
            value="market"
            onClick={() => handleTabClick("market")}
            className="bg-muted/50 text-muted-foreground font-medium py-2 px-4 rounded-lg border border-muted data-[state=active]:bg-success data-[state=active]:text-success-foreground data-[state=active]:font-bold cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-muted-foreground mr-1 inline-block data-[state=active]:bg-white"></span> Talent Pool
          </TabsTrigger>
          
          <TabsTrigger 
            value="media"
            onClick={() => handleTabClick("media")}
            className="bg-muted/50 text-muted-foreground font-medium py-2 px-4 rounded-lg border border-muted data-[state=active]:bg-warning data-[state=active]:text-warning-foreground data-[state=active]:font-bold cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-muted-foreground mr-1 inline-block data-[state=active]:bg-white"></span> Recruitment Channels
          </TabsTrigger>
          
          <TabsTrigger 
            value="measure"
            onClick={() => handleTabClick("measure")}
            className="bg-muted/50 text-muted-foreground font-medium py-2 px-4 rounded-lg border border-muted data-[state=active]:bg-warning data-[state=active]:text-warning-foreground data-[state=active]:font-bold cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-muted-foreground mr-1 inline-block data-[state=active]:bg-white"></span> Success Metrics
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
