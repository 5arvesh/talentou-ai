
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";


export function ForgotPassword() {
  const navigate = useNavigate();
  
  const handleRequestReset = () => {
    navigate("/password-reset-sent");
  };
  
  const handleBackToLogin = () => {
    navigate("/login");
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Left side - Forgot Password form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8">
        <AuthHeader />

        {/* Forgot Password Form */}
        <div className="max-w-md mx-auto w-full res-1200:max-w-xs res-1400:max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center res-1200:text-[18px] res-1200:mb-4 res-1400:text-[22px] res-1400:mb-6">Forgot Your Password</h1>
          
          <p className="text-gray-700 mb-6 text-center res-1200:text-xs res-1200:mb-4 res-1400:mb-6">
            Please enter your registered email address
          </p>
          
          <div className="space-y-6">
            <Input 
              placeholder="Enter Email Address" 
              className="rounded-md shadow-sm h-12 res-1200:h-8 res-1200:text-xs" 
            />
            
            <Button 
              onClick={handleRequestReset}
              style={{ backgroundColor: "#4ead3b", color: "black" }}
              className="w-full h-12 font-medium rounded-md shadow-sm hover:opacity-90 res-1200:h-8 res-1200:text-xs"
            >
              Request Reset Link
            </Button>
            
            <div className="text-center">
              <button
                onClick={handleBackToLogin}
                style={{ color: "#4ead3b" }}
                className="font-medium hover:underline res-1200:text-xs"
              >
                Back to Login Screen
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Shared layout */}
      <AuthRightLayout />
    </div>
  );
}

export default ForgotPassword;
