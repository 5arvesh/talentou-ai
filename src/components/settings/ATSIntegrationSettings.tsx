import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Upload, Download } from "lucide-react";

const connectedATS = [
  { id: 1, name: "Talentou ATS", status: "connected" },
  { id: 2, name: "Open Cats", status: "disconnected" },
];

const comingSoonATS = [
  "Bullhorn",
  "BambooHR",
  "Freshteam",
  "Zapier",
  "Zoho",
  "Make",
  "Connect to database",
  "Unlock ATS Integration",
];

export function ATSIntegrationSettings() {
  const handleConnect = (atsName: string) => {
    toast.info(`Connecting to ${atsName}...`);
  };

  const handleUpload = (type: string) => {
    toast.info(`Upload ${type} spreadsheet`);
  };

  const handleDownload = (type: string) => {
    toast.info(`Download ${type} template`);
  };

  return (
    <div className="space-y-6">
      {/* ATS Connection Section */}
      <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">ATS Integration</h2>
          <p className="text-sm text-muted-foreground">
            Connect to your Applicant Tracking System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectedATS.map((ats) => (
            <Card key={ats.id}>
              <CardHeader>
                <CardTitle className="text-base">{ats.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {ats.status === "connected" ? (
                  <Badge className="bg-emerald-600 hover:bg-emerald-700">Connected</Badge>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleConnect(ats.name)}
                  >
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Import Data Section */}
      <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Import Data</h2>
          <p className="text-sm text-muted-foreground">
            Upload data from spreadsheets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Job Order</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpload("Job Order")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Spreadsheet
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload("Job Order")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Candidate List</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpload("Candidate List")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Spreadsheet
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload("Candidate List")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
          <p className="text-sm text-muted-foreground">
            More ATS integrations are on the way
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {comingSoonATS.map((ats, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-center">{ats}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex justify-center">
                <Badge variant="secondary" className="text-xs">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
