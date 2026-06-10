import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernCandidateList, CandidateItem } from "../shared/ModernCandidateList";
import { RecruiterScheduleDrawer } from "../recruiter/RecruiterScheduleDrawer";
import { BulkUploadModal } from "../candidates/BulkUploadModal";
import { useTourStore } from "@/store/tour-store";

const CANDIDATES_TOUR_STEPS = [
  {
    title: "Your candidate pipeline is here",
    description: "Every candidate for your open roles is listed in this table. The Job Fit Score shows how well each candidate matches the position requirements.",
    targetSelector: '[data-tour-id="candidate-list"]',
  },
  {
    title: "Search, filter & sort candidates",
    description: "Use the search bar to find candidates by name, skill, or email. Filter by job, status, or score. Toggle column visibility to customise your view.",
    targetSelector: '[data-tour-id="candidate-list"]',
  },
  {
    title: "Quick-action buttons on every row",
    description: "Use the phone and email icons to copy contact info instantly. The LinkedIn icon opens their profile. The dropdown menu has more actions like scheduling and status changes.",
    targetSelector: '[data-tour-id="candidate-list"]',
  },
];

interface Candidate {
  id: number;
  name: string;
  skills: string[];
  currentTitle: string;
  status: string;
  statusTooltip: string;
  recruiter: string;
  interviewer?: string;
  jobRole: string;
}

interface CandidatesPageProps {
  role?: "hiring-lead" | "ta-leader" | "recruiter";
}

const MOCK_TECHNICAL_MINS = 11;
const MOCK_TOTAL_DURATION = 15;

