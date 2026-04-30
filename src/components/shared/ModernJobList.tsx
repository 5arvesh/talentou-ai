import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  Edit,
  Link as LinkIcon,
  ArrowDownAZ,
  ArrowUpZA,
  ListFilter,
  Globe,
  ClipboardList
} from "lucide-react";
import { RecruiterScreeningDrawer } from "@/components/recruiter/RecruiterScreeningDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type RoleType = "ta-leader" | "recruiter" | "hiring-lead";

export interface JobItem {
  id: string | number;
  jobRole: string;
  experience?: string;
  status: string;
  applicants?: number;
  priority?: "High" | "Medium" | "Low" | string;
  openings?: number;
  
  recruiter?: string;
  hiringLead?: string;
  interviewer?: string;
  budget?: string;
  daysOpen?: number;
  newApplicants?: number;
  
  project?: string;
  skills?: string[];
  location?: string;

  // Compatibility
  openCandidates?: number;
}

interface ModernJobListProps {
  role: RoleType;
  jobs: JobItem[];
  title?: string;
}

type ColumnDef = {
  id: string;
  label: string;
};

const ALL_COLUMNS: ColumnDef[] = [
  { id: "id", label: "Job ID" },
  { id: "jobRole", label: "Job Role" },
  { id: "experience", label: "Experience" },
  { id: "status", label: "Status" },
  { id: "applicants", label: "No. of Applicants" },
  { id: "priority", label: "Priority" },
  { id: "openings", label: "No. of Openings" },
  { id: "recruiter", label: "Recruiter Name" },
  { id: "hiringLead", label: "Hiring Lead Name" },
  { id: "interviewer", label: "Interviewer Name" },
  { id: "budget", label: "Budget" },
  { id: "daysOpen", label: "Days Open" },
  { id: "newApplicants", label: "New Applicants" },
  { id: "project", label: "Project" },
  { id: "skills", label: "Skills" },
  { id: "location", label: "Location" },
];

const DEFAULT_COLUMNS: Record<RoleType, string[]> = {
  "ta-leader": ["id", "jobRole", "experience", "status", "applicants", "priority", "openings"],
  "recruiter": ["id", "jobRole", "experience", "status", "applicants", "priority", "openings"],
  "hiring-lead": ["id", "jobRole", "experience", "status", "applicants", "openings"],
};

const DROPDOWN_FIELDS: Record<RoleType, string[]> = {
  "ta-leader": ["recruiter", "hiringLead", "budget", "daysOpen"],
  "recruiter": ["hiringLead", "budget", "newApplicants"],
  "hiring-lead": ["recruiter", "budget", "daysOpen"],
};

const FILTER_COLUMNS_AVAILABLE: Record<RoleType, string[]> = {
  "ta-leader": [...DEFAULT_COLUMNS["ta-leader"], ...DROPDOWN_FIELDS["ta-leader"], "project", "skills"],
  "recruiter": [...DEFAULT_COLUMNS["recruiter"], ...DROPDOWN_FIELDS["recruiter"], "project", "skills", "location"],
  "hiring-lead": [...DEFAULT_COLUMNS["hiring-lead"], ...DROPDOWN_FIELDS["hiring-lead"], "project", "skills", "location"],
};

