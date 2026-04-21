import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: number;
  sender: 'ai' | 'user';
  content: string;
  timestamp: Date;
  sectionId: number;
}

interface ConversationStage {
  completed: boolean;
}

interface PlanData {
  companyUSP: {
    elevatorPitch: string;
  };
  talentPool: {
    workMode: string[];
    cities: string[];
    targetIndustries: string[];
    educationalInstitutions: string[];
  };
  recruitmentChannels: {
    digitalPlatforms: string[];
    internalChannels: string[];
    recruitmentAgencies: string[];
    offlineEvents: string[];
  };
  teamInvitations: {
    members: Array<{
      email: string;
      roles: ('recruiter' | 'hiring_lead' | 'hr')[];
    }>;
  };
}

interface TAPlanFlowContextType {
  chatMessages: Message[];
  currentStage: number;
  stages: {
    companyUSP: ConversationStage;
    talentPool: ConversationStage;
    recruitmentChannels: ConversationStage;
    teamInvitation: ConversationStage;
    successMetrics: ConversationStage;
  };
  planData: PlanData;
  progressPercentage: number;
  getSectionScore: (section: 'companyUSP' | 'talentPool' | 'recruitmentChannels') => number;
  addChatMessage: (message: Omit<Message, 'id' | 'timestamp' | 'sectionId'>) => void;
  setCurrentStage: (stage: number) => void;
  completeStage: (stage: 'companyUSP' | 'talentPool' | 'recruitmentChannels' | 'teamInvitation') => void;
  updatePlanData: <K extends keyof PlanData>(
    section: K,
    data: Partial<PlanData[K]>
  ) => void;
}

const TAPlanFlowContext = createContext<TAPlanFlowContextType | undefined>(undefined);

export function TAPlanFlowProvider({ children }: { children: ReactNode }) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [stages, setStages] = useState({
    companyUSP: { completed: false },
    talentPool: { completed: false },
    recruitmentChannels: { completed: false },
    teamInvitation: { completed: false },
    successMetrics: { completed: false },
  });

  const [planData, setPlanData] = useState<PlanData>({
    companyUSP: {
      elevatorPitch: '',
    },
    talentPool: {
      workMode: [],
      cities: [],
      targetIndustries: [],
      educationalInstitutions: [],
    },
    recruitmentChannels: {
      digitalPlatforms: [],
      internalChannels: [],
      recruitmentAgencies: [],
      offlineEvents: [],
    },
    teamInvitations: {
      members: [],
    },
  });

  const addChatMessage = (message: Omit<Message, 'id' | 'timestamp' | 'sectionId'>) => {
    setChatMessages((prev) => {
      const newMessage = {
        ...message,
        id: prev.length + 1,
        timestamp: new Date(),
        sectionId: currentStage,
      };
      
      // Find all messages for this section
      const sectionMessages = prev.filter((m) => m.sectionId === currentStage);
      
      if (sectionMessages.length === 0) {
        // First message for this section - append to end
        return [...prev, newMessage];
      }
      
      // Insert after last message of this section
      const lastSectionMessage = sectionMessages[sectionMessages.length - 1];
      const lastIndex = prev.findIndex((m) => m.id === lastSectionMessage.id);
      
      return [
        ...prev.slice(0, lastIndex + 1),
        newMessage,
        ...prev.slice(lastIndex + 1),
      ];
    });
  };

  const completeStage = (stage: keyof typeof stages) => {
    setStages((prev) => ({
      ...prev,
      [stage]: { completed: true },
    }));
  };

  const updatePlanData = <K extends keyof PlanData>(
    section: K,
    data: Partial<PlanData[K]>
  ) => {
    setPlanData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const getSectionScore = (section: 'companyUSP' | 'talentPool' | 'recruitmentChannels'): number => {
    switch (section) {
      case 'companyUSP':
        return planData.companyUSP.elevatorPitch.length >= 50 ? 100 : 0;
      
      case 'talentPool':
        let poolScore = 0;
        if (planData.talentPool.workMode.length > 0) poolScore += 33;
        if (planData.talentPool.cities.length > 0) poolScore += 33;
        if (planData.talentPool.targetIndustries.length > 0) poolScore += 34;
        return poolScore;
      
      case 'recruitmentChannels':
        let channelScore = 0;
        if (planData.recruitmentChannels.digitalPlatforms.length > 0) channelScore += 40;
        if (planData.recruitmentChannels.internalChannels.length > 0) channelScore += 30;
        if (planData.recruitmentChannels.recruitmentAgencies.length > 0) channelScore += 15;
        if (planData.recruitmentChannels.offlineEvents.length > 0) channelScore += 15;
        return channelScore;
      
      default:
        return 0;
    }
  };

  // Only count first 3 active stages for progress (0, 1, 2)
  const completedStagesCount = [
    stages.companyUSP.completed,
    stages.talentPool.completed,
    stages.teamInvitation.completed,
  ].filter(Boolean).length;
  const progressPercentage = Math.round((completedStagesCount / 3) * 100);

  return (
    <TAPlanFlowContext.Provider
      value={{
        chatMessages,
        currentStage,
        stages,
        planData,
        progressPercentage,
        getSectionScore,
        addChatMessage,
        setCurrentStage,
        completeStage,
        updatePlanData,
      }}
    >
      {children}
    </TAPlanFlowContext.Provider>
  );
}

export function useTAPlanFlow() {
  const context = useContext(TAPlanFlowContext);
  if (!context) {
    throw new Error('useTAPlanFlow must be used within TAPlanFlowProvider');
  }
  return context;
}
