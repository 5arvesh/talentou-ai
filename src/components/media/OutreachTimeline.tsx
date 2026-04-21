import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function OutreachTimeline() {
  const navigate = useNavigate();
  const { setOutreachTimelineAligned, isOutreachTimelineAligned } = useAlignment();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(isOutreachTimelineAligned);

  const handleAlignClick = () => {
    setOutreachTimelineAligned(true);
    setIsAligned(true);

    toast({
      title: "Alignment Successful!",
      description: "Recruitment channels have been marked as aligned.",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/media-outreach");
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
          onClick={() => navigate("/media-outreach")}
          className="mt-4 px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Recruitment Channels
        </Button>
      </div>

      {/* Content Box */}
      <div className="border h-[550px] border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 overflow-y-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">1. Online Job Portals</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Naukri</li>
            <li className="mb-2">Indeed</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">2. Company-Owned Channels</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">ATS</li>
            <li className="mb-2">Careers Page on Company Website</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">3. Social Media Platforms</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">LinkedIn</li>
          </ul>


          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">4. Campus Recruitment</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Colleges / Universities</li>
            <li className="mb-2">Placement Portals</li>
          </ul>


          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">5. Email and CRM-Based Hiring</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">ATS</li>
          </ul>

        </div>
      </div>

      {/* Action Buttons */}
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
