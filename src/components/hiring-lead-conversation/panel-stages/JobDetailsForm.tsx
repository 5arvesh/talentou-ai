import React, { useState } from "react";
import { useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X, Link as LinkIcon, Briefcase, Users, Calendar, MapPin, DollarSign, Clock, Building2 } from "lucide-react";
export function JobDetailsForm() {
  const { jobDetails, updateJobDetails, completeStage, setCurrentStage } = useHiringLeadConversation();
  const [newProfileLink, setNewProfileLink] = useState("");

  const handleNext = () => {
    // Generate AI skills and responsibilities
    const generatedKeySkills = ["React", "TypeScript", "Node.js", "REST APIs"];
    const generatedDesiredSkills = ["AWS", "Docker", "Kubernetes", "GraphQL"];
    const generatedQualifications = [
      "Bachelor's degree in Computer Science or related field",
      "Master's degree preferred",
      "Relevant certifications (AWS, Azure) a plus",
    ];
    const generatedResponsibilities = [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
    ];

    updateJobDetails({
      keySkills: generatedKeySkills,
      desiredSkills: generatedDesiredSkills,
      preferredQualifications: generatedQualifications,
      responsibilities: generatedResponsibilities,
    });

    completeStage("jobDetails");
    setCurrentStage(1);
  };

  const handleAddProfile = () => {
    if (newProfileLink.trim() !== "") {
      updateJobDetails({ sampleProfiles: [...jobDetails.sampleProfiles, newProfileLink.trim()] });
      setNewProfileLink("");
    }
  };

  const handleRemoveProfile = (index: number) => {
    const updatedProfiles = jobDetails.sampleProfiles.filter((_, i) => i !== index);
    updateJobDetails({ sampleProfiles: updatedProfiles });
  };

  const isFormValid =
    jobDetails.title.trim() !== "" &&
    jobDetails.location.trim() !== "" &&
    jobDetails.startDate.trim() !== "" &&
    jobDetails.maxBudget.trim() !== "" &&
    jobDetails.minExperience.trim() !== "" &&
    jobDetails.sampleProfiles.length > 0;

  return (
    <div className="space-y-6">
          {/* Row 1: Job Title, Openings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
                <Briefcase className="h-4 w-4" />
                Job Title
              </Label>
              <Input
                id="title"
                value={jobDetails.title}
                onChange={(e) => updateJobDetails({ title: e.target.value })}
                placeholder="e.g., Senior Full Stack Developer"
                className="h-11 bg-background border-border text-sm placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
                <Users className="h-4 w-4" />
                Openings
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  onClick={() => updateJobDetails({ numberOfOpenings: Math.max(1, jobDetails.numberOfOpenings - 1) })}
                  disabled={jobDetails.numberOfOpenings <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={jobDetails.numberOfOpenings}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    updateJobDetails({ numberOfOpenings: Math.max(1, value) });
                  }}
                  min={1}
                  className="text-center h-11 w-20"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  onClick={() => updateJobDetails({ numberOfOpenings: jobDetails.numberOfOpenings + 1 })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Row 2: Employment Mode, Start Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
                <Building2 className="h-4 w-4" />
                Employment Mode
              </Label>
              <Select
                value={jobDetails.employmentMode}
                onValueChange={(value) => updateJobDetails({ employmentMode: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate" className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
                <Calendar className="h-4 w-4" />
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={jobDetails.startDate}
                onChange={(e) => updateJobDetails({ startDate: e.target.value })}
                className="h-11 text-sm"
              />
            </div>
          </div>

          {/* Row 3: Work Type, Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
                <Clock className="h-4 w-4" />
                Work Type
              </Label>
              <Select value={jobDetails.workType} onValueChange={(value) => updateJobDetails({ workType: value })}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                value={jobDetails.location}
                onChange={(e) => updateJobDetails({ location: e.target.value })}
                placeholder="e.g., Chennai, India"
                className="h-11 text-sm placeholder:text-muted-foreground bg-background"
              />
            </div>
          </div>

          {/* Row 4: Maximum Budget, Minimum Experience */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxBudget" className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
                <DollarSign className="h-4 w-4" />
                Maximum Budget
              </Label>
              <Input
                id="maxBudget"
                value={jobDetails.maxBudget}
                onChange={(e) => updateJobDetails({ maxBudget: e.target.value })}
                placeholder="e.g., ₹15 LPA"
                className="h-11 text-sm placeholder:text-muted-foreground bg-background"
              />
            </div>

            <div>
              <Label htmlFor="minExperience" className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
                <Clock className="h-4 w-4" />
                Minimum Experience
              </Label>
              <Input
                id="minExperience"
                value={jobDetails.minExperience}
                onChange={(e) => updateJobDetails({ minExperience: e.target.value })}
                placeholder="e.g., 3 years"
                className="h-11 text-sm placeholder:text-muted-foreground bg-background"
              />
            </div>
          </div>

          {/* Row 5: Sample Profile - Full Width */}
          <div>
            <Label className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
              <LinkIcon className="h-4 w-4" />
              Sample Profile
            </Label>
            <p className="text-xs text-muted-foreground mb-3">
              Add LinkedIn or candidate profile links
            </p>
            
            <div className="flex gap-2 mb-3">
              <Input
                value={newProfileLink}
                onChange={(e) => setNewProfileLink(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="h-10 text-sm placeholder:text-muted-foreground bg-background"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddProfile();
                  }
                }}
              />
              <Button
                onClick={handleAddProfile}
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0"
                disabled={!newProfileLink.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {jobDetails.sampleProfiles.length > 0 && (
              <div className="space-y-2">
                {jobDetails.sampleProfiles.map((profile, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-md border bg-muted"
                  >
                    <LinkIcon className="h-4 w-4 text-foreground shrink-0" />
                    <span className="text-sm text-foreground truncate flex-1">{profile}</span>
                    <Button
                      onClick={() => handleRemoveProfile(index)}
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 hover:bg-muted-foreground/20 text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

      {/* Action Button */}
      <div className="mt-6 pt-6 border-t border-border">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Generate Skills & Responsibilities
        </Button>
      </div>
    </div>
  );
}
