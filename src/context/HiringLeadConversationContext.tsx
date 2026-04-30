import React, { createContext, useContext, useState } from 'react';

interface Message {
  id: number;
  sender: 'ai' | 'user';
  content: string;
  name: string;
  stageIndex?: number;
}

interface ConversationStage {
  completed: boolean;
}

export interface CoreQuestion {
  id: string;
  text: string;
  answerKey: string;
  estimatedMinutes: number;
  type: 'scenario' | 'knowledge';
  source: 'ai' | 'manual';
}

export interface ScreeningQuestion {
  id: string;
  text: string;
  type: 'text' | 'yesno';
}

export interface InterviewSetup {
  coreQuestions: CoreQuestion[];
  screeningQuestions: ScreeningQuestion[];
  totalDurationMins: number;
  includeAIQuestions: boolean;
  allowRecruiterQuestions: boolean;
}

interface JobDetails {
  // Stage 1: Basic Job Details
  title: string;
  numberOfOpenings: number;
  startDate: string;
  employmentMode: string;
  workType: string;
  location: string;
  minExperience: string;
  maxBudget: string;
  sampleProfiles: string[];

  // Stage 2: AI Generated Skills & Responsibilities
  keySkills: string[];
  desiredSkills: string[];
  preferredQualifications: string[];
  responsibilities: string[];
}

interface HiringLeadConversationContextType {
  chatMessages: Message[];
  currentStage: number;
  stages: {
    jobDetails: ConversationStage;
    skillsResponsibilities: ConversationStage;
    screeningSetup: ConversationStage;
    interviewSetup: ConversationStage;
    viewJD: ConversationStage;
  };
  jobDetails: JobDetails;
  interviewSetup: InterviewSetup;
  progressPercentage: number;
  addChatMessage: (message: Message) => void;
  setCurrentStage: (stage: number) => void;
  completeStage: (stage: 'jobDetails' | 'skillsResponsibilities' | 'screeningSetup' | 'interviewSetup' | 'viewJD') => void;
  updateJobDetails: (details: Partial<JobDetails>) => void;
  updateInterviewSetup: (updates: Partial<InterviewSetup>) => void;
}

const HiringLeadConversationContext = createContext<HiringLeadConversationContextType | undefined>(undefined);

export function HiringLeadConversationProvider({ children }: { children: React.ReactNode }) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [stages, setStages] = useState({
    jobDetails: { completed: false },
    skillsResponsibilities: { completed: false },
    screeningSetup: { completed: false },
    interviewSetup: { completed: false },
    viewJD: { completed: false }
  });
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    // Stage 1
    title: '',
    numberOfOpenings: 1,
    startDate: '',
    employmentMode: 'Full-time',
    workType: 'Onsite',
    location: '',
    minExperience: '',
    maxBudget: '',
    sampleProfiles: [],

    // Stage 2
    keySkills: [],
    desiredSkills: [],
    preferredQualifications: [],
    responsibilities: [],
  });
  const [interviewSetup, setInterviewSetup] = useState<InterviewSetup>({
    coreQuestions: [],
    screeningQuestions: [],
    totalDurationMins: 15,
    includeAIQuestions: true,
    allowRecruiterQuestions: true,
  });

  const addChatMessage = (message: Message) => {
    setChatMessages(prev => [...prev, message]);
  };

  const completeStage = (stage: 'jobDetails' | 'skillsResponsibilities' | 'interviewSetup' | 'viewJD') => {
    setStages(prev => ({
      ...prev,
      [stage]: { completed: true }
    }));
  };

  const updateJobDetails = (details: Partial<JobDetails>) => {
    setJobDetails(prev => ({ ...prev, ...details }));
  };

  const updateInterviewSetup = (updates: Partial<InterviewSetup>) => {
    setInterviewSetup(prev => ({ ...prev, ...updates }));
  };

  const completedStages = Object.values(stages).filter(s => s.completed).length;
  const progressPercentage = (completedStages / 5) * 100;

  return (
    <HiringLeadConversationContext.Provider
      value={{
        chatMessages,
        currentStage,
        stages,
        jobDetails,
        interviewSetup,
        progressPercentage,
        addChatMessage,
        setCurrentStage,
        completeStage,
        updateJobDetails,
        updateInterviewSetup,
      }}
    >
      {children}
    </HiringLeadConversationContext.Provider>
  );
}

export function useHiringLeadConversation() {
  const context = useContext(HiringLeadConversationContext);
  if (!context) {
    throw new Error('useHiringLeadConversation must be used within HiringLeadConversationProvider');
  }
  return context;
}
