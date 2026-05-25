import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function AuthenticationSettings() {
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [basicAuthEnabled, setBasicAuthEnabled] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [azureAudId, setAzureAudId] = useState("");
  const [azureTenantId, setAzureTenantId] = useState("");
  const [adminGroupId, setAdminGroupId] = useState("");
  const [recruiterGroupId, setRecruiterGroupId] = useState("");
  const [techLeadGroupId, setTechLeadGroupId] = useState("");

  const handleSave = () => {
    toast.success("Authentication settings saved successfully");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Authentication Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure authentication methods for your organization
        </p>
      </div>

      <div className="space-y-6">
        {/* Single Sign On Section */}
        <div className="space-y-4 pb-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">Single Sign On</h3>
              <p className="text-sm text-muted-foreground">
                Enable Microsoft Entra ID authentication
              </p>
            </div>
            <Switch checked={ssoEnabled} onCheckedChange={setSsoEnabled} />
          </div>

          {ssoEnabled && (
            <div className="space-y-4 mt-4 pl-4 border-l-2 border-primary">
              <div className="space-y-2">
                <label className="text-sm font-medium">Microsoft Entra ID</label>
                <p className="text-xs text-muted-foreground">
                  Configure your Azure AD integration
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Application ID</label>
                <Input
                  placeholder="Enter application ID"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Client Secret Key</label>
                <Input
                  type="password"
                  placeholder="Enter client secret key"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Azure AUD ID</label>
                <Input
                  placeholder="Enter Azure AUD ID"
                  value={azureAudId}
                  onChange={(e) => setAzureAudId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Azure Tenant ID</label>
                <Input
                  placeholder="Enter Azure Tenant ID"
                  value={azureTenantId}
                  onChange={(e) => setAzureTenantId(e.target.value)}
                />
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-sm font-medium">Group IDs</h4>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Admin group ID</label>
                  <Input
                    placeholder="Enter admin group ID"
                    value={adminGroupId}
                    onChange={(e) => setAdminGroupId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Recruiter group ID</label>
                  <Input
                    placeholder="Enter recruiter group ID"
                    value={recruiterGroupId}
                    onChange={(e) => setRecruiterGroupId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Tech Lead group ID</label>
                  <Input
                    placeholder="Enter tech lead group ID"
                    value={techLeadGroupId}
                    onChange={(e) => setTechLeadGroupId(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Basic Authentication Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">Basic Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Allow username and password authentication
              </p>
            </div>
            <Switch
              checked={basicAuthEnabled}
              onCheckedChange={setBasicAuthEnabled}
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