export function ModernJobList({ role, jobs, title = "Job List" }: ModernJobListProps) {
  const navigate = useNavigate();
  const [globalSearch, setGlobalSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_COLUMNS[role]);
  const [isColumnFilterOpen, setIsColumnFilterOpen] = useState(false);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>(DEFAULT_COLUMNS[role]);
  const [expandedJobs, setExpandedJobs] = useState<Set<string | number>>(new Set());
  
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc'|'desc' } | null>(null);
  const [careersEnabled, setCareersEnabled] = useState<Record<string | number, boolean>>({});
  const [screeningDrawerJob, setScreeningDrawerJob] = useState<JobItem | null>(null);

  const isCareerEnabled = (job: JobItem) => {
    if (job.id in careersEnabled) return careersEnabled[job.id];
    return false;
  };

  const getFieldValue = (job: JobItem, field: string): string => {
    if (field === 'id') return String(job.id);
    if (field === 'jobRole') return job.jobRole;
    if (field === 'status') return job.status;
    if (field === 'priority') return job.priority || "High";
    if (field === 'experience') return job.experience || "3-5 Yrs";
    if (field === 'applicants') return String(job.applicants ?? job.openCandidates ?? Math.floor(Math.random() * 50) + 10);
    if (field === 'openings') return String(job.openings ?? Math.floor(Math.random() * 5) + 1);
    if (field === 'recruiter') return job.recruiter || "Sarah Johnson";
    if (field === 'hiringLead') return job.hiringLead || "Emma Rodriguez";
    if (field === 'interviewer') return job.interviewer || "Mike Chen";
    if (field === 'budget') return job.budget || "$90k - $120k";
    if (field === 'daysOpen') return String(job.daysOpen ?? 14);
    if (field === 'newApplicants') return String(job.newApplicants ?? 3);
    if (field === 'project') return job.project || "Core Product";
    if (field === 'skills') return job.skills ? job.skills.join(", ") : "React, TypeScript";
    if (field === 'location') return job.location || "San Francisco, CA";
    return String((job as any)[field] || "-");
  };

  const availableColumns = FILTER_COLUMNS_AVAILABLE[role] || DEFAULT_COLUMNS[role];

  // Global search & filtering
  const processedJobs = useMemo(() => {
    let result = [...jobs];

    // Global Search
    if (globalSearch) {
      result = result.filter(job => 
        String(job.id).toLowerCase().includes(globalSearch.toLowerCase()) ||
        job.jobRole.toLowerCase().includes(globalSearch.toLowerCase())
      );
    }

    // Column Filters
    Object.keys(columnFilters).forEach(key => {
      const allowedValues = columnFilters[key];
      if (allowedValues && allowedValues.length > 0 && !allowedValues.includes("___NONE___")) {
        result = result.filter(job => allowedValues.includes(getFieldValue(job, key)));
      } else if (allowedValues && allowedValues.includes("___NONE___")) {
        result = [];
      }
    });

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        const valA = getFieldValue(a, sortConfig.key);
        const valB = getFieldValue(b, sortConfig.key);
        // numeric sort if possible
        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        if (!isNaN(numA) && !isNaN(numB)) {
          return sortConfig.direction === 'asc' ? numA - numB : numB - numA;
        }
        return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }

    return result;
  }, [jobs, globalSearch, columnFilters, sortConfig]);

  const toggleExpand = (jobId: string | number) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobId)) newExpanded.delete(jobId);
    else newExpanded.add(jobId);
    setExpandedJobs(newExpanded);
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("active")) return "bg-[#4EAD3B]/10 text-[#4EAD3B] border-[#4EAD3B]/20";
    if (s.includes("pending")) return "bg-orange-100 text-orange-700 border-orange-200";
    if (s.includes("closed") || s.includes("cancel")) return "bg-gray-100 text-gray-700 border-gray-200";
    if (s.includes("hold")) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (s.includes("draft")) return "bg-[#7800D4]/10 text-[#7800D4] border-[#7800D4]/20";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getPriorityColor = (priority?: string) => {
    const p = (priority || "").toLowerCase();
    if (p === "high") return "bg-red-50 text-red-600 border-red-200";
    if (p === "medium") return "bg-yellow-50 text-yellow-600 border-yellow-200";
    if (p === "low") return "bg-[#4EAD3B]/10 text-[#4EAD3B] border-[#4EAD3B]/20";
    return "bg-gray-50 text-gray-600";
  };

  const handleAction = (action: string, job: JobItem) => {
    const encodedRole = encodeURIComponent(job.jobRole);
    switch (action) {
      case "view-candidate":
        if (role === "ta-leader") navigate(`/sales-plan/candidates?jobRole=${encodedRole}`);
        else if (role === "recruiter") navigate(`/ta-associate/candidates?jobId=${job.id}`);
        else if (role === "hiring-lead") navigate(`/hiring-lead/candidates?jobRole=${encodedRole}`);
        break;
      case "view-jd":
        if (role === "ta-leader") navigate(`/sales-plan/jd/${job.id}`);
        else if (role === "recruiter") navigate(`/ta-associate/jd/${job.id}`);
        else if (role === "hiring-lead") navigate(`/hiring-lead/jd/${job.id}`);
        break;
      case "edit-jd":
        navigate(`/hiring-lead/jd/${job.id}/edit`);
        break;
      case "copy-jd-link":
      case "generate-jd-link":
        const link = `${window.location.origin}/jd/${job.id}`;
        navigator.clipboard.writeText(link);
        toast.success("JD link copied to clipboard!");
        break;
    }
  };

  const ColumnHeaderMenu = ({ columnId, label }: { columnId: string, label: string }) => {
    const uniqueValues = useMemo(() => {
      const vals = new Set(jobs.map(j => getFieldValue(j, columnId)));
      return Array.from(vals).filter(Boolean).sort();
    }, [jobs, columnId]);

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
                className="h-8 pl-8 text-sm bg-gray-50/50 border-gray-200 focus-visible:ring-[#7800D4] focus-visible:ring-offset-0" 
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
    <div className="p-8 max-w-full mx-auto space-y-6 animate-in fade-in duration-500 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">Manage and track your open positions</p>
        </div>
        <div className="flex items-center gap-3">
          <Popover 
            open={isColumnFilterOpen} 
            onOpenChange={(open) => {
              if (open) setTempVisibleColumns(visibleColumns);
              setIsColumnFilterOpen(open);
            }}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm">
                <ListFilter className="mr-2 h-4 w-4" /> Columns
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-3 rounded-xl shadow-lg border-gray-100">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Toggle Columns
              </div>
              
              <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-gray-100">
                <Checkbox 
                  id="select-all-jobs" 
                  checked={tempVisibleColumns.length === availableColumns.length}
                  onCheckedChange={(checked) => {
                    if (checked) setTempVisibleColumns([...availableColumns]);
                    else setTempVisibleColumns([]);
                  }}
                />
                <label htmlFor="select-all-jobs" className="text-sm font-medium leading-none cursor-pointer">
                  Select All
                </label>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {availableColumns.map(colId => (
                  <div key={colId} className="flex items-center space-x-2">
                    <Checkbox
                      id={`col-${colId}`}
                      checked={tempVisibleColumns.includes(colId)}
                      onCheckedChange={(checked) => {
                        if (checked) setTempVisibleColumns([...tempVisibleColumns, colId]);
                        else setTempVisibleColumns(tempVisibleColumns.filter(c => c !== colId));
                      }}
                    />
                    <label htmlFor={`col-${colId}`} className="text-sm leading-none cursor-pointer">
                      {ALL_COLUMNS.find(c => c.id === colId)?.label}
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

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="pl-9 h-10 bg-white border-gray-200 shadow-sm focus-visible:ring-[#7800D4]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto text-sm custom-scrollbar">
        <Table className="w-full min-w-max">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 border-b-0">
              <TableHead className="w-12 text-center text-white"></TableHead>
              {visibleColumns.map((colId) => {
                const colDef = ALL_COLUMNS.find(c => c.id === colId);
                if (!colDef) return null;
                const isNumeric = ["applicants", "openings", "daysOpen", "newApplicants"].includes(colId);
                return (
                  <TableHead key={colId} className={`whitespace-nowrap pb-3 pt-4 text-white font-semibold ${isNumeric ? 'text-center' : 'text-left'}`}>
                    <ColumnHeaderMenu columnId={colId} label={colDef.label} />
                  </TableHead>
                );
              })}
              {role === "recruiter" && (
                <TableHead className="whitespace-nowrap pb-3 pt-4 text-white font-semibold text-left">
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 opacity-80" />
                    Careers
                  </div>
                </TableHead>
              )}
              <TableHead className="w-16 text-center pr-6 pb-3 pt-4 font-semibold text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + (role === "recruiter" ? 3 : 2)} className="h-32 text-center text-gray-500">
                  No jobs found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              processedJobs.map((job) => (
                <React.Fragment key={job.id}>
                  <TableRow 
                    className={cn(
                      "group hover:bg-gray-50/60 transition-colors border-b border-gray-50 cursor-pointer",
                      expandedJobs.has(job.id) ? "bg-gray-50/40" : ""
                    )}
                    onClick={() => toggleExpand(job.id)}
                  >
                    <TableCell className="w-12 text-center pr-0">
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-gray-400 hover:text-gray-900 focus:ring-0">
                        {expandedJobs.has(job.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>

                    {visibleColumns.map(colId => {
                      const value = getFieldValue(job, colId);
                      return (
                        <TableCell key={colId} className="py-3 whitespace-nowrap text-gray-700">
                          {colId === "id" ? (
                            <span className="font-semibold text-gray-900">#{String(value).replace('JOB-', '').padStart(4, "0")}</span>
                          ) : colId === "jobRole" ? (
                            <span className="font-medium text-gray-900">{value}</span>
                          ) : colId === "status" ? (
                            <Badge variant="outline" className={cn("font-medium px-2 py-0.5", getStatusColor(value))}>
                              {value}
                            </Badge>
                          ) : colId === "priority" ? (
                            value !== "-" ? (
                              <Badge variant="outline" className={cn("font-medium px-2 py-0.5", getPriorityColor(value))}>
                                {value}
                              </Badge>
                            ) : <span>-</span>
                          ) : colId === "applicants" || colId === "openings" || colId === "daysOpen" || colId === "newApplicants" ? (
                            <span className="font-medium">{value}</span>
                          ) : colId === "experience" ? `${value} Yrs` : value}
                        </TableCell>
                      );
                    })}
                    
                    {role === "recruiter" && (
                      <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="inline-flex">
                                <Switch
                                  checked={isCareerEnabled(job)}
                                  onCheckedChange={(checked) =>
                                    setCareersEnabled(prev => ({ ...prev, [job.id]: checked }))
                                  }
                                  className="data-[state=checked]:bg-[#4EAD3B] scale-90"
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Visible on careers page</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    )}
                    <TableCell className="text-right pr-4 py-3" onClick={(e) => e.stopPropagation()}>
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
                          <DropdownMenuItem onClick={() => handleAction("view-candidate", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2">
                            <Eye className="mr-2 h-4 w-4 opacity-70" />
                            View Candidates
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => handleAction("view-jd", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2">
                            <FileText className="mr-2 h-4 w-4 opacity-70" />
                            View JD
                          </DropdownMenuItem>
                          
                          {role === "hiring-lead" && (
                            <DropdownMenuItem onClick={() => handleAction("edit-jd", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2">
                              <Edit className="mr-2 h-4 w-4 opacity-70" />
                              Edit JD
                            </DropdownMenuItem>
                          )}
                          
                          {role === "recruiter" && (
                            <>
                              <DropdownMenuItem onClick={() => handleAction("generate-jd-link", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2">
                                <LinkIcon className="mr-2 h-4 w-4 opacity-70" />
                                Generate JD Link
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => { e.stopPropagation(); setScreeningDrawerJob(job); }}
                                className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-[#7800D4] py-2"
                              >
                                <ClipboardList className="mr-2 h-4 w-4 opacity-70" />
                                Screening Questions
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  
                  {expandedJobs.has(job.id) && (
                    <TableRow className="bg-gray-50/40 border-b border-gray-100/50 hover:bg-gray-50/40">
                      <TableCell colSpan={visibleColumns.length + (role === "recruiter" ? 3 : 2)} className="p-0 border-0">
                        <div className="py-4 px-12 animate-in slide-in-from-top-2 duration-300">
                          <div className="flex items-center gap-12 bg-white rounded-xl shadow-sm border border-gray-100 p-5 overflow-x-auto custom-scrollbar">
                            {(DROPDOWN_FIELDS[role] || DROPDOWN_FIELDS["ta-leader"]).map(fieldId => {
                              const colDef = ALL_COLUMNS.find(c => c.id === fieldId);
                              if (!colDef) return null;
                              return (
                                <div key={fieldId} className="flex flex-col flex-shrink-0 min-w-[140px]">
                                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                    {colDef.label}
                                  </span>
                                  <span className="text-sm font-medium text-gray-800">
                                    {getFieldValue(job, fieldId)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <RecruiterScreeningDrawer
        isOpen={!!screeningDrawerJob}
        onClose={() => setScreeningDrawerJob(null)}
        jobRole={screeningDrawerJob?.jobRole ?? ""}
      />

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #d1d5db; }
      `}} />
    </div>
  );
}
