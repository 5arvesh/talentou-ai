
import { Bell, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useTourStore } from "@/store/tour-store";

function getPageTitle(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  return segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tourKey, restartTour } = useTourStore();

  const rawName = localStorage.getItem("userName") ?? "User";
  const userInitials = rawName
    .split(" ")
    .filter(Boolean)
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const pageTitle = getPageTitle(location.pathname);

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-1.5 px-6 res-1200:py-1 res:1200:px-3 res-1400:py-1.5 res-1600:py-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-[7px] flex items-center justify-center shrink-0 res-1200:w-7 res-1200:h-7">
              <span className="font-sora text-sm font-bold text-white">T</span>
            </div>
            <span className="font-sora text-lg font-semibold text-foreground res-1200:text-base">Talentou</span>
          </div>
        </div>

        <div className="flex-1 mx-6">
          {pageTitle && (
            <span className="text-sm font-medium text-muted-foreground">{pageTitle}</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {tourKey && (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
              onClick={restartTour}
              title="Restart tour"
            >
              <HelpCircle size={20} />
            </Button>
          )}

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 cursor-pointer"
              onClick={handleNotificationClick}
            >
              <Bell size={20} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 res-1200:h-4 res-1200:w-4 res-1200:top-0 res-1200:right-0 res-1400:w-4 res-1400:h-4">
                3
              </Badge>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <Avatar className="h-9 w-9 border border-gray-200 res-1200:h-6 res-1200:w-6 res-1400:h-7 res-1400:w-7" style={{ backgroundColor: "hsl(var(--primary))" }}>
                  <AvatarImage src="" />
                  <AvatarFallback style={{ backgroundColor: "hsl(var(--primary))", color: "white" }} className="res-1200:text-[10px] res-1400:text-[12px] res-1600:text-md">{userInitials}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-800 res-1200:text-[12px] res-1400:text-[14px]">{rawName}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 res-1200:w-16 res-1400:w-30 res-1600:w-40">
              <DropdownMenuItem>
                <div className="flex items-center gap-3 res-1200:gap-2 res-1200:text-[10px] res-1400:text-xs res-1600:text-sm">
                  <Avatar className="h-6 w-6 res-1200:h-4 res-1200:w-4" style={{ backgroundColor: "hsl(var(--primary))" }}>
                    <AvatarFallback style={{ backgroundColor: "hsl(var(--primary))", color: "white", fontSize: "10px" }}>{userInitials}</AvatarFallback>
                  </Avatar>
                  {rawName}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
