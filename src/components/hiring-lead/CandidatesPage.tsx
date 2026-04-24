import React, { useState } from "react";
import { toast } from "sonner";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernCandidateList, CandidateItem } from "../shared/ModernCandidateList";
import { RecruiterScheduleDrawer } from "../recruiter/RecruiterScheduleDrawer";

interface Candidate {
  id: number;
  name: string;
  skill: string;
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
    { id: 1, name: "John Smith", skill: "React", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Sarah Johnson", jobRole: "Software Engineer" },
    { id: 2, name: "Emily Davis", skill: "Agile", status: "Under Review", statusTooltip: "Application is being reviewed by the hiring team.", recruiter: "David Wilson", jobRole: "Product Manager" },
    { id: 3, name: "Michael Brown", skill: "Node.js", status: "Shortlisted", statusTooltip: "Candidate has been shortlisted for further evaluation.", recruiter: "Emma Rodriguez", jobRole: "Senior Developer" },
    { id: 4, name: "Sarah Wilson", skill: "Figma", status: "Interview Scheduled", statusTooltip: "Interview has been scheduled with the candidate.", recruiter: "Alex Thompson", jobRole: "UX Designer" },
    { id: 5, name: "David Johnson", skill: "Python", status: "Interviewed", statusTooltip: "Candidate has completed the interview process.", recruiter: "Kevin Lee", jobRole: "Data Analyst" },
    { id: 6, name: "Jessica Lee", skill: "Docker", status: "Offered", statusTooltip: "Job offer has been extended to the candidate.", recruiter: "Rachel Kim", jobRole: "DevOps Engineer" },
    { id: 7, name: "Robert Taylor", skill: "TypeScript", status: "Rejected", statusTooltip: "Candidate was not selected for the position.", recruiter: "Tom Anderson", jobRole: "Frontend Developer" },
    { id: 8, name: "Lisa Chen", skill: "Selenium", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Nina Patel", jobRole: "QA Engineer" },
    { id: 9, name: "Alex Rodriguez", skill: "Google Analytics", status: "Shortlisted", statusTooltip: "Candidate has been shortlisted for further evaluation.", recruiter: "James Rodriguez", jobRole: "Marketing Manager" },
    { id: 10, name: "Maria Garcia", skill: "Salesforce", status: "Under Review", statusTooltip: "Application is being reviewed by the hiring team.", recruiter: "Sophie Chen", jobRole: "Sales Representative" },
    { id: 11, name: "Chris Martinez", skill: "Express.js", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Carlos Martinez", jobRole: "Backend Developer" },
    { id: 12, name: "Amanda White", skill: "TensorFlow", status: "Interview Scheduled", statusTooltip: "Interview has been scheduled with the candidate.", recruiter: "Priya Sharma", jobRole: "Data Scientist" },
    { id: 13, name: "Kevin Park", skill: "React Native", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Lisa Park", jobRole: "Mobile Developer" },
    { id: 14, name: "Rachel Kim", skill: "Cybersecurity", status: "Shortlisted", statusTooltip: "Candidate has been shortlisted for further evaluation.", recruiter: "Mark Davis", jobRole: "Security Engineer" },
    { id: 15, name: "Tom Foster", skill: "Markdown", status: "Under Review", statusTooltip: "Application is being reviewed by the hiring team.", recruiter: "Amy Foster", jobRole: "Technical Writer" },
    { id: 16, name: "Jennifer White", skill: "SQL", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Jessica White", jobRole: "Business Analyst" },
    { id: 17, name: "Paul Black", skill: "AWS", status: "Interview Scheduled", statusTooltip: "Interview has been scheduled with the candidate.", recruiter: "Robert Black", jobRole: "Cloud Architect" },
    { id: 18, name: "Linda Lopez", skill: "Jira", status: "Accepted", statusTooltip: "Candidate has accepted the job offer.", recruiter: "Maria Lopez", jobRole: "Scrum Master" },
    { id: 19, name: "Steve Doe", skill: "PostgreSQL", status: "Withdrawn", statusTooltip: "Candidate has withdrawn from the application process.", recruiter: "John Doe", jobRole: "Database Administrator" },
    { id: 20, name: "Jane Brown", skill: "PyTorch", status: "Rejected", statusTooltip: "Candidate was not selected for the position.", recruiter: "Alice Brown", jobRole: "AI Engineer" },
    { id: 21, name: "Bob Turner", skill: "Cisco", status: "Applied", statusTooltip: "Candidate has submitted their application.", recruiter: "Michael Turner", jobRole: "Network Engineer" },
    { id: 22, name: "Diana Parker", skill: "Linux", status: "Shortlisted", statusTooltip: "Candidate has been shortlisted for further evaluation.", recruiter: "Peter Parker", jobRole: "System Administrator" },
  ]);

  // Multi-select state (recruiter only)
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  // Schedule drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCandidates, setDrawerCandidates] = useState<Array<{ id: string | number; name: string; jobTitle?: string }>>([]);

  const isRecruiter = role === "recruiter";

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
      {/* Bulk action bar — only visible for recruiter when candidates are selected */}
      {isRecruiter && selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1e1e2e] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 animate-in slide-in-from-bottom-4 duration-200">
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
            className="bg-[#7800D3] hover:bg-[#6600bb] text-white text-xs h-8 gap-1.5"
            onClick={handleBulkSchedule}
          >
            <Calendar className="h-3.5 w-3.5" />
            Bulk Schedule
          </Button>
        </div>
      )}

      <ModernCandidateList
        role={role}
        candidates={formattedCandidates}
        onAction={isRecruiter ? handleAction : undefined}
        selectedIds={isRecruiter ? selectedIds : undefined}
        onSelectionChange={isRecruiter ? handleSelectionChange : undefined}
        onSelectAll={isRecruiter ? handleSelectAll : undefined}
      />

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
