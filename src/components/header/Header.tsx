
import { useState, 
  // useRef, 
  useEffect } from "react";
import { Bell, 
  // Search, 
  ChevronDown
} from "lucide-react";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
// import { SearchResults } from "./SearchResults";
import { useChatPanelStore } from "@/store/chat-panel-store";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isChatOpen } = useChatPanelStore();
  // const [searchQuery, setSearchQuery] = useState("");
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userName, setUserName] = useState("Ananthan Gambhiram");
  const [userInitials, setUserInitials] = useState("AG");
  // const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get the user name from localStorage based on role
    const userRole = localStorage.getItem("userRole");
    if (userRole === "hiring-lead") {
      setUserName("Ananthan");
      setUserInitials("A");
    } else if (userRole === "ta-associate") {
      setUserName("Darshana Smithi");
      setUserInitials("DS");
    } else if (userRole === "hr") {
      setUserName("Himanshi");
      setUserInitials("H");
    } else {
      setUserName("Roney Soloman");
      setUserInitials("RS");
    }
  }, []);

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  // const handleSearchFocus = () => {
  //   setIsSearchOpen(true);
  // };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  //   // If search input has value, ensure search is open
  //   if (e.target.value) {
  //     setIsSearchOpen(true);
  //   }
  // };

  // const handleCloseSearch = () => {
  //   setIsSearchOpen(false);
  // };

  const handleUserSwitch = (newUserName: string) => {
    if (newUserName === "Ananthan Gambhiram") {
      setUserName("Ananthan Gambhiram");
      setUserInitials("AG");
      localStorage.setItem("userRole", "lead");
    } else if (newUserName === "Sarvesh") {
      setUserName("Sarvesh");
      setUserInitials("S");
      localStorage.setItem("userRole", "sarvesh");
    } else if (newUserName === "Darshana Smithi") {
      setUserName("Darshana Smithi");
      setUserInitials("DS");
      localStorage.setItem("userRole", "ta-associate");
    }
  };

  const isChatLayout = location.pathname.includes('/sales-plan') || 
    location.pathname.includes('/ta-associate-plan') || 
    location.pathname.includes('/ta-associate/jd') || 
    location.pathname.includes('/hiring-lead-plan') || 
    location.pathname.includes('/hiring-lead/conversation') ||
    location.pathname.includes('/interviewer/questionnaire');

  return (
    <header className="w-full bg-white border-b border-gray-200 py-1.5 px-6 res-1200:py-1 res:1200:px-3 res-1400:py-1.5 res-1600:py-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/2bb78c6b-8f23-47b5-bb77-dfc1894adc9e.png" 
              alt="Ignitho" 
              className="h-8 res-1200:h-6 res-1400:h-8 res-1600:h-8"
            />
          </div>
        </div>
        
        <div className="flex-1 max-w-xl mx-6 relative">
          {/* <div className="relative">
            <Input
              type="search"
              placeholder="Search"
              className="pl-10 border-gray-300"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              ref={searchInputRef}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </div>
          </div> */}
          
          {/* <SearchResults 
            searchQuery={searchQuery} 
            isOpen={isSearchOpen} 
            onClose={handleCloseSearch} 
          /> */}
        </div>

        <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors res-1200:">
                <Avatar className="h-9 w-9 border border-gray-200 res-1200:h-6 res-1200:w-6 res-1400:h-7 res-1400:w-7" style={{ backgroundColor: "#7800D3" }}>
                  <AvatarImage src="" />
                  <AvatarFallback style={{ backgroundColor: "#7800D3", color: "white" }} className="res-1200:text-[10px] res-1400:text-[12px] res-1600:text-md">{userInitials}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-800 res-1200:text-[12px] res-1400:text-[14px]">{userName}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 res-1200:w-16 res-1400:w-30 res-1600:w-40">
              <DropdownMenuItem onClick={() => handleUserSwitch("Ananthan Gambhiram")}>
                <div className="flex items-center gap-3 res-1200:gap-2 res-1200:text-[10px] res-1400:text-xs res-1600:text-sm">
                  <Avatar className="h-6 w-6 res-1200:h-4 res-1200:w-4" style={{ backgroundColor: "#7800D3" }}>
                    <AvatarFallback style={{ backgroundColor: "#7800D3", color: "white", fontSize: "10px" }}>{userInitials}</AvatarFallback>
                  </Avatar>
                 {userName}
                </div>
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => handleUserSwitch("Sarvesh")}>
                <div className="flex items-center gap-3 res-1200:gap-2 res-1200:text-[10px] res-1400:text-xs res-1600:text-sm">
                  <Avatar className="h-6 w-6 res-1200:h-4 res-1200:w-4" style={{ backgroundColor: "#7800D3" }}>
                    <AvatarFallback style={{ backgroundColor: "#7800D3", color: "white", fontSize: "10px" }}>S</AvatarFallback>
                  </Avatar>
                  Sarvesh
                </div>
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem onClick={() => handleUserSwitch("Darshana Smithi")}>
                <div className="flex items-center gap-3 res-1200:gap-2 res-1200:text-[10px] res-1400:text-xs res-1600:text-sm">
                  <Avatar className="h-6 w-6 res-1200:h-4 res-1200:w-4" style={{ backgroundColor: "#7800D3" }}>
                    <AvatarFallback style={{ backgroundColor: "#7800D3", color: "white", fontSize: "10px" }}>DS</AvatarFallback>
                  </Avatar>
                  Darshana Smithi
                </div>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
