import React, { useState } from 'react';
import { 
  Layout, 
  Bot, 
  Compass, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  User,
  Bell,
  Search,
  BookOpen,
  TrendingUp,
  Award
} from 'lucide-react';

interface PlatformPreviewProps {
  onOpenAssessment: () => void;
  onOpenChat: () => void;
}

export const PlatformPreview: React.FC<PlatformPreviewProps> = ({ onOpenAssessment, onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'roadmap' | 'quiz' | 'resume'>('dashboard');

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            SaaS Platform Preview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sora">
            Explore the <span className="gradient-text-blue">PATHPILOT Platform</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Inside look into your personal student dashboard, AI chat interface, roadmap visualizer, and resume builder.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {[
              { id: 'dashboard', name: 'Student Dashboard', icon: Layout },
              { id: 'chat', name: 'AI Chat Interface', icon: Bot },
              { id: 'roadmap', name: 'Career Roadmap', icon: Compass },
              { id: 'quiz', name: 'Quiz Results', icon: Sparkles },
              { id: 'resume', name: 'Resume Builder', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Realistic SaaS Dashboard Container */}
        <div className="glass-card p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl relative min-h-[480px]">
          
          {/* Top Bar Mockup */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                PP
              </div>
              <span className="font-sora text-sm font-bold text-white hidden sm:inline">PATHPILOT Student Hub</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">PRO STUDENT</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  readOnly
                  value="Search courses, skills, roadmaps..."
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-400 pl-8 pr-4 py-1.5 rounded-xl w-60 focus:outline-none"
                />
              </div>
              <button className="p-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800">
                <Bell className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                  AS
                </div>
                <span className="text-xs font-semibold text-white hidden sm:inline">Aarav S.</span>
              </div>
            </div>
          </div>

          {/* Mockup Body Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 p-6 rounded-2xl border border-blue-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-sora">Welcome back, Aarav! 👋</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Your current goal: <strong className="text-orange-400">AI Engineering & Data Science</strong> • 68% Mastered
                  </p>
                </div>
                <button
                  onClick={onOpenAssessment}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition-all"
                >
                  Resume Today's Milestone
                </button>
              </div>

              {/* Stats Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Weekly Study Streak</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">14 Days 🔥</div>
                  <div className="text-[11px] text-emerald-400 mt-1">+4.2 hrs this week</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Skills Verified</span>
                    <Award className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">12 Badges 🏅</div>
                  <div className="text-[11px] text-slate-400 mt-1">Python, SQL, React, Git</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>ATS Resume Readiness</span>
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">94 / 100</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Ready for Internships</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-bold text-white">PATHPILOT AI Assistant (Powered by Groq)</span>
                </div>
                <span className="text-xs text-emerald-400">Connected & Ready</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-inter text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-[80%]">
                  <strong className="text-blue-400">Student:</strong> What are the top 3 entrance exams for computer science in India?
                </div>
                <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-900/50 max-w-[90%] ml-auto text-slate-200 space-y-1">
                  <strong className="text-orange-400">PATHPILOT AI:</strong>
                  <p>1. <strong>JEE Advanced & Main</strong> (For IITs & NITs)</p>
                  <p>2. <strong>BITSAT</strong> (For BITS Pilani campuses)</p>
                  <p>3. <strong>CUET (UG)</strong> (For premier central universities)</p>
                </div>
              </div>

              <button
                onClick={onOpenChat}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
              >
                Launch AI Assistant Chat Drawer
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">AI Engineering Roadmap - Milestone View</h3>
                <span className="text-xs text-orange-400 font-bold">4 Milestones</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/50">
                  <div className="text-xs text-emerald-400 font-bold">Milestone 1 • Completed</div>
                  <div className="text-sm font-bold text-white mt-1">Python & Mathematics for ML</div>
                  <div className="text-xs text-slate-400 mt-1">Linear Algebra, OOP, Data Structures</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-orange-500/50">
                  <div className="text-xs text-orange-400 font-bold">Milestone 2 • In Progress (65%)</div>
                  <div className="text-sm font-bold text-white mt-1">Supervised & Unsupervised ML</div>
                  <div className="text-xs text-slate-400 mt-1">Scikit-Learn, XGBoost, Model Tuning</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4 animate-fadeIn text-center py-6">
              <div className="inline-flex p-4 rounded-full bg-orange-500/20 text-orange-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-sora">Psychometric Quiz Result Summary</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Your highest matching traits: <strong>Analytical Problem Solving (98%)</strong> & <strong>System Architecture (94%)</strong>.
              </p>
              <button
                onClick={onOpenAssessment}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl"
              >
                View Detailed Career Report
              </button>
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white">Student Software Engineer Resume</h4>
                  <p className="text-xs text-slate-400">ATS Optimization Score: 94/100</p>
                </div>
                <button
                  onClick={onOpenAssessment}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Export PDF
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
