import { FeatureItem, TestimonialItem, FaqItem, CareerQuizQuestion } from '../types';

export const FEATURES: FeatureItem[] = [
  {
    id: 'ai-chat',
    title: 'AI Career Chatbot',
    description: 'Get instant 24/7 personalized advice, answer career doubts, and explore emerging fields with Groq-powered AI speed.',
    iconName: 'Bot',
    tag: '24/7 Guidance',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'quiz',
    title: 'Career Assessment Quiz',
    description: 'Scientifically designed psychometric and interest evaluation to pinpoint your top 3 matching career fields.',
    iconName: 'Sparkles',
    tag: '99.4% Accuracy',
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'roadmap',
    title: 'Personalized AI Roadmaps',
    description: 'Dynamic step-by-step learning paths with courses, projects, and certifications curated for your specific goal.',
    iconName: 'Compass',
    tag: 'Custom Milestones',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'resume',
    title: 'ATS Resume Builder',
    description: 'Build high-converting, ATS-friendly resumes tailored for student internships, research projects, and university admissions.',
    iconName: 'FileText',
    tag: 'ATS Optimized',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'colleges',
    title: 'College Recommendations',
    description: 'Discover top universities, cutoffs, scholarship criteria, and entrance exam schedules matching your profile.',
    iconName: 'GraduationCap',
    tag: 'Global Database',
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'skills',
    title: 'Skill Tracking & Analytics',
    description: 'Monitor your progress, track key hard & soft skills, and earn readiness scores to showcase to mentors and recruiters.',
    iconName: 'TrendingUp',
    tag: 'Live Progress',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    description: 'Simulated AI mock interviews with real-time feedback on confidence, technical answers, and body language.',
    iconName: 'Video',
    tag: 'Mock Simulator',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'opportunities',
    title: 'Internships & Projects',
    description: 'Handpicked student internships, industry micro-projects, and mentorship connections aligned with your roadmap.',
    iconName: 'Briefcase',
    tag: 'Student Verified',
    color: 'from-amber-500 to-orange-600'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    role: 'Class 12 Student (PCM)',
    grade: 'Transitioned to AI Engineering',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    content: 'PATHPILOT completely cleared my confusion after 12th! The AI roadmap gave me a precise breakdown of Python, Mathematics, and Projects needed for AI Engineering. I got into my dream university program!',
    rating: 5,
    highlight: 'Saved 6+ months of trial & error'
  },
  {
    id: '2',
    name: 'Ananya Patel',
    role: '1st Year B.Tech CS Student',
    grade: 'Secured Tier-1 Summer Internship',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'The ATS Resume Builder combined with the Groq AI Chatbot helped me prepare for my first developer interview. The mock interview suggestions were spot-on. Highly recommended for every student!',
    rating: 5,
    highlight: 'Built a top 1% resume'
  },
  {
    id: '3',
    name: 'Rohan Mehta',
    role: 'Class 10 Student',
    grade: 'Selected Science & Data Stream',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Choosing high school streams was terrifying for my parents and me. PATHPILOT\'s career quiz identified my analytical strengths and showed me 5 future-proof career paths I never knew existed.',
    rating: 5,
    highlight: 'Found exact career direction'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is PATHPILOT?',
    answer: 'PATHPILOT is an AI-powered career navigation platform designed specifically for students from Class 9th through university. It provides psychometric career assessments, dynamic learning roadmaps, ATS resume generation, college matching, and 24/7 Groq AI career counseling.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'Is PATHPILOT free for students?',
    answer: 'Yes! PATHPILOT offers a robust free tier for all students that includes our AI Career Chat, basic assessment quiz, initial roadmap generator, and standard resume templates.',
    category: 'Pricing'
  },
  {
    id: 'faq-3',
    question: 'How does the AI career recommendation work?',
    answer: 'Our proprietary AI algorithms evaluate your academic background, interests, problem-solving preferences, and personality traits. It compares your profile against real-time industry hiring trends, emerging technology roles, and top university requirements to generate high-precision matches.',
    category: 'AI & Tech'
  },
  {
    id: 'faq-4',
    question: 'Can I build an ATS-ready resume on PATHPILOT?',
    answer: 'Absolutely. PATHPILOT includes an intelligent Resume Builder optimized for Applicant Tracking Systems (ATS). You can input your academic highlights, extracurriculars, and projects, and our AI will format and suggest strong action verbs.',
    category: 'General'
  },
  {
    id: 'faq-5',
    question: 'Which students can use PATHPILOT?',
    answer: 'PATHPILOT is designed for students in Class 9, 10, 11, 12, undergraduate college students, postgraduates, and fresh graduates looking to pivot into in-demand global careers.',
    category: 'Students'
  },
  {
    id: 'faq-6',
    question: 'How fast is the Groq AI Chatbot?',
    answer: 'PATHPILOT utilizes Groq’s ultra-fast LLM inference hardware, delivering responses in milliseconds! You can ask questions about high school stream selection, college cutoffs, coding languages, or salary expectations instantly.',
    category: 'AI & Tech'
  }
];

export const QUIZ_QUESTIONS: CareerQuizQuestion[] = [
  {
    id: 1,
    question: 'What type of problems do you enjoy solving most?',
    subtitle: 'Select the option that feels most natural to you.',
    options: [
      { label: 'Building systems, code, or analyzing complex data', description: 'Tech & Logic Focus', trait: 'tech' },
      { label: 'Designing visuals, creating videos, or writing stories', description: 'Creative & Artistic Focus', trait: 'creative' },
      { label: 'Leading teams, launching products, or strategic decisions', description: 'Business & Leadership', trait: 'business' },
      { label: 'Understanding how life, medicine, or physics works', description: 'Scientific & Research', trait: 'science' }
    ]
  },
  {
    id: 2,
    question: 'How do you prefer working on a major project?',
    subtitle: 'Think about your ideal productive environment.',
    options: [
      { label: 'Writing code, configuring tools & debugging logic', description: 'Software & Engineering', trait: 'tech' },
      { label: 'Drafting wireframes, aesthetic layouts & storytelling', description: 'Design & Communication', trait: 'creative' },
      { label: 'Pitching ideas, managing timelines & financial planning', description: 'Entrepreneurship', trait: 'business' },
      { label: 'Conducting experiments, analyzing statistics & lab work', description: 'Research & Life Sciences', trait: 'science' }
    ]
  },
  {
    id: 3,
    question: 'What is your ultimate dream career outcome?',
    subtitle: 'Where do you see yourself making an impact in 5 years?',
    options: [
      { label: 'Architecting cutting-edge AI software at top tech companies', description: 'AI & Tech Pioneer', trait: 'tech' },
      { label: 'Designing world-class products, UX, or creative media', description: 'Creative Director / Designer', trait: 'creative' },
      { label: 'Building a high-growth startup or managing venture deals', description: 'Founder / Product Lead', trait: 'business' },
      { label: 'Pioneering breakthrough medical or environmental research', description: 'Scientist / Specialist', trait: 'science' }
    ]
  }
];

export const PARTNER_LOGOS = [
  { name: 'Stanford Online', logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80' },
  { name: 'IIT Delhi', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80' },
  { name: 'MIT Open Courseware', logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80' },
  { name: 'Coursera for Students', logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80' },
  { name: 'Harvard Extension', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80' }
];
