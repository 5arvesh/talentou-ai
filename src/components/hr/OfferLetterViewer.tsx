import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Printer } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  role: string;
  salary?: string;
  startDate?: string;
  offerLetterContent?: string;
}

// Mock data - in a real app, this would come from your data source
const candidates: Candidate[] = [
  {
    id: "1",
    name: "Reshma Hariharan",
    role: "Product - Owner Intern",
    salary: "$25,000",
    startDate: "September 03, 2025",
    offerLetterContent: "Product Owner Intern offer letter"
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Product Manager",
    salary: "$140,000",
    startDate: "February 15, 2024",
    offerLetterContent: "Product Manager offer letter"
  },
  // Add other candidates as needed
];

export function OfferLetterViewer() {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  
  const candidate = candidates.find(c => c.id === candidateId);

  if (!candidate || !candidate.offerLetterContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <CardContent>
            <p className="text-center text-muted-foreground">Offer letter not found</p>
            <Button 
              onClick={() => navigate('/hr/candidates')} 
              className="mt-4 w-full"
            >
              Back to Candidates
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Download functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-6 print:hidden">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/hr/candidates')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Candidates
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Offer Letter Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-lg print:shadow-none">
          <CardContent className="p-12">
            {/* Header with Logo */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-purple-600 mb-8">Talentou</h1>
              
              <div className="space-y-1 text-sm">
                <p><strong>September 01, 2025</strong></p>
                <p><strong>Reshma Hariharan</strong></p>
                <p>Plot no.3, Door No.8,</p>
                <p>Srinagar Colony, West Mambalam,</p>
                <p>Chennai - 600 042.</p>
                <p><strong>Contact:</strong> +91 7358500452 / rh.reshmadhu@gmail.com</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 text-sm leading-relaxed">
              <div className="text-center">
                <h2 className="font-bold text-lg underline mb-6">INTERNSHIP OFFER & AGREEMENT</h2>
              </div>

              <p>
                Welcome to Nuuvio Ventures India Private Limited, where we distinguish between routine work
                and the chance for real impact. We are thrilled to have you on our team as we work with impact
                enterprises forward in the digital economy with our cutting-edge technological solutions. Your
                role will be with Talentou, one of our esteemed portfolio companies under Nuuvio Ventures. Get
                ready to make a difference and be a part of our exciting journey!
              </p>

              <p>
                With reference to your application and the subsequent discussions you had with us, we take pleasure
                in offering an internship on the following terms and conditions:
              </p>

              <div className="space-y-3">
                <div>
                  <span className="font-bold">1.</span> Your joining date is <strong>September 03, 2025</strong> as a <strong>Product – owner intern</strong>. The offer letter will be
                  under <strong>Talentou</strong>.
                </div>
                
                <div>
                  <span className="font-bold">2.</span> The internship will last <strong>3 months</strong>, and it is <strong>unpaid</strong>, with a chance of extension or reduction
                  through formal notice.
                </div>
                
                <div>
                  <span className="font-bold">3.</span> You must sign an <strong>NDA</strong> and use your <strong>personal devices</strong> (laptop, phone, camera). Work mode is
                  <strong>hybrid</strong>.
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base">1. NON-COMPETITION AND NON-SOLICITATION:</h3>
                <p>
                  The Intern agrees that during the term of employment with the company and for a period of
                  eighteen (18) months following the termination of relationship with the company, for
                  any reason, whether with or without good cause or for any or no cause, at the option either of the
                  Company or self, with or without notice, will not, without the prior written consent of the Company,
                  directly or indirectly, on your own behalf or on behalf of or in conjunction with any other legal
                  entity:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Serve as a partner, consultant, officer, director, manager, agent, investor, or otherwise design,
                    finance, acquire, lease, operate, manage, invest in or consult for or advise any entity engaged in
                    any business in competition with or otherwise similar to the Company's business.
                  </li>
                  <li>
                    Recruit, solicit, or induce, or attempt to recruit, solicit, or induce, any employee of the
                    Company with whom you had personal contact or supervised while performing your Job
                    Duties, to terminate their employment relationship with the Company.
                  </li>
                  <li>
                    Contact any of the existing or prospective clients of the Company, to entice such clients away
                    from the Company or to damage their business relationship with the Company in any way.
                  </li>
                  <li>
                    Business of the company means the highly competitive business of digital technology solutions
                    which may include, without limitation, the services, products & platforms.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base">2. CONFIDENTIALITY:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    The Intern shall not disclose, any time, to any Person or Competitor who is not employed, part
                    of or associated with the Company; or use for any purpose that is not within the scope of his/her
                    services, any Confidential Information, except in accordance with any written exception made
                    by the Company.
                  </li>
                  <li>
                    Notwithstanding the aforesaid provisions of this Section, the Intern may disclose Confidential
                    Information when compelled to do so, by any government, judicial or quasi- judicial authority.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base">3. INTELLECTUAL PROPERTY:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    All intellectual property rights in, India and abroad, for the full term of such rights, in any work
                    (as defined under the Copyright Act, 1957 and amended from time to time) or other
                    matters including but not limited to, documents, computer software and databases or papers,
                    or any work including (improvements) conceived/created/ made fully or in part (whether
                    not during regular office/business hours) by the Intern during the period of employment with
                    the Company shall and be vested in and be the sole and exclusive property of the
                    Company and shall be disclosed in writing promptly to the Company. The Intern shall also at
                    the cost of the Company execute and register, all documents required, statutorily or otherwise
                    by the Company, to further confirm the above ownership rights in favour of the Company.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base">4. USE AND RETURN OF COMPANY PROPERTY:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    The Intern is trusted to behave responsibly and use good judgment to conserve company
                    resources. Company resources, including time, material, equipment, and information should
                    be utilized for company use only.
                  </li>
                  <li>
                    By the Termination Date, the Intern agrees to return all Company documents (and all copies
                    thereof) and Company property that you have had in your possession at any time,
                    including, but not limited to, Company files, notes, drawings, records, business plans and
                    forecasts, financial information, specifications, computer-recorded information, tangible
                    property including, but not limited to, the laptop computer issued to you by the Company;
                    credit cards, entry cards, identification badges, and keys; and, any materials of any kind that
                    contain or embody any proprietary or confidential information of the Company (and all
                    reproductions thereof).
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base">5. TERMINATION OF INTERNSHIP:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    The Company may terminate the Internship with the Intern under this Agreement, with
                    immediate effect, in the event of misconduct, or fraudulent, dishonest, or unethical
                    conduct of the Intern, or conviction of the Intern for any offense involving moral turpitude, or
                    breach of any terms of this Agreement or Rules of the Company or other documents or
                    directions of the Company by the Intern.
                  </li>
                  <li>
                    Notwithstanding anything mentioned in this Agreement, the Company may, by giving
                    reasonable cause, terminate the Internship under this Agreement upon written notice to the
                    Intern, in accordance with the provisions of this Section:
                  </li>
                </ul>
              </div>

              <div className="mt-12 pt-8 border-t">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm">
                      <strong>CIN:</strong> U72900KA2023PTC180015<br/>
                      <strong>Karnataka GST No:</strong> 29AADCN4769M1ZM<br/>
                      <strong>Tamil Nadu GST No:</strong> 33AADCN4769M1ZK
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Nuuvio Ventures India Private Limited</p>
                    <p className="text-sm">Head Office: Ground floor, Ground floor no 67/4A, 3rd Main Road, 1st Sector, HSR Layout, Bengaluru,</p>
                    <p className="text-sm"><strong>E-Mail:</strong> info@nuuvio.com</p>
                    <p className="text-sm"><strong>Tel:</strong> +91 842 68 48197</p>
                  </div>
                </div>
              </div>

              {/* Page 2 Content */}
              <div className="mt-12 pt-8 page-break">
                <div className="space-y-4">
                  <div>
                    <span className="font-bold">1.</span> Unauthorized absence or absence without permission from duty for a continuous period
                    of 7 days except in the event of natural calamities and medical condition (supported by
                    adequate documentation) would make the Intern lose lien on Internship. In such case,
                    it will be assumed that the Intern has abandoned the Internship on his/her own accord
                    and the Internship shall automatically come to an end without any notice of termination.
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-base">6. PERSONAL DATA PROTECTION:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        The Intern agrees that the Company may collect personal data (other than sensitive personal data) relating to the
                        Intern and his/her employment with the Company for business purposes in any jurisdiction to be collected
                        and held (in hard copy and computer-readable form) and processed by the Company and (b)
                        be disclosed or transferred to other employees of the Company and other persons as may be
                        necessary to the extent permitted by law.
                      </li>
                      <li>
                        The Intern agrees that the Company may process and collect and hold sensitive personal data
                        relating to the Employment, including medical details and details of gender, race and ethnic
                        origin. Personal data relating to gender, race, and ethnic origin will only be processed for the
                        purpose of monitoring our equal opportunities policy and medical details will be processed
                        only for the purpose of administering any benefits and/or ensuring that any rights the
                        Employee may have relating to any disability or any medical condition are observed.
                      </li>
                      <li>
                        The Intern consents to the transfer and disclosure of personal data as set out above which shall
                        apply regardless of the country to which the data is to be transferred where the disclosure or
                        transfer is to a person outside the country will be as per the laws.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold">7.</span> The company will not be held responsible for any incidents, damages, or liabilities that may occur
                    during shooting activities conducted outside the office premises. All such activities are undertaken
                    at the individual's own risk and responsibility.
                  </div>

                  <div>
                    <span className="font-bold">8.</span> You may be transferred or assigned to work across any of the Company's portfolio companies or
                    affiliated entities, based on business requirements, at the Company's discretion.
                  </div>

                  <div>
                    <span className="font-bold">9.</span> This letter is valid for a period of three days from the date mentioned in this offer. You are
                    requested to sign this letter where indicated below and submit a copy to us electronically or
                    physically before the expiry date as mentioned period as a token of acceptance of this offer. Failure to do so or
                    subsequent failure to join Talentou before the joining date will result in this offer being withdrawn.
                  </div>

                  <div>
                    <span className="font-bold">10.</span> This sets out the entire agreement and understanding between the Intern and the Company and
                    supersedes all previous agreements and understandings whether oral, written, or implied,
                    except for any terms implied by the law.
                  </div>

                  <div>
                    <span className="font-bold">11.</span> Any terms and conditions not explicitly covered under the agreement, the internal rules and
                    regulations of the Employer shall be governed.
                  </div>

                  <div className="mt-8">
                    <p>Yours sincerely,</p>
                    <div className="mt-8">
                      <div className="w-32 h-16 border-b border-black mb-2"></div>
                      <p className="font-bold">Sriviihya B</p>
                      <p><strong>Head – Finance & Ops</strong></p>
                    </div>
                  </div>
                </div>

                {/* Acceptance Section */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="font-bold text-lg text-center underline mb-6">ACCEPTANCE</h3>
                  <p className="mb-6">
                    I hereby acknowledge the above terms and accept the employment offer with effect from September
                    03, 2025 (Date of Joining).
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold">Signature:</span> ................................................................
                    </div>
                    <div>
                      <span className="font-bold">Name:</span> ................................................................
                    </div>
                    <div>
                      <span className="font-bold">Date:</span> ............................
                    </div>
                  </div>
                </div>

                {/* Annexure */}
                <div className="mt-12 pt-8 page-break">
                  <h3 className="font-bold text-lg text-center underline mb-6">ANNEXURE 2</h3>
                  <p className="mb-6">
                    The following documents are required to be produced at the time of joining. Submit all soft copies on
                    or before the date of joining.
                  </p>
                  
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Offer Letter (Signed Copy)</li>
                    <li>Education Documentation (All school & college mark lists and Degree Certificate)</li>
                    <li>ID Proofs (Copy of Aadhar and PAN Card)</li>
                  </ol>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm">
                        <strong>CIN:</strong> U72900KA2023PTC180015<br/>
                        <strong>Karnataka GST No:</strong> 29AADCN4769M1ZM<br/>
                        <strong>Tamil Nadu GST No:</strong> 33AADCN4769M1ZK
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Nuuvio Ventures India Private Limited</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}