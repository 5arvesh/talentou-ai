
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";

export function PasswordResetSent() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Left side - Password Reset Sent message */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8">
        <AuthHeader />

        {/* Password Reset Sent Content */}
        <div className="max-w-md mx-auto w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center res-1200:text-[18px] res-1200:mb-4 res-1400:text-[22px] res-1400:mb-6">Check Your Email!</h1>
          
          <p className="text-gray-700 mb-8 res-1200:text-xs res-1200:mb-4 res-1400:mb-6">
            We just sent you an email with a link to reset your password
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

export default PasswordResetSent;
