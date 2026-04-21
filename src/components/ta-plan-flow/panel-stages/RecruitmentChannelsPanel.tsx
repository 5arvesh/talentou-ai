import React, { useState } from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const DIGITAL_PLATFORMS = ['LinkedIn', 'Naukri', 'Indeed', 'Foundit', 'Other Job Boards'];
const INTERNAL_CHANNELS = ['Company Careers Page', 'Internal Job Board', 'Employee Referrals'];
const OFFLINE_EVENTS = ['Campus Recruitment', 'Job Fairs', 'Industry Events', 'Networking Events'];

export function RecruitmentChannelsPanel() {
  const { planData, updatePlanData, completeStage, setCurrentStage } = useTAPlanFlow();
  const [newAgency, setNewAgency] = useState('');

  const togglePlatform = (platform: string) => {
    const updated = planData.recruitmentChannels.digitalPlatforms.includes(platform)
      ? planData.recruitmentChannels.digitalPlatforms.filter((p) => p !== platform)
      : [...planData.recruitmentChannels.digitalPlatforms, platform];
    updatePlanData('recruitmentChannels', { digitalPlatforms: updated });
  };

  const toggleInternalChannel = (channel: string) => {
    const updated = planData.recruitmentChannels.internalChannels.includes(channel)
      ? planData.recruitmentChannels.internalChannels.filter((c) => c !== channel)
      : [...planData.recruitmentChannels.internalChannels, channel];
    updatePlanData('recruitmentChannels', { internalChannels: updated });
  };

  const toggleOfflineEvent = (event: string) => {
    const updated = planData.recruitmentChannels.offlineEvents.includes(event)
      ? planData.recruitmentChannels.offlineEvents.filter((e) => e !== event)
      : [...planData.recruitmentChannels.offlineEvents, event];
    updatePlanData('recruitmentChannels', { offlineEvents: updated });
  };

  const addAgency = () => {
    if (newAgency.trim()) {
      updatePlanData('recruitmentChannels', {
        recruitmentAgencies: [...planData.recruitmentChannels.recruitmentAgencies, newAgency.trim()],
      });
      setNewAgency('');
    }
  };

  const removeAgency = (index: number) => {
    const updated = planData.recruitmentChannels.recruitmentAgencies.filter((_, i) => i !== index);
    updatePlanData('recruitmentChannels', { recruitmentAgencies: updated });
  };

  const handleNext = () => {
    completeStage('recruitmentChannels');
    setCurrentStage(3);
  };

  const isFormValid = 
    planData.recruitmentChannels.digitalPlatforms.length > 0 ||
    planData.recruitmentChannels.internalChannels.length > 0 ||
    planData.recruitmentChannels.recruitmentAgencies.length > 0 ||
    planData.recruitmentChannels.offlineEvents.length > 0;

  return (
    <div className="space-y-6">
      <Collapsible defaultOpen className="border rounded-lg">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
          <span className="font-semibold">Digital Platforms</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0 space-y-3">
          {DIGITAL_PLATFORMS.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={platform}
                checked={planData.recruitmentChannels.digitalPlatforms.includes(platform)}
                onCheckedChange={() => togglePlatform(platform)}
              />
              <label
                htmlFor={platform}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {platform}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="border rounded-lg">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
          <span className="font-semibold">Internal Channels</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0 space-y-3">
          {INTERNAL_CHANNELS.map((channel) => (
            <div key={channel} className="flex items-center space-x-2">
              <Checkbox
                id={channel}
                checked={planData.recruitmentChannels.internalChannels.includes(channel)}
                onCheckedChange={() => toggleInternalChannel(channel)}
              />
              <label
                htmlFor={channel}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {channel}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="border rounded-lg">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
          <span className="font-semibold">Recruitment Agencies</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0 space-y-3">
          <div className="flex flex-wrap gap-2">
            {planData.recruitmentChannels.recruitmentAgencies.map((agency, index) => (
              <Badge
                key={index}
                style={{ backgroundColor: '#7800D3' }}
                className="pl-3 pr-1.5 py-2 text-sm gap-2 font-medium border-transparent text-white"
              >
                {agency}
                <button
                  onClick={() => removeAgency(index)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newAgency}
              onChange={(e) => setNewAgency(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addAgency()}
              placeholder="e.g., Robert Half, Randstad"
              className="h-10"
            />
            <Button onClick={addAgency} size="icon" variant="outline" className="h-10 w-10">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="border rounded-lg">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
          <span className="font-semibold">Offline Events</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0 space-y-3">
          {OFFLINE_EVENTS.map((event) => (
            <div key={event} className="flex items-center space-x-2">
              <Checkbox
                id={event}
                checked={planData.recruitmentChannels.offlineEvents.includes(event)}
                onCheckedChange={() => toggleOfflineEvent(event)}
              />
              <label
                htmlFor={event}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {event}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="pt-4 flex flex-col items-end gap-2">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white rounded-full px-6 py-2 h-auto text-base font-medium border-0"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        {!isFormValid && (
          <p className="text-xs text-muted-foreground">
            Please select at least one recruitment channel
          </p>
        )}
      </div>
    </div>
  );
}
