import React, { useState } from 'react';
import { FEATURES } from '../data/mockData';
import { 
  Bot, 
  Sparkles, 
  Compass, 
  FileText, 
  GraduationCap, 
  TrendingUp, 
  Video, 
  Briefcase,
  ArrowRight,
  Check
} from 'lucide-react';

interface FeaturesProps {
  onOpenAssessment: () => void;
  onOpenChat: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Bot,
  Sparkles,
  Compass,
  FileText,
  GraduationCap,
  TrendingUp,
  Video,
  Briefcase
};

export const Features: React.FC<FeaturesProps> = ({ onOpenAssessment, onOpenChat }) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'AI & Quiz' | 'Career & Skills'>('All');

  const filteredFeatures = FEATURES.filter((feat) => {
    if (selectedFilter === 'AI & Quiz') {
      return feat.id === 'ai-chat' || feat.id === 'quiz' || feat.id === 'interview';
    }
    if (selectedFilter === 'Career & Skills') {
      return feat.id === 'roadmap' || feat.id === 'resume' || feat.id === 'colleges' || feat.id === 'skills' || feat.id === 'opportunities';
    }
    return true;
  });

  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Empowering Every Student Step
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sora tracking-tight">
            Everything You Need to Build a <span className="gradient-text-orange">Dream Career</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From discovering your true potential to securing top college offers and internships, PATHPILOT gives you an end-to-end AI career engine.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {(['All', 'AI & Quiz', 'Career & Skills'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((feature) => {
            const IconComponent = ICON_MAP[feature.iconName] || Sparkles;
            return (
              <div
                key={feature.id}
                onClick={() => {
                  if (feature.id === 'ai-chat') onOpenChat();
                  else onOpenAssessment();
                }}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 shadow-xl hover:shadow-blue-950/40 relative overflow-hidden"
              >
                {/* Glow bar on top hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div>
                  {/* Card Header & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white font-sora mb-2 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-inter">
                    {feature.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-orange-400 transition-colors">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
