import React from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  ShieldCheck, 
  Zap, 
  Compass, 
  GraduationCap, 
  FileText, 
  TrendingUp, 
  Layout, 
  HeartHandshake 
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenAssessment: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenAssessment }) => {
  const benefits = [
    { title: 'Personalized AI Recommendations', desc: 'Real-time psychometric & skill matching engineered with Groq AI speed.', icon: Sparkles },
    { title: 'Easy-to-Understand Roadmaps', desc: 'Clear milestone steps broken down into weekly actionable goals.', icon: Compass },
    { title: 'Career Planning from Class 9+', desc: 'Tailored specifically for high school stream choices and university entries.', icon: GraduationCap },
    { title: 'Instant ATS Resume Generation', desc: 'Turn your achievements into a 95+ score ATS resume in minutes.', icon: FileText },
    { title: 'Live Progress & Skill Tracking', desc: 'Visual analytics to measure your readiness for university & internships.', icon: TrendingUp },
    { title: 'Modern SaaS Dashboard', desc: 'Clean, distraction-free interface built for fast student learning.', icon: Layout },
    { title: 'Built Exclusively for Students', desc: 'Designed with feedback from over 50,000 students and academic mentors.', icon: HeartHandshake },
    { title: '100% Secure & Privacy-First', desc: 'Bank-grade data protection, zero ads, and strict student data security.', icon: ShieldCheck },
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> The Unfair Student Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sora">
            Why Students & Parents Choose <span className="gradient-text-orange">PATHPILOT</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Traditional career counseling is expensive, static, and generic. PATHPILOT gives you dynamic AI intelligence 24/7.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 group"
              >
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sora mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
          <h3 className="text-2xl font-bold text-white font-sora text-center mb-8">
            PATHPILOT vs Traditional Methods
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-sora">
                  <th className="py-3 px-4">Feature / Aspect</th>
                  <th className="py-3 px-4 text-blue-400 font-extrabold text-base">PATHPILOT AI Platform</th>
                  <th className="py-3 px-4 text-slate-400">Traditional Counselor</th>
                  <th className="py-3 px-4 text-slate-400">Generic Search Engines</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-inter">
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">24/7 AI Availability</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Instant via Groq LLM</td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-400" /> By Appointment Only</td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-400" /> Unstructured links</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Dynamic Learning Roadmap</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Personalized & Live</td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-400" /> Static PDF / Verbal</td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-400" /> Manual Assembly</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Cost</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Free Tier Available</td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-400" /> $200 - $1,500 / Session</td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Free</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">ATS Resume & Skill Tracker</td>
                  <td className="py-4 px-4 text-emerald-400 font-bold flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Built-in AI Generator</td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-400" /> Extra Charge</td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-400" /> None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
