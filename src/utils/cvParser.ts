
export const parsePDFText = async (file: File): Promise<string> => {
  // For now, we'll simulate CV parsing. In a real implementation, 
  // you would use a PDF parsing library like pdf-parse or PDF.js
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Simulate parsing delay
      setTimeout(() => {
        // Generate sample CV content regardless of actual file content
        const sampleCVs = [
          `Sarah Johnson
Senior Full Stack Developer
sarah.johnson@email.com
+1 (555) 987-6543
Austin, TX

EXPERIENCE:
Senior Full Stack Developer at TechFlow Solutions (2021-2024)
- Developed and maintained scalable web applications using React, Node.js, and PostgreSQL
- Led a cross-functional team of 6 developers on multiple high-impact projects
- Implemented microservices architecture improving system performance by 40%
- Mentored junior developers and conducted code reviews

Full Stack Developer at InnovateNow (2019-2021)
- Built responsive web applications using modern JavaScript frameworks
- Collaborated with UX/UI teams to implement pixel-perfect designs
- Integrated third-party APIs and payment processing systems

SKILLS:
JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, GraphQL, REST APIs, Git, Agile

EDUCATION:
Master of Science in Computer Science
University of Texas at Austin (2017-2019)`,

          `Michael Chen
DevOps Engineer
michael.chen@techmail.com
+1 (555) 234-5678
Seattle, WA

EXPERIENCE:
Senior DevOps Engineer at CloudScale Inc. (2020-2024)
- Designed and implemented CI/CD pipelines using Jenkins, GitLab CI, and GitHub Actions
- Managed AWS infrastructure serving 2M+ daily active users
- Reduced deployment time by 75% through automation and containerization
- Implemented monitoring and alerting systems using Prometheus and Grafana

DevOps Engineer at StartupHub (2018-2020)
- Automated infrastructure provisioning using Terraform and Ansible
- Implemented container orchestration with Kubernetes
- Established security best practices and compliance protocols

SKILLS:
AWS, Azure, Docker, Kubernetes, Jenkins, Terraform, Ansible, Python, Bash, Prometheus, Grafana, ELK Stack, Git

EDUCATION:
Bachelor of Science in Software Engineering
University of Washington (2014-2018)`,

          `Emily Rodriguez
Product Manager
emily.rodriguez@productco.com
+1 (555) 456-7890
San Francisco, CA

EXPERIENCE:
Senior Product Manager at DataVision Corp (2022-2024)
- Led product strategy and roadmap for B2B SaaS platform serving 500+ enterprise clients
- Collaborated with engineering, design, and marketing teams to deliver features
- Increased user engagement by 60% through data-driven product improvements
- Managed product lifecycle from conception to launch for 3 major product lines

Product Manager at GrowthTech (2020-2022)
- Conducted user research and competitive analysis to inform product decisions
- Defined product requirements and worked closely with development teams
- Launched mobile app that achieved 100K+ downloads in first quarter

SKILLS:
Product Strategy, User Research, Data Analysis, A/B Testing, Agile, Scrum, SQL, Figma, Jira, Google Analytics

EDUCATION:
MBA in Technology Management
Stanford Graduate School of Business (2018-2020)`
        ];

        // Randomly select one of the sample CVs
        const randomCV = sampleCVs[Math.floor(Math.random() * sampleCVs.length)];
        resolve(randomCV);
      }, 1500);
    };
    reader.readAsText(file);
  });
};

export const parseCV = (cvText: string) => {
  const lines = cvText.split('\n').map(line => line.trim()).filter(line => line);
  
  // Extract name (usually the first line)
  const fullName = lines[0] || '';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Extract email
  const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
  const emailMatch = cvText.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : '';
  
  // Extract phone
  const phoneRegex = /[\+]?[1-9]?[\s]?[\(]?[\d{3}][\)]?[\s]?[\d{3}][\-]?[\d{4}]/g;
  const phoneMatch = cvText.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0] : '';
  
  // Extract location (look for city, state patterns)
  const locationRegex = /([A-Za-z\s]+,\s*[A-Z]{2})|([A-Za-z\s]+,\s*[A-Za-z\s]+)/g;
  const locationMatch = cvText.match(locationRegex);
  const currentLocation = locationMatch ? locationMatch[0] : '';
  
  // Extract skills section
  const skillsSection = cvText.match(/SKILLS?:?\s*([\s\S]*?)(?:\n\n|\nEDUCATION|\nEXPERIENCE|$)/i);
  const skillsText = skillsSection ? skillsSection[1] : '';
  const skills = skillsText
    .split(/[,\n]/)
    .map(skill => skill.trim())
    .filter(skill => skill && skill.length > 1)
    .slice(0, 15); // Show more skills
  
  // Extract experience section
  const experienceSection = cvText.match(/EXPERIENCE:?\s*([\s\S]*?)(?:\n\nSKILLS|\n\nEDUCATION|$)/i);
  const experience = experienceSection ? experienceSection[1].trim() : '';
  
  // Extract current position (usually second line or from experience)
  const currentPosition = lines[1] || '';
  
  return {
    firstName,
    lastName,
    fullName,
    email,
    phone,
    currentLocation,
    skills,
    experience,
    currentPosition
  };
};
