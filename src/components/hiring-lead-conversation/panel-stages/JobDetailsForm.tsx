import React, { useState } from "react";
import { useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X, Link as LinkIcon, Briefcase, Users, Calendar, MapPin, IndianRupee, Clock, Building2, FileText } from "lucide-react";

const RATE_OPTIONS = [
  { value: "yearly",  label: "Yearly" },
  { value: "monthly", label: "Monthly" },
  { value: "hourly",  label: "Hourly" },
] as const;

const RATE_PLACEHOLDER: Record<string, string> = {
  yearly:  "e.g., 1800000",
  monthly: "e.g., 150000",
  hourly:  "e.g., 800",
};

const CURRENCY_SYMBOL: Record<string, string> = { USD: "$", INR: "₹" };

const LABEL_COLOR = { color: '#7c30da' } as const;

export function JobDetailsForm() {
  const { jobDetails, updateJobDetails } = useHiringLeadConversation();
  const [newProfileLink, setNewProfileLink] = useState("");
  const [newCVLink, setNewCVLink] = useState("");

  const handleAddProfile = () => {
    if (!newProfileLink.trim()) return;
    updateJobDetails({ sampleProfiles: [...jobDetails.sampleProfiles, newProfileLink.trim()] });
    setNewProfileLink("");
  };

  const handleRemoveProfile = (i: number) =>
    updateJobDetails({ sampleProfiles: jobDetails.sampleProfiles.filter((_, idx) => idx !== i) });

  const handleAddCV = () => {
    if (!newCVLink.trim()) return;
    updateJobDetails({ sampleCVs: [...jobDetails.sampleCVs, newCVLink.trim()] });
    setNewCVLink("");
  };

  const handleRemoveCV = (i: number) =>
    updateJobDetails({ sampleCVs: jobDetails.sampleCVs.filter((_, idx) => idx !== i) });

  const currencySymbol = CURRENCY_SYMBOL[jobDetails.budgetCurrency] ?? "$";

  return (
    <div className="space-y-6">

      {/* Row 1: Job Title, Openings */}
      <div className="grid grid-cols-2 gap-4">
        <div data-tour-id="hl-job-title-field">
          <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2 mb-2" style={LABEL_COLOR}>
            <Briefcase className="h-4 w-4" /> Job Title
          </Label>
          <Input
            id="title"
            value={jobDetails.title}
            onChange={(e) => updateJobDetails({ title: e.target.value })}
            placeholder="e.g., Senior Full Stack Developer"
            className="h-11 text-sm placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold flex items-center gap-2 mb-2" style={LABEL_COLOR}>
            <Users className="h-4 w-4" /> Openings
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-11 w-11"
              onClick={() => updateJobDetails({ numberOfOpenings: Math.max(1, jobDetails.numberOfOpenings - 1) })}
              disabled={jobDetails.numberOfOpenings <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number" min={1}
              value={jobDetails.numberOfOpenings}
              onChange={(e) => updateJobDetails({ numberOfOpenings: Math.max(1, parseInt(e.target.value) || 1) })}
              className="text-center h-11 w-20"
            />
            <Button variant="outline" size="icon" className="h-11 w-11"
              onClick={() => updateJobDetails({ numberOfOpenings: jobDetails.numberOfOpenings + 1 })}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Rows 2-3: Employment Mode, Start Date, Work Type, Location */}
      <div data-tour-id="hl-role-logistics" className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold flex items-center gap-2 mb-2" style={LABEL_COLOR}>
              <Building2 className="h-4 w-4" /> Employment Mode
            </Label>
            <Select
              value={jobDetails.employmentMode}
              onValueChange={(value) => updateJobDetails({ employmentMode: value })}
            >
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="startDate" className="text-sm font-semibold flex items-center gap-2 mb-2" style={LABEL_COLOR}>
              <Calendar className="h-4 w-4" /> Start Date
            </Label>
            <Input
              id="startDate" type="date"
              value={jobDetails.startDate}
              onChange={(e) => updateJobDetails({ startDate: e.target.value })}
              className="h-11 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold flex items-center gap-2 mb-2" style={LABEL_COLOR}>
              <Clock className="h-4 w-4" /> Work Type
            </Label>
            <Select value={jobDetails.workType} onValueChange={(value) => updateJobDetails({ workType: value })}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-2 mb-2" style={LABEL_COLOR}>
              <MapPin className="h-4 w-4" /> Location
            </Label>
            <Input
              id="location"
              value={jobDetails.location}
              onChange={(e) => updateJobDetails({ location: e.target.value })}
              placeholder="e.g., Chennai, India"
              className="h-11 text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Row 4: Maximum CTC + Minimum Experience — single flex row */}
      <div data-tour-id="hl-ctc-experience">
        {/* Label row — proportional to control widths below */}
        <div className="flex gap-3 mb-2">
          <div className="flex-[3] flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 shrink-0" style={LABEL_COLOR} />
            <span className="text-sm font-semibold" style={LABEL_COLOR}>Maximum CTC</span>
          </div>
          <div className="flex-[2] flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0" style={LABEL_COLOR} />
            <span className="text-sm font-semibold" style={LABEL_COLOR}>Minimum Experience</span>
          </div>
        </div>

        {/* All four controls in one row */}
        <div className="flex items-center gap-2">
          <Select
            value={jobDetails.budgetCurrency}
            onValueChange={(value) => updateJobDetails({ budgetCurrency: value })}
          >
            <SelectTrigger className="h-10 w-[72px] shrink-0 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">$ USD</SelectItem>
              <SelectItem value="INR">₹ INR</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={jobDetails.ctcRateType}
            onValueChange={(value) => updateJobDetails({ ctcRateType: value, ctcAmount: '' })}
          >
            <SelectTrigger className="h-10 w-[100px] shrink-0 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {RATE_OPTIONS.map(o => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            value={jobDetails.ctcAmount}
            onChange={(e) => updateJobDetails({ ctcAmount: e.target.value })}
            placeholder={RATE_PLACEHOLDER[jobDetails.ctcRateType] ?? "e.g., 1800000"}
            className="h-10 flex-1 min-w-0 text-sm placeholder:text-muted-foreground"
          />

          <Input
            id="minExperience"
            value={jobDetails.minExperience}
            onChange={(e) => updateJobDetails({ minExperience: e.target.value })}
            placeholder="e.g., 3 years"
            className="h-10 w-[38%] shrink-0 min-w-0 text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Rows 5-6: Sample Profile, Sample CV */}
      <div data-tour-id="hl-sample-links" className="space-y-6">
        <div>
          <Label className="text-sm font-semibold flex items-center gap-2 mb-1" style={LABEL_COLOR}>
            <LinkIcon className="h-4 w-4" /> Sample Profile
          </Label>
          <p className="text-xs text-muted-foreground mb-3">Add LinkedIn or candidate profile links</p>

          <div className="flex gap-2 mb-3">
            <Input
              value={newProfileLink}
              onChange={(e) => setNewProfileLink(e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="h-10 text-sm placeholder:text-muted-foreground"
              onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddProfile(); } }}
            />
            <Button onClick={handleAddProfile} variant="outline" size="icon" className="h-10 w-10 shrink-0" disabled={!newProfileLink.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {jobDetails.sampleProfiles.length > 0 && (
            <div className="space-y-2">
              {jobDetails.sampleProfiles.map((p, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-md border bg-muted">
                  <LinkIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm truncate flex-1">{p}</span>
                  <Button onClick={() => handleRemoveProfile(i)} variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label className="text-sm font-semibold flex items-center gap-2 mb-1" style={LABEL_COLOR}>
            <FileText className="h-4 w-4" /> Sample CV
          </Label>
          <p className="text-xs text-muted-foreground mb-3">Add links to sample CVs (Google Drive, Dropbox, etc.)</p>

          <div className="flex gap-2 mb-3">
            <Input
              value={newCVLink}
              onChange={(e) => setNewCVLink(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="h-10 text-sm placeholder:text-muted-foreground"
              onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCV(); } }}
            />
            <Button onClick={handleAddCV} variant="outline" size="icon" className="h-10 w-10 shrink-0" disabled={!newCVLink.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {jobDetails.sampleCVs.length > 0 && (
            <div className="space-y-2">
              {jobDetails.sampleCVs.map((cv, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-md border bg-muted">
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm truncate flex-1">{cv}</span>
                  <Button onClick={() => handleRemoveCV(i)} variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
