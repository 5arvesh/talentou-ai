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
import { Plus, Eye, Pen, CheckCircle2, Clock } from "lucide-react";
import { getJobStatusColor } from "@/constants/statuses";
import { KPIStrip } from "@/components/shared/KPIStrip";
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
      status: "In Review",
      statusTooltip:
        "Awaiting review or sign-off from a Recruitment Lead or Hiring Manager.",
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

  const getStatusColor = getJobStatusColor;

  const openStatuses = ["Draft", "In Review", "Active", "On Hold"];
  const openPositions = hiringPlans.filter((p) => openStatuses.includes(p.status));
  const activeRoles = hiringPlans.filter((p) => p.status === "Active").length;
  const pendingApproval = hiringPlans.filter((p) => p.status === "In Review").length;
  const avgProgress = Math.round(
    openPositions.reduce((sum, p) => sum + p.progress, 0) / openPositions.length
  );

  const kpiStats = [
    { label: "Open Positions", value: openPositions.length, sub: "Across all projects", subColor: "text-muted-foreground" },
    { label: "Active Roles", value: activeRoles, sub: "Currently sourcing", subColor: "text-success", icon: CheckCircle2 },
    { label: "In Review", value: pendingApproval, sub: "Awaiting sign-off", subColor: "text-warning", icon: Clock },
    { label: "Avg Progress", value: `${avgProgress}%`, sub: "Open positions", subColor: "text-muted-foreground" },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        {/* Welcome strip */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Ananthan</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Open a new position, set the role details, and start hiring with clarity.
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-white gap-2"
            onClick={handleCreateNewPosition}
          >
            <Plus size={18} />
            Create New Position
          </Button>
        </div>

        {/* KPI Strip */}
        <KPIStrip stats={kpiStats} />

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
          />
          <p className="mx-2 text-sm text-gray-600">Select All</p>
        </div>

        {/* Job Openings Table */}
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="h-10">
                <TableHead className="text-foreground">Job ID</TableHead>
                <TableHead className="text-foreground">Job Role</TableHead>
                <TableHead className="text-foreground">Project</TableHead>
                <TableHead className="text-foreground">Required Skills</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Recruiter</TableHead>
                <TableHead className="text-foreground">Interviewer</TableHead>
                <TableHead className="text-center text-foreground">Actions</TableHead>
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
                  <TableCell className="font-medium py-2">{plan.jobRole}</TableCell>
                  <TableCell className="text-gray-600 py-2">{plan.project}</TableCell>
                  <TableCell className="text-gray-600 py-2">{plan.requiredSkills}</TableCell>
                  <TableCell className="py-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-help ${getStatusColor(plan.status)}`}
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
                      <Button variant="outline" size="sm" className="px-2 py-1 h-8">
                        <Eye size={12} />
                      </Button>
                      <Button variant="outline" size="sm" className="px-2 py-1 h-8">
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
