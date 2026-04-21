import React, { useState } from "react";
import { useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableSkillItemProps {
  id: string;
  index: number;
  skill: string;
  onRemove: () => void;
}

function SortableSkillItem({ id, index, skill, onRemove }: SortableSkillItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 text-sm bg-muted/30 rounded-md px-3 py-2 border border-border"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      <span className="font-semibold text-primary min-w-[24px]">{index + 1}.</span>
      <span className="flex-1 text-foreground">{skill}</span>
      <button onClick={onRemove}>
        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      </button>
    </li>
  );
}

export function SkillsResponsibilitiesPanel() {
  const { jobDetails, updateJobDetails, completeStage, setCurrentStage, addChatMessage } = useHiringLeadConversation();
  const [newKeySkill, setNewKeySkill] = useState("");
  const [newDesiredSkill, setNewDesiredSkill] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleNext = () => {
    addChatMessage({
      id: Date.now(),
      sender: 'ai',
      content: "Perfect! Now let's choose who will conduct the interviews for this position.",
      name: 'Talentou AI',
      stageIndex: 2
    });
    
    completeStage('skillsResponsibilities');
    setCurrentStage(2);
  };

  const addKeySkill = () => {
    if (newKeySkill.trim()) {
      updateJobDetails({ keySkills: [...jobDetails.keySkills, newKeySkill.trim()] });
      setNewKeySkill("");
    }
  };

  const removeKeySkill = (index: number) => {
    const updated = jobDetails.keySkills.filter((_, i) => i !== index);
    updateJobDetails({ keySkills: updated });
  };

  const addDesiredSkill = () => {
    if (newDesiredSkill.trim()) {
      updateJobDetails({ desiredSkills: [...jobDetails.desiredSkills, newDesiredSkill.trim()] });
      setNewDesiredSkill("");
    }
  };

  const removeDesiredSkill = (index: number) => {
    const updated = jobDetails.desiredSkills.filter((_, i) => i !== index);
    updateJobDetails({ desiredSkills: updated });
  };

  const addQualification = () => {
    if (newQualification.trim()) {
      updateJobDetails({ 
        preferredQualifications: [...jobDetails.preferredQualifications, newQualification.trim()] 
      });
      setNewQualification("");
    }
  };

  const removeQualification = (index: number) => {
    const updated = jobDetails.preferredQualifications.filter((_, i) => i !== index);
    updateJobDetails({ preferredQualifications: updated });
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      updateJobDetails({ responsibilities: [...jobDetails.responsibilities, newResponsibility.trim()] });
      setNewResponsibility("");
    }
  };

  const removeResponsibility = (index: number) => {
    const updated = jobDetails.responsibilities.filter((_, i) => i !== index);
    updateJobDetails({ responsibilities: updated });
  };

  const handleDragEndKey = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = jobDetails.keySkills.findIndex((_, i) => `key-${i}` === active.id);
      const newIndex = jobDetails.keySkills.findIndex((_, i) => `key-${i}` === over.id);
      updateJobDetails({ keySkills: arrayMove(jobDetails.keySkills, oldIndex, newIndex) });
    }
  };

  const handleDragEndDesired = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = jobDetails.desiredSkills.findIndex((_, i) => `desired-${i}` === active.id);
      const newIndex = jobDetails.desiredSkills.findIndex((_, i) => `desired-${i}` === over.id);
      updateJobDetails({ desiredSkills: arrayMove(jobDetails.desiredSkills, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Key Skills</CardTitle>
            <Badge variant="secondary" className="text-xs">AI Generated</Badge>
          </div>
          <CardDescription>Essential skills for this position (drag to reorder by priority)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border rounded-lg p-4 bg-background min-h-[100px]">
            {jobDetails.keySkills.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEndKey}
              >
                <SortableContext
                  items={jobDetails.keySkills.map((_, i) => `key-${i}`)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="space-y-2">
                    {jobDetails.keySkills.map((skill, index) => (
                      <SortableSkillItem
                        key={`key-${index}`}
                        id={`key-${index}`}
                        index={index}
                        skill={skill}
                        onRemove={() => removeKeySkill(index)}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            ) : (
              <p className="text-sm text-muted-foreground">No key skills added yet</p>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add key skill..."
              value={newKeySkill}
              onChange={(e) => setNewKeySkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeySkill()}
            />
            <Button onClick={addKeySkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Desired Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Desired Skills</CardTitle>
            <Badge variant="secondary" className="text-xs">AI Generated</Badge>
          </div>
          <CardDescription>Nice to have skills (drag to reorder by priority)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border rounded-lg p-4 bg-background min-h-[100px]">
            {jobDetails.desiredSkills.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEndDesired}
              >
                <SortableContext
                  items={jobDetails.desiredSkills.map((_, i) => `desired-${i}`)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="space-y-2">
                    {jobDetails.desiredSkills.map((skill, index) => (
                      <SortableSkillItem
                        key={`desired-${index}`}
                        id={`desired-${index}`}
                        index={index}
                        skill={skill}
                        onRemove={() => removeDesiredSkill(index)}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            ) : (
              <p className="text-sm text-muted-foreground">No desired skills added yet</p>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add desired skill..."
              value={newDesiredSkill}
              onChange={(e) => setNewDesiredSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addDesiredSkill()}
            />
            <Button onClick={addDesiredSkill} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Roles & Responsibilities - Now 3rd */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Roles & Responsibilities</CardTitle>
            <Badge variant="secondary" className="text-xs">AI Generated</Badge>
          </div>
          <CardDescription>Key responsibilities for this role</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border rounded-lg p-4 bg-background min-h-[100px]">
            {jobDetails.responsibilities.length > 0 ? (
              <ul className="space-y-2">
                {jobDetails.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-foreground mt-1">•</span>
                    <span className="flex-1 text-foreground">{resp}</span>
                    <button onClick={() => removeResponsibility(index)}>
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No responsibilities added yet</p>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add responsibility..."
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addResponsibility()}
            />
            <Button onClick={addResponsibility} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferred Qualifications - Now 4th */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Preferred Qualifications</CardTitle>
            <Badge variant="secondary" className="text-xs">AI Generated</Badge>
          </div>
          <CardDescription>Educational qualifications and certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border rounded-lg p-4 bg-background min-h-[100px]">
            {jobDetails.preferredQualifications.length > 0 ? (
              <ul className="space-y-2">
                {jobDetails.preferredQualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-foreground mt-1">•</span>
                    <span className="flex-1 text-foreground">{qual}</span>
                    <button onClick={() => removeQualification(index)}>
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No qualifications added yet</p>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add qualification..."
              value={newQualification}
              onChange={(e) => setNewQualification(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addQualification()}
            />
            <Button onClick={addQualification} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="mt-6 pt-6 border-t border-border">
        <Button
          onClick={handleNext}
          disabled={jobDetails.keySkills.length === 0 || jobDetails.responsibilities.length === 0}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Choose Interviewer
        </Button>
      </div>
    </div>
  );
}
