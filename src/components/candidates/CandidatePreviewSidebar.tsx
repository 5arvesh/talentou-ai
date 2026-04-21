
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ParsedCVData } from "@/types/candidate";
import { User, FileText } from "lucide-react";

interface CandidatePreviewSidebarProps {
  parsedData: ParsedCVData | null;
  isLoading: boolean;
}

export const CandidatePreviewSidebar = ({ parsedData, isLoading }: CandidatePreviewSidebarProps) => {
  if (isLoading) {
    return (
      <div className="h-full p-4 border-l border-gray-200 bg-gray-50">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!parsedData) {
    return (
      <div className="h-full p-4 border-l border-gray-200 bg-gray-50">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Candidate Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 mt-8">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Upload a CV to auto-fill candidate details</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full p-4 border-l border-gray-200 bg-gray-50 overflow-y-auto">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Candidate Details
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Auto-filled from CV</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Personal Information</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName" className="text-xs font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={parsedData.firstName || ''}
                  readOnly
                  className="mt-1 bg-blue-50 border-blue-200 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={parsedData.lastName || ''}
                  readOnly
                  className="mt-1 bg-blue-50 border-blue-200 text-sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                value={parsedData.email || ''}
                readOnly
                className="mt-1 bg-blue-50 border-blue-200 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-xs font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={parsedData.phone || ''}
                readOnly
                className="mt-1 bg-blue-50 border-blue-200 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-xs font-medium text-gray-700">
                Current Location
              </Label>
              <Input
                id="location"
                value={parsedData.currentLocation || ''}
                readOnly
                className="mt-1 bg-blue-50 border-blue-200 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="position" className="text-xs font-medium text-gray-700">
                Current Position
              </Label>
              <Input
                id="position"
                value={parsedData.currentPosition || ''}
                readOnly
                className="mt-1 bg-blue-50 border-blue-200 text-sm"
              />
            </div>
          </div>

          {/* Skills */}
          {parsedData.skills && parsedData.skills.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {parsedData.skills.slice(0, 10).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                    {skill}
                  </Badge>
                ))}
                {parsedData.skills.length > 10 && (
                  <Badge variant="secondary" className="text-xs">
                    +{parsedData.skills.length - 10} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Experience */}
          {parsedData.experience && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Experience Summary</h4>
              <Textarea
                value={parsedData.experience.slice(0, 500) + (parsedData.experience.length > 500 ? '...' : '')}
                readOnly
                className="text-xs bg-green-50 border-green-200 min-h-[100px] resize-none"
              />
            </div>
          )}

          {/* Status Indicators */}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Auto-filled fields:</span>
              <Badge variant="outline" className="text-green-700 border-green-300">
                {Object.values(parsedData).filter(value => value && (typeof value === 'string' ? value.trim() : Array.isArray(value) ? value.length > 0 : true)).length} fields
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
