import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { NumericInput } from "./NumericInput";

export function InterviewSettings() {
  const [linkExpiry, setLinkExpiry] = useState(7);
  const [maxDuration, setMaxDuration] = useState(60);
  const [maxWaitTime, setMaxWaitTime] = useState(30);
  const [resendOTPLimit, setResendOTPLimit] = useState(3);
  const [faceDetection, setFaceDetection] = useState(false);
  const [tabSwitchDetection, setTabSwitchDetection] = useState(false);

  const handleSave = () => {
    toast.success("Interview settings saved successfully");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Interview Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure default settings for all interviews. These can be overridden for specific questionnaires.
        </p>
      </div>

      <div className="space-y-6">
        <NumericInput
          label="Interview link expiry duration (in days)"
          value={linkExpiry}
          onChange={setLinkExpiry}
          min={1}
          max={30}
        />

        <NumericInput
          label="Max interview duration (in minutes)"
          value={maxDuration}
          onChange={setMaxDuration}
          min={5}
          max={180}
          step={5}
        />

        <NumericInput
          label="Max wait time after reading question (in seconds)"
          value={maxWaitTime}
          onChange={setMaxWaitTime}
          min={5}
          max={120}
          step={5}
        />

        <NumericInput
          label="Resend OTP limit (for candidate use)"
          value={resendOTPLimit}
          onChange={setResendOTPLimit}
          min={1}
          max={10}
        />

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Face detection</label>
              <p className="text-sm text-muted-foreground">
                Detect if candidate's face is visible during interview
              </p>
            </div>
            <Switch
              checked={faceDetection}
              onCheckedChange={setFaceDetection}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Tab switch detection</label>
              <p className="text-sm text-muted-foreground">
                Detect if candidate switches tabs during interview
              </p>
            </div>
            <Switch
              checked={tabSwitchDetection}
              onCheckedChange={setTabSwitchDetection}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
