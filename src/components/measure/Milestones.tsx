
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Milestones() {
  const navigate = useNavigate();
  const { setMilestonesAligned, isMilestonesAligned } = useAlignment();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(isMilestonesAligned);

  const handleAlignClick = () => {
    setMilestonesAligned(true);
    setIsAligned(true);
    
    toast({
      title: "Alignment Successful!",
      description: "Milestones have been marked as aligned.",
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate("/success");
    }, 1000);
  };

  const handleSuggestFeedbackClick = () => {
    toast({
      title: "Feedback Option",
      description: "This feature will be available soon.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <div>
        <Button 
          variant="ghost" 
          onClick={() => navigate("/measure-kpi")} 
          className="mb-4 px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Milestones
        </Button>
      </div>

      {/* Milestones Content */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left font-medium text-gray-800 dark:text-gray-200 bg-orange-50/50 dark:bg-orange-900/10">Milestones</th>
                <th className="py-3 px-4 text-center font-medium text-gray-800 dark:text-gray-200">Daily</th>
                <th className="py-3 px-4 text-center font-medium text-gray-800 dark:text-gray-200">Weekly</th>
                <th className="py-3 px-4 text-center font-medium text-gray-800 dark:text-gray-200">Monthly</th>
                <th className="py-3 px-4 text-center font-medium text-gray-800 dark:text-gray-200">Quarterly</th>
                <th className="py-3 px-4 text-center font-medium text-gray-800 dark:text-gray-200">Yearly</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td colSpan={6} className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">Database Milestones</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Companies to be added</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">10</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">50</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">200</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Contacts to be added</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">15</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">75</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">300</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td colSpan={6} className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">Outreach Milestones</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Emails to be sent</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">100</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">500</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">2000</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">LinkedIn touchpoints</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">100</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">500</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">2000</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Calls to be made</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">100</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">500</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">2000</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td colSpan={6} className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">Conversions</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Meetings Booked</td>
                <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">-</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">1</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">4</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">12</td>
                <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">48</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Centered Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button 
          variant="outline" 
          onClick={handleSuggestFeedbackClick}
          className="border-green-500 text-green-600 dark:border-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          Suggest Feedback
        </Button>
        
        <Button 
          onClick={handleAlignClick}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
        >
          {isAligned ? "Continue" : "I'm Aligned"}
        </Button>
      </div>
    </div>
  );
}
