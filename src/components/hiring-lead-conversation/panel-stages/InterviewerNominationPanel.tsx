import React, { useState, useEffect } from "react";
import { useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Mail, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Mock data for existing interviewers
const existingInterviewers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    initials: "JS",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    initials: "SJ",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@company.com",
    initials: "MC",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@company.com",
    initials: "ED",
  },
];

export function InterviewerNominationPanel() {
  const { jobDetails, updateJobDetails, completeStage, addChatMessage, setCurrentStage } = useHiringLeadConversation();
  const [emailInput, setEmailInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Show dropdown immediately when nominate is selected
  useEffect(() => {
    if (jobDetails.interviewerType === "nominate") {
      setShowSuggestions(true);
    }
  }, [jobDetails.interviewerType]);

  const handleCreatePosition = () => {
    addChatMessage({
      id: Date.now(),
      sender: 'ai',
      content: "Your position has been created! Please review the Job Description below before submitting for approval.",
      name: 'Talentou AI',
      stageIndex: 2
    });
    completeStage('interviewerNomination');
    setCurrentStage(3); // Open the JD preview section
  };

  const handleEmailChange = (value: string) => {
    setEmailInput(value);
    setShowSuggestions(true);
    updateJobDetails({
      nominatedEmail: value,
    });
  };

  const handleSelectExisting = (interviewer: (typeof existingInterviewers)[0]) => {
    setEmailInput(interviewer.email);
    setShowSuggestions(false);
    updateJobDetails({
      nominatedEmail: interviewer.email,
      nominatedName: interviewer.name,
      existingInterviewerId: interviewer.id,
      existingInterviewerName: interviewer.name,
      existingInterviewerEmail: interviewer.email,
    });
  };

  const handleCreateNew = () => {
    setShowSuggestions(false);
    updateJobDetails({
      nominatedEmail: emailInput,
      nominatedName: "",
      existingInterviewerId: "",
      existingInterviewerName: "",
      existingInterviewerEmail: "",
    });
  };

  const filteredInterviewers = emailInput.length > 0 
    ? existingInterviewers.filter(
        (interviewer) =>
          interviewer.email.toLowerCase().includes(emailInput.toLowerCase()) ||
          interviewer.name.toLowerCase().includes(emailInput.toLowerCase()),
      )
    : existingInterviewers;

  const showCreateOption = emailInput.length > 0 && filteredInterviewers.length === 0;

  return (
    <div className="space-y-6">
        <RadioGroup
          value={jobDetails.interviewerType}
          onValueChange={(value: "self" | "existing" | "nominate") => {
            updateJobDetails({
              interviewerType: value,
            });
            if (value === "nominate") {
              setShowSuggestions(true);
            }
          }}
          className="space-y-4"
        >
          {/* Self Option - Now shows "Ananthan" */}
          <Card
            className={cn(
              "p-5 cursor-pointer transition-all border-2",
              jobDetails.interviewerType === "self"
                ? "border-[#7800D3]"
                : "border-border hover:bg-muted/50",
            )}
            onClick={() =>
              updateJobDetails({
                interviewerType: "self",
              })
            }
          >
            <div className="flex items-start gap-4">
              <RadioGroupItem value="self" id="self" className="mt-1.5" />
              <div className="flex-1 space-y-3">
                <Label htmlFor="self" className="text-sm font-semibold cursor-pointer">
                  I'll be the Interviewer
                </Label>

                {jobDetails.interviewerType === "self" && (
                  <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground text-base font-semibold">AN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-base">Ananthan</p>
                      <p className="text-sm text-muted-foreground">You will conduct all interviews</p>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-[#7800D3]" />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Nominate Interviewer Option - Combined */}
          <Card
            className={cn(
              "p-5 cursor-pointer transition-all border-2",
              jobDetails.interviewerType === "nominate"
                ? "border-[#7800D3]"
                : "border-border hover:bg-muted/50",
            )}
            onClick={() => {
              updateJobDetails({
                interviewerType: "nominate",
              });
              setShowSuggestions(true);
            }}
          >
            <div className="flex items-start gap-4">
              <RadioGroupItem value="nominate" id="nominate" className="mt-1.5" />
              <div className="flex-1 space-y-3">
                <Label htmlFor="nominate" className="text-sm font-semibold cursor-pointer">
                  Nominate an Interviewer
                </Label>

                {jobDetails.interviewerType === "nominate" && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2 relative">
                      <Label htmlFor="interviewerEmail" className="text-sm font-medium text-foreground">
                        Select or Search for an Interviewer
                      </Label>
                      <Input
                        id="interviewerEmail"
                        type="text"
                        value={emailInput}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && emailInput.trim()) {
                            e.preventDefault();
                            handleCreateNew();
                          }
                        }}
                        placeholder="Search by name or email..."
                        className="h-11 bg-muted/30"
                        onClick={(e) => e.stopPropagation()}
                      />

                      {/* Autocomplete Suggestions - Always visible when nominate is selected */}
                      {showSuggestions && (
                        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                          {filteredInterviewers.length > 0 && (
                            <div className="p-2 border-b border-border">
                              <p className="text-xs text-muted-foreground font-medium px-1">Available Interviewers</p>
                            </div>
                          )}
                          {filteredInterviewers.map((interviewer) => (
                            <div
                              key={interviewer.id}
                              className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectExisting(interviewer);
                              }}
                            >
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                  {interviewer.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{interviewer.name}</p>
                                <p className="text-xs text-muted-foreground">{interviewer.email}</p>
                              </div>
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}

                          {showCreateOption && (
                            <div
                              className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors border-t border-border"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCreateNew();
                              }}
                            >
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <Mail className="h-5 w-5 text-foreground" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">Invite {emailInput} as an Interviewer</p>
                                <p className="text-xs text-muted-foreground">Send invitation to new interviewer</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {jobDetails.nominatedEmail && jobDetails.existingInterviewerName && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground text-base font-semibold">
                              {existingInterviewers.find((i) => i.id === jobDetails.existingInterviewerId)?.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-base">{jobDetails.existingInterviewerName}</p>
                            <p className="text-sm text-muted-foreground">{jobDetails.existingInterviewerEmail}</p>
                          </div>
                          <CheckCircle2 className="h-6 w-6 text-[#7800D3]" />
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle send invite logic
                          }}
                          className="w-full h-10 bg-[#7800D3] hover:bg-[#6600B3] text-white font-medium"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Invite
                        </Button>
                      </div>
                    )}

                    {jobDetails.nominatedEmail && !jobDetails.existingInterviewerName && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground text-base font-semibold">
                              {jobDetails.nominatedEmail
                                .split("@")[0]
                                .split(".")
                                .map((part) => part[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-base">{jobDetails.nominatedEmail.split("@")[0]}</p>
                            <p className="text-sm text-muted-foreground">{jobDetails.nominatedEmail}</p>
                          </div>
                          <CheckCircle2 className="h-6 w-6 text-[#7800D3]" />
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle send invite logic
                          }}
                          className="w-full h-10 bg-[#7800D3] hover:bg-[#6600B3] text-white font-medium"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Invite
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </RadioGroup>

        {/* Action Button */}
        <div className="mt-6 pt-6 border-t border-border">
          <Button
            onClick={handleCreatePosition}
            disabled={jobDetails.interviewerType !== 'self' && !jobDetails.nominatedEmail.trim()}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Position
          </Button>
        </div>
    </div>
  );
}
