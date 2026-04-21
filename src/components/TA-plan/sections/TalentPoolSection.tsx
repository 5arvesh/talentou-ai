import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Check, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTAPlan } from '@/context/TAPlanContext';

export function TalentPoolSection() {
  const { stages, updateStageData } = useTAPlan();
  const [isOpen, setIsOpen] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);

  const data = stages.talentPool.data;
  const isCompleted = stages.talentPool.completed;

  const handleAddItem = (field: string, value: string) => {
    if (!value.trim()) return;
    const currentArray = data[field as keyof typeof data] as string[];
    updateStageData('talentPool', { [field]: [...currentArray, value] });
  };

  const handleRemoveItem = (field: string, index: number) => {
    const currentArray = data[field as keyof typeof data] as string[];
    updateStageData('talentPool', { [field]: currentArray.filter((_, i) => i !== index) });
  };

  const renderArrayField = (field: string, label: string, items: string[]) => {
    const [inputValue, setInputValue] = useState('');
    const isEditing = editingField === field;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">{label}</label>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingField(field)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Edit2 className="w-3 h-3 mr-1" />
              Edit
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-md min-h-[60px] border border-primary/20">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Badge key={index} variant="secondary" className="gap-1 bg-primary/20 text-foreground border border-primary/30 hover:bg-primary/30 transition-colors">
                {item}
                {isEditing && (
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors" 
                    onClick={() => handleRemoveItem(field, index)}
                  />
                )}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground italic">No items added yet...</span>
          )}
        </div>
        {isEditing && (
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Add ${label.toLowerCase()}...`}
              className="border-primary/30 focus:border-primary"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (inputValue.trim()) {
                    handleAddItem(field, inputValue);
                    setInputValue('');
                  }
                }
              }}
            />
            <Button 
              size="sm" 
              onClick={() => {
                if (inputValue.trim()) {
                  handleAddItem(field, inputValue);
                  setInputValue('');
                }
              }}
              className="bg-[#58bb6b] hover:bg-[#4aa75c] text-white"
            >
              Add
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setEditingField(null);
                setInputValue('');
              }}
              className="border-primary/30 hover:bg-primary/10"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-primary/30 rounded-lg overflow-hidden bg-gradient-to-br from-card to-card/50 shadow-sm hover:shadow-md transition-all">
        <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-primary/10 via-primary/5 to-transparent hover:from-primary/15 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-primary font-semibold text-sm">👥</span>
            </div>
            <h3 className="font-semibold text-foreground">Talent Pool</h3>
            {isCompleted && <Check className="w-4 h-4 text-[#58bb6b]" />}
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 space-y-4 border-t border-primary/20">
            {renderArrayField('workArrangement', 'Work Arrangement', data.workArrangement)}
            {renderArrayField('geographicPreferences', 'Geographic Preferences', data.geographicPreferences)}
            {renderArrayField('targetIndustries', 'Target Industries', data.targetIndustries)}
            {renderArrayField('targetCompanies', 'Target Companies', data.targetCompanies)}
            {renderArrayField('educationalInstitutions', 'Educational Institutions', data.educationalInstitutions)}
            {renderArrayField('keySkills', 'Key Skills', data.keySkills)}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
