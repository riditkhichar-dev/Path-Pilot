import React, { useState } from 'react';
import { Play, ArrowRight, Sparkles, Bot, Compass, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onOpenAssessment: () => void;
  onOpenWatchDemo: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAssessment,
  onOpenWatchDemo,
  onOpenChat
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'chat' | 'quiz'>('roadmap');

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-slate-950">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-12 w-[250px] h-[250px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>AI-POWERED CAREER GUIDANCE FOR STUDENTS</span>
        </div>

        {/* Crisp Headline & Minimal Subheadline */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sora leading-tight">
            Find Your Perfect Career Path with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-400">AI</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-inter">
            Discover careers matching your interests, generate personalized learning roadmaps, and build your dream future—all in one platform.
          </p>

          {/* Simple Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onOpenAssessment}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-600/30 border border-blue-400/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>

            <button
              onClick={onOpenWatchDemo}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current text-blue-400" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Minimal Clean SaaS Visual Container */}
        <div className="mt-12 max-w-4xl mx-auto glass-card p-3 sm:p-5 rounded-2xl border border-slate-800 shadow-2xl text-left">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">PATHPILOT Student Hub</span>
            </div>

            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'roadmap' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'chat' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Chat
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'quiz' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Career Match
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 min-h-[220px]">
            {activeTab === 'roadmap' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white font-sora">Target Goal: AI & Machine Learning Specialist</span>
                  <span className="text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded">98.6% Match</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/40">
                    <div className="text-[10px] text-emerald-400 font-bold">MILESTONE 1 (COMPLETED)</div>
                    <div className="text-xs font-bold text-white mt-0.5">Python & Math Foundations</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-orange-500/40">
                    <div className="text-[10px] text-orange-400 font-bold">MILESTONE 2 (IN PROGRESS)</div>
                    <div className="text-xs font-bold text-white mt-0.5">Machine Learning Core</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-bold">MILESTONE 3 (UPCOMING)</div>
                    <div className="text-xs font-bold text-slate-300 mt-0.5">LLMs & Groq Integration</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="space-y-2 text-xs animate-fadeIn">
                <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300 border border-slate-800">
                  <strong className="text-blue-400">Student:</strong> What stream is best for AI Engineering after Class 10?
                </div>
                <div className="p-2.5 bg-blue-950/40 rounded-lg text-slate-200 border border-blue-900/50">
                  <strong className="text-orange-400">PATHPILOT AI:</strong> Choose <strong>Science (Physics, Chemistry, Math)</strong>. Focus on Calculus & Logic, and start learning basic Python!
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="text-center py-4 space-y-2 animate-fadeIn">
                <div className="text-xs text-orange-400 font-bold">PSYCHOMETRIC MATCH RESULT</div>
                <div className="text-lg font-bold text-white font-sora">Top Career: AI Systems Architect (98.6%)</div>
                <button
                  onClick={onOpenAssessment}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1"
                >
                  Start Full Assessment Quiz
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
