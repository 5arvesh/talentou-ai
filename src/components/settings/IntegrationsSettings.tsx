
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Search, Plus, X, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

type Integration = {
  id: string;
  name: string;
  icon: string;
};

type ConnectedIntegration = {
  id: string;
  name: string;
  icon: string;
  connections: number;
};

const integrationsList = [
  { id: "1", name: "Airtable", icon: "A", color: "#2D7FF9" },
  { id: "2", name: "Anthropic", icon: "An", color: "#000000" },
  { id: "3", name: "Apify", icon: "Ap", color: "#E41B13" },
  { id: "4", name: "Apollo", icon: "Ap", color: "#FFCD00" },
  { id: "5", name: "BetterContact", icon: "B", color: "#7B68EE" },
  { id: "6", name: "Bitly", icon: "Bi", color: "#EE6123" },
  { id: "7", name: "Brandfetch", icon: "Br", color: "#000000" },
  { id: "8", name: "Bright Data", icon: "BD", color: "#0099FF" },
  { id: "9", name: "BuiltWith", icon: "BW", color: "#006633" },
  { id: "10", name: "Captions", icon: "C", color: "#000000" },
  { id: "11", name: "Clay", icon: "Cl", color: "#0099FF" },
  { id: "12", name: "Clearbit", icon: "Cb", color: "#00C389" }
];

// const connectedIntegrations: ConnectedIntegration[] = [
//   { id: "1", name: "Alexa", icon: "A", connections: 1 },
//   { id: "2", name: "Anthropic", icon: "An", connections: 1 },
//   { id: "3", name: "BetterContact", icon: "B", connections: 1 },
//   { id: "4", name: "Brandfetch", icon: "Br", connections: 1 },
//   { id: "5", name: "Captions", icon: "C", connections: 1 },
// ];

export function IntegrationsSettings() {
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("my-accounts");
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Connected Accounts</h2>
        <Button 
          onClick={() => setIsIntegrationModalOpen(true)} 
          variant="emerald"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Integration
        </Button>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <div className="border-b mb-6">
          <TabsList className="bg-transparent p-0 gap-8">
            <TabsTrigger 
              value="my-accounts" 
              className="text-gray-500 data-[state=active]:text-brand-500 data-[state=active]:border-b-2 data-[state=active]:border-brand-500 rounded-none px-0 pb-2"
            >
              My Accounts
            </TabsTrigger>
            <TabsTrigger 
              value="piqual-accounts" 
              className="text-gray-500 data-[state=active]:text-brand-500 data-[state=active]:border-b-2 data-[state=active]:border-brand-500 rounded-none px-0 pb-2"
            >
              Piqual-provided Accounts
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="my-accounts" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                className="pl-10"
                placeholder="Search"
                type="search"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <span>Name</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="connections">Connections</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* {connectedIntegrations.length > 0 ? (
            <div className="space-y-3">
              {connectedIntegrations.map((integration) => (
                <div 
                  key={integration.id} 
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-gray-700 dark:bg-gray-600">
                      {integration.icon}
                    </div>
                    <span className="font-medium">{integration.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold">{integration.connections}</div>
                      <div className="text-sm text-gray-500">Connection</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="bg-white dark:bg-gray-800 border-dashed border-2 py-12">
              <CardContent className="flex flex-col items-center justify-center text-center p-6">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M9 2 L15 2 L15 7 L9 7 L9 2 Z"/>
                    <path d="M8 11 L16 11 L16 22 L8 22 L8 11 Z"/>
                    <path d="M9.5 16.5 L14.5 16.5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Add a connection!</h3>
                <p className="text-gray-500 mb-4">
                  No connected accounts found for the selected filters.<br />
                  Add one to get started!
                </p>
              </CardContent>
            </Card>
          )} */}
        </TabsContent>
        
        <TabsContent value="piqual-accounts" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                className="pl-10"
                placeholder="Search"
                type="search"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <span>Name</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="connections">Connections</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* {connectedIntegrations.length > 0 ? (
            <div className="space-y-3">
              {connectedIntegrations.map((integration) => (
                <div 
                  key={integration.id} 
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-gray-700 dark:bg-gray-600">
                      {integration.icon}
                    </div>
                    <span className="font-medium">{integration.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold">{integration.connections}</div>
                      <div className="text-sm text-gray-500">Connection</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="bg-white dark:bg-gray-800 border-dashed border-2 py-12">
              <CardContent className="flex flex-col items-center justify-center text-center p-6">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M9 2 L15 2 L15 7 L9 7 L9 2 Z"/>
                    <path d="M8 11 L16 11 L16 22 L8 22 L8 11 Z"/>
                    <path d="M9.5 16.5 L14.5 16.5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Add a connection!</h3>
                <p className="text-gray-500 mb-4">
                  No connected accounts found for the selected filters.<br />
                  Add one to get started!
                </p>
              </CardContent>
            </Card>
          )} */}
        </TabsContent>
      </Tabs>
      
      {/* Connect Integration Modal */}
      <Dialog open={isIntegrationModalOpen} onOpenChange={setIsIntegrationModalOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2 border-b">
            <DialogTitle className="text-xl">Connect an account</DialogTitle>
          </DialogHeader>
          
          <div className="px-6 py-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                placeholder="Search" 
                className="pl-10" 
              />
            </div>
          </div>
          
          <ScrollArea className="overflow-y-auto max-h-[400px]">
            {integrationsList.map((integration) => (
              <div 
                key={integration.id} 
                className="flex items-center justify-between p-4 px-6 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-md flex items-center justify-center text-white"
                    style={{ backgroundColor: integration.color }}
                  >
                    {integration.icon}
                  </div>
                  <span>{integration.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </ScrollArea>
          
          <button 
            onClick={() => setIsIntegrationModalOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            type="button"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
