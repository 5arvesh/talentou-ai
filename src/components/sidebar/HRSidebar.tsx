import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logo } from "@/constants/Constant";

interface HRSidebarProps {
  className?: string;
}

export function HRSidebar({ className }: HRSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen text-white transition-all duration-300 relative",
        collapsed
          ? "w-[45px]"
          : "w-[180px] res-1200:w-[148px] res-1400:w-[170px]",
        className
      )}
      style={{ background: "linear-gradient(45deg, #7E00FC, #0A92FE)" }}
    >
      {/* Logo */}
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
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            to="/hr/home"
            collapsed={collapsed}
            active={location.pathname === "/hr/home"}
          />
          <NavItem
            icon={<FileText size={20} />}
            label="Templates"
            to="/hr/templates"
            collapsed={collapsed}
            active={location.pathname === "/hr/templates"}
          />
          <NavItem
            icon={<Users size={20} />}
            label="Candidates"
            to="/hr/candidates"
            collapsed={collapsed}
            active={location.pathname === "/hr/candidates"}
          />
        </ul>
      </nav>

      {/* Footer Options */}
      <div className="mt-auto border-t border-white/20 pt-4 pb-6 px-3">
        <ul className="space-y-2 res-1200:text-xs res-1200:space-y-1 res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]">
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
                "hover:bg-white/20"
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

      {/* Sidebar collapse toggle button */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
        <div className="rounded-full flex items-center justify-center hover:text-white hover:bg-[#0a92ff] transition-transform transform hover:scale-125 ease-in">
          <Button
            variant="ghost"
            size="icon"
            className="p-3 h-5 w-5 bg-white rounded-full text-purple-600 hover:bg-[#0a92ff] hover:text-white"
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