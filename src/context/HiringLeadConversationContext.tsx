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
  
  // Stage 3: Interviewer Nomination
  interviewerType: 'self' | 'existing' | 'nominate';
  nominatedEmail?: string;
  nominatedName?: string;
  existingInterviewerId?: string;
  existingInterviewerName?: string;
  existingInterviewerEmail?: string;
}

interface HiringLeadConversationContextType {
  chatMessages: Message[];
  currentStage: number;
  stages: {
    jobDetails: ConversationStage;
    skillsResponsibilities: ConversationStage;
    interviewerNomination: ConversationStage;
    viewJD: ConversationStage;
  };
  jobDetails: JobDetails;
  progressPercentage: number;
  addChatMessage: (message: Message) => void;
  setCurrentStage: (stage: number) => void;
  completeStage: (stage: 'jobDetails' | 'skillsResponsibilities' | 'interviewerNomination' | 'viewJD') => void;
  updateJobDetails: (details: Partial<JobDetails>) => void;
}

const HiringLeadConversationContext = createContext<HiringLeadConversationContextType | undefined>(undefined);

export function HiringLeadConversationProvider({ children }: { children: React.ReactNode }) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [stages, setStages] = useState({
    jobDetails: { completed: false },
    skillsResponsibilities: { completed: false },
    interviewerNomination: { completed: false },
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
    
    // Stage 3
    interviewerType: 'self',
    nominatedEmail: '',
    nominatedName: '',
    existingInterviewerId: '',
    existingInterviewerName: '',
    existingInterviewerEmail: ''
  });

  const addChatMessage = (message: Message) => {
    setChatMessages(prev => [...prev, message]);
  };

  const completeStage = (stage: 'jobDetails' | 'skillsResponsibilities' | 'interviewerNomination' | 'viewJD') => {
    setStages(prev => ({
      ...prev,
      [stage]: { completed: true }
    }));
  };

  const updateJobDetails = (details: Partial<JobDetails>) => {
    setJobDetails(prev => ({ ...prev, ...details }));
  };

  const completedStages = Object.values(stages).filter(s => s.completed).length;
  const progressPercentage = (completedStages / 4) * 100;

  return (
    <HiringLeadConversationContext.Provider
      value={{
        chatMessages,
        currentStage,
        stages,
        jobDetails,
        progressPercentage,
        addChatMessage,
        setCurrentStage,
        completeStage,
        updateJobDetails
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
