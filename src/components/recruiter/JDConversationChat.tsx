
import React, { useState, useEffect } from "react";
import { ArrowLeft, Send, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../ui/textarea";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string;
}

export const JDConversationChat = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [jdFinalized, setJdFinalized] = useState(false);
  const [finalJD, setFinalJD] = useState("");

  const sampleJD = `<strong>Job Title:</strong> Full Stack Developer
<strong>Work Mode:</strong> Hybrid
<strong>Location:</strong> Chennai, Coimbatore, Bengaluru
<strong>Employment Type:</strong> Full-Time
<strong>Experience Level:</strong> Minimum 2 years

<strong>Why Join Us?</strong>
Join a company where you'll work with cutting-edge technologies in a flexible environment designed to support your growth. Experience a culture that prioritizes professional development and nurtures talent, creating opportunities for career advancement while enabling you to make an impact.

<strong>About the Role</strong>
As a Full Stack Developer, you will be integral to developing and maintaining web applications, collaborating closely with teams across functions. You will have the opportunity to drive features from conception to deployment and play a key part in delivering high-quality software solutions.

<strong>Key Responsibilities</strong>
• Develop and maintain web applications
• Collaborate with cross-functional teams
• Participate in code reviews

<strong>Required Skills</strong>
• JavaScript
• React
• Node.js

<strong>Preferred Skills</strong>
• TypeScript
• GraphQL

<strong>Soft Skills</strong>
• Communication
• Problem-solving

<strong>Preferred Qualifications</strong>
• B.Tech, M.Tech (preferably from IIT, NIT)

<strong>Preferred Experience</strong>
• Experience in the IT industry, especially within Fintech or SaaS domains
• Exposure to agile development methodologies
• Familiarity with large-scale distributed systems

<strong>Who Should Apply</strong>
This role is ideal for Full Stack Developers with at least 2 years of relevant experience who are passionate about technology, thrive in collaborative settings, and are looking for opportunities to learn and grow in a dynamic environment.`;

  useEffect(() => {
    // Initialize with AI's first message
    setMessages([
      {
        id: 1,
        sender: "ai",
        content: `Hi! I've prepared a sample Job Description based on the TA Plan and Hiring Lead requirements for Full Stack Developer. Please review it and let me know if you'd like any changes:\n\n${sampleJD}\n\nWould you like to make any edits to this job description?`
      }
    ]);
  }, [jobId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: currentMessage
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";
      
      if (currentMessage.toLowerCase().includes("finalize this as jd") || 
          currentMessage.toLowerCase().includes("finalize this") ||
          currentMessage.toLowerCase().includes("finalize it") ||
          currentMessage.toLowerCase().includes("looks good") || 
          currentMessage.toLowerCase().includes("approve") ||
          currentMessage.toLowerCase().includes("finalize")) {
        aiResponse = `Excellent! I've finalized the Job Description for Job #${String(jobId).padStart(4, "0")}. The JD is now ready for posting and can be used for recruitment activities.

✅ **Job Description Status: FINALIZED**

You can now:
• Copy the JD to clipboard using the "Copy JD" button below
• Download it as a text document using the "Download JD" button
• Use this JD for posting on job boards and recruitment platforms

The finalized JD includes all the requirements from the TA Plan and incorporates the hiring lead's specifications. You're all set to start recruiting!`;
        setJdFinalized(true);
        setFinalJD(sampleJD);
      } else if (currentMessage.toLowerCase().includes("no changes") || 
                currentMessage.toLowerCase().includes("no edits")) {
        aiResponse = "Great! The Job Description looks perfect as is. Would you like me to finalize it so you can start using it for recruitment?";
      } else {
        aiResponse = `I've noted your feedback: "${currentMessage}". I've updated the Job Description accordingly. Please review the changes and let me know if you'd like any further modifications, or if you're ready to finalize it.

Just say "finalize this as JD" when you're satisfied with the content.`;
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        content: aiResponse
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setCurrentMessage("");
  };

  const handleBack = () => {
    navigate("/recruiter/jobs");
  };

  const handleCopyJD = () => {
    navigator.clipboard.writeText(finalJD);
    // You could add a toast notification here
  };

  const handleDownloadJD = () => {
    const blob = new Blob([finalJD], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Job_Description_${jobId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-[92vh] dark:bg-gray-900 res-1200:h-[91.5vh] res-1400:h-[90vh] res-1600:h-[91.2vh]">
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 res-1200:p-0.5 res-1400:p-1 res-1600:p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="mr-2 res-1200:-mr-0.5 bg-transparent text-black dark:text-white hover:bg-transparent border-none shadow-none cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 res-1200:h-2 res-1200:w-3" />
          </Button>
          <h2 className="text-xl font-semibold flex-grow res-1200:text-[14px] res-1400:text-[16px] res-1600:text-[18px]">
            Create Job Description - Job #{String(jobId).padStart(4, "0")}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4 res-1200:py-5 bg-white dark:bg-gray-900 res-1200:space-y-2 res-1200:px-3 res-1400:py-6 res-1400:px-4 res-1600:py-7 res-1600:px-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 flex res-1200:mb-3 res-1400:mb-4 res-1600:mb-5 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <div className="flex items-start max-w-[80%]">
                  <div className="flex flex-col justify-end">
                    <div className="bg-gray-200 p-2 dark:bg-gray-700 rounded-lg">
                      <p className="text-slate-900 px-1 dark:text-blue-100 whitespace-pre-line text-base res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]" dangerouslySetInnerHTML={{ __html: message.content }}>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {message.sender === "user" && (
                <div className="flex items-start max-w-[70%]">
                  <div className="flex flex-col justify-end">
                    <div className="bg-blue-100 p-2 dark:bg-blue-900 rounded-lg">
                      <p className="text-blue-900 px-1 dark:text-blue-100 whitespace-pre-line text-base res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]" dangerouslySetInnerHTML={{ __html: message.content }}>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {jdFinalized && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleCopyJD}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Copy className="h-4 w-4" />
                Copy JD
              </Button>
              <Button
                onClick={handleDownloadJD}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-4 w-4" />
                Download JD
              </Button>
            </div>
          </div>
        )}

        <div className="py-3 px-4 res-1200:p-2 overflow-hidden res-1600:pt-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <textarea
              placeholder="Send a Message"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e as any);
                }
              }}
              rows={1}
              style={{ minHeight: "40px", maxHeight: "120px" }}
              className="flex-1 resize-none overflow-y-auto scrollbar-hide px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#7E00FC] transition-all duration-200 res-1200:text-[10px] res-1400:text-xs"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full h-10 w-10 cursor-pointer flex items-center justify-center bg-gradient-to-br from-[#7E00FC] to-[#0A92FE] hover:from-[#0A92FE] hover:to-[#7E00FC] 
              res-1200:h-7 res-1200:w-7 res-1400:h-7 res-1400:w-7"
              disabled={!currentMessage.trim()}
            >
              <Send className="h-4 w-4 res-1200:h-3 res-1200:w-2.5 res-1400:h-3 res-1400:w-3 res-1600:h-4 res-1600:w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
