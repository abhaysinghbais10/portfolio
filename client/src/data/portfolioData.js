// src/data/portfolioData.js
// Centralised data source – all information comes from your resume.
// Update only this file to change content or add URLs.

export const personalInfo = {
  name: "Abhay Singh Bais",
  title: "Software Developer / Full Stack Developer",
  email: "abhaysinghbais10@gmail.com",
  phone: "9009801259",
  github: "https://github.com/abhaysinghbais",
  linkedIn: "", // ← add your LinkedIn URL later
  leetcode: "", // ← add your LeetCode URL later
  resumeUrl: "", // Set only when a real PDF exists in client/public.
  profileImage: "", // Set only when a real portrait exists in client/public.
};

export const experience = [
  {
    role: "Full Stack Developer Intern",
    company: "Amdox Technologies",
    location: "Indore, India",
    start: "Jan 2026",
    end: "Apr 2026",
    responsibilities: [
      "Worked closely with UI/UX designers to refine layouts and improve usability.",
      "Designed and built REST APIs and responsive user interfaces.",
      "Followed Agile development practices and participated in sprint planning and code reviews.",
      "Took ownership of features from requirements through deployment.",
      "Debugged and resolved production issues."
    ]
  }
];

export const skills = {
  Programming: ["Java", "JavaScript", "C++", "SQL"],
  Frontend: ["React.js"],
  Backend: ["Node.js", "Express.js"],
  Databases: ["MongoDB", "MySQL"],
  Tools: ["Git", "GitHub"],
  Concepts: ["REST APIs", "Data Structures & Algorithms", "Object‑Oriented Programming"]
};

export const projects = [
  {
    id: "job-portal",
    title: "Job Portal",
    category: "Full Stack",
    description: "A full‑stack job portal platform connecting recruiters and job seekers — featuring secure authentication, job postings, and real-time application tracking.",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL"],
    features: [
      "Secure authentication & role-based authorization",
      "Job posting and management for recruiters",
      "Candidate application submission and tracking",
      "Application status updates in real time",
      "Optimized REST API calls and frontend rendering",
      "Fully responsive user interface"
    ],
    github: "", // ← add your real GitHub URL here
    liveDemo: "",  // ← add your live URL here when available
    caseStudy: {
      problem: "Job seekers struggle to find and apply for positions efficiently, while recruiters face challenges managing incoming applications. A centralized platform was needed to bridge this gap with secure access control for both roles.",
      solution: "A full-stack web application built with React on the frontend and Node.js/Express on the backend, backed by a relational MySQL database. The platform supports two user roles — recruiter and job seeker — each with tailored dashboards and workflows.",
      architecture: ["React.js (Frontend)", "REST API Layer", "Node.js + Express.js", "MySQL Database"],
      workflow: [
        { label: "Recruiter Posts Job", icon: "📋" },
        { label: "Candidate Discovers Listing", icon: "🔍" },
        { label: "Candidate Applies", icon: "📨" },
        { label: "Application Tracked", icon: "📊" },
        { label: "Status Updated", icon: "✅" }
      ],
      engineeringDetails: [
        "JWT-based authentication with role separation (recruiter / job seeker)",
        "RESTful API design following resource-based routing conventions",
        "SQL joins and indexed queries for efficient application lookups",
        "React component architecture with optimized re-renders",
        "Form validation on both client and server sides"
      ],
      outcome: "A functional recruitment platform that demonstrates end-to-end full-stack ownership — from database schema design through REST API development to a responsive React frontend with role-based access control."
    }
  },
  {
    id: "certificate-system",
    title: "Certificate Verification & Generation System",
    category: "Full Stack",
    description: "A web application for institutions to digitally generate certificates in bulk and allow anyone to verify authenticity via unique IDs and QR codes.",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL"],
    features: [
      "Bulk certificate generation from Excel uploads",
      "Unique verification ID per certificate",
      "QR code-based certificate validation",
      "Secure backend APIs preventing duplication",
      "Data-tampering protection",
      "Institutional-scale architecture for large batches"
    ],
    github: "", // ← add your real GitHub URL here
    liveDemo: "",  // ← add your live URL here when available
    caseStudy: {
      problem: "Institutions issuing paper or basic digital certificates face challenges with forgery, manual verification, and bulk issuance for large student batches. There was a need for a scalable, tamper-proof digital certificate system.",
      solution: "A full-stack platform where administrators upload a student batch via Excel, the system generates unique certificates with verification IDs, and anyone can verify a certificate's authenticity by scanning a QR code or entering the verification ID.",
      architecture: ["React.js (Frontend)", "REST API Layer", "Node.js + Express.js", "MySQL Database"],
      workflow: [
        { label: "Excel Batch Upload", icon: "📄" },
        { label: "Bulk Certificate Generation", icon: "⚙️" },
        { label: "Unique Verification ID Assigned", icon: "🔑" },
        { label: "QR Code Generated", icon: "📱" },
        { label: "Certificate Verified", icon: "✅" }
      ],
      engineeringDetails: [
        "Excel file parsing on the backend to extract student records",
        "Unique ID generation with duplicate-prevention logic at the database level",
        "QR codes encode the verification URL for instant scanning",
        "MySQL constraints and transaction handling to prevent partial batch failures",
        "Secure API endpoints with input sanitization against injection"
      ],
      outcome: "A tamper-proof, scalable certificate management system that eliminates manual verification overhead for institutions and provides instant authenticity checks for recipients and verifiers."
    }
  }
];

