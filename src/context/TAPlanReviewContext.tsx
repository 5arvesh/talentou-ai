import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface FeedbackMessage {
  id: string;
  section: 'companyUSP' | 'talentPool' | 'general';
  message: string;
  timestamp: Date;
}

interface TAPlanReviewContextType {
  currentSection: 1 | 2;
  setCurrentSection: (section: 1 | 2) => void;
  
  sectionViewed: {
    companyUSP: boolean;
    talentPool: boolean;
  };
  markSectionAsViewed: (section: 'companyUSP' | 'talentPool') => void;
  
  viewedAccordions: Set<string>;
  markAccordionAsViewed: (accordionId: string) => void;
  
  feedbackMessages: FeedbackMessage[];
  addFeedback: (section: 'companyUSP' | 'talentPool' | 'general', message: string) => void;
  
  chatMessages: Message[];
  addChatMessage: (sender: 'ai' | 'user', content: string) => void;
  
  isAligned: boolean;
  setIsAligned: (aligned: boolean) => void;
}

const TAPlanReviewContext = createContext<TAPlanReviewContextType | undefined>(undefined);

const SECTION_AI_MESSAGES = {
  1: "Welcome! Please review the Company USP section. The TA Leader has outlined Ignitho's unique value propositions. You can provide feedback here in the chat or use the feedback box at the end of the section.",
  2: "Great! Now let's review the Talent Pool criteria. Check the work arrangements, hiring regions, and target criteria. Share feedback if you have suggestions, then align with the plan when ready."
};

export function TAPlanReviewProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSectionState] = useState<1 | 2>(1);
  const [sectionViewed, setSectionViewed] = useState({
    companyUSP: false,
    talentPool: false,
  });
  const [viewedAccordions, setViewedAccordions] = useState<Set<string>>(new Set());
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: SECTION_AI_MESSAGES[1],
      timestamp: new Date(),
    }
  ]);
  const [isAligned, setIsAligned] = useState(false);

  const setCurrentSection = (section: 1 | 2) => {
    // Mark previous section as viewed when moving to next section
    if (currentSection === 1 && section !== 1) {
      setSectionViewed(prev => ({ ...prev, companyUSP: true }));
    } else if (currentSection === 2 && section !== 2) {
      setSectionViewed(prev => ({ ...prev, talentPool: true }));
    }
    
    setCurrentSectionState(section);
    
    // Add AI message for new section if not already present
    const hasMessageForSection = chatMessages.some(
      msg => msg.content === SECTION_AI_MESSAGES[section]
    );
    
    if (!hasMessageForSection) {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        content: SECTION_AI_MESSAGES[section],
        timestamp: new Date(),
      }]);
    }
  };

  const markSectionAsViewed = (section: 'companyUSP' | 'talentPool') => {
    setSectionViewed(prev => ({ ...prev, [section]: true }));
  };

  const markAccordionAsViewed = (accordionId: string) => {
    setViewedAccordions(prev => new Set([...prev, accordionId]));
  };

  const addFeedback = (section: 'companyUSP' | 'talentPool' | 'general', message: string) => {
    const newFeedback: FeedbackMessage = {
      id: Date.now().toString(),
      section,
      message,
      timestamp: new Date(),
    };
    setFeedbackMessages(prev => [...prev, newFeedback]);
  };

  const addChatMessage = (sender: 'ai' | 'user', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      content,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, newMessage]);
    
    // If user sends message, determine which section it belongs to and add as feedback
    if (sender === 'user' && content.trim()) {
      let feedbackSection: 'companyUSP' | 'talentPool' | 'general' = 'general';
      if (currentSection === 1) feedbackSection = 'companyUSP';
      else if (currentSection === 2) feedbackSection = 'talentPool';
      
      addFeedback(feedbackSection, content);
      
      // Add AI acknowledgment
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: "Thank you for your feedback. It has been noted and will be shared with the TA Leader.",
          timestamp: new Date(),
        }]);
      }, 500);
    }
  };

  return (
    <TAPlanReviewContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        sectionViewed,
        markSectionAsViewed,
        viewedAccordions,
        markAccordionAsViewed,
        feedbackMessages,
        addFeedback,
        chatMessages,
        addChatMessage,
        isAligned,
        setIsAligned,
      }}
    >
      {children}
    </TAPlanReviewContext.Provider>
  );
}

export function useTAPlanReview() {
  const context = useContext(TAPlanReviewContext);
  if (!context) {
    throw new Error('useTAPlanReview must be used within TAPlanReviewProvider');
  }
  return context;
}
