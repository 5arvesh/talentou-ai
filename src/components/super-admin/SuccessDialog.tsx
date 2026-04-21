import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

export function SuccessDialog({ open, onOpenChange, email }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="items-center text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-[#22c55e]" />
          <DialogTitle className="text-2xl">Email Sent Successfully</DialogTitle>
          <DialogDescription className="text-base">
            Invite Mail has been sent to
            <div className="font-medium text-foreground mt-1">{email}</div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => onOpenChange(false)}
            style={{ backgroundColor: "#4ead3b", color: "black" }}
            className="px-8 hover:opacity-90"
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
