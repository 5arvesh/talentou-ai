import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CompletedCardsTAAssociateProps {
  title: string;
  description: string[];
  className?: string;
  path?: string;
}

export const CompletedCardsTAAssociate = ({ 
  title, 
  description, 
  className, 
  path 
}: CompletedCardsTAAssociateProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className={cn("border-2 border-green-500 shadow-lg shadow-green-100 dark:shadow-green-900/20 h-[280px] flex flex-col", className)}>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-5">
          <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium px-3 py-2 rounded-full flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Aligned
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed flex-1">
          {description.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < description.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        
        <div className="flex justify-start">
          <Button 
            className="bg-white hover:bg-green-50 text-green-600 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-green-900/20 border border-green-500 px-4 py-2 text-sm"
            onClick={() => navigate(path)}
          >
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CompletedCardsTAAssociate;