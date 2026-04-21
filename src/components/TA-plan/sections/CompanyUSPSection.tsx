import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, MessageCircle, TrendingUp, Award, DollarSign, Edit2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTAPlan } from '@/context/TAPlanContext';
import { cn } from '@/lib/utils';

export function CompanyUSPSection() {
  const [isOpen, setIsOpen] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const { stages, updateStageData } = useTAPlan();

  const handleEdit = (key: string, currentValue: string) => {
    setEditingField(key);
    setTempValue(currentValue);
  };

  const handleSave = (key: string) => {
    updateStageData('companyUSP', { [key]: tempValue });
    setEditingField(null);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-all rounded-t-lg border-b border-border">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-[#58bb6b]" />
          <h3 className="font-semibold text-foreground">Your Story</h3>
          {stages.companyUSP.completed && (
            <CheckCircle2 className="w-4 h-4 text-[#58bb6b]" />
          )}
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </CollapsibleTrigger>

      <CollapsibleContent className="p-4 space-y-4">
        {/* Elevator Pitch Card */}
        <div className="bg-gradient-to-br from-background to-accent/5 border border-border rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#58bb6b]/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-[#58bb6b]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground">Elevator Pitch</h4>
                {editingField !== 'elevatorPitch' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit('elevatorPitch', stages.companyUSP.data.elevatorPitch)}
                    className="h-7 w-7 p-0 hover:bg-[#58bb6b]/10"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">What makes your company unique</p>
            </div>
          </div>
          
          {editingField === 'elevatorPitch' ? (
            <div className="space-y-2">
              <Textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="min-h-[80px] resize-none"
                placeholder="Describe what makes your company special..."
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSave('elevatorPitch')}
                  className="bg-[#58bb6b] hover:bg-[#4aa75c] text-white"
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingField(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className={cn(
              "text-sm leading-relaxed",
              !stages.companyUSP.data.elevatorPitch && "text-muted-foreground italic"
            )}>
              {stages.companyUSP.data.elevatorPitch || 'No elevator pitch added yet'}
            </p>
          )}
        </div>

        {/* Career Growth Card */}
        <div className="bg-gradient-to-br from-background to-accent/5 border border-border rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground">Career Growth</h4>
                {editingField !== 'careerGrowth' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit('careerGrowth', stages.companyUSP.data.careerGrowth)}
                    className="h-7 w-7 p-0 hover:bg-blue-500/10"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Growth opportunities you offer</p>
            </div>
          </div>
          
          {editingField === 'careerGrowth' ? (
            <div className="space-y-2">
              <Textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="min-h-[80px] resize-none"
                placeholder="Describe career growth opportunities..."
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSave('careerGrowth')}
                  className="bg-[#58bb6b] hover:bg-[#4aa75c] text-white"
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingField(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className={cn(
              "text-sm leading-relaxed",
              !stages.companyUSP.data.careerGrowth && "text-muted-foreground italic"
            )}>
              {stages.companyUSP.data.careerGrowth || 'No career growth info added yet'}
            </p>
          )}
        </div>

        {/* Compensation & Awards - Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Compensation */}
          <div className="bg-gradient-to-br from-background to-accent/5 border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-foreground truncate">Compensation</h4>
                  {editingField !== 'compensation' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit('compensation', stages.companyUSP.data.compensation)}
                      className="h-6 w-6 p-0 hover:bg-emerald-500/10 flex-shrink-0"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {editingField === 'compensation' ? (
              <div className="space-y-2">
                <Textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="min-h-[60px] resize-none text-sm"
                  placeholder="Benefits..."
                  autoFocus
                />
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={() => handleSave('compensation')}
                    className="h-7 text-xs bg-[#58bb6b] hover:bg-[#4aa75c] text-white"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingField(null)}
                    className="h-7 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className={cn(
                "text-xs leading-relaxed",
                !stages.companyUSP.data.compensation && "text-muted-foreground italic"
              )}>
                {stages.companyUSP.data.compensation || 'Not specified'}
              </p>
            )}
          </div>

          {/* Awards */}
          <div className="bg-gradient-to-br from-background to-accent/5 border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-foreground truncate">Awards</h4>
                  {editingField !== 'awards' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit('awards', stages.companyUSP.data.awards)}
                      className="h-6 w-6 p-0 hover:bg-amber-500/10 flex-shrink-0"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {editingField === 'awards' ? (
              <div className="space-y-2">
                <Textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="min-h-[60px] resize-none text-sm"
                  placeholder="Awards..."
                  autoFocus
                />
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={() => handleSave('awards')}
                    className="h-7 text-xs bg-[#58bb6b] hover:bg-[#4aa75c] text-white"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingField(null)}
                    className="h-7 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className={cn(
                "text-xs leading-relaxed",
                !stages.companyUSP.data.awards && "text-muted-foreground italic"
              )}>
                {stages.companyUSP.data.awards || 'Not specified'}
              </p>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
