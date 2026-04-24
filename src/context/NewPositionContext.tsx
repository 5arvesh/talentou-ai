import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Message {
  id: number;
  sender: 'ai' | 'user';
  content: string;
  name: string;
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  initials: string;
  activeJobs: number;
}

export interface RecruiterJob {
  id: string;
  title: string;
  project: string;
  priority: 'low' | 'medium' | 'high';
  daysOpen: number;
}

export interface JobDetails {
  title: string;
  numberOfOpenings: number;
  startDate: string;
  employmentMode: string;
  workType: string;
  location: string;
  minExperience: string;
  maxBudget: string;
  keySkills: string[];
  desiredSkills: string[];
  responsibilities: string[];
  preferredQualifications: string[];
  behavioralQuestionsEnabled: boolean;
  hiringLead: string;
  project: string;
}

// Mock data
export const mockJobDetails: JobDetails = {
  title: "Product Engineer",
  numberOfOpenings: 2,
  startDate: "1st November",
  employmentMode: "Full-time",
  workType: "Onsite",
  location: "Chennai, India",
  minExperience: "0",
  maxBudget: "₹15 LPA",
  keySkills: ["MongoDB", "Node.js", "React", "TypeScript"],
  desiredSkills: ["AWS", "Docker", "Kubernetes", "GraphQL"],
  responsibilities: [
    "Build and maintain scalable backend APIs",
    "Integrate with cloud infrastructure (AWS)",
    "Collaborate with frontend & DevOps teams",
    "Mentor junior developers"
  ],
  preferredQualifications: [
    "B.Tech/B.E. in Computer Science or related field",
    "Experience with agile methodologies",
    "Strong problem-solving skills"
  ],
  behavioralQuestionsEnabled: false,
  hiringLead: "Ananthan",
  project: "Amgen"
};

export const existingRecruiters: Recruiter[] = [
  { id: "1", name: "Darshana", email: "darshana@company.com", initials: "DA", activeJobs: 3 },
  { id: "2", name: "Priya Sharma", email: "priya.s@company.com", initials: "PS", activeJobs: 5 },
  { id: "3", name: "Rahul Kumar", email: "rahul.k@company.com", initials: "RK", activeJobs: 2 },
  { id: "4", name: "Sneha Patel", email: "sneha.p@company.com", initials: "SP", activeJobs: 4 },
];

export const getRecruiterJobs = (recruiterId: string): RecruiterJob[] => {
  const jobsByRecruiter: Record<string, RecruiterJob[]> = {
    "1": [
      { id: "job1", title: "Senior Frontend Developer", project: "Acme Corp", priority: "high", daysOpen: 15 },
      { id: "job2", title: "Backend Engineer", project: "Beta Inc", priority: "medium", daysOpen: 8 },
      { id: "job3", title: "DevOps Engineer", project: "Gamma LLC", priority: "low", daysOpen: 22 },
    ],
    "2": [
      { id: "job4", title: "Full Stack Developer", project: "Delta Co", priority: "high", daysOpen: 5 },
      { id: "job5", title: "Data Analyst", project: "Epsilon Ltd", priority: "medium", daysOpen: 12 },
      { id: "job6", title: "QA Engineer", project: "Zeta Inc", priority: "low", daysOpen: 18 },
      { id: "job7", title: "Mobile Developer", project: "Eta Corp", priority: "medium", daysOpen: 9 },
      { id: "job8", title: "UI/UX Designer", project: "Theta Co", priority: "low", daysOpen: 25 },
    ],
    "3": [
      { id: "job9", title: "Cloud Architect", project: "Iota LLC", priority: "high", daysOpen: 3 },
      { id: "job10", title: "Security Engineer", project: "Kappa Inc", priority: "medium", daysOpen: 14 },
    ],
    "4": [
      { id: "job11", title: "ML Engineer", project: "Lambda Co", priority: "high", daysOpen: 7 },
      { id: "job12", title: "Platform Engineer", project: "Mu Ltd", priority: "medium", daysOpen: 11 },
      { id: "job13", title: "Site Reliability Engineer", project: "Nu Corp", priority: "low", daysOpen: 20 },
      { id: "job14", title: "Database Admin", project: "Xi Inc", priority: "medium", daysOpen: 16 },
    ],
  };
  return jobsByRecruiter[recruiterId] || [];
};

interface NewPositionState {
  messages: Message[];
  currentStep: number;
  completedSteps: number[];
  isApproved: boolean | null;
  showRejectionInput: boolean;
  rejectionFeedback: string;
  showJD: boolean;
  showApprovalButtons: boolean;
  priority: 'low' | 'medium' | 'high' | null;
  showPrioritySelection: boolean;
  selectedRecruiter: Recruiter | null;
  recruiterSearchInput: string;
  showRecruiterDropdown: boolean;
  recruiterAssignmentType: 'auto' | 'manual' | '';
  showRecruiterPanel: boolean;
  showPriorityPanel: boolean;
  recruiterJobPriorities: Record<string, 'low' | 'medium' | 'high'>;
}

