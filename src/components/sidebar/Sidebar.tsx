import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  MessageCircle,
  Database,
  FileText,
  Bell,
  Moon,
  Sun,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Briefcase,
  FolderOpen,
  Proportions,
  Blinds,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { logo } from "@/constants/Constant";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Get user role from localStorage
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "lead"
  );

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "lead";
    setUserRole(role);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, user session, etc.
    localStorage.clear();
    navigate("/login");
  };

  // Determine the TA Plan route based on user role
  const getTAPlanRoute = () => {
    switch (userRole) {
      case "ta-associate":
        return "/ta-associate-plan";
      case "hiring-lead":
        return "/hiring-lead-plan/home";
      case "interviewer":
        return "/interviewer/home";
      default:
        return "/sales-plan";
    }
  };

  // Determine the base route for jobs, projects, and candidates based on user role
  const getBaseRoute = () => {
    switch (userRole) {
      case "hiring-lead":
        return "/hiring-lead";
      case "ta-associate":
        return "/ta-associate";
      case "interviewer":
        return "/interviewer";
      default:
        return "/sales-plan";
    }
  };

  const isDarkMode = theme === "dark";

  return (
    <div
      className={cn(
        "flex flex-col h-screen text-white transition-all duration-300 relative",
        collapsed
          ? "w-[45px]"
          : "w-[180px] res-1200:w-[148px] res-1400:w-[170px]",
        className
      )}
      style={{ background: "linear-gradient(45deg, #0A92FE, #7E00FC)" }}
    >
      {/* Logo - reduced height to match header */}
      <div className="py-3 px-4 border-b border-white/20 flex items-center justify-center h-[73px] res-1200:h-[50px] res-1200:py-1 res-1200:px-2">
        {!collapsed && (
          <div className="flex justify-center">
            <div className="bg-white py-1.5 px-2.5 rounded res-1200:py-1">
              <img
                src={logo}
                alt="Talentou"
                className="h-9 res-1400:h-8 res-1200:h-7"
              />
            </div>
          </div>
        )}
        {collapsed && (
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
            collapsed
              ? "px-[6px] res-1200:px-[4px]"
              : "px-3 res-1200:px-2 res-1400:px-2",
            "res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]"
          )}
        >
          {/* Only show Home for non-hiring-lead users */}
          {/* {userRole !== "hiring-lead" && (
            <NavItem
            icon={<Home size={20} />}
            label="Home"
            to="/dashboard"
            collapsed={collapsed}
            active={location.pathname === "/dashboard"}
          />
          )} */}

          <NavItem
            icon={<LayoutDashboard size={20} />}
            label={userRole === "interviewer" ? "Home" : userRole === "hiring-lead" ? "Home" : "TA Plan"}
            to={getTAPlanRoute()}
            collapsed={collapsed}
            active={
              location.pathname.includes("/sales-plan") ||
              location.pathname.includes("/ta-associate-plan") ||
              location.pathname.includes("/hiring-lead-plan") ||
              location.pathname.includes("/interviewer/home") ||
              location.pathname.includes("/message") ||
              location.pathname.includes("/market") ||
              location.pathname.includes("/media") ||
              location.pathname.includes("/measure")
            }
          />

          {userRole === "ta-associate" && (
          <>
            <NavItem
              icon={<FileText size={20} />}
              label="Collaterals"
              to="/ta-associate-plan/collaterals"
              collapsed={collapsed}
              active={location.pathname.includes("/collaterals")}
            />
            
          </>
          )}

            <NavItem
              icon={<Briefcase size={20} />}
              label="Jobs"
              to={`${getBaseRoute()}/jobs`}
              collapsed={collapsed}
              active={location.pathname.includes("/job-list") || (userRole === "interviewer" && location.pathname.includes("/jobs"))}
            />
            <NavItem
              icon={<Users size={20} />}
              label="Candidates"
              to={`${getBaseRoute()}/candidates`}
              collapsed={collapsed}
              active={location.pathname.includes("/candidates")}
            />
          

          {userRole !== "interviewer" && (
            <NavItem
              icon={<MessageCircle size={20} />}
              label="Dashboard"
              to={userRole === "ta-associate" ? "/ta-associate/dashboard" : "/sales-plan/dashboard"}
              collapsed={collapsed}
              active={userRole === "ta-associate" ? location.pathname === "/ta-associate/dashboard" : location.pathname === "/sales-plan/dashboard"}
            />
          )}
          {/* {userRole === "ta-associate" && (
            <>
              <NavItem
                icon={<Proportions size={20} />}
                label="Company List"
                to="/company-list"
                collapsed={collapsed}
                active={location.pathname === "/company-list"}
              />
              <NavItem
                icon={<Blinds size={20} />}
                label="Job List"
                to="/job-list"
                collapsed={collapsed}
                active={location.pathname === "/job-list"}
              />
              <NavItem
                icon={<Users size={20} />}
                label="Candidates"
                to="/candidates"
                collapsed={collapsed}
                active={location.pathname === "/candidates"}
              />
            </>
          )} */}
        </ul>
      </nav>

      {/* Footer Options */}
      <div className="mt-auto border-t border-white/20 pt-4 pb-6 px-3">
        <ul className="space-y-2 res-1200:text-xs res-1200:space-y-1 res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]">
          <li>
            {/* <button
              onClick={toggleTheme}
              className="flex items-center px-3 py-2 rounded-md hover:bg-white/20 transition-colors w-full"
            >
              <div
                className={cn(
                  "flex items-center",
                  collapsed
                    ? "justify-center w-full px-[6px] res-1200:px-[4px]"
                    : ""
                )}
              >
                <span className="mr-2">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </span>
                {!collapsed && (
                  <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                )}
              </div>
            </button> */}
          </li>
          {/* <NavItem
            icon={<HelpCircle size={20} />}
            label="Help"
            to="/help"
            collapsed={collapsed}
            active={location.pathname === "/help"}
          /> */}
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            to="/settings"
            collapsed={collapsed}
            active={location.pathname === "/settings"}
          />
          <li>
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center px-3 py-2 rounded-md w-full transition-colors",
                location.pathname === "/logout"
                  ? "bg-white/20"
                  : "hover:bg-white/20"
              )}
            >
              <div
                className={cn(
                  "flex items-center",
                  collapsed
                    ? "justify-center w-full px-[6px] res-1200:px-[4px]"
                    : ""
                )}
              >
                <span className="mr-2">
                  <LogOut size={20} />
                </span>
                {!collapsed && <span>Logout</span>}
              </div>
            </button>
          </li>
        </ul>
      </div>

      {/* Sidebar collapse toggle button - positioned on the right edge */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
        <div className="rounded-full flex items-center justify-center  hover:text-white  hover:bg-[#0a92ff] transition-transform transform hover:scale-125 ease-in">
          <Button
            variant="ghost"
            size="icon"
            className="p-3 h-5 w-5  bg-white rounded-full  text-purple-600 hover:bg-[#0a92ff] hover:text-white "
            onClick={toggleSidebar}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </Button>
        </div>
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
      className={cn(
        "flex items-center px-3 py-2 rounded-md transition-colors",
        active ? "bg-white/20" : "hover:bg-white/20"
      )}
    >
      <div
        className={cn(
          "flex items-center",
          collapsed ? "justify-center w-full" : ""
        )}
      >
        <span className="mr-2">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </div>
    </Link>
  </li>
);
