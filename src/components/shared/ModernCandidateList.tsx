import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronRight,
  ChevronDown,
  Eye,
  Video,
  FileText,
  Calendar,
  Edit,
  MoveRight,
  User,
  Settings,
  ArrowDownAZ,
  ArrowUpZA,
  ListFilter,
  Plus,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { RoleType } from "./ModernJobList";

export interface CandidateItem {
  id: string | number;
  name: string;
  yearsOfExperience?: string | number;
  skills: string[];
  roleFitScore: number;
  status: string;
  hasRecording?: boolean;
  isNew?: boolean;
  jobTitle?: string;

  // Extra optional fields for columns
  email?: string;
  phone?: string;
  location?: string;
  currentCTC?: string;
  expectedCTC?: string;
  earliestJoiningDate?: string;
}

interface ModernCandidateListProps {
  role: RoleType;
  candidates: CandidateItem[];
  title?: string;
  onAction?: (action: string, candidate: CandidateItem) => void;
}

type ColumnDef = {
  id: string;
  label: string;
};

const ALL_COLUMNS: ColumnDef[] = [
  { id: "name", label: "Candidate Name" },
  { id: "yearsOfExperience", label: "Experience" },
  { id: "skills", label: "Relevant Skills" },
  { id: "roleFitScore", label: "Role Fit Score" },
  { id: "status", label: "Status" },
  { id: "email", label: "Email ID" },
  { id: "phone", label: "Phone Number" },
  { id: "location", label: "Location" },
  { id: "currentCTC", label: "Current CTC" },
  { id: "expectedCTC", label: "Expected CTC" },
  { id: "earliestJoiningDate", label: "Earliest Joining Date" },
];

const DEFAULT_COLUMNS = ["name", "yearsOfExperience", "skills", "roleFitScore", "status"];