interface NewPositionContextType extends NewPositionState {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Omit<Message, 'id'>) => void;
  setCurrentStep: (step: number) => void;
  setCompletedSteps: React.Dispatch<React.SetStateAction<number[]>>;
  setIsApproved: (approved: boolean | null) => void;
  setShowRejectionInput: (show: boolean) => void;
  setRejectionFeedback: (feedback: string) => void;
  setShowJD: (show: boolean) => void;
  setShowApprovalButtons: (show: boolean) => void;
  setPriority: (priority: 'low' | 'medium' | 'high' | null) => void;
  setShowPrioritySelection: (show: boolean) => void;
  setSelectedRecruiter: (recruiter: Recruiter | null) => void;
  setRecruiterSearchInput: (input: string) => void;
  setShowRecruiterDropdown: (show: boolean) => void;
  setRecruiterAssignmentType: (type: 'auto' | 'manual' | '') => void;
  setShowRecruiterPanel: (show: boolean) => void;
  setShowPriorityPanel: (show: boolean) => void;
  setRecruiterJobPriorities: React.Dispatch<React.SetStateAction<Record<string, 'low' | 'medium' | 'high'>>>;
  handleApprove: () => void;
  handleReject: () => void;
  handleSubmitRejectionFeedback: () => void;
  handleRecruiterConfirm: () => void;
  handlePrioritySelect: (priority: 'low' | 'medium' | 'high') => void;
  handleSavePriorities: () => void;
  getPriorityConfig: (p: 'low' | 'medium' | 'high') => { label: string; color: string; dotColor: string };
  getVisibleSteps: () => { id: number; title: string; key: string }[];
  getStepStatus: (stepId: number) => 'completed' | 'in-progress' | 'upcoming';
  progressPercentage: number;
  jobDetails: JobDetails;
}

const NewPositionContext = createContext<NewPositionContextType | undefined>(undefined);

