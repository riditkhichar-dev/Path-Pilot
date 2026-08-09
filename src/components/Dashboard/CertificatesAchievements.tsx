import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle, 
  Download, 
  Lock, 
  Map, 
  BookOpen, 
  User as UserIcon, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  Printer,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface Badge {
  id: string;
  title: string;
  desc: string;
  category: 'quiz' | 'roadmap' | 'general';
  icon: string;
  color: string;
  unlocked: boolean;
}

interface Certificate {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  criteria: string;
  credentialId: string;
}

interface CertificatesAchievementsProps {
  userId: string;
  isDarkMode: boolean;
}

export function CertificatesAchievements({ userId, isDarkMode }: CertificatesAchievementsProps) {
  const [stats, setStats] = useState({
    quizzesCompleted: 0,
    roadmapsGenerated: 0,
    completedSteps: 0,
    averageScore: 0
  });

  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  useEffect(() => {
    // 1. Load Quiz Attempts
    let quizCount = 0;
    let avgScore = 0;
    const quizAttemptsStr = localStorage.getItem('pathpilot_quiz_attempts');
    if (quizAttemptsStr) {
      try {
        const attempts = JSON.parse(quizAttemptsStr);
        quizCount = attempts.length;
        if (quizCount > 0) {
          const total = attempts.reduce((acc: number, curr: any) => acc + (curr.score || 0), 0);
          avgScore = Math.round(total / quizCount);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Load Roadmaps & Steps Completed
    let roadmapsCount = 0;
    let stepsCompleted = 0;
    const roadmapsKey = `pathpilot_saved_roadmaps_${userId || 'guest'}`;
    const roadmapsStr = localStorage.getItem(roadmapsKey);
    if (roadmapsStr) {
      try {
        const roadmaps = JSON.parse(roadmapsStr);
        roadmapsCount = roadmaps.length;
        roadmaps.forEach((rm: any) => {
          if (rm.progress) {
            stepsCompleted += Object.values(rm.progress).filter(v => v === true).length;
          }
        });
      } catch (e) {
        console.error(e);
      }
    }

    setStats({
      quizzesCompleted: quizCount,
      roadmapsGenerated: roadmapsCount,
      completedSteps: stepsCompleted,
      averageScore: avgScore
    });
  }, [userId]);

  // Define Badges based on Stats
  const badges: Badge[] = [
    {
      id: 'badge-1',
      title: 'Aptitude Starter',
      desc: 'Completed your first career mapping assessment quiz.',
      category: 'quiz',
      icon: '🧠',
      color: 'from-blue-600 to-cyan-500',
      unlocked: stats.quizzesCompleted > 0
    },
    {
      id: 'badge-2',
      title: 'Pathfinder Architect',
      desc: 'Created a customized career roadmap using AI synthesis.',
      category: 'roadmap',
      icon: '🗺️',
      color: 'from-purple-600 to-indigo-500',
      unlocked: stats.roadmapsGenerated > 0
    },
    {
      id: 'badge-3',
      title: 'Step Collector',
      desc: 'Marked at least 2 study topics or phases as completed.',
      category: 'roadmap',
      icon: '🧗',
      color: 'from-emerald-600 to-teal-500',
      unlocked: stats.completedSteps >= 2
    },
    {
      id: 'badge-4',
      title: 'Top Assessment Match',
      desc: 'Scored above 85% on any capability exam.',
      category: 'quiz',
      icon: '⚡',
      color: 'from-amber-600 to-orange-500',
      unlocked: stats.averageScore >= 85
    }
  ];

  // Define Certificates based on stats
  const certificates: Certificate[] = [
    {
      id: 'cert-1',
      title: 'Career Assessment Pathfinder',
      description: 'Awarded for completing the introductory career mapping assessment and analyzing student strengths.',
      unlocked: stats.quizzesCompleted > 0,
      criteria: 'Complete at least 1 career quiz',
      credentialId: `PP-PATH-${(userId || 'GUEST').slice(0, 5).toUpperCase()}-92A`
    },
    {
      id: 'cert-2',
      title: 'AI Roadmap Master Graduate',
      description: 'Awarded for generating custom learning steps and ticking off milestones in the AI Roadmap Builder.',
      unlocked: stats.completedSteps >= 2,
      criteria: 'Complete at least 2 roadmap modules',
      credentialId: `PP-GRAD-${(userId || 'GUEST').slice(0, 5).toUpperCase()}-55B`
    }
  ];

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Styles for printing A4 Certificate container */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-print-frame, #certificate-print-frame * {
            visibility: visible;
          }
          #certificate-print-frame {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 2rem !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
        }
      `}} />

      {/* Header bar controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0B0F19]/60 p-5 rounded-2xl border border-slate-850 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-sora text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-500" />
            Certificates & Student Badges
          </h2>
          <p className="text-xs text-slate-400">
            Monitor learning achievements, inspect earned milestones, and print verified certificates.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-[#070913] border border-slate-850 px-4 py-2 rounded-xl text-slate-400">
          <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
          <span>Earned Items: {badges.filter(b => b.unlocked).length} Badges • {certificates.filter(c => c.unlocked).length} Certs</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Stats and Badges Grid */}
        <div className="lg:col-span-2 space-y-6 text-left">
          
          {/* Achievements Stats Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#090A12] border border-slate-850 rounded-2xl space-y-1">
              <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Quizzes Taken</span>
              <span className="text-2xl font-extrabold text-white">{stats.quizzesCompleted}</span>
            </div>
            <div className="p-4 bg-[#090A12] border border-slate-850 rounded-2xl space-y-1">
              <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">AI Roadmaps</span>
              <span className="text-2xl font-extrabold text-purple-400">{stats.roadmapsGenerated}</span>
            </div>
            <div className="p-4 bg-[#090A12] border border-slate-850 rounded-2xl space-y-1">
              <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Modules Completed</span>
              <span className="text-2xl font-extrabold text-emerald-400">{stats.completedSteps}</span>
            </div>
            <div className="p-4 bg-[#090A12] border border-slate-850 rounded-2xl space-y-1">
              <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Avg Exam Score</span>
              <span className="text-2xl font-extrabold text-amber-400">{stats.averageScore}%</span>
            </div>
          </div>

          {/* Badges Grid Section */}
          <div className="p-6 bg-[#090A12] border border-slate-850 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-850">
              Verified Badges
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map(badge => (
                <div 
                  key={badge.id}
                  className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                    badge.unlocked 
                      ? 'bg-gradient-to-r from-slate-900 to-[#0B0F19] border-slate-800' 
                      : 'bg-[#07080F]/50 border-slate-900 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${badge.unlocked ? badge.color : 'from-slate-850 to-slate-900'} flex items-center justify-center text-xl shrink-0 shadow-lg`}>
                    {badge.unlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-600" />}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {badge.title}
                      {badge.unlocked && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded-md">Earned</span>}
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-normal">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Available Certificates */}
        <div className="space-y-4 text-left">
          <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              PathPilot Certification
            </h3>

            <div className="space-y-3">
              {certificates.map(cert => (
                <div 
                  key={cert.id} 
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                    cert.unlocked 
                      ? 'bg-[#07080F] border-slate-800 hover:border-slate-700' 
                      : 'bg-[#07080F]/40 border-slate-900 opacity-65'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Certificate</span>
                      {cert.unlocked ? (
                        <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-bold">Available</span>
                      ) : (
                        <span className="text-[8px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Locked
                        </span>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-white leading-tight">{cert.title}</h5>
                    <p className="text-[10px] text-slate-400 leading-normal">{cert.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-850/60 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 italic">Req: {cert.criteria}</span>
                    {cert.unlocked && (
                      <button 
                        onClick={() => setActiveCert(cert)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1 transition-all"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Certificate Fullscreen inspector */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl bg-[#090A12] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 animate-scaleUp text-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h4 className="font-bold text-sm text-white">Verified Career Certificate</h4>
              <button 
                onClick={() => setActiveCert(null)}
                className="text-xs text-slate-500 hover:text-slate-200"
              >
                Close
              </button>
            </div>

            {/* Printable Certificate Template */}
            <div 
              id="certificate-print-frame"
              className="w-full aspect-[1.414/1] bg-white border-[12px] border-slate-850 p-8 flex flex-col justify-between items-center text-center text-slate-800 relative shadow-inner overflow-hidden font-serif"
            >
              {/* Background watermark seals */}
              <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                <Award className="w-96 h-96 text-slate-800" />
              </div>

              {/* Certificate Border accents */}
              <div className="w-full h-full border border-slate-300 p-6 flex flex-col justify-between items-center">
                <div className="space-y-2">
                  <span className="font-sans text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block">PATHPILOT AI CAREER LABS</span>
                  <h2 className="text-xl font-bold font-serif text-slate-800 pt-2">CERTIFICATE OF COMPLETION</h2>
                  <p className="text-[10px] text-slate-500 font-sans italic">This credential certifies that</p>
                </div>

                <div className="space-y-2">
                  <span className="text-lg font-bold border-b border-slate-400 px-8 py-1 block text-slate-900 italic font-sans font-extrabold">Student Explorer</span>
                  <p className="text-[10px] text-slate-500 max-w-md mx-auto leading-relaxed pt-1">
                    has successfully unlocked milestones and demonstrated intermediate aptitude parameters in the pathway curriculum of
                  </p>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block pt-1">{activeCert.title}</span>
                </div>

                <div className="w-full flex justify-between items-end text-left pt-6 text-[9px] font-sans">
                  <div>
                    <span className="block text-slate-400 uppercase font-bold tracking-wider">Credential ID</span>
                    <span className="font-mono text-slate-800">{activeCert.credentialId}</span>
                  </div>

                  {/* Stamp Seal design */}
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-800 flex items-center justify-center text-blue-800 text-[10px] font-bold rotate-12 shrink-0">
                    PP SEAL
                  </div>

                  <div className="text-right">
                    <span className="block text-slate-400 uppercase font-bold tracking-wider">Certified Date</span>
                    <span className="text-slate-800">{new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button 
                onClick={() => setActiveCert(null)}
                className="px-4 py-2 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={handlePrintCertificate}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
