import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import { toast } from "sonner";

const emailTemplates = [
  { id: 1, name: "Interview Invite" },
  { id: 2, name: "Interview OTP" },
  { id: 3, name: "Share interview Link" },
  { id: 4, name: "Share interview OTP" },
  { id: 5, name: "Forgot Password" },
];

export function EmailTemplatesSettings() {
  const handleEdit = (templateName: string) => {
    toast.info(`Edit ${templateName} template`);
  };

  const handleView = (templateName: string) => {
    toast.info(`View ${templateName} template`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">E-Mail Templates</h2>
        <p className="text-sm text-muted-foreground">
          Manage email templates used for candidate communication
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emailTemplates.map((template) => (
            <TableRow key={template.id}>
              <TableCell className="font-medium">{template.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(template.name)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(template.name)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
