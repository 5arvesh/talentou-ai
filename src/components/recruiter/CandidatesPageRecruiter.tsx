import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ModernCandidateList, CandidateItem } from "../shared/ModernCandidateList";

interface Candidate {
  id: number;
  name: string;
  skill: string;
  role: string;
  status: string;
  statusTooltip: string;
  hiringLead: string;
  interviewer: string;
}

export function CandidatesPageRecruiter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedJobRole = searchParams.get("jobRole") || "all";
  const [currentPage, setCurrentPage] = useState(1);
  const [pinnedCandidates, setPinnedCandidates] = useState<Set<number>>(new Set());
  const [selectedCandidates, setSelectedCandidates] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mail drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [mailSentCandidates, setMailSentCandidates] = useState<Set<number>>(new Set());
  
  // Questionnaire form state
  const [questionnaireName, setQuestionnaireName] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [expiryTime, setExpiryTime] = useState("");

  const [filters, setFilters] = useState({
    name: "",
    skill: "",
    status: "",
    role: "",
    hiringLead: "",
    interviewer: "",
  });

  const [allCandidates, setAllCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "John Smith",
      skill: "React",
      role: "Senior Developer",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Sarah Johnson",
      interviewer: "Mike Chen",
    },
    {
      id: 2,
      name: "Emily Davis",
      skill: "Figma",
      role: "UX Designer",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "David Wilson",
      interviewer: "Lisa Zhang",
    },
    {
      id: 3,
      name: "Michael Brown",
      skill: "Node.js",
      role: "Backend Developer",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Emma Rodriguez",
      interviewer: "John Smith",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      skill: "Python",
      role: "Data Analyst",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "Alex Thompson",
      interviewer: "Maria Garcia",
    },
    {
      id: 5,
      name: "David Johnson",
      skill: "Selenium",
      role: "QA Engineer",
      status: "Interviewed",
      statusTooltip: "Candidate has completed the interview process.",
      hiringLead: "Kevin Lee",
      interviewer: "Jennifer Brown",
    },
    {
      id: 6,
      name: "Jessica Lee",
      skill: "Java",
      role: "Backend Developer",
      status: "Offered",
      statusTooltip: "Job offer has been extended to the candidate.",
      hiringLead: "Rachel Kim",
      interviewer: "Robert Taylor",
    },
    {
      id: 7,
      name: "Robert Taylor",
      skill: "Adobe XD",
      role: "UX Designer",
      status: "Rejected",
      statusTooltip: "Candidate was not selected for the position.",
      hiringLead: "Tom Anderson",
      interviewer: "Kelly Murphy",
    },
    {
      id: 8,
      name: "Lisa Chen",
      skill: "SQL",
      role: "Data Analyst",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Nina Patel",
      interviewer: "Chris Wilson",
    },
    {
      id: 9,
      name: "Alex Rodriguez",
      skill: "MongoDB",
      role: "Senior Developer",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "James Rodriguez",
      interviewer: "Amanda Davis",
    },
    {
      id: 10,
      name: "Maria Garcia",
      skill: "Jest",
      role: "QA Engineer",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "Sophie Chen",
      interviewer: "Michael Johnson",
    },
    {
      id: 11,
      name: "Chris Martinez",
      skill: "TypeScript",
      role: "Senior Developer",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Carlos Martinez",
      interviewer: "Jennifer Lee",
    },
    {
      id: 12,
      name: "Amanda White",
      skill: "Sketch",
      role: "UX Designer",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "Priya Sharma",
      interviewer: "David Kim",
    },
    {
      id: 13,
      name: "Kevin Park",
      skill: "Tableau",
      role: "Data Analyst",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Lisa Park",
      interviewer: "Ryan Mitchell",
    },
    {
      id: 14,
      name: "Rachel Kim",
      skill: "Express.js",
      role: "Backend Developer",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Mark Davis",
      interviewer: "Sarah Connor",
    },
    {
      id: 15,
      name: "Tom Foster",
      skill: "Cypress",
      role: "QA Engineer",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "Amy Foster",
      interviewer: "Tom Brady",
    },
    {
      id: 16,
      name: "Jennifer White",
      skill: "Vue.js",
      role: "Senior Developer",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Jessica White",
      interviewer: "Paul Green",
    },
    {
      id: 17,
      name: "Paul Black",
      skill: "Photoshop",
      role: "UX Designer",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "Robert Black",
      interviewer: "Linda Blue",
    },
    {
      id: 18,
      name: "Linda Lopez",
      skill: "Power BI",
      role: "Data Analyst",
      status: "Accepted",
      statusTooltip: "Candidate has accepted the job offer.",
      hiringLead: "Maria Lopez",
      interviewer: "Steve Jobs",
    },
    {
      id: 19,
      name: "Steve Doe",
      skill: "Django",
      role: "Backend Developer",
      status: "Withdrawn",
      statusTooltip: "Candidate has withdrawn from the application process.",
      hiringLead: "John Doe",
      interviewer: "Jane Smith",
    },
    {
      id: 20,
      name: "Jane Brown",
      skill: "Postman",
      role: "QA Engineer",
      status: "Rejected",
      statusTooltip: "Candidate was not selected for the position.",
      hiringLead: "Alice Brown",
      interviewer: "Bob Wilson",
    },
    {
      id: 21,
      name: "Bob Turner",
      skill: "Angular",
      role: "Senior Developer",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Michael Turner",
      interviewer: "Diana Prince",
    },
    {
      id: 22,
      name: "Diana Parker",
      skill: "Illustrator",
      role: "UX Designer",
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
    { value: "Sourced", tooltip: "Recruiter sourced the Candidate." },
    { value: "Interview Scheduled", tooltip: "Interview has been scheduled with the candidate." },
    { value: "Interviewed", tooltip: "Candidate has completed the interview process." },
    { value: "Offered", tooltip: "Job offer has been extended to the candidate." },
    { value: "Accepted", tooltip: "Candidate has accepted the job offer." },
    { value: "Rejected", tooltip: "Candidate was not selected for the position." },
    { value: "Decline", tooltip: "Candidate Rejected the offer." },
    { value: "Withdrawn", tooltip: "Candidate has withdrawn from the application process." },
  ];

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

  const handleCheckboxToggle = (candidateId: number) => {
    const newSelectedCandidates = new Set(selectedCandidates);
    if (selectedCandidates.has(candidateId)) {
      newSelectedCandidates.delete(candidateId);
    } else {
      newSelectedCandidates.add(candidateId);
    }
    setSelectedCandidates(newSelectedCandidates);
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    const newSelected = new Set(selectedCandidates);

    if (selectAll) {
      allCandidates.forEach((candidate) => newSelected.delete(candidate.id));
    } else {
      allCandidates.forEach((candidate) => newSelected.add(candidate.id));
    }

    setSelectedCandidates(newSelected);
    setSelectAll(!selectAll);
  };

  const handleCreateNewCandidate = () => {
    navigate("/ta-associate/candidates/create");
  };

  const handleMailClick = (candidate: Candidate) => {
    if (mailSentCandidates.has(candidate.id)) return;
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  const handleQuestionnaireSubmit = () => {
    if (!selectedCandidate || !questionnaireName || !expiryDate || !numberOfQuestions || !expiryTime) {
      return;
    }

    // Add candidate to mail sent list
    setMailSentCandidates(prev => new Set([...prev, selectedCandidate.id]));
    
    // Reset form
    setQuestionnaireName("");
    setExpiryDate(undefined);
    setNumberOfQuestions("");
    setExpiryTime("");
    setSelectedCandidate(null);
    setIsDrawerOpen(false);
  };

  const resetDrawerForm = () => {
    setQuestionnaireName("");
    setExpiryDate(undefined);
    setNumberOfQuestions("");
    setExpiryTime("");
    setSelectedCandidate(null);
  };

  const itemsPerPage = 15;

  const handleActionClick = (action: string, candidate: any) => {
    if (action === "schedule-interview") {
      handleMailClick(candidate);
    } else if (action === "view-profile") {
      navigate(`/ta-associate/candidate-profile/${candidate.id}`);
    } else if (action === "move-stage") {
      // Stub
    }
  };

  const formattedCandidates = allCandidates.map(c => ({
    id: c.id,
    name: c.name,
    yearsOfExperience: 2 + (c.id % 6),
    skills: [c.skill],
    roleFitScore: 70 + (c.id % 25),
    status: c.status,
    hasRecording: c.id % 3 === 0
  }));

  return (
    <>
      <ModernCandidateList 
        role="recruiter"
        candidates={formattedCandidates}
        onAction={(action, candidate) => handleActionClick(action, allCandidates.find(c => c.id === candidate.id))}
      />

      {/* Mail Questionnaire Sheet */}
      <Sheet open={isDrawerOpen} onOpenChange={(open) => {
          setIsDrawerOpen(open);
          if (!open) {
            resetDrawerForm();
          }
        }}>
          <SheetContent side="right" className="w-96">
            <SheetHeader>
              <SheetTitle>Send Questionnaire</SheetTitle>
              <SheetDescription>
                {selectedCandidate && `Send questionnaire to ${selectedCandidate.name}`}
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="questionnaire-name">Questionnaire Name</Label>
                <Input
                  id="questionnaire-name"
                  placeholder="Enter questionnaire name"
                  value={questionnaireName}
                  onChange={(e) => setQuestionnaireName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={setExpiryDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="number-of-questions">Number of Questions</Label>
                <Input
                  id="number-of-questions"
                  type="number"
                  placeholder="Enter number of questions"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(e.target.value)}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry-time">Expiry Time</Label>
                <Input
                  id="expiry-time"
                  type="time"
                  value={expiryTime}
                  onChange={(e) => setExpiryTime(e.target.value)}
                />
              </div>
            </div>

            <SheetFooter className="flex flex-col space-y-2">
              <Button 
                onClick={handleQuestionnaireSubmit}
                disabled={!questionnaireName || !expiryDate || !numberOfQuestions || !expiryTime}
                className="w-full"
              >
                Send Questionnaire
              </Button>
              <SheetClose asChild>
                <Button variant="outline" className="w-full">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
      </Sheet>
    </>
  );
}
