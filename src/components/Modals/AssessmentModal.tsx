import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import { X, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Compass, Award, FileText } from 'lucide-react';
import { User } from '../../types';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
  user: User | null;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose, onOpenChat, user }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'tech' | 'creative' | 'business' | 'science'>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (trait: 'tech' | 'creative' | 'business' | 'science') => {
    setAnswers((prev) => ({ ...prev, [currentStep]: trait }));
  };

  const saveAssessmentToSupabase = async (finalAnswers: typeof answers, trait: string) => {
    if (!user || !isSupabaseConfigured()) return;
    setIsSaving(true);
    try {
      const counts = { tech: 0, creative: 0, business: 0, science: 0 };
      Object.values(finalAnswers).forEach((t) => {
        if (t) counts[t]++;
      });

      const recommendedCareers = 
        trait === 'tech' ? ['Machine Learning Engineer', 'Software Architect', 'Data Scientist'] :
        trait === 'creative' ? ['UI/UX Designer', 'Creative Director', '3D Generalist'] :
        trait === 'business' ? ['Product Manager', 'Venture Associate', 'Tech Founder'] :
        ['Biotechnology Researcher', 'Quantum Physicist', 'Data Analyst'];

      const { error } = await supabase.from('career_assessments').insert({
        user_id: user.id,
        answers: finalAnswers,
        trait_scores: counts,
        recommended_careers: recommendedCareers
      });

      if (error) throw error;
    } catch (err) {
      console.error('Failed to save assessment to Supabase:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
      const trait = getPrimaryTrait();
      await saveAssessmentToSupabase(answers, trait);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsSubmitted(false);
  };

  // Determine top trait
  const getPrimaryTrait = () => {
    const counts = { tech: 0, creative: 0, business: 0, science: 0 };
    Object.values(answers).forEach((t) => {
      if (t) counts[t]++;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return (sorted[0]?.[0] as 'tech' | 'creative' | 'business' | 'science') || 'tech';
  };

  const primaryTrait = getPrimaryTrait();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-white text-lg">
                PATHPILOT AI Career Assessment
              </h3>
              <p className="text-xs text-slate-400">3-Minute Psychometric Evaluation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 font-semibold">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-orange-500 transition-all duration-500"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* QUESTION BODY */}
        {!isSubmitted ? (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-white font-sora">
                {QUIZ_QUESTIONS[currentStep].question}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {QUIZ_QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => {
                const isSelected = answers[currentStep] === opt.trait;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(opt.trait)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{opt.label}</span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-400" />}
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block">{opt.description}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40"
              >
                Previous Question
              </button>

              <button
                disabled={!answers[currentStep]}
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'See AI Matches' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* RESULTS VIEW */
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="inline-flex p-4 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Award className="w-12 h-12 text-orange-400" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                PSYCHOMETRIC ASSESSMENT COMPLETED
              </span>
              <h4 className="text-2xl font-extrabold text-white font-sora mt-1">
                {primaryTrait === 'tech' && '🚀 AI & Data Systems Engineer'}
                {primaryTrait === 'creative' && '🎨 Product UI/UX & Creative Director'}
                {primaryTrait === 'business' && '💼 Tech Product Lead & Entrepreneur'}
                {primaryTrait === 'science' && '🔬 Biotechnology & Research Specialist'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                PATHPILOT AI has compiled your personalized 9-month learning roadmap and generated an initial ATS resume template.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-[10px] font-bold text-orange-400 uppercase">MATCH ACCURACY</div>
                <div className="text-lg font-bold text-white mt-0.5">98.6%</div>
                <div className="text-[11px] text-slate-400">High compatibility</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-[10px] font-bold text-blue-400 uppercase">ESTIMATED SALARY</div>
                <div className="text-lg font-bold text-white mt-0.5">$95,000 / yr</div>
                <div className="text-[11px] text-slate-400">Top 10% global field</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-[10px] font-bold text-emerald-400 uppercase">ROADMAP STEPS</div>
                <div className="text-lg font-bold text-white mt-0.5">4 Milestones</div>
                <div className="text-[11px] text-slate-400">Class 9th+ ready</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenChat();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Discuss with AI Chatbot
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  Explore Your Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
