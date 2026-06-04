import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Users,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "lead"
  );

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "lead";
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getTAPlanRoute = () => {
    switch (userRole) {
      case "ta-associate": return "/ta-associate-plan";
      case "hiring-lead": return "/hiring-lead-plan/home";
      default: return "/sales-plan";
    }
  };

  const getBaseRoute = () => {
    switch (userRole) {
      case "hiring-lead": return "/hiring-lead";
      case "ta-associate": return "/ta-associate";
      default: return "/sales-plan";
    }
  };

  return (
    <div
      className={cn("flex flex-col h-screen text-white w-16 shrink-0 bg-[#1e1b4b]", className)}
    >
      {/* Brand mark */}
      <div className="h-16 flex items-center justify-center border-b border-white/20 shrink-0">
        <div className="bg-white p-1.5 rounded w-8 h-8 flex items-center justify-center">
          <img
            src="/lovable-uploads/6226807a-ede2-4b19-bbd3-f5b7e56ddbd2.png"
            alt="Talentou"
            className="w-6 h-6 object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          <NavItem
            icon={<LayoutDashboard size={22} />}
            label={userRole === "hiring-lead" ? "Home" : "TA Plan"}
            to={getTAPlanRoute()}
            active={
              location.pathname.includes("/sales-plan") ||
              location.pathname.includes("/ta-associate-plan") ||
              location.pathname.includes("/hiring-lead-plan") ||
              location.pathname.includes("/message") ||
              location.pathname.includes("/market") ||
              location.pathname.includes("/media") ||
              location.pathname.includes("/measure")
            }
          />

          {userRole === "ta-associate" && (
            <NavItem
              icon={<FileText size={22} />}
              label="Collaterals"
              to="/ta-associate-plan/collaterals"
              active={location.pathname.includes("/collaterals")}
            />
          )}

          <NavItem
            icon={<Briefcase size={22} />}
            label="Jobs"
            to={`${getBaseRoute()}/jobs`}
            active={location.pathname.includes("/job-list") || location.pathname.includes("/jobs")}
          />

          <NavItem
            icon={<Users size={22} />}
            label="Candidates"
            to={`${getBaseRoute()}/candidates`}
            active={location.pathname.includes("/candidates")}
          />

          <NavItem
            icon={<MessageCircle size={22} />}
            label="Dashboard"
            to={
              userRole === "ta-associate"
                ? "/ta-associate/dashboard"
                : userRole === "hiring-lead"
                ? "/hiring-lead/dashboard"
                : "/sales-plan/dashboard"
            }
            active={
              userRole === "ta-associate"
                ? location.pathname === "/ta-associate/dashboard"
                : userRole === "hiring-lead"
                ? location.pathname === "/hiring-lead/dashboard"
                : location.pathname === "/sales-plan/dashboard"
            }
          />
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/20 py-4 px-3">
        <ul className="space-y-1">
          <NavItem
            icon={<Settings size={22} />}
            label="Settings"
            to="/settings"
            active={location.pathname.startsWith("/settings")}
          />
          <li>
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl transition-colors hover:bg-white/10"
            >
              <LogOut size={22} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon, label, to, active }: NavItemProps) => (
  <li>
    <Link
      to={to}
      title={label}
      className={cn(
        "flex items-center justify-center w-10 h-10 mx-auto rounded-xl transition-colors",
        active ? "bg-white/20" : "hover:bg-white/10"
      )}
    >
      {icon}
    </Link>
  </li>
);
