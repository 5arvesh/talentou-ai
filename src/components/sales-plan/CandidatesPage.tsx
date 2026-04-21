
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Mail, Copy, Play, ChevronLeft, ChevronRight, Filter, Plus } from "lucide-react";
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

interface Candidate {
  id: number;
  name: string;
  status: string;
  statusTooltip: string;
  hiringLead: string;
  interviewer: string;
}

export function CandidatesPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pinnedCandidates, setPinnedCandidates] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    status: "",
    hiringLead: "",
    interviewer: "",
  });

  const [allCandidates, setAllCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "John Smith",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Sarah Johnson",
      interviewer: "Mike Chen",
    },
    {
      id: 2,
      name: "Emily Davis",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "David Wilson",
      interviewer: "Lisa Zhang",
    },
    {
      id: 3,
      name: "Michael Brown",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Emma Rodriguez",
      interviewer: "John Smith",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "Alex Thompson",
      interviewer: "Maria Garcia",
    },
    {
      id: 5,
      name: "David Johnson",
      status: "Interviewed",
      statusTooltip: "Candidate has completed the interview process.",
      hiringLead: "Kevin Lee",
      interviewer: "Jennifer Brown",
    },
    {
      id: 6,
      name: "Jessica Lee",
      status: "Offered",
      statusTooltip: "Job offer has been extended to the candidate.",
      hiringLead: "Rachel Kim",
      interviewer: "Robert Taylor",
    },
    {
      id: 7,
      name: "Robert Taylor",
      status: "Rejected",
      statusTooltip: "Candidate was not selected for the position.",
      hiringLead: "Tom Anderson",
      interviewer: "Kelly Murphy",
    },
    {
      id: 8,
      name: "Lisa Chen",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Nina Patel",
      interviewer: "Chris Wilson",
    },
    {
      id: 9,
      name: "Alex Rodriguez",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "James Rodriguez",
      interviewer: "Amanda Davis",
    },
    {
      id: 10,
      name: "Maria Garcia",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "Sophie Chen",
      interviewer: "Michael Johnson",
    },
    {
      id: 11,
      name: "Chris Martinez",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Carlos Martinez",
      interviewer: "Jennifer Lee",
    },
    {
      id: 12,
      name: "Amanda White",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "Priya Sharma",
      interviewer: "David Kim",
    },
    {
      id: 13,
      name: "Kevin Park",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Lisa Park",
      interviewer: "Ryan Mitchell",
    },
    {
      id: 14,
      name: "Rachel Kim",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Mark Davis",
      interviewer: "Sarah Connor",
    },
    {
      id: 15,
      name: "Tom Foster",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "Amy Foster",
      interviewer: "Tom Brady",
    },
    {
      id: 16,
      name: "Jennifer White",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Jessica White",
      interviewer: "Paul Green",
    },
    {
      id: 17,
      name: "Paul Black",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "Robert Black",
      interviewer: "Linda Blue",
    },
    {
      id: 18,
      name: "Linda Lopez",
      status: "Accepted",
      statusTooltip: "Candidate has accepted the job offer.",
      hiringLead: "Maria Lopez",
      interviewer: "Steve Jobs",
    },
    {
      id: 19,
      name: "Steve Doe",
      status: "Withdrawn",
      statusTooltip: "Candidate has withdrawn from the application process.",
      hiringLead: "John Doe",
      interviewer: "Jane Smith",
    },
    {
      id: 20,
      name: "Jane Brown",
      status: "Rejected",
      statusTooltip: "Candidate was not selected for the position.",
      hiringLead: "Alice Brown",
      interviewer: "Bob Wilson",
    },
    {
      id: 21,
      name: "Bob Turner",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Michael Turner",
      interviewer: "Diana Prince",
    },
    {
      id: 22,
      name: "Diana Parker",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Peter Parker",
      interviewer: "Bruce Wayne",
    },
  ]);

  const statusOptions = [
    { value: "Applied", tooltip: "Candidate has submitted their application." },
    { value: "Under Review", tooltip: "Application is being reviewed by the hiring team." },
    { value: "Shortlisted", tooltip: "Candidate has been shortlisted for further evaluation." },
    { value: "Interview Scheduled", tooltip: "Interview has been scheduled with the candidate." },
    { value: "Interviewed", tooltip: "Candidate has completed the interview process." },
    { value: "Offered", tooltip: "Job offer has been extended to the candidate." },
    { value: "Accepted", tooltip: "Candidate has accepted the job offer." },
    { value: "Rejected", tooltip: "Candidate was not selected for the position." },
    { value: "Withdrawn", tooltip: "Candidate has withdrawn from the application process." },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";
      case "Under Review":
        return "bg-yellow-100 text-yellow-700";
      case "Shortlisted":
        return "bg-purple-100 text-purple-700";
      case "Interview Scheduled":
        return "bg-orange-100 text-orange-700";
      case "Interviewed":
        return "bg-indigo-100 text-indigo-700";
      case "Offered":
        return "bg-green-100 text-green-700";
      case "Accepted":
        return "bg-emerald-100 text-emerald-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Withdrawn":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusChange = (candidateId: number, newStatus: string) => {
    setAllCandidates(prevCandidates => 
      prevCandidates.map(candidate => 
        candidate.id === candidateId 
          ? { 
              ...candidate, 
              status: newStatus,
              statusTooltip: statusOptions.find(opt => opt.value === newStatus)?.tooltip || ""
            }
          : candidate
      )
    );
  };

  const handlePinToggle = (candidateId: number) => {
    const newPinnedCandidates = new Set(pinnedCandidates);
    if (pinnedCandidates.has(candidateId)) {
      newPinnedCandidates.delete(candidateId);
    } else {
      newPinnedCandidates.add(candidateId);
    }
    setPinnedCandidates(newPinnedCandidates);
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    const newPinned = new Set(pinnedCandidates);

    if (selectAll) {
      currentCandidates.forEach((candidate) => newPinned.delete(candidate.id));
    } else {
      currentCandidates.forEach((candidate) => newPinned.add(candidate.id));
    }

    setPinnedCandidates(newPinned);
    setSelectAll(!selectAll);
  };

  const handleCreateNewCandidate = () => {
    navigate("/sales-plan/candidates/create");
  };

  const itemsPerPage = 15;

  const filteredCandidates = allCandidates.filter((candidate) => {
    return (
      (filters.name === "" ||
        candidate.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.status === "" || candidate.status === filters.status) &&
      (filters.hiringLead === "" ||
        candidate.hiringLead
          .toLowerCase()
          .includes(filters.hiringLead.toLowerCase())) &&
      (filters.interviewer === "" ||
        candidate.interviewer
          .toLowerCase()
          .includes(filters.interviewer.toLowerCase()))
    );
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    const aIsPinned = pinnedCandidates.has(a.id);
    const bIsPinned = pinnedCandidates.has(b.id);
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = sortedCandidates.slice(startIndex, endIndex);

  useEffect(() => {
    const allSelected = currentCandidates.every((candidate) => pinnedCandidates.has(candidate.id));
    setSelectAll(allSelected);
  }, [pinnedCandidates, currentCandidates]);

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

  const getUniqueValues = (key: keyof (typeof allCandidates)[0]) => {
    const values = allCandidates.map((candidate) => String(candidate[key])).filter(Boolean);
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
                ? [
                    "Applied",
                    "Under Review",
                    "Shortlisted",
                    "Interview Scheduled",
                    "Interviewed",
                    "Offered",
                    "Accepted",
                    "Rejected",
                    "Withdrawn",
                  ].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))
                : getUniqueValues(
                    column === "name"
                      ? "name"
                      : column === "hiringLead"
                      ? "hiringLead"
                      : "interviewer"
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
          <h1 className="text-3xl font-bold text-gray-800">Candidates</h1>
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
                <TableHead>
                  <div className="flex items-center text-black">Name</div>
                </TableHead>
                <TableHead className="w-[200px]">
                  <div className="flex items-center text-black">Status</div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center text-black">
                    Hiring Lead
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center text-black">
                    Interviewer
                  </div>
                </TableHead>
                <TableHead className="text-center text-black">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCandidates.map((candidate) => (
                <TableRow key={candidate.id} className="h-12">
                  <TableCell className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handlePinToggle(candidate.id)}
                    >
                      <input
                        type="checkbox"
                        checked={pinnedCandidates.has(candidate.id)}
                        onChange={() => handlePinToggle(candidate.id)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium p-2">
                    {candidate.name}
                  </TableCell>
                  <TableCell className="p-2 w-[200px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full">
                          <Select
                            value={candidate.status}
                            onValueChange={(value) => handleStatusChange(candidate.id, value)}
                          >
                            <SelectTrigger className={`h-8 border-none shadow-none ${getStatusColor(candidate.status)} rounded-full text-xs font-medium`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(option.value)}`}>
                                    {option.value}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{candidate.statusTooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="p-2">{candidate.hiringLead}</TableCell>
                  <TableCell className="p-2">{candidate.interviewer}</TableCell>
                  <TableCell className="p-2">
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="px-2 h-8">
                        <Eye size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="px-2 h-8">
                        <Mail size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="px-2 h-8">
                        <Copy size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="px-2 h-8">
                        <Play size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-start">
          <Button
            onClick={handleCreateNewCandidate}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Candidate
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedCandidates.length)}{" "}
            of {sortedCandidates.length} results
            {filteredCandidates.length !== allCandidates.length && (
              <span className="text-blue-600 ml-2">
                (filtered from {allCandidates.length} total)
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
