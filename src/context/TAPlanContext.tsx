import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CompanyUSPData {
  elevatorPitch: string;
  careerGrowth: string;
  compensation: string;
  awards: string;
}

export interface TalentPoolData {
  workArrangement: string[];
  geographicPreferences: string[];
  targetIndustries: string[];
  targetCompanies: string[];
  educationalInstitutions: string[];
  keySkills: string[];
}

export interface ChannelsData {
  selectedChannels: string[];
  outreachSequence: any[];
  messageTemplates: any[];
  cadence: string;
}

export interface MetricsData {
  kpis: any[];
  targets: any[];
  milestones: any[];
}

export interface TeamData {
  recruiters: any[];
  hiringLeads: any[];
  hrMembers: any[];
}

export interface Message {
  id: number;
  sender: 'ai' | 'user';
  content: string;
  name: string;
  stageIndex?: number;
}

interface TAPlanState {
  currentStage: number;
  stages: {
    companyUSP: { completed: boolean; data: CompanyUSPData };
    talentPool: { completed: boolean; data: TalentPoolData };
    recruitmentChannels: { completed: boolean; data: ChannelsData };
    successMetrics: { completed: boolean; data: MetricsData };
    teamInvitation: { completed: boolean; data: TeamData };
  };
  chatMessages: Message[];
  progressPercentage: number;
}

interface TAPlanContextType extends TAPlanState {
  setCurrentStage: (stage: number) => void;
  updateStageData: (stage: string, data: any) => void;
  completeStage: (stage: string) => void;
  addChatMessage: (message: Message) => void;
  updateProgressPercentage: () => void;
}

const TAPlanContext = createContext<TAPlanContextType | undefined>(undefined);

export function TAPlanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TAPlanState>({
    currentStage: 0,
    stages: {
      companyUSP: { 
        completed: false, 
        data: { elevatorPitch: '', careerGrowth: '', compensation: '', awards: '' } 
      },
      talentPool: { 
        completed: false, 
        data: { 
          workArrangement: [], 
          geographicPreferences: [], 
          targetIndustries: [], 
          targetCompanies: [], 
          educationalInstitutions: [], 
          keySkills: [] 
        } 
      },
      recruitmentChannels: { 
        completed: false, 
        data: { selectedChannels: [], outreachSequence: [], messageTemplates: [], cadence: '' } 
      },
      successMetrics: { 
        completed: false, 
        data: { kpis: [], targets: [], milestones: [] } 
      },
      teamInvitation: { 
        completed: false, 
        data: { recruiters: [], hiringLeads: [], hrMembers: [] } 
      },
    },
    chatMessages: [],
    progressPercentage: 0,
  });

  const setCurrentStage = (stage: number) => {
    setState(prev => ({ ...prev, currentStage: stage }));
  };

  const updateStageData = (stage: string, data: any) => {
    setState(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [stage]: {
          ...prev.stages[stage as keyof typeof prev.stages],
          data: { ...prev.stages[stage as keyof typeof prev.stages].data, ...data }
        }
      }
    }));
  };

  const completeStage = (stage: string) => {
    setState(prev => {
      const stageKeys = ['companyUSP', 'talentPool', 'recruitmentChannels', 'successMetrics', 'teamInvitation'];
      const currentIndex = stageKeys.indexOf(stage);
      const newCurrentStage = currentIndex < stageKeys.length - 1 ? currentIndex + 1 : currentIndex;
      
      const completedCount = Object.values(prev.stages).filter(s => s.completed).length + 1;
      const newProgress = (completedCount / 5) * 100;

      return {
        ...prev,
        currentStage: newCurrentStage,
        stages: {
          ...prev.stages,
          [stage]: { ...prev.stages[stage as keyof typeof prev.stages], completed: true }
        },
        progressPercentage: newProgress
      };
    });
  };

  const addChatMessage = (message: Message) => {
    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, message]
    }));
  };

  const updateProgressPercentage = () => {
    setState(prev => {
      const completedCount = Object.values(prev.stages).filter(s => s.completed).length;
      return { ...prev, progressPercentage: (completedCount / 5) * 100 };
    });
  };

  return (
    <TAPlanContext.Provider value={{
      ...state,
      setCurrentStage,
      updateStageData,
      completeStage,
      addChatMessage,
      updateProgressPercentage,
    }}>
      {children}
    </TAPlanContext.Provider>
  );
}

export function useTAPlan() {
  const context = useContext(TAPlanContext);
  if (!context) {
    throw new Error('useTAPlan must be used within TAPlanProvider');
  }
  return context;
}
