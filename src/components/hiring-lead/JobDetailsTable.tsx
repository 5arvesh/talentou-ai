
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const JobDetailsTable = () => {
  const jobDetails = [
    { field: "Internal Job Title", details: "Product Engineer" },
    { field: "Functional Role", details: "Full Stack Developer" },
    { field: "Employment Type", details: "Full-Time" },
    { field: "Role Allocation", details: "Client Project" },
    { field: "Company", details: "Amgen" },
    { field: "Job Location", details: "Chennai, India" },
    { field: "Work Mode", details: "Onsite Only" },
    { field: "Expected Start Date", details: "1st November" },
    { field: "No. of Openings", details: "2" },
    { field: "Minimum Experience", details: "0 years" },
    { field: "Maximum budget", details: "₹15 LPA" },
    { field: "Required Skills (Ranked)", details: "MongoDB, Node.js, AWS, TypeScript" },
    { field: "Industry", details: "IT Services" },
    { field: "Preferred Domain Experience", details: "Fintech, SaaS" },
    { field: "Preferred Institutions", details: "NITs, VIT (TA Lead selected Tier 2)" },
    { field: "Preferred Companies", details: "Mindtree, Wipro" },
    { field: "Sample Profile Provided", details: "N/A" },
    { 
      field: "Responsibilities (AI Generated)", 
      details: "- Build and maintain scalable backend APIs\n- Integrate with cloud infrastructure (AWS)\n- Collaborate with frontend & DevOps teams\n- Mentor junior developers" 
    },
    { field: "Interviewer Assigned", details: "Ramachandran S (ramachandran.s@company.com)" },
    { field: "Job Order Status", details: "Awaiting TA Lead Approval" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Job Details
        </h3>
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3 font-semibold">Field</TableHead>
              <TableHead className="font-semibold">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobDetails.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700 dark:text-gray-300 align-top">
                  {item.field}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">
                  {item.field === "Responsibilities (AI Generated)" ? (
                    <div className="whitespace-pre-line">{item.details}</div>
                  ) : (
                    item.details
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