export function NewPositionProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      content: `Hi! ${mockJobDetails.hiringLead} has created a new position for "${mockJobDetails.title}" in the ${mockJobDetails.project} project. Please review the Job Description on the right panel and let me know your decision.`,
      name: 'Talentou AI'
    }
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const [rejectionFeedback, setRejectionFeedback] = useState('');
  const [showJD, setShowJD] = useState(true);
  const [showApprovalButtons, setShowApprovalButtons] = useState(true);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | null>(null);
  const [showPrioritySelection, setShowPrioritySelection] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  const [recruiterSearchInput, setRecruiterSearchInput] = useState('');
  const [showRecruiterDropdown, setShowRecruiterDropdown] = useState(false);
  const [recruiterAssignmentType, setRecruiterAssignmentType] = useState<'auto' | 'manual' | ''>('');
  const [showRecruiterPanel, setShowRecruiterPanel] = useState(false);
  const [showPriorityPanel, setShowPriorityPanel] = useState(false);
  const [recruiterJobPriorities, setRecruiterJobPriorities] = useState<Record<string, 'low' | 'medium' | 'high'>>({});

  // Initialize recruiter job priorities when recruiter is selected
  useEffect(() => {
    if (selectedRecruiter) {
      const jobs = getRecruiterJobs(selectedRecruiter.id);
      const initialPriorities: Record<string, 'low' | 'medium' | 'high'> = {};
      jobs.forEach(job => {
        initialPriorities[job.id] = job.priority;
      });
      initialPriorities['new'] = 'medium';
      setRecruiterJobPriorities(initialPriorities);
    }
  }, [selectedRecruiter]);

  const addMessage = (message: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...message, id: prev.length + 1 }]);
  };

  const getPriorityConfig = (p: 'low' | 'medium' | 'high') => {
    switch (p) {
      case 'low':
        return { label: 'Low', color: 'bg-slate-100 text-slate-700 border-slate-300', dotColor: 'bg-slate-400' };
      case 'medium':
        return { label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-300', dotColor: 'bg-amber-400' };
      case 'high':
        return { label: 'High', color: 'bg-red-100 text-red-700 border-red-300', dotColor: 'bg-red-400' };
    }
  };

  const getVisibleSteps = () => {
    const baseSteps = [
      { id: 0, title: 'Review & Approve Position', key: 'reviewAndApprove' },
    ];
    
    if (isApproved === true) {
      baseSteps.push({ id: 1, title: 'Assign Recruiter & Set Priority', key: 'assignAndPriority' });
    }
    
    return baseSteps;
  };

  const getStepStatus = (stepId: number): 'completed' | 'in-progress' | 'upcoming' => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'in-progress';
    return 'upcoming';
  };

  const totalSteps = isApproved === true ? 2 : 1;
  const progressPercentage = (completedSteps.length / totalSteps) * 100;

  const handleApprove = () => {
    setShowApprovalButtons(false);
    addMessage({ sender: 'user', content: 'I approve this position.', name: 'Roney' });

    setTimeout(() => {
      setIsApproved(true);
      setCompletedSteps(prev => [...prev, 0]);
      setCurrentStep(1);
      setShowRecruiterPanel(true);
      setShowPriorityPanel(true);
      setShowJD(false);
      addMessage({
        sender: 'ai',
        content: "Position approved! Please assign a recruiter and set the priority for this new position.",
        name: 'Talentou AI'
      });
    }, 1000);
  };

  const handleReject = () => {
    setShowApprovalButtons(false);
    setShowRejectionInput(true);
    addMessage({ sender: 'user', content: 'I want to reject this position.', name: 'Roney' });

    setTimeout(() => {
      addMessage({
        sender: 'ai',
        content: `Please provide your feedback on the right panel for why you're rejecting this position. This will be shared with ${mockJobDetails.hiringLead} so they can make the necessary adjustments.`,
        name: 'Talentou AI'
      });
    }, 1000);
  };

  const handleSubmitRejectionFeedback = () => {
    if (!rejectionFeedback.trim()) return;

    setShowRejectionInput(false);
    addMessage({ sender: 'user', content: rejectionFeedback, name: 'Roney' });
    setRejectionFeedback('');

    setTimeout(() => {
      setIsApproved(false);
      setCompletedSteps(prev => [...prev, 0]);
      addMessage({
        sender: 'ai',
        content: `Thank you for your feedback. I've notified ${mockJobDetails.hiringLead} about your decision and shared your feedback. They will review and make the necessary changes before resubmitting.`,
        name: 'Talentou AI'
      });
    }, 1000);
  };

  const handleRecruiterConfirm = () => {
    // We'll no longer increment steps here because recruiter and priority are now one step!
    // Instead, the final "Save" button in the Priority/Recruiter super-panel will submit both.
  };

  const handlePrioritySelect = (selectedPriority: 'low' | 'medium' | 'high') => {
    setPriority(selectedPriority);
    setRecruiterJobPriorities(prev => ({ ...prev, 'new': selectedPriority }));
  };

  const handleSavePriorities = () => {
    if (!priority || !selectedRecruiter) return;
    
    setShowPrioritySelection(false);
    const config = getPriorityConfig(priority);
    addMessage({
      sender: 'user',
      content: `I've assigned ${selectedRecruiter.name} and set the priority to ${config.label}.`,
      name: 'Roney'
    });

    setTimeout(() => {
      setCompletedSteps(prev => [...prev, 1]);
      setShowRecruiterPanel(false);
      setShowPriorityPanel(false);
      setShowJD(true);
      addMessage({
        sender: 'ai',
        content: `All set! The position "${mockJobDetails.title}" is now live with ${config.label} priority. ${selectedRecruiter?.name} has been notified and will start sourcing candidates.`,
        name: 'Talentou AI'
      });
    }, 1000);
  };

  return (
    <NewPositionContext.Provider
      value={{
        messages,
        setMessages,
        addMessage,
        currentStep,
        setCurrentStep,
        completedSteps,
        setCompletedSteps,
        isApproved,
        setIsApproved,
        showRejectionInput,
        setShowRejectionInput,
        rejectionFeedback,
        setRejectionFeedback,
        showJD,
        setShowJD,
        showApprovalButtons,
        setShowApprovalButtons,
        priority,
        setPriority,
        showPrioritySelection,
        setShowPrioritySelection,
        selectedRecruiter,
        setSelectedRecruiter,
        recruiterSearchInput,
        setRecruiterSearchInput,
        showRecruiterDropdown,
        setShowRecruiterDropdown,
        recruiterAssignmentType,
        setRecruiterAssignmentType,
        showRecruiterPanel,
        setShowRecruiterPanel,
        showPriorityPanel,
        setShowPriorityPanel,
        recruiterJobPriorities,
        setRecruiterJobPriorities,
        handleApprove,
        handleReject,
        handleSubmitRejectionFeedback,
        handleRecruiterConfirm,
        handlePrioritySelect,
        handleSavePriorities,
        getPriorityConfig,
        getVisibleSteps,
        getStepStatus,
        progressPercentage,
        jobDetails: mockJobDetails
      }}
    >
      {children}
    </NewPositionContext.Provider>
  );
}

export function useNewPosition() {
  const context = useContext(NewPositionContext);
  if (!context) {
    throw new Error('useNewPosition must be used within a NewPositionProvider');
  }
  return context;
}
