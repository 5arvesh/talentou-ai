
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pen, ChevronLeft, ChevronRight, Pin, Filter, ChevronDown, ChevronUp } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function ProjectList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pinnedProjects, setPinnedProjects] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const [filters, setFilters] = useState({
    projectName: "",
    location: "",
    hiringLead: "",
  });

  const allProjects = [
    {
      id: 1,
      projectName: "Alpha Product Development",
      numberOfOpenings: 5,
      location: "Bangalore, India",
      hiringLead: "Sarah Johnson",
      created: "2024-01-15",
      modified: "2024-01-28",
      description: "Full-stack development project for a fintech client. Duration: 6 months. SOW includes frontend, backend, and database development.",
      hiringLeadEmail: "sarah.johnson@company.com",
      collaterals: ["Project_Brief.pdf", "Technical_Requirements.docx"],
      owner: "Sarah Johnson"
    },
    {
      id: 2,
      projectName: "Beta Platform Migration",
      numberOfOpenings: 3,
      location: "Mumbai, India",
      hiringLead: "David Wilson",
      created: "2024-01-20",
      modified: "2024-01-27",
      description: "Cloud migration project for enterprise client. Duration: 4 months. SOW includes AWS migration, security setup, and performance optimization.",
      hiringLeadEmail: "david.wilson@company.com",
      collaterals: ["Migration_Plan.pdf", "Security_Guidelines.docx"],
      owner: "David Wilson"
    },
    {
      id: 3,
      projectName: "Gamma Analytics Dashboard",
      numberOfOpenings: 2,
      location: "Hyderabad, India",
      hiringLead: "Emma Rodriguez",
      created: "2024-01-10",
      modified: "2024-01-26",
      description: "Data analytics dashboard for retail client. Duration: 3 months. SOW includes data visualization, reporting, and real-time analytics.",
      hiringLeadEmail: "emma.rodriguez@company.com",
      collaterals: ["Analytics_Spec.pdf", "Dashboard_Mockups.zip"],
      owner: "Emma Rodriguez"
    },
    {
      id: 4,
      projectName: "Delta Mobile App",
      numberOfOpenings: 4,
      location: "Chennai, India",
      hiringLead: "Alex Thompson",
      created: "2024-01-05",
      modified: "2024-01-25",
      description: "Mobile application development for healthcare client. Duration: 5 months. SOW includes iOS/Android app development and backend APIs.",
      hiringLeadEmail: "alex.thompson@company.com",
      collaterals: ["App_Requirements.pdf", "UI_Wireframes.fig"],
      owner: "Alex Thompson"
    },
    {
      id: 5,
      projectName: "Epsilon E-commerce Platform",
      numberOfOpenings: 6,
      location: "Pune, India",
      hiringLead: "Kevin Lee",
      created: "2024-01-12",
      modified: "2024-01-24",
      description: "E-commerce platform development for retail client. Duration: 8 months. SOW includes storefront, payment integration, and inventory management.",
      hiringLeadEmail: "kevin.lee@company.com",
      collaterals: ["Ecommerce_Spec.pdf", "Payment_Integration.docx"],
      owner: "Kevin Lee"
    },
    {
      id: 6,
      projectName: "Zeta Security Platform",
      numberOfOpenings: 3,
      location: "Delhi, India",
      hiringLead: "Rachel Kim",
      created: "2024-01-18",
      modified: "2024-01-23",
      description: "Cybersecurity platform for financial services client. Duration: 7 months. SOW includes threat detection, compliance monitoring, and incident response.",
      hiringLeadEmail: "rachel.kim@company.com",
      collaterals: ["Security_Architecture.pdf", "Compliance_Matrix.xlsx"],
      owner: "Rachel Kim"
    },
  ];

  const handlePinToggle = (projectId: number) => {
    const newPinnedProjects = new Set(pinnedProjects);
    if (pinnedProjects.has(projectId)) {
      newPinnedProjects.delete(projectId);
    } else {
      newPinnedProjects.add(projectId);
    }
    setPinnedProjects(newPinnedProjects);
  };

  const handleRowToggle = (projectId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(projectId)) {
      newExpandedRows.delete(projectId);
    } else {
      newExpandedRows.add(projectId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    const newPinned = new Set(pinnedProjects);

    if (selectAll) {
      currentProjects.forEach((project) => newPinned.delete(project.id));
    } else {
      currentProjects.forEach((project) => newPinned.add(project.id));
    }

    setPinnedProjects(newPinned);
    setSelectAll(!selectAll);
  };

  const itemsPerPage = 15;

  const filteredProjects = allProjects.filter((project) => {
    return (
      (filters.projectName === "" ||
        project.projectName.toLowerCase().includes(filters.projectName.toLowerCase())) &&
      (filters.location === "" ||
        project.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.hiringLead === "" ||
        project.hiringLead.toLowerCase().includes(filters.hiringLead.toLowerCase()))
    );
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aIsPinned = pinnedProjects.has(a.id);
    const bIsPinned = pinnedProjects.has(b.id);
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = sortedProjects.slice(startIndex, endIndex);

  useEffect(() => {
    const allSelected = currentProjects.every((project) => pinnedProjects.has(project.id));
    setSelectAll(allSelected);
  }, [pinnedProjects, currentProjects]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getUniqueValues = (key: keyof (typeof allProjects)[0]) => {
    const values = allProjects.map((project) => String(project[key])).filter(Boolean);
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
              {getUniqueValues(
                column === "projectName"
                  ? "projectName"
                  : column === "location"
                  ? "location"
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
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        </div>
        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="h-10">
                <TableHead className="w-12">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </div>
                </TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead className="text-black">
                  <div className="flex items-center">
                    Project Name
                    <FilterPopover column="projectName" placeholder="Project Name" />
                  </div>
                </TableHead>
                <TableHead className="text-black">No of Openings</TableHead>
                <TableHead className="text-black">
                  <div className="flex items-center">
                    Location
                    <FilterPopover column="location" placeholder="Location" />
                  </div>
                </TableHead>
                <TableHead className="text-black">
                  <div className="flex items-center">
                    Hiring Lead
                    <FilterPopover column="hiringLead" placeholder="Hiring Lead" />
                  </div>
                </TableHead>
                <TableHead className="text-black">Created</TableHead>
                <TableHead className="text-black">Modified</TableHead>
                <TableHead className="text-center text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProjects.map((project) => (
                <React.Fragment key={project.id}>
                  <TableRow className="h-12">
                    <TableCell className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePinToggle(project.id)}
                      >
                        <input
                          type="checkbox"
                          checked={pinnedProjects.has(project.id)}
                          onChange={() => handlePinToggle(project.id)}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="p-2">
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleRowToggle(project.id)}
                          >
                            {expandedRows.has(project.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </Collapsible>
                    </TableCell>
                    <TableCell className="font-medium p-2">
                      {project.projectName}
                    </TableCell>
                    <TableCell className="p-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {project.numberOfOpenings}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600 p-2">
                      {project.location}
                    </TableCell>
                    <TableCell className="p-2">{project.hiringLead}</TableCell>
                    <TableCell className="text-gray-600 p-2">
                      {project.created}
                    </TableCell>
                    <TableCell className="text-gray-600 p-2">
                      {project.modified}
                    </TableCell>
                    <TableCell className="p-2">
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm" className="px-2 h-8">
                          <Eye size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="px-2 h-8">
                          <Pen size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(project.id) && (
                    <TableRow>
                      <TableCell colSpan={9} className="p-4 bg-gray-50 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Project Description</h4>
                            <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                            
                            <h4 className="font-semibold text-gray-900 mb-2">Hiring Lead Contact</h4>
                            <p className="text-gray-600 text-sm mb-3">{project.hiringLeadEmail}</p>
                            
                            <h4 className="font-semibold text-gray-900 mb-2">Collaterals</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.collaterals.map((collateral, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {collateral}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Created</h4>
                            <p className="text-gray-600 text-sm mb-3">{project.created}</p>
                            
                            <h4 className="font-semibold text-gray-900 mb-2">Modified</h4>
                            <p className="text-gray-600 text-sm mb-3">{project.modified}</p>
                            
                            <h4 className="font-semibold text-gray-900 mb-2">Owner (Hiring Lead)</h4>
                            <p className="text-gray-600 text-sm">{project.owner}</p>
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
            Showing {startIndex + 1} to {Math.min(endIndex, sortedProjects.length)}{" "}
            of {sortedProjects.length} results
            {filteredProjects.length !== allProjects.length && (
              <span className="text-blue-600 ml-2">
                (filtered from {allProjects.length} total)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} />
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
