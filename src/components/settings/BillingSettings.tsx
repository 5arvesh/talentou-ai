
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Mail, Search } from "lucide-react";

export function BillingSettings() {
  return (
    <>
      <div className="space-y-6">
        {/* Plan Information */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-medium">Free Trial</h2>
            <div className="mt-4">
              <Progress value={85} className="h-2 bg-gray-200" />
              <p className="text-sm mt-2 text-gray-600">
                1,061 Piqual AI credits left out of 1,000 available / 2 weeks
              </p>
            </div>
          </div>
          <Button className="hover:bg-emerald-700" variant="emerald">
            Change Plan
          </Button>
        </div>
        
        {/* Next Payment Information */}
        <div className="py-4">
          <p className="text-gray-700">
            The next payment of <span className="font-semibold">$0</span> will be charged on <span className="font-semibold">Mar 20, 2025</span>. The billing email is joseph.olassa@ignitho.com
          </p>
          
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Update Credit card
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Update email
            </Button>
          </div>
        </div>
        
        {/* Invoices & Receipts */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Invoice & Receipts (0)</h3>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Empty state */}
                <TableRow>
                  <TableCell colSpan={3} className="h-60">
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                      <Search className="h-10 w-10 text-gray-300 mb-3" />
                      <h4 className="text-lg font-medium">No invoice found</h4>
                      <p className="text-gray-500 mt-1">No Invoices Available – Check Back Later!</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
