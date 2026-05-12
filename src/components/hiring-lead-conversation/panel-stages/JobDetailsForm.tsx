import React, { useState } from "react";
import { useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X, Link as LinkIcon, Briefcase, Users, Calendar, MapPin, IndianRupee, Clock, Building2 } from "lucide-react";

const CTC_FIELDS: Record<string, { key: "annualCTC" | "monthlyCTC" | "hourlyCTC"; label: string; placeholder: string }[]> = {
  "Full-time": [
    { key: "annualCTC", label: "Annual CTC", placeholder: "e.g., 1800000" },
  ],
  "Part-time": [
    { key: "hourlyCTC", label: "Hourly Rate", placeholder: "e.g., 500" },
    { key: "annualCTC", label: "Annual CTC", placeholder: "e.g., 900000" },
  ],
  "Contract": [
    { key: "annualCTC", label: "Annual CTC", placeholder: "e.g., 1200000" },
    { key: "monthlyCTC", label: "Monthly CTC", placeholder: "e.g., 100000" },
    { key: "hourlyCTC", label: "Hourly Rate", placeholder: "e.g., 800" },
  ],
  "Internship": [
    { key: "annualCTC", label: "Annual Stipend", placeholder: "e.g., 300000" },
    { key: "monthlyCTC", label: "Monthly Stipend", placeholder: "e.g., 25000" },
  ],
};

const CURRENCY_SYMBOL: Record<string, string> = { USD: "$", INR: "₹" };

export function JobDetailsForm() {
  const { jobDetails, updateJobDetails } = useHiringLeadConversation();
  const [newProfileLink, setNewProfileLink] = useState("");

  const handleAddProfile = () => {
    if (newProfileLink.trim() !== "") {
      updateJobDetails({ sampleProfiles: [...jobDetails.sampleProfiles, newProfileLink.trim()] });
      setNewProfileLink("");
    }
  };

  const handleRemoveProfile = (index: number) => {
    updateJobDetails({ sampleProfiles: jobDetails.sampleProfiles.filter((_, i) => i !== index) });
  };

  const ctcFields = CTC_FIELDS[jobDetails.employmentMode] ?? CTC_FIELDS["Full-time"];
  const currencySymbol = CURRENCY_SYMBOL[jobDetails.budgetCurrency] ?? "$";

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
              onChange={(e) => updateJobDetails({ numberOfOpenings: Math.max(1, parseInt(e.target.value) || 1) })}
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
            onValueChange={(value) => updateJobDetails({ employmentMode: value, annualCTC: '', monthlyCTC: '', hourlyCTC: '' })}
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

      {/* Row 4: Maximum CTC — full width, dynamic by employment mode */}
      <div>
        <Label className="text-sm font-semibold flex items-center gap-2 mb-2" style={{ color: '#7c30da' }}>
          <IndianRupee className="h-4 w-4" />
          Maximum CTC
        </Label>
        <div className="flex items-end gap-3 flex-wrap">
          {/* Currency picker — shared */}
          <div className="shrink-0">
            <p className="text-[11px] text-muted-foreground mb-1.5">Currency</p>
            <Select
              value={jobDetails.budgetCurrency}
              onValueChange={(value) => updateJobDetails({ budgetCurrency: value })}
            >
              <SelectTrigger className="h-11 w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="INR">₹ INR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic CTC inputs */}
          {ctcFields.map((field) => (
            <div key={field.key} className="flex-1 min-w-[130px]">
              <p className="text-[11px] text-muted-foreground mb-1.5">
                {field.label} <span className="text-muted-foreground/60">({currencySymbol})</span>
              </p>
              <Input
                type="number"
                value={jobDetails[field.key]}
                onChange={(e) => updateJobDetails({ [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="h-11 text-sm placeholder:text-muted-foreground bg-background"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 5: Minimum Experience */}
      <div className="grid grid-cols-2 gap-4">
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

      {/* Row 6: Sample Profile — Full Width */}
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
              if (e.key === 'Enter') { e.preventDefault(); handleAddProfile(); }
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
              <div key={index} className="flex items-center gap-2 p-2 rounded-md border bg-muted">
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
    </div>
  );
}
