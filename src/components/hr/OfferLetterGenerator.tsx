import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Eye, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Candidate {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
}

interface Template {
  id: string;
  name: string;
  customFields: string[];
  ctcComponents: CTCComponent[];
}

interface CTCComponent {
  id: string;
  name: string;
  usePercentage: boolean;
  percentage?: number;
  amount?: number;
}

interface OfferLetterGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onSave: (data: any) => void;
}

export function OfferLetterGenerator({ isOpen, onClose, candidate, onSave }: OfferLetterGeneratorProps) {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);

  // Mock templates - in real app, fetch from backend
  const templates: Template[] = [
    {
      id: "1",
      name: "Standard Full-Time Offer",
      customFields: ["totalCTC", "joiningDate", "probationPeriod", "noticePeriod"],
      ctcComponents: [
        { id: "1", name: "Basic Pay", usePercentage: true, percentage: 40 },
        { id: "2", name: "HRA", usePercentage: true, percentage: 20 },
        { id: "3", name: "Travel Allowance", usePercentage: true, percentage: 10 },
      ]
    },
    {
      id: "2",
      name: "Internship Offer",
      customFields: ["stipend", "joiningDate", "duration"],
      ctcComponents: []
    }
  ];

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [offerData, setOfferData] = useState({
    totalCTC: "",
    joiningDate: "",
    probationPeriod: "",
    noticePeriod: "",
    offerDate: new Date().toISOString().split('T')[0],
    offerValidityDays: "7",
    companyName: "Talentou",
    signatoryName: "",
    companyAddress: "",
  });

  const [ctcBreakdown, setCtcBreakdown] = useState<CTCComponent[]>([]);

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setCtcBreakdown(template.ctcComponents.map(c => ({ ...c })));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setOfferData(prev => ({ ...prev, [field]: value }));
  };

  const addCTCComponent = () => {
    const newComponent: CTCComponent = {
      id: Date.now().toString(),
      name: "",
      usePercentage: true,
      percentage: 0,
    };
    setCtcBreakdown(prev => [...prev, newComponent]);
  };

  const removeCTCComponent = (id: string) => {
    setCtcBreakdown(prev => prev.filter(c => c.id !== id));
  };

  const updateCTCComponent = (id: string, field: keyof CTCComponent, value: any) => {
    setCtcBreakdown(prev => prev.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const calculateCTCAmount = (component: CTCComponent): number => {
    const totalCTC = parseFloat(offerData.totalCTC) || 0;
    if (component.usePercentage && component.percentage) {
      return (totalCTC * component.percentage) / 100;
    }
    return component.amount || 0;
  };

  const handlePreview = () => {
    if (!selectedTemplateId) {
      toast({
        title: "Error",
        description: "Please select a template",
        variant: "destructive",
      });
      return;
    }
    setShowPreview(true);
  };

  const handleSaveAndSend = () => {
    const data = {
      templateId: selectedTemplateId,
      candidate,
      offerData,
      ctcBreakdown,
    };
    onSave(data);
    toast({
      title: "Success",
      description: "Offer letter generated and saved successfully",
    });
    onClose();
  };

  if (!candidate) return null;

  if (showPreview) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Offer Letter Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary">{offerData.companyName}</h2>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><strong>Date:</strong> {offerData.offerDate}</p>
                    <p><strong>{candidate.name}</strong></p>
                    <p>{candidate.location}</p>
                    <p><strong>Contact:</strong> {candidate.phone} / {candidate.email}</p>
                  </div>

                  <div className="text-center my-6">
                    <h3 className="font-bold text-lg underline">OFFER LETTER</h3>
                  </div>

                  <p className="text-sm">Dear {candidate.name},</p>
                  
                  <p className="text-sm">
                    We are pleased to offer you the position of <strong>{candidate.role}</strong> at {offerData.companyName}.
                  </p>

                  <div className="space-y-2 text-sm">
                    <p><strong>Joining Date:</strong> {offerData.joiningDate}</p>
                    <p><strong>Total CTC:</strong> ₹{offerData.totalCTC} per annum</p>
                    
                    {ctcBreakdown.length > 0 && (
                      <div className="mt-4">
                        <p className="font-bold mb-2">CTC Breakdown:</p>
                        <table className="w-full border text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="border p-2 text-left">Component</th>
                              <th className="border p-2 text-right">Amount (₹)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ctcBreakdown.map(component => (
                              <tr key={component.id}>
                                <td className="border p-2">{component.name}</td>
                                <td className="border p-2 text-right">
                                  {calculateCTCAmount(component).toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {offerData.probationPeriod && (
                      <p><strong>Probation Period:</strong> {offerData.probationPeriod}</p>
                    )}
                    {offerData.noticePeriod && (
                      <p><strong>Notice Period:</strong> {offerData.noticePeriod}</p>
                    )}
                  </div>

                  <p className="text-sm mt-4">
                    This offer is valid for {offerData.offerValidityDays} days from the date of this letter.
                  </p>

                  <div className="mt-8">
                    <p className="text-sm">Yours sincerely,</p>
                    <p className="text-sm mt-4"><strong>{offerData.signatoryName}</strong></p>
                    <p className="text-sm">{offerData.companyName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Back to Edit
              </Button>
              <Button onClick={handleSaveAndSend}>
                <Save className="h-4 w-4 mr-2" />
                Save & Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Offer Letter - {candidate.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Select Offer Template *</Label>
            <Select value={selectedTemplateId} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTemplateId && (
            <>
              <Separator />

              {/* Auto-filled Candidate Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Candidate Details (Auto-filled)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Full Name</Label>
                    <p className="font-medium">{candidate.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Role</Label>
                    <p className="font-medium">{candidate.role}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    <p className="font-medium">{candidate.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Phone</Label>
                    <p className="font-medium">{candidate.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-muted-foreground">Location</Label>
                    <p className="font-medium">{candidate.location}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Offer Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Offer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Total CTC (₹ per annum) *</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 1200000"
                        value={offerData.totalCTC}
                        onChange={(e) => handleInputChange("totalCTC", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Joining Date *</Label>
                      <Input
                        type="date"
                        value={offerData.joiningDate}
                        onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Probation Period</Label>
                      <Input
                        placeholder="e.g., 3 months"
                        value={offerData.probationPeriod}
                        onChange={(e) => handleInputChange("probationPeriod", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Notice Period</Label>
                      <Input
                        placeholder="e.g., 30 days"
                        value={offerData.noticePeriod}
                        onChange={(e) => handleInputChange("noticePeriod", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Offer Date</Label>
                      <Input
                        type="date"
                        value={offerData.offerDate}
                        onChange={(e) => handleInputChange("offerDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Offer Validity (days)</Label>
                      <Input
                        type="number"
                        value={offerData.offerValidityDays}
                        onChange={(e) => handleInputChange("offerValidityDays", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTC Breakdown */}
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
                  {ctcBreakdown.map((component) => (
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
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              type="number"
                              placeholder="Percentage"
                              value={component.percentage || ""}
                              onChange={(e) => 
                                updateCTCComponent(component.id, "percentage", parseFloat(e.target.value))
                              }
                              className="w-24"
                            />
                            <span className="text-sm">%</span>
                            <span className="text-sm text-muted-foreground">
                              = ₹{calculateCTCAmount(component).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              type="number"
                              placeholder="Amount"
                              value={component.amount || ""}
                              onChange={(e) => 
                                updateCTCComponent(component.id, "amount", parseFloat(e.target.value))
                              }
                            />
                            <span className="text-sm text-muted-foreground">₹</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {ctcBreakdown.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No CTC components added. Click "Add Component" to configure the breakdown.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Company Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Company Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name *</Label>
                      <Input
                        value={offerData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Authorized Signatory Name *</Label>
                      <Input
                        placeholder="e.g., John Smith"
                        value={offerData.signatoryName}
                        onChange={(e) => handleInputChange("signatoryName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Company Address</Label>
                      <Textarea
                        placeholder="Enter company address"
                        value={offerData.companyAddress}
                        onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={handlePreview}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Offer Letter
                </Button>
                <Button onClick={handleSaveAndSend}>
                  <Save className="h-4 w-4 mr-2" />
                  Save & Send
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
