import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    id: "ta-leader",
    label: "Recruitment Lead",
    description: "Manage recruiting team, pipelines, and analytics",
    path: "/sales-plan",
  },
  {
    id: "ta-associate",
    label: "Recruiter",
    description: "Source candidates, create JDs, run outreach",
    path: "/ta-associate-plan",
  },
  {
    id: "interviewer",
    label: "Interviewer",
    description: "Conduct interviews and evaluate candidates",
    path: "/interviewer",
  },
  {
    id: "hiring-lead",
    label: "Hiring Lead",
    description: "Open positions, review candidates, approve JDs",
    path: "/hiring-lead-plan/dashboard",
  },
  {
    id: "hr",
    label: "HR",
    description: "Manage offer letters, templates, and onboarding",
    path: "/hr/home",
  },
  {
    id: "super-admin",
    label: "Super Admin",
    description: "Tenant management and platform configuration",
    path: "/super-admin/tenants",
  },
];

export function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    const role = ROLES.find((r) => r.id === selectedRole);
    if (!role) return;
    localStorage.setItem("userRole", role.id);
    navigate(role.path);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-8 py-10">
        <AuthHeader />

        <div className="max-w-sm mx-auto w-full mt-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Awesome! You're logged in.</h1>
          <p className="text-sm text-gray-500 mb-7">Select your role to continue to your workspace.</p>

          <div className="flex flex-col gap-2.5 mb-7">
            {ROLES.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "w-full text-left px-4 py-3.5 rounded-btn border transition-all duration-150",
                    isSelected
                      ? "border-primary bg-purple-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60"
                  )}
                >
                  <p className={cn("text-sm font-semibold leading-none mb-1", isSelected ? "text-purple-700" : "text-gray-800")}>
                    {role.label}
                  </p>
                  <p className="text-xs text-gray-500 leading-snug">{role.description}</p>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="w-full h-11 rounded-btn text-sm font-semibold transition-all duration-150 bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            Continue to workspace
          </button>
        </div>
      </div>

      <AuthRightLayout />
    </div>
  );
}

export default RoleSelection;
