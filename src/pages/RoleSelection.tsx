
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";

export function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };
  
  const handleContinue = () => {
    if (selectedRole) {
      // Store the selected role and associated name in localStorage
      let userName = "";
      if (selectedRole === "ta-associate") {
        userName = "Darshana";
      } else if (selectedRole === "ta-leader") {
        userName = "Roney Soloman";
      } else if (selectedRole === "hiring-lead") {
        userName = "Sarah Johnson";
      } else if (selectedRole === "interviewer") {
        userName = "Alex Martinez";
      } else if (selectedRole === "hr") {
        userName = "Himanshi";
      } else if (selectedRole === "super-admin") {
        userName = "Admin User";
      }
      
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("userName", userName);
      
      // Navigate to the appropriate dashboard based on role
      if (selectedRole === "ta-associate") {
        navigate("/ta-associate-plan");
      } else if (selectedRole === "ta-leader") {
        navigate("/sales-plan");
      } else if (selectedRole === "hiring-lead") {
        navigate("/hiring-lead-plan/dashboard");
      } else if (selectedRole === "interviewer") {
        navigate("/interviewer/home");
      } else if (selectedRole === "hr") {
        navigate("/hr/home");
      } else if (selectedRole === "super-admin") {
        navigate("/super-admin/tenants");
      }
    }
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Left side - Role selection form */}
        {/* Left side - Registration form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8">
        <AuthHeader />
  

        {/* Role Selection Form */}
        <div className="max-w-md mx-auto w-full mt-6 res-1200:max-w-xs res-1400:max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center res-1200:text-[18px] res-1200:mb-4 res-1400:text-[22px] res-1400:mb-6">Awesome! You're logged in.</h1>
          <p className="text-center text-gray-600 mb-8 res-1200:mb-4 res-1200:text-xs res-1400:mb-6 ">Please confirm your login as</p>
          
          <div className="grid grid-cols-1 gap-4 mb-8 res-1200:mb-4 res-1400:mb-6">
            <Button 
              onClick={() => handleRoleSelect("ta-leader")}
              style={selectedRole === "ta-leader" ? { backgroundColor: "#4ead3b", color: "black" } : {}}
              className={`h-12 border res-1200:h-8 res-1200:text-xs ${selectedRole === "ta-leader" ? "" : "bg-white text-gray-700 border-gray-300"}`}
              variant={selectedRole === "ta-leader" ? undefined : "outline"}
            >
              TA Leader
            </Button>
            
            <Button 
              onClick={() => handleRoleSelect("ta-associate")}
              style={selectedRole === "ta-associate" ? { backgroundColor: "#4ead3b", color: "black" } : {}}
              className={`h-12 border res-1200:h-8 res-1200:text-xs ${selectedRole === "ta-associate" ? "" : "bg-white text-gray-700 border-gray-300"}`}
              variant={selectedRole === "ta-associate" ? undefined : "outline"}
            >
              Recruiter
            </Button>

            <Button 
              onClick={() => handleRoleSelect("hiring-lead")}
              style={selectedRole === "hiring-lead" ? { backgroundColor: "#4ead3b", color: "black" } : {}}
              className={`h-12 border res-1200:h-8 res-1200:text-xs ${selectedRole === "hiring-lead" ? "" : "bg-white text-gray-700 border-gray-300"}`}
              variant={selectedRole === "hiring-lead" ? undefined : "outline"}
            >
              Hiring Lead
            </Button>

            <Button 
              onClick={() => handleRoleSelect("interviewer")}
              style={selectedRole === "interviewer" ? { backgroundColor: "#4ead3b", color: "black" } : {}}
              className={`h-12 border res-1200:h-8 res-1200:text-xs ${selectedRole === "interviewer" ? "" : "bg-white text-gray-700 border-gray-300"}`}
              variant={selectedRole === "interviewer" ? undefined : "outline"}
            >
              Interviewer
            </Button>

            <Button 
              onClick={() => handleRoleSelect("hr")}
              style={selectedRole === "hr" ? { backgroundColor: "#4ead3b", color: "black" } : {}}
              className={`h-12 border res-1200:h-8 res-1200:text-xs ${selectedRole === "hr" ? "" : "bg-white text-gray-700 border-gray-300"}`}
              variant={selectedRole === "hr" ? undefined : "outline"}
            >
              HR
            </Button>

            <Button 
              onClick={() => handleRoleSelect("super-admin")}
              style={selectedRole === "super-admin" ? { backgroundColor: "#4ead3b", color: "black" } : {}}
              className={`h-12 border res-1200:h-8 res-1200:text-xs ${selectedRole === "super-admin" ? "" : "bg-white text-gray-700 border-gray-300"}`}
              variant={selectedRole === "super-admin" ? undefined : "outline"}
            >
              Super Admin
            </Button>
          </div>
          
          <Button 
            onClick={handleContinue}
            disabled={!selectedRole}
            style={{ backgroundColor: "#4ead3b", color: "black" }}
            className="w-full h-12 font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 res-1200:h-8 res-1200:text-xs"
          >
            Continue
          </Button>
        </div>
      </div>
      
      {/* Right side - Gradient background with content */}
      <AuthRightLayout/>
      </div>
  );
}

export default RoleSelection;
