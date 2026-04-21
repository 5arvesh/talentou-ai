import React, { useState } from 'react';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Building2, Clock, Star, TrendingUp, CheckCircle2, Heart, Send, Pencil, X, Check, Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
}

function EditableField({ value, onSave, placeholder, multiline, className }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-start gap-2">
        {multiline ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 min-h-[80px] text-sm"
            placeholder={placeholder}
          />
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 text-sm"
            placeholder={placeholder}
          />
        )}
        <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8 text-emerald-600">
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8 text-destructive">
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`group flex items-start gap-2 ${className}`}>
      <span className="flex-1">{value || placeholder}</span>
      <Button 
        size="icon" 
        variant="ghost" 
        onClick={() => setIsEditing(true)} 
        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface EditableListProps {
  items: string[];
  onUpdate: (items: string[]) => void;
  numbered?: boolean;
  bulletColor?: string;
}

function EditableList({ items, onUpdate, numbered, bulletColor = 'text-primary' }: EditableListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [newItem, setNewItem] = useState('');

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(items[index]);
  };

  const handleSave = (index: number) => {
    const newItems = [...items];
    newItems[index] = editValue;
    onUpdate(newItems);
    setEditingIndex(null);
    setEditValue('');
  };

  const handleDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
  };

  const handleAdd = () => {
    if (newItem.trim()) {
      onUpdate([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="group flex items-start gap-2">
          {numbered ? (
            <span className={`font-semibold min-w-[20px] ${bulletColor}`}>{index + 1}.</span>
          ) : (
            <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${bulletColor}`} />
          )}
          
          {editingIndex === index ? (
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 h-8 text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleSave(index)}
              />
              <Button size="icon" variant="ghost" onClick={() => handleSave(index)} className="h-6 w-6 text-emerald-600">
                <Check className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setEditingIndex(null)} className="h-6 w-6 text-destructive">
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <>
              <span className="flex-1 text-sm text-muted-foreground">{item}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(index)} className="h-6 w-6">
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(index)} className="h-6 w-6 text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
      
      {/* Add new item */}
      <div className="flex items-center gap-2 pt-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 h-8 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button size="icon" variant="ghost" onClick={handleAdd} className="h-8 w-8 text-primary">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function JDPreviewPanel() {
  const { jobDetails, stages, updateJobDetails } = useHiringLeadConversation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForApproval = () => {
    setIsSubmitting(true);
    console.log('Submitting for approval:', jobDetails);
    setTimeout(() => {
      navigate('/hiring-lead/jobs');
    }, 500);
  };

  const isComplete = stages.jobDetails.completed && 
                     stages.skillsResponsibilities.completed && 
                     stages.interviewerNomination.completed;

  // Mock company data - would come from TA Plan context
  const companyInfo = {
    name: "TechCorp Inc.",
    mission: "We're on a mission to revolutionize how businesses leverage technology. Our team is passionate about creating innovative solutions that make a real impact.",
    culture: "Join a diverse team of talented individuals who believe in collaboration, continuous learning, and pushing boundaries."
  };

  const [benefits, setBenefits] = useState([
    "Competitive salary + equity package",
    "Comprehensive health insurance",
    "Flexible remote work options",
    "25 days PTO + holidays",
    "Latest equipment & tools",
    "Learning & development budget"
  ]);

  const [aboutRole, setAboutRole] = useState(
    `We're looking for a talented ${jobDetails.title || 'professional'} to join our growing team. This is an exciting opportunity to work on cutting-edge projects and make a significant impact on our product and users. You'll collaborate with cross-functional teams to deliver high-quality solutions that drive business value.`
  );

  const [whyJoinMission, setWhyJoinMission] = useState(companyInfo.mission);
  const [whyJoinCulture, setWhyJoinCulture] = useState(companyInfo.culture);

  return (
    <div className="h-full bg-background flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="rounded-xl bg-background border border-border p-6">
            <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-0">
              <Building2 className="h-3 w-3 mr-1" />
              Engineering
            </Badge>
            
            <EditableField
              value={jobDetails.title || 'Position Title'}
              onSave={(value) => updateJobDetails({ title: value })}
              placeholder="Position Title"
              className="text-2xl font-bold text-foreground mb-2"
            />
            
            <p className="text-lg text-muted-foreground mb-4">{companyInfo.name}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="group flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
                <MapPin className="h-4 w-4 text-primary" />
                <EditableField
                  value={jobDetails.location || 'Location TBD'}
                  onSave={(value) => updateJobDetails({ location: value })}
                  placeholder="Location"
                  className="text-sm"
                />
              </div>
              <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{jobDetails.workType}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
                <Clock className="h-4 w-4 text-primary" />
                <span>{jobDetails.employmentMode}</span>
              </div>
            </div>
          </div>

          {/* About the Role */}
          <Card className="p-5 border-l-4 border-l-primary">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              About the Role
            </h3>
            <EditableField
              value={aboutRole}
              onSave={setAboutRole}
              placeholder="Describe the role..."
              multiline
              className="text-sm text-muted-foreground leading-relaxed"
            />
          </Card>

          {/* Why Join Us */}
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Why Join Us?
            </h3>
            <div className="space-y-4">
              <EditableField
                value={whyJoinMission}
                onSave={setWhyJoinMission}
                placeholder="Our mission..."
                multiline
                className="text-sm text-muted-foreground leading-relaxed"
              />
              <EditableField
                value={whyJoinCulture}
                onSave={setWhyJoinCulture}
                placeholder="Our culture..."
                multiline
                className="text-sm text-muted-foreground leading-relaxed"
              />
            </div>
          </Card>

          {/* Benefits & Perks */}
          <Card className="p-5 border-emerald-500/20">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Benefits & Perks
            </h3>
            <EditableList
              items={benefits}
              onUpdate={setBenefits}
              bulletColor="text-emerald-500"
            />
          </Card>

          {/* Skills Section - Two Columns */}
          <div className="grid grid-cols-2 gap-4">
            {/* Key Skills */}
            <Card className="p-5">
              <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Key Skills
              </h3>
              <EditableList
                items={jobDetails.keySkills}
                onUpdate={(items) => updateJobDetails({ keySkills: items })}
                numbered
                bulletColor="text-primary"
              />
            </Card>

            {/* Desired Skills */}
            <Card className="p-5">
              <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                Desired Skills
              </h3>
              <EditableList
                items={jobDetails.desiredSkills}
                onUpdate={(items) => updateJobDetails({ desiredSkills: items })}
                numbered
                bulletColor="text-muted-foreground"
              />
            </Card>
          </div>

          {/* What You'll Do */}
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              What You'll Do
            </h3>
            <EditableList
              items={jobDetails.responsibilities}
              onUpdate={(items) => updateJobDetails({ responsibilities: items })}
              numbered
              bulletColor="text-primary"
            />
          </Card>

          {/* Qualifications */}
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Preferred Qualifications
            </h3>
            <EditableList
              items={jobDetails.preferredQualifications}
              onUpdate={(items) => updateJobDetails({ preferredQualifications: items })}
              bulletColor="text-primary"
            />
          </Card>

        </div>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-border bg-background space-y-3">
        <p className="text-xs text-muted-foreground text-center mb-3">
          Click on any field to edit directly. Changes sync automatically.
        </p>
        
        <Button 
          onClick={handleSubmitForApproval}
          disabled={!isComplete || isSubmitting}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Confirm & Submit for TA Lead Approval
            </span>
          )}
        </Button>
        
        {!isComplete && (
          <p className="text-xs text-muted-foreground text-center">
            Complete all sections to submit for approval
          </p>
        )}
      </div>
    </div>
  );
}
