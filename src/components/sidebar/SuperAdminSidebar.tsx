import { Users, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logo } from "@/constants/Constant";

export function SuperAdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const menuItems = [
    { icon: Users, label: "Tenants", path: "/super-admin/tenants" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-screen text-white transition-all duration-300 relative",
        collapsed ? "w-[45px]" : "w-[180px]"
      )}
      style={{ background: "linear-gradient(45deg, #0A92FE, #7E00FC)" }}
    >
      {/* Sidebar collapse toggle button */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="p-3 h-5 w-5 bg-white rounded-full text-purple-600 hover:bg-[#0a92ff] hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>
      </div>

      {/* Logo */}
      <div className={cn("border-b border-white/20 flex items-center justify-center", collapsed ? "p-2" : "p-6")}>
        {collapsed ? (
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-600 text-xs font-bold">T</span>
          </div>
        ) : (
          <img src={logo} alt="Talentou" className="h-10" />
        )}
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 space-y-2", collapsed ? "p-1" : "p-4")}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center rounded-lg transition-all",
                collapsed ? "justify-center p-2" : "gap-3 px-4 py-3",
                isActive ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
              )}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={cn("border-t border-white/20", collapsed ? "p-1" : "p-4")}>
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center rounded-lg hover:bg-white/10 transition-all",
            collapsed ? "justify-center p-2" : "gap-3 px-4 py-3"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
