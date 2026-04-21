import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Download, MapPin, Calendar, Briefcase, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock JD data - in a real app this would come from an API
const mockJDData: Record<string, {
  id: string;
  role: string;
  client: string;
  location: string;
  workMode: string;
  status: string;
  expectedStartDate: string;
  hiringLead: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  qualifications: string[];
  aboutCompany: string;
  experience: string;
  salary: string;
}> = {
  "JOB-0001": {
    id: "JOB-0001",
    role: "Senior Frontend Developer",
    client: "Amgen – Data Platform",
    location: "San Francisco, CA",
    workMode: "Hybrid",
    status: "Active",
    expectedStartDate: "2024-02-15",
    hiringLead: "Jennifer Adams",
    description: "We are looking for a Senior Frontend Developer to join our Data Platform team at Amgen. You will be responsible for building and maintaining user-facing features using modern JavaScript frameworks.",
    skills: ["React", "TypeScript", "GraphQL", "CSS/SCSS", "Jest", "Webpack", "Git"],
    responsibilities: [
      "Design and implement user-facing features using React and TypeScript",
      "Collaborate with backend engineers to integrate APIs and services",
      "Write clean, maintainable, and well-tested code",
      "Participate in code reviews and mentor junior developers",
      "Optimize application performance and ensure scalability",
      "Work closely with UX designers to implement pixel-perfect designs"
    ],
    qualifications: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with state management solutions (Redux, MobX, or Zustand)",
      "Familiarity with RESTful APIs and GraphQL",
      "Bachelor's degree in Computer Science or related field",
      "Excellent communication and collaboration skills"
    ],
    aboutCompany: "Amgen is a pioneer in biotechnology, committed to unlocking the potential of biology for patients suffering from serious illnesses. Our Data Platform team builds the tools and infrastructure that power our data-driven decision making.",
    experience: "5+ years",
    salary: "$150,000 - $180,000"
  },
  "JOB-0002": {
    id: "JOB-0002",
    role: "Backend Engineer",
    client: "TechCorp – API Gateway",
    location: "Remote",
    workMode: "Remote",
    status: "Active",
    expectedStartDate: "2024-03-01",
    hiringLead: "Michael Brown",
    description: "Join our API Gateway team to build scalable backend services. You will work on high-throughput systems handling millions of requests daily.",
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"],
    responsibilities: [
      "Design and develop RESTful APIs and microservices",
      "Build and maintain database schemas and queries",
      "Implement caching strategies for optimal performance",
      "Monitor and troubleshoot production systems",
      "Write comprehensive unit and integration tests",
      "Document APIs and technical specifications"
    ],
    qualifications: [
      "4+ years of backend development experience",
      "Strong knowledge of Node.js or Python",
      "Experience with SQL and NoSQL databases",
      "Understanding of containerization and orchestration",
      "Experience with cloud platforms (AWS/GCP/Azure)",
      "Strong problem-solving skills"
    ],
    aboutCompany: "TechCorp is a leading technology company specializing in API management and gateway solutions. Our platform processes billions of API calls monthly for Fortune 500 companies.",
    experience: "4+ years",
    salary: "$130,000 - $160,000"
  }
};

// Default JD for jobs not in the mock data
const defaultJD = {
  description: "This position offers an exciting opportunity to work on cutting-edge projects with a talented team. The ideal candidate will have strong technical skills and a passion for building great products.",
  skills: ["JavaScript", "React", "Node.js", "SQL", "Git", "Agile methodologies"],
  responsibilities: [
    "Develop and maintain high-quality software applications",
    "Collaborate with cross-functional teams to define and implement features",
    "Participate in code reviews and contribute to team best practices",
    "Debug and resolve technical issues across the stack",
    "Write technical documentation and contribute to team knowledge base"
  ],
  qualifications: [
    "Bachelor's degree in Computer Science or equivalent experience",
    "3+ years of relevant professional experience",
    "Strong communication and teamwork skills",
    "Ability to learn and adapt to new technologies quickly",
    "Problem-solving mindset with attention to detail"
  ],
  aboutCompany: "We are an innovative company committed to building solutions that make a difference. Our team values collaboration, continuous learning, and work-life balance.",
  experience: "3+ years",
  salary: "Competitive"
};

export function JDViewPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  // Get JD data or use defaults
  const jdData = jobId && mockJDData[jobId] ? mockJDData[jobId] : null;
  
  const jobInfo = jdData || {
    id: jobId || "Unknown",
    role: "Position",
    client: "Client",
    location: "Location TBD",
    workMode: "TBD",
    status: "Active",
    expectedStartDate: new Date().toISOString().split('T')[0],
    hiringLead: "TBD",
    ...defaultJD
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/ta-associate/jd/${jobId}`;
    navigator.clipboard.writeText(link);
    toast.success("JD link copied to clipboard!");
  };

  const handleDownload = () => {
    toast.success("Downloading JD as PDF...");
    // In a real app, this would generate and download a PDF
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Closed":
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/ta-associate/jobs")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopyLink} className="gap-2">
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <Button variant="outline" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Job Title Card */}
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-primary">{jobInfo.id}</span>
                <Badge className={cn("text-xs", getStatusColor(jobInfo.status))}>
                  {jobInfo.status}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{jobInfo.role}</h1>
              <p className="text-muted-foreground mt-1">{jobInfo.client}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {jobInfo.workMode === "Remote" ? "Remote" : `${jobInfo.location} · ${jobInfo.workMode}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Start: {jobInfo.expectedStartDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{jobInfo.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Hiring Lead: {jobInfo.hiringLead}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">About the Role</h2>
          <p className="text-muted-foreground leading-relaxed">{jobInfo.description}</p>
        </div>

        {/* Skills */}
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {jobInfo.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Responsibilities</h2>
          <ul className="space-y-2">
            {jobInfo.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Qualifications */}
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Qualifications</h2>
          <ul className="space-y-2">
            {jobInfo.qualifications.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* About Company */}
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">About the Company</h2>
          <p className="text-muted-foreground leading-relaxed">{jobInfo.aboutCompany}</p>
        </div>

        {/* Compensation */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">Compensation</h2>
          <p className="text-muted-foreground">{jobInfo.salary}</p>
        </div>
      </div>
    </Layout>
  );
}

export default JDViewPage;
