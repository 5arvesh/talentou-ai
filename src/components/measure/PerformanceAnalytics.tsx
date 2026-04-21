
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function PerformanceAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <div>
        <Button 
          variant="ghost" 
          onClick={() => navigate("/measure-kpi")} 
          className="mb-4 px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Performance Analytics
        </Button>
      </div>

      {/* Performance Analytics Content */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">AI-Driven Performance Insights</h2>
          
          <p className="text-gray-700 dark:text-gray-300">
            This section offers AI-driven insights into the individual performance of each SDR. 
            Dive into detailed KPIs and assess the effectiveness of various outreach methods—emails, 
            LinkedIn, calls, and more. These analytics help identify winning approaches, track 
            productivity, and guide continuous improvement across every stage of the outreach process.
          </p>
          
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Performance analytics will be available after you start your outreach campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
