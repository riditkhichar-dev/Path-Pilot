import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Sparkles, 
  User as UserIcon, 
  LogOut, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  TrendingUp, 
  Star, 
  CheckCircle2, 
  Menu,
  X,
  Map,
  Users,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Send,
  GitFork,
  Briefcase,
  HelpCircle,
  Play,
  Check,
  Award,
  BookMarked,
  Filter,
  ArrowLeft,
  Clock,
  Flame,
  Layers,
  Code2,
  Settings,
  Bot,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { User } from '../../types';
import { fetchGroqChatResponse, ChatMessage } from '../../services/groqApi';
import { AIRoadmapGenerator } from './AIRoadmapGenerator';
import { ResumeBuilder } from './ResumeBuilder';
import { LearningResources } from './LearningResources';
import { CertificatesAchievements } from './CertificatesAchievements';
import { AdminPanel } from './AdminPanel';






interface DashboardProps {
  user: User | null;
  onOpenChat: () => void;
  onOpenAssessment?: () => void;
  onNavigateHome: () => void;
  onLogout: () => void;
  onExploreCareers: () => void;
  onUpdateUser?: (updatedUser: User) => void;
  isDarkMode: boolean;
  onToggleTheme: (dark: boolean) => void;
}

interface Career {
  id: string;
  title: string;
  category: string;
  matchScore: number;
  salary: string;
  growth: string;
  skills: string[];
  description: string;
}

const MOCK_CAREERS: Career[] = [
  {
    id: '1',
    title: 'Machine Learning Engineer',
    category: 'Software & Technology',
    matchScore: 96,
    salary: '$140k - $210k',
    growth: '+22% (Very High)',
    skills: ['Python', 'PyTorch', 'Mathematics', 'Data Modeling', 'Algorithms'],
    description: 'Design and build artificially intelligent systems that learn and make decisions from datasets.'
  },
  {
    id: '2',
    title: 'UI/UX Product Designer',
    category: 'Design & Creative',
    matchScore: 88,
    salary: '$95k - $150k',
    growth: '+14% (High)',
    skills: ['Figma', 'Wireframing', 'User Research', 'Prototyping', 'Visual Design'],
    description: 'Create intuitive, user-centered digital interfaces and optimize product experiences for humans.'
  },
  {
    id: '3',
    title: 'Creative Content Director',
    category: 'Marketing & Arts',
    matchScore: 82,
    salary: '$85k - $130k',
    growth: '+8% (Stable)',
    skills: ['Storytelling', 'Copywriting', 'Brand Strategy', 'Adobe Suite', 'Leadership'],
    description: 'Lead visual design, writing, and multimedia campaigns to define brand stories and media projects.'
  },
  {
    id: '4',
    title: 'Quantitative Finance Analyst',
    category: 'Finance & Business',
    matchScore: 78,
    salary: '$120k - $190k',
    growth: '+11% (High)',
    skills: ['Statistics', 'C++', 'Financial Modeling', 'SQL', 'Risk Analysis'],
    description: 'Apply mathematical and statistical models to trade financial securities and manage investment risks.'
  },
  {
    id: '5',
    title: 'Robotics Integration Specialist',
    category: 'Engineering & Robotics',
    matchScore: 92,
    salary: '$105k - $160k',
    growth: '+18% (Very High)',
    skills: ['ROS', 'C++', 'CAD Design', 'Sensors', 'Electrical Systems'],
    description: 'Configure and combine mechanical systems with electronic controllers and firmware for automation.'
  },
  {
    id: '6',
    title: 'Bioinformatics Researcher',
    category: 'Biotechnology & Science',
    matchScore: 85,
    salary: '$90k - $145k',
    growth: '+15% (High)',
    skills: ['Genomics', 'R Programming', 'Data Analysis', 'Python', 'Biostatistics'],
    description: 'Use computational software tools to analyze biological data, model structures, and unlock genetics.'
  }
];

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  scores: { [careerTitle: string]: number };
}

interface Quiz {
  id: string;
  title: string;
  desc: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestion[];
}

interface QuizAttempt {
  quizId: string;
  quizTitle: string;
  score: number;
  matchProfile: string;
  date: string;
}

const QUIZZES_DATA: Quiz[] = [
  {
    id: 'quiz-1',
    title: '💻 Tech Career Aptitude Test',
    desc: 'Evaluate your strengths in logic, algorithm design, system scaling, and client-side interfaces to find your perfect software engineering path.',
    category: 'Software & Technology',
    duration: '5 Questions • 4 mins',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'q1-1',
        text: 'When working on a project, which layer of the application stack excites you the most?',
        options: [
          'Building fluid responsive interfaces, micro-animations, and handling state values.',
          'Designing API routers, database indexing structures, and server middlewares.',
          'Configuring build runners, multi-stage docker caching, and cloud deployments.',
          'Training mathematical prediction algorithms and processing datasets.'
        ],
        scores: { 'Frontend Developer': 5, 'Backend Developer': 1, 'DevOps & Cloud Engineer': 0, 'Machine Learning Engineer': 0 }
      },
      {
        id: 'q1-2',
        text: 'How do you prefer to store and retrieve application data?',
        options: [
          'In local storage sessions or localized React Context state buffers.',
          'Structured SQL relational database transactions with indexing optimizations.',
          'Docker container volumes and declarative cloud configuration states.',
          'Heavy numpy arrays and pandas DataFrame spreadsheets.'
        ],
        scores: { 'Frontend Developer': 1, 'Backend Developer': 5, 'DevOps & Cloud Engineer': 2, 'Machine Learning Engineer': 3 }
      },
      {
        id: 'q1-3',
        text: 'Which scripting/programming tool do you feel most comfortable working with?',
        options: [
          'TypeScript / JavaScript / HTML5',
          'Go / Python / Node.js / Java',
          'Bash / Shell scripts / YAML configurations',
          'Python (Pandas, PyTorch) / R / C++'
        ],
        scores: { 'Frontend Developer': 5, 'Backend Developer': 3, 'DevOps & Cloud Engineer': 4, 'Machine Learning Engineer': 4 }
      },
      {
        id: 'q1-4',
        text: 'What do you consider to be the most satisfying part of debugging?',
        options: [
          'Fixing CSS reflow issues and layout shifts for a pixel-perfect design.',
          'Optimizing deep nested SQL queries and fixing race conditions in concurrent APIs.',
          'Fixing a broken CI/CD pipeline deploy script to automate release builds.',
          'Tuning model hyperparameters to reduce training loss percentage.'
        ],
        scores: { 'Frontend Developer': 5, 'Backend Developer': 2, 'DevOps & Cloud Engineer': 4, 'Machine Learning Engineer': 3 }
      },
      {
        id: 'q1-5',
        text: 'How do you view system scalability?',
        options: [
          'Reducing browser bundle size, dynamic imports, and asset optimization.',
          'API gatekeepers, caching endpoints via Redis, and connection pooling.',
          'Auto-scaling server instances, orchestrating fleets via Kubernetes clusters.',
          'Optimizing batch inferences and using GPU thread blocks efficiently.'
        ],
        scores: { 'Frontend Developer': 3, 'Backend Developer': 4, 'DevOps & Cloud Engineer': 5, 'Machine Learning Engineer': 2 }
      }
    ]
  },
  {
    id: 'quiz-2',
    title: '🎨 Creative Design & UI/UX Fit',
    desc: 'Analyze your user empathy, graphic layouts, wireframe design, and visual styling to evaluate your design career alignment.',
    category: 'Design & Creative',
    duration: '3 Questions • 3 mins',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'q2-1',
        text: 'What is the most critical element of a web interface?',
        options: [
          'Clean, user-centric wireframes that require zero instructions to navigate.',
          'Stunning color harmony, fonts, and dark space aesthetics.',
          'Passing Lighthouse WCAG accessibility compliance standards.',
          'Fast page load times and network throughput speed.'
        ],
        scores: { 'UI/UX Product Designer': 5, 'Creative Content Director': 3, 'Frontend Developer': 2 }
      },
      {
        id: 'q2-2',
        text: 'Choose a tool that you would use daily:',
        options: [
          'Figma / Adobe XD prototyping systems',
          'Illustrator / Photoshop / Creative Suite asset creation',
          'HTML5 / CSS3 / Tailwind layout templates',
          'Python scripts for batch processing datasets'
        ],
        scores: { 'UI/UX Product Designer': 5, 'Creative Content Director': 4, 'Frontend Developer': 1 }
      },
      {
        id: 'q2-3',
        text: 'How do you make design decisions?',
        options: [
          'By conducting structured user testing interviews and reviewing heatmaps.',
          'By analyzing brand identity layouts and emotional brand stories.',
          'By matching client-side responsiveness grid components.',
          'By running A/B testing statistical regression math.'
        ],
        scores: { 'UI/UX Product Designer': 5, 'Creative Content Director': 4, 'Frontend Developer': 1 }
      }
    ]
  }
];

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: string;
  isSaved?: boolean;
}

// Dynamic structured roadmaps definition
interface RoadmapStep {
  id: string;
  title: string;
  desc: string;
  resources: string[];
  subtopics?: string[];
  projects?: string[];
  estimatedTime?: string;
}

interface RoadmapConfig {
  title: string;
  description: string;
  modulesCount: number;
  hours: number;
  enrolled: string;
  steps: RoadmapStep[];
}

