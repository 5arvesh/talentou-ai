import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNewPosition, getRecruiterJobs } from '@/context/NewPositionContext';

export function PriorityManagementStage() {
  const {
    selectedRecruiter,
    priority,
    handlePrioritySelect,
    handleSavePriorities,
    getPriorityConfig,
    recruiterJobPriorities,
    setRecruiterJobPriorities,
    jobDetails
  } = useNewPosition();

  if (!selectedRecruiter) return null;

  const recruiterJobs = getRecruiterJobs(selectedRecruiter.id);
  const highPriorityCount = Object.values(recruiterJobPriorities).filter(p => p === 'high').length;

  return (
    <>
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-[#7800D3]">{selectedRecruiter.name}'s Jobs</h2>
        <p className="text-xs text-muted-foreground mt-1">Set priorities for assigned positions</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {/* Warning if too many high priority */}
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
          <Card className="p-4 border-2 border-[#7800D3] bg-primary/5">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-[#7800D3] text-white">New</Badge>
              <span className="text-xs text-muted-foreground">Just approved</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{jobDetails.title}</p>
                <p className="text-sm text-muted-foreground">{jobDetails.project}</p>
              </div>
              <div className="flex gap-1">
                {(['low', 'medium', 'high'] as const).map((p) => {
                  const config = getPriorityConfig(p);
                  return (
                    <Button
                      key={p}
                      size="sm"
                      variant="outline"
                      onClick={() => handlePrioritySelect(p)}
                      className={cn(
                        "text-xs px-3",
                        priority === p 
                          ? `${config.color} border-2` 
                          : "border-border"
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
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Existing Positions</p>
            {recruiterJobs.map((job) => {
              const currentPriority = recruiterJobPriorities[job.id] || job.priority;
              return (
                <Card key={job.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{job.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{job.project}</span>
                        <span className="text-xs text-muted-foreground">• {job.daysOpen} days open</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {(['low', 'medium', 'high'] as const).map((p) => {
                        const config = getPriorityConfig(p);
                        return (
                          <Button
                            key={p}
                            size="sm"
                            variant="outline"
                            onClick={() => setRecruiterJobPriorities(prev => ({ ...prev, [job.id]: p }))}
                            className={cn(
                              "text-xs px-2 h-7",
                              currentPriority === p 
                                ? `${config.color} border-2` 
                                : "border-border opacity-50"
                            )}
                          >
                            {config.label[0]}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Priority Summary */}
          <Card className="p-4 bg-muted/30">
            <p className="text-sm font-medium mb-3">Priority Distribution</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-sm">High: {Object.values(recruiterJobPriorities).filter(p => p === 'high').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-sm">Medium: {Object.values(recruiterJobPriorities).filter(p => p === 'medium').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-400" />
                <span className="text-sm">Low: {Object.values(recruiterJobPriorities).filter(p => p === 'low').length}</span>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
      
      {/* Save Priorities Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleSavePriorities}
          disabled={!priority}
          className="w-full h-12 text-base font-semibold bg-[#4ead3b] hover:bg-[#8FD378] text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Priorities
        </Button>
      </div>
    </>
  );
}
