
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { ArrowUp, ArrowDown, ArrowRight, MoreHorizontal } from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();

  // Mock data for upcoming activities
  const activities = [
    { activity: "Follow-up", contact: "John Doe", company: "Apex Innovation", intent: 980, due: "Today", priority: "high" },
    { activity: "Review", contact: "Sarah Lee", company: "Nexa Inc", intent: 625, due: "Today", priority: "high" },
    { activity: "Connect", contact: "Alex Smith", company: "Stellar Solutions", intent: 690, due: "Tomorrow", priority: "high" },
    { activity: "Connect", contact: "Sophia Lee", company: "Nexus Technologies", intent: 720, due: "Tomorrow", priority: "high" },
    { activity: "Upcoming Meeting", contact: "Maria Gomez", company: "FinTech Corp", intent: 850, due: "Apr 08", priority: "medium" },
    { activity: "Call", contact: "Liam Patel", company: "Liam Patel", intent: 980, due: "Apr 08", priority: "medium" },
    { activity: "Upcoming Meeting", contact: "Justin Timberlake", company: "Nexa Innovations", intent: 625, due: "Apr 09", priority: "low" },
    { activity: "Call", contact: "Tom Brown", company: "Vertex Analytics", intent: 690, due: "Apr 09", priority: "low" },
  ];

  // Mock data for recently added database entries
  const recentCompanies = [
    { company: "Apex Innovations", contact: "Evelyn John", intent: 921 },
    { company: "Colber Inc.", contact: "Racheal Zeigler", intent: 877 },
    { company: "Tech Innovators Inc", contact: "John Doe", intent: 574 },
    { company: "Stellar Solutions", contact: "David Miller", intent: 306 },
    { company: "Nexus Technologies", contact: "Liam Patel", intent: 956 },
    { company: "FinTech Corp", contact: "Emma Johnson", intent: 411 },
    { company: "Nexa Innovations", contact: "Johnson", intent: 601 },
    { company: "Vertex Analytics", contact: "Patel", intent: 840 },
  ];

  // Handle navigation to the lead tracker
  const handleLeadTrackerClick = () => {
    navigate("/lead-tracker");
  };

  const getIntentColorClass = (intent: number) => {
    if (intent >= 800) return "bg-green-500 text-white";
    if (intent >= 600) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") return <ArrowUp className="text-red-500" />;
    if (priority === "medium") return <MoreHorizontal className="text-yellow-500" />;
    return <ArrowDown className="text-green-500" />;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-orange-500 mb-2">
          Hi Joseph <span className="inline-block">👋</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-4xl">
          Your sales leader set the strategy—now it's your turn to drive results. This dashboard gives you a snapshot of your lead database, buyer intent scores, and upcoming activities.
          With Piqual AI, every lead is an opportunity. Stay sharp, stay proactive, and close with confidence!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Activities Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Upcoming Activities</h2>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Buyer Intent</TableHead>
                  <TableHead>Due & Priority</TableHead>
                  <TableHead>Engage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.activity}</TableCell>
                    <TableCell>{item.contact}</TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>
                      <div className={`px-2 py-1 rounded text-center ${getIntentColorClass(item.intent)}`}>
                        {item.intent}
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center space-x-2">
                      <span>{item.due}</span>
                      {getPriorityIcon(item.priority)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        Act Now <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 1-8 of 64
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" aria-label="First">«</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" aria-label="Last">»</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        
        {/* Recently Added to Database Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recently added to the Database</h2>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Buyer Intent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCompanies.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{item.contact}</TableCell>
                    <TableCell>
                      <div className={`px-2 py-1 rounded text-center ${getIntentColorClass(item.intent)}`}>
                        {item.intent}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 1-8 of 50
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" aria-label="First">«</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">7</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" aria-label="Last">»</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      
      {/* Lead Tracker Button */}
      <div className="flex justify-center mt-4">
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg"
          onClick={handleLeadTrackerClick}
        >
          Lead Tracker
        </Button>
      </div>
    </div>
  );
}
