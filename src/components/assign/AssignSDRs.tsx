
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { ChatHeader } from "@/components/media/chat/ChatHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function AssignSDRs() {
  const [emailId, setEmailId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (message.trim()) {
      toast.success("Message sent successfully!");
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader 
          title="Assign TA Team" 
          onBackClick={() => navigate("/sales-plan")}
        />
        
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Card className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#7800D3" }}>
                <span className="text-white font-semibold">P</span>
              </div>
              <div>
                <h3 className="font-semibold">Piqual AI</h3>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                Your talent strategy is live – let's refine and win! Talentou AI will provide real-time insights, uncover sourcing patterns, and suggest optimizations to keep you ahead in recruiting top talent.
              </p>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                As the TA Lead, you have defined your TA Plan. Let's get the TA team excited and onboarded.
              </p>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                Now that you have defined your Message and Market / Databases, it's time to
                proceed with onboarding and assigning your SDR to the designated geography
                and industry for your outreach initiative
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email ID
              </label>
              <Input 
                placeholder="Please provide the email id of your SDR" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full"
              />
            </div>
          </Card>
        </div>
        
        {/* Message input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              placeholder="Send a Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-green-500 hover:bg-green-600 aspect-square p-2"
              size="icon"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Right sidebar */}
      {/* <div className="w-96 h-full p-4 border-l border-gray-200 dark:border-gray-700 overflow-y-auto bg-blue-50 dark:bg-blue-950/20">
        <div className="mb-4">
          <Card className="p-4 bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Your Sales Plan So Far</h3>
              <button className="text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Message / USP</span>
                  <span className="text-sm">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Market / Database</span>
                  <span className="text-sm">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Media / Outreach</span>
                  <span className="text-sm">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Measure / KPI</span>
                  <span className="text-sm">100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-4 gap-1 mb-4">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-green-500 text-white border-green-600 hover:bg-green-600"
          >
            <span className="w-2 h-2 rounded-full bg-white mr-1"></span> Message
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-green-500 text-white border-green-600 hover:bg-green-600"
          >
            <span className="w-2 h-2 rounded-full bg-white mr-1"></span> Market
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-green-500 text-white border-green-600 hover:bg-green-600 text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white mr-1"></span> Media
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-green-500 text-white border-green-600 hover:bg-green-600"
          >
            <span className="w-2 h-2 rounded-full bg-white mr-1"></span> Measure
          </Button>
        </div>
        
        <Card className="p-4 bg-white dark:bg-gray-800">
          <h3 className="font-semibold mb-3">AI-led Digital Engineering</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Delivering Agentic AI for The Enterprise
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Ignitho AI, our suite of AI Agents, unlocks the power of Agentic AI, LLMs, Machine Learning and Gen AI, combining it with human expertise, to enable faster decision making and drive operational efficiency for our customers.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ignitho AI is backed by industry and tech experts with a track record of delivering results to global enterprises including Fortune 500 companies.
          </p>
        </Card>
      </div> */}
    </div>
  );
}
