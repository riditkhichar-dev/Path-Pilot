import React from 'react';
import { X, Play, Sparkles, CheckCircle2 } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAssessment: () => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose, onOpenAssessment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-card rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <h3 className="font-sora font-bold text-white text-lg sm:text-xl">
              PATHPILOT Platform Overview & Demo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Container Mockup */}
        <div className="relative rounded-2xl bg-slate-950 border border-slate-800 aspect-video flex flex-col items-center justify-center p-8 text-center overflow-hidden shadow-inner group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-slate-900 to-indigo-950/40" />
          
          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 transform group-hover:scale-110 transition-transform cursor-pointer mx-auto">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs">
                3-MINUTE WALKTHROUGH
              </span>
              <h4 className="text-xl font-bold text-white font-sora mt-2">
                Discover How AI Builds Your Custom Career Roadmap
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Hosted by Lead AI Career Counselor • 50,000+ Student Views
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Psychometric Evaluation</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-300">Groq AI 15ms Chatbot</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="text-slate-300">ATS Resume Builder</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Close Window
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAssessment();
            }}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
          >
            Start Assessment Now
          </button>
        </div>

      </div>
    </div>
  );
};
