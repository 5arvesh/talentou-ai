
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Filter, Search, ChevronDown, ChevronUp, FilePlus, Link } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export function RecruiterJobList() {
  const navigate = useNavigate();
  const [pinnedJobs, setPinnedJobs] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const [filters, setFilters] = useState({
    jobRole: "",
    project: "",
    status: "",
    hiringLead: "",
  });

  // Filter out Draft and Pending Approval jobs for recruiters
  const allJobs = [
    {
      id: 3,
      jobRole: "Senior Developer",
      project: "Core Services",
      requiredSkills: "Python, AWS, Docker",
      PrimarySkill: "Python",
      SecondarySkill: "AWS, Docker",
      Attributes: "Team Lead, Problem Solver",
      Location: "San Francisco, CA",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      expectedStartDate: "2024-02-15",
      hiringLead: "Emma Rodriguez",
      recruiter: "Sarah Johnson",
      interviewer: "John Smith",
      progress: 75,
      // Expandable details
      positions: 3,
      projectName: "Core Services Platform",
      workMode: "Hybrid",
      domain: "Technology",
      experience: "5-8 years",
      budget: "$90,000 - $120,000",
      preferredInstitutions: "MIT, Stanford, Berkeley",
      preferredCompanies: "Google, Microsoft, Amazon",
      sampleProfile: "Senior developer with backend expertise",
      responsibilities: "Design and develop scalable backend services",
      jdStatus: "Approved",
    },
    {
      id: 4,
      jobRole: "UX Designer",
      project: "Design System",
      requiredSkills: "Figma, User Research, Prototyping",
      PrimarySkill: "Figma",
      SecondarySkill: "User Research, Prototyping",
      Attributes: "Creative, User-Centric",
      Location: "New York, NY",
      status: "On Hold",
      statusTooltip: "Hiring temporarily paused; no new candidates are being sourced or progressed.",
      expectedStartDate: "2024-03-01",
      hiringLead: "Alex Thompson",
      recruiter: "Mike Chen",
      interviewer: "Maria Garcia",
      progress: 60,
      // Expandable details
      positions: 2,
      projectName: "Design System Revamp",
      workMode: "Remote",
      domain: "Design",
      experience: "3-5 years",
      budget: "$70,000 - $90,000",
      preferredInstitutions: "RISD, Art Center, Parsons",
      preferredCompanies: "Apple, Adobe, Airbnb",
      sampleProfile: "UX designer with design system experience",
      responsibilities: "Design and maintain the company's design system",
      jdStatus: "Pending Review",
    },
    {
      id: 5,
      jobRole: "Data Analyst",
      project: "Analytics Hub",
      requiredSkills: "SQL, Python, Tableau",
      PrimarySkill: "SQL",
      SecondarySkill: "Python, Tableau",
      Attributes: "Analytical, Detail-Oriented",
      Location: "Austin, TX",
      status: "Closed",
      statusTooltip: "The role is filled or the requirement is no longer active.",
      expectedStartDate: "2024-01-20",
      hiringLead: "Kevin Lee",
      recruiter: "Lisa Wong",
      interviewer: "Jennifer Brown",
      progress: 100,
      // Expandable details
      positions: 1,
      projectName: "Analytics Hub Development",
      workMode: "On-site",
      domain: "Data & Analytics",
      experience: "2-4 years",
      budget: "$60,000 - $80,000",
      preferredInstitutions: "UC Berkeley, UCLA, USC",
      preferredCompanies: "Facebook, Netflix, Uber",
      sampleProfile: "Data analyst with business intelligence experience",
      responsibilities: "Analyze data to drive business decisions",
      jdStatus: "Approved",
    },
    {
      id: 8,
      jobRole: "QA Engineer",
      project: "Testing Framework",
      requiredSkills: "Selenium, Testing, Automation",
      PrimarySkill: "Selenium",
      SecondarySkill: "Testing, Automation",
      Attributes: "Thorough, Quality-Focused",
      Location: "Seattle, WA",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      expectedStartDate: "2024-02-28",
      hiringLead: "Nina Patel",
      recruiter: "Tom Wilson",
      interviewer: "Chris Wilson",
      progress: 85,
      // Expandable details
      positions: 2,
      projectName: "Automated Testing Framework",
      workMode: "Hybrid",
      domain: "Quality Assurance",
      experience: "3-6 years",
      budget: "$75,000 - $95,000",
      preferredInstitutions: "Georgia Tech, UT Austin, Purdue",
      preferredCompanies: "Amazon, Microsoft, Oracle",
      sampleProfile: "QA engineer with automation expertise",
      responsibilities: "Develop and maintain automated testing frameworks",
      jdStatus: "Approved",
    },
    {
      id: 11,
      jobRole: "Backend Developer",
      project: "API Gateway",
      requiredSkills: "Java, Spring Boot, Microservices",
      PrimarySkill: "Java",
      SecondarySkill: "Spring Boot, Microservices",
      Attributes: "Scalable, Performance-Driven",
      Location: "Boston, MA",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      expectedStartDate: "2024-03-15",
      hiringLead: "Carlos Martinez",
      recruiter: "Anna Davis",
      interviewer: "Jennifer Lee",
      progress: 65,
      // Expandable details
      positions: 4,
      projectName: "API Gateway Infrastructure",
      workMode: "Remote",
      domain: "Backend Development",
      experience: "4-7 years",
      budget: "$85,000 - $110,000",
      preferredInstitutions: "Carnegie Mellon, MIT, Stanford",
      preferredCompanies: "Google, Amazon, LinkedIn",
      sampleProfile: "Backend developer with microservices experience",
      responsibilities: "Build and maintain scalable API infrastructure",
      jdStatus: "Approved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "On Hold":
        return "bg-orange-100 text-orange-700";
      case "Closed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handlePinToggle = (jobId: number) => {
    const newPinnedJobs = new Set(pinnedJobs);
    if (pinnedJobs.has(jobId)) {
      newPinnedJobs.delete(jobId);
    } else {
      newPinnedJobs.add(jobId);
    }
    setPinnedJobs(newPinnedJobs);
  };

  const toggleSelectAll = () => {
    const newPinned = new Set(pinnedJobs);

    if (selectAll) {
      // Unpin all currently shown jobs
      sortedJobs.forEach((job) => newPinned.delete(job.id));
    } else {
      // Pin all currently shown jobs
      sortedJobs.forEach((job) => newPinned.add(job.id));
    }

    setPinnedJobs(newPinned);
    setSelectAll(!selectAll);
  };

  const toggleRowExpansion = (jobId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(jobId)) {
      newExpandedRows.delete(jobId);
    } else {
      newExpandedRows.add(jobId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  };

  const handleEditJD = (jobId: number) => {
    navigate(`/recruiter/jd-conversation/${String(jobId).padStart(4, "0")}`);
  };

  const handleViewCandidates = (jobRole: string) => {
    navigate(`/ta-associate/candidates?jobRole=${encodeURIComponent(jobRole)}`);
  };

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = searchTerm === "" || 
      job.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(job.id).padStart(4, "0").includes(searchTerm);
    
    const matchesFilters = (
      (filters.jobRole === "" ||
        job.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase())) &&
      (filters.project === "" ||
        job.project.toLowerCase().includes(filters.project.toLowerCase())) &&
      (filters.status === "" || job.status === filters.status) &&
      (filters.hiringLead === "" ||
        job.hiringLead
          .toLowerCase()
          .includes(filters.hiringLead.toLowerCase()))
    );

    return matchesSearch && matchesFilters;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const aIsPinned = pinnedJobs.has(a.id);
    const bIsPinned = pinnedJobs.has(b.id);
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  // Show all filtered jobs, no pagination
  const currentJobs = sortedJobs;

  useEffect(() => {
    const allSelected = sortedJobs.every((job) => pinnedJobs.has(job.id));
    setSelectAll(allSelected);
  }, [pinnedJobs, sortedJobs]);

  const getUniqueValues = (key: keyof (typeof allJobs)[0]) => {
    const values = allJobs.map((job) => String(job[key])).filter(Boolean);
    return [...new Set(values)].sort();
  };

  const FilterPopover = ({
    column,
    placeholder,
  }: {
    column: keyof typeof filters;
    placeholder: string;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
          <Filter className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="start">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Filter {placeholder}</h4>
          <Select
            value={filters[column]}
            onValueChange={(value) => handleFilterChange(column, value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder={`All ${placeholder}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All {placeholder}</SelectItem>
              {column === "status"
                ? ["Active", "On Hold", "Closed"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))
                : getUniqueValues(
                    column === "jobRole"
                      ? "jobRole"
                      : column === "project"
                      ? "project"
                      : "hiringLead"
                  ).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="w-full h-7 text-xs"
            onClick={() => handleFilterChange(column, "")}
          >
            Clear Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Job List</h1>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by Job ID or Job Role..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="pl-10 pr-4"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="h-10">
                <TableHead>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </div>
                </TableHead>
                <TableHead>Expand</TableHead>
                <TableHead className="text-black">Job ID</TableHead>
                <TableHead className="text-black">Role</TableHead>
                <TableHead className="text-black">Job Status</TableHead>
                <TableHead className="text-black">Expected Start Date</TableHead>
                <TableHead className="text-black">Hiring Lead</TableHead>
                <TableHead className="text-black">Interviewer</TableHead>
                <TableHead className="text-center text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJobs.map((job) => (
                <React.Fragment key={job.id}>
                  <TableRow className="h-12">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={pinnedJobs.has(job.id)}
                        onChange={() => handlePinToggle(job.id)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleRowExpansion(job.id)}
                      >
                        {expandedRows.has(job.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium p-2">
                      #{String(job.id).padStart(4, "0")}
                    </TableCell>
                    <TableCell className="font-medium p-2">
                      {job.jobRole}
                    </TableCell>
                    <TableCell className="p-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-help ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {job.status}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{job.statusTooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="p-2">{job.expectedStartDate}</TableCell>
                    <TableCell className="p-2">{job.hiringLead}</TableCell>
                    <TableCell className="p-2">{job.recruiter}</TableCell>
                    <TableCell className="p-2">
                      <div className="flex justify-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="px-2 h-8"
                          onClick={() => handleEditJD(job.id)}
                        >
                          <FilePlus size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="px-2 h-8">
                          <Link size={14} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="px-2 h-8"
                          onClick={() => handleViewCandidates(job.jobRole)}
                        >
                          <Eye size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(job.id) && (
                    <TableRow className="w-12">
                        <TableCell colSpan={9} className="p-0">
                          <div className="bg-gray-50 pl-20 pr-4 py-4 border-t">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <span className="font-semibold text-gray-700">Positions:</span>
                                <p className="text-gray-600">{job.positions}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Project Name:</span>
                                <p className="text-gray-600">{job.projectName}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Work Mode:</span>
                                <p className="text-gray-600">{job.workMode}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Domain:</span>
                                <p className="text-gray-600">{job.domain}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Primary Skill:</span>
                                <p className="text-gray-600">{job.PrimarySkill}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Secondary Skill:</span>
                                <p className="text-gray-600">{job.SecondarySkill}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Attributes:</span>
                                <p className="text-gray-600">{job.Attributes}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Location:</span>
                                <p className="text-gray-600">{job.Location}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Experience:</span>
                                <p className="text-gray-600">{job.experience}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Budget:</span>
                                <p className="text-gray-600">{job.budget}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Preferred Institutions:</span>
                                <p className="text-gray-600">{job.preferredInstitutions}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Preferred Companies:</span>
                                <p className="text-gray-600">{job.preferredCompanies}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">JD Status:</span>
                                <p className="text-gray-600">{job.jdStatus}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Sample Profile:</span>
                                <p className="text-gray-600">{job.sampleProfile}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Responsibilities:</span>
                                <p className="text-gray-600">{job.responsibilities}</p>
                              </div>
                            </div>
                         </div>
                       </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing all {sortedJobs.length} results
            {filteredJobs.length !== allJobs.length && (
              <span className="text-blue-600 ml-2">
                (filtered from {allJobs.length} total)
              </span>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
