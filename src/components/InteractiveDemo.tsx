import React, { useState } from 'react';
import { Sparkles, Compass, CheckCircle2, ArrowRight, Layers, FileText, Cpu, Award } from 'lucide-react';

interface InteractiveDemoProps {
  onOpenAssessment: () => void;
  onOpenChat: () => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ onOpenAssessment, onOpenChat }) => {
  const [activeMode, setActiveMode] = useState<'quiz' | 'roadmap' | 'resume'>('quiz');

  // Mini Quiz state
  const [selectedTrait, setSelectedTrait] = useState<'tech' | 'creative' | 'business' | 'science'>('tech');

  // Roadmap State
  const [selectedCareer, setSelectedCareer] = useState<'ai' | 'design' | 'data' | 'web'>('ai');

  const roadmapData = {
    ai: {
      title: 'AI & Machine Learning Specialist Roadmap',
      matchScore: '99.2%',
      milestones: [
        { name: 'Python & Math Foundations', duration: 'Month 1-2', status: 'Completed', detail: 'Linear Algebra, Numpy, Calculus' },
        { name: 'Machine Learning Fundamentals', duration: 'Month 3-4', status: 'In Progress', detail: 'Scikit-Learn, Regression, Decision Trees' },
        { name: 'Deep Learning & LLMs', duration: 'Month 5-7', status: 'Upcoming', detail: 'PyTorch, Transformers, Fine-Tuning' },
        { name: 'Production Deployment & Capstone', duration: 'Month 8-9', status: 'Upcoming', detail: 'Docker, FastAPI, Groq API Integration' }
      ]
    },
    design: {
      title: 'Product & UI/UX Designer Roadmap',
      matchScore: '96.8%',
      milestones: [
        { name: 'UI Fundamentals & Figma Mastery', duration: 'Month 1-2', status: 'Completed', detail: 'Typography, Grid Systems, Auto-Layout' },
        { name: 'UX Research & Wireframing', duration: 'Month 3-4', status: 'In Progress', detail: 'User Interviews, Journey Maps, Prototypes' },
        { name: 'Design Systems & Micro-Interactions', duration: 'Month 5-6', status: 'Upcoming', detail: 'Component Libraries, Tokens, Framer' },
        { name: 'Portfolio & Client Case Studies', duration: 'Month 7-8', status: 'Upcoming', detail: '3 Real-world SaaS App Designs' }
      ]
    },
    data: {
      title: 'Data Science & Business Intelligence Roadmap',
      matchScore: '97.5%',
      milestones: [
        { name: 'SQL & Data Wrangling', duration: 'Month 1-2', status: 'Completed', detail: 'PostgreSQL, Pandas, Data Cleaning' },
        { name: 'Statistical Analysis & Visualization', duration: 'Month 3-4', status: 'In Progress', detail: 'Seaborn, Tableau, Hypothesis Testing' },
        { name: 'Predictive Analytics & Big Data', duration: 'Month 5-6', status: 'Upcoming', detail: 'Spark, Time Series, Customer Segmentation' },
        { name: 'Executive Dashboard Capstone', duration: 'Month 7-8', status: 'Upcoming', detail: 'Interactive BI Dashboard Build' }
      ]
    },
    web: {
      title: 'Full-Stack Web Developer Roadmap',
      matchScore: '98.0%',
      milestones: [
        { name: 'HTML, CSS & Modern JS (ES6+)', duration: 'Month 1-2', status: 'Completed', detail: 'DOM Manipulation, Async/Await' },
        { name: 'React, TypeScript & Tailwind CSS', duration: 'Month 3-4', status: 'In Progress', detail: 'State Management, Vite, Component Architecture' },
        { name: 'Node.js, Express & Database Architecture', duration: 'Month 5-6', status: 'Upcoming', detail: 'REST APIs, Prisma, MongoDB/PostgreSQL' },
        { name: 'SaaS App Launch & CI/CD', duration: 'Month 7-8', status: 'Upcoming', detail: 'Vercel, Authentication, Stripe Billing' }
      ]
    }
  };

  return (
    <section id="demo" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" /> Interactive Platform Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-sora">
            Try PATHPILOT <span className="gradient-text-blue">Live in Action</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
            Experience how our AI instantly analyzes student inputs to construct tailored career roadmaps and resume scoring.
          </p>
 
          {/* Tab Selection Bar */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-8 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
            <button
              onClick={() => setActiveMode('quiz')}
              className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeMode === 'quiz'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1. Mini Assessment
            </button>
            <button
              onClick={() => setActiveMode('roadmap')}
              className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeMode === 'roadmap'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2. AI Roadmap
            </button>
            <button
              onClick={() => setActiveMode('resume')}
              className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeMode === 'resume'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              3. ATS Resume
            </button>
          </div>
        </div>
 
        {/* DEMO DISPLAY AREA */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative">
          
          {/* TAB 1: MINI QUIZ */}
          {activeMode === 'quiz' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold text-xs">
                    QUESTION 1 OF 3
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Psychometric Personality Test</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sora">
                  What activity gives you the most satisfaction?
                </h3>

                <div className="space-y-3">
                  {[
                    { key: 'tech', label: 'Solving logical puzzles, coding, or working with hardware/data', desc: 'Matched field: Engineering & AI' },
                    { key: 'creative', label: 'Designing graphics, writing stories, or creating digital media', desc: 'Matched field: Product Design & UX' },
                    { key: 'business', label: 'Organizing events, managing budgets, or pitching business ideas', desc: 'Matched field: Business & Management' },
                    { key: 'science', label: 'Conducting lab experiments, biology, or space physics research', desc: 'Matched field: Pure Sciences & Biotech' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setSelectedTrait(opt.key as any)}
                      className={`w-full p-4 rounded-xl text-left border transition-all ${
                        selectedTrait === opt.key
                          ? 'bg-blue-600/10 dark:bg-blue-600/20 border-blue-500 text-slate-900 dark:text-white shadow-md'
                          : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-semibold text-sm">{opt.label}</span>
                        {selectedTrait === opt.key && <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiz Result Preview */}
              <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
                <div className="inline-flex p-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <Award className="w-10 h-10 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                    INSTANT AI RESULT MATCH
                  </span>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sora mt-1">
                    {selectedTrait === 'tech' && 'AI & Software Engineering'}
                    {selectedTrait === 'creative' && 'Product UI/UX & Creative Director'}
                    {selectedTrait === 'business' && 'Tech Product Manager & Entrepreneur'}
                    {selectedTrait === 'science' && 'Research Scientist & Biotechnology'}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
                    Based on your analytical preferences, PATHPILOT predicts a <strong className="text-emerald-600 dark:text-emerald-400">98.4% career satisfaction score</strong> in this path.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={onOpenAssessment}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Take Full Career Assessment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI ROADMAP */}
          {activeMode === 'roadmap' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                    SELECT CAREER PATH
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sora mt-1">
                    {roadmapData[selectedCareer].title}
                  </h3>
                </div>

                {/* Career Selector Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ai', name: 'AI Engineering' },
                    { id: 'design', name: 'UI/UX Design' },
                    { id: 'data', name: 'Data Science' },
                    { id: 'web', name: 'Full-Stack Dev' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedCareer(item.id as any)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedCareer === item.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milestones list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmapData[selectedCareer].milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded w-fit">
                        Milestone {idx + 1} ({m.duration})
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded w-fit ${
                          m.status === 'Completed'
                            ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                            : m.status === 'In Progress'
                            ? 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {m.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{m.detail}</p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={onOpenChat}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                  Ask AI to Customize This Roadmap For You
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: RESUME BUILDER PREVIEW */}
          {activeMode === 'resume' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sora">Student ATS Resume Preview</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Optimized for tech internships & university admissions</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs rounded-lg border border-emerald-500/30 w-fit">
                    ATS SCORE: 96/100
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                    <div className="text-slate-900 dark:text-white font-bold text-sm">Alex Johnson</div>
                    <div className="text-slate-500 dark:text-slate-400">alex.johnson@student.edu • (555) 234-5678 • GitHub: alex-j</div>
                  </div>
                  <div>
                    <div className="text-blue-600 dark:text-blue-400 font-bold uppercase text-[10px]">PROJECT HIGHLIGHTS</div>
                    <div className="text-slate-800 dark:text-slate-200 mt-1">
                      • <strong>Architected AI Roadmap Engine</strong> using React, TypeScript & Groq API, reducing query latency by 45%.
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 mt-1">
                      • <strong>Engineered ATS Resume Scorer</strong> with 99% keyword alignment for computer science applicants.
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-600 dark:text-blue-400 font-bold uppercase text-[10px]">SKILLS</div>
                    <div className="text-slate-700 dark:text-slate-300 mt-1">
                      Python, JavaScript, React, TailWind CSS, PostgreSQL, Git, Groq API, Data Structures
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-left">
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-sora flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" /> AI Resume Suggestions
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-500/30">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">✔ Strong Action Verbs</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">Replaced generic words with high-impact terms like "Architected" & "Engineered".</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-orange-500/30">
                    <span className="text-orange-700 dark:text-orange-400 font-bold">⚡ Quantifiable Impact</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">Added metric results ("reduced query latency by 45%").</p>
                  </div>
                </div>

                <button
                  onClick={onOpenAssessment}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Create Your ATS Resume Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
