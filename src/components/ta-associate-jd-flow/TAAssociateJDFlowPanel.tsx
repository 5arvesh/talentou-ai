import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, Calendar, Briefcase, Users, Check, Copy, Plus, Trash2, 
  Edit2, FileText, Link2, CheckCircle2, QrCode, Share2, Download
} from 'lucide-react';
import { useTAAssociateJDFlow } from '@/context/TAAssociateJDFlowContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TAAssociateJDFlowPanelProps {
  jobId: string;
}

// Mock JD data
const mockJDData: Record<string, {
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
}> = {
  "JOB-0001": {
    id: "JOB-0001",
    role: "Senior Frontend Developer",
    client: "Amgen – Data Platform",
    location: "San Francisco, CA",
    workMode: "Hybrid",
    status: "Active",
    expectedStartDate: "2024-02-15",
    hiringLead: "Jennifer Adams",
    description: "We are looking for a Senior Frontend Developer to join our Data Platform team at Amgen. You will be responsible for building and maintaining user-facing features using modern JavaScript frameworks.",
    skills: ["React", "TypeScript", "GraphQL", "CSS/SCSS", "Jest", "Webpack", "Git"],
    responsibilities: [
      "Design and implement user-facing features using React and TypeScript",
      "Collaborate with backend engineers to integrate APIs and services",
      "Write clean, maintainable, and well-tested code",
      "Participate in code reviews and mentor junior developers"
    ],
    qualifications: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with state management solutions",
      "Bachelor's degree in Computer Science or related field"
    ],
    aboutCompany: "Amgen is a pioneer in biotechnology, committed to unlocking the potential of biology for patients suffering from serious illnesses.",
    experience: "5+ years",
    salary: "$150,000 - $180,000"
  }
};

const defaultJD = {
  id: "JOB-0000",
  role: "Software Engineer",
  client: "Client Company",
  location: "Remote",
  workMode: "Remote",
  status: "Active",
  expectedStartDate: "2024-03-01",
  hiringLead: "Hiring Manager",
  description: "We are looking for a talented software engineer to join our team.",
  skills: ["JavaScript", "React", "Node.js"],
  responsibilities: ["Develop and maintain applications", "Collaborate with team members"],
  qualifications: ["3+ years of experience", "Strong communication skills"],
  aboutCompany: "We are an innovative company focused on building great products.",
  experience: "3+ years",
  salary: "Competitive"
};

