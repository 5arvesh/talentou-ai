import React from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Target, Award, Users, CheckCircle2 } from 'lucide-react';

export function SuccessMetricsPanel() {
  const { planData, updatePlanData } = useTAPlanFlow();
  const sm = planData.successMetrics;

  const update = (field: keyof typeof sm, value: number) => {
    updatePlanData('successMetrics', { [field]: value } as any);
  };

  const isValid =
    sm.timeToCloseHigh > 0 &&
    sm.timeToCloseMedium > 0 &&
    sm.timeToCloseLow > 0 &&
    sm.maxConcurrentPositions > 0 &&
    sm.weeklySourceTarget > 0 &&
    sm.interviewAdvancementRate > 0 &&
    sm.jdQualityScoreMin > 0;

  return (
    <div className="space-y-5">
      {/* Closing Targets */}
      <Card className="p-4 border-transparent shadow-none bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <Label className="text-sm font-semibold text-gray-800 m-0">Closing Targets</Label>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">Time-to-Close by Priority (weeks)</Label>
          <p className="text-xs text-muted-foreground">How many weeks should it take to fill a position at each priority level?</p>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { label: 'High', field: 'timeToCloseHigh' as const, placeholder: '3' },
              { label: 'Medium', field: 'timeToCloseMedium' as const, placeholder: '6' },
              { label: 'Low', field: 'timeToCloseLow' as const, placeholder: '10' },
            ].map(({ label, field, placeholder }) => (
              <div key={field} className="space-y-1">
                <Label className="text-xs text-muted-foreground">{label}</Label>
                <div className="relative">
                  <Input
                    type="number" min={1}
                    value={sm[field]}
                    onChange={(e) => update(field, parseInt(e.target.value) || 0)}
                    placeholder={placeholder}
                    className="h-10 bg-[#f3eeff] border-transparent pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">wk</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Quality & Volume */}
      <Card className="p-4 border-transparent shadow-none bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Award className="h-5 w-5 text-green-600" />
          </div>
          <Label className="text-sm font-semibold text-gray-800 m-0">Quality & Volume</Label>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-gray-600">Weekly Sourcing Target</Label>
            <p className="text-xs text-muted-foreground">Minimum new candidates a recruiter should reach out to per week per role.</p>
            <div className="relative w-48 mt-1">
              <Input
                type="number" min={1}
                value={sm.weeklySourceTarget}
                onChange={(e) => update('weeklySourceTarget', parseInt(e.target.value) || 0)}
                placeholder="10"
                className="h-10 bg-[#f3eeff] border-transparent pr-24"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">candidates</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-gray-600">Interview Advancement Rate</Label>
            <p className="text-xs text-muted-foreground">Target percentage of interviewed candidates who should be shortlisted to move forward.</p>
            <div className="relative w-32 mt-1">
              <Input
                type="number" min={1} max={100}
                value={sm.interviewAdvancementRate}
                onChange={(e) => update('interviewAdvancementRate', parseInt(e.target.value) || 0)}
                placeholder="30"
                className="h-10 bg-[#f3eeff] border-transparent pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-gray-600">Minimum JD Quality Score</Label>
            <p className="text-xs text-muted-foreground">Minimum AI score a job description must reach before it can be posted.</p>
            <div className="relative w-32 mt-1">
              <Input
                type="number" min={1} max={100}
                value={sm.jdQualityScoreMin}
                onChange={(e) => update('jdQualityScoreMin', parseInt(e.target.value) || 0)}
                placeholder="70"
                className="h-10 bg-[#f3eeff] border-transparent pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Workload */}
      <Card className="p-4 border-transparent shadow-none bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <Label className="text-sm font-semibold text-gray-800 m-0">Workload</Label>
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-600">Max Open Positions per Recruiter</Label>
          <p className="text-xs text-muted-foreground">Maximum number of active roles a recruiter should handle at once.</p>
          <div className="relative w-32 mt-1">
            <Input
              type="number" min={1}
              value={sm.maxConcurrentPositions}
              onChange={(e) => update('maxConcurrentPositions', parseInt(e.target.value) || 0)}
              placeholder="5"
              className="h-10 bg-[#f3eeff] border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Summary review */}
      {isValid && (
        <Card className="p-4 bg-[#f3eeff] border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-gray-700">Plan Summary</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <span>High priority: <strong className="text-foreground">{sm.timeToCloseHigh}w</strong></span>
            <span>Medium priority: <strong className="text-foreground">{sm.timeToCloseMedium}w</strong></span>
            <span>Weekly sourcing: <strong className="text-foreground">{sm.weeklySourceTarget} candidates</strong></span>
            <span>Advancement rate: <strong className="text-foreground">{sm.interviewAdvancementRate}%</strong></span>
            <span>Min JD score: <strong className="text-foreground">{sm.jdQualityScoreMin}%</strong></span>
            <span>Max roles/recruiter: <strong className="text-foreground">{sm.maxConcurrentPositions}</strong></span>
          </div>
        </Card>
      )}
    </div>
  );
}
