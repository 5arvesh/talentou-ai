import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScreeningQuestion {
  id: string;
  question: string;
  type: 'text' | 'yes_no' | 'multiple_choice';
  required: boolean;
  options?: string[];
}

interface JobDetails {
  id: string;
  role: string;
  client: string;
  location: string;
  workMode: string;
  status: string;
  expectedStartDate: string;
  hiringLead: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  qualifications: string[];
  aboutCompany: string;
  experience: string;
  salary: string;
}

interface TAAssociateJDFlowState {
  currentStage: number;
  completedStages: number[];
  jobDetails: JobDetails | null;
  screeningQuestions: ScreeningQuestion[];
  jdLink: string | null;
  isLinkGenerated: boolean;
}

interface TAAssociateJDFlowContextType extends TAAssociateJDFlowState {
  completeStage: (stage: number) => void;
  goToStage: (stage: number) => void;
  setJobDetails: (details: JobDetails) => void;
  addScreeningQuestion: (question: ScreeningQuestion) => void;
  updateScreeningQuestion: (id: string, updates: Partial<ScreeningQuestion>) => void;
  removeScreeningQuestion: (id: string) => void;
  generateJDLink: () => void;
  setScreeningQuestions: (questions: ScreeningQuestion[]) => void;
}

const TAAssociateJDFlowContext = createContext<TAAssociateJDFlowContextType | undefined>(undefined);

// Default screening questions based on job requirements
const defaultScreeningQuestions: ScreeningQuestion[] = [
  {
    id: 'sq-1',
    question: 'How many years of experience do you have in this field?',
    type: 'text',
    required: true
  },
  {
    id: 'sq-2',
    question: 'Are you currently authorized to work in this location?',
    type: 'yes_no',
    required: true
  },
  {
    id: 'sq-3',
    question: 'What is your expected salary range?',
    type: 'text',
    required: true
  },
  {
    id: 'sq-4',
    question: 'When would you be available to start?',
    type: 'multiple_choice',
    required: true,
    options: ['Immediately', 'Within 2 weeks', 'Within 1 month', 'More than 1 month']
  },
  {
    id: 'sq-5',
    question: 'Do you have experience with the required technical skills listed in the job description?',
    type: 'yes_no',
    required: true
  }
];

export function TAAssociateJDFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TAAssociateJDFlowState>({
    currentStage: 0,
    completedStages: [],
    jobDetails: null,
    screeningQuestions: defaultScreeningQuestions,
    jdLink: null,
    isLinkGenerated: false
  });

  const completeStage = (stage: number) => {
    setState(prev => ({
      ...prev,
      completedStages: prev.completedStages.includes(stage) 
        ? prev.completedStages 
        : [...prev.completedStages, stage],
      currentStage: stage + 1
    }));
  };

  const goToStage = (stage: number) => {
    setState(prev => ({
      ...prev,
      currentStage: stage
    }));
  };

  const setJobDetails = (details: JobDetails) => {
    setState(prev => ({
      ...prev,
      jobDetails: details
    }));
  };

  const addScreeningQuestion = (question: ScreeningQuestion) => {
    setState(prev => ({
      ...prev,
      screeningQuestions: [...prev.screeningQuestions, question]
    }));
  };

  const updateScreeningQuestion = (id: string, updates: Partial<ScreeningQuestion>) => {
    setState(prev => ({
      ...prev,
      screeningQuestions: prev.screeningQuestions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      )
    }));
  };

  const removeScreeningQuestion = (id: string) => {
    setState(prev => ({
      ...prev,
      screeningQuestions: prev.screeningQuestions.filter(q => q.id !== id)
    }));
  };

  const setScreeningQuestions = (questions: ScreeningQuestion[]) => {
    setState(prev => ({
      ...prev,
      screeningQuestions: questions
    }));
  };

  const generateJDLink = () => {
    const jobId = state.jobDetails?.id || 'JOB-0001';
    const link = `${window.location.origin}/apply/${jobId}`;
    setState(prev => ({
      ...prev,
      jdLink: link,
      isLinkGenerated: true
    }));
  };

  return (
    <TAAssociateJDFlowContext.Provider 
      value={{
        ...state,
        completeStage,
        goToStage,
        setJobDetails,
        addScreeningQuestion,
        updateScreeningQuestion,
        removeScreeningQuestion,
        generateJDLink,
        setScreeningQuestions
      }}
    >
      {children}
    </TAAssociateJDFlowContext.Provider>
  );
}

export function useTAAssociateJDFlow() {
  const context = useContext(TAAssociateJDFlowContext);
  if (!context) {
    throw new Error('useTAAssociateJDFlow must be used within a TAAssociateJDFlowProvider');
  }
  return context;
}
