import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Early Beta Student Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sora">
            Hear From Our <span className="gradient-text-orange">Founding Student Cohort</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Real feedback from high school and university students who tested our early AI career roadmaps and resume scoring.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1.5 flex flex-col justify-between shadow-xl relative group"
            >
              <Quote className="w-10 h-10 text-blue-500/20 absolute top-6 right-6 group-hover:text-blue-500/40 transition-colors" />

              <div className="space-y-4 relative z-10">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Highlight Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                  {item.highlight}
                </div>

                {/* Content */}
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40"
                />
                <div>
                  <div className="text-sm font-bold text-white font-sora flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-500/20" />
                  </div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                  <div className="text-[11px] text-orange-400 font-semibold">{item.grade}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
