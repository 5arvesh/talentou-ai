import React, { useState } from "react";
import { 
  PaperclipIcon, 
  Mic, 
  ArrowRightIcon,
  ChevronDown, 
  ChevronUp, 
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table,
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { setValuePropositionAligned, setCollateralsAligned } = useAlignment();

  // Sample data for the outreach activities
  const outreachActivities = [
    { company: "Colber Inc.", contact: "Cory", action: "Intro Email", status: "Done" },
    { company: "Vertex Solutions", contact: "Jordan", action: "1st Follow-up Email", status: "Done" },
    { company: "Tech Innovators Inc", contact: "Jamie", action: "2nd Follow-up Email", status: "Done" },
    { company: "Innovatech Solutions", contact: "Alex", action: "LinkedIn Connection", status: "Done" },
    { company: "SyncWorks Ltd.", contact: "Morgan", action: "Intro Email", status: "Not Delivered" },
    { company: "Victory Solutions", contact: "John", action: "1st Follow-up Email", status: "Done" },
    { company: "United Bank", contact: "Mathew", action: "Intro Call", status: "Done" },
    { company: "Ameris Bank", contact: "Alexandra", action: "1st Follow-up Email", status: "Done" },
    { company: "Techie Inc.", contact: "Jonathan", action: "LinkedIn Message", status: "Done" },
    { company: "Global Systems", contact: "Sarah", action: "Intro Email", status: "Not Reachable" },
  ];

  const getStatusClass = (status: string) => {
    switch(status) {
      case "Done":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Not Delivered":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "Not Reachable":
        return "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Mark message as aligned in context
    setValuePropositionAligned(true);
    // Also set collaterals as aligned to fully complete the Message/USP card
    setCollateralsAligned(true);
    
    // Clear the input
    setMessage("");
    
    // Navigate to sales plan after a short delay
    setTimeout(() => {
      navigate("/sales-plan");
    }, 1000);
  };

  return (
    <div className="flex h-full">
      {/* Left side - Chat panel */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {/* Chat Header with Bot Info */}
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-4 rounded-t-lg">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10 bg-emerald-600 text-white">
              <AvatarFallback>PA</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Piqual AI</h2>
          </div>
        </div>

        {/* Messages area (empty initially) */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Chat messages would go here */}
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a Message"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button variant="ghost" size="icon">
              <PaperclipIcon className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5 text-gray-500" />
            </Button>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSendMessage}
            >
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right side - Analytics panel */}
      <div className="w-1/3 bg-gray-50 dark:bg-gray-900 flex flex-col border-l border-gray-200 dark:border-gray-700 ml-4 rounded-lg shadow-sm">
        {/* Panel Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800 rounded-t-lg">
          <h3 className="text-lg font-semibold">Outreach Target via Media So Far</h3>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>

        {/* Panel Content */}
        {!isCollapsed && (
          <div className="p-4 overflow-auto">
            <Card className="mb-4">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">Email Touchpoints</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily</span>
                      <span>50/100</span>
                    </div>
                    <Progress 
                      value={50} 
                      className="h-2 bg-orange-100 dark:bg-orange-950"
                      style={{
                        background: "linear-gradient(to right, #f97316, #facc15)"
                      }}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weekly</span>
                      <span>120/500</span>
                    </div>
                    <Progress 
                      value={24} 
                      className="h-2 bg-red-100 dark:bg-red-950"
                      style={{
                        background: "linear-gradient(to right, #ef4444, #fca5a5)"
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Outreach */}
            <Tabs defaultValue="execution" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="execution">Outreach Execution</TabsTrigger>
                <TabsTrigger value="history">Outreach History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="execution">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-auto max-h-[400px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[120px]">
                              <div className="flex items-center justify-between">
                                <span>Company</span>
                                <MoreVertical size={16} className="text-gray-400" />
                              </div>
                            </TableHead>
                            <TableHead>
                              <div className="flex items-center justify-between">
                                <span>Contact</span>
                                <MoreVertical size={16} className="text-gray-400" />
                              </div>
                            </TableHead>
                            <TableHead>
                              <div className="flex items-center justify-between">
                                <span>Action</span>
                                <MoreVertical size={16} className="text-gray-400" />
                              </div>
                            </TableHead>
                            <TableHead className="text-right">
                              <div className="flex items-center justify-between">
                                <span>Status</span>
                                <MoreVertical size={16} className="text-gray-400" />
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {outreachActivities.map((activity, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{activity.company}</TableCell>
                              <TableCell>{activity.contact}</TableCell>
                              <TableCell>{activity.action}</TableCell>
                              <TableCell className="text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(activity.status)}`}>
                                  {activity.status}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="py-4 px-6 border-t border-gray-200 dark:border-gray-700">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious href="#" />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#" isActive>
                              1
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">
                              2
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">
                              3
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext href="#" />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardContent className="pt-6 flex items-center justify-center h-[200px] text-gray-500">
                    Outreach history will be shown here
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
