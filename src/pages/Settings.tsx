import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Pencil, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsNav } from "@/components/settings/SettingsNav";
import { ThemeSettings } from "@/components/settings/ThemeSettings";
import { MembersSettings } from "@/components/settings/MembersSettings";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { CreditUsageSettings } from "@/components/settings/CreditUsageSettings";
import { ReferralsSettings } from "@/components/settings/ReferralsSettings";
import { InterviewSettings } from "@/components/settings/InterviewSettings";
import { EmailTemplatesSettings } from "@/components/settings/EmailTemplatesSettings";
import { ATSIntegrationSettings } from "@/components/settings/ATSIntegrationSettings";
import { AuthenticationSettings } from "@/components/settings/AuthenticationSettings";
import { PolicyDocumentSettings } from "@/components/settings/PolicyDocumentSettings";
import { LicenseSettings } from "@/components/settings/LicenseSettings";
import { useLocation, useNavigate } from "react-router-dom";

const Settings = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isThemePage = currentPath === "/settings/theme";
  const isMembersPage = currentPath === "/settings/members";
  const isIntegrationsPage = currentPath === "/settings/integrations";
  const isBillingPage = currentPath === "/settings/billing";
  const isCreditUsagePage = currentPath === "/settings/credit";
  const isReferralsPage = currentPath === "/settings/referrals";
  const isInterviewPage = currentPath === "/settings/interview";
  const isEmailTemplatesPage = currentPath === "/settings/email-templates";
  const isATSIntegrationPage = currentPath === "/settings/ats-integration";
  const isAuthenticationPage = currentPath === "/settings/authentication";
  const isPolicyPage = currentPath === "/settings/policy";
  const isLicensePage = currentPath === "/settings/license";
  
  const detailsForm = useForm({
    defaultValues: {
      name: "Roney Soloman",
      email: "joseph.olassa@ignitho.com"
    },
  });

  const signatureForm = useForm({
    defaultValues: {
      signature: `Regards,\n\nRoney Soloman | Associate Lead - Marketing\nPh: +91 9504506328 | e-mail: joseph.olassa@ignitho.com\nBase Location Office Address: 7th floor, Tecci Park, 285, Elcot Sez, Sholinganallur, Chennai`
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.error("Only JPG and PNG files are allowed");
      return;
    }

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePicture = () => {
    setProfileImage(null);
    toast.success("Profile picture deleted");
  };

  const handleSaveDetails = () => {
    toast.success("Details saved successfully");
  };

  const handleSaveSignature = () => {
    toast.success("Signature saved successfully");
  };

  // If we're on the theme page, render the ThemeSettings component
  if (isThemePage) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-4rem)] w-full">
          <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              <h1 className="text-2xl font-semibold mb-6">Settings</h1>
              <SettingsNav />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
            <div className="p-6 max-w-6xl">
              <ThemeSettings />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If we're on the members page, render the MembersSettings component
  if (isMembersPage) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-4rem)] w-full">
          <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              <h1 className="text-2xl font-semibold mb-6">Settings</h1>
              <SettingsNav />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
            <div className="p-6 max-w-6xl">
              <MembersSettings />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If we're on the integrations page, render the IntegrationsSettings component
  if (isIntegrationsPage) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-4rem)] w-full">
          <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              <h1 className="text-2xl font-semibold mb-6">Settings</h1>
              <SettingsNav />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
            <div className="p-6 max-w-6xl">
              <IntegrationsSettings />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If we're on the credit usage page, render the CreditUsageSettings component
  if (isCreditUsagePage) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-4rem)] w-full">
          <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              <h1 className="text-2xl font-semibold mb-6">Settings</h1>
              <SettingsNav />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
            <div className="p-6 max-w-6xl">
              <CreditUsageSettings />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If we're on the email templates page
  if (isEmailTemplatesPage) {
    return (
      <Layout>
        <div className="flex h-[calc(100vh-4rem)] w-full">
          <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              <h1 className="text-2xl font-semibold mb-6">Settings</h1>
              <SettingsNav />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
            <div className="p-6 max-w-6xl">
              <EmailTemplatesSettings />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Default settings page (Account)
  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>
            <SettingsNav />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="p-6 max-w-6xl">
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

              {/* Your Details Tab Content */}
              <TabsContent value="details" className="space-y-8">
                {/* Profile Picture Section */}
                <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
                  <h2 className="text-lg font-medium mb-2">Profile Picture</h2>
                  <p className="text-sm text-gray-500 mb-4">Supported formats: JPG, PNG. Maximum size: 2MB.</p>
                  
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-2 border-gray-200">
                        <AvatarImage src={profileImage || ""} />
                        <AvatarFallback className="bg-gray-200 text-gray-500 text-xl">
                          JO
                        </AvatarFallback>
                      </Avatar>
                      <label 
                        htmlFor="profile-picture" 
                        className="absolute -right-2 -bottom-2 h-8 w-8 bg-brand-500 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <Pencil className="h-4 w-4 text-white" />
                      </label>
                      <input
                        id="profile-picture"
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={handleDeletePicture}
                      disabled={!profileImage}
                    >
                      Delete Picture
                    </Button>
                  </div>
                </div>

                {/* Name and Email Section */}
                <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
                  <Form {...detailsForm}>
                    <div className="space-y-6">
                      {/* Name Field */}
                      <div>
                        <h2 className="text-lg font-medium mb-2">Name</h2>
                        <p className="text-sm text-gray-500 mb-4">The name associated with this account</p>
                        <FormField
                          control={detailsForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} className="max-w-md" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Email Field */}
                      <div>
                        <h2 className="text-lg font-medium mb-2">Email</h2>
                        <p className="text-sm text-gray-500 mb-4">The email address associated with this account</p>
                        <FormField
                          control={detailsForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} className="max-w-md" type="email" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        variant="default"
                        onClick={handleSaveDetails}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                </div>

                {/* Signature Section */}
                <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
                  <Form {...signatureForm}>
                    <div>
                      <h2 className="text-lg font-medium mb-4">Signature</h2>
                      
                      <FormField
                        control={signatureForm.control}
                        name="signature"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <textarea
                                {...field}
                                className="w-full min-h-[180px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-4">
                        <Button 
                          variant="default"
                          onClick={handleSaveSignature}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white mt-4"
                        >
                          Save Signature
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </TabsContent>

              {/* Security Tab Content */}
              <TabsContent value="security">
                <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Password Settings</h2>
                  <p className="text-gray-500 mb-6">Manage your account password and security preferences.</p>
                  
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Change Password
                  </Button>
                </div>
              </TabsContent>

              {/* API Key Tab Content */}
              <TabsContent value="api">
                <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
                  <h2 className="text-lg font-medium mb-4">API Access</h2>
                  <p className="text-gray-500 mb-6">Manage your API keys for third-party integrations.</p>
                  
                  <div className="flex flex-col space-y-4 max-w-md">
                    <Input value="api_123456789abcdefghijklmno" readOnly className="font-mono" />
                    <div className="flex gap-4">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Generate New Key
                      </Button>
                      <Button variant="outline">
                        Copy Key
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
