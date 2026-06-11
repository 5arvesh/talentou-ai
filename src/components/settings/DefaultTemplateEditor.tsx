import { Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TemplateEditor } from "./TemplateEditor";
import { DEFAULT_FORM_SECTIONS } from "@/constants/defaultFormTemplate";
import type { FormField } from "@/types/applicationForm";

interface DefaultTemplateEditorProps {
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
  onReset: () => void;
}

export function DefaultTemplateEditor({ fields, onFieldsChange, onReset }: DefaultTemplateEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2.5 rounded-card border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
        <Info className="h-4 w-4 mt-0.5 text-primary shrink-0" />
        <p>
          This is the default application form. It applies automatically to every new job posting unless a saved
          template or job-specific override is selected.
        </p>
      </div>

      <TemplateEditor sections={DEFAULT_FORM_SECTIONS} fields={fields} onFieldsChange={onFieldsChange} />

      <div className="flex items-center justify-end gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Reset to defaults</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset all fields to the original Talentou defaults?</AlertDialogTitle>
              <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onReset();
                  toast.success("Reset to defaults");
                }}
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button className="bg-primary text-white hover:bg-primary/90" onClick={() => toast.success("Default template saved")}>
          Save default template
        </Button>
      </div>
    </div>
  );
}
