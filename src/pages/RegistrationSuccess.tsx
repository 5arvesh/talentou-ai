
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";

export function RegistrationSuccess() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Left side - Success message */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8">
        <AuthHeader />

        {/* Success Content */}
        <div className="max-w-md mx-auto w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6  res-1200:text-[18px] res-1200:mb-4 res-1400:text-[22px] res-1400:mb-6">Success</h1>
          
          <p className="text-gray-700 mb-8 res-1200:text-xs res-1200:mb-4 res-1400:mb-6">
            Congratulations, Your account has been successfully created.
          </p>
          
          <button 
            onClick={handleLogin}
            style={{ color: "#4ead3b" }}
            className="font-medium hover:underline res-1200:text-xs"
          >
            Click here to login
          </button>
        </div>
      </div>
      
      {/* Right side - Shared layout */}
      <AuthRightLayout />
    </div>
  );
}

export default RegistrationSuccess;