export function TAAssociateJDFlowPanel({ jobId }: TAAssociateJDFlowPanelProps) {
  const { 
    currentStage, 
    completeStage, 
    screeningQuestions, 
    addScreeningQuestion,
    updateScreeningQuestion,
    removeScreeningQuestion,
    generateJDLink,
    jdLink,
    isLinkGenerated,
    setJobDetails
  } = useTAAssociateJDFlow();

  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'text' | 'yes_no' | 'multiple_choice'>('text');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const jdData = mockJDData[jobId] || { ...defaultJD, id: jobId };

  useEffect(() => {
    setJobDetails(jdData);
  }, [jobId]);

  const handleReviewComplete = () => {
    completeStage(0);
    toast.success('JD reviewed! Moving to screening questions.');
  };

  const handleSaveQuestions = () => {
    completeStage(1);
    toast.success('Screening questions saved!');
  };

  const handleGenerateLink = () => {
    generateJDLink();
    completeStage(2);
    toast.success('JD link generated successfully!');
  };

  const handleCopyLink = () => {
    if (jdLink) {
      navigator.clipboard.writeText(jdLink);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    addScreeningQuestion({
      id: `sq-${Date.now()}`,
      question: newQuestion,
      type: newQuestionType,
      required: true
    });
    setNewQuestion('');
    setNewQuestionType('text');
    toast.success('Question added!');
  };

  const handleEditQuestion = (id: string) => {
    const question = screeningQuestions.find(q => q.id === id);
    if (question) {
      setEditingId(id);
      setEditValue(question.question);
    }
  };

  const handleSaveEdit = (id: string) => {
    updateScreeningQuestion(id, { question: editValue });
    setEditingId(null);
    setEditValue('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Stage 0: JD Review */}
      {currentStage === 0 && (
        <>
          <div className="p-6 border-b border-[#7800D3]/15">
            <h2 className="text-xl font-bold text-[#7800D3]">Job Description</h2>
            <p className="text-xs text-muted-foreground mt-1">Review all details before proceeding</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-primary">{jdData.id}</span>
                  <Badge className={cn("text-xs", getStatusColor(jdData.status))}>
                    {jdData.status}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold text-foreground">{jdData.role}</h1>
                <p className="text-muted-foreground mt-1">{jdData.client}</p>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <Badge variant="outline" className="bg-background">
                    <MapPin className="h-3 w-3 mr-1" />
                    {jdData.location} · {jdData.workMode}
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    <Calendar className="h-3 w-3 mr-1" />
                    Start: {jdData.expectedStartDate}
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {jdData.experience}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-3">About the Role</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{jdData.description}</p>
              </Card>

              {/* Skills */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {jdData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </Card>

              {/* Responsibilities */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                <ul className="space-y-2">
                  {jdData.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Qualifications */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-3">Qualifications</h3>
                <ul className="space-y-2">
                  {jdData.qualifications.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* About Company */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-3">About the Company</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{jdData.aboutCompany}</p>
              </Card>

              {/* Compensation */}
              <Card className="p-5">
                <h3 className="text-lg font-semibold mb-2">Compensation</h3>
                <p className="text-muted-foreground">{jdData.salary}</p>
              </Card>
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border">
            <Button 
              onClick={handleReviewComplete}
              className="w-full bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0"
            >
              <Check className="h-4 w-4 mr-2" />
              I've Reviewed the JD
            </Button>
          </div>
        </>
      )}

      {/* Stage 1: Screening Questions */}
      {currentStage === 1 && (
        <>
          <div className="p-6 border-b border-[#7800D3]/15">
            <h2 className="text-xl font-bold text-[#7800D3]">Screening Questions</h2>
            <p className="text-xs text-muted-foreground mt-1">Configure questions for candidates</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-4">
              {/* Add New Question */}
              <Card className="p-4 border-dashed">
                <h4 className="text-sm font-semibold mb-3">Add New Question</h4>
                <div className="space-y-3">
                  <Input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter your question..."
                  />
                  <div className="flex gap-2">
                    <Select value={newQuestionType} onValueChange={(v: 'text' | 'yes_no' | 'multiple_choice') => setNewQuestionType(v)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text Answer</SelectItem>
                        <SelectItem value="yes_no">Yes/No</SelectItem>
                        <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddQuestion} disabled={!newQuestion.trim()}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Existing Questions */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground">Questions ({screeningQuestions.length})</h4>
                {screeningQuestions.map((question, index) => (
                  <Card key={question.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-primary">Q{index + 1}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {question.type.replace('_', ' ')}
                          </Badge>
                          {question.required && (
                            <Badge variant="secondary" className="text-xs">Required</Badge>
                          )}
                        </div>
                        {editingId === question.id ? (
                          <div className="flex gap-2 mt-2">
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => handleSaveEdit(question.id)}>
                              Save
                            </Button>
                          </div>
                        ) : (
                          <p className="text-sm text-foreground">{question.question}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEditQuestion(question.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => removeScreeningQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border">
            <Button 
              onClick={handleSaveQuestions}
              className="w-full bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0"
              disabled={screeningQuestions.length === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Save Questions
            </Button>
          </div>
        </>
      )}

      {/* Stage 2: Generate Link */}
      {currentStage === 2 && (
        <>
          <div className="p-6 border-b border-[#7800D3]/15">
            <h2 className="text-xl font-bold text-[#7800D3]">Generate JD Link</h2>
            <p className="text-xs text-muted-foreground mt-1">Create a shareable link for candidates</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            {!isLinkGenerated ? (
              <div className="text-center space-y-6">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Link2 className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Ready to Generate Link</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">
                    Your job description and screening questions are configured. 
                    Generate a shareable link for candidates to apply.
                  </p>
                </div>
                <Button 
                  onClick={handleGenerateLink}
                  className="bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0"
                  size="lg"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Generate Link
                </Button>
              </div>
            ) : (
              <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-[#4ead3b]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-[#4ead3b]" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Link Generated!</h3>
                  <p className="text-muted-foreground mt-1">Share this link with potential candidates</p>
                </div>

                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <Input 
                      value={jdLink || ''} 
                      readOnly 
                      className="flex-1 bg-muted/50"
                    />
                    <Button onClick={handleCopyLink} variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download QR
                  </Button>
                </div>

                <Card className="p-4 bg-muted/30">
                  <h4 className="text-sm font-semibold mb-2">Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Position:</span>
                      <span className="font-medium">{jdData.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Screening Questions:</span>
                      <span className="font-medium">{screeningQuestions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
