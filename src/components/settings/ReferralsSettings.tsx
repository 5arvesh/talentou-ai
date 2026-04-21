
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Copy, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ReferralsSettings() {
  return (
    <>
      <div className="space-y-6">
        {/* Referral Information */}
        <div className="mb-6">
          <p className="text-gray-700 mb-1">
            Invite your friends to use Piqual AI! Share your referral link with your friends. When they sign up and activate a <span className="font-semibold">paying</span> workspace, you'll both earn <span className="font-semibold">3,000</span> Piqual AI credits!
          </p>
          
          <div className="flex mt-4">
            <input 
              type="text" 
              value="https://piqualai.com?via=f22993" 
              readOnly
              className="flex-1 rounded-l-md border border-r-0 px-3 py-2 text-sm"
            />
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-l-none flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md p-6 flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Leads</h3>
              <p className="text-3xl font-semibold">0</p>
            </div>
          </div>
          
          <div className="border rounded-md p-6 flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Converted Users</h3>
              <p className="text-3xl font-semibold">0</p>
            </div>
          </div>
          
          <div className="border rounded-md p-6 flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Credits Earned</h3>
              <p className="text-3xl font-semibold">0</p>
            </div>
          </div>
        </div>
        
        {/* Referrals Table */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Referral type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All referrals</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">1-0 of result</span>
              <div className="flex">
                <Button variant="outline" size="icon" className="rounded-r-none">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-l-none">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Empty State */}
          <div className="border rounded-md p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <svg className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Invite your friends!</h3>
              <p className="text-gray-500 max-w-md">
                No users have joined using your referral link yet.
                <br />
                Share it with your friends to earn rewards!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
