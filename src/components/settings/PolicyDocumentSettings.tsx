import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function PolicyDocumentSettings() {
  const [policyType, setPolicyType] = useState("eula");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Policy document saved successfully");
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    toast.info("Changes discarded");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Policy Document</h2>
        <p className="text-sm text-muted-foreground">
          Create and manage policy documents for your organization
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Policy Document Type</label>
          <Select value={policyType} onValueChange={setPolicyType}>
            <SelectTrigger>
              <SelectValue placeholder="Select policy type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eula">End User License Agreement (EULA)</SelectItem>
              <SelectItem value="privacy">Privacy Policy</SelectItem>
              <SelectItem value="terms">Terms of Service</SelectItem>
              <SelectItem value="data-protection">Data Protection Policy</SelectItem>
              <SelectItem value="cookie">Cookie Policy</SelectItem>
              <SelectItem value="acceptable-use">Acceptable Use Policy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            placeholder="Enter policy title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Textarea
            placeholder="Enter policy content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px]"
          />
          <p className="text-xs text-muted-foreground">
            Enter the full text of your policy document
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
            Save
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
