
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockCreditData = [
  { name: "Name 1", owner: "JO", credits: 50 },
  { name: "Name 2", owner: "AC", credits: 42 },
  { name: "Name 3", owner: "JJ", credits: 37 },
  { name: "Name 4", owner: "AK", credits: 25 },
  { name: "Name 5", owner: "VJ", credits: 10 },
];

export function CreditUsageSettings() {
  const [filterPeriod, setFilterPeriod] = useState("this-week");
  
  // Generate owner initials background color based on name
  const getInitialsColor = (initials: string) => {
    const colors = {
      "JO": "bg-green-200 text-green-800",
      "AC": "bg-orange-200 text-orange-800",
      "JJ": "bg-pink-200 text-pink-800",
      "AK": "bg-orange-200 text-orange-800",
      "VJ": "bg-orange-200 text-orange-800",
    };
    
    return colors[initials as keyof typeof colors] || "bg-gray-200 text-gray-800";
  };
  
  return (
    <>
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex border-b">
          <div className="pb-2 border-b-2 border-orange-500 text-orange-500 font-medium mr-6">
            Workspace
          </div>
          <div className="pb-2 text-gray-500 font-medium">
            Integrations
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <Select defaultValue="this-week">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="When" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
              <SelectItem value="last-month">Last month</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="this-week">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="This week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="last-week">Last week</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Integrations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Integrations</SelectItem>
              <SelectItem value="airtable">Airtable</SelectItem>
              <SelectItem value="anthropic">Anthropic</SelectItem>
              <SelectItem value="apify">Apify</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Owners" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="jo">Roney Soloman</SelectItem>
              <SelectItem value="ac">AC</SelectItem>
              <SelectItem value="jj">JJ</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Apply
          </Button>
          
          <div className="ml-auto flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="pl-9 h-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              Export
            </Button>
          </div>
        </div>
        
        {/* Credit Usage Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-1/3">Name</TableHead>
                <TableHead className="w-1/3">Owner</TableHead>
                <TableHead className="w-1/3">Usage</TableHead>
                <TableHead className="w-1/3 text-right">Credits Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCreditData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center justify-center rounded-full w-8 h-8 ${getInitialsColor(item.owner)}`}>
                      {item.owner}
                    </div>
                  </TableCell>
                  <TableCell></TableCell> 
                  <TableCell className="text-right">{item.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
