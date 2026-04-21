import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FilePenLine, Mail, Users, Search, Filter, Eye, ChevronDown, ChevronUp, Phone, MapPin, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OfferLetterGenerator } from "./OfferLetterGenerator";

interface Candidate {
  id: string;
  name: string;
  role: string;
  status: "Offered" | "Accepted" | "Rejected" | "Hired";
  email: string;
  phone: string;
  appliedDate: string;
  salary?: string;
  startDate?: string;
  location: string;
  linkedinProfile: string;
  offerLetterContent?: string;
}

export function HRCandidates() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [expandedCandidates, setExpandedCandidates] = useState<Set<string>>(new Set());
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "John Doe",
      role: "Software Engineer",
      status: "Offered",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      appliedDate: "2024-01-10",
      salary: "$120,000",
      startDate: "2024-02-01",
      location: "San Francisco, CA",
      linkedinProfile: "linkedin.com/in/johndoe",
      offerLetterContent: "Dear John Doe,\n\nWe are pleased to offer you the position of Software Engineer at our company...\n\nSalary: $120,000\nStart Date: February 1, 2024\n\nBest regards,\nHR Team"
    },
    {
      id: "3",
      name: "Mike Johnson",
      role: "Backend Developer",
      status: "Accepted",
      email: "mike.johnson@example.com",
      phone: "+1-555-0125",
      appliedDate: "2024-01-05",
      salary: "$110,000",
      startDate: "2024-01-30",
      location: "Austin, TX",
      linkedinProfile: "linkedin.com/in/mikejohnson",
      offerLetterContent: "Dear Mike Johnson,\n\nWe are pleased to offer you the position of Backend Developer at our company...\n\nSalary: $110,000\nStart Date: January 30, 2024\n\nBest regards,\nHR Team"
    },
    {
      id: "4",
      name: "Sarah Wilson",
      role: "UX Designer",
      status: "Rejected",
      email: "sarah.wilson@example.com",
      phone: "+1-555-0126",
      appliedDate: "2024-01-03",
      location: "Seattle, WA",
      linkedinProfile: "linkedin.com/in/sarahwilson",
      offerLetterContent: ""
    },
    {
      id: "5",
      name: "David Brown",
      role: "Data Scientist",
      status: "Hired",
      email: "david.brown@example.com",
      phone: "+1-555-0127",
      appliedDate: "2023-12-28",
      salary: "$130,000",
      startDate: "2024-01-15",
      location: "Boston, MA",
      linkedinProfile: "linkedin.com/in/davidbrown",
      offerLetterContent: "Dear David Brown,\n\nWe are pleased to offer you the position of Data Scientist at our company...\n\nSalary: $130,000\nStart Date: January 15, 2024\n\nBest regards,\nHR Team"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isOfferGeneratorOpen, setIsOfferGeneratorOpen] = useState(false);
  const [isMailDialogOpen, setIsMailDialogOpen] = useState(false);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Candidate["status"]) => {
    return "bg-gray-100 text-gray-800";
  };

  const handleExpandToggle = (candidateId: string) => {
    const newExpanded = new Set(expandedCandidates);
    if (expandedCandidates.has(candidateId)) {
      newExpanded.delete(candidateId);
    } else {
      newExpanded.add(candidateId);
    }
    setExpandedCandidates(newExpanded);
  };

  const handleGenerateOfferLetter = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsOfferGeneratorOpen(true);
  };

  const handleSendMail = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsMailDialogOpen(true);
  };

  const handleViewOfferLetter = (candidate: Candidate) => {
    navigate(`/hr/offer-letter/${candidate.id}`);
  };

  const updateCandidateStatus = (candidateId: string, newStatus: Candidate["status"]) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
    ));
  };

  const handleOfferLetterSaved = (data: any) => {
    if (selectedCandidate) {
      // Update candidate with offer letter data
      setCandidates(prev => prev.map(candidate => 
        candidate.id === selectedCandidate.id 
          ? { 
              ...candidate, 
              status: "Offered",
              offerLetterContent: `Offer letter generated for ${candidate.name}`,
              salary: `₹${data.offerData.totalCTC}`,
              startDate: data.offerData.joiningDate
            } 
          : candidate
      ));
    }
    setIsOfferGeneratorOpen(false);
    setSelectedCandidate(null);
  };

  const handleMailSent = () => {
    toast({
      title: "Success",
      description: "Email sent successfully",
    });
    setIsMailDialogOpen(false);
    setSelectedCandidate(null);
  };

  const statusCounts = {
    all: candidates.length,
    Offered: candidates.filter(c => c.status === "Offered").length,
    Accepted: candidates.filter(c => c.status === "Accepted").length,
    Rejected: candidates.filter(c => c.status === "Rejected").length,
    Hired: candidates.filter(c => c.status === "Hired").length,
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Candidates</h1>
          <p className="text-muted-foreground">
            Manage offer letters and track candidate status from offer to hire.
          </p>
        </div>
      </div>


      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Candidates ({filteredCandidates.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Offered">Offered</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="text-black font-medium">Name</TableHead>
                  <TableHead className="text-black font-medium">Role</TableHead>
                  <TableHead className="text-black font-medium">Contact</TableHead>
                  <TableHead className="text-black font-medium">Status</TableHead>
                  <TableHead className="text-center text-black font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <React.Fragment key={candidate.id}>
                    <TableRow>
                      <TableCell className="p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleExpandToggle(candidate.id)}
                        >
                          {expandedCandidates.has(candidate.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{candidate.name}</div>
                      </TableCell>
                      <TableCell>{candidate.role}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0 rounded-full"
                                style={{ backgroundColor: '#dbeaff' }}
                                onClick={() => window.open(`tel:${candidate.phone}`, '_self')}
                              >
                                <Phone className="h-3 w-3" color="#4d75c4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{candidate.phone}</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0 rounded-full"
                                style={{ backgroundColor: '#dbeaff' }}
                                onClick={() => window.open(`mailto:${candidate.email}`, '_self')}
                              >
                                <Mail className="h-3 w-3" color="#4d75c4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{candidate.email}</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0 rounded-full"
                                style={{ backgroundColor: '#dbeaff' }}
                              >
                                <MapPin className="h-3 w-3" color="#4d75c4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{candidate.location}</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0 rounded-full"
                                style={{ backgroundColor: '#dbeaff' }}
                                onClick={() => window.open(candidate.linkedinProfile, '_blank')}
                              >
                                <Linkedin className="h-3 w-3" color="#4d75c4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>LinkedIn Profile</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Select
                                  value={candidate.status}
                                  onValueChange={(value) => updateCandidateStatus(candidate.id, value as Candidate["status"])}
                                >
                                  <SelectTrigger className={`h-8 w-44 border-none shadow-none ${getStatusColor(candidate.status)} rounded-full text-xs font-medium`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {(["Offered", "Accepted", "Rejected", "Hired"] as const).map((status) => (
                                      <SelectItem key={status} value={status}>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                          {status}
                                        </span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Change status</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGenerateOfferLetter(candidate)}
                            disabled={candidate.status === "Rejected"}
                          >
                            <FilePenLine className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendMail(candidate)}
                            disabled={candidate.status === "Rejected"}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewOfferLetter(candidate)}
                            disabled={!candidate.offerLetterContent}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedCandidates.has(candidate.id) && (
                      <TableRow className="bg-gray-50">
                        <TableCell></TableCell>
                        <TableCell colSpan={5} className="p-4">
                          <div className="grid grid-cols-2 gap-6 text-sm">
                            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
                              <span className="font-bold text-gray-700">Email:</span>
                              <span className="text-gray-900">{candidate.email}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
                              <span className="font-bold text-gray-700">Phone:</span>
                              <span className="text-gray-900">{candidate.phone}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3 pt-3">
                              <span className="font-bold text-gray-700">Location:</span>
                              <span className="text-gray-900">{candidate.location}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3 pt-3">
                              <span className="font-bold text-gray-700">Applied Date:</span>
                              <span className="text-gray-900">{candidate.appliedDate}</span>
                            </div>
                            
                            {candidate.salary && (
                              <div className="flex items-center space-x-2 pt-3">
                                <span className="font-bold text-gray-700">Salary:</span>
                                <span className="text-gray-900">{candidate.salary}</span>
                              </div>
                            )}
                            
                            {candidate.startDate && (
                              <div className="flex items-center space-x-2 pt-3">
                                <span className="font-bold text-gray-700">Start Date:</span>
                                <span className="text-gray-900">{candidate.startDate}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Offer Letter Generator */}
      <OfferLetterGenerator
        isOpen={isOfferGeneratorOpen}
        onClose={() => setIsOfferGeneratorOpen(false)}
        candidate={selectedCandidate}
        onSave={handleOfferLetterSaved}
      />

      {/* Send Mail Dialog */}
      <Dialog open={isMailDialogOpen} onOpenChange={setIsMailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Offer Letter</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>To</Label>
                  <Input value={selectedCandidate.email} disabled />
                </div>
                <div>
                  <Label>Candidate</Label>
                  <Input value={selectedCandidate.name} disabled />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  defaultValue={`Offer Letter - ${selectedCandidate.role} Position`} 
                />
              </div>
              <div>
                <Label htmlFor="message">Email Message</Label>
                <Textarea 
                  id="message" 
                  rows={8}
                  defaultValue={`Dear ${selectedCandidate.name},

Please find attached your offer letter for the ${selectedCandidate.role} position at our company.

We are excited about the possibility of you joining our team and look forward to your response.

Please review the attached offer letter and let us know your decision by the deadline mentioned in the document.

If you have any questions, please don't hesitate to reach out.

Best regards,
HR Team`}
                />
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FilePenLine className="h-4 w-4" />
                  <span className="font-medium">Attached:</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Offer_Letter_{selectedCandidate.name.replace(" ", "_")}_{selectedCandidate.role.replace(" ", "_")}.pdf
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsMailDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleMailSent}>
                  Send Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}