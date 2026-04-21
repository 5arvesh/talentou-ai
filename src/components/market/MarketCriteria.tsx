import { ArrowLeft, MapPin, Briefcase, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function MarketCriteria() {
  const navigate = useNavigate();
  const { setMarketCriteriaAligned, isMarketCriteriaAligned } = useAlignment();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(isMarketCriteriaAligned);

  const handleAlignClick = () => {
    setMarketCriteriaAligned(true);
    setIsAligned(true);

    toast({
      title: "Alignment Successful!",
      description: "Market criteria has been marked as aligned.",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/market-database");
    }, 1000);
  };

  const handleSuggestFeedbackClick = () => {
    navigate("/suggest-feedback");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/market-database")}
          className="mb-4 px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Talent Pool
        </Button>
      </div>

      {/* Content Box */}
      <div className="border h-[550px] border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 overflow-y-auto">
        <div className="space-y-8">
          
          {/* 1. Work Type */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-500 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Work Type</h3>
            </div>
            <ul className="ml-7 list-disc text-gray-700 dark:text-gray-300 space-y-2">
              <li>On site</li>
            </ul>
          </div>

          {/* 2. Geographical Area */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Geographical Area</h3>
            </div>
            <ul className="ml-7 list-disc text-gray-700 dark:text-gray-300 space-y-2">
              <li>India - Tamil Nadu - Chennai</li>
            </ul>
          </div>

          {/* 3. Industry */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Industry</h3>
            </div>
            <ul className="ml-7 list-disc text-gray-700 dark:text-gray-300 space-y-2">
              <li>IT Services</li>
              <li>Product Engineering</li>
              <li>Consulting</li>
            </ul>
          </div>

          {/* 4. Preferred Companies */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-teal-500 dark:text-teal-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Preferred Companies</h3>
            </div>
            <ul className="ml-7 list-disc text-gray-700 dark:text-gray-300 space-y-2">
              <li>Mindtree</li>
              <li>Hexaware</li>
              <li>Similar IT firms</li>
            </ul>
          </div>

          {/* 5. Educational Institutions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Educational Institutions</h3>
            </div>
            <ul className="ml-7 list-disc text-gray-700 dark:text-gray-300 space-y-2">
              <li>Tier 1/Tier 2 Engineering Colleges (CS/IT)</li>
            </ul>
          </div>

          {/* 6. Preferred Institutions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-pink-500 dark:text-pink-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Preferred Institutions</h3>
            </div>
            <ul className="ml-7 list-disc text-gray-700 dark:text-gray-300 space-y-2">
              <li>IITs</li>
              <li>NIT Trichy</li>
              <li>VIT Vellore</li>
              <li>SRM University</li>
              <li>PSG Tech</li>
              <li>Anna University</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Centered Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={handleSuggestFeedbackClick}
          className="border-brand-500 text-brand-600 dark:border-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20"
        >
          Suggest Feedback
        </Button>

        <Button
          onClick={handleAlignClick}
          className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-800 text-white"
        >
          {isAligned ? "Continue" : "I'm Aligned"}
        </Button>
      </div>
    </div>
  );
}
