import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Eye, Pen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HiringLeadDashboard() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const hiringPlans = [
    {
      id: 1,
      jobRole: "Software Engineer",
      project: "Product Alpha",
      requiredSkills: "React, TypeScript, Node.js",
      status: "Draft",
      statusTooltip:
        "The job order is being created but hasn't been submitted or approved yet.",
      taAssociate: "Sarah Johnson",
      interviewer: "Mike Chen",
      progress: 15,
    },
    {
      id: 2,
      jobRole: "Product Manager",
      project: "Platform Beta",
      requiredSkills: "Strategy, Analytics, Agile",
      status: "Pending Approval",
      statusTooltip:
        "Awaiting review or sign-off from a TA Leader or Hiring Manager.",
      taAssociate: "David Wilson",
      interviewer: "Lisa Zhang",
      progress: 25,
    },
    {
      id: 3,
      jobRole: "Senior Developer",
      project: "Core Services",
      requiredSkills: "Python, AWS, Docker",
      status: "Active",
      statusTooltip:
        "Actively hiring; recruiters can source and submit candidates.",
      taAssociate: "Emma Rodriguez",
      interviewer: "John Smith",
      progress: 75,
    },
    {
      id: 4,
      jobRole: "UX Designer",
      project: "Design System",
      requiredSkills: "Figma, User Research, Prototyping",
      status: "On Hold",
      statusTooltip:
        "Hiring temporarily paused; no new candidates are being sourced or progressed.",
      taAssociate: "Alex Thompson",
      interviewer: "Maria Garcia",
      progress: 60,
    },
    {
      id: 5,
      jobRole: "Data Analyst",
      project: "Analytics Hub",
      requiredSkills: "SQL, Python, Tableau",
      status: "Closed",
      statusTooltip:
        "The role is filled or the requirement is no longer active.",
      taAssociate: "Kevin Lee",
      interviewer: "Jennifer Brown",
      progress: 100,
    },
    {
      id: 6,
      jobRole: "DevOps Engineer",
      project: "Infrastructure",
      requiredSkills: "Kubernetes, CI/CD, Terraform",
      status: "Cancelled",
      statusTooltip: "The job order has been terminated before closure.",
      taAssociate: "Rachel Kim",
      interviewer: "Robert Taylor",
      progress: 40,
    },
    {
      id: 7,
      jobRole: "Frontend Developer",
      project: "Web Portal",
      requiredSkills: "Vue.js, CSS, JavaScript",
      status: "Rejected",
      statusTooltip: "The job order was not approved for activation.",
      taAssociate: "Tom Anderson",
      interviewer: "Kelly Murphy",
      progress: 30,
    },
  ];

  const isAllSelected = selectedIds.length === hiringPlans.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(hiringPlans.map((plan) => plan.id));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCreateNewPosition = () => {
    navigate("/hiring-lead/conversation");
  };

  const handleViewAll = () => {
    navigate("/hiring-lead/jobs");
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

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        {/* Hero Section with Two Boxes - Added 20px gap above */}
        <div className="flex gap-6 mb-8" style={{ marginTop: "20px" }}>
          {/* Left Box - Welcome Message */}
          <div
            className="w-1/2 rounded-lg p-8 text-white relative overflow-hidden flex flex-col items-center justify-center text-center"
            style={{ background: "linear-gradient(135deg, #0A92FE, #7E00FC)" }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-2">
                Welcome, Ananthan Gambhiram!
              </h1>
              <p className="text-lg mb-6 opacity-90">
                Open a new position, set the role details, and start hiring with
                clarity.
              </p>
              <Button
                className="bg-white text-purple-600 hover:bg-gray-100 font-medium px-6 py-2 flex items-center gap-2"
                onClick={handleCreateNewPosition}
              >
                <Plus size={20} />
                Create New Position
              </Button>
            </div>
          </div>

          {/* Right Box - AI Assistant Message */}
          <div className="w-1/2 bg-white rounded-lg p-8 shadow-lg border flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <img
                src="/lovable-uploads/55397514-dfbc-457f-bb12-e169562a72c5.png"
                alt="AI Assistant"
                className="h-[160px] w-auto object-contain mx-auto"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800 text-xl">
                From Chaos to Clarity – Let's Hire Smarter Together
              </h3>
              <p className="text-gray-600 mb-4">
                Shape role requirements into a shared strategy that enables
                faster, smarter hiring decisions.
              </p>
              <p className="text-sm font-medium text-gray-700">
                <strong>Align. Accelerate. Hire.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Recent Job Openings Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Job Openings
          </h2>
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-700"
            onClick={handleViewAll}
          >
            View All
          </Button>
        </div>
        <div className="flex mx-4">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
            placeholder="Slect All"
          />
          <p className="mx-2 text-sm text-gray">Select All</p>
        </div>

        {/* Job Openings Table */}
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="h-10">
                <TableHead className="text-black">Job ID</TableHead>
                <TableHead className="text-black">Job Role</TableHead>
                <TableHead className="text-black">Project</TableHead>
                <TableHead className="text-black">Required Skills</TableHead>
                <TableHead className="text-black">Status</TableHead>
                <TableHead className="text-black">Recruiter</TableHead>
                <TableHead className="text-black">Interviewer</TableHead>
                <TableHead className="text-center text-black">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hiringPlans.map((plan) => (
                <TableRow key={plan.id} className="h-12">
                  <TableCell className="font-medium py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(plan.id)}
                      onChange={() => handleSelectRow(plan.id)}
                      className="me-2"
                    />
                    #{String(plan.id).padStart(4, "0")}
                  </TableCell>
                  <TableCell className="font-medium py-2">
                    {plan.jobRole}
                  </TableCell>
                  <TableCell className="text-gray-600 py-2">
                    {plan.project}
                  </TableCell>
                  <TableCell className="text-gray-600 py-2">
                    {plan.requiredSkills}
                  </TableCell>
                  <TableCell className="py-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-help ${getStatusColor(
                            plan.status
                          )}`}
                        >
                          {plan.status}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{plan.statusTooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="py-2">{plan.taAssociate}</TableCell>
                  <TableCell className="py-2">{plan.interviewer}</TableCell>
                  <TableCell className="py-2">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2 py-1 h-8"
                      >
                        <Eye size={12} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2 py-1 h-8"
                      >
                        <Pen size={12} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
