export interface Career {
  id: string;
  title: string;
  category: 'Science' | 'Commerce' | 'Arts' | 'Vocational' | 'Government';
  description: string;
  iconName: string; // Lucide icon name
  details: {
    salary: string;
    education: string;
    exams: string[];
    skills: string[];
    prospects: string;
  };
}

export const CAREERS: Career[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Science',
    description: 'Design and develop software applications and systems for computers and mobile devices.',
    iconName: 'Laptop',
    details: {
      salary: '₹6,00,000 - ₹25,00,000 LPA',
      education: 'B.Tech/B.E. in Computer Science, BCA/MCA, or relevant bootcamps.',
      exams: ['JEE Main / Advanced', 'BITSAT', 'VITEEE', 'GATE (for Masters)'],
      skills: ['Programming (Java, Python, JS)', 'Data Structures & Algorithms', 'System Design', 'Git & CI/CD'],
      prospects: 'Very High Demand: Continuous growth driven by AI, cloud computing, and digital transformation worldwide.'
    }
  },
  {
    id: 'doctor',
    title: 'Doctor',
    category: 'Science',
    description: 'Diagnose and treat illnesses, injuries, and medical conditions to improve patient health.',
    iconName: 'HeartPulse',
    details: {
      salary: '₹8,00,000 - ₹30,00,000 LPA (Increases with specialization)',
      education: 'MBBS followed by MD/MS specialization or DNB.',
      exams: ['NEET UG', 'NEET PG / NEXT', 'INI CET (for premier institutes)'],
      skills: ['Medical Diagnostics', 'Patient Care & Empathy', 'Surgical / Clinical Skills', 'Pharmacology'],
      prospects: 'Excellent Stability: Healthcare is recession-proof, with exponential demand for specialized surgeons and physicians.'
    }
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Science',
    description: 'Analyze complex data to help organizations make better decisions using AI and machine learning.',
    iconName: 'Database',
    details: {
      salary: '₹8,00,000 - ₹28,00,000 LPA',
      education: 'B.Tech in CS/DS, B.Sc/M.Sc in Statistics/Mathematics, or specialized PG Diplomas.',
      exams: ['GATE', 'IIT JAM', 'CUET PG'],
      skills: ['Machine Learning & AI', 'Python & SQL', 'Data Visualization (Tableau, PowerBI)', 'Statistical Modeling'],
      prospects: 'Explosive Growth: Data science & analytics roles are growing at 30%+ CAGR, driven by enterprise AI adoption.'
    }
  },
  {
    id: 'aerospace-engineer',
    title: 'Aerospace Engineer',
    category: 'Science',
    description: 'Design aircraft, spacecraft, satellites, and missiles. Work in aviation and space exploration.',
    iconName: 'Rocket',
    details: {
      salary: '₹7,00,000 - ₹22,00,000 LPA',
      education: 'B.Tech/B.E. in Aerospace, Aeronautical, or Mechanical Engineering.',
      exams: ['JEE Main / Advanced', 'GATE', 'IIST Admission Test'],
      skills: ['Aerodynamics', 'CAD Design (SolidWorks, CATIA)', 'Propulsion Systems', 'Structural Analysis'],
      prospects: 'High Growth: Spurred by private space agencies (SpaceX, Skyroot) and government defense/ISRO expansions.'
    }
  },
  {
    id: 'biotech-engineer',
    title: 'Biotech Engineer',
    category: 'Science',
    description: 'Apply engineering principles to solve problems in biology, medicine, and agriculture.',
    iconName: 'Dna',
    details: {
      salary: '₹5,00,000 - ₹15,00,000 LPA',
      education: 'B.Tech/B.Sc/M.Sc in Biotechnology or Bioinformatics.',
      exams: ['JEE Main', 'GATE', 'GAT-B', 'CSIR NET'],
      skills: ['Genetic Engineering', 'Bioinformatics', 'Cell Culture & PCR', 'Lab Instrumentation'],
      prospects: 'Growing Field: Promising growth in biopharmaceuticals, vaccine research, and agricultural enhancements.'
    }
  },
  {
    id: 'marine-biologist',
    title: 'Marine Biologist',
    category: 'Science',
    description: 'Study marine organisms and their ecosystems in oceans and seas.',
    iconName: 'Fish',
    details: {
      salary: '₹4,50,000 - ₹12,00,000 LPA',
      education: 'B.Sc/M.Sc/PhD in Marine Biology, Oceanography, or Zoology.',
      exams: ['CUET PG', 'CSIR NET', 'TIFR GS'],
      skills: ['Marine Ecology', 'Scuba Diving & Field Research', 'Data Analysis (R/Python)', 'Environmental Advocacy'],
      prospects: 'Steady: Highly academic and research-driven, with growing careers in climate change agencies & conservation groups.'
    }
  },
  {
    id: 'chartered-accountant',
    title: 'Chartered Accountant',
    category: 'Commerce',
    description: 'Provide financial advice, audit accounts, and ensure compliance with financial regulations.',
    iconName: 'Calculator',
    details: {
      salary: '₹8,00,000 - ₹24,00,000 LPA',
      education: 'Clearance of three stages of the ICAI CA Program.',
      exams: ['CA Foundation', 'CA Intermediate', 'CA Final'],
      skills: ['Financial Auditing', 'Taxation Law', 'Corporate Finance', 'Strategic Planning'],
      prospects: 'Very High: Mandatory for corporate compliance, audits, and business filings across all sectors.'
    }
  },
  {
    id: 'investment-banker',
    title: 'Investment Banker',
    category: 'Commerce',
    description: 'Help companies raise capital, manage investments, and provide financial advisory services.',
    iconName: 'TrendingUp',
    details: {
      salary: '₹10,00,000 - ₹40,00,000+ LPA',
      education: 'MBA in Finance (from Tier-1 B-Schools), CFA (Chartered Financial Analyst), or B.Com/Economics.',
      exams: ['CAT / GMAT', 'CFA Level I, II, III'],
      skills: ['Financial Modeling & Valuation', 'Mergers & Acquisitions (M&A)', 'Market Research', 'Pitching & Negotiation'],
      prospects: 'Lucrative & Competitive: Extremely high career progression with bonuses, linked to global capital markets.'
    }
  },
  {
    id: 'company-secretary',
    title: 'Company Secretary',
    category: 'Commerce',
    description: 'Ensure companies comply with legal and regulatory requirements and manage corporate governance.',
    iconName: 'ShieldCheck',
    details: {
      salary: '₹6,00,000 - ₹18,00,000 LPA',
      education: 'Completion of the ICSI Company Secretaryship course.',
      exams: ['CSEET', 'CS Executive', 'CS Professional'],
      skills: ['Company Law & Governance', 'Regulatory Filings', 'Board Meeting Coordination', 'Drafting Contracts'],
      prospects: 'High Stability: Required by law for all listed entities and companies above threshold capitalizations.'
    }
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Commerce',
    description: 'Analyze business processes, identify needs, and find technology-driven solutions.',
    iconName: 'LineChart',
    details: {
      salary: '₹6,00,000 - ₹16,00,000 LPA',
      education: 'B.Com, BBA, B.Tech/CS, or MBA in Systems/Analytics.',
      exams: ['CAT', 'GMAT', 'IIBA Certifications (ECBA/CCBA)'],
      skills: ['Requirement Gathering', 'Process Mapping (BPMN)', 'SQL & Excel', 'Agile Methodologies'],
      prospects: 'Consistent: Bridge between tech teams and business stakeholders, key in modern SaaS and IT consulting.'
    }
  },
  {
    id: 'event-manager',
    title: 'Event Manager',
    category: 'Commerce',
    description: 'Plan and organize events like weddings, conferences, concerts, and corporate meetings.',
    iconName: 'Calendar',
    details: {
      salary: '₹4,50,000 - ₹12,00,000 LPA',
      education: 'Bachelor in Event Management, BBA, or PG Diploma in PR and Events.',
      exams: ['Direct admissions', 'CAT (for MBA in Event/PR)'],
      skills: ['Vendor Coordination', 'Budgeting & Logistics', 'Crisis Management', 'Public Relations & Marketing'],
      prospects: 'Creative: Fast-growing industry fueled by destination weddings, corporate summits, and experiential festivals.'
    }
  },
  {
    id: 'journalist',
    title: 'Journalist',
    category: 'Arts',
    description: 'Research, write, and report news stories for newspapers, TV, radio, and online media.',
    iconName: 'Newspaper',
    details: {
      salary: '₹4,00,000 - ₹12,00,000 LPA',
      education: 'BA/MA in Journalism, Mass Communication, or English Literature.',
      exams: ['CUET UG/PG', 'IIMC Entrance Exam', 'ACJ Entrance Exam'],
      skills: ['Investigative Reporting', 'Writing & Editing', 'Media Ethics', 'Video / Audio Editing'],
      prospects: 'Evolving: Expanding into digital newsletters, podcasts, investigative independent portals, and social reporting.'
    }
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Arts',
    description: 'Create user-centered designs for websites, apps, and digital platforms to improve usability.',
    iconName: 'Palette',
    details: {
      salary: '₹6,00,000 - ₹20,00,000 LPA',
      education: 'Bachelor of Design (B.Des), Fine Arts, or certified UI/UX bootcamps.',
      exams: ['UCEED', 'CEED', 'NID DAT', 'NIFT Entrance'],
      skills: ['Figma / Adobe XD', 'Wireframing & Prototyping', 'User Research & Testing', 'Visual Hierarchy & Colors'],
      prospects: 'High Demand: Every software, app, and web product requires designers to stay competitive.'
    }
  },
  {
    id: 'fashion-designer',
    title: 'Fashion Designer',
    category: 'Arts',
    description: 'Design clothing, accessories, and footwear, creating original garments or adapting fashion trends.',
    iconName: 'Scissors',
    details: {
      salary: '₹4,50,000 - ₹15,00,000 LPA',
      education: 'B.Des/B.F.Tech in Fashion Design or relevant diplomas.',
      exams: ['NIFT Entrance', 'NID DAT', 'UCEED'],
      skills: ['Sketching & Illustration', 'Garment Construction & Draping', 'Textile Knowledge', 'Trend Forecasting'],
      prospects: 'Competitive: High rewards for designers establishing direct-to-consumer (D2C) brands or styling agencies.'
    }
  },
  {
    id: 'professional-chef',
    title: 'Professional Chef',
    category: 'Vocational',
    description: 'Direct food preparation, design menus, and manage kitchen staff in restaurants or hotels.',
    iconName: 'ChefHat',
    details: {
      salary: '₹5,00,000 - ₹18,00,000 LPA',
      education: 'Bachelor in Hotel Management (BHM), Culinary Arts degree, or vocational culinary diplomas.',
      exams: ['NCHMCT JEE', 'IHM Internal Admissions'],
      skills: ['Culinary Techniques', 'Kitchen Logistics & Safety', 'Menu Engineering', 'Creativity & Flavor Pairing'],
      prospects: 'Growing: Travel, global hospitality, and gourmet dining sectors create active career avenues.'
    }
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    category: 'Vocational',
    description: 'Promote brands, products, and services using SEO, social media, and online advertising campaigns.',
    iconName: 'Megaphone',
    details: {
      salary: '₹5,00,000 - ₹15,00,000 LPA',
      education: 'BBA/B.Com in Marketing, or industry certifications (Google, HubSpot).',
      exams: ['Direct selection / Internships portfolio'],
      skills: ['Search Engine Optimization (SEO)', 'Pay-Per-Click Advertising (PPC)', 'Social Media Strategy', 'Google Analytics'],
      prospects: 'Very High: E-commerce and internet adoption require businesses to market online, keeping demand robust.'
    }
  },
  {
    id: 'civil-servant',
    title: 'Civil Servant (IAS/IPS)',
    category: 'Government',
    description: 'Administer government policies, oversee law & order, and manage public welfare projects.',
    iconName: 'Landmark',
    details: {
      salary: '₹8,00,000 - ₹18,00,000 LPA (Plus official allowances & housing)',
      education: 'Any graduate degree (B.A., B.Sc, B.Com, B.Tech, etc.) followed by UPSC CSE clearance.',
      exams: ['UPSC Civil Services Examination (Prelims, Mains, Interview)'],
      skills: ['Public Administration', 'Policy Formulation', 'Leadership & Ethics', 'Crisis Decision Making'],
      prospects: 'Elite Status: Highest tier of national policy administration, offering absolute job security and public service impact.'
    }
  },
  {
    id: 'defense-officer',
    title: 'Defense Officer',
    category: 'Government',
    description: 'Command military units, defend national borders, and coordinate security missions.',
    iconName: 'Shield',
    details: {
      salary: '₹9,00,000 - ₹20,00,000 LPA (Plus healthcare, pension & allowances)',
      education: '12th pass (for NDA) or any graduate (for CDS/AFCAT/SSB).',
      exams: ['NDA (National Defence Academy)', 'CDS (Combined Defence Services)', 'AFCAT', 'SSB Interview'],
      skills: ['Tactical Leadership', 'Physical Resilience', 'Strategic Planning', 'Discipline & Teamwork'],
      prospects: 'Noble Career: Lifetime honor, structured promotions, and excellent post-retirement security options.'
    }
  }
];
