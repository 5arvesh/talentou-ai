import React, { useState } from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, X, Mail, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function TeamInvitationPanel() {
  const navigate = useNavigate();
  const { planData, updatePlanData } = useTAPlanFlow();
  const [email, setEmail] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addMember = () => {
    if (!isValidEmail(email) || selectedRoles.length === 0) return;
    const roles = selectedRoles as ('recruiter' | 'hiring_lead' | 'hr')[];
    updatePlanData('teamInvitations', {
      members: [...planData.teamInvitations.members, { email: email.trim(), roles }],
    });
    setEmail('');
    setSelectedRoles([]);
  };

  const removeMember = (index: number) => {
    updatePlanData('teamInvitations', {
      members: planData.teamInvitations.members.filter((_, i) => i !== index),
    });
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const membersCount = planData.teamInvitations.members.length;
  const canAddMember = isValidEmail(email) && selectedRoles.length > 0;

  return (
    <div className="space-y-5">
      <Card className="p-4 border-transparent shadow-none bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#44C4EB]">
            <Users className="h-5 w-5 text-black" />
          </div>
          <Label className="text-sm font-semibold text-gray-700 m-0">Invite Team Members</Label>
        </div>

        <div className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && canAddMember && addMember()}
            placeholder="member@company.com"
            className="h-11 bg-[#f3eeff] border-transparent font-medium"
          />

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">Select Role(s)</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={selectedRoles.includes('recruiter') ? 'default' : 'outline'}
                onClick={() => toggleRole('recruiter')}
                className={`flex-1 h-11 border-transparent ${selectedRoles.includes('recruiter') ? 'bg-[#7800d4] text-white hover:bg-[#7800d4]/90' : 'bg-[#f3eeff] font-bold text-[#7800D3] hover:bg-[#e9d1ff]'}`}
              >
                Recruiter
              </Button>
              <Button
                type="button"
                variant={selectedRoles.includes('hiring_lead') ? 'default' : 'outline'}
                onClick={() => toggleRole('hiring_lead')}
                className={`flex-1 h-11 border-transparent ${selectedRoles.includes('hiring_lead') ? 'bg-[#7800d4] text-white hover:bg-[#7800d4]/90' : 'bg-[#f3eeff] font-bold text-[#7800D3] hover:bg-[#e9d1ff]'}`}
              >
                Hiring Lead
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="flex-1">
                    <div>
                      <Button
                        type="button"
                        disabled
                        variant="outline"
                        className="w-full h-11 opacity-50 cursor-not-allowed bg-[#f3eeff] border-transparent font-bold text-[#7800D3]"
                      >
                        HR
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent><p>Coming Soon</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {selectedRoles.length === 0 && email && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground pl-1">
              <AlertCircle className="h-3 w-3" />
              Please select at least one role
            </div>
          )}

          <Button
            onClick={addMember}
            disabled={!canAddMember}
            className="w-full h-11 bg-[#f3eeff] font-bold text-[#7800D3] hover:bg-[#e9d1ff] border-transparent"
            variant="outline"
          >
            <Mail className="h-5 w-5 mr-2" />
            Send Invite
          </Button>
        </div>

        {membersCount > 0 ? (
          <div className="space-y-2 mt-4 pt-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-700">
                Invited Members ({membersCount})
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate('/settings/members')} className="h-8">
                <Users className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {planData.teamInvitations.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-background/50 border">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.email}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.roles.map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role === 'recruiter' ? 'Recruiter' : role === 'hiring_lead' ? 'Hiring Lead' : 'HR'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeMember(index)} className="h-8 w-8 ml-2">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center">
              No members invited yet. Start by adding team members above.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
