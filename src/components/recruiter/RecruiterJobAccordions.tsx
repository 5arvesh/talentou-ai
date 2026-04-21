import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Expand, Minimize2, User, Settings } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import CustomAccordion from "@/components/Reuseable/Accordion";

export const RecruiterJobAccordions = () => {
  // Accordion states
  const [isProductEngineerExpanded, setIsProductEngineerExpanded] = useState(false);
  const [isPreferencesExpanded, setIsPreferencesExpanded] = useState(false);
  const [areAllExpanded, setAreAllExpanded] = useState(false);

  const handleExpandAll = () => {
    const newState = !areAllExpanded;
    setAreAllExpanded(newState);
    setIsProductEngineerExpanded(newState);
    setIsPreferencesExpanded(newState);
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-800/50">
      <div className="p-4 h-full overflow-y-auto">
        {/* Expand/Collapse All Button */}
        <div className="flex justify-end mb-3">
          <Button
            onClick={handleExpandAll}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-xs"
          >
            {areAllExpanded ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Expand className="w-3 h-3" />
            )}
            {areAllExpanded ? "Collapse All" : "Expand All"}
          </Button>
        </div>

        <div className="space-y-3">
          {/* Accordion 1: Product Engineer */}
          <CustomAccordion
            bgclr="#ae6bf2"
            key={1}
            isCollapsed={isProductEngineerExpanded}
            title="Product Engineer"
            content={
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-2">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300 w-1/2">
                        Functional Role
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        Full Stack Developer
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-[#ae6bf2]/10">
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Project
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        Amgen
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Location
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        Chennai, India
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-[#ae6bf2]/10">
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Start Date
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        1st November
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Number of Openings
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        2
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-[#ae6bf2]/10">
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Minimum Experience
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        0 years
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Maximum Budget
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        ₹15 LPA
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-[#ae6bf2]/10">
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Employment Type
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        Full time
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Work Mode
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        Onsite
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-[#ae6bf2]/10">
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Must Have
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        <div className="space-y-1">
                          <div>1. MongoDB</div>
                          <div>2. Node.js</div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Could Have
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        <div className="space-y-1">
                          <div>1. AWS</div>
                          <div>2. TypeScript</div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-[#ae6bf2]/10">
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Behavioral
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        <div className="space-y-1">
                          <div>1. Communication</div>
                          <div>2. Leadership</div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Responsibilities
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        <div className="space-y-1">
                          <div>1. Build and maintain scalable backend APIs</div>
                          <div>2. Integrate with cloud infrastructure (AWS)</div>
                          <div>3. Collaborate with frontend & DevOps teams</div>
                          <div>4. Mentor junior developers</div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-[#ae6bf2]/10">
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Sample Profile
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        <div className="space-y-1">
                          <div>N/A</div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                        Interviewer
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        <div className="space-y-1">
                          <div>Ramachandran</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            }
            toggleCollapse={() =>
              setIsProductEngineerExpanded(!isProductEngineerExpanded)
            }
            icon={<User className="w-4 h-4" />}
          />

          {/* Accordion 2: Preferences */}
          <CustomAccordion
            bgclr="#4a8ff7"
            key={2}
            isCollapsed={isPreferencesExpanded}
            title="Preferences"
            content={
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-2 space-y-4">
                <div className="w-full">
                  <table className="table-auto w-full text-sm overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
                    <thead>
                      <tr className="bg-[#eef4fe] dark:bg-gray-800">
                        <th className="px-4 py-2 text-left rounded-tl-md">
                          Industry
                        </th>
                        <th className="px-4 py-2 text-left">Domain</th>
                        <th className="px-4 py-2 text-left rounded-tr-md">
                          Preferred Companies
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#f8fbff]">
                      <tr>
                        <td className={`px-4 py-2`}>IT Services</td>
                        <td className="px-4 py-2">Fintech, SaaS</td>
                        <td className={`px-4 py-2`}>MindTree, Wipro</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Educational Information Section */}
                <div className="w-full">
                  <table className="table-auto w-full text-sm overflow-hidden rounded-md border border-gray-300 dark:border-gray-700">
                    <tbody className="bg-[#f8fbff] dark:bg-gray-800">
                      <tr className="bg-[#eef4fe] dark:bg-gray-700">
                        <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 w-1/2">
                          Educational Institute
                        </td>
                        <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                          1. SNS College of Technology
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
                          Educational Qualification
                        </td>
                        <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                          1. B.Tech
                        </td>
                      </tr>
                      <tr className="bg-[#eef4fe] dark:bg-gray-700">
                        <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
                          Sample Profile
                        </td>
                        <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                          Sarvesh
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }
            toggleCollapse={() =>
              setIsPreferencesExpanded(!isPreferencesExpanded)
            }
            icon={<Settings className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
};