export const achievements = [
  {
    id: "google-cloud",
    title: "Google Cloud Career Launchpad Program",
    type: "Program",                          // type derived from title
    issuer: "Google",
    year: 2026,
    description: "Selected for Google's Cloud Career Launchpad Program — a structured learning initiative covering Google Cloud platform fundamentals and cloud computing concepts.",
    credentialUrl: "",                         // ← add real credential URL when available
    icon: "☁️"
  },
  {
    id: "dev-hacks",
    title: "Dev Hacks Hackathon",
    type: "Hackathon",
    issuer: "Dev Hacks",
    year: 2024,
    description: "Built a full-stack prototype during a 24-hour hackathon — demonstrating rapid development, problem-solving, and end-to-end delivery under time constraints.",
    credentialUrl: "",
    icon: "⚡"
  },
  {
    id: "git-training",
    title: "Git Training",
    type: "Training",
    issuer: "IIT Bombay (EduPyramids)",
    year: null,                                // no date in source data
    description: "Completed a structured Git training course provided by IIT Bombay through the EduPyramids platform — covering version control workflows and collaboration practices.",
    credentialUrl: "",
    icon: "🔧"
  },
  {
    id: "azure-training",
    title: "Microsoft Azure Training",
    type: "Training",
    issuer: "Microsoft",
    year: null,
    description: "Completed Microsoft Azure training covering cloud services fundamentals — including compute, storage, networking, and core Azure architecture concepts.",
    credentialUrl: "",
    icon: "🌐"
  }
];

export const problemSolving = {
  leetCodeSolved: 400,
  description: "400+ LeetCode problems solved – strong foundation in data structures & algorithms"
};

export const education = [
  {
    degree: "B.Tech, Computer Science Engineering",
    institute: "Chameli Devi Group of Institutions (CDGI), Indore",
    startYear: 2023,
    endYear: 2027
  },
  {
    degree: "Class 12, MP Board",
    institute: "Maa Kamla Vidhya Vihar, Indore",
    startYear: 2022,
    endYear: 2023
  }
];

export const howIWork = [
  "Understand Requirements",
  "Design the Solution",
  "Build the Frontend",
  "Develop REST APIs",
  "Integrate Database",
  "Test & Debug",
  "Review & Improve",
  "Deploy"
];
