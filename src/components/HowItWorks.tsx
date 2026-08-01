import React, { useState } from 'react';
import { UserPlus, Sparkles, MapPin, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onOpenAssessment: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAssessment }) => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Create your account',
      subtitle: 'Free & Instant Access',
      description: 'Sign up in less than 30 seconds. Tell us your current grade (Class 9th to College), academic interests, and target goals.',
      icon: UserPlus,
      color: 'from-blue-500 to-indigo-600',
      mockupText: 'Step 1: Profile creation completed • Grade: Class 12 Science (PCM)'
    },
    {
      number: 2,
      title: 'Complete the career assessment',
      subtitle: 'Psychometric & Aptitude Analysis',
      description: 'Take our 3-minute AI career quiz. Evaluate your problem-solving style, logic, creativity, and long-term career preferences.',
      icon: Sparkles,
      color: 'from-orange-500 to-amber-600',
      mockupText: 'Step 2: AI Psychometric evaluation completed • Top 3 matches generated'
    },
    {
      number: 3,
      title: 'Receive your AI-generated roadmap',
      subtitle: 'Custom Milestones & Courses',
      description: 'Get an ultra-personalized learning blueprint showing exact high school subjects, coding languages, top colleges, and certifications.',
      icon: MapPin,
      color: 'from-sky-500 to-blue-600',
      mockupText: 'Step 3: 9-Month Personalized AI Roadmap activated'
    },
    {
      number: 4,
      title: 'Start learning and track your progress',
      subtitle: 'Build Resumes & Unlock Internships',
      description: 'Follow your milestone roadmap, track completed skills, build your ATS resume, and get matched with student internships.',
      icon: Rocket,
      color: 'from-emerald-500 to-teal-600',
      mockupText: 'Step 4: Active Skill Tracking • ATS Resume Score: 94/100'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            Simple 4-Step Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sora">
            How <span className="gradient-text-blue">PATHPILOT</span> Works
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A frictionless pathway designed to take you from student confusion to absolute career clarity.
          </p>
        </div>

        {/* Stepper Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Steps Menu */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.number;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 border-blue-500/60 shadow-xl shadow-blue-950/40 -translate-x-1'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} text-white font-bold shrink-0 shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                          STEP {step.number}
                        </span>
                        <span className="text-xs text-slate-400">• {step.subtitle}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-sora">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-inter">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Visual Stepper Screen */}
          <div className="lg:col-span-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">Active Step Simulation</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-bold text-xs">
                  Step {activeStep} of 4
                </span>
              </div>

              <div className="py-8 text-center space-y-6">
                <div className="inline-flex p-5 rounded-3xl bg-slate-900 border border-slate-800 text-blue-400 shadow-inner">
                  {React.createElement(steps[activeStep - 1].icon, { className: "w-12 h-12 text-orange-400" })}
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h4 className="text-2xl font-bold text-white font-sora">
                    {steps[activeStep - 1].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
                    {steps[activeStep - 1].mockupText}
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onOpenAssessment}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 inline-flex items-center gap-2"
                  >
                    Start Step 1 Free Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
