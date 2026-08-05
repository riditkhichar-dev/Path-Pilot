import React from 'react';
import { Zap, ShieldCheck, Sparkles, GraduationCap, Code2, Cpu, Compass, LineChart } from 'lucide-react';

export const TrustedBy: React.FC = () => {
  const launchPillars = [
    {
      title: 'Groq AI Speed',
      detail: 'Ultra-fast Llama-3 70B inference for instant career Q&A',
      icon: Zap,
      color: 'text-orange-400',
      border: 'border-orange-500/30'
    },
    {
      title: 'Class 9th to University',
      detail: 'Personalized stream choices, high school guidance & roadmaps',
      icon: GraduationCap,
      color: 'text-blue-400',
      border: 'border-blue-500/30'
    },
    {
      title: 'Early Access Cohort',
      detail: 'Free tier unlocked for founding student members',
      icon: Sparkles,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      title: 'Privacy-First & Secure',
      detail: 'Zero data tracking, zero ads, built safely for learners',
      icon: ShieldCheck,
      color: 'text-amber-400',
      border: 'border-amber-500/30'
    },
  ];

  const targetDisciplines = [
    { name: 'AI & Data Engineering', icon: Cpu },
    { name: 'Full-Stack Software', icon: Code2 },
    { name: 'UI/UX & Product Design', icon: Compass },
    { name: 'Business & Tech Management', icon: LineChart },
  ];

  return (
    <section className="py-14 bg-white dark:bg-slate-900/90 border-y border-slate-200 dark:border-slate-800 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400">
            EARLY ACCESS PLATFORM LAUNCH
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sora mt-1">
            Built for Ambitious Students & Future Pioneers
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            PATHPILOT is opening early access to help high school and university students discover, plan, and build their career roadmap with AI.
          </p>
        </div>

        {/* Authentic Launch Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {launchPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`glass-card p-5 rounded-2xl border ${pillar.border} text-left hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                    <Icon className={`w-5 h-5 ${pillar.color}`} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sora">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Target Disciplines Strip */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Popular Learning Pathways:
          </span>
          {targetDisciplines.map((disc, idx) => {
            const Icon = disc.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm">
                <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{disc.name}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