const ROADMAPS_DATA: { [key: string]: RoadmapConfig } = {
  frontend: {
    title: 'Frontend Developer',
    description: 'Master modern client-side web applications using React, TailwindCSS, build pipelines, testing setups, and optimization protocols.',
    modulesCount: 120,
    hours: 450,
    enrolled: 'Trending • 449K enrolled',
    steps: [
      { 
        id: 'fe-1', 
        title: 'Internet Protocols & DNS', 
        desc: 'Understand DNS mapping, IP addressing, HTTP request-response headers, and DOM lifecycle.', 
        resources: ['MDN Web Docs', 'HTTP Protocol Overview'],
        subtopics: ['How the Internet works (IP/TCP)', 'DNS Resolution & Name Servers', 'HTTP request-response structure', 'DOM, CSSOM & Render tree generation'],
        projects: ['Perform DNS lookups via nslookup/dig, analyze network requests via browser DevTools network panel.'],
        estimatedTime: '12 hours'
      },
      { 
        id: 'fe-2', 
        title: 'HTML5 Semantic Layout & SEO', 
        desc: 'Valid semantic tags, search engine indexing structures, meta fields, and WCAG accessibility standards.', 
        resources: ['HTML Living Standard', 'WCAG Guidelines'],
        subtopics: ['Semantic Tags (<article>, <section>, etc.)', 'Meta tags & OpenGraph metadata', 'ARIA roles & accessibility tags', 'SEO indexing structures'],
        projects: ['Build a highly accessible article dashboard that scores 100% on Lighthouse Accessibility audit.'],
        estimatedTime: '15 hours'
      },
      { 
        id: 'fe-3', 
        title: 'CSS3 Grid, Flexbox, & Tailwind Spacings', 
        desc: 'Modern responsive grids, containers, spacing rules, utility tokens, transitions, and layout frameworks.', 
        resources: ['TailwindCSS Docs', 'CSS Grid Garden'],
        subtopics: ['Flexbox container alignments', 'CSS Grid layouts & dynamic tracks', 'Responsive breakpoints', 'Tailwind custom theme config'],
        projects: ['Design a fully responsive complex dashboard layout using TailwindCSS Grid and Flexbox.'],
        estimatedTime: '25 hours'
      },
      { 
        id: 'fe-4', 
        title: 'JavaScript Engine & Async REST Integration', 
        desc: 'Callbacks, Promises, Async/Await APIs fetch, ES6 syntax patterns, closures, and browser memory cycles.', 
        resources: ['Eloquent JS', 'MDN JS Reference'],
        subtopics: ['Event loops & microtasks', 'ES6 array methods & destructuring', 'Promises & Async/Await syntax', 'Fetch API & REST request methods'],
        projects: ['Create a client-side weather app that fetches data asynchronously, handles loading/error states, and updates UI dynamically.'],
        estimatedTime: '40 hours'
      },
      { 
        id: 'fe-5', 
        title: 'React Framework, Rendering, & State Trees', 
        desc: 'Virtual DOM, components lifecycle, state hooks (useState, useEffect), router mechanisms, and context providers.', 
        resources: ['Official React Docs', 'TypeScript React Cheatsheet'],
        subtopics: ['Virtual DOM diffing', 'Hooks lifecycle (useState, useEffect, useMemo)', 'Context API & State sharing', 'React Router or Navigation hooks'],
        projects: ['Develop an interactive e-commerce shopping cart component with persistent local storage state.'],
        estimatedTime: '60 hours'
      },
      { 
        id: 'fe-6', 
        title: 'Next.js App Router, SSR, & RSC', 
        desc: 'Server-side rendering (SSR), static site generation (SSG), React Server Components (RSC), and Server Actions.', 
        resources: ['Next.js App Router Guide', 'RSC Deep Dive'],
        subtopics: ['App Router directory architecture', 'React Server Components vs Client Components', 'Data fetching & caching strategy', 'Server Actions for form submissions'],
        projects: ['Build a dynamic markdown blog using Next.js App Router with server-side rendered dynamic posts.'],
        estimatedTime: '45 hours'
      },
      { 
        id: 'fe-7', 
        title: 'Frontend Testing (Jest, RTL, & Cypress)', 
        desc: 'Writing unit tests for hooks/components, user interaction mocking, and end-to-end (E2E) UI testing.', 
        resources: ['Jest Documentation', 'Testing Library Guides'],
        subtopics: ['Unit testing with Jest', 'Component testing with React Testing Library', 'Mocking API requests', 'E2E testing with Cypress'],
        projects: ['Write comprehensive unit tests for a custom React hook and E2E login/checkout flows.'],
        estimatedTime: '30 hours'
      },
      { 
        id: 'fe-8', 
        title: 'Web Performance Optimization & Vitals', 
        desc: 'Code splitting, dynamic imports, lazy loading assets, image optimization formats, and monitoring Lighthouse Web Vitals.', 
        resources: ['Google Web Vitals', 'Lighthouse Optimization Checklist'],
        subtopics: ['Core Web Vitals (LCP, FID, CLS)', 'Dynamic imports & React.lazy', 'Image rendering formats (WebP/AVIF)', 'Bundle analysis & tree shaking'],
        projects: ['Audit a slow project, implement code splitting, optimize assets, and increase performance score from 50 to 95+.'],
        estimatedTime: '20 hours'
      }
    ]
  },
  backend: {
    title: 'Backend Developer',
    description: 'Build secure server architectures, API routing middleware, structured database schemas, microservice messaging channels, and system monitors.',
    modulesCount: 140,
    hours: 520,
    enrolled: 'Hot • 320K enrolled',
    steps: [
      { 
        id: 'be-1', 
        title: 'Server Runtimes & Languages (NodeJS / Go / Python)', 
        desc: 'Concurrency models, thread pools, file management, error catch middlewares, and server frameworks.', 
        resources: ['NodeJS Architecture Guide', 'Go Tour for Beginners'],
        subtopics: ['Event-driven non-blocking I/O in Node', 'Goroutines and channels in Go', 'HTTP middleware chain', 'Global exception handling'],
        projects: ['Build a robust API shell in Node/Express or Go with comprehensive error loggers and environment configuration.'],
        estimatedTime: '35 hours'
      },
      { 
        id: 'be-2', 
        title: 'SQL & NoSQL Database Indexes & ACID Transactions', 
        desc: 'Entity relationships, SQL query indexing, database isolation levels (ACID), Redis cache clusters, and MongoDB queries.', 
        resources: ['PostgreSQL Indexing docs', 'Designing Data-Intensive Applications'],
        subtopics: ['SQL database normalizations', 'B-Tree & Hash indexes', 'ACID transactions & isolation levels', 'Redis key-value caching policies'],
        projects: ['Design a database schema for a banking/e-commerce ledger and implement transactional locks and queries.'],
        estimatedTime: '45 hours'
      },
      { 
        id: 'be-3', 
        title: 'API Protocols: REST, GraphQL, & gRPC Protobufs', 
        desc: 'API endpoints design, payload serialization formats, gRPC channels, Swagger specifications, and rate limiters.', 
        resources: ['Swagger Spec API Guidelines', 'GraphQL schemas tutorial'],
        subtopics: ['REST API design rules', 'GraphQL schemas, queries, & resolvers', 'gRPC Protocol Buffers & streaming', 'Rate limiting algorithms (token bucket)'],
        projects: ['Create a gateway routing interface that aggregates REST endpoints and exposes them via a GraphQL gateway.'],
        estimatedTime: '40 hours'
      },
      { 
        id: 'be-4', 
        title: 'Security: OAuth2, JWT Sessions, & secure cookies', 
        desc: 'Implementing cross-origin permissions (CORS), secure headers, JWT auth cycles, and password hashing (bcrypt).', 
        resources: ['OWASP Top 10 Security Rules', 'JWT Decoder Guide'],
        subtopics: ['JWT sign/verify mechanisms', 'CSRF and XSS protection strategies', 'OAuth2 authorization code flows', 'Secure, HTTP-only, SameSite cookies'],
        projects: ['Implement a secure authentication microservice featuring access/refresh token rotation and secure cookies.'],
        estimatedTime: '30 hours'
      },
      { 
        id: 'be-5', 
        title: 'Background Processing & Message Queues', 
        desc: 'Asynchronous event listeners, pub/sub architectures, RabbitMQ broker channels, BullMQ jobs, and Redis locks.', 
        resources: ['RabbitMQ official docs', 'BullMQ quickstart'],
        subtopics: ['Message brokers (AMQP vs Pub/Sub)', 'BullMQ job retries & delay processors', 'Distributed locks with Redis Redlock', 'Eventual consistency paradigms'],
        projects: ['Build a video processing microservice that processes uploaded video encoding jobs asynchronously via message queues.'],
        estimatedTime: '35 hours'
      },
      { 
        id: 'be-6', 
        title: 'Microservices & Architectural Patterns', 
        desc: 'Designing distributed architectures, API gateways, database per service patterns, and event sourcing principles.', 
        resources: ['Microservices.io guide', 'Martin Fowler Blog'],
        subtopics: ['Service discovery & health checks', 'API Gateway pattern (e.g. Kong, Envoy)', 'Database per service architecture', 'Event Sourcing & CQRS'],
        projects: ['Structure a miniature microservices application using Docker Compose with independent database containers.'],
        estimatedTime: '50 hours'
      },
      { 
        id: 'be-7', 
        title: 'Backend Testing: Unit, Integration, & Mocking', 
        desc: 'Writing mock tests with Sinon/Mockery, DB isolation testing, and API integration validations.', 
        resources: ['Backend Testing Cookbook', 'SuperTest guide'],
        subtopics: ['Mocking external API dependencies', 'SuperTest for HTTP endpoint testing', 'Test container databases', 'Code coverage reports'],
        projects: ['Write integration tests for a complex transaction handler, mocking the payment gateway and external service hooks.'],
        estimatedTime: '25 hours'
      },
      { 
        id: 'be-8', 
        title: 'APM Monitoring, Metrics, & Structured Logging', 
        desc: 'Integrating Prometheus metric collectors, Grafana dashboard visualization, Winston/Zap logging, and ELK stack search.', 
        resources: ['Prometheus Quickstart', 'Winston Logging Best Practices'],
        subtopics: ['Structured logs formatting (JSON)', 'Prometheus metrics scrapers', 'Grafana system visualizers', 'Distributed request tracing (Zipkin/Jaeger)'],
        projects: ['Setup Prometheus and Grafana alerts to monitor active user requests and API error rate peaks.'],
        estimatedTime: '20 hours'
      }
    ]
  },
  fullstack: {
    title: 'Full-Stack Developer',
    description: 'Integrate responsive user interfaces with server routers and relational schemas. Master payment webhooks and scalable serverless environments.',
    modulesCount: 160,
    hours: 600,
    enrolled: 'Popular • 510K enrolled',
    steps: [
      { 
        id: 'fs-1', 
        title: 'Next.js, Server Actions, & RSC', 
        desc: 'Server side rendering (SSR), static site generators (SSG), client hydration patterns, and Next routing.', 
        resources: ['NextJS Routing docs', 'React Server Components guide'],
        subtopics: ['Server Actions for client form validation', 'Dynamic caching & revalidations', 'Hydration error debugging', 'Streaming HTML & suspense layouts'],
        projects: ['Build a real-time blog database that loads pages instantly with SSR and handles comments via Server Actions.'],
        estimatedTime: '40 hours'
      },
      { 
        id: 'fs-2', 
        title: 'ORMs (Prisma / Drizzle) & Schema Migrations', 
        desc: 'Type-safe database queries, transactional statements, foreign keys constraints, and migration scripts.', 
        resources: ['Prisma Client guides', 'Drizzle ORM quickstart'],
        subtopics: ['Writing clean database schema files', 'One-to-many & Many-to-many queries', 'Database migration version controls', 'Seeding dev environments'],
        projects: ['Write complex SQL relationships using Drizzle or Prisma for an online course platform schema.'],
        estimatedTime: '30 hours'
      },
      { 
        id: 'fs-3', 
        title: 'Session Stores & Third-Party Auth Integrations', 
        desc: 'NextAuth providers configuration, multi-factor auth schemes, user tables management, and credentials providers.', 
        resources: ['NextAuth.js Documentation', 'Auth0 custom strategies'],
        subtopics: ['Session vs JWT strategy', 'Social OAuth login setups (Google, GitHub)', 'Role-based access control (RBAC) middleware', 'Password recovery workflows'],
        projects: ['Implement a secure SaaS dashboard requiring authentication, redirecting anonymous users to sign in.'],
        estimatedTime: '35 hours'
      },
      { 
        id: 'fs-4', 
        title: 'Docker Containers & Cloud deployment pipelines', 
        desc: 'Multi-stage dockerfiles, environment configuration maps, AWS EC2 containers deployment, and serverless edge functions.', 
        resources: ['Docker reference manual', 'AWS Serverless Developer Guide'],
        subtopics: ['Writing lightweight multi-stage Dockerfiles', 'Configuring environment variables in production', 'AWS App Runner or ECS deployments', 'Serverless execution timeouts'],
        projects: ['Dockerize a full React & Node application, pushing the built image to AWS or Vercel edge runtime.'],
        estimatedTime: '45 hours'
      },
      { 
        id: 'fs-5', 
        title: 'API Gateways & Edge Middleware Routing', 
        desc: 'Configuring custom subdomains routing, geo-blocking middleware, request pre-validation, and JWT extraction at edge.', 
        resources: ['Vercel Edge Middleware', 'Cloudflare Workers docs'],
        subtopics: ['Edge runtime capabilities', 'URL rewrites and redirects', 'Geo-IP header extraction', 'JWT parsing at the edge layer'],
        projects: ['Implement geolocation routing redirecting global traffic to localized site subdomains.'],
        estimatedTime: '30 hours'
      },
      { 
        id: 'fs-6', 
        title: 'Real-time Messaging (WebSockets & SSE)', 
        desc: 'Integrating event listeners with Socket.io, real-time message broadcasting, and server-sent events (SSE).', 
        resources: ['Socket.io docs', 'SSE Guide'],
        subtopics: ['Websocket connection upgrades', 'Room management in Socket.io', 'Server-Sent Events (SSE) push messages', 'Handling connection drop-offs'],
        projects: ['Build a real-time collaborative whiteboard or chatroom supporting user online status tags.'],
        estimatedTime: '40 hours'
      },
      { 
        id: 'fs-7', 
        title: 'Payment Gateways & Secure Webhooks (Stripe)', 
        desc: 'Managing Stripe customer portal checkouts, webhook signature verification, and event processing.', 
        resources: ['Stripe API reference', 'Webhooks debugging guide'],
        subtopics: ['Stripe checkout session creation', 'Webhook signature matching & validation', 'Managing subscription items', 'Handling card failure webhooks'],
        projects: ['Develop a complete SaaS subscription pricing page integrated with Stripe webhooks to update user tier levels.'],
        estimatedTime: '45 hours'
      },
      { 
        id: 'fs-8', 
        title: 'Serverless Databases & Caching at Edge', 
        desc: 'Distributed database instances (PlanetScale, Neon), caching queries using Vercel KV, and global replication.', 
        resources: ['Neon serverless Postgres docs', 'Vercel KV guide'],
        subtopics: ['Connection pooling in serverless', 'Vercel KV / Redis edge setups', 'Global CDN replication rules', 'Handling cold starts'],
        projects: ['Implement a fast search caching system storing heavy database results inside Vercel Redis KV cache.'],
        estimatedTime: '30 hours'
      }
    ]
  },
  devops: {
    title: 'DevOps & Cloud Engineer',
    description: 'Automate software build workflows, orchestrate container clusters, manage infrastructure-as-code scripts, and monitor system metrics.',
    modulesCount: 130,
    hours: 480,
    enrolled: 'High Demand • 190K enrolled',
    steps: [
      { 
        id: 'do-1', 
        title: 'Linux Administration, Shell Scripting, & SSH', 
        desc: 'Unix directory permissions, process management, Cron schedulers, Bash script automations, and secure SSH tunnels.', 
        resources: ['Linux Command Line Bible', 'Shell Scripting guides'],
        subtopics: ['Bash script loops, variables, and conditions', 'Linux file permissions (chmod/chown)', 'Process signals & background execution', 'SSH key setups & config files'],
        projects: ['Write a backup bash script executing nightly database dumps, uploading them to remote storage.'],
        estimatedTime: '25 hours'
      },
      { 
        id: 'do-2', 
        title: 'Docker Orchestration & Container Caching', 
        desc: 'Multi-stage docker caching, network configurations, volume mounts, and environment configuration mapping.', 
        resources: ['Docker Multi-stage guide', 'Dockerfile Best Practices'],
        subtopics: ['Docker layer caching techniques', 'Docker bridge & host networking', 'Volume binds & persistence mapping', 'Env config maps'],
        projects: ['Configure Docker Compose linking a React app, Express api, and MySQL database.'],
        estimatedTime: '30 hours'
      },
      { 
        id: 'do-3', 
        title: 'Kubernetes Pods, Ingress, & Helm Charts', 
        desc: 'Orchestrating container fleets, configuring services ingress routing rules, secrets encryption, and Helm package managers.', 
        resources: ['Kubernetes official tutorials', 'Helm documentation'],
        subtopics: ['Pod lifecycles & ReplicaSets', 'Service resource definitions (ClusterIP, NodePort)', 'Ingress controller setup (Nginx)', 'Helm chart templates'],
        projects: ['Deploy an API container to a local Minikube cluster and configure ingress paths with health probes.'],
        estimatedTime: '55 hours'
      },
      { 
        id: 'do-4', 
        title: 'Infrastructure as Code: Terraform Systems', 
        desc: 'Managing cloud infrastructure declaratively, state storage files, provider configuration parameters, and custom modules.', 
        resources: ['Terraform CLI reference', 'HashiCorp learning portal'],
        subtopics: ['Declarative vs Imperative IaC', 'Terraform state locking with S3/DynamoDB', 'Custom reusable modules', 'Terraform variables and outputs'],
        projects: ['Provision an AWS VPC complete with public/private subnets and an EC2 instance using Terraform.'],
        estimatedTime: '45 hours'
      },
      { 
        id: 'do-5', 
        title: 'CI/CD Pipelines & GitHub Runners', 
        desc: 'Configuring test runners, build pipelines, secrets storage rotations, environment variables mapping, and auto deployments.', 
        resources: ['GitHub Actions guide', 'GitLab CI reference docs'],
        subtopics: ['YAML pipeline structures', 'Action caching workflows', 'Secrets management in pipelines', 'Conditional deployments'],
        projects: ['Build a GitHub Action deploying a serverless app to AWS upon pull request merge.'],
        estimatedTime: '35 hours'
      },
      { 
        id: 'do-6', 
        title: 'Cloud Administration (AWS IAM, VPC, & security)', 
        desc: 'Configuring secure VPC private subnets, configuring Route53 tables, and setting up IAM least privilege permission maps.', 
        resources: ['AWS IAM Security', 'VPC Architecture Blueprint'],
        subtopics: ['AWS IAM policies and role assume rules', 'VPC routing tables, IGW, and NAT Gateways', 'Route53 records setups', 'CloudWatch log groups'],
        projects: ['Configure a private database subnet in AWS accessible only from a public web server security group.'],
        estimatedTime: '50 hours'
      },
      { 
        id: 'do-7', 
        title: 'APM Monitoring & Alert systems (Grafana)', 
        desc: 'Prometheus metric scraping rules, configuring alerts pipelines with PagerDuty, and visual dashboard configuration.', 
        resources: ['Grafana Alerting Guide', 'PagerDuty Integration'],
        subtopics: ['Scrape intervals config', 'PromQL queries formulation', 'Grafana dashboard visualizations', 'Alert manager channels mapping'],
        projects: ['Design a Grafana dashboard graphing CPU limits and alerting slack on critical threshold violations.'],
        estimatedTime: '25 hours'
      },
      { 
        id: 'do-8', 
        title: 'Secret Management Systems (HashiCorp Vault)', 
        desc: 'Encrypting database passwords, dynamic secrets creation, keys rotation policies, and Vault access engines.', 
        resources: ['HashiCorp Vault Reference', 'KMS encryption basics'],
        subtopics: ['Vault storage engines configuration', 'Dynamic database secrets generation', 'Key rotation policies & wrapping', 'AppRole authentication method'],
        projects: ['Setup a local HashiCorp Vault server, retrieve credentials securely inside an active node service.'],
        estimatedTime: '25 hours'
      }
    ]
  },
  ml: {
    title: 'Machine Learning Engineer',
    description: 'Perform advanced mathematical regressions, design neural architectures, run structured pandas datasets, and scale model inference APIs.',
    modulesCount: 150,
    hours: 550,
    enrolled: 'Trending • 280K enrolled',
    steps: [
      { 
        id: 'ml-1', 
        title: 'Mathematics: Calculus, Linear Algebra, & Stats', 
        desc: 'Vector matrix operations, partial derivatives, loss functions theory, and statistical probability distributions.', 
        resources: ['Khan Academy Advanced Stats', 'MIT Matrix Lectures'],
        subtopics: ['Matrix multiplication & determinants', 'Eigenvalues & Eigenvectors', 'Partial derivatives & Gradient Descent', 'Bayes Theorem & probability distributions'],
        projects: ['Implement standard Linear Regression and Gradient Descent formulas manually using pure Python.'],
        estimatedTime: '40 hours'
      },
      { 
        id: 'ml-2', 
        title: 'Structured Data Processing (Pandas & NumPy)', 
        desc: 'Data cleaning, feature selections, vectorizations, missing value interpolations, and visualizations.', 
        resources: ['Pandas Cookbooks', 'NumPy Reference manual'],
        subtopics: ['NumPy vector operations', 'Pandas DataFrame filtering & grouping', 'Handling missing dataset rows', 'Encoding categorical columns'],
        projects: ['Clean and prepare a raw dataset containing missing housing data, readying it for modeling.'],
        estimatedTime: '30 hours'
      },
      { 
        id: 'ml-3', 
        title: 'Data Visualization & Feature Engineering', 
        desc: 'Designing scatter plots, correlation matrices with Seaborn, out-of-distribution detection, and normalization.', 
        resources: ['Seaborn Quickstart', 'Matplotlib tutorials'],
        subtopics: ['Correlation coefficient heatmap', 'Scatter plot distributions', 'StandardScaling and MinMaxScaling', 'Feature interaction columns creation'],
        projects: ['Run Exploratory Data Analysis (EDA) on a churn dataset, plotting charts that reveal correlations.'],
        estimatedTime: '25 hours'
      },
      { 
        id: 'ml-4', 
        title: 'Classical ML Models (Scikit-Learn)', 
        desc: 'Training decision trees, linear regressions, Support Vector Machines (SVM), and hyperparameter grid searches.', 
        resources: ['Scikit-Learn documentation', 'Intro to ML with Python'],
        subtopics: ['Supervised vs Unsupervised models', 'K-fold Cross Validation', 'GridSearchCV and RandomSearchCV', 'Precision, Recall, & F1 metric evaluation'],
        projects: ['Train a Random Forest classifier to predict customer defaults, tuning hyperparameters.'],
        estimatedTime: '45 hours'
      },
      { 
        id: 'ml-5', 
        title: 'Neural Architectures & Training (PyTorch)', 
        desc: 'Backpropagations, layers configurations (CNN, RNN, Transformers), optimization cycles, and GPU tensor training.', 
        resources: ['PyTorch official tutorials', 'Deep Learning Book'],
        subtopics: ['PyTorch Tensors & autograd', 'Designing Custom Neural Network modules', 'Loss Functions & Optimizers (Adam, SGD)', 'Training loops and CUDA execution'],
        projects: ['Build an Image Classifier on the MNIST dataset, training a CNN architecture from scratch.'],
        estimatedTime: '60 hours'
      },
      { 
        id: 'ml-6', 
        title: 'Transformers & Large Language Models (LLMs)', 
        desc: 'Fine-tuning attention maps, configuring multi-head attention weights, HuggingFace dataset pipelines, and tokenizers.', 
        resources: ['HuggingFace Course', 'Attention Is All You Need Paper'],
        subtopics: ['Self-attention & Multi-head attention math', 'HuggingFace Transformers API', 'Parameter Efficient Fine-Tuning (LoRA)', 'Tokenization and masking strategies'],
        projects: ['Fine-tune a small BERT/T5 model on a custom text classification task using HuggingFace.'],
        estimatedTime: '55 hours'
      },
      { 
        id: 'ml-7', 
        title: 'MLOps: Model Versioning & MLflow Pipelines', 
        desc: 'Configuring model registers, metadata versioning with DVC, hyperparameter run tracking, and artifacts storage.', 
        resources: ['MLflow quickstart guide', 'DVC reference guide'],
        subtopics: ['DVC integration with Git', 'MLflow experiment run logging', 'Registering model artifacts versioning', 'Pipeline orchestration (Kubeflow/Airflow)'],
        projects: ['Create a complete automated training pipeline that records and registers model runs to MLflow.'],
        estimatedTime: '40 hours'
      },
      { 
        id: 'ml-8', 
        title: 'Model Serving & Inference Orchestration', 
        desc: 'Deploying inference wrappers with Triton inference server, ONNX export configurations, and FastAPI endpoint serving.', 
        resources: ['FastAPI ML serving template', 'ONNX conversion tutorial'],
        subtopics: ['FastAPI asynchronous routing', 'Converting PyTorch models to ONNX formats', 'Triton inference server layouts', 'Docker container optimization for GPUs'],
        projects: ['Deploy your fine-tuned model behind a FastAPI wrapper endpoint, running inside Docker.'],
        estimatedTime: '35 hours'
      }
    ]
  }
};

interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  title: string;
  content: string;
  category: 'General' | 'Tech Careers' | 'Interview Tips' | 'Learning Groups';
  upvotes: number;
  hasUpvoted?: boolean;
  hasDownvoted?: boolean;
  commentsCount: number;
  time: string;
  comments: { author: string; content: string; time: string }[];
}

const INITIAL_POSTS: ForumPost[] = [
  {
    id: '1',
    author: 'Alex Rivera',
    avatar: 'AR',
    role: 'Aspiring ML Engineer',
    title: 'How deep should my Math background be for entry-level Machine Learning roles?',
    content: 'Hey everyone! I\'m currently following the ML path pilot roadmap and learning PyTorch. I\'m wondering if I need to dive extremely deep into multi-variable calculus and linear algebra proofs, or if being able to apply libraries is enough for starter roles? Thanks!',
    category: 'Tech Careers',
    upvotes: 24,
    commentsCount: 2,
    time: '2 hours ago',
    comments: [
      { author: 'Sarah Chen', content: 'Definitely focus on understanding how matrices work, backpropagation mechanics, and basic statistics. You don\'t need pure math proofs, but understanding the intuition is vital!', time: '1 hour ago' },
      { author: 'Devon Patel', content: 'Agreed with Sarah. Also, building projects where you implement basic algorithms from scratch (like PCA or linear regression) helps bridge the gap perfectly.', time: '45 mins ago' }
    ]
  },
  {
    id: '2',
    author: 'Elena Rostova',
    avatar: 'ER',
    role: 'UI Designer',
    title: 'Top 5 Figma plugins that saved me 20+ hours of work last month 🎨',
    content: 'Just wanted to share a quick checklist of plugins that changed my workflow: Autoflow, Content Reel, Stark (for contrast checking), Unsplash, and Similayer. Highly recommend checking them out!',
    category: 'Learning Groups',
    upvotes: 38,
    commentsCount: 1,
    time: '5 hours ago',
    comments: [
      { author: 'Marcus Aurelius', content: 'Stark is a lifesaver. Accessibility should never be an afterthought!', time: '3 hours ago' }
    ]
  },
  {
    id: '3',
    author: 'Liam Kennedy',
    avatar: 'LK',
    role: 'Product Management Intern',
    title: 'A walkthrough of my Google Associate PM interview experience',
    content: 'Just finished my final round yesterday! The behavioral questions were highly structured around leadership and prioritization. Here is a summary of the framework I used: STAR method + estimation sizing...',
    category: 'Interview Tips',
    upvotes: 42,
    commentsCount: 1,
    time: '1 day ago',
    comments: [
      { author: 'Tanya Mehta', content: 'Congratulations on reaching the final round! Could you share how you handled the product design question?', time: '12 hours ago' }
    ]
  }
];

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onOpenChat,
  onNavigateHome,
  onLogout,
  onExploreCareers,
  onUpdateUser,
  isDarkMode,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'roadmaps' | 'interview' | 'forum' | 'settings' | 'chat' | 'quiz' | 'resume' | 'resources' | 'certificates' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([]);

  // Quiz page states
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [quizResult, setQuizResult] = useState<{ matchScore: number; matchProfile: string; strengths: string[]; improvements: string[] } | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('pathpilot_quiz_attempts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        quizId: 'quiz-1',
        quizTitle: '💻 Tech Career Aptitude Test',
        score: 92,
        matchProfile: 'Machine Learning Engineer',
        date: 'August 6, 2026'
      }
    ];
  });

  // Settings page states
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileBio, setProfileBio] = useState('Passionate student exploring artificial intelligence engineering and building high-performance systems.');
  const [profileGoal, setProfileGoal] = useState('AI & Machine Learning Specialist');
  const [profileGithub, setProfileGithub] = useState('https://github.com/student-dev');
  const [profileLinkedin, setProfileLinkedin] = useState('https://linkedin.com/in/student-dev');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enable2FA, setEnable2FA] = useState(false);
  const [prefTheme, setPrefTheme] = useState<'dark' | 'light'>(isDarkMode ? 'dark' : 'light');
  const [prefEmailNotifs, setPrefEmailNotifs] = useState(true);
  const [prefWeeklyReports, setPrefWeeklyReports] = useState(true);
  const [googleConnected, setGoogleConnected] = useState(true);
  const [githubConnected, setGithubConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [activeSettingsSection, setActiveSettingsSection] = useState<'profile' | 'account' | 'security' | 'preferences' | 'connected'>('profile');
  const [settingsSuccessMessage, setSettingsSuccessMessage] = useState<string | null>(null);

  // Chat page states
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('pathpilot_chat_sessions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'session-1',
        title: '🤖 AI Engineering Career Path',
        timestamp: '10:30 AM',
        isSaved: true,
        messages: [
          {
            id: 'msg-1',
            sender: 'ai',
            text: 'Hello! I see you are interested in becoming a **Machine Learning Engineer**. How can I help you map out your stream choice or course curricula today?',
            timestamp: '10:28 AM'
          },
          {
            id: 'msg-2',
            sender: 'user',
            text: 'I am in class 11. What computer science concepts should I study first?',
            timestamp: '10:29 AM'
          },
          {
            id: 'msg-3',
            sender: 'ai',
            text: 'Excellent start! At your stage, prioritize learning **Python** basics (control flows, functions, lists) and **fundamental mathematics** (basic linear algebra and statistics). Would you like a weekly curriculum list for Python?',
            timestamp: '10:30 AM'
          }
        ]
      },
      {
        id: 'session-2',
        title: '📄 Resume Formatting Advice',
        timestamp: 'Yesterday',
        messages: [
          {
            id: 'msg-4',
            sender: 'ai',
            text: 'Welcome! Share your draft resume outline or bullet points, and I will show you how to optimize them for **Applicant Tracking Systems (ATS)**.',
            timestamp: 'Yesterday'
          }
        ]
      }
    ];
  });
  
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    const saved = localStorage.getItem('pathpilot_chat_sessions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed[0].id;
      } catch (e) {}
    }
    return 'session-1';
  });

  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Roadmaps State
  const [activeRoadmap, setActiveRoadmap] = useState<'frontend' | 'backend' | 'fullstack' | 'devops' | 'ml'>('frontend');
  const [customRoadmapPrompt, setCustomRoadmapPrompt] = useState('');
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<{title: string, steps: {title: string, desc: string, resources: string[], subtopics?: string[], projects?: string[], estimatedTime?: string}[]} | null>(null);
  const [roadmapDuration, setRoadmapDuration] = useState<'3' | '6' | '9' | '12'>('6');
  const [roadmapViewMode, setRoadmapViewMode] = useState<'content' | 'visual'>('content');
  const [showCustomStudyPlanInput, setShowCustomStudyPlanInput] = useState(false);

  // Dynamic Roadmap Node checklist progress
  const [roadmapProgress, setRoadmapProgress] = useState<{ [key: string]: boolean }>({
    'fe-1': true,
    'fe-2': true,
    'fe-3': false,
    'fe-4': false,
    'fe-5': false,
    'be-1': false,
    'be-2': false,
    'fs-1': false,
    'fs-2': false,
    'do-1': false,
    'do-2': false,
    'ml-1': false,
  });

  // Interview Prep State
  const [selectedPrepTrack, setSelectedPrepTrack] = useState<'behavioral' | 'coding' | 'system'>('behavioral');
  const [interviewResponse, setInterviewResponse] = useState('');
  const [isEvaluatingAnswer, setIsEvaluatingAnswer] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ score: number; strengths: string; improvements: string; ideal: string } | null>(null);
  const [currentMockQuestion, setCurrentMockQuestion] = useState('Tell me about a time you had to deal with conflict in a team project. How did you resolve it?');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Forum State
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [activeForumFilter, setActiveForumFilter] = useState<'All' | 'General' | 'Tech Careers' | 'Interview Tips' | 'Learning Groups'>('All');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'General' | 'Tech Careers' | 'Interview Tips' | 'Learning Groups'>('General');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Toggle Career Bookmark
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedCareers(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  // Filter careers based on search query
  const filteredCareers = MOCK_CAREERS.filter(career => 
    career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Helper to slice roadmap steps based on duration selected by user
  const getFilteredSteps = (roadmapKey: string, duration: '3' | '6' | '9' | '12') => {
    const steps = ROADMAPS_DATA[roadmapKey]?.steps || [];
    if (duration === '3') return steps.slice(0, 2);
    if (duration === '6') return steps.slice(0, 3);
    if (duration === '9') return steps.slice(0, 4);
    return steps; // 12 months shows all steps
  };

  // Generate Custom Roadmap
  const handleGenerateRoadmap = () => {
    if (!customRoadmapPrompt.trim()) return;
    setIsGeneratingRoadmap(true);
    setGeneratedRoadmap(null);
    setTimeout(() => {
      setGeneratedRoadmap({
        title: customRoadmapPrompt,
        steps: [
          {
            title: 'Phase 1: Foundations & Core Tools',
            desc: `Master the basics required for ${customRoadmapPrompt}. Focus on understanding core frameworks, syntax, and tooling.`,
            resources: ['MDN Web Docs / Official Documentation', 'Coursera Introduction Specialization', 'Interactive Coding Tutorials'],
            subtopics: ['Core syntax & environment setup', 'Standard library functions', 'Version control (Git) basics', 'Basic debugging tools & console logs'],
            projects: ['Setup local environment and write 3 basic functional scripts/modules applying the language concepts.'],
            estimatedTime: '20 hours'
          },
          {
            title: 'Phase 2: Project-Based Application',
            desc: 'Start building real-world projects. Implement modern paradigms, state management, API endpoints, or structured data models.',
            resources: ['Build a portfolio with 3 distinct projects', 'Contribute to a community project on GitHub', 'Join dynamic online hackathons'],
            subtopics: ['Creating structured API endpoints/UI layouts', 'Data handling and storage mechanisms', 'State management & user flows', 'Integrating third-party APIs'],
            projects: ['Construct a fully functioning application (e.g. CRUD system, frontend app) deploying it to a free hosting tier.'],
            estimatedTime: '40 hours'
          },
          {
            title: 'Phase 3: Advanced Optimization & Scaling',
            desc: 'Understand deep architectural concepts, security protocols, automated testing pipelines, cloud deployment, and system scalability constraints.',
            resources: ['Advanced Systems Design Guidelines', 'DevOps & CI/CD deployment pipelines', 'Mock architectural planning sessions'],
            subtopics: ['Securing endpoints and data routes', 'Automating deployments with CI/CD', 'Writing integration & mock tests', 'Scaling pipelines & memory optimization'],
            projects: ['Add comprehensive tests to the Phase 2 app, containerize it with Docker, and configure automated GitHub runner deployments.'],
            estimatedTime: '30 hours'
          }
        ]
      });
      setIsGeneratingRoadmap(false);
      setShowCustomStudyPlanInput(false);
    }, 1500);
  };

  // Evaluate Mock Interview Answer
  const handleEvaluateAnswer = () => {
    if (!interviewResponse.trim()) return;
    setIsEvaluatingAnswer(true);
    setAiFeedback(null);
    setTimeout(() => {
      setAiFeedback({
        score: 8,
        strengths: 'Excellent use of the STAR method. You clearly detailed the Conflict, the Action taken (setting up a collaborative brainstorming session), and the positive Result.',
        improvements: 'You could provide more concrete metrics on the outcome. Emphasize the specific communication tools used.',
        ideal: 'Start with a brief context of the project. Explain the root cause of the disagreement objectively. Outline the step-by-step collaborative framework you introduced, and conclude with the professional takeaway.'
      });
      setIsEvaluatingAnswer(false);
    }, 1600);
  };

  // Switch prep question
  const handleNextQuestion = () => {
    setInterviewResponse('');
    setAiFeedback(null);
    const questions = {
      behavioral: [
        'Tell me about a time you failed to meet a deadline. What did you learn?',
        'Describe a situation where you had to quickly adapt to a major change in a project scope.',
        'How do you prioritize your tasks when juggling multiple critical projects?'
      ],
      coding: [
        'Explain the difference between a Hash Map and a Binary Search Tree. When would you use which?',
        'How would you design a rate limiter for a public web API? What algorithms are suitable?',
        'What are the advantages of using REST vs GraphQL for server communications?'
      ],
      system: [
        'Design a system like Twitter. How would you handle high write-loads during popular events?',
        'How does a CDN work, and what caching strategies would you use to deliver static assets globally?',
        'How do you design a database schema for an e-commerce platform that handles transactional consistency?'
      ]
    };
    const trackQuestions = questions[selectedPrepTrack];
    const randomIndex = Math.floor(Math.random() * trackQuestions.length);
    setCurrentMockQuestion(trackQuestions[randomIndex]);
  };

  // Forum Upvote / Downvote
  const handleForumVote = (postId: string, type: 'up' | 'down') => {
    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        let voteDiff = 0;
        let hasUpvoted = post.hasUpvoted;
        let hasDownvoted = post.hasDownvoted;

        if (type === 'up') {
          if (hasUpvoted) {
            voteDiff = -1;
            hasUpvoted = false;
          } else {
            voteDiff = hasDownvoted ? 2 : 1;
            hasUpvoted = true;
            hasDownvoted = false;
          }
        } else {
          if (hasDownvoted) {
            voteDiff = 1;
            hasDownvoted = false;
          } else {
            voteDiff = hasUpvoted ? -2 : -1;
            hasDownvoted = true;
            hasUpvoted = false;
          }
        }
        return {
          ...post,
          upvotes: post.upvotes + voteDiff,
          hasUpvoted,
          hasDownvoted
        };
      }
      return post;
    }));
  };

  // Add Comment to Post
  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [
            ...post.comments,
            {
              author: user?.name || 'Anonymous User',
              content: newCommentText,
              time: 'Just now'
            }
          ]
        };
      }
      return post;
    }));
    setNewCommentText('');
  };

  // Add New Forum Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: String(forumPosts.length + 1),
      author: user?.name || 'Anonymous User',
      avatar: (user?.name || 'AU').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      role: 'Career Path Explorer',
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      upvotes: 1,
      hasUpvoted: true,
      commentsCount: 0,
      time: 'Just now',
      comments: []
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  // Save Settings handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSettingsSection === 'security') {
      if (newPassword && newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
      }
    }

    // Construct updated user object for realtime display propagation
    const updatedUser = {
      ...user,
      name: profileName,
    } as User;

    // Save to local storage cache
    localStorage.setItem('pathpilot_auth_user', JSON.stringify(updatedUser));

    // Trigger callback
    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }

    setSettingsSuccessMessage("Settings saved successfully!");
    setTimeout(() => {
      setSettingsSuccessMessage(null);
    }, 3500);
  };

  // Save chat session list to local storage
  const saveChatSessionsToStorage = (updatedSessions: ChatSession[]) => {
    localStorage.setItem('pathpilot_chat_sessions', JSON.stringify(updatedSessions));
  };

  // Toggle Save Session (star/bookmark)
  const handleToggleSaveSession = (sessionId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setChatSessions(prev => {
      const updated = prev.map(s => s.id === sessionId ? { ...s, isSaved: !s.isSaved } : s);
      saveChatSessionsToStorage(updated);
      return updated;
    });
  };

  // Delete Chat Session
  const handleDeleteChatSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatSessions(prev => {
      const updated = prev.filter(s => s.id !== sessionId);
      saveChatSessionsToStorage(updated);
      
      // If we deleted the active session, switch activeSessionId
      if (activeSessionId === sessionId && updated.length > 0) {
        setActiveSessionId(updated[0].id);
      }
      return updated;
    });
  };

  // Start New Chat session
  const handleStartNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: `💬 Career Discussion #${chatSessions.length + 1}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'ai',
          text: `Welcome! I'm **PATHPILOT AI**, your career counselor. How can I help you explore your interests or build a learning path today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setChatSessions(prev => {
      const updated = [newSession, ...prev];
      saveChatSessionsToStorage(updated);
      return updated;
    });
    setActiveSessionId(newSessionId);
  };

  // Send Message inside Chat
  const handleSendChatMessage = async (presetText?: string) => {
    const queryText = presetText || chatInput.trim();
    if (!queryText || isChatLoading) return;

    if (!presetText) setChatInput('');
    setIsChatLoading(true);

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let currentSession = chatSessions.find(s => s.id === activeSessionId);
    let sessionList = [...chatSessions];

    // If there is no active session, create one
    if (!currentSession) {
      const newSessionId = `session-${Date.now()}`;
      currentSession = {
        id: newSessionId,
        title: queryText.length > 30 ? queryText.slice(0, 30) + '...' : queryText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: [userMsg]
      };
      sessionList = [currentSession, ...sessionList];
      setActiveSessionId(newSessionId);
    } else {
      // Append user message to active session
      sessionList = sessionList.map(s => {
        if (s.id === activeSessionId) {
          const updatedMsgs = [...s.messages, userMsg];
          // Update title if it was default name
          const title = s.title.startsWith('💬 Career Discussion') && s.messages.length <= 1 
            ? (queryText.length > 30 ? queryText.slice(0, 30) + '...' : queryText)
            : s.title;

          return {
            ...s,
            title,
            messages: updatedMsgs,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return s;
      });
    }

    setChatSessions(sessionList);
    saveChatSessionsToStorage(sessionList);

    // Call Groq API
    try {
      const activeMsgs = sessionList.find(s => s.id === currentSession.id)?.messages || [];
      const history = activeMsgs.map(msg => ({
        role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.text
      }));

      const reply = await fetchGroqChatResponse(history);

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatSessions(prev => {
        const updated = prev.map(s => {
          if (s.id === currentSession.id) {
            return { ...s, messages: [...s.messages, aiMsg] };
          }
          return s;
        });
        saveChatSessionsToStorage(updated);
        return updated;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Start Quiz
  const handleStartQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizResult(null);
  };

  // Select Quiz Option
  const handleSelectQuizOption = (qIdx: number, oIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: oIdx
    }));
  };

  // Submit Quiz & Tally Scores
  const handleSubmitQuiz = () => {
    const quiz = QUIZZES_DATA.find(q => q.id === activeQuizId);
    if (!quiz) return;

    const tally: { [career: string]: number } = {};
    quiz.questions.forEach((q, qIdx) => {
      const selectedOptionIdx = selectedAnswers[qIdx];
      if (selectedOptionIdx !== undefined) {
        const optionScores = q.scores;
        Object.entries(optionScores).forEach(([career, pts]) => {
          tally[career] = (tally[career] || 0) + pts;
        });
      }
    });

    let bestCareer = 'Machine Learning Engineer';
    let maxPts = -1;
    Object.entries(tally).forEach(([career, pts]) => {
      if (pts > maxPts) {
        maxPts = pts;
        bestCareer = career;
      }
    });

    const score = Math.min(100, Math.round((maxPts / (quiz.questions.length * 5)) * 40) + 60);

    const strengths = [
      'Strong logical execution and structured thinking patterns.',
      'Outstanding aptitude for identifying code architecture blocks.',
      'High user empathy for design patterns and layout structure.'
    ];
    const improvements = [
      'Deepen knowledge in docker environments and serverless edge functions.',
      'Practice writing unit tests and E2E simulation flows.'
    ];

    const result = {
      matchScore: score,
      matchProfile: bestCareer,
      strengths,
      improvements
    };

    setQuizResult(result);

    const newAttempt: QuizAttempt = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      score: score,
      matchProfile: bestCareer,
      date: new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
    };

    const updatedAttempts = [newAttempt, ...quizAttempts];
    setQuizAttempts(updatedAttempts);
    localStorage.setItem('pathpilot_quiz_attempts', JSON.stringify(updatedAttempts));
  };

  // Reset Quiz
  const handleResetQuiz = () => {
    setActiveQuizId(null);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizResult(null);
  };

  // Roadmaps checklists
  const toggleRoadmapNode = (nodeId: string) => {
    setRoadmapProgress(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const getRoadmapProgressPercent = (roadmapKey: string) => {
    const steps = getFilteredSteps(roadmapKey, roadmapDuration);
    if (steps.length === 0) return 0;
    const completed = steps.filter(step => roadmapProgress[step.id]).length;
    return Math.round((completed / steps.length) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080F] text-slate-100 font-inter select-none transition-colors duration-300">
      
      {/* TOP HEADER BAR (From Codexflow reference) */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#090A12]/80 backdrop-blur-md border-b border-[#13172E]">
        <div className="flex items-center gap-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onNavigateHome}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-md shadow-blue-500/25">
              P
            </div>
            <div className="leading-tight">
              <span className="font-sora font-extrabold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                PATHPILOT
              </span>
              <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">AI Studio</span>
            </div>
          </div>

          {/* Top navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-450">
            <button onClick={onNavigateHome} className="hover:text-white transition-colors">Start Your Journey</button>
            <button onClick={() => setActiveTab('forum')} className={`hover:text-white transition-colors ${activeTab === 'forum' ? 'text-white' : ''}`}>Community</button>
            <button onClick={() => setActiveTab('roadmaps')} className={`hover:text-white transition-colors ${activeTab === 'roadmaps' ? 'text-white' : ''}`}>AI-Powered</button>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Workspace</span>
          </div>
        </div>
      </header>

      {/* LOWER WRAPPER: SIDEBAR + MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR (Redesigned matching Codexflow sidebar) */}
        <aside className="w-64 bg-[#090A12] border-r border-[#13172E] p-4 flex flex-col justify-between hidden lg:flex">
          <div className="space-y-6">
            
            {/* MAIN NAVIGATION GROUP */}
            <div className="space-y-1">
              <span className="px-3 block text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-2">Core</span>
              
              <button
                onClick={() => setActiveTab('home')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'home' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('forum')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'forum' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Community Forum</span>
              </button>

              <button
                onClick={() => setActiveTab('roadmaps')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'roadmaps' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <GitFork className="w-4 h-4 shrink-0" />
                <span>Learning Roadmaps</span>
              </button>

              <button
                onClick={() => setActiveTab('interview')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'interview' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>Interview Prep</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Settings & Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'quiz' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Career Quiz</span>
              </button>
            </div>

            {/* ADDITIONAL WORK LABELS (From Codexflow reference) */}
            <div className="space-y-1">
              <span className="px-3 block text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-2">For Work</span>
              
              <button
                onClick={() => setActiveTab('chat')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'chat' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>AI Career Chat</span>
              </button>

              <button
                onClick={() => { onExploreCareers(); }}
                className="w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 text-slate-400 hover:bg-slate-900/60 hover:text-white transition-all"
              >
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Company Insight</span>
              </button>

              <button
                onClick={() => setActiveTab('resume')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'resume' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Resume Builder</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'resources' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Learning Resources</span>
              </button>

              <button
                onClick={() => setActiveTab('certificates')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'certificates' 
                    ? 'bg-blue-600/10 text-blue-450 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Certificates</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`w-full px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-3 transition-all ${
                  activeTab === 'admin' 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Admin Operations</span>
              </button>
            </div>

          </div>

          {/* SIDEBAR FOOTER: USER DETAILS & SIGN OUT */}
          <div className="space-y-3 pt-4 border-t border-[#13172E]">
            <div className="flex items-center gap-3 p-1">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/35 flex items-center justify-center text-blue-400 font-extrabold text-xs shrink-0">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'GU'}
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-xs font-bold text-slate-200 truncate">{user?.name || 'Guest Explorer'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || 'guest@pathpilot.com'}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full px-3 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-550 flex items-center gap-3 transition-all"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN DISPLAY AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#07080F] custom-scrollbar">
          
          {/* MOBILE TABS COMPONENT FOR NAVIGATING TAB VIEWS */}
          <div className="lg:hidden flex bg-[#090A12] p-1 rounded-xl border border-[#13172E] mb-6 overflow-x-auto gap-0.5">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`flex-1 min-w-[65px] py-2 text-center text-[10px] font-bold rounded-lg ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('roadmaps')} 
              className={`flex-1 min-w-[65px] py-2 text-center text-[10px] font-bold rounded-lg ${activeTab === 'roadmaps' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Roadmaps
            </button>
            <button 
              onClick={() => setActiveTab('interview')} 
              className={`flex-1 min-w-[65px] py-2 text-center text-[10px] font-bold rounded-lg ${activeTab === 'interview' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Interview
            </button>
            <button 
              onClick={() => setActiveTab('forum')} 
              className={`flex-1 min-w-[65px] py-2 text-center text-[10px] font-bold rounded-lg ${activeTab === 'forum' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Forum
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`flex-1 min-w-[65px] py-2 text-center text-[10px] font-bold rounded-lg ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Settings
            </button>
            <button 
              onClick={() => setActiveTab('quiz')} 
              className={`flex-1 min-w-[65px] py-2 text-center text-[10px] font-bold rounded-lg ${activeTab === 'quiz' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Quiz
            </button>
          </div>

          {/* ---------------------------------------------------- */}
          {/* TAB 1: DASHBOARD INDEX */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'home' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Top Banner overview */}
              <div className="p-6 rounded-3xl border border-[#13172E] bg-gradient-to-r from-blue-900/10 via-[#0B0D19] to-indigo-900/10 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                <div className="space-y-2 relative z-10">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-sora tracking-tight text-white">
                    Unlock Your Capabilities, {user?.name || 'Explorer'}! 👋
                  </h1>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                    Search matched career guidelines, complete curated developer modules, and evaluate your responses with state-of-the-art simulators.
                  </p>
                </div>
              </div>

              {/* CORE METRICS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl border border-[#13172E] bg-[#090A12] flex items-center gap-4">
                  <div className="p-3 bg-blue-550/10 rounded-xl text-blue-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Top Match Score</span>
                    <span className="text-lg font-extrabold text-white">96% Accuracy</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[#13172E] bg-[#090A12] flex items-center gap-4">
                  <div className="p-3 bg-emerald-550/10 rounded-xl text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Mock Simulator</span>
                    <span className="text-lg font-extrabold text-white">Ready</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[#13172E] bg-[#090A12] flex items-center gap-4">
                  <div className="p-3 bg-orange-550/10 rounded-xl text-orange-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">AI Suggestions</span>
                    <span className="text-lg font-extrabold text-white">12 Available</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[#13172E] bg-[#090A12] flex items-center gap-4">
                  <div className="p-3 bg-indigo-550/10 rounded-xl text-indigo-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Active Roadmaps</span>
                    <span className="text-lg font-extrabold text-white">2 Enrolled</span>
                  </div>
                </div>
              </div>

              {/* DYNAMIC SEARCH & MATCHED CAREERS LIST */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recommended Career Tracks</h3>
                      <span className="text-[10px] text-slate-400 font-semibold">{filteredCareers.length} roles found</span>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search specific roles or programming frameworks (e.g. PyTorch, Figma, C++)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 text-xs bg-[#090A12] border border-[#13172E] focus:border-blue-500 rounded-xl outline-none text-white transition-all focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCareers.map((career) => (
                      <div 
                        key={career.id}
                        onClick={() => setSelectedCareer(career)}
                        className={`p-5 rounded-2xl cursor-pointer border text-left flex flex-col justify-between h-52 transition-all bg-[#090A12] ${
                          selectedCareer?.id === career.id 
                            ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-lg' 
                            : 'border-[#13172E] hover:border-slate-700/80 hover:shadow-md'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                              {career.category}
                            </span>
                            <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                              <Star className="w-3.5 h-3.5 fill-amber-500" />
                              <span>{career.matchScore}%</span>
                            </span>
                          </div>

                          <h4 className="font-bold text-sm text-slate-100">
                            {career.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-3">
                            {career.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#13172E] flex justify-between items-center text-[10px] text-slate-500">
                          <span className="font-bold text-slate-350">{career.salary}</span>
                          <span className="text-emerald-500 font-bold">{career.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SLIDEOUT INSIGHT DRAWER */}
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl border border-[#13172E] bg-[#090A12] space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Map className="w-4 h-4 text-blue-500" />
                      <span>Roadmap Highlights</span>
                    </h3>
                    
                    {selectedCareer ? (
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white">{selectedCareer.title}</h4>
                        
                        <div className="space-y-2">
                          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Required skills</span>
                          <div className="flex flex-wrap gap-1">
                            {selectedCareer.skills.map((skill) => (
                              <span key={skill} className="px-2.5 py-0.5 text-[9px] font-bold bg-[#07080F] border border-[#13172E] rounded-md text-slate-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="p-3 bg-[#07080F] border border-[#13172E] rounded-xl text-[11px] text-slate-400 leading-relaxed">
                          🎯 Ready to commit? Launch our Learning Roadmaps tab to start checking off modules for {selectedCareer.title}.
                        </p>

                        <button 
                          onClick={() => setActiveTab('chat')}
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                          <span>Ask AI Counselor</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 text-center py-8">Select any card to preview roadmap resources.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 2: LEARNING ROADMAPS (Dynamic AI configuration data) */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'roadmaps' && (
            <div className="space-y-6 animate-fadeIn">
              <AIRoadmapGenerator userId={user?.id || 'guest'} isDarkMode={isDarkMode} />
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 3: INTERVIEW PREP */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'interview' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold font-sora text-white">Interview Readiness & Simulator</h2>
                  <p className="text-xs text-slate-400">Practice behavioral and coding topics with instant AI evaluation.</p>
                </div>

                <div className="flex bg-[#090A12] p-1 rounded-xl border border-[#13172E]">
                  <button
                    onClick={() => { setSelectedPrepTrack('behavioral'); handleNextQuestion(); }}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                      selectedPrepTrack === 'behavioral'
                        ? 'bg-[#151930] text-blue-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Behavioral
                  </button>
                  <button
                    onClick={() => { setSelectedPrepTrack('coding'); handleNextQuestion(); }}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                      selectedPrepTrack === 'coding'
                        ? 'bg-[#151930] text-blue-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Coding/Theory
                  </button>
                  <button
                    onClick={() => { setSelectedPrepTrack('system'); handleNextQuestion(); }}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                      selectedPrepTrack === 'system'
                        ? 'bg-[#151930] text-blue-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    System Design
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="p-6 rounded-3xl border border-[#13172E] bg-[#090A12] space-y-6">
                    
                    <div className="p-4 rounded-xl bg-[#07080F] border border-[#13172E] space-y-2">
                      <span className="text-[9px] font-bold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Current Prompt ({selectedPrepTrack})
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                        {currentMockQuestion}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Your Answer</label>
                      <textarea 
                        rows={6}
                        value={interviewResponse}
                        onChange={(e) => setInterviewResponse(e.target.value)}
                        placeholder="Type your response or explanation here..."
                        className="w-full p-4 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white leading-relaxed resize-none"
                      />

                      <div className="flex justify-between items-center gap-3">
                        <button
                          onClick={handleNextQuestion}
                          className="px-4 py-2 border border-[#13172E] hover:bg-slate-900 rounded-xl text-xs font-bold text-slate-400 transition-colors"
                        >
                          Skip / Try Another
                        </button>

                        <button
                          onClick={handleEvaluateAnswer}
                          disabled={isEvaluatingAnswer || !interviewResponse.trim()}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                        >
                          {isEvaluatingAnswer ? 'AI Evaluating...' : 'Submit for Evaluation'}
                        </button>
                      </div>
                    </div>

                    {aiFeedback && (
                      <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-4 animate-slideDown">
                        <div className="flex justify-between items-center pb-2 border-b border-emerald-500/10">
                          <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>AI Assessment Received</span>
                          </span>
                          <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-555 rounded-full">
                            Score: {aiFeedback.score}/10
                          </span>
                        </div>

                        <div className="space-y-3 text-xs leading-relaxed text-slate-400">
                          <div>
                            <strong className="block text-[10px] uppercase font-bold text-emerald-400 tracking-wider mb-1">Key Strengths</strong>
                            <p>{aiFeedback.strengths}</p>
                          </div>
                          <div>
                            <strong className="block text-[10px] uppercase font-bold text-orange-400 tracking-wider mb-1">Room for Improvement</strong>
                            <p>{aiFeedback.improvements}</p>
                          </div>
                          <div>
                            <strong className="block text-[10px] uppercase font-bold text-blue-400 tracking-wider mb-1">Ideal Model Structure</strong>
                            <p className="italic bg-[#07080F] p-3 rounded-xl border border-[#13172E]">{aiFeedback.ideal}</p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-3xl border border-[#13172E] bg-[#090A12] space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-455 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-500" />
                      <span>Popular Questions Bank</span>
                    </h3>
                    
                    <div className="space-y-2">
                      {[
                        {
                          q: 'How do you handle ambiguous specifications in a project?',
                          a: '1. Initiate design scoping meetings immediately.\n2. Create written design briefs with default choices.\n3. Validate prototypes incrementally.'
                        },
                        {
                          q: 'What is Time Complexity of QuickSort (average vs worst)?',
                          a: 'Average is O(n log n). Worst case is O(n²) when the pivot chosen is always the extreme element. Avoid by choosing random/median pivots.'
                        }
                      ].map((faq, idx) => (
                        <div key={idx} className="border border-[#13172E] rounded-xl overflow-hidden text-xs">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                            className="w-full p-3 bg-[#07080F]/50 hover:bg-slate-900 font-semibold text-left flex justify-between items-center gap-2"
                          >
                            <span>{faq.q}</span>
                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-90' : ''}`} />
                          </button>
                          {expandedFaq === idx && (
                            <div className="p-3 bg-[#07080F] border-t border-[#13172E] text-[11px] text-slate-400 leading-relaxed whitespace-pre-line">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 4: DISCUSSION FORUM */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'forum' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold font-sora text-white">Community Discussion Forum</h2>
                  <p className="text-xs text-slate-400">Collaborate, ask questions, and share study resources with other explorers.</p>
                </div>

                <button
                  onClick={() => setShowNewPostModal(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Post</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {['All', 'General', 'Tech Careers', 'Interview Tips', 'Learning Groups'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveForumFilter(cat as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeForumFilter === cat
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-[#090A12] text-slate-400 border border-[#13172E] hover:bg-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-4">
                  {forumPosts
                    .filter(post => activeForumFilter === 'All' || post.category === activeForumFilter)
                    .map((post) => (
                      <div key={post.id} className="p-6 rounded-3xl border border-[#13172E] bg-[#090A12] space-y-4">
                        
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-extrabold text-xs">
                              {post.avatar}
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-white leading-tight">{post.author}</span>
                              <span className="text-[10px] text-slate-505">{post.role} • {post.time}</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-500/10 text-blue-450 border border-blue-500/20 rounded-full">
                            {post.category}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                            {post.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#13172E] flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-[#07080F] rounded-lg p-0.5 border border-[#13172E]">
                              <button 
                                onClick={() => handleForumVote(post.id, 'up')}
                                className={`p-1.5 rounded-md transition-colors ${post.hasUpvoted ? 'text-blue-400 bg-blue-500/10' : 'hover:bg-slate-900'}`}
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 font-bold text-[11px] text-slate-300">
                                {post.upvotes}
                              </span>
                              <button 
                                onClick={() => handleForumVote(post.id, 'down')}
                                className={`p-1.5 rounded-md transition-colors ${post.hasDownvoted ? 'text-rose-400 bg-rose-500/10' : 'hover:bg-slate-900'}`}
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button 
                              onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                              className="flex items-center gap-1.5 hover:text-blue-400 font-bold transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{post.commentsCount} Comments</span>
                            </button>
                          </div>
                        </div>

                        {activeCommentsPostId === post.id && (
                          <div className="pt-4 border-t border-[#13172E] space-y-4 animate-slideDown">
                            <div className="space-y-3.5">
                              {post.comments.map((comment, commentIdx) => (
                                <div key={commentIdx} className="p-3 bg-[#07080F]/50 border border-[#13172E] rounded-xl space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-300">{comment.author}</span>
                                    <span className="text-[9px] text-slate-500">{comment.time}</span>
                                  </div>
                                  <p className="text-xs text-slate-400 leading-relaxed">
                                    {comment.content}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="Write a supportive reply..." 
                                value={newCommentText}
                                onChange={(e) => setNewCommentText(e.target.value)}
                                className="flex-1 px-3.5 py-2 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddComment(post.id);
                                }}
                              />
                              <button
                                onClick={() => handleAddComment(post.id)}
                                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    ))}
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-3xl border border-[#13172E] bg-[#090A12] space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-450">
                      Forum Guidelines
                    </h3>
                    <ul className="text-[11px] text-slate-400 space-y-3 leading-relaxed">
                      <li className="flex gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>Be respectful and supportive of all career goals.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>Avoid spamming self-promotion or non-relevant links.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 5: SETTINGS & PROFILE */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header section */}
              <div className="pb-6 border-b border-[#13172E] flex justify-between items-center flex-wrap gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">Settings & Profile</h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Manage your personal account, set preferences, and configure integrations.
                  </p>
                </div>
                {settingsSuccessMessage && (
                  <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl animate-scaleUp">
                    {settingsSuccessMessage}
                  </div>
                )}
              </div>

              {/* Main settings grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Left tab sub-navigation */}
                <div className="lg:col-span-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 p-1 bg-[#090A12] lg:bg-transparent rounded-2xl border border-[#13172E] lg:border-none">
                  {[
                    { id: 'profile', label: '👤 Profile' },
                    { id: 'account', label: '⚙️ Account Settings' },
                    { id: 'security', label: '🔒 Security' },
                    { id: 'preferences', label: '🎨 Preferences' },
                    { id: 'connected', label: '🔗 Connected Accounts' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveSettingsSection(tab.id as any)}
                      className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex-1 lg:flex-none ${
                        activeSettingsSection === tab.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15'
                          : 'text-slate-400 hover:bg-[#090A12] hover:text-slate-200 border border-transparent lg:hover:border-[#13172E]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Right settings content form */}
                <div className="lg:col-span-3">
                  <form onSubmit={handleSaveSettings} className="p-6 md:p-8 rounded-3xl border border-[#13172E] bg-[#090A12] space-y-6">
                    
                    {/* SECTION 1: PROFILE */}
                    {activeSettingsSection === 'profile' && (
                      <div className="space-y-6 animate-fadeIn text-left">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">Public Profile</h3>
                          <p className="text-[11px] text-slate-500">This information will be displayed publicly on the community forums.</p>
                        </div>

                        {/* Avatar Picker */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#07080F] border border-[#13172E]/40">
                          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/40 flex items-center justify-center text-blue-400 font-extrabold text-xl">
                            {profileName ? profileName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'GU'}
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-200">Profile Picture</span>
                            <span className="block text-[10px] text-slate-500 mt-0.5">Avatars are generated automatically from your initials.</span>
                          </div>
                        </div>

                        {/* Profile form fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
                            <input 
                              type="text"
                              value={profileName}
                              onChange={(e) => setProfileName(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Career Goal</label>
                            <input 
                              type="text"
                              value={profileGoal}
                              onChange={(e) => setProfileGoal(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Short Bio</label>
                          <textarea 
                            rows={3}
                            value={profileBio}
                            onChange={(e) => setProfileBio(e.target.value)}
                            className="w-full p-4 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white resize-none leading-relaxed"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">GitHub Username</label>
                            <input 
                              type="text"
                              value={profileGithub}
                              onChange={(e) => setProfileGithub(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">LinkedIn URL</label>
                            <input 
                              type="text"
                              value={profileLinkedin}
                              onChange={(e) => setProfileLinkedin(e.target.value)}
                              className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION 2: ACCOUNT SETTINGS */}
                    {activeSettingsSection === 'account' && (
                      <div className="space-y-6 animate-fadeIn text-left">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">Account Info</h3>
                          <p className="text-[11px] text-slate-500">Manage email, billing subscription plan and student metrics.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#07080F]/50 border border-[#13172E]/40 rounded-2xl">
                            <div>
                              <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Primary Email Address</span>
                              <span className="block text-xs font-bold text-slate-200 mt-1">{user?.email || 'guest@pathpilot.com'}</span>
                            </div>
                            <div>
                              <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Unique Student ID</span>
                              <span className="block text-[10px] font-mono text-slate-400 mt-1">ID_{user?.id || 'GUEST_076'}</span>
                            </div>
                          </div>

                          <div className="p-4 bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-blue-500/20 rounded-2xl flex justify-between items-center flex-wrap gap-4">
                            <div className="space-y-0.5">
                              <span className="block text-[9px] uppercase font-bold text-blue-400 tracking-wider">Current Plan Tier</span>
                              <span className="block text-xs font-extrabold text-white">PathPilot Premium Student Pro</span>
                            </div>
                            <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold">Active Member</span>
                          </div>

                          <div className="p-4 bg-[#07080F]/30 border border-[#13172E]/30 rounded-2xl space-y-3">
                            <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Completed Assessments</span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="p-3 bg-[#07080F] border border-[#13172E]/50 rounded-xl">
                                <span className="block text-[10px] text-slate-500">AI Readiness</span>
                                <span className="text-sm font-extrabold text-emerald-400 mt-1 block">96% Match</span>
                              </div>
                              <div className="p-3 bg-[#07080F] border border-[#13172E]/50 rounded-xl">
                                <span className="block text-[10px] text-slate-500">Frontend Skills</span>
                                <span className="text-sm font-extrabold text-blue-400 mt-1 block">Level 3</span>
                              </div>
                              <div className="p-3 bg-[#07080F] border border-[#13172E]/50 rounded-xl">
                                <span className="block text-[10px] text-slate-500">Psychometric Score</span>
                                <span className="text-sm font-extrabold text-indigo-400 mt-1 block">Completed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION 3: SECURITY */}
                    {activeSettingsSection === 'security' && (
                      <div className="space-y-6 animate-fadeIn text-left">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">Security & Access</h3>
                          <p className="text-[11px] text-slate-500">Update password details and enable secure login guards.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Current Password</label>
                              <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">New Password</label>
                                <input 
                                  type="password" 
                                  placeholder="Minimum 8 characters" 
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Confirm New Password</label>
                                <input 
                                  type="password" 
                                  placeholder="Confirm new credentials" 
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-[#07080F]/50 border border-[#13172E]/40 rounded-2xl flex justify-between items-center gap-4">
                            <div>
                              <span className="block text-xs font-bold text-slate-200">Two-Factor Authentication (2FA)</span>
                              <span className="block text-[10px] text-slate-500 mt-0.5">Protect account with secondary authentication code.</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setEnable2FA(!enable2FA)}
                              className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 outline-none ${
                                enable2FA ? 'bg-blue-600' : 'bg-[#13172E]'
                              }`}
                            >
                              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                enable2FA ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>

                          <div className="p-4 bg-[#07080F]/30 border border-[#13172E]/30 rounded-2xl space-y-3">
                            <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Active Device Sessions</span>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between items-center py-2 border-b border-[#13172E]/40">
                                <div>
                                  <span className="block font-bold text-slate-200">Windows Chrome • Web App</span>
                                  <span className="block text-[10px] text-emerald-450 mt-0.5">Active Session (Current Device)</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">192.168.1.45</span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <div>
                                  <span className="block font-bold text-slate-300">iPhone 14 Safari • Mobile</span>
                                  <span className="block text-[10px] text-slate-500 mt-0.5">Last active 2 hours ago</span>
                                </div>
                                <span className="text-[10px] text-slate-550 font-mono">102.16.89.21</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION 4: PREFERENCES */}
                    {activeSettingsSection === 'preferences' && (
                      <div className="space-y-6 animate-fadeIn text-left">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">Preferences</h3>
                          <p className="text-[11px] text-slate-500">Configure theme rendering and platform notifications.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Interface Theme</span>
                            <div className="grid grid-cols-2 gap-4">
                              <button
                                type="button"
                                onClick={() => { setPrefTheme('dark'); onToggleTheme(true); }}
                                className={`p-4 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                                  prefTheme === 'dark'
                                    ? 'bg-blue-600/10 border-blue-500 text-blue-450'
                                    : 'bg-[#07080F] border-[#13172E] text-slate-400 hover:border-slate-800'
                                }`}
                              >
                                <span className="text-xl">🌙</span>
                                <span>Dark Space Mode</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => { setPrefTheme('light'); onToggleTheme(false); }}
                                className={`p-4 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                                  prefTheme === 'light'
                                    ? 'bg-blue-600/10 border-blue-500 text-blue-450'
                                    : 'bg-[#07080F] border-[#13172E] text-slate-400 hover:border-slate-800'
                                }`}
                              >
                                <span className="text-xl">☀️</span>
                                <span>Standard Light Mode</span>
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3 pt-2">
                            <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email Notifications</span>
                            <div className="space-y-3">
                              <label className="flex items-start gap-3 cursor-pointer select-none">
                                <input 
                                  type="checkbox"
                                  checked={prefEmailNotifs}
                                  onChange={(e) => setPrefEmailNotifs(e.target.checked)}
                                  className="w-4 h-4 mt-0.5 rounded border-[#13172E] text-blue-600 focus:ring-blue-500/20 bg-[#07080F]"
                                />
                                <div>
                                  <span className="block text-xs font-bold text-slate-200">Roadmap Updates & AI alerts</span>
                                  <span className="block text-[10px] text-slate-500 mt-0.5">Receive email notifications when AI compiles new milestones or changes.</span>
                                </div>
                              </label>

                              <label className="flex items-start gap-3 cursor-pointer select-none">
                                <input 
                                  type="checkbox"
                                  checked={prefWeeklyReports}
                                  onChange={(e) => setPrefWeeklyReports(e.target.checked)}
                                  className="w-4 h-4 mt-0.5 rounded border-[#13172E] text-blue-600 focus:ring-blue-500/20 bg-[#07080F]"
                                />
                                <div>
                                  <span className="block text-xs font-bold text-slate-200">Weekly Progress Reports</span>
                                  <span className="block text-[10px] text-slate-500 mt-0.5">Get a weekly summary of completed curriculum nodes and study recommendations.</span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION 5: CONNECTED ACCOUNTS */}
                    {activeSettingsSection === 'connected' && (
                      <div className="space-y-6 animate-fadeIn text-left">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">Connected Integration Accounts</h3>
                          <p className="text-[11px] text-slate-500">Connect third-party services to sync profiles and repository data.</p>
                        </div>

                        <div className="space-y-4">
                          {[
                            {
                              id: 'google',
                              title: 'Google Integration Account',
                              desc: 'Connected to guest@pathpilot.com for direct sign-in.',
                              connected: googleConnected,
                              toggle: () => setGoogleConnected(!googleConnected)
                            },
                            {
                              id: 'github',
                              title: 'GitHub Developer Repository',
                              desc: 'Sync student microprojects and commits to roadmap milestones.',
                              connected: githubConnected,
                              toggle: () => setGithubConnected(!githubConnected)
                            },
                            {
                              id: 'linkedin',
                              title: 'LinkedIn Professional Profile',
                              desc: 'Export completed AI curriculum credentials directly to resume.',
                              connected: linkedinConnected,
                              toggle: () => setLinkedinConnected(!linkedinConnected)
                            }
                          ].map(acc => (
                            <div key={acc.id} className="p-4 bg-[#07080F]/50 border border-[#13172E]/40 rounded-2xl flex justify-between items-center gap-4 flex-wrap sm:flex-nowrap">
                              <div className="space-y-1">
                                <span className="block text-xs font-bold text-slate-200">{acc.title}</span>
                                <span className="block text-[10px] text-slate-500 leading-normal">{acc.desc}</span>
                              </div>
                              <button
                                type="button"
                                onClick={acc.toggle}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                                  acc.connected
                                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-450 hover:bg-rose-500/20'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                                }`}
                              >
                                {acc.connected ? 'Disconnect' : 'Connect'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom Save Action Button */}
                    <div className="pt-4 border-t border-[#13172E]/40 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab('home')}
                        className="px-4 py-2 border border-[#13172E] hover:bg-slate-900 rounded-xl text-xs font-bold text-slate-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10"
                      >
                        Save Changes
                      </button>
                    </div>

                  </form>
                </div>

              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 6: AI CAREER CHAT */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'chat' && (() => {
            const currentSession = chatSessions.find(s => s.id === activeSessionId) || chatSessions[0];
            const filteredSessions = chatSessions.filter(s => {
              const matchesSearch = s.title.toLowerCase().includes(chatSearchQuery.toLowerCase());
              const matchesSaved = showSavedOnly ? s.isSaved : true;
              return matchesSearch && matchesSaved;
            });

            return (
              <div className="h-[calc(100vh-180px)] lg:h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6 animate-fadeIn">
                
                {/* Left Panel: Chat History & Saved Chats */}
                <div className="w-full lg:w-80 shrink-0 flex flex-col bg-[#090A12] border border-[#13172E] rounded-3xl overflow-hidden h-72 lg:h-full">
                  {/* Panel Header */}
                  <div className="p-4 border-b border-[#13172E] space-y-3 shrink-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">AI Counselor History</span>
                      <button 
                        onClick={handleStartNewChat}
                        className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>New Chat</span>
                      </button>
                    </div>
                    {/* Search bar */}
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="Search conversations..."
                        value={chatSearchQuery}
                        onChange={(e) => setChatSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    </div>
                    {/* History vs Starred toggle pills */}
                    <div className="flex bg-[#07080F] p-0.5 rounded-lg border border-[#13172E]/50 text-[10px] font-bold">
                      <button
                        onClick={() => setShowSavedOnly(false)}
                        className={`flex-1 py-1 rounded transition-all ${!showSavedOnly ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400'}`}
                      >
                        All Chats
                      </button>
                      <button
                        onClick={() => setShowSavedOnly(true)}
                        className={`flex-1 py-1 rounded transition-all ${showSavedOnly ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400'}`}
                      >
                        ⭐ Saved Chats
                      </button>
                    </div>
                  </div>

                  {/* Sessions List */}
                  <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1">
                    {filteredSessions.length > 0 ? (
                      filteredSessions.map(session => (
                        <div
                          key={session.id}
                          onClick={() => setActiveSessionId(session.id)}
                          className={`w-full p-3 rounded-xl cursor-pointer text-left transition-all flex items-center justify-between gap-3 border ${
                            activeSessionId === session.id
                              ? 'bg-blue-600/10 border-blue-500/25 text-blue-400'
                              : 'bg-transparent border-transparent hover:bg-slate-900/50 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <span className="block text-xs font-bold truncate leading-tight">{session.title}</span>
                            <span className="block text-[9px] text-slate-500">{session.timestamp}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={(e) => handleToggleSaveSession(session.id, e)}
                              className={`p-1 rounded hover:bg-slate-900 text-slate-500 hover:text-amber-450 transition-colors ${
                                session.isSaved ? 'text-amber-400' : ''
                              }`}
                            >
                              ★
                            </button>
                            <button
                              onClick={(e) => handleDeleteChatSession(session.id, e)}
                              className="p-1 rounded hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-colors text-[10px]"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-[10px] text-slate-500">
                        {showSavedOnly ? 'No saved chats found.' : 'No chat history found.'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Panel: Chat viewport */}
                <div className="flex-1 flex flex-col bg-[#090A12] border border-[#13172E] rounded-3xl overflow-hidden h-96 lg:h-full">
                  {/* Viewport Header */}
                  <div className="px-5 py-4 border-b border-[#13172E] flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-white leading-tight">
                          {currentSession ? currentSession.title : 'AI Career Advisor'}
                        </h4>
                        <span className="text-[9px] text-emerald-450 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          Online • Groq Llama 3.3 Active
                        </span>
                      </div>
                    </div>
                    {currentSession && (
                      <button
                        onClick={() => handleToggleSaveSession(currentSession.id)}
                        className={`px-3 py-1.5 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          currentSession.isSaved
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'border-[#13172E] text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>★</span>
                        <span>{currentSession.isSaved ? 'Saved' : 'Save Chat'}</span>
                      </button>
                    )}
                  </div>

                  {/* Messages log */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-[#07080F]/30">
                    {currentSession && currentSession.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse text-right' : 'text-left'}`}
                      >
                        {msg.sender === 'ai' && (
                          <div className="w-7 h-7 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-[#090A12] border border-[#13172E] text-slate-200 rounded-tl-none'
                          }`}>
                            {/* Simple Markdown Bold/Bullet Parser */}
                            {msg.text.split('\n').map((line, lIdx) => {
                              let content: React.ReactNode = line;
                              
                              // Check if bullet point
                              const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
                              if (isBullet) {
                                line = line.trim().substring(2);
                              }
                              
                              // Parse bold text **word**
                              const parts = line.split('**');
                              if (parts.length > 1) {
                                content = parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-extrabold">{part}</strong> : part);
                              }

                              if (isBullet) {
                                return (
                                  <div key={lIdx} className="flex gap-2 pl-2 py-0.5">
                                    <span className="text-blue-450">•</span>
                                    <span>{content}</span>
                                  </div>
                                );
                              }
                              return <p key={lIdx} className="min-h-[1em]">{content}</p>;
                            })}
                          </div>
                          <span className="block text-[8px] text-slate-500 px-1">{msg.timestamp}</span>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex gap-3 max-w-[85%] text-left">
                        <div className="w-7 h-7 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 animate-pulse">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <div className="p-3 bg-[#090A12] border border-[#13172E] text-slate-400 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preset prompt chips */}
                  {currentSession && currentSession.messages.length <= 1 && (
                    <div className="p-3 border-t border-[#13172E]/40 bg-[#07080F]/20 shrink-0 flex flex-wrap gap-2 justify-center">
                      {[
                        "🎓 Class 11 stream choice for Machine Learning Engineering",
                        "🚀 9-Month learning roadmap for Full-Stack Developer",
                        "📄 How to format a student resume for ATS checkers",
                        "💡 High-paying tech careers for the next 5 years"
                      ].map(prompt => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSendChatMessage(prompt)}
                          className="px-2.5 py-1.5 bg-[#090A12] border border-[#13172E] hover:border-blue-500/40 text-slate-400 hover:text-slate-200 rounded-lg text-[10px] text-left transition-all leading-snug max-w-xs"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input form */}
                  <div className="p-4 border-t border-[#13172E] shrink-0 bg-[#090A12]">
                    <div className="relative flex items-center bg-[#07080F] border border-[#13172E] rounded-2xl p-1.5">
                      <textarea
                        rows={1}
                        placeholder="Ask PATHPILOT AI a career question..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendChatMessage();
                          }
                        }}
                        className="flex-1 max-h-24 min-h-[36px] bg-transparent outline-none border-none text-xs text-white px-3 py-2 resize-none custom-scrollbar"
                      />
                      <button
                        type="button"
                        onClick={() => handleSendChatMessage()}
                        disabled={isChatLoading || !chatInput.trim()}
                        className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl transition-all shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })()}
          {/* ---------------------------------------------------- */}
          {/* TAB 7: CAREER QUIZ Assessment Workspace */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'quiz' && (() => {
            const activeQuiz = QUIZZES_DATA.find(q => q.id === activeQuizId);
            
            // View 1: Quiz Results Screen
            if (quizResult && activeQuiz) {
              return (
                <div className="max-w-3xl mx-auto bg-[#090A12] border border-[#13172E] rounded-3xl p-6 md:p-8 space-y-8 animate-scaleUp text-left">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mx-auto text-2xl">
                      🏆
                    </div>
                    <h3 className="text-lg font-bold text-white">Assessment Complete!</h3>
                    <p className="text-xs text-slate-500">We mapped your answers against core tech role parameters.</p>
                  </div>

                  {/* Score Indicator Gauge */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#07080F] p-6 rounded-2xl border border-[#13172E]/50">
                    <div className="text-center md:border-r border-[#13172E] py-2">
                      <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Match Accuracy</span>
                      <span className="text-3xl font-extrabold text-blue-400">{quizResult.matchScore}%</span>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Top Career Recommendation</span>
                      <span className="block text-sm font-bold text-white">{quizResult.matchProfile}</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Your choices reflect high aptitude in this role. Click Learning Roadmaps on the sidebar to inspect step-by-step curricula.
                      </p>
                    </div>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-bold text-emerald-450 tracking-wider">Key Strengths</h4>
                      <ul className="space-y-2">
                        {quizResult.strengths.map((str, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-bold text-blue-450 tracking-wider">Growth Areas</h4>
                      <ul className="space-y-2">
                        {quizResult.improvements.map((imp, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-6 border-t border-[#13172E] flex justify-end gap-3">
                    <button
                      onClick={handleResetQuiz}
                      className="px-5 py-2.5 border border-[#13172E] hover:bg-slate-900 rounded-xl text-xs font-bold text-slate-400 transition-colors"
                    >
                      Back to Quizzes
                    </button>
                    <button
                      onClick={() => {
                        const recRole = quizResult.matchProfile.toLowerCase();
                        if (recRole.includes('frontend')) {
                          setActiveRoadmap('frontend');
                        } else if (recRole.includes('backend')) {
                          setActiveRoadmap('backend');
                        } else if (recRole.includes('devops')) {
                          setActiveRoadmap('devops');
                        } else if (recRole.includes('learning') || recRole.includes('machine')) {
                          setActiveRoadmap('ml');
                        }
                        setActiveTab('roadmaps');
                        handleResetQuiz();
                      }}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10"
                    >
                      View Recommended Roadmap
                    </button>
                  </div>
                </div>
              );
            }

            // View 2: Active Quiz Testing Mode
            if (activeQuiz) {
              const currentQuestion = activeQuiz.questions[currentQuestionIdx];
              const totalQuestions = activeQuiz.questions.length;
              const hasSelected = selectedAnswers[currentQuestionIdx] !== undefined;

              return (
                <div className="max-w-2xl mx-auto bg-[#090A12] border border-[#13172E] rounded-3xl p-6 md:p-8 space-y-6 animate-fadeIn text-left">
                  
                  {/* Top Progress */}
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                    <span>{activeQuiz.title}</span>
                    <span>Question {currentQuestionIdx + 1} of {totalQuestions}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#07080F] rounded-full overflow-hidden border border-[#13172E]/50">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-350"
                      style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }}
                    />
                  </div>

                  {/* Question Prompt */}
                  <h3 className="text-sm font-bold text-white leading-relaxed pt-2">
                    {currentQuestion.text}
                  </h3>

                  {/* Multiple Choice Buttons */}
                  <div className="space-y-3 pt-2">
                    {currentQuestion.options.map((option, oIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIdx] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizOption(currentQuestionIdx, oIdx)}
                          className={`w-full p-4 rounded-2xl border text-xs font-medium text-left transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-md shadow-blue-500/5'
                              : 'bg-[#07080F] border-[#13172E] text-slate-400 hover:border-slate-800'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[10px] mt-0.5 ${
                            isSelected ? 'border-blue-500 bg-blue-600 text-white' : 'border-slate-600'
                          }`}>
                            {isSelected && '✓'}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation footer */}
                  <div className="pt-4 border-t border-[#13172E]/50 flex justify-between">
                    <button
                      onClick={() => {
                        if (currentQuestionIdx === 0) {
                          handleResetQuiz();
                        } else {
                          setCurrentQuestionIdx(prev => prev - 1);
                        }
                      }}
                      className="px-4 py-2 border border-[#13172E] hover:bg-slate-900 rounded-xl text-xs font-bold text-slate-400 transition-colors"
                    >
                      {currentQuestionIdx === 0 ? 'Quit Quiz' : 'Back'}
                    </button>

                    <button
                      onClick={() => {
                        if (currentQuestionIdx < totalQuestions - 1) {
                          setCurrentQuestionIdx(prev => prev + 1);
                        } else {
                          handleSubmitQuiz();
                        }
                      }}
                      disabled={!hasSelected}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10"
                    >
                      {currentQuestionIdx === totalQuestions - 1 ? 'Submit Assessment' : 'Next Question'}
                    </button>
                  </div>
                </div>
              );
            }

            // View 3: Quizzes list (default list view)
            return (
              <div className="space-y-8 animate-fadeIn text-left">
                
                {/* Section Header */}
                <div>
                  <h2 className="text-lg font-sora font-extrabold text-white">📝 Career Capability Assessments</h2>
                  <p className="text-xs text-slate-500">Pick a quiz to test your engineering aptitudes, creative fits, or systems logics.</p>
                </div>

                {/* Quizzes List Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {QUIZZES_DATA.map(quiz => (
                    <div key={quiz.id} className="p-6 rounded-3xl border border-[#13172E] bg-[#090A12] flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="px-2.5 py-0.5 text-[9px] font-bold bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-md">
                            {quiz.category}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">{quiz.duration}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white">{quiz.title}</h3>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{quiz.desc}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#13172E]/40">
                        <span className="text-[10px] text-slate-500 font-bold">Level: {quiz.difficulty}</span>
                        <button
                          onClick={() => handleStartQuiz(quiz.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all"
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Previous quiz attempts logs */}
                <div className="p-6 bg-[#090A12] border border-[#13172E] rounded-3xl space-y-4">
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Previous Quiz Attempts</h3>
                  
                  {quizAttempts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#13172E] text-slate-500 font-bold text-[10px] uppercase">
                            <th className="pb-3">Assessment Title</th>
                            <th className="pb-3">Matching Profile</th>
                            <th className="pb-3 text-center">Score</th>
                            <th className="pb-3 text-right">Completion Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#13172E]/50 text-slate-300">
                          {quizAttempts.map((att, idx) => (
                            <tr key={idx} className="hover:bg-slate-900/10">
                              <td className="py-3.5 font-bold text-white">{att.quizTitle}</td>
                              <td className="py-3.5">{att.matchProfile}</td>
                              <td className="py-3.5 text-center font-bold text-blue-400">{att.score}%</td>
                              <td className="py-3.5 text-right text-slate-500">{att.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-500">
                      No previous attempts logged yet. Start a quiz above to view logs.
                    </div>
                  )}
                </div>

              </div>
            );
          })()}

          {/* ---------------------------------------------------- */}
          {/* TAB 8: RESUME BUILDER Workspace */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'resume' && (
            <div className="space-y-6 animate-fadeIn">
              <ResumeBuilder />
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 9: LEARNING RESOURCES Catalog */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'resources' && (
            <div className="space-y-6 animate-fadeIn">
              <LearningResources userId={user?.id || 'guest'} isDarkMode={isDarkMode} />
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 10: CERTIFICATES & ACHIEVEMENTS Workspace */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 animate-fadeIn">
              <CertificatesAchievements userId={user?.id || 'guest'} isDarkMode={isDarkMode} />
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* TAB 11: ADMIN OPERATIONS Workspace */}
          {/* ---------------------------------------------------- */}
          {activeTab === 'admin' && (
            <div className="space-y-6 animate-fadeIn">
              <AdminPanel />
            </div>
          )}
        </main>
      </div>

      {/* NEW POST MODAL COMPOSER */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#090A12] border border-[#13172E] rounded-3xl p-6 shadow-2xl space-y-4 animate-scaleUp text-slate-200">
            
            <div className="flex justify-between items-center pb-2 border-b border-[#13172E]">
              <h3 className="font-bold text-sm text-white">Create a Community Post</h3>
              <button 
                onClick={() => setShowNewPostModal(false)}
                className="p-1 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Post Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Summarize your question or insight clearly..." 
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Category Tag</label>
                <select 
                  value={newPostCategory}
                  onChange={(e: any) => setNewPostCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white"
                >
                  <option value="General">General Discussion</option>
                  <option value="Tech Careers">Tech Careers</option>
                  <option value="Interview Tips">Interview Tips</option>
                  <option value="Learning Groups">Learning Groups</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Body Content</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Share details, context..." 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full p-3.5 text-xs bg-[#07080F] border border-[#13172E] rounded-xl outline-none focus:border-blue-500 text-white resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 border border-[#13172E] hover:bg-slate-900 rounded-xl text-xs font-bold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10"
                >
                  Publish Post
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
