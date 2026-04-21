
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";

export function EULA() {
  const navigate = useNavigate();
  
  const handleAgree = () => {
    navigate("/registration-success");
  };
  
  const handleCancel = () => {
    navigate("/registration");
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Left side - EULA content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8">
        <AuthHeader />

        {/* EULA Content */}
        <div className="max-w-lg mx-auto w-full res-1200:max-w-md res-1400:max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center res-1200:text-[18px] res-1200:mb-4 res-1400:text-[22px] res-1400:mb-6">End User License Agreement (EULA)</h1>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 max-h-60 overflow-y-auto res-1200:mb-4 res-1200:p-4 res-1400:mb-6">
            <p className="text-gray-700 mb-4 res-1200:text-xs">
              This End User License Agreement (the "Agreement") is a legal contract
              between you (referred to as "Candidate" or "User") and [Video Interview
              Platform Company], a company incorporated under the laws of [Jurisdiction],
              with its principal place of business at [Address] (referred to as "Company" or
              "Platform"). This Agreement governs your use of the video interview platform
              provided by the Company.
            </p>
            
            <p className="text-gray-700 mb-4 res-1200:text-xs">
              By accessing or using the video interview platform, you acknowledge that you
              have read, understood, and agree to be bound by the terms and conditions of
              this Agreement. If you do not agree with any part of this Agreement, you must
              not use the platform.
            </p>
            
            <p className="text-gray-700 res-1200:text-xs">
              This Agreement governs your use of the Piqual AI platform provided by the Company,
              including all features, functionalities, and user interfaces.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            <Button 
              onClick={handleCancel}
              className="h-12 border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 xl:h-10 res-1200:h-8 res-1200:text-xs"
              variant="outline"
            >
              Cancel
            </Button>
            
            <Button 
              onClick={handleAgree}
              style={{ backgroundColor: "#4ead3b", color: "black" }}
              className="h-12 font-medium hover:opacity-90 xl:h-10 res-1200:h-8 res-1200:text-xs"
            >
              I Agree
            </Button>
          </div>
        </div>
      </div>
      
      {/* Right side - Shared layout */}
      <AuthRightLayout />
    </div>
  );
}

export default EULA;
