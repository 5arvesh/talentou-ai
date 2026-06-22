import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Settings,
  LogOut,
  Users,
  Briefcase,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logo } from "@/constants/Constant";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const effectiveCollapsed = collapsed && !isHovered;
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

  const getBaseRoute = () => {
    switch (userRole) {
      case "hiring-lead": return "/hiring-lead";
      case "ta-associate": return "/ta-associate";
      default: return "/sales-plan";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen text-white bg-brand-900 transition-all duration-300 relative",
        effectiveCollapsed ? "w-[45px]" : "w-[180px] res-1200:w-[148px] res-1400:w-[170px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="py-3 px-4 border-b border-white/10 flex items-center justify-center h-[73px] res-1200:h-[50px] res-1200:py-1 res-1200:px-2">
        {!effectiveCollapsed ? (
          <div className="flex justify-center">
            <div className="bg-white py-1.5 px-2.5 rounded res-1200:py-1">
              <img src={logo} alt="Talentou" className="h-9 res-1400:h-8 res-1200:h-7" />
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <div className="bg-white p-1.5 rounded w-8 h-8 flex items-center justify-center">
              <img
                src="/lovable-uploads/6226807a-ede2-4b19-bbd3-f5b7e56ddbd2.png"
                alt="Talentou"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-4">
        <ul
          className={cn(
            "space-y-2 res-1200:space-y-1",
            effectiveCollapsed ? "px-[6px] res-1200:px-[4px]" : "px-3 res-1200:px-2 res-1400:px-2",
            "res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]"
          )}
        >
          <NavItem
            icon={<MessageCircle size={20} />}
            label="Dashboard"
            to={
              userRole === "ta-associate"
                ? "/ta-associate/dashboard"
                : userRole === "hiring-lead"
                ? "/hiring-lead/dashboard"
                : "/sales-plan/dashboard"
            }
            collapsed={effectiveCollapsed}
            active={
              userRole === "ta-associate"
                ? location.pathname === "/ta-associate/dashboard"
                : userRole === "hiring-lead"
                ? location.pathname === "/hiring-lead/dashboard"
                : location.pathname === "/sales-plan/dashboard"
            }
          />

          <NavItem
            icon={<Briefcase size={20} />}
            label="Jobs"
            to={`${getBaseRoute()}/jobs`}
            collapsed={effectiveCollapsed}
            active={location.pathname.includes("/job-list") || location.pathname.includes("/jobs")}
          />

          <NavItem
            icon={<Users size={20} />}
            label="Candidates"
            to={`${getBaseRoute()}/candidates`}
            collapsed={effectiveCollapsed}
            active={location.pathname.includes("/candidates")}
          />
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-white/10 pt-4 pb-6 px-3">
        <ul className="space-y-2 res-1200:text-xs res-1200:space-y-1">
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            to="/settings"
            collapsed={effectiveCollapsed}
            active={location.pathname.startsWith("/settings")}
          />
          <li>
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center px-3 py-2 rounded-md w-full transition-colors hover:bg-white/10",
                effectiveCollapsed ? "justify-center" : ""
              )}
            >
              <span className={effectiveCollapsed ? "" : "mr-2"}><LogOut size={20} /></span>
              {!effectiveCollapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Collapse toggle */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="p-3 h-5 w-5 bg-white rounded-full text-brand-900 hover:bg-primary/10 hover:text-brand-900"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  collapsed: boolean;
  active?: boolean;
}

const NavItem = ({ icon, label, to, collapsed, active }: NavItemProps) => (
  <li>
    <Link
      to={to}
      title={label}
      className={cn(
        "flex items-center px-3 py-2 rounded-md transition-colors",
        active ? "bg-white/15 border-l-2 border-white/70" : "hover:bg-white/10 border-l-2 border-transparent"
      )}
    >
      <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
        <span className={collapsed ? "" : "mr-2"}>{icon}</span>
        {!collapsed && <span>{label}</span>}
      </div>
    </Link>
  </li>
);
