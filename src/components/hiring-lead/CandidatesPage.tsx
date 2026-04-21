import React, { useState } from "react";
import { ModernCandidateList } from "../shared/ModernCandidateList";

interface Candidate {
  id: number;
  name: string;
  skill: string;
  status: string;
  statusTooltip: string;
  recruiter: string;
  interviewer: string;
  jobRole: string;
}

interface CandidatesPageProps {
  role?: "hiring-lead" | "interviewer" | "ta-leader" | "recruiter";
}

export function CandidatesPage({ role = "hiring-lead" }: CandidatesPageProps = {}) {
  const [allCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "John Smith",
      skill: "React",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      recruiter: "Sarah Johnson",
      interviewer: "Mike Chen",
      jobRole: "Software Engineer",
    },
    {
      id: 2,
      name: "Emily Davis",
      skill: "Agile",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      recruiter: "David Wilson",
      interviewer: "Lisa Zhang",
      jobRole: "Product Manager",
    },
    {
      id: 3,
      name: "Michael Brown",
      skill: "Node.js",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      recruiter: "Emma Rodriguez",
      interviewer: "John Smith",
      jobRole: "Senior Developer",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      skill: "Figma",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      recruiter: "Alex Thompson",
      interviewer: "Maria Garcia",
      jobRole: "UX Designer",
    },
    {
      id: 5,
      name: "David Johnson",
      skill: "Python",
      status: "Interviewed",
      statusTooltip: "Candidate has completed the interview process.",
      recruiter: "Kevin Lee",
      interviewer: "Jennifer Brown",
      jobRole: "Data Analyst",
    },
    {
      id: 6,
      name: "Jessica Lee",
      skill: "Docker",
      status: "Offered",
      statusTooltip: "Job offer has been extended to the candidate.",
      recruiter: "Rachel Kim",
      interviewer: "Robert Taylor",
      jobRole: "DevOps Engineer",
    },
    {
      id: 7,
      name: "Robert Taylor",
      skill: "TypeScript",
      status: "Rejected",
      statusTooltip: "Candidate was not selected for the position.",
      recruiter: "Tom Anderson",
      interviewer: "Kelly Murphy",
      jobRole: "Frontend Developer",
    },
    {
      id: 8,
      name: "Lisa Chen",
      skill: "Selenium",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      recruiter: "Nina Patel",
      interviewer: "Chris Wilson",
      jobRole: "QA Engineer",
    },
    {
      id: 9,
      name: "Alex Rodriguez",
      skill: "Google Analytics",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      recruiter: "James Rodriguez",
      interviewer: "Amanda Davis",
      jobRole: "Marketing Manager",
    },
    {
      id: 10,
      name: "Maria Garcia",
      skill: "Salesforce",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      recruiter: "Sophie Chen",
      interviewer: "Michael Johnson",
      jobRole: "Sales Representative",
    },
    {
      id: 11,
      name: "Chris Martinez",
      skill: "Express.js",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      recruiter: "Carlos Martinez",
      interviewer: "Jennifer Lee",
      jobRole: "Backend Developer",
    },
    {
      id: 12,
      name: "Amanda White",
      skill: "TensorFlow",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      recruiter: "Priya Sharma",
      interviewer: "David Kim",
      jobRole: "Data Scientist",
    },
    {
      id: 13,
      name: "Kevin Park",
      skill: "React Native",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      recruiter: "Lisa Park",
      interviewer: "Ryan Mitchell",
      jobRole: "Mobile Developer",
    },
    {
      id: 14,
      name: "Rachel Kim",
      skill: "Cybersecurity",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      recruiter: "Mark Davis",
      interviewer: "Sarah Connor",
      jobRole: "Security Engineer",
    },
    {
      id: 15,
      name: "Tom Foster",
      skill: "Markdown",
      status: "Under Review",
      statusTooltip: "Application is being reviewed by the hiring team.",
      recruiter: "Amy Foster",
      interviewer: "Tom Brady",
      jobRole: "Technical Writer",
    },
    {
      id: 16,
      name: "Jennifer White",
      skill: "SQL",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      recruiter: "Jessica White",
      interviewer: "Paul Green",
      jobRole: "Business Analyst",
    },
    {
      id: 17,
      name: "Paul Black",
      skill: "AWS",
      status: "Interview Scheduled",
      statusTooltip: "Interview has been scheduled with the candidate.",
      recruiter: "Robert Black",
      interviewer: "Linda Blue",
      jobRole: "Cloud Architect",
    },
    {
      id: 18,
      name: "Linda Lopez",
      skill: "Jira",
      status: "Accepted",
      statusTooltip: "Candidate has accepted the job offer.",
      recruiter: "Maria Lopez",
      interviewer: "Steve Jobs",
      jobRole: "Scrum Master",
    },
    {
      id: 19,
      name: "Steve Doe",
      skill: "PostgreSQL",
      status: "Withdrawn",
      statusTooltip: "Candidate has withdrawn from the application process.",
      recruiter: "John Doe",
      interviewer: "Jane Smith",
      jobRole: "Database Administrator",
    },
    {
      id: 20,
      name: "Jane Brown",
      skill: "PyTorch",
      status: "Rejected",
      statusTooltip: "Candidate was not selected for the position.",
      recruiter: "Alice Brown",
      interviewer: "Bob Wilson",
      jobRole: "AI Engineer",
    },
    {
      id: 21,
      name: "Bob Turner",
      skill: "Cisco",
      status: "Applied",
      statusTooltip: "Candidate has submitted their application.",
      recruiter: "Michael Turner",
      interviewer: "Diana Prince",
      jobRole: "Network Engineer",
    },
    {
      id: 22,
      name: "Diana Parker",
      skill: "Linux",
      status: "Shortlisted",
      statusTooltip: "Candidate has been shortlisted for further evaluation.",
      recruiter: "Peter Parker",
      interviewer: "Bruce Wayne",
      jobRole: "System Administrator",
    },
  ]);

  const formattedCandidates = allCandidates.map((c) => ({
    id: c.id,
    name: c.name,
    yearsOfExperience: 3 + (c.id % 7),
    skills: [c.skill],
    roleFitScore: 65 + (c.id % 30),
    status: c.status,
    hasRecording: c.id % 2 === 0,
    jobTitle: c.jobRole,
  }));

  return (
    <ModernCandidateList
      role={role}
      candidates={formattedCandidates}
    />
  );
}
