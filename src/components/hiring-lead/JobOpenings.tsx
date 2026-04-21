
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pin, Eye, Pen, ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function JobOpenings() {
  const [pinnedItems, setPinnedItems] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allJobs = [
    {
      id: 1,
      jobRole: "Software Engineer",
      project: "Product Alpha",
      requiredSkills: "React, TypeScript, Node.js",
      status: "Draft",
      statusTooltip: "The job order is being created but hasn't been submitted or approved yet.",
      taAssociate: "Sarah Johnson",
      interviewer: "Mike Chen"
    },
    {
      id: 2,
      jobRole: "Product Manager",
      project: "Platform Beta",
      requiredSkills: "Strategy, Analytics, Agile",
      status: "Pending Approval",
      statusTooltip: "Awaiting review or sign-off from a TA Leader or Hiring Manager.",
      taAssociate: "David Wilson",
      interviewer: "Lisa Zhang"
    },
    {
      id: 3,
      jobRole: "Senior Developer",
      project: "Core Services",
      requiredSkills: "Python, AWS, Docker",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      taAssociate: "Emma Rodriguez",
      interviewer: "John Smith"
    },
    {
      id: 4,
      jobRole: "UX Designer",
      project: "Design System",
      requiredSkills: "Figma, User Research, Prototyping",
      status: "On Hold",
      statusTooltip: "Hiring temporarily paused; no new candidates are being sourced or progressed.",
      taAssociate: "Alex Thompson",
      interviewer: "Maria Garcia"
    },
    {
      id: 5,
      jobRole: "Data Analyst",
      project: "Analytics Hub",
      requiredSkills: "SQL, Python, Tableau",
      status: "Closed",
      statusTooltip: "The role is filled or the requirement is no longer active.",
      taAssociate: "Kevin Lee",
      interviewer: "Jennifer Brown"
    },
    {
      id: 6,
      jobRole: "DevOps Engineer",
      project: "Infrastructure",
      requiredSkills: "Kubernetes, CI/CD, Terraform",
      status: "Cancelled",
      statusTooltip: "The job order has been terminated before closure.",
      taAssociate: "Rachel Kim",
      interviewer: "Robert Taylor"
    },
    {
      id: 7,
      jobRole: "Frontend Developer",
      project: "Web Portal",
      requiredSkills: "Vue.js, CSS, JavaScript",
      status: "Rejected",
      statusTooltip: "The job order was not approved for activation.",
      taAssociate: "Tom Anderson",
      interviewer: "Kelly Murphy"
    },
    {
      id: 8,
      jobRole: "QA Engineer",
      project: "Testing Framework",
      requiredSkills: "Selenium, Testing, Automation",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      taAssociate: "Nina Patel",
      interviewer: "Chris Wilson"
    },
    {
      id: 9,
      jobRole: "Marketing Manager",
      project: "Brand Campaign",
      requiredSkills: "Digital Marketing, SEO, Analytics",
      status: "Draft",
      statusTooltip: "The job order is being created but hasn't been submitted or approved yet.",
      taAssociate: "James Rodriguez",
      interviewer: "Amanda Davis"
    },
    {
      id: 10,
      jobRole: "Sales Representative",
      project: "Sales Operations",
      requiredSkills: "CRM, Communication, Lead Generation",
      status: "Pending Approval",
      statusTooltip: "Awaiting review or sign-off from a TA Leader or Hiring Manager.",
      taAssociate: "Sophie Chen",
      interviewer: "Michael Johnson"
    },
    {
      id: 11,
      jobRole: "Backend Developer",
      project: "API Gateway",
      requiredSkills: "Java, Spring Boot, Microservices",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      taAssociate: "Carlos Martinez",
      interviewer: "Jennifer Lee"
    },
    {
      id: 12,
      jobRole: "Data Scientist",
      project: "ML Platform",
      requiredSkills: "Python, TensorFlow, Statistics",
      status: "On Hold",
      statusTooltip: "Hiring temporarily paused; no new candidates are being sourced or progressed.",
      taAssociate: "Priya Sharma",
      interviewer: "David Kim"
    },
    {
      id: 13,
      jobRole: "Mobile Developer",
      project: "Mobile App",
      requiredSkills: "React Native, iOS, Android",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      taAssociate: "Lisa Park",
      interviewer: "Ryan Mitchell"
    },
    {
      id: 14,
      jobRole: "Security Engineer",
      project: "Security Platform",
      requiredSkills: "Cybersecurity, Penetration Testing",
      status: "Draft",
      statusTooltip: "The job order is being created but hasn't been submitted or approved yet.",
      taAssociate: "Mark Davis",
      interviewer: "Sarah Connor"
    },
    {
      id: 15,
      jobRole: "Technical Writer",
      project: "Documentation",
      requiredSkills: "Technical Writing, API Documentation",
      status: "Pending Approval",
      statusTooltip: "Awaiting review or sign-off from a TA Leader or Hiring Manager.",
      taAssociate: "Amy Foster",
      interviewer: "Tom Brady"
    },
    {
      id: 16,
      jobRole: "Business Analyst",
      project: "Process Optimization",
      requiredSkills: "Business Analysis, Process Mapping",
      status: "Active",
      statusTooltip: "Actively hiring; recruiters can source and submit candidates.",
      taAssociate: "Jessica White",
      interviewer: "Paul Green"
    },
    {
      id: 17,
      jobRole: "Cloud Architect",
      project: "Cloud Migration",
      requiredSkills: "AWS, Azure, Cloud Architecture",
      status: "On Hold",
      statusTooltip: "Hiring temporarily paused; no new candidates are being sourced or progressed.",
      taAssociate: "Robert Black",
      interviewer: "Linda Blue"
    },
    {
      id: 18,
      jobRole: "Scrum Master",
      project: "Agile Transformation",
      requiredSkills: "Scrum, Agile, Project Management",
      status: "Closed",
      statusTooltip: "The role is filled or the requirement is no longer active.",
      taAssociate: "Maria Lopez",
      interviewer: "Steve Jobs"
    },
    {
      id: 19,
      jobRole: "Database Administrator",
      project: "Data Management",
      requiredSkills: "PostgreSQL, MySQL, Database Optimization",
      status: "Cancelled",
      statusTooltip: "The job order has been terminated before closure.",
      taAssociate: "John Doe",
      interviewer: "Jane Smith"
    },
    {
      id: 20,
      jobRole: "AI Engineer",
      project: "AI Platform",
      requiredSkills: "Machine Learning, AI, PyTorch",
      status: "Rejected",
      statusTooltip: "The job order was not approved for activation.",
      taAssociate: "Alice Brown",
      interviewer: "Bob Wilson"
    }
  ];

  const handlePinClick = (id: number) => {
    setPinnedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-700";
      case "On Hold":
        return "bg-orange-100 text-orange-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      case "Closed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(allJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = allJobs.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Job Openings</h1>
        </div>

        {/* Job Openings Table */}
        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Required Skills</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recruiter</TableHead>
                <TableHead>Interviewer</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-8 w-8"
                      onClick={() => handlePinClick(job.id)}
                    >
                      <Pin 
                        size={14} 
                        className={`transition-colors ${
                          pinnedItems.has(job.id) 
                            ? 'text-blue-600 fill-blue-600' 
                            : 'text-gray-400 hover:text-blue-500'
                        }`} 
                      />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{job.jobRole}</TableCell>
                  <TableCell className="text-gray-600">{job.project}</TableCell>
                  <TableCell className="text-gray-600">{job.requiredSkills}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-help ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{job.statusTooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{job.taAssociate}</TableCell>
                  <TableCell>{job.interviewer}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="px-3">
                        <Eye size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <Pen size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, allJobs.length)} of {allJobs.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} />
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
