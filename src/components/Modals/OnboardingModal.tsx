import React, { useState, useEffect } from 'react';
import { X, Sparkles, User as UserIcon, Heart, Compass, CheckCircle2, ArrowRight, Check } from 'lucide-react';
import { User } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onComplete: () => void;
}

type OnboardingStep = 'welcome' | 'details' | 'interests' | 'goals' | 'complete';

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  user,
  onComplete,
}) => {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  
  // State for onboarding form
  const [fullName, setFullName] = useState('');
  const [education, setEducation] = useState('College Student');
  const [location, setLocation] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [careerGoal, setCareerGoal] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      if (user.role) {
        setEducation(user.role);
      }
    }
  }, [user]);

  if (!isOpen) return null;

  const interestsList = [
    'Software Coding', 'UI/UX Design', 'Biotechnology', 'Data Science', 
    'Entrepreneurship', 'Digital Marketing', 'Creative Writing', 'Physics & Astronomy', 
    'Finance & Trading', 'Public Speaking', 'Machine Learning', 'Robotics'
  ];

  const goalsList = [
    'I want to figure out what career fits me best',
    'I want to build a step-by-step roadmap to my dream job',
    'I want to prepare for college admissions/majors',
    'I want to switch careers into tech/design',
    'I just want to explore AI career advising'
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    if (step === 'welcome') setStep('details');
    else if (step === 'details') setStep('interests');
    else if (step === 'interests') setStep('goals');
    else if (step === 'goals') setStep('complete');
  };

  const handleBack = () => {
    if (step === 'details') setStep('welcome');
    else if (step === 'interests') setStep('details');
    else if (step === 'goals') setStep('interests');
    else if (step === 'complete') setStep('goals');
  };

  const handleFinish = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      {/* Container Card */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-x-hidden text-slate-100 p-6 sm:p-8 space-y-6 custom-scrollbar">
        
        {/* Glow Decorators */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-orange-500/15 blur-3xl rounded-full pointer-events-none" />

        {/* Progress Indicator */}
        {step !== 'complete' && (
          <div className="flex items-center gap-1.5 justify-center mb-2">
            {(['welcome', 'details', 'interests', 'goals'] as OnboardingStep[]).map((s, idx) => {
              const stepsOrder = ['welcome', 'details', 'interests', 'goals'];
              const currentIdx = stepsOrder.indexOf(step);
              const isPast = stepsOrder.indexOf(s) < currentIdx;
              const isActive = s === step;
              return (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-8 bg-blue-500' : isPast ? 'w-4 bg-emerald-500' : 'w-2 bg-slate-800'
                  }`} 
                />
              );
            })}
          </div>
        )}

        {/* STEP 1: WELCOME */}
        {step === 'welcome' && (
          <div className="space-y-6 text-center py-4">
            <div className="inline-flex p-4 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full animate-pulse">
              <Sparkles className="w-12 h-12 text-orange-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold font-sora tracking-tight text-white">
                Welcome to PATHPILOT 👋
              </h2>
              <p className="text-sm text-slate-400 max-w-sm mx-auto font-inter">
                Let's customize your AI-powered career discovery experience. This will take less than a minute!
              </p>
            </div>
            
            <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 text-left space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 font-medium">Generate hyper-personalized 9-month learning roadmaps.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 font-medium">Chat with our AI Career Counselor powered by Groq.</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-600/20 border border-blue-400/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>
          </div>
        )}

        {/* STEP 2: PERSONAL DETAILS */}
        {step === 'details' && (
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-sora text-white">Tell us about yourself</h3>
              <p className="text-xs text-slate-400">Help us tailor your career recommendations.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Preferred Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl outline-none text-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Education Stage</label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl outline-none text-white transition-colors"
                >
                  <option value="High School Student">High School Student</option>
                  <option value="College Student">College Student / Undergraduate</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                  <option value="Career Switcher">Career Switcher / Professional</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Location (Country/City)</label>
                <input
                  type="text"
                  placeholder="e.g. New York, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl outline-none text-white transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!fullName.trim()}
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INTERESTS */}
        {step === 'interests' && (
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-sora text-white">What are your interests?</h3>
              <p className="text-xs text-slate-400">Select at least 2 topics that excite you.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {interestsList.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md' 
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{interest}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={selectedInterests.length < 2}
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CAREER GOALS */}
        {step === 'goals' && (
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-sora text-white">What is your main career goal?</h3>
              <p className="text-xs text-slate-400">Select the option that matches your current priority.</p>
            </div>

            <div className="space-y-2">
              {goalsList.map((goal) => {
                const isSelected = careerGoal === goal;
                return (
                  <button
                    key={goal}
                    onClick={() => setCareerGoal(goal)}
                    className={`w-full p-3.5 text-left rounded-xl border text-xs font-semibold transition-all flex items-center gap-3 ${
                      isSelected 
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md' 
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-blue-400 bg-blue-500/20' : 'border-slate-600'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                    </div>
                    <span>{goal}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!careerGoal}
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: COMPLETION */}
        {step === 'complete' && (
          <div className="space-y-6 text-center py-4">
            <div className="inline-flex p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold font-sora tracking-tight text-white">
                You're All Set! 🎉
              </h2>
              <p className="text-sm text-slate-400 max-w-sm mx-auto font-inter">
                Congratulations {fullName}, your personalized AI profile is ready. Let's start building your career roadmap!
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl text-left text-xs space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Education stage:</span>
                <span className="font-semibold">{education}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Selected Interests:</span>
                <span className="font-semibold text-right max-w-[200px] truncate">
                  {selectedInterests.join(', ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Goal:</span>
                <span className="font-semibold text-right max-w-[200px] truncate">
                  {careerGoal}
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-xl shadow-lg shadow-emerald-600/20 border border-emerald-400/20 flex items-center justify-center gap-2 transition-all animate-pulse"
            >
              <span>Explore Dashboard</span>
              <Compass className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