export function CandidatesPage({ role = "hiring-lead" }: CandidatesPageProps = {}) {
  const [allCandidates] = useState<Candidate[]>([
    { id: 1, name: "John Smith", skills: ["React", "JavaScript", "Redux", "CSS"], currentTitle: "Software Developer", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Sarah Johnson", jobRole: "Software Engineer" },
    { id: 2, name: "Emily Davis", skills: ["Agile", "Scrum", "Roadmapping", "Stakeholder Management"], currentTitle: "Associate Product Manager", status: "Under Review", statusTooltip: "Application is being reviewed by the hiring team.", recruiter: "David Wilson", jobRole: "Product Manager" },
    { id: 3, name: "Michael Brown", skills: ["Node.js", "Express", "MongoDB", "REST APIs"], currentTitle: "Backend Developer", status: "Shortlisted", statusTooltip: "Candidate has been shortlisted for further evaluation.", recruiter: "Emma Rodriguez", jobRole: "Senior Developer" },
    { id: 4, name: "Sarah Wilson", skills: ["Figma", "Sketch", "Prototyping", "User Research"], currentTitle: "UI Designer", status: "Interview Scheduled", statusTooltip: "Interview has been scheduled with the candidate.", recruiter: "Alex Thompson", jobRole: "UX Designer" },
    { id: 5, name: "David Johnson", skills: ["Python", "Pandas", "SQL", "Data Visualization"], currentTitle: "Data Analyst", status: "Interviewed", statusTooltip: "Candidate has completed the interview process.", recruiter: "Kevin Lee", jobRole: "Data Analyst" },
    { id: 6, name: "Jessica Lee", skills: ["Docker", "Kubernetes", "CI/CD", "AWS"], currentTitle: "Site Reliability Engineer", status: "Offered", statusTooltip: "Job offer has been extended to the candidate.", recruiter: "Rachel Kim", jobRole: "DevOps Engineer" },
    { id: 7, name: "Robert Taylor", skills: ["TypeScript", "React", "Next.js", "GraphQL"], currentTitle: "Frontend Developer", status: "Rejected", statusTooltip: "Candidate was not selected for the position.", recruiter: "Tom Anderson", jobRole: "Frontend Developer" },
    { id: 8, name: "Lisa Chen", skills: ["Selenium", "Cypress", "Test Automation", "JIRA"], currentTitle: "QA Analyst", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Nina Patel", jobRole: "QA Engineer" },
    { id: 9, name: "Alex Rodriguez", skills: ["Google Analytics", "SEO", "Content Strategy", "A/B Testing"], currentTitle: "Marketing Specialist", status: "Shortlisted", statusTooltip: "Candidate has been shortlisted for further evaluation.", recruiter: "James Rodriguez", jobRole: "Marketing Manager" },
    { id: 10, name: "Maria Garcia", skills: ["Salesforce", "CRM", "Lead Generation", "Negotiation"], currentTitle: "Sales Executive", status: "Under Review", statusTooltip: "Application is being reviewed by the hiring team.", recruiter: "Sophie Chen", jobRole: "Sales Representative" },
    { id: 11, name: "Chris Martinez", skills: ["Express.js", "Node.js", "PostgreSQL", "Docker"], currentTitle: "Software Engineer", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Carlos Martinez", jobRole: "Backend Developer" },
    { id: 12, name: "Amanda White", skills: ["TensorFlow", "Python", "PyTorch", "Deep Learning"], currentTitle: "ML Engineer", status: "Interview Scheduled", statusTooltip: "Interview has been scheduled with the candidate.", recruiter: "Priya Sharma", jobRole: "Data Scientist" },
    { id: 13, name: "Kevin Park", skills: ["React Native", "iOS", "Android", "Redux"], currentTitle: "Mobile App Developer", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Lisa Park", jobRole: "Mobile Developer" },
    { id: 14, name: "Rachel Kim", skills: ["Cybersecurity", "Penetration Testing", "SIEM", "Network Security"], currentTitle: "Security Analyst", status: "Shortlisted", statusTooltip: "Candidate has been shortlisted for further evaluation.", recruiter: "Mark Davis", jobRole: "Security Engineer" },
    { id: 15, name: "Tom Foster", skills: ["Markdown", "Technical Writing", "API Documentation", "Confluence"], currentTitle: "Technical Writer", status: "Under Review", statusTooltip: "Application is being reviewed by the hiring team.", recruiter: "Amy Foster", jobRole: "Technical Writer" },
    { id: 16, name: "Jennifer White", skills: ["SQL", "Power BI", "Excel", "Business Analysis"], currentTitle: "Business Systems Analyst", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Jessica White", jobRole: "Business Analyst" },
    { id: 17, name: "Paul Black", skills: ["AWS", "Terraform", "Linux", "CI/CD"], currentTitle: "Cloud Engineer", status: "Interview Scheduled", statusTooltip: "Interview has been scheduled with the candidate.", recruiter: "Robert Black", jobRole: "Cloud Architect" },
    { id: 18, name: "Linda Lopez", skills: ["Jira", "Confluence", "Agile", "Project Management"], currentTitle: "Project Coordinator", status: "Offer Accepted", statusTooltip: "Candidate has accepted the job offer.", recruiter: "Maria Lopez", jobRole: "Scrum Master" },
    { id: 19, name: "Steve Doe", skills: ["PostgreSQL", "MySQL", "Database Tuning", "Backup & Recovery"], currentTitle: "Database Developer", status: "Withdrawn", statusTooltip: "Candidate has withdrawn from the application process.", recruiter: "John Doe", jobRole: "Database Administrator" },
    { id: 20, name: "Jane Brown", skills: ["PyTorch", "Python", "Computer Vision", "NLP"], currentTitle: "Research Engineer", status: "Rejected", statusTooltip: "Candidate was not selected for the position.", recruiter: "Alice Brown", jobRole: "AI Engineer" },
    { id: 21, name: "Bob Turner", skills: ["Cisco", "Networking", "TCP/IP", "Firewall Configuration"], currentTitle: "Network Administrator", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Michael Turner", jobRole: "Network Engineer" },
    { id: 22, name: "Diana Parker", skills: ["Linux", "Bash Scripting", "Ansible", "Monitoring"], currentTitle: "Systems Engineer", status: "Shortlisted", statusTooltip: "Candidate has been shortlisted for further evaluation.", recruiter: "Peter Parker", jobRole: "System Administrator" },
    { id: 23, name: "Olivia Martinez", skills: ["GraphQL", "React", "Node.js", "AWS"], currentTitle: "Full Stack Developer", status: "Hired", statusTooltip: "Candidate has been hired and has joined the company.", recruiter: "Diana Prince", jobRole: "Full Stack Developer" },
    { id: 24, name: "Henry Adams", skills: ["Vue.js", "JavaScript", "CSS", "REST APIs"], currentTitle: "Frontend Developer", status: "Offer Declined", statusTooltip: "Candidate declined the job offer.", recruiter: "Sophie Chen", jobRole: "Sales Representative" },
  ]);

  // Multi-select state (recruiter only)
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  // Schedule drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCandidates, setDrawerCandidates] = useState<Array<{ id: string | number; name: string; jobTitle?: string }>>([]);

  const isRecruiter = role === "recruiter";
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("candidates", CANDIDATES_TOUR_STEPS);
  }, []);

  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  const handleAddCandidate = () => {
    setBulkModalOpen(true);
  };

  const formattedCandidates = allCandidates.map((c) => ({
    id: c.id,
    name: c.name,
    yearsOfExperience: 3 + (c.id % 7),
    skills: c.skills,
    currentTitle: c.currentTitle,
    roleFitScore: 65 + (c.id % 30),
    status: c.status,
    hasRecording: c.id % 2 === 0,
    jobTitle: c.jobRole,
  }));

  const handleSelectionChange = (id: string | number, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (selected) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleSelectAll = (selected: boolean, visibleIds: Array<string | number>) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (selected) visibleIds.forEach((id) => next.add(id));
      else visibleIds.forEach((id) => next.delete(id));
      return next;
    });
  };

  const openScheduleDrawer = (candidateList: Array<{ id: string | number; name: string; jobTitle?: string }>) => {
    setDrawerCandidates(candidateList);
    setDrawerOpen(true);
  };

  const handleAction = (action: string, candidate: CandidateItem) => {
    if (action === "schedule-interview") {
      openScheduleDrawer([{ id: candidate.id, name: candidate.name, jobTitle: candidate.jobTitle }]);
    }
  };

  const handleBulkSchedule = () => {
    const selected = formattedCandidates.filter((c) => selectedIds.has(c.id));
    openScheduleDrawer(selected.map((c) => ({ id: c.id, name: c.name, jobTitle: c.jobTitle })));
  };

  const handleScheduleSubmit = (data: any) => {
    setDrawerOpen(false);
    setSelectedIds(new Set());
    toast.success(
      data.candidateIds.length > 1
        ? `Interview links scheduled for ${data.candidateIds.length} candidates`
        : "Interview link sent successfully"
    );
  };

  return (
    <>
      {/* Bulk action bar â€” only visible for recruiter when candidates are selected */}
      {isRecruiter && selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-surface-inverse text-surface-inverse-foreground px-5 py-3 rounded-card shadow-2xl border border-white/10 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium">
              {selectedIds.size} candidate{selectedIds.size > 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10 text-xs h-8"
            onClick={() => setSelectedIds(new Set())}
          >
            Clear
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-[#6600bb] text-white text-xs h-8 gap-1.5"
            onClick={handleBulkSchedule}
          >
            <Calendar className="h-3.5 w-3.5" />
            Bulk Schedule
          </Button>
        </div>
      )}

      <div data-tour-id="candidate-list">
      <ModernCandidateList
        role={role}
        candidates={formattedCandidates}
        onAction={isRecruiter ? handleAction : undefined}
        onAddCandidate={isRecruiter ? handleAddCandidate : undefined}
        selectedIds={isRecruiter ? selectedIds : undefined}
        onSelectionChange={isRecruiter ? handleSelectionChange : undefined}
        onSelectAll={isRecruiter ? handleSelectAll : undefined}
      />
      </div>

      {isRecruiter && (
        <BulkUploadModal
          open={bulkModalOpen}
          onClose={() => setBulkModalOpen(false)}
        />
      )}

      {isRecruiter && (
        <RecruiterScheduleDrawer
          isOpen={drawerOpen}
          onClose={() => { setDrawerOpen(false); setSelectedIds(new Set()); }}
          candidates={drawerCandidates}
          technicalMins={MOCK_TECHNICAL_MINS}
          totalDurationMins={MOCK_TOTAL_DURATION}
          onSubmit={handleScheduleSubmit}
        />
      )}
    </>
  );
}
