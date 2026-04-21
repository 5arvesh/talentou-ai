import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TenantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  tenant?: {
    id: string;
    name: string;
    domain: string;
    email: string;
    plan: string;
  } | null;
  onSuccess: (email: string) => void;
}

export function TenantDialog({
  open,
  onOpenChange,
  mode,
  tenant,
  onSuccess,
}: TenantDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    email: "",
    plan: "basic",
  });

  useEffect(() => {
    if (tenant && mode === "edit") {
      setFormData({
        name: tenant.name,
        domain: tenant.domain,
        email: tenant.email,
        plan: tenant.plan.toLowerCase(),
      });
    } else {
      setFormData({
        name: "",
        domain: "",
        email: "",
        plan: "basic",
      });
    }
  }, [tenant, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData.email);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="text-white text-2xl">
            {mode === "create" ? "Add New Tenant" : "Edit Tenant"}
          </DialogTitle>
          <DialogDescription className="text-white/90">
            {mode === "create"
              ? "Create a new tenant account with the required information"
              : "Update tenant account information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Tenant Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter tenant name"
                  required
                  className="focus:border-[#22c55e] focus:ring-[#22c55e]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain" className="text-foreground">
                  Domain <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="e.g., company.com"
                  required
                  className="focus:border-[#22c55e] focus:ring-[#22c55e]"
                />
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <h3 className="text-lg font-semibold text-foreground">Recipient Information</h3>
            </div>
            
            <div className="pl-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Recipient Email ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  required
                  className="focus:border-[#22c55e] focus:ring-[#22c55e]"
                />
              </div>
            </div>
          </div>

          {/* Plan Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <h3 className="text-lg font-semibold text-foreground">Plan Information</h3>
            </div>
            
            <div className="pl-4">
              <div className="space-y-2">
                <Label htmlFor="plan" className="text-foreground">
                  Plan <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.plan}
                  onValueChange={(value) => setFormData({ ...formData, plan: value })}
                >
                  <SelectTrigger className="focus:border-[#22c55e] focus:ring-[#22c55e]">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Discard
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: "#4ead3b", color: "black" }}
              className="hover:opacity-90"
            >
              {mode === "create" ? "Create Tenant" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
