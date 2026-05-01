import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const db = new PrismaClient();

function generateFingerprint(title: string, company: string, location: string): string {
  return createHash('md5').update(`${title.toLowerCase().trim()}|${company.toLowerCase().trim()}|${location.toLowerCase().trim()}`).digest('hex');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const CATEGORIES = [
  { name: 'Engineering', slug: 'engineering', icon: 'Code', description: 'Software engineering and development roles' },
  { name: 'Design', slug: 'design', icon: 'Palette', description: 'UI/UX, graphic design, and creative roles' },
  { name: 'Marketing', slug: 'marketing', icon: 'Megaphone', description: 'Digital marketing, content, and growth roles' },
  { name: 'Sales', slug: 'sales', icon: 'TrendingUp', description: 'Sales, business development, and account management' },
  { name: 'Product', slug: 'product', icon: 'Package', description: 'Product management and strategy roles' },
  { name: 'Data Science', slug: 'data-science', icon: 'BarChart3', description: 'Data analysis, ML, and AI roles' },
  { name: 'DevOps', slug: 'devops', icon: 'Server', description: 'Infrastructure, CI/CD, and cloud roles' },
  { name: 'Customer Support', slug: 'customer-support', icon: 'Headphones', description: 'Support, success, and operations roles' },
  { name: 'Finance', slug: 'finance', icon: 'DollarSign', description: 'Accounting, finance, and banking roles' },
  { name: 'Human Resources', slug: 'human-resources', icon: 'Users', description: 'HR, recruiting, and people operations' },
];

const USERS = [
  {
    email: 'admin@careerhub.com',
    name: 'Admin User',
    role: 'ADMIN',
    bio: 'Platform administrator managing CareerHub operations.',
  },
  {
    email: 'employer@techcorp.com',
    name: 'Sarah Johnson',
    role: 'EMPLOYER',
    bio: 'HR Director at TechCorp Solutions.',
  },
  {
    email: 'candidate@email.com',
    name: 'Alex Rivera',
    role: 'CANDIDATE',
    bio: 'Full-stack developer passionate about building great products.',
  },
];

const EMPLOYER_PROFILES = [
  {
    userId: 'employer_uid',
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    companySize: 'MEDIUM',
    description: 'Leading technology company focused on cloud solutions and enterprise software.',
    website: 'https://techcorp.example.com',
  },
];

const JOBS = [
  {
    title: 'Senior Full-Stack Engineer',
    description: `## About the Role\n\nWe're looking for a Senior Full-Stack Engineer to join our growing team. You'll be responsible for designing and implementing scalable web applications using modern technologies.\n\n## Responsibilities\n\n- Design and develop robust, scalable web applications\n- Write clean, maintainable, and well-tested code\n- Collaborate with product and design teams\n- Mentor junior developers\n- Participate in code reviews and technical discussions\n\n## Requirements\n\n- 5+ years of experience with React/Next.js\n- Strong proficiency in TypeScript\n- Experience with Node.js and REST APIs\n- Knowledge of database design (SQL and NoSQL)\n- Experience with cloud services (AWS/GCP)`,
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    locationType: 'HYBRID',
    category: 'Engineering',
    salaryMin: 140000,
    salaryMax: 200000,
    jobType: 'FULL_TIME',
    experienceLevel: 'SENIOR',
    contactEmail: 'careers@techcorp.example.com',
    contactName: 'Sarah Johnson',
    isExternal: false,
    isFeatured: true,
    requirements: JSON.stringify(['5+ years React/Next.js', 'TypeScript proficiency', 'Node.js experience', 'Cloud services knowledge']),
    benefits: JSON.stringify(['Health & dental insurance', '401(k) matching', 'Remote work flexibility', 'Learning budget $2,000/yr', 'Stock options']),
    tags: JSON.stringify(['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS']),
  },
  {
    title: 'UI/UX Designer',
    description: `## Join Our Design Team\n\nWe're seeking a talented UI/UX Designer to craft beautiful and intuitive user experiences for our SaaS platform.\n\n## What You'll Do\n\n- Create wireframes, prototypes, and high-fidelity designs\n- Conduct user research and usability testing\n- Collaborate with engineers to implement designs\n- Maintain and evolve our design system\n\n## Requirements\n\n- 3+ years of product design experience\n- Proficiency in Figma and design tools\n- Strong portfolio demonstrating user-centered design\n- Experience with design systems`,
    company: 'DesignCraft Studio',
    location: 'New York, NY',
    locationType: 'ONSITE',
    category: 'Design',
    salaryMin: 100000,
    salaryMax: 150000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    contactEmail: 'jobs@designcraft.example.com',
    contactName: 'Emily Chen',
    isExternal: false,
    isFeatured: true,
    requirements: JSON.stringify(['3+ years product design', 'Figma proficiency', 'Design system experience', 'User research skills']),
    benefits: JSON.stringify(['Competitive salary', 'Health benefits', 'Creative workspace', 'Conference budget']),
    tags: JSON.stringify(['Figma', 'UI/UX', 'Design Systems', 'User Research']),
  },
  {
    title: 'Data Scientist - Machine Learning',
    description: `## ML Engineer Wanted\n\nJoin our data science team to build and deploy machine learning models that power our recommendation engine.\n\n## Key Responsibilities\n\n- Develop and train ML models for recommendations\n- Build data pipelines and feature engineering\n- Deploy models to production using MLOps practices\n- Analyze A/B test results and optimize model performance\n\n## Requirements\n\n- PhD or MS in Computer Science, Statistics, or related field\n- Experience with Python, TensorFlow/PyTorch\n- Strong statistical and mathematical background\n- Experience with big data tools (Spark, Hadoop)`,
    company: 'DataFlow Analytics',
    location: 'Austin, TX',
    locationType: 'REMOTE',
    category: 'Data Science',
    salaryMin: 130000,
    salaryMax: 180000,
    jobType: 'FULL_TIME',
    experienceLevel: 'SENIOR',
    contactEmail: 'ml-jobs@dataflow.example.com',
    isExternal: false,
    isFeatured: false,
    requirements: JSON.stringify(['MS/PhD in CS/Statistics', 'Python & TensorFlow', 'MLOps experience', 'Big data tools']),
    benefits: JSON.stringify(['Remote-first culture', 'Equipment budget', 'Unlimited PTO', 'Stock options']),
    tags: JSON.stringify(['Python', 'Machine Learning', 'TensorFlow', 'MLOps', 'Big Data']),
  },
  {
    title: 'DevOps Engineer',
    description: `## Infrastructure Engineer\n\nWe need a DevOps Engineer to help us scale our infrastructure and improve our CI/CD pipelines.\n\n## Responsibilities\n\n- Manage and optimize cloud infrastructure (AWS)\n- Build and maintain CI/CD pipelines\n- Implement monitoring and alerting systems\n- Automate deployment processes\n- Ensure system reliability and performance`,
    company: 'CloudNine Systems',
    location: 'Seattle, WA',
    locationType: 'HYBRID',
    category: 'DevOps',
    salaryMin: 120000,
    salaryMax: 170000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    contactEmail: 'devops@cloudnine.example.com',
    isExternal: false,
    isFeatured: false,
    requirements: JSON.stringify(['AWS expertise', 'Kubernetes & Docker', 'CI/CD pipelines', 'Terraform/IaC']),
    benefits: JSON.stringify(['Health insurance', '401(k)', 'Remote days', 'Education budget']),
    tags: JSON.stringify(['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD']),
  },
  {
    title: 'Product Marketing Manager',
    description: `## Drive Growth Through Marketing\n\nWe're looking for a Product Marketing Manager to develop and execute go-to-market strategies for our B2B SaaS products.\n\n## What You'll Do\n\n- Develop positioning and messaging for products\n- Create marketing campaigns and content strategy\n- Analyze market trends and competitive landscape\n- Collaborate with sales and product teams\n- Manage marketing budget and ROI`,
    company: 'GrowthLab Inc.',
    location: 'Chicago, IL',
    locationType: 'REMOTE',
    category: 'Marketing',
    salaryMin: 90000,
    salaryMax: 130000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    contactEmail: 'marketing@growthlab.example.com',
    isExternal: false,
    isFeatured: false,
    requirements: JSON.stringify(['3+ years product marketing', 'B2B SaaS experience', 'Content strategy', 'Analytics skills']),
    benefits: JSON.stringify(['Flexible schedule', 'Health benefits', 'Remote work', 'Bonus structure']),
    tags: JSON.stringify(['Product Marketing', 'B2B SaaS', 'Content Strategy', 'Growth']),
  },
  {
    title: 'Frontend Developer (React)',
    description: `## React Developer Opportunity\n\nJoin our frontend team to build world-class user interfaces for our e-commerce platform.\n\n## Responsibilities\n\n- Build responsive, accessible web interfaces with React\n- Optimize application performance\n- Implement pixel-perfect designs\n- Write unit and integration tests\n\n## Requirements\n\n- 2+ years React experience\n- Proficiency in JavaScript/TypeScript\n- Experience with state management (Redux/Zustand)\n- Knowledge of web performance optimization`,
    company: 'ShopWave',
    location: 'Miami, FL',
    locationType: 'REMOTE',
    category: 'Engineering',
    salaryMin: 85000,
    salaryMax: 120000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    contactEmail: 'frontend@shopwave.example.com',
    isExternal: false,
    isFeatured: false,
    requirements: JSON.stringify(['2+ years React', 'TypeScript', 'State management', 'Performance optimization']),
    benefits: JSON.stringify(['Remote work', 'Health plan', 'Gym membership', 'Team retreats']),
    tags: JSON.stringify(['React', 'TypeScript', 'Next.js', 'CSS', 'Testing']),
  },
  {
    title: 'Sales Development Representative',
    description: `## Start Your Sales Career\n\nWe're hiring an SDR to help us identify and qualify leads for our enterprise sales team.\n\n## What You'll Do\n\n- Prospecting and lead qualification\n- Conduct outbound outreach (calls, emails, LinkedIn)\n- Schedule demos for account executives\n- Maintain CRM records\n- Meet or exceed monthly quotas`,
    company: 'EnterpriseFlow',
    location: 'Denver, CO',
    locationType: 'ONSITE',
    category: 'Sales',
    salaryMin: 55000,
    salaryMax: 75000,
    jobType: 'FULL_TIME',
    experienceLevel: 'JUNIOR',
    contactEmail: 'sales@enterpriseflow.example.com',
    isExternal: false,
    isFeatured: false,
    requirements: JSON.stringify(['Bachelor degree', 'Communication skills', 'CRM experience', 'Motivated self-starter']),
    benefits: JSON.stringify(['Base + commission', 'Health insurance', 'Training program', 'Career growth']),
    tags: JSON.stringify(['Sales', 'SDR', 'B2B', 'Lead Generation']),
  },
  {
    title: 'Product Manager',
    description: `## Shape the Future of Our Product\n\nWe're looking for a Product Manager to drive the vision and roadmap for our flagship product.\n\n## Key Responsibilities\n\n- Define product vision and strategy\n- Prioritize features and create roadmap\n- Work closely with engineering and design\n- Conduct market research and user interviews\n- Analyze product metrics and drive improvements`,
    company: 'InnovateTech',
    location: 'Boston, MA',
    locationType: 'HYBRID',
    category: 'Product',
    salaryMin: 110000,
    salaryMax: 160000,
    jobType: 'FULL_TIME',
    experienceLevel: 'SENIOR',
    contactEmail: 'product@innovatetech.example.com',
    isExternal: false,
    isFeatured: true,
    requirements: JSON.stringify(['5+ years PM experience', 'B2B SaaS background', 'Data-driven decision making', 'Agile/Scrum']),
    benefits: JSON.stringify(['Equity compensation', 'Premium health plan', 'Flexible PTO', 'Learning stipend']),
    tags: JSON.stringify(['Product Management', 'B2B SaaS', 'Agile', 'Strategy']),
  },
  {
    title: 'Backend Engineer (Python)',
    description: `## Python Backend Developer\n\nWe're seeking a Backend Engineer to build and maintain our API services and data processing pipelines.\n\n## What You'll Do\n\n- Design and implement RESTful APIs with Python/FastAPI\n- Build data processing pipelines\n- Optimize database queries and performance\n- Write comprehensive tests\n\n## Requirements\n\n- 3+ years Python development\n- Experience with FastAPI or Django\n- Knowledge of SQL and NoSQL databases\n- Experience with message queues (RabbitMQ/Kafka)`,
    company: 'DataFlow Analytics',
    location: 'Remote',
    locationType: 'REMOTE',
    category: 'Engineering',
    salaryMin: 110000,
    salaryMax: 155000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    contactEmail: 'backend@dataflow.example.com',
    isExternal: false,
    isFeatured: false,
    requirements: JSON.stringify(['3+ years Python', 'FastAPI/Django', 'SQL & NoSQL', 'Message queues']),
    benefits: JSON.stringify(['Remote work', 'Health + dental', 'Equipment provided', 'Conference budget']),
    tags: JSON.stringify(['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker']),
  },
  {
    title: 'Customer Success Manager',
    description: `## Help Our Customers Succeed\n\nWe're looking for a Customer Success Manager to build strong relationships with our enterprise clients.\n\n## Responsibilities\n\n- Onboard new enterprise customers\n- Conduct regular check-ins and QBRs\n- Identify upsell opportunities\n- Monitor customer health metrics\n- Create educational content and resources`,
    company: 'SaaSPro',
    location: 'Portland, OR',
    locationType: 'REMOTE',
    category: 'Customer Support',
    salaryMin: 70000,
    salaryMax: 95000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    contactEmail: 'cs@saaspro.example.com',
    isExternal: false,
    isFeatured: false,
    requirements: JSON.stringify(['2+ years CSM experience', 'SaaS background', 'Analytical skills', 'Communication excellence']),
    benefits: JSON.stringify(['Remote-first', 'Health benefits', 'Stock options', 'PTO policy']),
    tags: JSON.stringify(['Customer Success', 'SaaS', 'Account Management', 'Enterprise']),
  },
  // External / Scraped Jobs
  {
    title: 'React Native Developer',
    description: `## Mobile Developer Needed\n\nJoin our mobile team to build cross-platform applications using React Native.\n\n## Requirements\n\n- 3+ years React Native experience\n- Knowledge of native iOS/Android development\n- Experience with state management\n- Published apps on App Store/Play Store`,
    company: 'MobileFirst Co.',
    location: 'Los Angeles, CA',
    locationType: 'HYBRID',
    category: 'Engineering',
    salaryMin: 115000,
    salaryMax: 160000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    isExternal: true,
    sourceName: 'LinkedIn',
    sourceUrl: 'https://linkedin.com/jobs/view/react-native-dev',
    applyUrl: 'https://linkedin.com/jobs/apply/react-native-dev',
    requirements: JSON.stringify(['React Native', 'iOS/Android', 'State management', 'Published apps']),
    tags: JSON.stringify(['React Native', 'Mobile', 'iOS', 'Android']),
  },
  {
    title: 'Marketing Analyst',
    description: `## Data-Driven Marketing\n\nWe need a Marketing Analyst to help optimize our campaigns and drive ROI.\n\n## Requirements\n\n- 2+ years marketing analytics experience\n- Proficiency in Google Analytics, SQL\n- Experience with A/B testing\n- Strong Excel/Google Sheets skills`,
    company: 'AdMetrics Corp.',
    location: 'Dallas, TX',
    locationType: 'ONSITE',
    category: 'Marketing',
    salaryMin: 65000,
    salaryMax: 90000,
    jobType: 'FULL_TIME',
    experienceLevel: 'JUNIOR',
    isExternal: true,
    sourceName: 'Indeed',
    sourceUrl: 'https://indeed.com/viewjob?jk=marketing-analyst',
    applyUrl: 'https://indeed.com/apply?jk=marketing-analyst',
    requirements: JSON.stringify(['Google Analytics', 'SQL', 'A/B testing', 'Excel']),
    tags: JSON.stringify(['Analytics', 'Google Analytics', 'SQL', 'A/B Testing']),
  },
  {
    title: 'Cloud Architect',
    description: `## Design Our Cloud Infrastructure\n\nWe're hiring a Cloud Architect to lead our cloud strategy and design scalable solutions.\n\n## Requirements\n\n- 8+ years in cloud architecture\n- AWS Solutions Architect certification\n- Experience with microservices architecture\n- Knowledge of security best practices`,
    company: 'CloudScale Inc.',
    location: 'Washington, DC',
    locationType: 'REMOTE',
    category: 'DevOps',
    salaryMin: 160000,
    salaryMax: 220000,
    jobType: 'FULL_TIME',
    experienceLevel: 'LEAD',
    isExternal: true,
    sourceName: 'Glassdoor',
    sourceUrl: 'https://glassdoor.com/job/cloud-architect',
    applyUrl: 'https://glassdoor.com/apply/cloud-architect',
    requirements: JSON.stringify(['8+ years cloud', 'AWS certified', 'Microservices', 'Security expertise']),
    tags: JSON.stringify(['AWS', 'Cloud Architecture', 'Microservices', 'Security']),
  },
  {
    title: 'Technical Writer',
    description: `## Document Our Products\n\nWe're looking for a Technical Writer to create clear, comprehensive documentation for our developer tools.\n\n## Requirements\n\n- 2+ years technical writing experience\n- Ability to understand complex technical concepts\n- Experience with API documentation\n- Knowledge of docs-as-code tools`,
    company: 'DocuTech',
    location: 'Remote',
    locationType: 'REMOTE',
    category: 'Engineering',
    salaryMin: 75000,
    salaryMax: 105000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    isExternal: false,
    isFeatured: false,
    contactEmail: 'writing@docutech.example.com',
    requirements: JSON.stringify(['Technical writing', 'API documentation', 'Docs-as-code', 'Developer tools']),
    benefits: JSON.stringify(['Remote work', 'Flexible hours', 'Health benefits', 'Education budget']),
    tags: JSON.stringify(['Technical Writing', 'Documentation', 'API Docs', 'Developer Experience']),
  },
  {
    title: 'Financial Analyst',
    description: `## Finance Role\n\nJoin our finance team to support strategic decision-making through data analysis and financial modeling.\n\n## Requirements\n\n- Bachelor's degree in Finance or Accounting\n- 2+ years financial analysis experience\n- Advanced Excel skills\n- CFA or CPA preferred`,
    company: 'CapitalEdge',
    location: 'Charlotte, NC',
    locationType: 'ONSITE',
    category: 'Finance',
    salaryMin: 70000,
    salaryMax: 95000,
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    isExternal: true,
    sourceName: 'Indeed',
    sourceUrl: 'https://indeed.com/viewjob?jk=financial-analyst',
    applyUrl: 'https://indeed.com/apply?jk=financial-analyst',
    requirements: JSON.stringify(["Bachelor's in Finance", '2+ years experience', 'Advanced Excel', 'CFA/CPA preferred']),
    tags: JSON.stringify(['Finance', 'Financial Analysis', 'Modeling', 'Excel']),
  },
];

const BLOG_POSTS = [
  {
    title: '10 Tips for Writing a Standout Resume in 2025',
    slug: 'tips-writing-standout-resume-2025',
    excerpt: 'Learn the latest resume best practices that will help you land your dream job in today\'s competitive market.',
    content: `# 10 Tips for Writing a Standout Resume in 2025

Your resume is often the first impression you make on a potential employer. In today's competitive job market, it's essential to make every word count.

## 1. Tailor Your Resume for Each Application

One of the most common mistakes job seekers make is using a generic resume for every application. Take the time to customize your resume for each position by highlighting the skills and experiences most relevant to the job.

## 2. Use Action Verbs

Start each bullet point with a strong action verb. Words like "led," "developed," "implemented," and "optimized" are more impactful than passive phrases.

## 3. Quantify Your Achievements

Numbers speak louder than words. Instead of saying "improved sales," say "increased sales by 35% in Q4, generating $500K in additional revenue."

## 4. Include Relevant Keywords

Many companies use Applicant Tracking Systems (ATS) to screen resumes. Include relevant keywords from the job description to ensure your resume passes through these systems.

## 5. Keep It Concise

Your resume should ideally fit on one page if you have less than 10 years of experience. Be concise and focus on your most impactful achievements.

## 6. Use a Clean, Professional Format

Choose a clean, modern design that's easy to read. Avoid overly complex layouts that might confuse ATS software.

## 7. Highlight Technical Skills

In today's tech-driven world, prominently feature your technical skills and proficiencies. Create a dedicated skills section.

## 8. Include a Professional Summary

Replace the outdated "objective" statement with a professional summary that highlights your key qualifications and career goals.

## 9. Proofread Carefully

Typos and grammatical errors can instantly disqualify you. Use tools like Grammarly and have someone else review your resume.

## 10. Add Relevant Certifications

Industry certifications can set you apart from other candidates. Include any relevant certifications with their dates.

---

*Ready to apply these tips? Browse our [job listings](#) to find your next opportunity!*`,
    category: 'Career Tips',
    tags: JSON.stringify(['resume', 'job search', 'career advice', '2025']),
    isPublished: true,
    publishedAt: new Date('2025-01-15'),
  },
  {
    title: 'The Future of Remote Work: What to Expect',
    slug: 'future-remote-work-2025',
    excerpt: 'Remote work is evolving rapidly. Here\'s what job seekers and employers need to know about the future of distributed teams.',
    content: `# The Future of Remote Work: What to Expect

The way we work has fundamentally changed. Remote work, once a perk offered by progressive companies, has become a standard expectation for many professionals.

## The Current Landscape

According to recent surveys, over 60% of knowledge workers prefer a hybrid or fully remote work arrangement. Companies that fail to offer flexibility risk losing top talent to competitors who do.

## Trends Shaping the Future

### 1. Asynchronous-First Communication
Companies are moving toward async communication, reducing meeting fatigue and allowing team members across time zones to collaborate effectively.

### 2. Digital Nomad Policies
More companies are offering "work from anywhere" policies, enabling employees to travel while working.

### 3. AI-Powered Productivity
AI tools are helping remote workers be more productive, from automated meeting summaries to intelligent task management.

### 4. Virtual Office Spaces
Companies are investing in virtual environments that recreate the "water cooler" moments of office life.

## What This Means for Job Seekers

- **Expand your search globally** - Remote work opens opportunities beyond your local market
- **Invest in communication skills** - Written communication is critical in remote settings
- **Build your digital presence** - Your online profile matters more than ever
- **Stay self-motivated** - Remote work requires strong self-discipline

## What Employers Should Consider

- Focus on outcomes rather than hours worked
- Invest in collaboration tools and infrastructure
- Create clear communication guidelines
- Build team culture intentionally

---

*Looking for remote opportunities? Explore our [remote job listings](#)!*`,
    category: 'Industry News',
    tags: JSON.stringify(['remote work', 'future of work', 'hybrid', 'distributed teams']),
    isPublished: true,
    publishedAt: new Date('2025-02-01'),
  },
  {
    title: 'How to Ace Your Technical Interview',
    slug: 'how-to-ace-technical-interview',
    excerpt: 'A comprehensive guide to preparing for and succeeding in technical interviews at top tech companies.',
    content: `# How to Ace Your Technical Interview

Technical interviews can be daunting, but with the right preparation, you can approach them with confidence. Here's your complete guide.

## Before the Interview

### Research the Company
Understand the company's products, tech stack, and culture. This helps you tailor your answers and ask insightful questions.

### Practice Coding Problems
Use platforms like LeetCode, HackerRank, and CodeSignal to practice. Focus on data structures and algorithms.

### Review System Design
For senior roles, study system design patterns. Practice designing scalable systems for common use cases.

## During the Interview

### Think Out Loud
Interviewers want to see your thought process. Explain your approach before writing code.

### Ask Clarifying Questions
Before diving into a solution, make sure you understand the problem completely.

### Start with a Brute Force Solution
Begin with a simple solution, then optimize. This shows your ability to iterate and improve.

### Write Clean Code
Use meaningful variable names, add comments, and follow best practices. Code readability matters.

## Common Mistakes to Avoid

1. **Rushing to code** without understanding the problem
2. **Ignoring edge cases** in your solution
3. **Not testing your code** before saying you're done
4. **Giving up** when stuck - ask for hints
5. **Poor communication** - stay engaged and collaborative

## Behavioral Interview Tips

Use the STAR method (Situation, Task, Action, Result) to structure your answers to behavioral questions.

## After the Interview

Send a thank-you email within 24 hours. Reiterate your interest and mention something specific from the conversation.

---

*Prepare your resume and browse [open positions](#) to start your journey!*`,
    category: 'Interview Guide',
    tags: JSON.stringify(['interview', 'technical interview', 'coding', 'career']),
    isPublished: true,
    publishedAt: new Date('2025-02-15'),
  },
  {
    title: 'Top 15 In-Demand Tech Skills for 2025',
    slug: 'top-in-demand-tech-skills-2025',
    excerpt: 'Discover which technical skills employers are looking for most in 2025 and how to develop them.',
    content: `# Top 15 In-Demand Tech Skills for 2025

The tech landscape is constantly evolving. Staying current with in-demand skills is crucial for career growth.

## 1. AI and Machine Learning
AI continues to dominate. Skills in prompt engineering, fine-tuning models, and building AI-powered applications are highly sought after.

## 2. Cloud Computing (AWS, Azure, GCP)
Cloud expertise remains essential as more companies migrate their infrastructure.

## 3. Kubernetes and Container Orchestration
Container management at scale is a critical skill for DevOps and backend engineers.

## 4. Cybersecurity
With increasing cyber threats, security skills are in high demand across all sectors.

## 5. Full-Stack Development
Companies value developers who can work across the entire stack.

## 6. Data Engineering
Building data pipelines and managing data infrastructure is a growing field.

## 7. Edge Computing
As IoT grows, expertise in edge computing and distributed systems is becoming more valuable.

## 8. Rust Programming
Rust is gaining popularity for systems programming, WebAssembly, and performance-critical applications.

## 9. Platform Engineering
Building internal developer platforms is a growing discipline within DevOps.

## 10. DevSecOps
Integrating security into the DevOps pipeline is becoming standard practice.

---

*Want to put these skills to use? Check out our latest [job listings](#)!*`,
    category: 'Career Tips',
    tags: JSON.stringify(['tech skills', '2025', 'career development', 'programming']),
    isPublished: true,
    publishedAt: new Date('2025-03-01'),
  },
];

async function seed() {
  console.log('🌱 Starting CareerHub seed...');

  // Clear existing data
  await db.application.deleteMany();
  await db.savedJob.deleteMany();
  await db.subscription.deleteMany();
  await db.job.deleteMany();
  await db.post.deleteMany();
  await db.candidateProfile.deleteMany();
  await db.employerProfile.deleteMany();
  await db.category.deleteMany();
  await db.user.deleteMany();

  // Seed Categories
  console.log('📊 Seeding categories...');
  for (const cat of CATEGORIES) {
    await db.category.create({ data: cat });
  }

  // Seed Users
  console.log('👤 Seeding users...');
  const adminUser = await db.user.create({
    data: { email: USERS[0].email, name: USERS[0].name, role: USERS[0].role, bio: USERS[0].bio },
  });
  const employerUser = await db.user.create({
    data: { email: USERS[1].email, name: USERS[1].name, role: USERS[1].role, bio: USERS[1].bio },
  });
  const candidateUser = await db.user.create({
    data: { email: USERS[2].email, name: USERS[2].name, role: USERS[2].role, bio: USERS[2].bio },
  });

  // Seed Employer Profile
  console.log('🏢 Seeding employer profile...');
  await db.employerProfile.create({
    data: { ...EMPLOYER_PROFILES[0], userId: employerUser.id },
  });

  // Seed Candidate Profile
  console.log('📄 Seeding candidate profile...');
  await db.candidateProfile.create({
    data: {
      userId: candidateUser.id,
      skills: JSON.stringify(['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL']),
      experience: '5',
      education: 'Bachelor of Science in Computer Science',
      linkedinUrl: 'https://linkedin.com/in/alexrivera',
      githubUrl: 'https://github.com/alexrivera',
    },
  });

  // Seed Jobs
  console.log('💼 Seeding jobs...');
  for (const job of JOBS) {
    const fingerprint = generateFingerprint(job.title, job.company, job.location);
    const jobData = {
      ...job,
      fingerprint,
      publishedAt: new Date(),
      lastSeenAt: new Date(),
      ...(job.contactEmail ? { publisherId: employerUser.id } : {}),
    };
    // Remove undefined fields
    const cleanData = Object.fromEntries(Object.entries(jobData).filter(([, v]) => v !== undefined));
    await db.job.create({ data: cleanData as any });
  }

  // Seed Blog Posts
  console.log('📝 Seeding blog posts...');
  for (const post of BLOG_POSTS) {
    await db.post.create({
      data: { ...post, authorId: adminUser.id },
    });
  }

  // Update category job counts
  console.log('🔄 Updating category job counts...');
  const allCategories = await db.category.findMany();
  for (const cat of allCategories) {
    const count = await db.job.count({ where: { category: cat.name } });
    await db.category.update({ where: { id: cat.id }, data: { jobCount: count } });
  }

  console.log('✅ Seed completed successfully!');
  console.log(`   - ${CATEGORIES.length} categories`);
  console.log(`   - ${USERS.length} users`);
  console.log(`   - ${JOBS.length} jobs`);
  console.log(`   - ${BLOG_POSTS.length} blog posts`);
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
