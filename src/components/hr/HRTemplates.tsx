import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, Edit, FileUp, Plus, Trash2, Eye, Save, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CTCComponent {
  id: string;
  name: string;
  usePercentage: boolean;
  percentage?: number;
  amount?: number;
}

interface Template {
  id: string;
  name: string;
  lastUpdated: string;
  type: 'upload' | 'custom';
  content?: string;
  customFields?: string[];
  ctcComponents?: CTCComponent[];
}

export function HRTemplates() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([
    { 
      id: "1", 
      name: "Standard Full-Time Offer", 
      lastUpdated: "2024-01-15",
      type: 'custom',
      content: "Dear {Candidate Name}, We are pleased to offer you the position of {Role} at {Company Name}...",
      customFields: ["Candidate Name", "Role", "Total CTC", "Joining Date", "Probation Period", "Notice Period"],
      ctcComponents: [
        { id: "1", name: "Basic Pay", usePercentage: true, percentage: 40 },
        { id: "2", name: "HRA", usePercentage: true, percentage: 20 },
        { id: "3", name: "Travel Allowance", usePercentage: true, percentage: 10 },
        { id: "4", name: "Special Allowance", usePercentage: true, percentage: 30 },
      ]
    },
    { 
      id: "2", 
      name: "Internship Offer Letter", 
      lastUpdated: "2024-01-10",
      type: 'upload',
      customFields: ["Candidate Name", "Role", "Stipend", "Duration", "Start Date"],
      ctcComponents: []
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [templateType, setTemplateType] = useState<'upload' | 'custom'>('custom');
  const [templateContent, setTemplateContent] = useState("");
  const [customFields, setCustomFields] = useState<string[]>([
    "Candidate Name", "Candidate Email", "Total CTC", "Joining Date"
  ]);
  const [ctcComponents, setCtcComponents] = useState<CTCComponent[]>([]);

  const handleCreateTemplate = () => {
    if (newTemplateName.trim()) {
      const newTemplate: Template = {
        id: Date.now().toString(),
        name: newTemplateName,
        lastUpdated: new Date().toISOString().split('T')[0],
        type: templateType,
        content: templateType === 'custom' ? templateContent : undefined,
        customFields,
        ctcComponents
      };
      setTemplates([...templates, newTemplate]);
      setIsCreateDialogOpen(false);
      setNewTemplateName("");
      setTemplateContent("");
      setCustomFields(["Candidate Name", "Candidate Email", "Total CTC", "Joining Date"]);
      setCtcComponents([]);
      toast({
        title: "Success",
        description: "Template created successfully",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewTemplateName(file.name.replace(/\.[^/.]+$/, ""));
      setTemplateType('upload');
      toast({
        title: "File Uploaded",
        description: `${file.name} has been processed`,
      });
    }
  };

  const handleDuplicate = (template: Template) => {
    const duplicated: Template = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, duplicated]);
    toast({
      title: "Success",
      description: "Template duplicated successfully",
    });
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: "Success",
      description: "Template deleted successfully",
    });
  };

  const handleConfigure = (template: Template) => {
    setSelectedTemplate(template);
    setCustomFields(template.customFields || []);
    setCtcComponents(template.ctcComponents || []);
    setIsConfigureDialogOpen(true);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, ""]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const updateCustomField = (index: number, value: string) => {
    const updated = [...customFields];
    updated[index] = value;
    setCustomFields(updated);
  };

  const addCTCComponent = () => {
    const newComponent: CTCComponent = {
      id: Date.now().toString(),
      name: "",
      usePercentage: true,
      percentage: 0,
    };
    setCtcComponents([...ctcComponents, newComponent]);
  };

  const removeCTCComponent = (id: string) => {
    setCtcComponents(ctcComponents.filter(c => c.id !== id));
  };

  const updateCTCComponent = (id: string, field: keyof CTCComponent, value: any) => {
    setCtcComponents(ctcComponents.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleSaveConfiguration = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id 
          ? { ...t, customFields, ctcComponents, lastUpdated: new Date().toISOString().split('T')[0] }
          : t
      ));
      setIsConfigureDialogOpen(false);
      setSelectedTemplate(null);
      toast({
        title: "Success",
        description: "Template configuration saved successfully",
      });
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Offer Letter Templates</h1>
          <p className="text-muted-foreground">
            Manage and create reusable offer letter templates with customizable fields and CTC breakdown.
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Template
        </Button>
      </div>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Templates ({templates.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">{template.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={template.type === "upload" ? "secondary" : "default"}>
                      {template.type === "upload" ? "Uploaded" : "Custom"}
                    </Badge>
                  </TableCell>
                  <TableCell>{template.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleConfigure(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDuplicate(template)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Template Name *</Label>
              <Input
                placeholder="e.g., Standard Full-Time Offer"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer border-2 ${templateType === 'upload' ? 'border-primary' : 'border-muted'}`}
                onClick={() => setTemplateType('upload')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <FileUp className="h-8 w-8 mb-2" />
                  <h3 className="font-medium">Upload Template</h3>
                  <p className="text-xs text-muted-foreground text-center">Upload existing document</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer border-2 ${templateType === 'custom' ? 'border-primary' : 'border-muted'}`}
                onClick={() => setTemplateType('custom')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <FileText className="h-8 w-8 mb-2" />
                  <h3 className="font-medium">Create Custom</h3>
                  <p className="text-xs text-muted-foreground text-center">Write template from scratch</p>
                </CardContent>
              </Card>
            </div>

            {templateType === 'upload' && (
              <div>
                <Label>Upload File</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </div>
            )}

            {templateType === 'custom' && (
              <div>
                <Label>Template Content</Label>
                <Textarea
                  placeholder="Dear {Candidate Name}, We are pleased to offer..."
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  rows={8}
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate}>
                Create Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Configure Template Dialog */}
      <Dialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure Template - {selectedTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Custom Fields Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Customizable Fields</span>
                  <Button size="sm" onClick={addCustomField}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Field
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  These fields will be auto-filled or editable when generating an offer letter for a candidate.
                </p>
                {customFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Field name (e.g., Candidate Name)"
                      value={field}
                      onChange={(e) => updateCustomField(index, e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomField(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                {customFields.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No custom fields added. Click "Add Field" to add customizable fields.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* CTC Breakdown Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>CTC Breakdown Configuration</span>
                  <Button size="sm" onClick={addCTCComponent}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Component
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Configure CTC components with percentage-based or manual amount entry. HR can adjust these when generating offer letters.
                </p>
                {ctcComponents.map((component) => (
                  <div key={component.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Component name (e.g., Basic Pay)"
                        value={component.name}
                        onChange={(e) => updateCTCComponent(component.id, "name", e.target.value)}
                        className="flex-1 mr-2"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCTCComponent(component.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={component.usePercentage}
                          onCheckedChange={(checked) => 
                            updateCTCComponent(component.id, "usePercentage", checked)
                          }
                        />
                        <Label className="text-sm">Use Percentage</Label>
                      </div>
                      
                      {component.usePercentage ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Percentage"
                            value={component.percentage || ""}
                            onChange={(e) => 
                              updateCTCComponent(component.id, "percentage", parseFloat(e.target.value))
                            }
                            className="w-24"
                          />
                          <span className="text-sm">% of Total CTC</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Manual amount entry enabled</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {ctcComponents.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No CTC components configured. This template will not include CTC breakdown.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsConfigureDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveConfiguration}>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
