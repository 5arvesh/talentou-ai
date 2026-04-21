
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ThemeSettings() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("Ignitho Technologies");
  const [logo, setLogo] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#7E00FC");
  const [secondaryColor, setSecondaryColor] = useState("#0a92ff");
  const [tertiaryColor, setTertiaryColor] = useState("#56BB6B");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteLogo = () => {
    setLogo(null);
    toast.success("Logo deleted successfully");
  };

  const handleSaveTheme = () => {
    toast.success("Theme settings saved successfully");
  };

  const handleResetColors = () => {
    setPrimaryColor("#009872");
    setSecondaryColor("#FF7D34");
    setTertiaryColor("#56BB6B");
    toast.success("Colors reset to default");
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Settings Section */}
      <div className="w-full md:w-2/3 space-y-6">
        {/* Company Name Section */}
        <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Company Name</h2>
          <p className="text-sm text-gray-500 mb-4">The company name associated with this account</p>
          <div className="flex items-center gap-3 max-w-lg">
            <span className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2"><path d="M6 22V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v20" /><path d="M2 22h19" /><path d="M3 10h7" /><path d="M3 6h7" /><path d="M3 14h7" /><path d="M3 18h8" /></svg>
            </span>
            <Input 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              className="flex-1"
            />
          </div>
        </div>

        {/* Company Logo Section */}
        <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Company Logo</h2>
          <p className="text-sm text-gray-500 mb-4">Supported formats: JPG, PNG. Maximum size: 2MB.</p>
          
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
              {logo ? (
                <img src={logo} alt="Company Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-16 h-16">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8.5 8.5v7l7-3.5-7-3.5z" /></svg>
                </div>
              )}
              <label 
                htmlFor="logo-upload"
                className="absolute right-0 bottom-0 bg-brand-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" /></svg>
              </label>
              <input 
                id="logo-upload"
                type="file"
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>

            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={handleDeleteLogo}
              disabled={!logo}
            >
              Delete Logo
            </Button>
          </div>
        </div>

        {/* Theme Color Section */}
        <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-6">Theme Color</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Primary Color</p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <Input 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-28"
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Secondary Color</p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: secondaryColor }}
                ></div>
                <Input 
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-28"
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Tertiary Color</p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: tertiaryColor }}
                ></div>
                <Input 
                  value={tertiaryColor}
                  onChange={(e) => setTertiaryColor(e.target.value)}
                  className="w-28"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button 
              className="hover:bg-emerald-700"
              onClick={handleSaveTheme}
              variant="emerald"
            >
              Save
            </Button>
            <Button 
              variant="outline"
              onClick={handleResetColors}
              className="flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m21.5 2-1.5 1.5" /><path d="M15.5 7.5 14 9" /><path d="M10.5 2.5 9 4" /><path d="m2 12 10 10c.5.5 1.5 1 2.5 1h5c1 0 2-.5 2.5-1l1-1c.5-.5 1-1.5 1-2.5v-5c0-1-.5-2-1-2.5L13 2" /><path d="M10.5 8.5 16 14" /><path d="M15 5.5 18.5 9" /><path d="M7.5 11.5 14 18" /><path d="M9 13c-2 0-4-1-5-2-1-1-2-3.5-2-6" /></svg>
              Reset Colors
            </Button>
          </div>
        </div>
      </div>

      {/* Right Preview Section */}
      <div className="w-full md:w-1/3">
        <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm h-full">
          <h2 className="text-lg font-medium mb-4">Preview</h2>
          
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between pb-4 border-b mb-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span className="font-bold text-xs">AI</span>
                </div>
                <span className="font-medium">{companyName.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">1</div>
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center">
                  <span className="font-medium text-sm">JO</span>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex flex-col">
              <div 
                className="w-full h-1.5 mb-4"
                style={{ backgroundColor: primaryColor }}
              ></div>
              
              <h3 className="text-base font-medium mb-1">Hi Roney Soloman👋</h3>
              
              <p className="text-sm text-gray-500 mb-3">
                Welcome to your launchpad! Define a winning message, lock in your ICP, set the right media mix, and track success with precision.
              </p>
              
              <div className="text-sm font-medium mb-3">
                As a Sales leader, you need to create a sales plan
              </div>
              
              <div className="border rounded-md p-3 mb-2 flex">
                <div 
                  className="w-10 h-10 rounded-md flex items-center justify-center mr-3"
                  style={{ backgroundColor: secondaryColor }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" /></svg>
                </div>
                <div>
                  <h4 className="font-medium">Message / USP</h4>
                  <div className="text-xs text-gray-500">Your unique edge deserves the spotlight.</div>
                  <button 
                    className="mt-2 px-3 py-1 rounded text-xs text-white flex items-center"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Start Now
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
