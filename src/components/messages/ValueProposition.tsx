import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function ValueProposition() {
  const navigate = useNavigate();
  const { setValuePropositionAligned, isValuePropositionAligned } = useAlignment();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(isValuePropositionAligned);

  const handleAlignClick = () => {
    setValuePropositionAligned(true);
    setIsAligned(true);

    toast({
      title: "Alignment Successful!",
      description: "Value proposition has been marked as aligned.",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/message");
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
          onClick={() => navigate("/message")}
          className="mt-4 px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Company USP
        </Button>
      </div>

      {/* Content Box */}
      <div className="border h-[550px] border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 overflow-y-auto">
        <div className="prose dark:prose-invert max-w-none">

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">1. Mission & Vision</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Mission: To deliver outcome-driven digital solutions through frugal innovation, enabling clients to accelerate business impact with agility and efficiency.</li>
            <li className="mb-2">Vision: To be a global leader in digital engineering by empowering entrepreneurial talent to drive innovation and create real-world value.</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">2. Work Culture</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Ignitho empowers entrepreneurial talent to lead innovation at scale</li>
            <li className="mb-2">Fosters a collaborative and delivery-driven culture</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">3. Career Growth</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Offers client-facing roles with early ownership</li>
            <li className="mb-2">Enables rapid career growth through fast-track promotions</li>
            <li className="mb-2">Acts as a launchpad for professionals aiming to grow into leadership roles</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">4. Training Opportunities</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Provides global exposure across US and Europe</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">5. Benefits</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Hybrid roles available with flexible work timings</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">6. Incentives</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Performance based bonus</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">7. Awards & Brand Recognition</h4>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li className="mb-2">Renowned for their delivery excellence.</li>
          </ul>

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
