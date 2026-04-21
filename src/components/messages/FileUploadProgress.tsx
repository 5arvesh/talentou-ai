
import React from 'react';
import { FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileUploadProgressProps {
  fileName: string;
  progress: number;
}

export const FileUploadProgress = ({ fileName, progress }: FileUploadProgressProps) => {
  return (
    <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-2">
        <FileText size={18} className="mr-2 text-blue-500" />
        <span className="font-medium">{fileName}</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="text-right text-sm text-gray-500 mt-1">
        {progress}%
      </div>
    </div>
  );
};

export default FileUploadProgress;
