export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
  color: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  grade: string;
  avatar: string;
  content: string;
  rating: number;
  highlight: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'AI & Tech' | 'Pricing' | 'Students';
}

export interface RoadmapStep {
  stepNumber: number;
  title: string;
  description: string;
  skills: string[];
  duration: string;
}

export interface CareerQuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    trait: 'tech' | 'creative' | 'business' | 'science';
  }[];
}
