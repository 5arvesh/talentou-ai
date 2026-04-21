import React, { useState } from "react";
import { Eye, Pencil, Paperclip } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CompanyList = () => {
  const [projects] = useState([
    {
      name: "Amgen",
      openings: "It should be updated real time",
      location: "-",
      taLead: "Roney",
      hiringLead: "Ananthan",
      created: new Date().toLocaleString(),
      modified: new Date().toLocaleString(),
    },
    {
      name: "Amgen",
      openings: "It should be updated real time",
      location: "-",
      taLead: "Roney",
      hiringLead: "Ananthan",
      created: new Date().toLocaleString(),
      modified: new Date().toLocaleString(),
    },
    {
      name: "Amgen",
      openings: "It should be updated real time",
      location: "-",
      taLead: "Roney",
      hiringLead: "Ananthan",
      created: new Date().toLocaleString(),
      modified: new Date().toLocaleString(),
    },
  ]);

  return (
    <div className="p-6">
      <Tabs defaultValue="company">
        {/* <TabsList>
          <TabsTrigger value="company">Company List</TabsTrigger>
          <TabsTrigger value="job">Job List</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
        </TabsList> */}

        <TabsContent value="company">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-brand-300 bg-gradient-to-br from-brand-100 to-blue-100">
            <Table className="rounded-2xl">
              <TableHeader className="bg-gradient-to-br from-[#7E00FC] to-[#0A92FE] text-white">
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>No of Openings</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>TA Lead</TableHead>
                  <TableHead>Hiring Lead</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow
                    key={index}
                  >
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.openings}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>{project.taLead}</TableCell>
                    <TableCell>{project.hiringLead}</TableCell>
                    <TableCell>{project.created}</TableCell>
                    <TableCell>{project.modified}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 items-center">
                        <div className="p-1 bg-brand-100 hover:bg-brand-200 rounded-full transition duration-200">
                          <Pencil className="w-4 h-4 text-brand-700 cursor-pointer"/>
                        </div>
                        <div className="p-1 bg-brand-100 hover:bg-brand-200 rounded-full transition duration-200">
                          <Paperclip className="w-4 h-4 text-brand-700 cursor-pointer"/>
                        </div>
                        <div className="p-1 bg-brand-100 hover:bg-brand-200 rounded-full transition duration-200">
                          <Eye className="w-4 h-4 text-brand-700 cursor-pointer"/>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyList;
