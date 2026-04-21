
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FeedbackChat } from "@/components/feedback/FeedbackChat";
import { FeedbackTable, FeedbackItem } from "@/components/feedback/FeedbackTable";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export function SuggestFeedback() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  // Example feedback items
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([
    {
      id: 1,
      feedback: "Our value proposition feels too generic. We should focus more on specific pain points for financial institutions.",
      response: "Great point. We're updating our messaging to highlight compliance savings and risk reduction specifically.",
      responseBy: "Emma Watson",
      responseByInitials: "EW",
      status: "responded",
      date: "2025-05-10"
    },
    {
      id: 2,
      feedback: "The outreach cadence is too aggressive for enterprise clients. We should extend the timelines for follow-ups.",
      status: "pending",
      date: "2025-05-12"
    }
  ]);

  const handleSubmitFeedback = (feedbackText: string) => {
    const newFeedback: FeedbackItem = {
      id: Date.now(),
      feedback: feedbackText,
      status: "pending",
      date: new Date().toISOString().split('T')[0]
    };
    
    setFeedbackItems([...feedbackItems, newFeedback]);
  };

  const handleViewFeedback = (id: number) => {
    const feedback = feedbackItems.find(item => item.id === id);
    if (feedback) {
      setSelectedFeedback(feedback);
      setIsDialogOpen(true);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      {/* Back button */}
      <div className="px-2 mt-4">
        <Button 
          variant="ghost" 
          onClick={handleGoBack} 
          className="px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </Button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-[calc(100vh-180px)]">
        {/* Left section - Chat interface */}
        <div className="w-full md:w-3/5 flex-grow bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm h-full">
          <FeedbackChat onSubmitFeedback={handleSubmitFeedback} />
        </div>

        {/* Right section - Feedback table */}
        <div className="w-full md:w-2/5 flex flex-col bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm h-full">
          {/* Collapsible Header */}
          <Collapsible open={!isCollapsed} onOpenChange={(open) => setIsCollapsed(!open)}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Measure of targets for database build</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            
            <CollapsibleContent className="h-full overflow-y-auto">
              <div className="p-4">
                <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 p-4 mb-4">
                  <p className="text-amber-800 dark:text-amber-300">
                    All feedback is shared with the sales team and will be reviewed within 48 hours.
                    Your insights help us improve our sales approach and messaging.
                  </p>
                </Card>

                <div className="mt-4">
                  <h4 className="font-semibold mb-3">Feedback History</h4>
                  <FeedbackTable 
                    feedbackItems={feedbackItems} 
                    onViewFeedback={handleViewFeedback} 
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Feedback Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedFeedback?.date}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Feedback</h4>
              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                {selectedFeedback?.feedback}
              </p>
            </div>

            {selectedFeedback?.status === "responded" && (
              <div>
                <h4 className="text-sm font-medium mb-1">Response</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6 bg-blue-600">
                    <AvatarFallback>{selectedFeedback.responseByInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{selectedFeedback.responseBy}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  {selectedFeedback.response}
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
            {selectedFeedback?.status === "pending" && (
              <div className="ml-auto text-amber-500 dark:text-amber-400 text-sm flex items-center">
                <span>Awaiting response</span>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

export default SuggestFeedback;
