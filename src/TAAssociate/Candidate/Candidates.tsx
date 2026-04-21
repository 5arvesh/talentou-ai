import React, { useState } from "react";
import { 
  Search,
  Video,
  Mail,
  Phone,
  Linkedin,
  User,
  Calendar,
  ArrowRight,
  MoreVertical,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface Candidate {
  id: number;
  name: string;
  skills: string[];
  roleFitScore: number;
  status: string;
  jobTitle: string;
  interviewer: string;
  hasRecording: boolean;
}

const Candidates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sample candidate data
  const allCandidates: Candidate[] = [
    // Senior Frontend Developer candidates
    { id: 1, name: "Sarah Johnson", skills: ["React", "TypeScript", "CSS"], roleFitScore: 92, status: "Interview Scheduled", jobTitle: "Senior Frontend Developer", interviewer: "John Smith", hasRecording: true },
    { id: 2, name: "Michael Chen", skills: ["Vue.js", "JavaScript", "Webpack"], roleFitScore: 88, status: "Technical Assessment", jobTitle: "Senior Frontend Developer", interviewer: "John Smith", hasRecording: false },
    { id: 3, name: "Emily Rodriguez", skills: ["Angular", "RxJS", "SCSS"], roleFitScore: 85, status: "Phone Screen", jobTitle: "Senior Frontend Developer", interviewer: "John Smith", hasRecording: true },
    { id: 4, name: "David Park", skills: ["React", "Next.js", "Tailwind"], roleFitScore: 90, status: "Offer Extended", jobTitle: "Senior Frontend Developer", interviewer: "John Smith", hasRecording: true },
    { id: 5, name: "Lisa Anderson", skills: ["Svelte", "TypeScript", "CSS"], roleFitScore: 78, status: "Application Review", jobTitle: "Senior Frontend Developer", interviewer: "John Smith", hasRecording: false },
    { id: 6, name: "James Wilson", skills: ["React", "Redux", "Jest"], roleFitScore: 82, status: "Interview Scheduled", jobTitle: "Senior Frontend Developer", interviewer: "John Smith", hasRecording: true },
    { id: 7, name: "Maria Garcia", skills: ["Vue.js", "Vuex", "Sass"], roleFitScore: 75, status: "Rejected", jobTitle: "Senior Frontend Developer", interviewer: "John Smith", hasRecording: false },

    // Backend Engineer candidates
    { id: 8, name: "Robert Taylor", skills: ["Node.js", "Express", "MongoDB"], roleFitScore: 91, status: "Interview Scheduled", jobTitle: "Backend Engineer", interviewer: "Emma Davis", hasRecording: true },
    { id: 9, name: "Jennifer Lee", skills: ["Python", "Django", "PostgreSQL"], roleFitScore: 87, status: "Technical Assessment", jobTitle: "Backend Engineer", interviewer: "Emma Davis", hasRecording: false },
    { id: 10, name: "Christopher Martinez", skills: ["Java", "Spring Boot", "MySQL"], roleFitScore: 84, status: "Phone Screen", jobTitle: "Backend Engineer", interviewer: "Emma Davis", hasRecording: true },
    { id: 11, name: "Amanda Thompson", skills: ["Go", "Gin", "Redis"], roleFitScore: 89, status: "Offer Extended", jobTitle: "Backend Engineer", interviewer: "Emma Davis", hasRecording: true },
    { id: 12, name: "Daniel White", skills: ["Ruby", "Rails", "PostgreSQL"], roleFitScore: 76, status: "Application Review", jobTitle: "Backend Engineer", interviewer: "Emma Davis", hasRecording: false },
    { id: 13, name: "Jessica Brown", skills: ["Node.js", "NestJS", "TypeORM"], roleFitScore: 83, status: "Interview Scheduled", jobTitle: "Backend Engineer", interviewer: "Emma Davis", hasRecording: true },

    // DevOps Engineer candidates
    { id: 14, name: "Matthew Johnson", skills: ["Docker", "Kubernetes", "AWS"], roleFitScore: 93, status: "Interview Scheduled", jobTitle: "DevOps Engineer", interviewer: "Alex Thompson", hasRecording: true },
    { id: 15, name: "Ashley Miller", skills: ["Terraform", "Jenkins", "Azure"], roleFitScore: 86, status: "Technical Assessment", jobTitle: "DevOps Engineer", interviewer: "Alex Thompson", hasRecording: false },
    { id: 16, name: "Andrew Davis", skills: ["Ansible", "GitLab CI", "GCP"], roleFitScore: 81, status: "Phone Screen", jobTitle: "DevOps Engineer", interviewer: "Alex Thompson", hasRecording: true },
    { id: 17, name: "Stephanie Wilson", skills: ["Docker", "CircleCI", "AWS"], roleFitScore: 88, status: "Offer Extended", jobTitle: "DevOps Engineer", interviewer: "Alex Thompson", hasRecording: true },
    { id: 18, name: "Kevin Moore", skills: ["Kubernetes", "Prometheus", "AWS"], roleFitScore: 79, status: "Rejected", jobTitle: "DevOps Engineer", interviewer: "Alex Thompson", hasRecording: false },

    // Product Manager candidates
    { id: 19, name: "Rachel Green", skills: ["Product Strategy", "Agile", "Analytics"], roleFitScore: 90, status: "Interview Scheduled", jobTitle: "Product Manager", interviewer: "Sarah Johnson", hasRecording: true },
    { id: 20, name: "Brandon Clark", skills: ["User Research", "Roadmapping", "SQL"], roleFitScore: 85, status: "Technical Assessment", jobTitle: "Product Manager", interviewer: "Sarah Johnson", hasRecording: false },
    { id: 21, name: "Nicole Martinez", skills: ["Product Design", "Metrics", "Jira"], roleFitScore: 83, status: "Phone Screen", jobTitle: "Product Manager", interviewer: "Sarah Johnson", hasRecording: true },
    { id: 22, name: "Justin Taylor", skills: ["Go-to-Market", "Analytics", "Figma"], roleFitScore: 87, status: "Application Review", jobTitle: "Product Manager", interviewer: "Sarah Johnson", hasRecording: false },

    // UX Designer candidates
    { id: 23, name: "Michelle Anderson", skills: ["Figma", "User Research", "Prototyping"], roleFitScore: 92, status: "Interview Scheduled", jobTitle: "UX Designer", interviewer: "Michael Brown", hasRecording: true },
    { id: 24, name: "Tyler Robinson", skills: ["Sketch", "Wireframing", "UX Writing"], roleFitScore: 86, status: "Technical Assessment", jobTitle: "UX Designer", interviewer: "Michael Brown", hasRecording: false },
    { id: 25, name: "Olivia Harris", skills: ["Adobe XD", "User Testing", "Design Systems"], roleFitScore: 89, status: "Offer Extended", jobTitle: "UX Designer", interviewer: "Michael Brown", hasRecording: true },
    { id: 26, name: "Jacob Lewis", skills: ["Figma", "Information Architecture", "Accessibility"], roleFitScore: 80, status: "Phone Screen", jobTitle: "UX Designer", interviewer: "Michael Brown", hasRecording: true },

    // Data Scientist candidates
    { id: 27, name: "Samantha Walker", skills: ["Python", "Machine Learning", "TensorFlow"], roleFitScore: 94, status: "Interview Scheduled", jobTitle: "Data Scientist", interviewer: "David Wilson", hasRecording: true },
    { id: 28, name: "Eric Hall", skills: ["R", "Statistics", "SQL"], roleFitScore: 87, status: "Technical Assessment", jobTitle: "Data Scientist", interviewer: "David Wilson", hasRecording: false },
    { id: 29, name: "Laura Allen", skills: ["Python", "Deep Learning", "PyTorch"], roleFitScore: 91, status: "Offer Extended", jobTitle: "Data Scientist", interviewer: "David Wilson", hasRecording: true },
    { id: 30, name: "Ryan Young", skills: ["Python", "NLP", "Scikit-learn"], roleFitScore: 82, status: "Application Review", jobTitle: "Data Scientist", interviewer: "David Wilson", hasRecording: false },
    { id: 31, name: "Hannah King", skills: ["Python", "Data Visualization", "Tableau"], roleFitScore: 78, status: "Rejected", jobTitle: "Data Scientist", interviewer: "David Wilson", hasRecording: false },
    { id: 32, name: "Nathan Wright", skills: ["Python", "A/B Testing", "SQL"], roleFitScore: 84, status: "Phone Screen", jobTitle: "Data Scientist", interviewer: "David Wilson", hasRecording: true },
  ];

  const jobTitles = ["all", ...Array.from(new Set(allCandidates.map(c => c.jobTitle)))];
  const statusOptions = ["all", ...Array.from(new Set(allCandidates.map(c => c.status)))];

  // Filter candidates
  const filteredCandidates = allCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesJob = selectedJob === "all" || candidate.jobTitle === selectedJob;
    const matchesStatus = selectedStatus === "all" || candidate.status === selectedStatus;
    
    return matchesSearch && matchesJob && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  // Helper functions
  const getStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      "Application Review": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Phone Screen": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Technical Assessment": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Interview Scheduled": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Offer Extended": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Rejected": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return statusMap[status] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  const getRoleFitColor = (score: number): string => {
    if (score >= 90) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (score >= 80) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
          <p className="text-muted-foreground mt-1">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredCandidates.length)} of {filteredCandidates.length} candidates
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search candidates by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter by Job" />
          </SelectTrigger>
          <SelectContent>
            {jobTitles.map((job) => (
              <SelectItem key={job} value={job}>
                {job === "all" ? "All Jobs" : job}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "all" ? "All Statuses" : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Candidate Name</TableHead>
              <TableHead className="w-[250px]">Skills</TableHead>
              <TableHead className="w-[120px]">Role Fit Score</TableHead>
              <TableHead className="w-[180px]">Status</TableHead>
              <TableHead className="w-[200px]">Job Title</TableHead>
              <TableHead className="w-[150px]">Interviewer</TableHead>
              <TableHead className="w-[100px]">Contact</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCandidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No candidates found
                </TableCell>
              </TableRow>
            ) : (
              currentCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {candidate.name}
                      {candidate.hasRecording && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Video className="h-4 w-4 text-blue-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Video recording available</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {candidate.skills.slice(0, 3).map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleFitColor(candidate.roleFitScore)}`}>
                      {candidate.roleFitScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={candidate.status}>
                      <SelectTrigger className={`w-full ${getStatusColor(candidate.status)} border-0`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.filter(s => s !== "all").map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm">{candidate.jobTitle}</TableCell>
                  <TableCell className="text-sm">{candidate.interviewer}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {candidate.hasRecording && (
                          <DropdownMenuItem>
                            <Video className="mr-2 h-4 w-4" />
                            View Recording
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          View Candidate Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Move to Next Stage
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select 
            value={itemsPerPage.toString()} 
            onValueChange={(value) => {
              setItemsPerPage(parseInt(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
