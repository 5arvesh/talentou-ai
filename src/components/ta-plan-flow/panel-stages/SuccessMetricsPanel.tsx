import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Target, Award, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

export function SuccessMetricsPanel() {
  const navigate = useNavigate();
  const { planData, updatePlanData, completeStage } = useTAPlanFlow();
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

  const handleFinish = () => {
    completeStage('successMetrics');
    navigate('/sales-plan/dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Group A — Closing Targets */}
      <Card className="p-4 border-transparent shadow-none bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#7800D3]/10">
            <Target className="h-5 w-5 text-[#7800D3]" />
          </div>
          <Label className="text-base font-bold m-0 text-[#7800D3]">Closing Targets</Label>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">Time-to-Close by Priority (weeks)</Label>
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
                    type="number"
                    min={1}
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

      {/* Group B — Quality & Volume */}
      <Card className="p-4 border-transparent shadow-none bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#4EAD3B]/10">
            <Award className="h-5 w-5 text-[#4EAD3B]" />
          </div>
          <Label className="text-base font-bold m-0 text-[#4EAD3B]">Quality & Volume</Label>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-foreground">Weekly Sourcing Target</Label>
            <p className="text-xs text-muted-foreground">Minimum new candidates a recruiter should reach out to per week per role.</p>
            <div className="relative w-48 mt-1">
              <Input
                type="number"
                min={1}
                value={sm.weeklySourceTarget}
                onChange={(e) => update('weeklySourceTarget', parseInt(e.target.value) || 0)}
                placeholder="10"
                className="h-10 bg-[#f3eeff] border-transparent pr-24"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">candidates</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-semibold text-foreground">Interview Advancement Rate</Label>
            <p className="text-xs text-muted-foreground">Target percentage of interviewed candidates who should be shortlisted to move forward.</p>
            <div className="relative w-32 mt-1">
              <Input
                type="number"
                min={1}
                max={100}
                value={sm.interviewAdvancementRate}
                onChange={(e) => update('interviewAdvancementRate', parseInt(e.target.value) || 0)}
                placeholder="30"
                className="h-10 bg-[#f3eeff] border-transparent pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-semibold text-foreground">Minimum JD Quality Score</Label>
            <p className="text-xs text-muted-foreground">Minimum AI score a job description must reach before it can be posted.</p>
            <div className="relative w-32 mt-1">
              <Input
                type="number"
                min={1}
                max={100}
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

      {/* Group C — Workload */}
      <Card className="p-4 border-transparent shadow-none bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#0A92FE]/10">
            <Users className="h-5 w-5 text-[#0A92FE]" />
          </div>
          <Label className="text-base font-bold m-0 text-[#0A92FE]">Workload</Label>
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-semibold text-foreground">Max Open Positions per Recruiter</Label>
          <p className="text-xs text-muted-foreground">Maximum number of active roles a recruiter should handle at once.</p>
          <div className="relative w-32 mt-1">
            <Input
              type="number"
              min={1}
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
        <Card className="p-4 bg-[#f3eeff] border-[#7800D3]/20">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-[#7800D3]" />
            <p className="text-sm font-bold text-[#7800D3]">Plan Summary</p>
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

      <div className="pt-4 flex flex-col items-end gap-2">
        <Button
          onClick={handleFinish}
          disabled={!isValid}
          className="bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white rounded-full px-6 py-2 h-auto text-base font-medium border-0"
        >
          Finish Plan <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        {!isValid && (
          <p className="text-xs text-muted-foreground">
            Please fill in all fields to complete your TA Plan
          </p>
        )}
      </div>
    </div>
  );
}
