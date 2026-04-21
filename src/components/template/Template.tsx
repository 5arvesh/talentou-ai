
import { ArrowLeft, File, Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

// Sample template data
const templates = [
  { id: 1, name: "Media Outreach Template", type: "Outreach", uploadedOn: "May 10, 2025", uploadedBy: "JD", initials: "JD" },
  { id: 2, name: "Press Release Template", type: "Media", uploadedOn: "May 8, 2025", uploadedBy: "AK", initials: "AK" },
  { id: 3, name: "Investor Pitch Template", type: "Outreach", uploadedOn: "May 5, 2025", uploadedBy: "LM", initials: "LM" },
  { id: 4, name: "Media Kit Guidelines", type: "Media", uploadedOn: "May 3, 2025", uploadedBy: "JD", initials: "JD" },
  { id: 5, name: "Social Media Campaign", type: "Outreach", uploadedOn: "Apr 28, 2025", uploadedBy: "TS", initials: "TS" },
  { id: 6, name: "Event Announcement", type: "Media", uploadedOn: "Apr 25, 2025", uploadedBy: "AK", initials: "AK" },
  { id: 7, name: "Industry Newsletter", type: "Outreach", uploadedOn: "Apr 20, 2025", uploadedBy: "LM", initials: "LM" },
  { id: 8, name: "Media Interview Guide", type: "Media", uploadedOn: "Apr 15, 2025", uploadedBy: "TS", initials: "TS" },
  { id: 9, name: "Partnership Announcement", type: "Outreach", uploadedOn: "Apr 10, 2025", uploadedBy: "JD", initials: "JD" },
];

export function Template() {
  const navigate = useNavigate();

  return (
    <div className="h-full py-6">
      {/* Title with back button */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-semibold">Template</h1>
      </div>
      
      {/* Tabbed filter header */}
      <Tabs defaultValue="media" className="w-full mb-6">
        <TabsList className="grid grid-cols-4 w-full bg-transparent">
          <TabsTrigger value="message" className="py-3 px-4 border-2 border-gray-200 dark:border-gray-700 data-[state=active]:border-orange-500 transition-all">
            Message / USP
          </TabsTrigger>
          <TabsTrigger value="market" className="py-3 px-4 border-2 border-gray-200 dark:border-gray-700 data-[state=active]:border-orange-500 transition-all">
            Market / Database
          </TabsTrigger>
          <TabsTrigger value="media" className="py-3 px-4 border-2 border-gray-200 dark:border-gray-700 data-[state=active]:border-orange-500 data-[state=active]:shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all">
            Media / Outreach
          </TabsTrigger>
          <TabsTrigger value="measure" className="py-3 px-4 border-2 border-gray-200 dark:border-gray-700 data-[state=active]:border-orange-500 transition-all">
            Measure / KPI
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Main content area with table */}
      <Card className="rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Template Name</TableHead>
                <TableHead className="w-[15%]">Type</TableHead>
                <TableHead className="w-[15%]">Uploaded On</TableHead>
                <TableHead className="w-[15%]">Uploaded By</TableHead>
                <TableHead className="w-[15%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <File className="h-4 w-4 mr-2 text-blue-500" />
                      {template.name}
                    </div>
                  </TableCell>
                  <TableCell>{template.type}</TableCell>
                  <TableCell>{template.uploadedOn}</TableCell>
                  <TableCell>
                    <Avatar className="h-8 w-8 bg-emerald-100 text-emerald-700">
                      <AvatarFallback>{template.initials}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <Pagination>
            <PaginationContent>
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-gray-500">1–9 of 9</span>
                <div className="flex items-center">
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                </div>
              </div>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
      
      {/* Action buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Suggest Feedback</Button>
        <Button variant="emerald">Continue</Button>
      </div>
    </div>
  );
}
