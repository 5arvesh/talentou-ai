import { useState } from "react";
import { ArrowLeft, ChevronUp, ChevronDown, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";

export function CompanyDetail() {
  const navigate = useNavigate();
  const [companyFitmentOpen, setCompanyFitmentOpen] = useState(true);
  const [alignmentOpen, setAlignmentOpen] = useState(true);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(true);
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost"
            size="sm"
            className="bg-none"
            onClick={() => navigate("/database")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
          </Button>
          <h1 className="text-2xl font-semibold text-orange-500">Company Details</h1>
        </div>
        
        <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">🏢</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Company Name</span>
              </div>
              <p className="font-medium">FirstTrust Bank</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">🌐</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Headquarters</span>
              </div>
              <p className="font-medium">US East Coast - New York</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">👥</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Employee Size</span>
              </div>
              <p className="font-medium">1,000 - 5,000</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">🏭</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Industry</span>
              </div>
              <p className="font-medium">Banking</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">💰</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Revenue</span>
              </div>
              <p className="font-medium">$250 Million</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">⭐</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Company Fitment Score</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md">
                <div 
                  className="h-5 rounded-md bg-orange-500 text-xs text-white font-medium flex items-center justify-end pr-2"
                  style={{ width: "75%" }}
                >
                  750
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Fitment */}
        <Collapsible 
          open={companyFitmentOpen}
          onOpenChange={setCompanyFitmentOpen}
          className="border rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <h2 className="text-lg font-medium text-orange-500">Company Fitment</h2>
              {companyFitmentOpen ? 
                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                <ChevronDown className="h-5 w-5 text-gray-500" />
              }
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 bg-white dark:bg-gray-800">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Demonstrates a strong commitment to AI-driven digital transformation and data analytics.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Strategically aligns with the product's BFSI focus.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Banking operations complement the product's capabilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Revenue of $250 million falls within the optimal range.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Strong industry alignment indicates high collaboration potential.</span>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Alignment with the Company */}
        <Collapsible 
          open={alignmentOpen}
          onOpenChange={setAlignmentOpen}
          className="border rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <h2 className="text-lg font-medium text-orange-500">Alignment with the Company</h2>
              {alignmentOpen ? 
                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                <ChevronDown className="h-5 w-5 text-gray-500" />
              }
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 bg-white dark:bg-gray-800">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Specializes in banking, financial services, and customer engagement.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Recent initiatives include digital transformation, new financial products, and strategic partnerships.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Exploring AI for advanced financial planning and operational efficiency.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Focused on personalized banking solutions to enhance client connections.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>Key opportunity: Strengthening customer engagement in a rapidly evolving financial landscape.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 flex-shrink-0">+</span>
                <span>AI presents a chance to differentiate offerings with innovative, data-driven financial insights.</span>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Contact Details */}
        <Collapsible 
          open={contactDetailsOpen}
          onOpenChange={setContactDetailsOpen}
          className="border rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <h2 className="text-lg font-medium text-orange-500">Contact Details</h2>
              {contactDetailsOpen ? 
                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                <ChevronDown className="h-5 w-5 text-gray-500" />
              }
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="bg-white dark:bg-gray-800">
            <div className="px-4 pb-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">3 Contacts</span> added to the database
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Contact Name</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Designation</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Location</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        Buyer Intent Score
                        <span className="text-xxs font-normal">(Out of 1000)</span>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Outreach Status</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Read More</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-medium cursor-pointer" 
                        onClick={() => navigate(`/contact-detail/1`)}>
                      John Anderson
                    </td>
                    <td className="px-4 py-3">VP, Corporate Banking</td>
                    <td className="px-4 py-3">New York</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md">
                        <div 
                          className="h-5 rounded-md bg-green-500 text-xs text-white font-medium flex items-center justify-end pr-2"
                          style={{ width: "78%" }}
                        >
                          780
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">First Call</td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-8 w-8"
                        onClick={() => navigate(`/contact-detail/1`)}
                      >
                        <ArrowRightCircle className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-medium cursor-pointer" 
                        onClick={() => navigate(`/contact-detail/2`)}>
                      Sarah Mitchell
                    </td>
                    <td className="px-4 py-3">Director, Wealth Management</td>
                    <td className="px-4 py-3">New Jersey</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md">
                        <div 
                          className="h-5 rounded-md bg-orange-500 text-xs text-white font-medium flex items-center justify-end pr-2"
                          style={{ width: "65%" }}
                        >
                          650
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">Intro Mail</td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-8 w-8"
                        onClick={() => navigate(`/contact-detail/2`)}
                      >
                        <ArrowRightCircle className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-medium cursor-pointer" 
                        onClick={() => navigate(`/contact-detail/3`)}>
                      Kevin Roberts
                    </td>
                    <td className="px-4 py-3">Head of Commercial Lending</td>
                    <td className="px-4 py-3">New York</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md">
                        <div 
                          className="h-5 rounded-md bg-green-500 text-xs text-white font-medium flex items-center justify-end pr-2"
                          style={{ width: "72%" }}
                        >
                          720
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-8 w-8"
                        onClick={() => navigate(`/contact-detail/3`)}
                      >
                        <ArrowRightCircle className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="px-4 py-3 flex justify-between items-center text-sm">
              <div className="text-gray-500">
                Showing 1-3 of 3
              </div>
              
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 flex items-center justify-center"
                  disabled
                >
                  &lt;
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "h-8 w-8 p-0 flex items-center justify-center",
                    "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                  )}
                >
                  1
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 flex items-center justify-center"
                  disabled
                >
                  &gt;
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" className="text-gray-700 dark:text-gray-300">
            Suggest Feedback
          </Button>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Continue
          </Button>
        </div>
      </div>
    </Layout>
  );
}
