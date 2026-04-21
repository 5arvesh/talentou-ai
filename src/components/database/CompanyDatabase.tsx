
import { useState } from "react";
import { SearchIcon, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CompanyTable } from "./CompanyTable";
import { CompanyPagination } from "./CompanyPagination";
import { useNavigate } from "react-router-dom";

export function CompanyDatabase() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost"
            size="sm" 
            className="bg-none"
            onClick={() => navigate("/market-database")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
          </Button>
          <h1 className="text-2xl font-semibold text-orange-500">Company Details</h1>
        </div>
        
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Search companies..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">576 Companies</span> added to the database
        </div>
        
        <div className="border rounded-md overflow-x-auto">
          <CompanyTable searchQuery={searchQuery} />
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing 1-10 of 576
          </div>
          
          <CompanyPagination />
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" className="text-gray-700 dark:text-gray-300">
            Suggest Feedback
          </Button>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Continue
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