export function ModernCandidateList({ role, candidates, title = "Candidate List", onAction }: ModernCandidateListProps) {
  const navigate = useNavigate();
  const [globalSearch, setGlobalSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_COLUMNS);
  const [isColumnFilterOpen, setIsColumnFilterOpen] = useState(false);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>(DEFAULT_COLUMNS);
  
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc'|'desc' } | null>(null);

  const [selectedJob, setSelectedJob] = useState("All Jobs");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [globalSort, setGlobalSort] = useState("Match Score");
  const [viewedCandidates, setViewedCandidates] = useState<Set<string | number>>(new Set());

  // Derive filter options from data
  const uniqueJobs = useMemo(() => {
    const jobs = new Set<string>();
    candidates.forEach(c => { if (c.jobTitle) jobs.add(c.jobTitle); });
    return Array.from(jobs).sort();
  }, [candidates]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set<string>();
    candidates.forEach(c => statuses.add(c.status));
    return Array.from(statuses).sort();
  }, [candidates]);

  const getFieldValue = (candidate: CandidateItem, field: string): string => {
    if (field === 'name') return candidate.name;
    if (field === 'yearsOfExperience') return String(candidate.yearsOfExperience ?? "3");
    if (field === 'roleFitScore') return String(candidate.roleFitScore);
    if (field === 'status') return candidate.status;
    if (field === 'email') return candidate.email || `${candidate.name.toLowerCase().replace(' ', '.')}@example.com`;
    if (field === 'phone') return candidate.phone || "+1 (555) 000-0000";
    if (field === 'location') return candidate.location || "San Francisco, CA";
    if (field === 'currentCTC') return candidate.currentCTC || "$80,000";
    if (field === 'expectedCTC') return candidate.expectedCTC || "$100,000";
    if (field === 'earliestJoiningDate') return candidate.earliestJoiningDate || "Immediate";
    if (field === 'skills') return candidate.skills.join(", ");
    return String((candidate as any)[field] || "-");
  };

  const processedCandidates = useMemo(() => {
    let result = [...candidates];

    // Global Top Bar Filters
    if (selectedJob !== "All Jobs") {
      result = result.filter(c => c.jobTitle === selectedJob);
    }
    if (selectedStatus !== "All Statuses") {
      result = result.filter(c => c.status === selectedStatus);
    }
    if (globalSearch) {
      result = result.filter(candidate => 
        candidate.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(globalSearch.toLowerCase())) ||
        (candidate.email && candidate.email.toLowerCase().includes(globalSearch.toLowerCase()))
      );
    }

    // Column Filters
    Object.keys(columnFilters).forEach(key => {
      const allowedValues = columnFilters[key];
      if (allowedValues && allowedValues.length > 0 && !allowedValues.includes("___NONE___")) {
        result = result.filter(candidate => {
          if (key === 'skills') {
            return candidate.skills.some(s => allowedValues.includes(s));
          }
          return allowedValues.includes(getFieldValue(candidate, key));
        });
      } else if (allowedValues && allowedValues.includes("___NONE___")) {
        result = [];
      }
    });

    // Column Sort override Top Bar Sort if set
    if (sortConfig) {
      result.sort((a, b) => {
        const valA = getFieldValue(a, sortConfig.key);
        const valB = getFieldValue(b, sortConfig.key);
        const numA = parseFloat(valA.replace(/[^0-9.-]+/g,""));
        const numB = parseFloat(valB.replace(/[^0-9.-]+/g,""));
        if (!isNaN(numA) && !isNaN(numB) && valA.match(/\d/) && valB.match(/\d/)) {
          return sortConfig.direction === 'asc' ? numA - numB : numB - numA;
        }
        return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    } else {
      // Top Bar Global Sort
      if (globalSort === "Match Score") {
        result.sort((a, b) => b.roleFitScore - a.roleFitScore);
      } else if (globalSort === "Latest Added") {
        // Assume lower ID or isNew=true means latest for mock sorting
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return Number(b.id) - Number(a.id); // fallback ID numeric sort
        });
      } else if (globalSort === "Status") {
        result.sort((a, b) => a.status.localeCompare(b.status));
      }
    }

    return result;
  }, [candidates, globalSearch, columnFilters, sortConfig, selectedJob, selectedStatus, globalSort]);

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case "applied": return "bg-blue-50 text-blue-700 border-blue-200";
      case "sourced": return "bg-purple-50 text-purple-700 border-purple-200";
      case "review": 
      case "under review": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "shortlisted": return "bg-teal-50 text-teal-700 border-teal-200";
      case "interview": 
      case "interview scheduled": return "bg-orange-50 text-orange-700 border-orange-200";
      case "interviewed": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "offered": return "bg-green-50 text-green-700 border-green-200";
      case "accepted": return "bg-emerald-50 text-[#4EAD3B] border-[#4EAD3B]/20";
      case "rejected": 
      case "decline": return "bg-red-50 text-red-700 border-red-200";
      case "withdrawn": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getRoleFitColor = (score: number) => {
    if (score >= 70) return "text-[#4EAD3B]";
    if (score >= 40) return "text-yellow-600";
    return "text-red-500";
  };
  
  const getRoleFitBgColor = (score: number) => {
    if (score >= 70) return "bg-[#4EAD3B]/10";
    if (score >= 40) return "bg-yellow-100";
    return "bg-red-50";
  };

  const markAsViewed = (id: string | number) => {
    const newSet = new Set(viewedCandidates);
    newSet.add(id);
    setViewedCandidates(newSet);
  };

  const handleActionClick = (action: string, candidate: CandidateItem) => {
    markAsViewed(candidate.id);
    if (onAction) {
      onAction(action, candidate);
      return;
    }
    
    switch (action) {
      case "view-profile":
        if (role === "ta-leader") navigate(`/sales-plan/candidate-profile/${candidate.id}`);
        else if (role === "recruiter") navigate(`/ta-associate/candidate-profile/${candidate.id}`);
        else if (role === "hiring-lead") navigate(`/hiring-lead/candidate-profile/${candidate.id}`);
        else if (role === "interviewer") navigate(`/interviewer/candidate-profile/${candidate.id}`);
        break;
      case "schedule-interview":
        break;
      case "view-interview": {
        const nameParam = encodeURIComponent(candidate.name);
        if (role === "recruiter")
          navigate(`/ta-associate/candidates/interview/${candidate.id}?name=${nameParam}`);
        else if (role === "hiring-lead")
          navigate(`/hiring-lead/candidates/interview/${candidate.id}?name=${nameParam}`);
        break;
      }
    }
  };

  const ColumnHeaderMenu = ({ columnId, label }: { columnId: string, label: string }) => {
    const uniqueValues = useMemo(() => {
      let vals = new Set<string>();
      if (columnId === 'skills') {
        candidates.forEach(c => c.skills.forEach(s => vals.add(s)));
      } else {
        candidates.forEach(c => vals.add(getFieldValue(c, columnId)));
      }
      return Array.from(vals).filter(Boolean).sort();
    }, [candidates, columnId]);

    const [searchVal, setSearchVal] = useState("");
    const filteredVals = uniqueValues.filter(v => v.toLowerCase().includes(searchVal.toLowerCase()));
    const isAllSelected = !columnFilters[columnId] || columnFilters[columnId].length === 0;

    const toggleFilter = (val: string) => {
      let current = columnFilters[columnId] || [];
      if (current.length === 0) current = uniqueValues;
      
      let updated;
      if (current.includes(val)) updated = current.filter(v => v !== val);
      else updated = [...current, val];
      
      if (updated.length === 0) updated = ["___NONE___"];
      if (updated.length === uniqueValues.length) updated = [];
      
      setColumnFilters({ ...columnFilters, [columnId]: updated });
    };

    const handleSelectAll = () => {
      if (isAllSelected) setColumnFilters({ ...columnFilters, [columnId]: ["___NONE___"] });
      else setColumnFilters({ ...columnFilters, [columnId]: [] });
    };

    const handleSort = (dir: 'asc' | 'desc') => {
      setSortConfig({ key: columnId, direction: dir });
    };

    return (
      <Popover>
        <PopoverTrigger className="flex items-center gap-1 text-white hover:text-white/80 group outline-none py-1 mx-auto max-w-fit">
          <span className="font-semibold">{label}</span>
          <ChevronDown className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2 rounded-xl border border-gray-100 shadow-xl" align="start">
          <div className="space-y-1 mb-2">
            <Button variant="ghost" className="w-full justify-start h-8 text-sm" onClick={() => handleSort('asc')}>
              <ArrowDownAZ className="mr-2 h-4 w-4 text-gray-500" /> Sort A to Z
            </Button>
            <Button variant="ghost" className="w-full justify-start h-8 text-sm" onClick={() => handleSort('desc')}>
              <ArrowUpZA className="mr-2 h-4 w-4 text-gray-500" /> Sort Z to A
            </Button>
            <Button variant="ghost" className="w-full justify-start h-8 text-sm text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => {
              if (sortConfig?.key === columnId) setSortConfig(null);
              setColumnFilters({ ...columnFilters, [columnId]: [] });
            }}>
              Clear Filters
            </Button>
          </div>
          <div className="border-t border-gray-100 pt-2">
            <div className="px-1 mb-2 relative">
              <Search className="h-3 w-3 absolute left-3 top-2.5 text-gray-400" />
              <Input 
                placeholder="Search..." 
                value={searchVal} 
                onChange={e => setSearchVal(e.target.value)} 
                className="h-8 pl-8 text-sm bg-gray-50/50 border-gray-200 focus-visible:ring-[#7800D4]" 
              />
            </div>
            <div className="max-h-40 overflow-y-auto space-y-0.5 px-1 pb-1 custom-scrollbar">
              <div 
                className="flex items-center space-x-2 px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={handleSelectAll}
              >
                <input 
                  type="checkbox" 
                  checked={isAllSelected} 
                  onChange={handleSelectAll} 
                  className="rounded border-gray-300 text-[#7800D4] focus:ring-[#7800D4] cursor-pointer" 
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="text-sm text-gray-700">(Select All)</span>
              </div>
              {filteredVals.map(val => (
                <div 
                  key={val} 
                  className="flex items-center space-x-2 px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => toggleFilter(val)}
                >
                  <input 
                    type="checkbox" 
                    checked={isAllSelected || (columnFilters[columnId] && columnFilters[columnId].includes(val))} 
                    onChange={() => toggleFilter(val)} 
                    className="rounded border-gray-300 text-[#7800D4] focus:ring-[#7800D4] cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-sm text-gray-700 truncate" title={val}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <TooltipProvider>
      <div className="p-8 max-w-full mx-auto space-y-6 animate-in fade-in duration-500 overflow-x-hidden">
        
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
            <p className="text-gray-500 mt-1">Manage all candidates sourced or applied to open positions.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-[#4EAD3B] hover:bg-[#3e8a2f] text-white">
              <Plus className="h-4 w-4 mr-2" /> Add Candidate
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row items-center gap-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap grow">
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Job:</span>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="w-48 bg-white border-none shadow-none focus:ring-0 text-gray-900 h-9">
                  <SelectValue placeholder="All Jobs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Jobs">All Jobs</SelectItem>
                  {uniqueJobs.map(job => (
                    <SelectItem key={job} value={job}>{job}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40 bg-white border-none shadow-none focus:ring-0 text-gray-900 h-9">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Statuses">All Statuses</SelectItem>
                  {uniqueStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <Select value={globalSort} onValueChange={setGlobalSort}>
                <SelectTrigger className="w-40 bg-white border-none shadow-none focus:ring-0 text-gray-900 h-9">
                  <SelectValue placeholder="Match Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Match Score">Match Score</SelectItem>
                  <SelectItem value="Latest Added">Latest Added</SelectItem>
                  <SelectItem value="Status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
              <Popover 
                open={isColumnFilterOpen} 
                onOpenChange={(open) => {
                  if (open) setTempVisibleColumns(visibleColumns);
                  setIsColumnFilterOpen(open);
                }}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm ml-2">
                    <ListFilter className="mr-2 h-4 w-4" /> Columns
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-3 rounded-xl shadow-lg border-gray-100">
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    Toggle Columns
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-gray-100">
                    <Checkbox 
                      id="select-all-candidates" 
                      checked={tempVisibleColumns.length === ALL_COLUMNS.length}
                      onCheckedChange={(checked) => {
                        if (checked) setTempVisibleColumns(ALL_COLUMNS.map(c => c.id));
                        else setTempVisibleColumns([]);
                      }}
                    />
                    <label htmlFor="select-all-candidates" className="text-sm font-medium leading-none cursor-pointer">
                      Select All
                    </label>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {ALL_COLUMNS.map(col => (
                      <div key={col.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`col-cand-${col.id}`}
                          checked={tempVisibleColumns.includes(col.id)}
                          onCheckedChange={(checked) => {
                            if (checked) setTempVisibleColumns([...tempVisibleColumns, col.id]);
                            else setTempVisibleColumns(tempVisibleColumns.filter(c => c !== col.id));
                          }}
                        />
                        <label htmlFor={`col-cand-${col.id}`} className="text-sm leading-none cursor-pointer">
                          {col.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                     <Button 
                       size="sm" 
                       className="bg-[#7800D3] hover:bg-[#7800D3]/90 text-white w-full rounded-md"
                       onClick={() => {
                         setVisibleColumns(tempVisibleColumns);
                         setIsColumnFilterOpen(false);
                       }}
                     >
                       Apply
                     </Button>
                  </div>
                </PopoverContent>
              </Popover>

            <div className="relative w-full lg:w-72">
              <Input
                placeholder="Search by name, skills, or email..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="pl-4 pr-10 h-10 bg-white border-gray-200 shadow-sm focus-visible:ring-[#7800D4]"
              />
            </div>
          </div>
        </div>

        {/* Main Table Content */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto text-sm custom-scrollbar">
          <Table className="w-full min-w-max">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 border-b-0">
                {visibleColumns.map(colId => {
                  const colDef = ALL_COLUMNS.find(c => c.id === colId);
                  if (!colDef) return null;
                  const isCentered = ["roleFitScore", "status", "yearsOfExperience"].includes(colId);
                  return (
                    <TableHead key={colId} className={`whitespace-nowrap pb-3 pt-4 text-white ${isCentered ? 'text-center' : 'text-left'}`}>
                      <ColumnHeaderMenu columnId={colId} label={colDef.label} />
                    </TableHead>
                  );
                })}
                <TableHead className="w-16 text-center pr-6 pb-3 pt-4 font-semibold text-white outline-none">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedCandidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + 1} className="h-32 text-center text-gray-500">
                    No candidates found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                processedCandidates.map((candidate) => {
                  const isActuallyNew = candidate.isNew && !viewedCandidates.has(candidate.id);

                  return (
                    <TableRow 
                      key={candidate.id} 
                      className={cn(
                        "group hover:bg-gray-50/60 transition-colors border-b border-gray-50 cursor-pointer",
                        isActuallyNew ? "bg-[#e5f5ff]" : ""
                      )}
                      onClick={() => handleActionClick("view-profile", candidate)}
                    >
                      {visibleColumns.map(colId => {
                        const value = getFieldValue(candidate, colId);
                        
                        if (colId === "name") {
                          return (
                            <TableCell key={colId} className="font-medium text-gray-900 whitespace-nowrap py-3">
                              <div className="flex items-center gap-2">
                                {value}
                                {candidate.hasRecording && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Video className="h-4 w-4 text-[#7800D4]" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Video interview available</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </TableCell>
                          );
                        }
                        
                        if (colId === "skills") {
                          return (
                            <TableCell key={colId} className="py-3">
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.slice(0, 3).map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal text-xs px-2 py-0.5 border-none whitespace-nowrap rounded">
                                    {skill}
                                  </Badge>
                                ))}
                                {candidate.skills.length > 3 && (
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal text-xs px-2 py-0 border-none rounded">
                                    +{candidate.skills.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                          );
                        }
                        
                        if (colId === "roleFitScore") {
                          return (
                            <TableCell key={colId} className="py-3 whitespace-nowrap text-center">
                              <Badge variant="outline" className={cn("font-medium border-none px-2 rounded", getRoleFitColor(candidate.roleFitScore), getRoleFitBgColor(candidate.roleFitScore))}>
                                {value}%
                              </Badge>
                            </TableCell>
                          );
                        }
                        
                        if (colId === "status") {
                          return (
                            <TableCell key={colId} className="py-3 whitespace-nowrap">
                              <Badge variant="outline" className={cn("font-medium px-4 py-0.5 rounded-sm outline-none border-transparent", getStatusColor(value))}>
                                {value}
                              </Badge>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={colId} className="text-gray-600 py-3 whitespace-nowrap text-center">
                            {colId === "yearsOfExperience" ? `${value} Yrs` : value}
                          </TableCell>
                        );
                      })}
                    
                    <TableCell className="text-center pr-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-[#7800D4] hover:bg-[#7800D4]/10 transition-colors rounded-full"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 shadow-lg border-gray-100 rounded-xl">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleActionClick("view-profile", candidate); }} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2">
                              <User className="mr-2 h-4 w-4 opacity-70" />
                              View Profile
                            </DropdownMenuItem>

                            {(role === "recruiter" || role === "hiring-lead") && candidate.hasRecording && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleActionClick("view-interview", candidate); }} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2">
                                  <PlayCircle className="mr-2 h-4 w-4 opacity-70" />
                                  View Interview
                                </DropdownMenuItem>
                              </>
                            )}

                            {(role === "recruiter" || role === "ta-leader" || role === "hiring-lead") && (
                              <>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleActionClick("schedule-interview", candidate); }} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2">
                                  <Calendar className="mr-2 h-4 w-4 opacity-70" />
                                  Schedule Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleActionClick("move-stage", candidate); }} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2">
                                  <MoveRight className="mr-2 h-4 w-4 opacity-70" />
                                  Change Status
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
