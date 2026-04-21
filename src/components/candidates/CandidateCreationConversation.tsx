
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChatWindow } from "@/components/Reuseable/ChatWindow";
import { CandidatePreviewSidebar } from "./CandidatePreviewSidebar";
import { FileUploadProgress } from "@/components/messages/FileUploadProgress";
import { parsePDFText, parseCV } from "@/utils/cvParser";
import { ParsedCVData, Candidate } from "@/types/candidate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string | JSX.Element;
  name: string;
}

export function CandidateCreationConversation() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      content: "Hi! I'll help you create a new candidate profile. Please attach the candidate's CV to automatically fill in their details. I'll parse the document and extract key information like contact details, skills, and experience.",
      name: "Talentou AI",
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [parsedCVData, setParsedCVData] = useState<ParsedCVData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [conversationStep, setConversationStep] = useState(0);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackClick = () => {
    // Check if name and email are missing
    const hasName = parsedCVData?.firstName && parsedCVData?.lastName;
    const hasEmail = parsedCVData?.email;
    
    if (!hasName || !hasEmail) {
      setShowLeaveDialog(true);
    } else {
      navigate("/ta-associate/candidates");
    }
  };

  const handleConfirmLeave = () => {
    setShowLeaveDialog(false);
    navigate("/ta-associate/candidates");
  };

  const handleFileSelect = async () => {
    const input = fileInputRef.current;
    if (!input?.files?.length) return;

    const file = input.files[0];
    setUploadedFileName(file.name);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Parse the CV (generates sample data regardless of actual content)
      const cvText = await parsePDFText(file);
      const parsed = parseCV(cvText);
      setParsedCVData(parsed);

      // Add upload complete message
      setTimeout(() => {
        setIsUploading(false);
        
        const newMessages: Message[] = [
          {
            id: messages.length + 1,
            sender: "user",
            content: <FileUploadProgress fileName={file.name} progress={100} />,
            name: "You",
          },
          {
            id: messages.length + 2,
            sender: "ai",
            content: `Perfect! I've successfully parsed the CV and extracted the candidate information. You can see all the auto-filled details in the form on the right.

I've filled in:
✅ Personal Information (Name, Email, Phone, Location)
✅ Current Position: ${parsed.currentPosition}
✅ Skills: ${parsed.skills?.length || 0} technical skills identified
✅ Experience Summary: Work history and achievements

Just need a couple more details from you:

1. Which hiring manager should be assigned to this candidate?
2. What interview stage should they start in? (Initial Screening, Technical Interview, Final Round, etc.)`,
            name: "Talentou AI",
          }
        ];

        setMessages(prev => [...prev, ...newMessages]);
        setConversationStep(1);
      }, 2000);

    } catch (error) {
      console.error('Error parsing CV:', error);
      setIsUploading(false);
      
      const errorMessage: Message = {
        id: messages.length + 1,
        sender: "ai",
        content: "I had trouble parsing that document. Let me generate some sample candidate data for you to review. Please check the form on the right and let me know which hiring manager should be assigned.",
        name: "Talentou AI",
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: currentMessage,
      name: "You",
    };

    let aiResponse: Message | null = null;

    if (conversationStep === 1) {
      // After CV parsing, ask for missing info or confirm
      aiResponse = {
        id: messages.length + 2,
        sender: "ai",
        content: "Great! I've noted the hiring manager assignment. One more question: What interview stage should this candidate be placed in initially?",
        name: "Talentou AI",
      };
      setConversationStep(2);
    } else if (conversationStep === 2) {
      // Final step - create candidate
      aiResponse = {
        id: messages.length + 2,
        sender: "ai",
        content: `Excellent! I've successfully created the candidate profile for ${parsedCVData?.firstName} ${parsedCVData?.lastName}. 

✅ All information from the CV has been saved
✅ Hiring manager assigned
✅ Interview stage set
✅ Candidate added to your pipeline

The candidate is now ready for the interview process. You can view their complete profile in the candidates list.

Would you like to create another candidate or return to the candidates dashboard?`,
        name: "Talentou AI",
      };
      setConversationStep(3);
    }

    const newMessages = aiResponse ? [userMessage, aiResponse] : [userMessage];
    setMessages(prev => [...prev, ...newMessages]);
    setCurrentMessage("");
  };

  const sidebarComponent = (
    <CandidatePreviewSidebar 
      parsedData={parsedCVData} 
      isLoading={isUploading && uploadProgress < 100} 
    />
  );

  return (
    <>
      <ChatWindow
        title="Create New Candidate"
        messages={messages}
        currentMessage={currentMessage}
        onCurrentMessageChange={setCurrentMessage}
        onSendMessage={handleSendMessage}
        onBackClick={handleBackClick}
        onFileSelect={handleFileSelect}
        sidebarComponent={sidebarComponent}
        showProceedButton={conversationStep === 3}
        proceedButtonText="Back to Candidates"
      />
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      
      {isUploading && uploadedFileName && (
        <div className="fixed bottom-4 right-4 z-50">
          <FileUploadProgress fileName={uploadedFileName} progress={uploadProgress} />
        </div>
      )}

      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent className="border-[#7800D3]/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-[#7800D3]">
              Are you sure you want to leave?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              If you leave now, without providing the candidate's name & email, the candidate's data will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#7800D3]/30 hover:bg-[#7800D3]/10">
              No
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmLeave}
              className="bg-[#4ead3b] text-black hover:bg-[#4ead3b]/90"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
