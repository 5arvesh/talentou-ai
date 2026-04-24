import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNewPosition, existingRecruiters, getRecruiterJobs } from '@/context/NewPositionContext';

export function RecruiterAssignmentStage() {
  const {
    selectedRecruiter,
    setSelectedRecruiter,
    recruiterSearchInput,
    setRecruiterSearchInput,
    showRecruiterDropdown,
    setShowRecruiterDropdown,
    recruiterAssignmentType,
    setRecruiterAssignmentType,
    priority,
    handlePrioritySelect,
    handleSavePriorities,
    getPriorityConfig,
    recruiterJobPriorities,
    setRecruiterJobPriorities,
    jobDetails
  } = useNewPosition();

  const filteredRecruiters = recruiterSearchInput.length > 0
    ? existingRecruiters.filter(
        (recruiter) =>
          recruiter.email.toLowerCase().includes(recruiterSearchInput.toLowerCase()) ||
          recruiter.name.toLowerCase().includes(recruiterSearchInput.toLowerCase())
      )
    : existingRecruiters;

  const handleSelectRecruiter = (recruiter: typeof existingRecruiters[0]) => {
    setSelectedRecruiter(recruiter);
    setRecruiterSearchInput(recruiter.email);
    setShowRecruiterDropdown(false);
  };

  const recruiterJobs = selectedRecruiter ? getRecruiterJobs(selectedRecruiter.id) : [];
  const highPriorityCount = Object.values(recruiterJobPriorities).filter(p => p === 'high').length;

  const getJobBgColor = (p: string) => {
    if (p === 'high') return 'bg-red-50 border-red-200';
    if (p === 'medium') return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  return (
    <>
      <div className="p-6 border-b border-border bg-white sticky top-0 z-20 shadow-sm">
        <h2 className="text-xl font-bold text-[#7800D3]">Assign Recruiter & Priority</h2>
        <p className="text-xs text-muted-foreground mt-1">Select a recruiter and set priorities</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <RadioGroup
            value={recruiterAssignmentType}
            onValueChange={(value: "auto" | "manual") => {
              setRecruiterAssignmentType(value);
              if (value === "manual") {
                setShowRecruiterDropdown(true);
              } else if (value === "auto") {
                const bestRecruiter = [...existingRecruiters].sort((a, b) => a.activeJobs - b.activeJobs)[0];
                setSelectedRecruiter(bestRecruiter);
                setRecruiterSearchInput(bestRecruiter.email);
              }
            }}
            className="space-y-4"
          >
            {/* Auto-assign Option */}
            <Card
              className={cn(
                "p-5 cursor-pointer transition-all border-2",
                recruiterAssignmentType === "auto"
                  ? "border-[#7800D3]"
                  : "border-border hover:bg-muted/50"
              )}
              onClick={() => {
                setRecruiterAssignmentType("auto");
                const bestRecruiter = [...existingRecruiters].sort((a, b) => a.activeJobs - b.activeJobs)[0];
                setSelectedRecruiter(bestRecruiter);
                setRecruiterSearchInput(bestRecruiter.email);
              }}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem value="auto" id="auto" className="mt-1.5" />
                <div className="flex-1 space-y-3">
                  <Label htmlFor="auto" className="text-sm font-semibold cursor-pointer">
                    Auto-assign best available recruiter
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    We'll assign the recruiter with the lowest current workload
                  </p>

                  {recruiterAssignmentType === "auto" && selectedRecruiter && (
                    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground text-base font-semibold">
                          {selectedRecruiter.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-base">{selectedRecruiter.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedRecruiter.activeJobs} active jobs</p>
                      </div>
                      <CheckCircle2 className="h-6 w-6 text-[#7800D3]" />
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Manual Selection Option */}
            <Card
              className={cn(
                "p-5 cursor-pointer transition-all border-2",
                recruiterAssignmentType === "manual"
                  ? "border-[#7800D3]"
                  : "border-border hover:bg-muted/50"
              )}
              onClick={() => {
                setRecruiterAssignmentType("manual");
                setShowRecruiterDropdown(true);
              }}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem value="manual" id="manual" className="mt-1.5" />
                <div className="flex-1 space-y-3">
                  <Label htmlFor="manual" className="text-sm font-semibold cursor-pointer">
                    Select a recruiter manually
                  </Label>

                  {recruiterAssignmentType === "manual" && (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2 relative">
                        <Label htmlFor="recruiterEmail" className="text-sm font-medium text-foreground">
                          Search for a Recruiter
                        </Label>
                        <Input
                          id="recruiterEmail"
                          type="text"
                          value={recruiterSearchInput}
                          onChange={(e) => {
                            setRecruiterSearchInput(e.target.value);
                            setShowRecruiterDropdown(true);
                            setSelectedRecruiter(null);
                          }}
                          onFocus={() => setShowRecruiterDropdown(true)}
                          placeholder="Search by name or email..."
                          className="h-11 bg-muted/30"
                          onClick={(e) => e.stopPropagation()}
                        />

                        {/* Recruiter Suggestions Dropdown */}
                        {showRecruiterDropdown && (
                          <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                            {filteredRecruiters.length > 0 && (
                              <div className="p-2 border-b border-border">
                                <p className="text-xs text-muted-foreground font-medium px-1">Available Recruiters</p>
                              </div>
                            )}
                            {filteredRecruiters.map((recruiter) => (
                              <div
                                key={recruiter.id}
                                className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectRecruiter(recruiter);
                                }}
                              >
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                    {recruiter.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{recruiter.name}</p>
                                  <p className="text-xs text-muted-foreground">{recruiter.email}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {recruiter.activeJobs} jobs
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {selectedRecruiter && (
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground text-base font-semibold">
                              {selectedRecruiter.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-base">{selectedRecruiter.name}</p>
                            <p className="text-sm text-muted-foreground">{selectedRecruiter.email}</p>
                          </div>
                          <CheckCircle2 className="h-6 w-6 text-[#7800D3]" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </RadioGroup>

          {/* Only show priority section if recruiter is selected */}
          {selectedRecruiter && (
            <div className="mt-8 space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-bold text-[#7800D3]">{selectedRecruiter.name}'s Jobs & Priorities</h3>

              {jobDetails.behavioralQuestionsEnabled && (
                <Card className="p-4 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Behavioral Questions Required
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        The hiring lead enabled behavioral questions for this role. The assigned
                        recruiter will be notified that behavioral questions must be created before
                        scheduling any interviews.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {highPriorityCount > 2 && (
                <Card className="p-4 bg-amber-50 border-amber-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Too many high-priority jobs</p>
                      <p className="text-xs text-amber-600 mt-1">
                        {selectedRecruiter.name} has {highPriorityCount} high-priority positions. Consider rebalancing.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* New Job - Highlighted */}
              <Card className={cn("p-4 border-2 shadow-sm transition-colors", getJobBgColor(priority || 'medium'), !priority && 'border-[#7800D3] bg-primary/5')}>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#7800D3] text-white">New</Badge>
                  <span className="text-xs text-muted-foreground">Just approved</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{jobDetails.title}</p>
                    <p className="text-sm text-muted-foreground">{jobDetails.project}</p>
                  </div>
                  <div className="flex gap-2 bg-white/60 p-1.5 rounded-lg border border-border/50">
                    {(['high', 'medium', 'low'] as const).map((p) => {
                      const config = getPriorityConfig(p);
                      return (
                        <Button
                          key={p}
                          size="sm"
                          variant={priority === p ? 'default' : 'outline'}
                          onClick={() => handlePrioritySelect(p)}
                          className={cn(
                            "text-xs px-4 h-8 transition-all font-medium",
                            priority === p 
                              ? config.color.replace('border-', 'ring-2 ring-')
                              : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {config.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Existing Jobs */}
              <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Existing Positions</p>
                {recruiterJobs.map((job) => {
                  const currentPriority = recruiterJobPriorities[job.id] || job.priority;
                  return (
                    <Card key={job.id} className={cn("p-4 shadow-sm transition-colors", getJobBgColor(currentPriority))}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">{job.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground font-medium">{job.project}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-black/5 text-black/60 font-medium">{job.daysOpen} days open</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 bg-white/60 p-1 rounded-lg border border-border/50">
                          {(['high', 'medium', 'low'] as const).map((p) => {
                            const config = getPriorityConfig(p);
                            return (
                              <Button
                                key={p}
                                size="sm"
                                variant={currentPriority === p ? 'default' : 'outline'}
                                onClick={() => setRecruiterJobPriorities(prev => ({ ...prev, [job.id]: p }))}
                                className={cn(
                                  "text-xs px-3 h-7 font-medium transition-all",
                                  currentPriority === p 
                                    ? config.color.replace('border-', 'ring-1 ring-')
                                    : "border-transparent bg-transparent text-muted-foreground hover:bg-black/5"
                                )}
                              >
                                {config.label}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <div className="mt-6 pt-6 border-t border-border sticky bottom-0 bg-white shadow-[0_-10px_15px_-3px_rgba(255,255,255,0.9)] z-10 pb-4">
            <Button
              onClick={handleSavePriorities}
              disabled={!selectedRecruiter || !priority}
              className="w-full h-12 text-base font-semibold bg-[#4ead3b] hover:bg-[#8FD378] text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Assign & Save Priorities
            </Button>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
