import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, UserPlus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTAPlan } from '@/context/TAPlanContext';

export function TeamMembersSection() {
  const { stages } = useTAPlan();
  const [isOpen, setIsOpen] = useState(true);

  const data = stages.teamInvitation.data;
  const isCompleted = stages.teamInvitation.completed;

  const roles = [
    { key: 'recruiters', label: 'Recruiters', members: data.recruiters },
    { key: 'hiringLeads', label: 'Hiring Leads', members: data.hiringLeads },
    { key: 'hrMembers', label: 'HR Team', members: data.hrMembers },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-border rounded-lg overflow-hidden bg-gradient-to-br from-card to-card/50 shadow-sm hover:shadow-md transition-all">
        <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
              <UserPlus className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Team Members</h3>
            {isCompleted && <Check className="w-4 h-4 text-success" />}
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 space-y-4 border-t border-border">
            {roles.map((role) => (
              <div key={role.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">{role.label}</label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <UserPlus className="w-3 h-3 mr-1" />
                    Invite
                  </Button>
                </div>
                <div className="p-3 bg-primary/5 rounded-md min-h-[60px] border border-primary/10">
                  {role.members.length > 0 ? (
                    <div className="space-y-2">
                      {role.members.map((member: any, index: number) => (
                        <div key={index} className="flex items-center justify-between bg-background/50 p-2 rounded-md">
                          <span className="text-sm font-medium">{member.name || member.email}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${member.status === 'Active' ? 'border-success/30 text-success' : 'border-border'}`}
                          >
                            {member.status || 'Pending'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">No members invited yet...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
