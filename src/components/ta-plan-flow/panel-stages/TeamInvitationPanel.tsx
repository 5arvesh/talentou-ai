import React, { useState } from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, X, Mail, AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


export function TeamInvitationPanel() {
  const navigate = useNavigate();
  const { planData, updatePlanData, completeStage } = useTAPlanFlow();
  const [email, setEmail] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addMember = () => {
    if (!isValidEmail(email)) return;
    if (selectedRoles.length === 0) return;

    const roles = selectedRoles as ('recruiter' | 'hiring_lead' | 'hr')[];

    updatePlanData('teamInvitations', {
      members: [...planData.teamInvitations.members, { email: email.trim(), roles }],
    });

    setEmail('');
    setSelectedRoles([]);
  };

  const removeMember = (index: number) => {
    const updated = planData.teamInvitations.members.filter((_, i) => i !== index);
    updatePlanData('teamInvitations', { members: updated });
  };

  const handleComplete = () => {
    completeStage('teamInvitation');
    setTimeout(() => {
      navigate('/sales-plan/dashboard');
    }, 1000);
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const membersCount = planData.teamInvitations.members.length;
  const canAddMember = isValidEmail(email) && selectedRoles.length > 0;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Unified Team Invitation */}
        <Card className="p-4 border-transparent shadow-none bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#44C4EB]">
              <Users className="h-5 w-5 text-black" />
            </div>
            <Label className="text-base font-bold m-0 text-[#6474a9]">Invite Team Members</Label>
          </div>

          {/* Email Input */}
          <div className="space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && canAddMember && addMember()}
              placeholder="member@company.com"
              className="h-11 bg-[#f3eeff] border-transparent font-medium"
            />

            {/* Role Selection Buttons */}
            <div className="space-y-2">
              <Label className="text-base font-bold text-[#6474a9]">Select Role(s)</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={selectedRoles.includes('recruiter') ? 'default' : 'outline'}
                  onClick={() => toggleRole('recruiter')}
                  className={`flex-1 h-11 border-transparent ${selectedRoles.includes('recruiter') ? 'bg-[#7800d4] text-white hover:bg-[#7800d4]/90' : 'bg-[#f3eeff] font-bold text-[#6474a9] hover:bg-[#e9d1ff]'}`}
                >
                  Recruiter
                </Button>
                <Button
                  type="button"
                  variant={selectedRoles.includes('hiring_lead') ? 'default' : 'outline'}
                  onClick={() => toggleRole('hiring_lead')}
                  className={`flex-1 h-11 border-transparent ${selectedRoles.includes('hiring_lead') ? 'bg-[#7800d4] text-white hover:bg-[#7800d4]/90' : 'bg-[#f3eeff] font-bold text-[#6474a9] hover:bg-[#e9d1ff]'}`}
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
                          className="w-full h-11 opacity-50 cursor-not-allowed bg-[#f3eeff] border-transparent font-bold text-[#6474a9]"
                        >
                          HR
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming Soon</p>
                    </TooltipContent>
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

            {/* Send Invite Button */}
            <Button
              onClick={addMember}
              disabled={!canAddMember}
              className="w-full h-11 bg-[#f3eeff] font-bold text-[#6474a9] hover:bg-[#e9d1ff] border-transparent"
              variant="outline"
            >
              <Mail className="h-5 w-5 mr-2" />
              Send Invite
            </Button>
          </div>

          {/* Invited Members Display */}
          {membersCount > 0 ? (
            <div className="space-y-2 mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-[#6474a9]">
                  Invited Members ({membersCount})
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/settings/members')}
                  className="h-8"
                >
                  <Users className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {planData.teamInvitations.members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-md bg-background/50 border"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.email}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.roles.map((role) => (
                          <Badge
                            key={role}
                            variant="secondary"
                            className="text-xs"
                          >
                            {role === 'recruiter' ? 'Recruiter' : role === 'hiring_lead' ? 'Hiring Lead' : 'HR'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMember(index)}
                      className="h-8 w-8 ml-2"
                    >
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

      <div className="pt-4 flex flex-col items-end gap-2">
        <Button
          onClick={handleComplete}
          disabled={membersCount === 0}
          className="bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white rounded-full px-6 py-2 h-auto text-base font-medium border-0"
        >
          Complete Setup <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        {membersCount === 0 && (
          <p className="text-xs text-muted-foreground">
            Please invite at least one team member to continue
          </p>
        )}
        {membersCount > 0 && (
          <div className="p-3 rounded-lg bg-muted/50 border w-full text-right mt-2">
            <p className="text-xs text-muted-foreground">
              <strong>{membersCount}</strong> member{membersCount !== 1 ? 's' : ''} invited
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
