import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Edit2, Mail, Linkedin, Phone } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTAPlan } from '@/context/TAPlanContext';

export function ChannelsSection() {
  const { stages, updateStageData } = useTAPlan();
  const [isOpen, setIsOpen] = useState(true);
  const [editingCadence, setEditingCadence] = useState(false);
  const [cadenceValue, setCadenceValue] = useState('');

  const data = stages.recruitmentChannels.data;
  const isCompleted = stages.recruitmentChannels.completed;

  const availableChannels = [
    { name: 'Email', icon: Mail },
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'Phone Calls', icon: Phone }
  ];

  const toggleChannel = (channelName: string) => {
    const currentChannels = data.selectedChannels;
    const newChannels = currentChannels.includes(channelName)
      ? currentChannels.filter(c => c !== channelName)
      : [...currentChannels, channelName];
    updateStageData('recruitmentChannels', { selectedChannels: newChannels });
  };

  const handleSaveCadence = () => {
    if (cadenceValue.trim()) {
      updateStageData('recruitmentChannels', { cadence: cadenceValue });
      setEditingCadence(false);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-accent/50 rounded-lg overflow-hidden bg-gradient-to-br from-card to-card/50 shadow-sm hover:shadow-md transition-all">
        <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-accent/20 via-accent/10 to-transparent hover:from-accent/25 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center border border-accent/50">
              <span className="text-accent-foreground font-semibold text-sm">📢</span>
            </div>
            <h3 className="font-semibold text-foreground">Your Channels</h3>
            {isCompleted && <Check className="w-4 h-4 text-[#58bb6b]" />}
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 space-y-4 border-t border-accent/30">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Your Channels</label>
              <div className="space-y-2">
                {availableChannels.map((channel) => {
                  const Icon = channel.icon;
                  const isSelected = data.selectedChannels.includes(channel.name);
                  return (
                    <button
                      key={channel.name}
                      onClick={() => toggleChannel(channel.name)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-[#58bb6b]/50 bg-[#58bb6b]/10 shadow-sm'
                          : 'border-accent/30 bg-accent/20 hover:bg-accent/30'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#58bb6b]/20' : 'bg-accent/50'
                      }`}>
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#58bb6b]' : 'text-muted-foreground'}`} />
                      </div>
                      <span className={`flex-1 text-left text-sm font-medium ${
                        isSelected ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {channel.name}
                      </span>
                      {isSelected && <Check className="w-5 h-5 text-[#58bb6b]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Outreach Cadence</label>
                {!editingCadence && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCadenceValue(data.cadence || '');
                      setEditingCadence(true);
                    }}
                    className="hover:bg-accent/50"
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
              {editingCadence ? (
                <div className="space-y-2">
                  <Input
                    value={cadenceValue}
                    onChange={(e) => setCadenceValue(e.target.value)}
                    placeholder="e.g., 3 touches per week"
                    className="border-accent/30 focus:border-[#58bb6b]"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSaveCadence}
                      className="bg-[#58bb6b] hover:bg-[#4aa75c] text-white"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingCadence(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm p-3 bg-gradient-to-br from-accent/30 to-accent/10 rounded-md border border-accent/30">
                  {data.cadence || 'Not yet defined...'}
                </p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
