import { ArrowLeft, FileText, FileSpreadsheet, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Collaterals() {
  const navigate = useNavigate();
  const { setCollateralsAligned, isCollateralsAligned } = useAlignment();
  const { toast } = useToast();
  const [isAligned, setIsAligned] = useState(isCollateralsAligned);

  const handleAlignClick = () => {
    setCollateralsAligned(true);
    setIsAligned(true);
    
    toast({
      title: "Alignment Successful!",
      description: "Collaterals have been marked as aligned.",
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
    <div className="flex flex-col gap-6 py-6">
      {/* Back button and title */}
      <div>
        <Button 
          variant="ghost" 
          onClick={() => navigate("/message")} 
          className="mb-4 px-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Collaterals
        </Button>
      </div>

      {/* Table of collaterals */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Collateral Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Uploaded On
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Uploaded By
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {collaterals.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                      {item.type === 'pdf' ? (
                        <FileText className="h-5 w-5 text-red-500" />
                      ) : item.type === 'doc' ? (
                        <FileText className="h-5 w-5 text-blue-500" />
                      ) : (
                        <FileSpreadsheet className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.uploadedOn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-800 dark:text-green-300 text-sm font-medium">
                      {item.uploadedBy.initials}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
                      <Eye size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
                      <Download size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end gap-4 mt-8">
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

// Sample collateral data
const collaterals = [
  {
    id: 1,
    name: 'Ignitho - Product Pitch Deck - January 2025 - Version 2',
    type: 'pdf',
    uploadedOn: 'Feb 28',
    uploadedBy: { name: 'Jo Smith', initials: 'JO' }
  },
  {
    id: 2,
    name: 'Ignitho - Product Pitch Deck - December 2024 - Version 1',
    type: 'ppt',
    uploadedOn: 'Feb 28',
    uploadedBy: { name: 'Jo Smith', initials: 'JO' }
  },
  {
    id: 3,
    name: 'Ignitho - Product document with all the features & the pricing',
    type: 'doc',
    uploadedOn: 'Feb 28',
    uploadedBy: { name: 'Jo Smith', initials: 'JO' }
  },
  {
    id: 4,
    name: '4 Page Brochure - Ignitho Product - December 2024 - Version 2',
    type: 'pdf',
    uploadedOn: 'Feb 28',
    uploadedBy: { name: 'Jo Smith', initials: 'JO' }
  }
];
