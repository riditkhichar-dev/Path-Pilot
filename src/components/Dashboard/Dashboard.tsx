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
  Award, 
  TrendingUp, 
  Star, 
  CheckCircle2, 
  Menu,
  X,
  Map
} from 'lucide-react';
import { User } from '../../types';

interface DashboardProps {
  user: User | null;
  onOpenChat: () => void;
  onOpenAssessment: () => void;
  onNavigateHome: () => void;
  onLogout: () => void;
  onExploreCareers: () => void;
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

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onOpenChat,
  onOpenAssessment,
  onNavigateHome,
  onLogout,
  onExploreCareers,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'assessment' | 'chat'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  // Filter careers based on search query
  const filteredCareers = MOCK_CAREERS.filter(career => 
    career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* MOBILE SIDEBAR TOGGLE */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-slate-700 dark:text-slate-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 p-6 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="space-y-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer pt-6 lg:pt-0" onClick={onNavigateHome}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
              P
            </div>
            <div>
              <span className="font-sora font-extrabold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                PATHPILOT
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                AI Career Space
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => { setActiveTab('home'); setSidebarOpen(false); }}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                activeTab === 'home' 
                  ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard Home</span>
            </button>

            <button
              onClick={() => { onExploreCareers(); setSidebarOpen(false); }}
              className="w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Explore Careers</span>
            </button>

            <button
              onClick={() => { onOpenChat(); setSidebarOpen(false); }}
              className="w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
            >
              <Sparkles className="w-4 h-4 shrink-0 text-orange-400" />
              <span>AI Advisor Chat</span>
            </button>

            <button
              onClick={() => { onOpenAssessment(); setSidebarOpen(false); }}
              className="w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Career Assessment</span>
            </button>

            <button
              onClick={() => { onNavigateHome(); setSidebarOpen(false); }}
              className="w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Back to Landing Page</span>
            </button>
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-850">
          {user && (
            <div className="flex items-center gap-3 p-1">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-sm shrink-0">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PP'}
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            className="w-full px-4 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 flex items-center gap-3 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 min-h-screen overflow-y-auto p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 custom-scrollbar">
        
        {/* TOP WELCOME BANNER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/10 mb-8 border border-blue-500/20 text-white">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-2xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 blur-2xl rounded-full" />
          
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex px-3 py-1 bg-white/15 border border-white/20 rounded-full text-[10px] font-bold tracking-wider uppercase">
              Dashboard Active
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-sora leading-tight tracking-tight">
              Welcome to your Career Hub, {user?.name || 'Explorer'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg font-inter">
              Discover AI-matched career paths, view curriculum roadmaps, and chat with your personal AI Counselor to build your future.
            </p>
          </div>
        </div>

        {/* METRICS / STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-500 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Top Match Score</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">96% Match</span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Profile Setup</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">100% Complete</span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Suggestions</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">12 Available</span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-500 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Roadmaps</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">1 Created</span>
            </div>
          </div>
        </div>

        {/* WORKSPACE CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT/MID COLUMN: SEARCH & MOCK CAREER INSIGHTS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h3 className="text-lg font-bold font-sora text-slate-900 dark:text-white">
                    Explore & Filter Careers
                  </h3>
                  <p className="text-xs text-slate-400">Search roles, skills, or industries immediately.</p>
                </div>
              </div>

              {/* SEARCH BAR */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search career fields or skills (e.g., Python, Design, Biotechnology)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-2xl outline-none text-slate-900 dark:text-white shadow-sm transition-colors"
                />
              </div>
            </div>

            {/* CAREERS RESULTS LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCareers.map((career) => (
                <div 
                  key={career.id}
                  onClick={() => setSelectedCareer(career)}
                  className={`glass-card glass-card-hover p-5 rounded-2xl cursor-pointer border text-left flex flex-col justify-between h-56 transition-all ${
                    selectedCareer?.id === career.id 
                      ? 'border-blue-500 ring-2 ring-blue-500/20' 
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full">
                        {career.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{career.matchScore}%</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500">
                      {career.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-3">
                      {career.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-slate-300">{career.salary}</span>
                      <span>Avg Salary</span>
                    </div>
                    <span className="font-bold text-emerald-500 flex items-center gap-0.5">
                      {career.growth}
                    </span>
                  </div>
                </div>
              ))}

              {filteredCareers.length === 0 && (
                <div className="col-span-full py-12 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-400">No careers found matching "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-blue-500 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: QUICK ACTIONS & CAREER DETAILS */}
          <div className="space-y-6">
            
            {/* QUICK ACTIONS */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold font-sora tracking-tight text-slate-900 dark:text-white">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={onOpenChat}
                  className="w-full p-3 text-left bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Talk to AI Career Advisor</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={onOpenAssessment}
                  className="w-full p-3 text-left bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>Retake Match Assessment</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={onExploreCareers}
                  className="w-full p-3 text-left bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-emerald-500" />
                    <span>Full Career Roadmaps</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* SELECTED CAREER INSIGHT CARD */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold font-sora tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Map className="w-4 h-4 text-blue-500" />
                <span>Roadmap Insights</span>
              </h3>
              
              {selectedCareer ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                      {selectedCareer.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">{selectedCareer.category}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Required Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCareer.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 text-[9px] font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] space-y-1 text-slate-600 dark:text-slate-400">
                    <p>🎯 **Recommendation:** Start with foundational learning roadmaps. Use our AI Advisor to ask questions about "{selectedCareer.title}".</p>
                  </div>

                  <button 
                    onClick={onOpenChat}
                    className="w-full py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Ask AI About this Career</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 space-y-2">
                  <p>Click on any career card to view required skills, insights, and recommended AI roadmaps.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
