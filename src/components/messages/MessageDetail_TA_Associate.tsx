
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Download, Edit } from "lucide-react";
import { useAlignment } from "@/context/AlignmentContext";
import { FileUploadProgress_TA_Associate } from "./FileUploadProgress_TA_Associate";
import { SalesPlanProgress_TA_Associate } from "./SalesPlanProgress_TA_Associate";

interface MessageDetailProps_TA_Associate {
  messageType: 'value-proposition' | 'collaterals';
}

export const MessageDetail_TA_Associate = ({ messageType }: MessageDetailProps_TA_Associate) => {
  const { 
    isValuePropositionAligned, 
    isCollateralsAligned,
    setValuePropositionAligned,
    setCollateralsAligned 
  } = useAlignment();

  const isCompleted = messageType === 'value-proposition' ? isValuePropositionAligned : isCollateralsAligned;
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handleApprove = useCallback(() => {
    if (messageType === 'value-proposition') {
      setValuePropositionAligned(true);
    } else {
      setCollateralsAligned(true);
    }
  }, [messageType, setValuePropositionAligned, setCollateralsAligned]);

  const getContent = () => {
    if (messageType === 'value-proposition') {
      return {
        title: "Value Proposition Messages",
        description: "AI-generated recruitment messages tailored to your company's unique value proposition",
        messages: {
          "LinkedIn Outreach": "Hi [Name], I noticed your impressive background in [specific skill/experience]. At Ignitho, we're not just another tech company - we're building the future of digital transformation with cutting-edge AI solutions. We're currently looking for talented professionals like yourself to join our innovative team. Would you be open to a brief conversation about how your expertise could contribute to our mission?",
          "Email Follow-up": "Subject: Exciting Opportunity at Ignitho - Your Skills Align Perfectly\n\nDear [Name],\n\nI hope this email finds you well. I came across your profile and was impressed by your experience in [relevant field]. At Ignitho, we're revolutionizing how businesses approach digital transformation through AI-powered solutions.\n\nWhat sets us apart:\n• Cutting-edge technology stack\n• Collaborative, innovation-driven culture\n• Opportunity to work on industry-leading projects\n• Strong focus on professional development\n\nI'd love to discuss how your background aligns with our current opportunities. Are you available for a 15-minute call this week?\n\nBest regards,\n[Your Name]",
          "Phone Script": "Hi [Name], this is [Your Name] from Ignitho. I hope I'm not catching you at a bad time. I reached out because I was impressed by your background in [specific area] and thought you might be interested in learning about an exciting opportunity we have. Ignitho is at the forefront of AI-driven digital transformation, and we're looking for talented professionals who share our passion for innovation. Would you have a few minutes to chat about how your skills could contribute to our growing team?"
        }
      };
    } else {
      return {
        title: "Recruitment Collaterals",
        description: "Supporting materials and documents for your recruitment campaigns",
        messages: {
          "Company Overview": "Ignitho Technologies - Leading the Future of Digital Transformation\n\nFounded with a vision to revolutionize business processes through cutting-edge technology, Ignitho has emerged as a premier provider of AI-powered digital solutions. Our team of innovative thinkers and technical experts work collaboratively to deliver transformative results for our clients across various industries.",
          "Role Description Template": "Position: [Job Title]\nDepartment: [Department Name]\nLocation: [Location]\n\nAbout the Role:\nWe are seeking a dynamic [Job Title] to join our growing team at Ignitho. This role offers an exciting opportunity to work with cutting-edge technology while contributing to innovative projects that shape the future of digital transformation.\n\nKey Responsibilities:\n• [Responsibility 1]\n• [Responsibility 2]\n• [Responsibility 3]\n\nWhat We Offer:\n• Competitive compensation package\n• Flexible working arrangements\n• Professional development opportunities\n• Collaborative and innovative work environment",
          "Benefits Package": "Why Choose Ignitho?\n\n💰 Competitive Salary & Benefits\n🏠 Flexible Work Arrangements\n📚 Continuous Learning & Development\n🚀 Career Growth Opportunities\n🤝 Collaborative Team Environment\n🌟 Work on Cutting-edge Projects\n🎯 Performance-based Incentives\n🏥 Comprehensive Health Coverage"
        }
      };
    }
  };

  const content = getContent();

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto res-1200:p-3 res-1200:space-y-3 res-1400:p-4 res-1400:space-y-4 res-1600:p-5 res-1600:space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 res-1200:text-lg res-1400:text-xl res-1600:text-2xl">
              {content.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 res-1200:text-sm res-1400:text-base">
              {content.description}
            </p>
          </div>
          <Badge variant={isCompleted ? "default" : "secondary"} className="flex items-center gap-1">
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3 h-3" />
                Approved
              </>
            ) : (
              <>
                <Clock className="w-3 h-3" />
                Pending Review
              </>
            )}
          </Badge>
        </div>

        <div className="grid gap-4">
          {Object.entries(content.messages).map(([title, message]) => (
            <Card key={title}>
              <CardHeader className="pb-3 res-1200:pb-2">
                <CardTitle className="text-lg res-1200:text-base res-1400:text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 res-1200:p-2 res-1200:mb-2 res-1400:p-3 res-1400:mb-3">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans res-1200:text-xs res-1400:text-sm">
                    {message}
                  </pre>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="res-1200:text-xs">
                    <Edit className="w-4 h-4 mr-1 res-1200:w-3 res-1200:h-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="res-1200:text-xs">
                    <Download className="w-4 h-4 mr-1 res-1200:w-3 res-1200:h-3" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!isCompleted && (
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline" className="res-1200:text-xs">
              Request Changes
            </Button>
            <Button 
              onClick={handleApprove}
              style={{ backgroundColor: "#4ead3b", color: "black" }}
              className="hover:opacity-90 res-1200:text-xs"
            >
              Approve & Continue
            </Button>
          </div>
        )}

        {showFileUpload && <FileUploadProgress_TA_Associate />}
      </div>

      <div className="w-80 border-l border-gray-200 dark:border-gray-700 res-1200:w-64 res-1400:w-72">
        <SalesPlanProgress_TA_Associate />
      </div>
    </div>
  );
};
