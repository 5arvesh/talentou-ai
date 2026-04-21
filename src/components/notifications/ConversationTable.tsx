
import React, { useState } from "react";
import CustomAccordion from "../Reuseable/Accordion";
import {
  Briefcase,
  MapPin,
  Building,
  GraduationCap,
  Users,
  School,
} from "lucide-react";

export function ConversationTable() {
  const [expandedAccordions, setExpandedAccordions] = useState<Set<number>>(
    new Set()
  );

  const handleAccordionToggle = (id: number) => {
    setExpandedAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const positionDetails = [
    {
      id: 1,
      title: "Position Overview",
      content: (
        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Position Title:</span>
            <span className="text-gray-900 dark:text-gray-100">Senior Backend Developer</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Department:</span>
            <span className="text-gray-900 dark:text-gray-100">Engineering</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Employment Type:</span>
            <span className="text-gray-900 dark:text-gray-100">Full-time</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Priority:</span>
            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">High</span>
          </div>
        </div>
      ),
      color: "#ae6bf2",
      icon: Briefcase,
    },
    {
      id: 2,
      title: "Location & Work Mode",
      content: (
        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Location:</span>
            <span className="text-gray-900 dark:text-gray-100">Bangalore, India</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Work Mode:</span>
            <span className="text-gray-900 dark:text-gray-100">On-site</span>
          </div>
        </div>
      ),
      color: "#4a8ff7",
      icon: MapPin,
    },
    {
      id: 3,
      title: "Experience & Compensation",
      content: (
        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Experience Level:</span>
            <span className="text-gray-900 dark:text-gray-100">3-5 years</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Salary Range:</span>
            <span className="text-gray-900 dark:text-gray-100">₹12-15 LPA</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Notice Period:</span>
            <span className="text-gray-900 dark:text-gray-100">Up to 60 days</span>
          </div>
        </div>
      ),
      color: "#90e0c5",
      icon: Building,
    },
    {
      id: 4,
      title: "Skills & Requirements",
      content: (
        <div className="w-full space-y-3">
          <div className="flex flex-col space-y-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Required Skills:</span>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "MongoDB", "AWS", "TypeScript"].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
      color: "#f97316",
      icon: GraduationCap,
    },
    {
      id: 5,
      title: "Approval Information",
      content: (
        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Opened By:</span>
            <span className="text-gray-900 dark:text-gray-100">Ananthan</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Created Date:</span>
            <span className="text-gray-900 dark:text-gray-100">January 29, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-md text-sm">Pending Approval</span>
          </div>
        </div>
      ),
      color: "#8b5cf6",
      icon: Users,
    },
  ];

  return (
    <div className="w-full space-y-2">
      {positionDetails.map((detail) => (
        <CustomAccordion
          key={detail.id}
          bgclr={detail.color}
          title={detail.title}
          content={detail.content}
          icon={React.createElement(detail.icon)}
          isCollapsed={expandedAccordions.has(detail.id)}
          toggleCollapse={() => handleAccordionToggle(detail.id)}
        />
      ))}
    </div>
  );
}
