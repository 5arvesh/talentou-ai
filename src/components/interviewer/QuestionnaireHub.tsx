import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Users, FileText, Copy, CheckCircle } from "lucide-react";

export function QuestionnaireHub() {
  const navigate = useNavigate();
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<number | null>(null);

  // Mock data for existing questionnaires
  const existingQuestionnaires = [
    {
      id: 1,
      name: "Frontend Developer Assessment",
      jobRole: "Software Engineer",
      skills: ["React", "TypeScript", "JavaScript"],
      experience: "3-5 years",
      totalQuestions: 15,
      technicalQuestions: 10,
      nonTechnicalQuestions: 5,
      duration: "45 minutes",
      createdDate: "2024-01-15",
      usedCount: 3,
    },
    {
      id: 2,
      name: "Senior Backend Developer Quiz",
      jobRole: "Senior Developer",
      skills: ["Python", "AWS", "Docker"],
      experience: "5+ years",
      totalQuestions: 20,
      technicalQuestions: 15,
      nonTechnicalQuestions: 5,
      duration: "60 minutes",
      createdDate: "2024-01-10",
      usedCount: 5,
    },
    {
      id: 3,
      name: "Product Manager Interview",
      jobRole: "Product Manager",
      skills: ["Strategy", "Analytics", "Agile"],
      experience: "4-6 years",
      totalQuestions: 12,
      technicalQuestions: 4,
      nonTechnicalQuestions: 8,
      duration: "40 minutes",
      createdDate: "2024-01-08",
      usedCount: 2,
    },
    {
      id: 4,
      name: "UX Designer Evaluation",
      jobRole: "UX Designer",
      skills: ["Figma", "User Research", "Prototyping"],
      experience: "2-4 years",
      totalQuestions: 10,
      technicalQuestions: 6,
      nonTechnicalQuestions: 4,
      duration: "35 minutes",
      createdDate: "2024-01-05",
      usedCount: 1,
    },
  ];

  const handleCreateNew = () => {
    navigate("/interviewer/questionnaire/create");
  };

  const handleUseQuestionnaire = (questionnaireId: number) => {
    // In a real app, this would copy the questionnaire and allow customization
    console.log("Using questionnaire:", questionnaireId);
    // For now, navigate to create with a copy flag
    navigate(`/interviewer/questionnaire/create?copyFrom=${questionnaireId}`);
  };

  const handleCopyQuestions = (questionnaireId: number) => {
    // In a real app, this would allow selective copying of questions
    console.log("Copying questions from:", questionnaireId);
    navigate(`/interviewer/questionnaire/create?copyQuestionsFrom=${questionnaireId}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Questionnaire Hub</h1>
          <p className="text-gray-600 mt-1">Manage and create interview questionnaires</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Questionnaires Card */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Available Questionnaires
            </CardTitle>
            <CardDescription>
              Previously created questionnaires with similar job requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {existingQuestionnaires.map((questionnaire) => (
              <div
                key={questionnaire.id}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedQuestionnaire === questionnaire.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedQuestionnaire(questionnaire.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{questionnaire.name}</h3>
                    <p className="text-sm text-gray-600">{questionnaire.jobRole}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Used {questionnaire.usedCount}x
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {questionnaire.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {questionnaire.totalQuestions} questions
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {questionnaire.duration}
                  </div>
                  <div className="text-xs">
                    Tech: {questionnaire.technicalQuestions}
                  </div>
                  <div className="text-xs">
                    Non-tech: {questionnaire.nonTechnicalQuestions}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseQuestionnaire(questionnaire.id);
                    }}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Use This
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyQuestions(questionnaire.id);
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy Questions
                  </Button>
                </div>
              </div>
            ))}

            {existingQuestionnaires.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No questionnaires available yet</p>
                <p className="text-sm">Create your first questionnaire to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create New Questionnaire Card */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Questionnaire
            </CardTitle>
            <CardDescription>
              Build a custom questionnaire with AI assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Creation</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our AI will guide you through creating the perfect questionnaire by asking about:
                  </p>
                  <ul className="text-sm text-gray-600 text-left space-y-1 mb-6">
                    <li>• Interview duration and structure</li>
                    <li>• Number of technical vs non-technical questions</li>
                    <li>• Specific skills and experience requirements</li>
                    <li>• Question difficulty and complexity</li>
                    <li>• Industry-specific requirements</li>
                  </ul>
                  <Button 
                    onClick={handleCreateNew}
                    className="w-full"
                  >
                    Start Creating
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Benefits of AI Creation:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Tailored questions based on job requirements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Balanced technical and behavioral questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Industry best practices included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Reusable for similar positions</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}