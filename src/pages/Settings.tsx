import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { ThemeSettings } from "@/components/settings/ThemeSettings";
import { MembersSettings } from "@/components/settings/MembersSettings";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { CreditUsageSettings } from "@/components/settings/CreditUsageSettings";
import { ReferralsSettings } from "@/components/settings/ReferralsSettings";
import { InterviewSettings } from "@/components/settings/InterviewSettings";
import { JobFitScoreSettings } from "@/components/settings/JobFitScoreSettings";
import { EmailTemplatesSettings } from "@/components/settings/EmailTemplatesSettings";
import { ATSIntegrationSettings } from "@/components/settings/ATSIntegrationSettings";
import { AuthenticationSettings } from "@/components/settings/AuthenticationSettings";
import { PolicyDocumentSettings } from "@/components/settings/PolicyDocumentSettings";
import { LicenseSettings } from "@/components/settings/LicenseSettings";
import { useLocation } from "react-router-dom";

const subPages: Record<string, React.ReactNode> = {
  "/settings/theme": <ThemeSettings />,
  "/settings/members": <MembersSettings />,
  "/settings/integrations": <IntegrationsSettings />,
  "/settings/billing": <BillingSettings />,
  "/settings/credit": <CreditUsageSettings />,
  "/settings/referrals": <ReferralsSettings />,
  "/settings/email-templates": <EmailTemplatesSettings />,
  "/settings/ats-integration": <ATSIntegrationSettings />,
  "/settings/authentication": <AuthenticationSettings />,
  "/settings/policy": <PolicyDocumentSettings />,
  "/settings/license": <LicenseSettings />,
};

const narrowPages = new Set(["/settings/interview", "/settings/job-fit-score"]);

const Settings = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const detailsForm = useForm({
    defaultValues: { name: "Roney Soloman", email: "joseph.olassa@ignitho.com" },
  });

  const signatureForm = useForm({
    defaultValues: {
      signature: `Regards,\n\nRoney Soloman | Associate Lead - Marketing\nPh: +91 9504506328 | e-mail: joseph.olassa@ignitho.com\nBase Location Office Address: 7th floor, Tecci Park, 285, Elcot Sez, Sholinganallur, Chennai`,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.error("Only JPG and PNG files are allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Narrow-width sub-pages (interview, job fit)
  if (currentPath === "/settings/interview") {
    return <SettingsLayout maxWidth="max-w-3xl"><InterviewSettings /></SettingsLayout>;
  }
  if (currentPath === "/settings/job-fit-score") {
    return <SettingsLayout maxWidth="max-w-3xl"><JobFitScoreSettings /></SettingsLayout>;
  }

  // Standard-width sub-pages
  const subPage = subPages[currentPath];
  if (subPage) {
    return <SettingsLayout>{subPage}</SettingsLayout>;
  }

  // Default: Account page
  return (
    <SettingsLayout>
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6 border-b w-full rounded-none bg-transparent justify-start space-x-8 px-0">
          <TabsTrigger
            value="details"
            className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-brand-500 data-[state=inactive]:text-gray-500"
          >
            Your Details
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-brand-500 data-[state=inactive]:text-gray-500"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-brand-500 data-[state=inactive]:text-gray-500"
          >
            API Key
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-2">Profile Picture</h2>
            <p className="text-sm text-gray-500 mb-4">Supported formats: JPG, PNG. Maximum size: 2MB.</p>
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-gray-200">
                  <AvatarImage src={profileImage || ""} />
                  <AvatarFallback className="bg-gray-200 text-gray-500 text-xl">JO</AvatarFallback>
                </Avatar>
                <label htmlFor="profile-picture" className="absolute -right-2 -bottom-2 h-8 w-8 bg-brand-500 rounded-full flex items-center justify-center cursor-pointer">
                  <Pencil className="h-4 w-4 text-white" />
                </label>
                <input id="profile-picture" type="file" accept="image/jpeg, image/png" className="hidden" onChange={handleImageUpload} />
              </div>
              <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" onClick={() => { setProfileImage(null); toast.success("Profile picture deleted"); }} disabled={!profileImage}>
                Delete Picture
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
            <Form {...detailsForm}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-2">Name</h2>
                  <p className="text-sm text-gray-500 mb-4">The name associated with this account</p>
                  <FormField control={detailsForm.control} name="name" render={({ field }) => (
                    <FormItem><FormControl><Input {...field} className="max-w-md" /></FormControl></FormItem>
                  )} />
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-2">Email</h2>
                  <p className="text-sm text-gray-500 mb-4">The email address associated with this account</p>
                  <FormField control={detailsForm.control} name="email" render={({ field }) => (
                    <FormItem><FormControl><Input {...field} className="max-w-md" type="email" /></FormControl></FormItem>
                  )} />
                </div>
                <Button variant="default" onClick={() => toast.success("Details saved successfully")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Save
                </Button>
              </div>
            </Form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
            <Form {...signatureForm}>
              <div>
                <h2 className="text-lg font-medium mb-4">Signature</h2>
                <FormField control={signatureForm.control} name="signature" render={({ field }) => (
                  <FormItem><FormControl>
                    <textarea {...field} className="w-full min-h-[180px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </FormControl></FormItem>
                )} />
                <Button variant="default" onClick={() => toast.success("Signature saved successfully")} className="bg-emerald-600 hover:bg-emerald-700 text-white mt-4">
                  Save Signature
                </Button>
              </div>
            </Form>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-4">Password Settings</h2>
            <p className="text-gray-500 mb-6">Manage your account password and security preferences.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Change Password</Button>
          </div>
        </TabsContent>

        <TabsContent value="api">
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-4">API Access</h2>
            <p className="text-gray-500 mb-6">Manage your API keys for third-party integrations.</p>
            <div className="flex flex-col space-y-4 max-w-md">
              <Input value="api_123456789abcdefghijklmno" readOnly className="font-mono" />
              <div className="flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Generate New Key</Button>
                <Button variant="outline">Copy Key</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </SettingsLayout>
  );
};

export default Settings;
