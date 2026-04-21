
import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRightCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Mock data for the companies
const companyData = [
  { id: 1, industry: "Banking", name: "FirstTrust Bank", headquarters: "New York", revenue: "$250M", fitmentScore: 980 },
  { id: 2, industry: "Banking", name: "Atlantic Capital Group", headquarters: "New Jersey", revenue: "$800M", fitmentScore: 750 },
  { id: 3, industry: "Banking", name: "Pacific Wealth Bank", headquarters: "California", revenue: "$500M", fitmentScore: 430 },
  { id: 4, industry: "Banking", name: "Metro Financial Corp", headquarters: "New York", revenue: "$750M", fitmentScore: 800 },
  { id: 5, industry: "Banking", name: "Golden State Bank", headquarters: "California", revenue: "$120M", fitmentScore: 600 },
  { id: 6, industry: "Banking", name: "FirstTrust Bank", headquarters: "New York", revenue: "$250M", fitmentScore: 980 },
  { id: 7, industry: "Banking", name: "Atlantic Capital Group", headquarters: "New Jersey", revenue: "$800M", fitmentScore: 750 },
  { id: 8, industry: "Banking", name: "Metro Financial Corp", headquarters: "New York", revenue: "$750M", fitmentScore: 800 },
  { id: 9, industry: "Banking", name: "Pacific Wealth Bank", headquarters: "California", revenue: "$500M", fitmentScore: 430 },
  { id: 10, industry: "Banking", name: "Golden State Bank", headquarters: "California", revenue: "$120M", fitmentScore: 600 },
];

interface CompanyTableProps {
  searchQuery: string;
}

export function CompanyTable({ searchQuery }: CompanyTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter the data based on search query
  const filteredData = companyData.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFitmentColor = (score: number) => {
    if (score >= 800) return "bg-green-500";
    if (score >= 600) return "bg-orange-500";
    return "bg-red-500";
  };

  const getFitmentBarClass = (score: number) => {
    return cn(
      "h-5 rounded-md text-xs text-white font-medium flex items-center justify-end pr-2",
      getFitmentColor(score)
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleSort('industry')}
          >
            <div className="flex items-center">
              Industry
              {sortColumn === 'industry' && (sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleSort('name')}
          >
            <div className="flex items-center">
              Company Name
              {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleSort('headquarters')}
          >
            <div className="flex items-center">
              Headquarter
              {sortColumn === 'headquarters' && (sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleSort('revenue')}
          >
            <div className="flex items-center">
              Revenue
              {sortColumn === 'revenue' && (sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleSort('fitmentScore')}
          >
            <div className="flex items-center">
              Company Fitment Score <span className="text-xs text-gray-500 ml-1">(Out of 1000)</span>
              {sortColumn === 'fitmentScore' && (sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
            </div>
          </TableHead>
          <TableHead className="text-right">Read More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((company) => (
          <TableRow key={company.id}>
            <TableCell>{company.industry}</TableCell>
            <TableCell className="font-medium">{company.name}</TableCell>
            <TableCell>{company.headquarters}</TableCell>
            <TableCell>{company.revenue}</TableCell>
            <TableCell>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md">
                <div 
                  className={getFitmentBarClass(company.fitmentScore)}
                  style={{ width: `${(company.fitmentScore / 1000) * 100}%` }}
                >
                  {company.fitmentScore}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-8 w-8"
                onClick={() => navigate(`/company-detail/${company.id}`)}
              >
                <ArrowRightCircle className="h-5 w-5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
