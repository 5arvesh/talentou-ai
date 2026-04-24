import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ModernCandidateList } from "../shared/ModernCandidateList";
import { BehavioralQuestionsDrawer, type BehavioralQuestion } from "./BehavioralQuestionsDrawer";
import { InterviewSchedulingDrawer } from "./InterviewSchedulingDrawer";

interface Candidate {
  id: number;
  name: string;
  skill: string;
  role: string;
  status: string;
  statusTooltip: string;
  hiringLead: string;
  interviewer?: string;
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
  const [mailSentCandidates, setMailSentCandidates] = useState<Set<number>>(new Set());

  // Drawer state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isBehavioralDrawerOpen, setIsBehavioralDrawerOpen] = useState(false);
  const [isSchedulingDrawerOpen, setIsSchedulingDrawerOpen] = useState(false);
  const [pendingBehavioralQuestions, setPendingBehavioralQuestions] = useState<BehavioralQuestion[]>([]);

  // Mock: whether behavioral questions are required for this job
  const behavioralQuestionsEnabled = true;
  const mockTechnicalMins = 11; // sum of the 3 AI-generated questions (4+2+5)
  const mockTotalDurationMins = 15;

  const [filters, setFilters] = useState({
    name: "",
    skill: "",
    status: "",
    role: "",
    hiringLead: "",
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
    },
    {
      id: 2,
      name: "Emily Davis",
      skill: "Figma",
      role: "UX Designer",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "David Wilson",
    },
    {
      id: 3,
      name: "Michael Brown",
      skill: "Node.js",
      role: "Backend Developer",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Emma Rodriguez",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      skill: "Python",
      role: "Data Scientist",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "James Taylor",
    },
    {
      id: 5,
      name: "David Martinez",
      skill: "Java",
      role: "Backend Developer",
      status: "Interviewed",
      statusTooltip: "Candidate has completed the interview process.",
      hiringLead: "Lisa Anderson",
    },
    {
      id: 6,
      name: "Jennifer Taylor",
      skill: "Angular",
      role: "Frontend Developer",
      status: "Offered",
      statusTooltip: "Job offer has been extended to the candidate.",
      hiringLead: "Robert Johnson",
    },
    {
      id: 7,
      name: "Robert Anderson",
      skill: "TypeScript",
      role: "Full Stack Developer",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Maria Garcia",
    },
    {
      id: 8,
      name: "Lisa Thompson",
      skill: "Vue.js",
      role: "Frontend Developer",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "Charles Brown",
    },
    {
      id: 9,
      name: "James Jackson",
      skill: "Kubernetes",
      role: "DevOps Engineer",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Patricia Davis",
    },
    {
      id: 10,
      name: "Patricia White",
      skill: "AWS",
      role: "Cloud Architect",
      status: "Accepted",
      statusTooltip: "Candidate has accepted the job offer.",
      hiringLead: "Thomas Wilson",
    },
    {
      id: 11,
      name: "Christopher Harris",
      skill: "React Native",
      role: "Mobile Developer",
      status: "Rejected",
      statusTooltip: "Candidate was not selected for the position.",
      hiringLead: "Barbara Martinez",
    },
    {
      id: 12,
      name: "Amanda Clark",
      skill: "Swift",
      role: "iOS Developer",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "William Anderson",
    },
    {
      id: 13,
      name: "Matthew Lewis",
      skill: "Kotlin",
      role: "Android Developer",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "Jennifer Taylor",
    },
    {
      id: 14,
      name: "Stephanie Robinson",
      skill: "PostgreSQL",
      role: "Database Administrator",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Anthony Thomas",
    },
    {
      id: 15,
      name: "Brandon Walker",
      skill: "Elasticsearch",
      role: "Backend Developer",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "Helen Jackson",
    },
    {
      id: 16,
      name: "Melissa Hall",
      skill: "Scala",
      role: "Data Engineer",
      status: "Interviewed",
      statusTooltip: "Candidate has completed the interview process.",
      hiringLead: "Kevin White",
    },
    {
      id: 17,
      name: "Daniel Young",
      skill: "Go",
      role: "Backend Developer",
      status: "Offered",
      statusTooltip: "Job offer has been extended to the candidate.",
      hiringLead: "Sandra Harris",
    },
    {
      id: 18,
      name: "Rachel King",
      skill: "Ruby",
      role: "Full Stack Developer",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      hiringLead: "Donald Lewis",
    },
    {
      id: 19,
      name: "Kevin Scott",
      skill: "Rust",
      role: "Systems Engineer",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      hiringLead: "Ashley Robinson",
    },
    {
      id: 20,
      name: "Jessica Green",
      skill: "TensorFlow",
      role: "ML Engineer",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Edward Walker",
    },
    {
      id: 21,
      name: "Ryan Adams",
      skill: "Docker",
      role: "DevOps Engineer",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      hiringLead: "Dorothy Hall",
    },
    {
      id: 22,
      name: "Diana Parker",
      skill: "Illustrator",
      role: "UX Designer",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      hiringLead: "Peter Parker",
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
              statusTooltip: statusOptions.find(opt => opt.value === newStatus)?.tooltip || "",
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
    setFilters(prev => ({ ...prev, [column]: value }));
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    const newSelected = new Set(selectedCandidates);
    if (selectAll) {
      allCandidates.forEach(candidate => newSelected.delete(candidate.id));
    } else {
      allCandidates.forEach(candidate => newSelected.add(candidate.id));
    }
    setSelectedCandidates(newSelected);
    setSelectAll(!selectAll);
  };

  const handleCreateNewCandidate = () => {
    navigate("/ta-associate/candidates/create");
  };

  const handleActionClick = (action: string, candidate: any) => {
    if (action === "schedule-interview") {
      const fullCandidate = allCandidates.find(c => c.id === candidate.id) || null;
      setSelectedCandidate(fullCandidate);
      if (behavioralQuestionsEnabled) {
        setIsBehavioralDrawerOpen(true);
      } else {
        setIsSchedulingDrawerOpen(true);
      }
    } else if (action === "view-profile") {
      navigate(`/ta-associate/candidate-profile/${candidate.id}`);
    } else if (action === "move-stage") {
      // Stub
    }
  };

  const handleBehavioralProceed = (questions: BehavioralQuestion[]) => {
    setPendingBehavioralQuestions(questions);
    setIsBehavioralDrawerOpen(false);
    setIsSchedulingDrawerOpen(true);
  };

  const handleBehavioralSkip = () => {
    setPendingBehavioralQuestions([]);
    setIsSchedulingDrawerOpen(true);
  };

  const handleSchedulingSubmit = () => {
    if (selectedCandidate) {
      setMailSentCandidates(prev => new Set([...prev, selectedCandidate.id]));
    }
    setSelectedCandidate(null);
    setPendingBehavioralQuestions([]);
    setIsSchedulingDrawerOpen(false);
  };

  const formattedCandidates = allCandidates.map(c => ({
    id: c.id,
    name: c.name,
    yearsOfExperience: 2 + (c.id % 6),
    skills: [c.skill],
    roleFitScore: 70 + (c.id % 25),
    status: c.status,
    hasRecording: c.id % 3 === 0,
  }));

  return (
    <>
      <ModernCandidateList
        role="recruiter"
        candidates={formattedCandidates}
        onAction={(action, candidate) =>
          handleActionClick(action, allCandidates.find(c => c.id === candidate.id))
        }
      />

      <BehavioralQuestionsDrawer
        isOpen={isBehavioralDrawerOpen}
        onClose={() => setIsBehavioralDrawerOpen(false)}
        candidateName={selectedCandidate?.name || ''}
        technicalMins={mockTechnicalMins}
        totalDurationMins={mockTotalDurationMins}
        onProceedToScheduling={handleBehavioralProceed}
        onSkip={handleBehavioralSkip}
      />

      <InterviewSchedulingDrawer
        isOpen={isSchedulingDrawerOpen}
        onClose={() => {
          setIsSchedulingDrawerOpen(false);
          setSelectedCandidate(null);
          setPendingBehavioralQuestions([]);
        }}
        candidateName={selectedCandidate?.name || ''}
        technicalMins={mockTechnicalMins}
        behavioralMins={pendingBehavioralQuestions.reduce((s, q) => s + q.estimatedMinutes, 0)}
        onSubmit={handleSchedulingSubmit}
      />
    </>
  );
}
