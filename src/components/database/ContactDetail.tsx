
import { useState } from "react";
import { ArrowLeft, Eye, Phone, Mail, Linkedin, MapPin, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";

export function ContactDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [insightOpen, setInsightOpen] = useState(true);
  
  // Hardcoded contact data based on id
  const contactData = {
    name: id === "1" ? "John Anderson" : id === "2" ? "Sarah Mitchell" : "Kevin Roberts",
    designation: id === "1" ? "VP, Corporate Banking" : id === "2" ? "Director, Wealth Management" : "Head of Commercial Lending",
    location: id === "1" ? "New York" : id === "2" ? "New Jersey" : "New York",
    company: "FirstTrust Bank",
    email: id === "1" ? "john.anderson@ftbank.com" : id === "2" ? "sarah.mitchell@firsttrust.com" : "kevin.roberts@firsttrust.com",
    phone: id === "1" ? "+1 (212) 555-7890" : id === "2" ? "+1 (201) 555-4321" : "+1 (212) 555-9876",
    buyerIntent: id === "1" ? 780 : id === "2" ? 650 : 720,
    outreachStatus: id === "1" ? "First Call" : id === "2" ? "Intro Mail" : "-",
    linkedIn: id === "1" ? "linkedin.com/in/janderson" : id === "2" ? "linkedin.com/in/smitchell" : "linkedin.com/in/kroberts",
    workPhone: id === "1" ? "+1-212-555-1234" : id === "2" ? "+1-201-555-8765" : "+1-212-555-6543",
    personalPhone: id === "1" ? "+1-973-555-5678" : id === "2" ? "+1-973-555-2468" : "+1-973-555-9753",
    companyPhone: id === "1" ? "+1-415-555-7890" : id === "2" ? "+1-415-555-1357" : "+1-415-555-3579",
  };
  
  const getIntentColor = (score: number) => {
    if (score >= 700) return "bg-green-500";
    if (score >= 500) return "bg-orange-500";
    return "bg-red-500";
  };
  
  const timelineEvents = [
    {
      date: "3 Mar 24",
      status: "Intro email",
      description: "First introduction email was sent.",
      stats: "Open:2 ; Clicks:3",
      color: "bg-green-100"
    },
    {
      date: "10 Mar 24",
      status: "Follow-up email 1",
      description: "Follow-up email was sent to re-engage.",
      stats: "Open:0 ; Clicks:0",
      color: "bg-green-100"
    },
    {
      date: "17 Mar 24",
      status: "Send Connection Request",
      description: "Connection request was sent on LinkedIn.",
      stats: "",
      color: "bg-orange-100"
    },
    {
      date: "21 Mar 24",
      status: "Message/InMail",
      description: "LinkedIn message was sent to continue engagement.",
      stats: "",
      color: "bg-orange-100"
    },
    {
      date: "26 Mar 24",
      status: "First Call",
      description: "Initial call was completed with the prospect.",
      stats: "",
      color: "bg-green-100"
    }
  ];
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost"
              size="sm" 
              className="bg-none"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
            </Button>
            <h1 className="text-2xl font-semibold text-orange-500">Contact Details</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Contact Information */}
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 text-green-600">👤</div>
                    <div>
                      <p className="text-gray-500 text-sm">Contact Name</p>
                      <p className="font-medium text-lg">{contactData.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 text-green-600">🏢</div>
                    <div>
                      <p className="text-gray-500 text-sm">Company Name</p>
                      <p className="font-medium">{contactData.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 text-green-600">🔖</div>
                    <div>
                      <p className="text-gray-500 text-sm">Designation</p>
                      <p className="font-medium">{contactData.designation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 text-green-600"><MapPin size={16} /></div>
                    <div>
                      <p className="text-gray-500 text-sm">Location</p>
                      <p className="font-medium">{contactData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 text-emerald-600">⭐</div>
                    <div className="flex-1">
                      <p className="text-gray-500 text-sm">Buyer Intent Score</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md mt-1">
                        <div 
                          className={cn(
                            "h-6 rounded-md text-xs text-white font-medium flex items-center justify-end px-2",
                            getIntentColor(contactData.buyerIntent)
                          )}
                          style={{ width: `${(contactData.buyerIntent / 1000) * 100}%` }}
                        >
                          {contactData.buyerIntent}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 text-blue-600"><Mail size={16} /></div>
                    <div>
                      <p className="text-gray-500 text-sm">Email ID</p>
                      <p className="font-medium text-blue-600">{contactData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 text-blue-600"><Linkedin size={16} /></div>
                    <div>
                      <p className="text-gray-500 text-sm">LinkedIn Profile</p>
                      <p className="font-medium text-blue-600">{contactData.linkedIn}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 text-blue-600"><Phone size={16} /></div>
                    <div className="w-full">
                      <p className="text-gray-500 text-sm">Contact Number</p>
                      <div className="space-y-2 mt-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Work</span>
                          <span className="font-medium">{contactData.workPhone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Personal</span>
                          <span className="font-medium">{contactData.personalPhone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Company</span>
                          <span className="font-medium">{contactData.companyPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Right Column - Outreach Timeline */}
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-orange-500 mb-4">Outreach Timeline</h2>
                
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`${event.color} text-sm py-1 px-2 rounded-md font-medium`}>
                          {event.date}
                        </div>
                        {index < timelineEvents.length - 1 && (
                          <div className="w-px h-full bg-gray-200 my-1"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{event.status}</h3>
                          <Eye className="h-4 w-4 text-gray-500" />
                        </div>
                        <p className="text-gray-600 mt-1">{event.description}</p>
                        {event.stats && (
                          <p className="text-gray-500 text-sm mt-1">{event.stats}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Insight Panel */}
            <Card className="border shadow-sm lg:col-span-2">
              <CardContent className="p-6">
                <Collapsible open={insightOpen} onOpenChange={setInsightOpen}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-orange-500">Contact Insight</h2>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                        {insightOpen ? 
                          <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        }
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <span className="text-green-500 flex-shrink-0">+</span>
                        <span>Strong interest in financial innovation and digital transformation in banking.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-green-500 flex-shrink-0">+</span>
                        <span>Actively engages with fintech advancements, AI-driven solutions, and strategic banking partnerships.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-green-500 flex-shrink-0">+</span>
                        <span>Focuses on leveraging technology to enhance corporate banking operations.</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between mt-2 sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t">
            <Button variant="outline" className="text-gray-700 dark:text-gray-300">
              Suggest Feedback
            </Button>
            
            <Button variant="emerald">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
