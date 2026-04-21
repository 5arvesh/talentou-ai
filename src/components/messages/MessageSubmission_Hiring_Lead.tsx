import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Expand, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import FileUploadProgress from "./FileUploadProgress";
import MessageInput from "./MessageInput";
import { JobDetailsTable } from "@/components/hiring-lead/JobDetailsTable";
import CustomAccordion from "@/components/Reuseable/Accordion";
import { User, Settings } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export const MessageSubmission_Hiring_Lead = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);

  const [messages, setMessages] = useState<
    { content: string; from: "user" | "ai" }[]
  >([
    {
      content: `Thank you. Let's begin setting up the new position. I'll ask you a few quick questions to gather the necessary details.

Thanks! What is the internal title you'd like to use for this position?`,
      from: "ai",
    },
    {
      content: `Product Engineer`,
      from: "user",
    },
    {
      content: `And what would you say is the functional role for this position?`,
      from: "ai",
    },
    {
      content: `Full Stack Developer`,
      from: "user",
    },
    {
      content: `Great. How many openings are there for this position?`,
      from: "ai",
    },
    {
      content: `2`,
      from: "user",
    },
    {
      content: `Understood. Is this opening for a Client Project or an Internal Position within your company?`,
      from: "ai",
    },
    {
      content: `Client Project`,
      from: "user",
    },
    {
      content: `Noted. What Is the name of the Project?`,
      from: "ai",
    },
    {
      content: `Amgen`,
      from: "user",
    },
    {
      content: `Could you specify the employment mode you're hiring for in this role?`,
      from: "ai",
    },
    {
      content: `Full time`,
      from: "user",
    },
    {
      content: `Got it. Your TA Leader has provided Banglore and Chennai as the hiring regions, what will be the job location for this position?`,
      from: "ai",
    },
    {
      content: `Chennai, India`,
      from: "user",
    },
    {
      content: `Thanks for confirming the job location. Your TA Leader has allowed for positions to be open to onsite, remote or hybrids, what is your preferred work arrangement?`,
      from: "ai",
    },
    {
      content: `Onsite only`,
      from: "user",
    },
    {
      content: `Understood, please list out the skills needed for this position, you can rank the skills in order of priority`,
      from: "ai",
    },
    {
      content: `1. MongoDB
2. Node.js
3. AWS
4. TypeScript`,
      from: "user",
    },
    {
      content: `Noted. What is the minimum expected years of experience for this role?`,
      from: "ai",
    },
    {
      content: `0 years`,
      from: "user",
    },
    {
      content: `Great. Please upload or link a sample profile that reflects your ideal candidate - optional but helpful for Recruiter's understanding & AI matching`,
      from: "ai",
    },
    {
      content: `*Attaches sample profile or skips this step*`,
      from: "user",
    },
    {
      content: `Thank you. Based on the role, experience level, company size, and location, the market-standard salary range is approximately ₹12 to ₹15 LPA.

What is the maximum budget allowed for ths position?`,
      from: "ai",
    },
    {
      content: `This works, please keep it`,
      from: "user",
    },
    {
      content: `Got it. Here's a draft of the key responsibilities for this role, based on industry best practices:

Build and maintain scalable backend APIs
Integrate with cloud infrastructure (AWS)
Collaborate with frontend and DevOps teams
Mentor and guide junior developers

Would you like to keep this or make changes?`,
      from: "ai",
    },
    {
      content: `Looks good, please keep it.`,
      from: "user",
    },
    {
      content: `Based on the plan set by your TA Lead, we're focusing on IT Services Industries. Would you like to add any specific Industries you'd prefer candidates to come from?`,
      from: "ai",
    },
    {
      content: `Looks good.`,
      from: "user",
    },
    {
      content: `Understood. Do you have any preferred domain experience you'd like to prioritize for this role? For example, healthcare, retail, fintech, etc.`,
      from: "ai",
    },
    {
      content: `Experience in fintech or SaaS would be ideal.`,
      from: "user",
    },
    {
      content: `Your TA Lead has already selected Tier 2 colleges as part of the sourcing strategy. Are there any specific institutions you'd like to prioritize in addition to this?`,
      from: "ai",
    },
    {
      content: `Yes, candidates from NITs or VIT would be great.`,
      from: "user",
    },
    {
      content: `Based on the plan set by your TA Lead, we're focusing on product-based firms. Would you like to add any specific companies you'd prefer candidates to come from?`,
      from: "ai",
    },
    {
      content: `Yes, candidates from Mindtree or Wipro would be great.`,
      from: "user",
    },
    {
      content: `Got it. Do you have a target start date in mind for this position?`,
      from: "ai",
    },
    {
      content: `1st November.`,
      from: "user",
    },
    {
      content: `Would you like to nominate an Interviewer to help define job-specific questions or review candidates for this role?`,
      from: "ai",
    },
    {
      content: `Yes, Ramachandran S.`,
      from: "user",
    },
    {
      content: `Ramachandran S has been selected as the Interviewer for this position. Please provide their email address.`,
      from: "ai",
    },
    {
      content: `Ramchandran.s@company.com`,
      from: "user",
    },
    {
      content: `Perfect. Ramachandran S has been added as the Interviewer for this position.

Thanks for sharing all the details. Based on your inputs, I've generated a draft Job Description for this position.

Would you like to review it before it's sent to your TA Lead for approval?`,
      from: "ai",
    },
  ]);
  const [submittedMessage, setSubmittedMessage] = useState(
    `Product Engineer position for Amgen project. Looking for Full Stack Developer with MongoDB, Node.js, AWS, and TypeScript skills. 0+ years experience in Chennai (onsite only) with ₹12-15 LPA budget. Preference for candidates from NITs/VIT with fintech/SaaS experience.`
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [messageProgress, setMessageProgress] = useState(100);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    setValuePropositionAligned,
    setCollateralsAligned,
    setMarketCriteriaAligned,
  } = useAlignment();

  // Accordion states
  const [isProductEngineerExpanded, setIsProductEngineerExpanded] =
    useState(false);
  const [isPreferencesExpanded, setIsPreferencesExpanded] = useState(false);
  const [areAllExpanded, setAreAllExpanded] = useState(false);

  const handleBackClick = () => {
    // Navigate back to the hiring lead dashboard
    navigate("/hiring-lead-plan/dashboard");
  };

  const handleGoAhead = () => {
    // Set the message as aligned to mark the first card as complete
    setValuePropositionAligned(true);
    setCollateralsAligned(true);

    // Reset Market card aligned status to false to highlight it as next step
    setMarketCriteriaAligned(false);

    // Navigate to the talent pool criteria page
    navigate("/hiring-lead-plan");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);

      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    const newUserMessage = {
      content: message,
      from: "user" as const,
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Save submitted message
    setSubmittedMessage(message);

    // Simulate progress update
    setMessageProgress(50);

    // Clear input
    setMessage("");

    // Mark as aligned in context
    setValuePropositionAligned(true);
    setCollateralsAligned(true);

    // Simulate AI response with acknowledgment
    setTimeout(() => {
      const aiResponse = {
        content:
          "Thanks! I've received your additional information. This will be added to your hiring plan.",
        from: "ai" as const,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setMessageProgress(100);

      toast({
        title: "Information saved",
        description:
          "Your hiring information has been successfully added to your plan.",
      });
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "Preview Job Description") {
      setIsJobDescriptionOpen(true);
      return;
    }

    setMessage(suggestion);
    // Optionally auto-send the message
    // handleSendMessage();
  };

  const handleExpandAll = () => {
    const newState = !areAllExpanded;
    setAreAllExpanded(newState);
    setIsProductEngineerExpanded(newState);
    setIsPreferencesExpanded(newState);
  };

  return (
    <Layout>
      <div className="flex h-full">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left side - Chat panel */}
          <ResizablePanel defaultSize={70} minSize={50}>
            <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
              {/* Back button and header */}
              <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center rounded-t-lg res-1200:p-2 res-1200:rounded-t-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 res-1200:mr-0"
                  onClick={handleBackClick}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold res-1200:text-md">
                    Position Setup
                  </h2>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 p-6 overflow-y-auto res-1200:p-3 res-1200:text-xs res-1400:text-sm">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-6 res-1200:mb-3">
                    <ChatMessage content={msg.content} from={msg.from} />
                  </div>
                ))}

                {uploadedFile && uploadProgress < 100 && (
                  <FileUploadProgress
                    fileName={uploadedFile.name}
                    progress={uploadProgress}
                  />
                )}
              </div>

              {/* Divider */}
              <div className="relative w-full">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-br from-[#7E00FC] to-[#0A92FE] z-10 res-1200:h-[1.5px]" />

                {/* Suggestions below divider - aligned right */}
                <div className="bg-white dark:bg-gray-800 w-full flex justify-end px-6 pt-4 pb-2 res-1200:px-3 res-1200:pt-2">
                  <div className="flex gap-2 flex-wrap">
                    <Dialog
                      open={isJobDescriptionOpen}
                      onOpenChange={setIsJobDescriptionOpen}
                    >
                      <DialogTrigger asChild>
                        {/* <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-sm px-4 py-2 hover:bg-purple-500/10 border-gray-300 transition-colors"
                          onClick={() => handleSuggestionClick("Preview Job Description")}
                        >
                        </Button> */}
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Job Description Preview</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 text-sm">
                          <div>
                            <h3 className="font-semibold text-lg">
                              Job Title: Full Stack Developer
                            </h3>
                            <p className="mt-2">
                              <strong>Location:</strong> Chennai, India
                            </p>
                            <p>
                              <strong>Employment Type:</strong> Full-Time
                            </p>
                            <p>
                              <strong>Experience Level:</strong> 0–1 year
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-base mb-2">
                              Why Join Us?
                            </h4>
                            <p>
                              You'll be part of a high-growth, product-led
                              company that offers the agility of a startup and
                              the stability of a growth-stage venture. Here, we
                              don't just build digital products — we create
                              purposeful solutions powered by AI and driven by
                              user impact.
                            </p>
                            <p className="mt-2">
                              Our work culture encourages ownership, innovation,
                              and close collaboration with business leaders.
                              You'll gain hands-on experience across the product
                              lifecycle, from ideation to delivery, while being
                              surrounded by a team that values clarity, frugal
                              innovation, and impact over noise.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-base mb-2">
                              About the Role
                            </h4>
                            <p>
                              We are looking for a passionate and driven Full
                              Stack Developer to join our engineering team for a
                              mission-critical digital transformation project
                              with a leading global client in the Life Sciences
                              industry. This opportunity is ideal for
                              individuals who are eager to work on scalable
                              backend systems while collaborating with
                              cross-functional teams to build impactful,
                              enterprise-grade digital products.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-base mb-2">
                              Key Responsibilities
                            </h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>
                                Design, develop, and maintain scalable backend
                                APIs
                              </li>
                              <li>
                                Collaborate with DevOps and frontend teams for
                                seamless integration
                              </li>
                              <li>
                                Implement and manage cloud infrastructure using
                                AWS
                              </li>
                              <li>Write clean, efficient, and testable code</li>
                              <li>
                                Participate in code reviews and technical
                                discussions
                              </li>
                              <li>
                                Support and mentor junior developers as needed
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-base mb-2">
                              Required Skills
                            </h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>MongoDB</li>
                              <li>Node.js</li>
                              <li>AWS</li>
                              <li>TypeScript</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-base mb-2">
                              Preferred Qualifications
                            </h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>
                                Exposure to Fintech or SaaS domain projects
                              </li>
                              <li>
                                Strong understanding of RESTful services and
                                microservices architecture
                              </li>
                              <li>
                                Ability to work in an Agile/Scrum development
                                environment
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-base mb-2">
                              Who Should Apply
                            </h4>
                            <p>
                              This role is perfect for recent graduates or
                              early-career developers who want to work in
                              real-world projects and fast-track their learning
                              curve by contributing to impactful solutions in a
                              global enterprise environment.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-base mb-2">
                              Work Mode
                            </h4>
                            <p>On-site – Chennai, India</p>
                          </div>

                          <div>
                            <p>
                              📩 Apply now and be part of something impactful –
                              [Insert the Job Order hyperlink once added to the
                              careers page]
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-sm px-4 py-2 hover:bg-purple-500/10 border-gray-300 transition-colors"
                      onClick={() => handleSuggestionClick("Make Edits")}
                    >
                      Make Edits
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-sm px-4 py-2 hover:bg-purple-500/10 border-gray-300 transition-colors"
                      onClick={() =>
                        handleSuggestionClick("Submit for TA Lead Approval")
                      }
                    >
                      Submit for TA Lead Approval
                    </Button>
                  </div>
                </div>
              </div>

              {/* Message input */}
              <MessageInput
                message={message}
                setMessage={setMessage}
                onSend={handleSendMessage}
                onFileSelect={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right side - Job Details panel */}
          <ResizablePanel defaultSize={30} minSize={25} maxSize={50}>
            <div className="h-full bg-gray-50 dark:bg-gray-800/50">
              <div className="p-4 h-full overflow-y-auto">
                {/* Expand/Collapse All Button */}
                <div className="flex justify-end mb-3">
                  <Button
                    onClick={handleExpandAll}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-xs"
                  >
                    {areAllExpanded ? (
                      <Minimize2 className="w-3 h-3" />
                    ) : (
                      <Expand className="w-3 h-3" />
                    )}
                    {areAllExpanded ? "Collapse All" : "Expand All"}
                  </Button>
                </div>

                <div className="space-y-3">
                  {/* Accordion 1: Product Engineer */}
                  <CustomAccordion
                    bgclr="#ae6bf2"
                    key={1}
                    isCollapsed={isProductEngineerExpanded}
                    title="Product Engineer"
                    content={
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-2">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/2">
                                Functional Role
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                Full Stack Developer
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-[#ae6bf2]/10">
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Project
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                Amgen
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Location
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                Chennai, India
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-[#ae6bf2]/10">
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Start Date
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                1st November
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Number of Openings
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                2
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-[#ae6bf2]/10">
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Minimum Experience
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                0 years
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Maximum Budget
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                ₹15 LPA
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-[#ae6bf2]/10">
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Employment Type
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                Full time
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Work Mode
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                Onsite
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-[#ae6bf2]/10">
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Must Have
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                <div className="space-y-1">
                                  <div>1. MongoDB</div>
                                  <div>2. Node.js</div>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Could Have
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                <div className="space-y-1">
                                  <div>1. AWS</div>
                                  <div>2. TypeScript</div>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-[#ae6bf2]/10">
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Behavioral
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                <div className="space-y-1">
                                  <div>1. Communication</div>
                                  <div>2. Leadership</div>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Responsibilities
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                <div className="space-y-1">
                                  <div>
                                    1. Build and maintain scalable backend APIs
                                  </div>
                                  <div>
                                    2. Integrate with cloud infrastructure (AWS)
                                  </div>
                                  <div>
                                    3. Collaborate with frontend & DevOps teams
                                  </div>
                                  <div>4. Mentor junior developers</div>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-[#ae6bf2]/10">
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Sample Profile
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                <div className="space-y-1">
                                  <div>N/A</div>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                Interviewer
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                <div className="space-y-1">
                                  <div>Ramachandran</div>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    }
                    toggleCollapse={() =>
                      setIsProductEngineerExpanded(!isProductEngineerExpanded)
                    }
                    icon={<User className="w-4 h-4" />}
                  />

                  {/* Accordion 2: Preferences */}
                  <CustomAccordion
                    bgclr="#4a8ff7"
                    key={2}
                    isCollapsed={isPreferencesExpanded}
                    title="Preferences"
                    content={
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-2 space-y-4">
                        <div className="w-full">
                          <table className="table-auto w-full text-sm overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
                            <thead>
                              <tr className="bg-[#eef4fe] dark:bg-gray-800">
                                <th className="px-4 py-2 text-left rounded-tl-md">
                                  Industry
                                </th>
                                <th className="px-4 py-2 text-left">Domain</th>
                                <th className="px-4 py-2 text-left rounded-tr-md">
                                  Preferred Companies
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-[#f8fbff]">
                              <tr>
                                <td className={`px-4 py-2`}>IT Services</td>
                                <td className="px-4 py-2">Fintech, SaaS</td>
                                <td className={`px-4 py-2`}>MindTree, Wipro</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        {/* Educational Information Section */}
                        <div className="w-full">
                          <table className="table-auto w-full text-sm overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
                            <tbody className="bg-[#f8fbff] dark:bg-gray-800">
                              <tr className="bg-[#eef4fe] dark:bg-gray-700">
                                <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 w-1/2">
                                  Educational Institute
                                </td>
                                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  1. SNS College of Technology
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
                                  Educational Qualification
                                </td>
                                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  1. B.Tech
                                </td>
                              </tr>
                              <tr className="bg-[#eef4fe] dark:bg-gray-700">
                                <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
                                  Sample Profile
                                </td>
                                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  Sarvesh
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    }
                    toggleCollapse={() =>
                      setIsPreferencesExpanded(!isPreferencesExpanded)
                    }
                    icon={<Settings className="w-4 h-4" />}
                  />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default MessageSubmission_Hiring_Lead;
