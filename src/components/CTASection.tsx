import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface CTASectionProps {
  onOpenAssessment: () => void;
  onOpenChat: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenAssessment, onOpenChat }) => {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glow backdrop */}
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-blue-500/40 bg-gradient-to-br from-blue-950/80 via-slate-900 to-indigo-950/80 shadow-2xl text-center space-y-6">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-orange-400" /> Start Free in Under 60 Seconds
          </div>

          {/* Headline & Subheadline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-sora max-w-3xl mx-auto leading-tight">
            Start Your Career Journey <span className="gradient-text-orange">Today</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-inter leading-relaxed">
            Join thousands of students using AI to make smarter career decisions, generate personalized learning roadmaps, and build ATS resumes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenAssessment}
              className="w-full sm:w-auto px-9 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 rounded-2xl shadow-xl shadow-blue-600/40 hover:shadow-blue-500/60 border border-blue-400/40 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenAssessment}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Login to Account</span>
            </button>
          </div>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-medium">
            <span>✔ No Credit Card Required</span>
            <span>✔ Free Forever Student Tier</span>
            <span>✔ 24/7 Groq AI Assistant</span>
          </div>

        </div>

      </div>
    </section>
  );
};
