import React, { useState, useRef, useMemo } from "react";
import { toast } from "sonner";
import { Calendar, Users, Layers, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernCandidateList, CandidateItem } from "../shared/ModernCandidateList";
import { RecruiterScheduleDrawer } from "../recruiter/RecruiterScheduleDrawer";
import { BulkUploadModal, BulkUploadModalHandle } from "../candidates/BulkUploadModal";
import { TourStep, useTourStore } from "@/store/tour-store";
import { useScreenTour } from "@/hooks/useScreenTour";
import { RECRUITER_TOUR_SCREEN_SEQUENCE, HL_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";

function buildRecruiterBulkImportTourSteps(modalRef: React.RefObject<BulkUploadModalHandle>): TourStep[] {
  return [
    {
      variant: 'intro',
      icon: UploadCloud,
      screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
      screenKey: 'bulk-import',
      title: "Batch source, not one-by-one",
      description: "Upload a folder of resumes and let the AI match each candidate to the best-fitting open role. This is how you source at scale.",
    },
    {
      variant: 'intro',
      icon: UploadCloud,
      screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
      screenKey: 'bulk-import',
      title: "Four stages, one review",
      description: "Upload, parsing, review, done. The AI does the matching — you just confirm or reassign during review.",
      onEnter: () => modalRef.current?.jumpToStage('upload'),
    },
    {
      targetSelector: '[data-tour-id="bulk-upload-dropzone"]',
      title: "What you can upload",
      description: "PDF, DOC, or DOCX, up to 50 at once. No template needed, no job pre-selection — the AI figures out the best match.",
    },
    {
      targetSelector: '[data-tour-id="bulk-parsing-stage"]',
      title: "Matching in progress",
      description: "The AI reads each resume and compares it against your open roles — skills, title, experience — to find the best fit.",
      onEnter: () => modalRef.current?.jumpToStage('parsing'),
    },
    {
      targetSelector: '[data-tour-id="bulk-confidence-badge"]',
      title: "How sure is the AI?",
      description: "Higher confidence means a stronger match. Low-confidence candidates are worth a manual review before confirming.",
      onEnter: () => modalRef.current?.jumpToStage('review'),
    },
    {
      targetSelector: '[data-tour-id="bulk-flag-badge"]',
      title: "Watch for flags",
      description: "Incomplete: the resume is missing key fields. Possible duplicate: the email or phone already exists in the system.",
    },
    {
      targetSelector: '[data-tour-id="bulk-row-confirm-skip"]',
      title: "Your call on each one",
      description: "Confirm to assign the candidate to the suggested role, skip to send them to the unassigned pool for later. Nothing is auto-committed.",
    },
    {
      targetSelector: '[data-tour-id="bulk-confirm-all-btn"]',
      title: "Bulk confirm",
      description: "One click to confirm every candidate the AI is highly confident about. Saves time when the matches look solid.",
    },
    {
      targetSelector: '[data-tour-id="bulk-unassigned-summary"]',
      title: "Nothing gets lost",
      description: "Skipped or low-confidence candidates land here — never silently dropped. Come back and assign them later.",
      onEnter: () => modalRef.current?.jumpToStage('complete'),
    },
  ];
}

function buildCandidateListTourSteps(role: "hiring-lead" | "ta-leader" | "recruiter"): TourStep[] {
  if (role === "recruiter") {
    return [
      {
        variant: 'intro',
        icon: Layers,
        screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
        screenKey: 'candidate-list',
        title: "Your candidates, your pipeline",
        description: "Every candidate assigned to your roles. Three views, but Kanban is where most of your daily work happens.",
      },
      {
        variant: 'intro',
        icon: Layers,
        screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
        screenKey: 'candidate-list',
        title: "Drag to move, click to act",
        description: "Kanban lets you move candidates between stages by dragging. Click for more actions.",
      },
      {
        targetSelector: '[data-tour-id="candidate-view-toggle"]',
        title: "Three views",
        description: "Cards for visual scanning with scores. List for compact multi-candidate review. Kanban for pipeline management — it's the default for a reason.",
      },
      {
        targetSelector: '[data-tour-id="kanban-columns"]',
        title: "Pipeline stages",
        description: "Five stages: Applied/Sourced, Shortlisted, Interview, Selected. Candidates move left to right as they progress. Rejected is separate — a catch-all exit from any of the first three stages, not a step after Selected.",
      },
      {
        targetSelector: '[data-tour-id="kanban-drag-handle"]',
        title: "Move candidates",
        description: "Drag a card forward or backward through the pipeline freely. Moving to Selected asks you to confirm; dropping onto Rejected asks for a reason.",
      },
      {
        targetSelector: '[data-tour-id="kanban-job-selector"]',
        title: "Switch between roles",
        description: "Kanban shows one job's pipeline at a time. Use this dropdown to switch to a different assigned role.",
      },
      {
        targetSelector: '[data-tour-id="kanban-fit-score"]',
        title: "Fit score",
        description: "How well this candidate fits the role based on skills, experience, and title. Higher means a stronger fit — use it to prioritize who to screen first.",
      },
      {
        targetSelector: '[data-tour-id="kanban-candidate-card"]',
        title: "Quick actions",
        description: "Click a card to view the full profile. Drag it to move between stages. The footer icons let you email, message, or call the candidate directly.",
      },
      {
        targetSelector: '[data-tour-id="candidate-add-btn"]',
        title: "Adding candidates",
        description: "Add one candidate manually or import a batch of resumes. Bulk import is covered in its own tour.",
      },
    ];
  }

  // hiring-lead (also the default for the dead-code ta-leader wrapper, unreachable in routing)
  return [
    {
      variant: 'intro',
      icon: Layers,
      screenSequence: HL_TOUR_SCREEN_SEQUENCE,
      screenKey: 'candidate-list',
      title: "Your candidates in motion",
      description: "This is where you see who's in your pipeline, what stage they're at, and whether anyone is stuck.",
    },
    {
      variant: 'intro',
      icon: Layers,
      screenSequence: HL_TOUR_SCREEN_SEQUENCE,
      screenKey: 'candidate-list',
      title: "Review and decide",
      description: "Your main job here is reviewing what the recruiter has surfaced and giving input where the workflow allows it.",
    },
    {
      targetSelector: '[data-tour-id="kanban-columns"]',
      title: "Pipeline stages",
      description: "Each column is a stage. Candidates move left to right from Applied/Sourced through to Selected. Your focus is the later stages — interviewing and deciding. Rejected sits apart — a catch-all exit, not a step after Selected.",
    },
    {
      targetSelector: '[data-tour-id="kanban-job-selector"]',
      title: "Filter by role",
      description: "Switch between your open positions to see each one's pipeline.",
    },
    {
      targetSelector: '[data-tour-id="kanban-fit-score"]',
      title: "Who to look at first",
      description: "Higher fit score means a stronger match based on skills, experience, and title.",
    },
    {
      targetSelector: '[data-tour-id="kanban-candidate-card"]',
      title: "What you can do",
      description: "Click a card to view the full profile. Schedule Interview and Change Status appear in the list view's menu, but aren't wired up for you yet — for now this is primarily a review surface.",
    },
    {
      targetSelector: '[data-tour-id="candidate-view-toggle"]',
      title: "Other views",
      description: "Cards for a visual overview with more detail per candidate. List for compact scanning. Kanban is the default for pipeline work.",
    },
  ];
}

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
  const bulkModalRef = useRef<BulkUploadModalHandle>(null);

  const candidateListTourSteps = useMemo(() => buildCandidateListTourSteps(role), [role]);
  useScreenTour(role, "candidate-list", candidateListTourSteps);

  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  const handleAddCandidate = () => {
    setBulkModalOpen(true);
    if (isRecruiter) {
      startTour('recruiter:bulk-import', buildRecruiterBulkImportTourSteps(bulkModalRef), {
        storageKey: 'talentou:tour-seen:recruiter:bulk-import',
      });
    }
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
    daysInStage: c.id === 3 || c.id === 12 ? 12 : 2 + (c.id % 6),
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
          ref={bulkModalRef}
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
