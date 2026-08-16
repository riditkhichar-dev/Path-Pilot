import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';
import { 
  Sparkles, 
  Layers, 
  Clock, 
  Flame, 
  ChevronRight, 
  CheckCircle2, 
  Map, 
  Trash2, 
  RotateCcw, 
  FileText, 
  BookOpen, 
  Download, 
  ExternalLink, 
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';
import { fetchGroqChatResponse } from '../../services/groqApi';

interface RoadmapStep {
  id: string;
  title: string;
  desc: string;
  resources: string[];
  subtopics?: string[];
  projects?: string[];
  estimatedTime?: string;
}

interface SavedRoadmap {
  id: string;
  title: string;
  description: string;
  targetRole: string;
  level: string;
  durationMonths: number;
  weeklyHours: number;
  steps: RoadmapStep[];
  progress: { [key: string]: boolean }; // tracks step.id -> completed status
  subtopicProgress: { [key: string]: boolean }; // tracks step.id-subtopicIdx -> completed
  projectProgress: { [key: string]: boolean }; // tracks step.id-projectIdx -> completed
  createdAt: string;
}

interface AIRoadmapGeneratorProps {
  userId: string;
  isDarkMode: boolean;
}

const DEFAULT_ROADMAPS: Omit<SavedRoadmap, 'id' | 'createdAt' | 'progress' | 'subtopicProgress' | 'projectProgress'>[] = [
  {
    title: 'Frontend Developer',
    targetRole: 'Frontend Developer',
    description: 'Master modern client-side web applications using React, TailwindCSS, build pipelines, testing setups, and optimization protocols.',
    level: 'Beginner',
    durationMonths: 6,
    weeklyHours: 15,
    steps: [
      {
        id: 'fe-1',
        title: 'HTML5, Semantic Layouts, & CSS3 Mechanics',
        desc: 'Core document outline, styling layouts, Flexbox/Grid alignment systems, responsive design principles, and custom properties variables.',
        resources: ['MDN Web Docs - HTML & CSS', 'W3C Accessibility Guidelines'],
        subtopics: ['Semantic tag architectures', 'CSS Grid & Flexbox alignment models', 'Media queries & viewport optimization', 'Variables & CSS custom properties'],
        projects: ['Develop a fully responsive product landing page matching WCAG contrast requirements.'],
        estimatedTime: '20 hours'
      },
      {
        id: 'fe-2',
        title: 'Modern JavaScript (ES6+) Fundamentals',
        desc: 'Asynchronous event patterns, Promises/async-await structures, ES modules import rules, and Array processing algorithms.',
        resources: ['Eloquence JavaScript book', 'JavaScript Info guide'],
        subtopics: ['Asynchronous event loop mechanics', 'Array operations (map, filter, reduce)', 'Fetch API & JSON handling', 'Modules import/export systems'],
        projects: ['Build a real-time financial tracking utility pulling currency updates via live APIs.'],
        estimatedTime: '35 hours'
      },
      {
        id: 'fe-3',
        title: 'React Core Concept & State Pipelines',
        desc: 'Component lifecycles, virtual DOM rendering, state updates hooks (useState, useEffect, useContext), and custom hook abstractions.',
        resources: ['React official docs beta', 'Dan Abramov Overreacted blog'],
        subtopics: ['Virtual DOM reconciliation rules', 'Hooks cycle & reference caching (useMemo)', 'React Context state management API', 'Custom hook utility design'],
        projects: ['Construct a multi-room Kanban board with drag-and-drop mechanics and local persistence.'],
        estimatedTime: '45 hours'
      }
    ]
  },
  {
    title: 'Backend Developer',
    targetRole: 'Backend Developer',
    description: 'Build scalable APIs, orchestrate relational and document databases, handle security tokens, and configure server runtimes.',
    level: 'Intermediate',
    durationMonths: 6,
    weeklyHours: 15,
    steps: [
      {
        id: 'be-1',
        title: 'Node.js Runtimes & Express Router Frameworks',
        desc: 'Event-driven system lifecycles, route controllers middleware stack, input validations, error filters, and environment settings config.',
        resources: ['Node.js official guides', 'Expressjs API reference'],
        subtopics: ['Event-driven non-blocking runtime cycle', 'Middleware chain execution model', 'JSON Web Token (JWT) authorization guards', 'Config variables injection rules'],
        projects: ['Develop a secure authentication API gateway returning JWT access/refresh tokens.'],
        estimatedTime: '30 hours'
      },
      {
        id: 'be-2',
        title: 'Database Architectures (PostgreSQL / SQL)',
        desc: 'Relational database designs, indexes optimization, transaction safety layers, SQL joins operations, and Prisma ORM tools.',
        resources: ['PostgreSQL documentation', 'Prisma quickstart guides'],
        subtopics: ['Foreign keys & schema normalization Rules', 'Index creation (B-Tree/Hash indexing)', 'Transaction ACID properties safety', 'ORM queries vs raw SQL executions'],
        projects: ['Design a library catalog database system supporting search indexes and nested query fetching.'],
        estimatedTime: '45 hours'
      }
    ]
  }
];

export function AIRoadmapGenerator({ userId, isDarkMode }: AIRoadmapGeneratorProps) {
  const [roadmaps, setRoadmaps] = useState<SavedRoadmap[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>('');
  const [customGoal, setCustomGoal] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState('6');
  const [weeklyHours, setWeeklyHours] = useState('10');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'content' | 'visual'>('content');
  const [showWizard, setShowWizard] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Load saved roadmaps from Supabase or LocalStorage on mount
  useEffect(() => {
    const loadRoadmaps = async () => {
      if (userId && userId !== 'guest' && isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from('career_roadmaps')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: true });

          if (error) throw error;

          if (data && data.length > 0) {
            const mapped: SavedRoadmap[] = data.map(row => {
              const extra = typeof row.steps === 'string' ? JSON.parse(row.steps) : row.steps;
              return {
                id: row.id,
                title: row.title,
                description: row.description || '',
                targetRole: extra.targetRole || row.title,
                level: extra.level || 'Beginner',
                durationMonths: extra.durationMonths || 6,
                weeklyHours: extra.weeklyHours || 15,
                steps: extra.steps || [],
                progress: extra.progress || {},
                subtopicProgress: extra.subtopicProgress || {},
                projectProgress: extra.projectProgress || {},
                createdAt: row.created_at || new Date().toISOString()
              };
            });
            setRoadmaps(mapped);
            setSelectedRoadmapId(mapped[0].id);
            return;
          }
        } catch (err) {
          console.error('Error fetching roadmaps from Supabase:', err);
        }
      }

      // If no data found, load presets
      loadDefaultPresets();
    };

    loadRoadmaps();
  }, [userId]);

  const loadDefaultPresets = () => {
    const initialList: SavedRoadmap[] = DEFAULT_ROADMAPS.map((item, idx) => ({
      ...item,
      id: `default-${idx}`,
      createdAt: new Date().toISOString(),
      progress: {},
      subtopicProgress: {},
      projectProgress: {}
    }));
    setRoadmaps(initialList);
    setSelectedRoadmapId(initialList[0].id);
  };

  const saveToLocalStorage = async (updatedRoadmaps: SavedRoadmap[]) => {
    // 1. Update component state
    setRoadmaps(updatedRoadmaps);

    // 2. Save to Supabase

    if (userId && userId !== 'guest' && isSupabaseConfigured()) {
      try {
        for (const rm of updatedRoadmaps) {
          const isDefault = rm.id.startsWith('default-');
          const payload = {
            title: rm.title,
            description: rm.description,
            steps: {
              targetRole: rm.targetRole,
              level: rm.level,
              durationMonths: rm.durationMonths,
              weeklyHours: rm.weeklyHours,
              steps: rm.steps,
              progress: rm.progress,
              subtopicProgress: rm.subtopicProgress,
              projectProgress: rm.projectProgress
            },
            status: 'active'
          };

          if (isDefault) {
            const { data, error } = await supabase.from('career_roadmaps').insert({
              user_id: userId,
              title: payload.title,
              description: payload.description,
              steps: payload.steps,
              status: payload.status
            }).select('id').single();

            if (!error && data) {
              rm.id = data.id; // update default id with real UUID
            }
          } else {
            await supabase.from('career_roadmaps').upsert({
              id: rm.id,
              user_id: userId,
              title: payload.title,
              description: payload.description,
              steps: payload.steps,
              status: payload.status
            });
          }
        }
      } catch (err) {
        console.error('Failed to save roadmaps to Supabase:', err);
      }
    }
  };

  const activeRoadmap = roadmaps.find(r => r.id === selectedRoadmapId) || roadmaps[0];

  // Calculate Progress Percentages
  const getRoadmapProgressPercent = (rm: SavedRoadmap) => {
    if (!rm || !rm.steps || rm.steps.length === 0) return 0;
    
    let totalItems = 0;
    let completedItems = 0;

    rm.steps.forEach(step => {
      // Step main status
      totalItems += 1;
      if (rm.progress[step.id]) completedItems += 1;

      // Subtopics
      if (step.subtopics) {
        step.subtopics.forEach((_, sIdx) => {
          totalItems += 1;
          if (rm.subtopicProgress[`${step.id}-sub-${sIdx}`]) completedItems += 1;
        });
      }

      // Projects
      if (step.projects) {
        step.projects.forEach((_, pIdx) => {
          totalItems += 1;
          if (rm.projectProgress[`${step.id}-proj-${pIdx}`]) completedItems += 1;
        });
      }
    });

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  // Toggle checklist actions
  const toggleStep = (stepId: string) => {
    if (!activeRoadmap) return;
    const updated = roadmaps.map(rm => {
      if (rm.id === activeRoadmap.id) {
        const nextState = !rm.progress[stepId];
        const nextProgress = { ...rm.progress, [stepId]: nextState };
        
        // Auto-check/uncheck subtopics & projects if parent is toggled
        const nextSubtopicProgress = { ...rm.subtopicProgress };
        const nextProjectProgress = { ...rm.projectProgress };
        const stepObj = rm.steps.find(s => s.id === stepId);
        
        if (stepObj) {
          if (stepObj.subtopics) {
            stepObj.subtopics.forEach((_, sIdx) => {
              nextSubtopicProgress[`${stepId}-sub-${sIdx}`] = nextState;
            });
          }
          if (stepObj.projects) {
            stepObj.projects.forEach((_, pIdx) => {
              nextProjectProgress[`${stepId}-proj-${pIdx}`] = nextState;
            });
          }
        }

        return {
          ...rm,
          progress: nextProgress,
          subtopicProgress: nextSubtopicProgress,
          projectProgress: nextProjectProgress
        };
      }
      return rm;
    });
    saveToLocalStorage(updated);
  };

  const toggleSubtopic = (stepId: string, subIdx: number) => {
    if (!activeRoadmap) return;
    const updated = roadmaps.map(rm => {
      if (rm.id === activeRoadmap.id) {
        const subKey = `${stepId}-sub-${subIdx}`;
        const nextSubtopicProgress = {
          ...rm.subtopicProgress,
          [subKey]: !rm.subtopicProgress[subKey]
        };

        // If all subtopics & projects are complete, check parent step
        const stepObj = rm.steps.find(s => s.id === stepId);
        let allComplete = true;
        if (stepObj) {
          if (stepObj.subtopics) {
            stepObj.subtopics.forEach((_, s) => {
              if (s === subIdx ? rm.subtopicProgress[subKey] : !nextSubtopicProgress[`${stepId}-sub-${s}`]) {
                allComplete = false;
              }
            });
          }
          if (stepObj.projects) {
            stepObj.projects.forEach((_, p) => {
              if (!rm.projectProgress[`${stepId}-proj-${p}`]) {
                allComplete = false;
              }
            });
          }
        }

        return {
          ...rm,
          subtopicProgress: nextSubtopicProgress,
          progress: {
            ...rm.progress,
            [stepId]: allComplete
          }
        };
      }
      return rm;
    });
    saveToLocalStorage(updated);
  };

  const toggleProject = (stepId: string, projIdx: number) => {
    if (!activeRoadmap) return;
    const updated = roadmaps.map(rm => {
      if (rm.id === activeRoadmap.id) {
        const projKey = `${stepId}-proj-${projIdx}`;
        const nextProjectProgress = {
          ...rm.projectProgress,
          [projKey]: !rm.projectProgress[projKey]
        };

        // Check if all complete
        const stepObj = rm.steps.find(s => s.id === stepId);
        let allComplete = true;
        if (stepObj) {
          if (stepObj.subtopics) {
            stepObj.subtopics.forEach((_, s) => {
              if (!rm.subtopicProgress[`${stepId}-sub-${s}`]) {
                allComplete = false;
              }
            });
          }
          if (stepObj.projects) {
            stepObj.projects.forEach((_, p) => {
              if (p === projIdx ? rm.projectProgress[projKey] : !nextProjectProgress[`${stepId}-proj-${p}`]) {
                allComplete = false;
              }
            });
          }
        }

        return {
          ...rm,
          projectProgress: nextProjectProgress,
          progress: {
            ...rm.progress,
            [stepId]: allComplete
          }
        };
      }
      return rm;
    });
    saveToLocalStorage(updated);
  };

  // Reset Active Roadmap Progress
  const handleResetProgress = () => {
    if (!activeRoadmap) return;
    const updated = roadmaps.map(rm => {
      if (rm.id === activeRoadmap.id) {
        return {
          ...rm,
          progress: {},
          subtopicProgress: {},
          projectProgress: {}
        };
      }
      return rm;
    });
    saveToLocalStorage(updated);
  };

  // Delete Roadmap
  const handleDeleteRoadmap = () => {
    if (!activeRoadmap) return;
    const filtered = roadmaps.filter(rm => rm.id !== activeRoadmap.id);
    if (filtered.length === 0) {
      loadDefaultPresets();
    } else {
      setRoadmaps(filtered);
      setSelectedRoadmapId(filtered[0].id);
      saveToLocalStorage(filtered);
    }
  };

  // Call AI API to generate custom roadmap
  const handleGenerateAIPlan = async () => {
    if (!customGoal.trim()) return;
    setIsGenerating(true);
    setErrorMsg(null);

    const userPrompt = `Generate a detailed, step-by-step career learning roadmap for a student aiming to become a: "${customGoal}".
Target Duration: ${duration} months
Experience Level: ${level}
Weekly Study Commitment: ${weeklyHours} hours

Please structure your response strictly as a JSON object, with no conversational preamble or markdown backticks outside of the raw JSON. The format must match:
{
  "title": "Short title of the roadmap",
  "description": "Short introductory summary of the roadmap and target career path",
  "steps": [
    {
      "id": "step-1",
      "title": "Title of Phase 1",
      "desc": "Explanation of Phase 1",
      "estimatedTime": "approx hours e.g. 30 hours",
      "subtopics": ["Concept A", "Concept B", "Concept C"],
      "projects": ["Mini-project description"],
      "resources": ["Specific docs, platform or book name"]
    }
  ]
}

Generate between 3 to 5 realistic stages/steps. Ensure resources are useful, and subtopics cover core conceptual and practical foundations.`;

    try {
      const responseText = await fetchGroqChatResponse([
        { role: 'system', content: 'You are an advanced API system that output raw, valid, minified JSON roadmaps.' },
        { role: 'user', content: userPrompt }
      ]);

      // Parse JSON safely
      let parsedData: any = null;
      try {
        // Find JSON block if wrapped in markdown
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          parsedData = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.warn('JSON parsing failed, falling back to local synthesizer...', parseError);
      }

      if (parsedData && parsedData.steps && parsedData.steps.length > 0) {
        // Format steps to guarantee IDs
        const steps = parsedData.steps.map((s: any, idx: number) => ({
          ...s,
          id: s.id || `ai-${Date.now()}-${idx}`,
          resources: s.resources || ['Official Docs', 'Google Search'],
          subtopics: s.subtopics || [],
          projects: s.projects || []
        }));

        const newRoadmap: SavedRoadmap = {
          id: `ai-${Date.now()}`,
          title: parsedData.title || customGoal,
          description: parsedData.description || `Custom synthesized plan for ${customGoal}`,
          targetRole: customGoal,
          level,
          durationMonths: parseInt(duration),
          weeklyHours: parseInt(weeklyHours),
          steps,
          progress: {},
          subtopicProgress: {},
          projectProgress: {},
          createdAt: new Date().toISOString()
        };

        const updated = [newRoadmap, ...roadmaps];
        saveToLocalStorage(updated);
        setSelectedRoadmapId(newRoadmap.id);
        setShowWizard(false);
        setCustomGoal('');
      } else {
        // Fallback generator
        throw new Error('AI returned invalid format. Invoking fallback template.');
      }
    } catch (e) {
      console.error(e);
      // Fallback Synthesizer
      const fallbackRoadmap: SavedRoadmap = {
        id: `ai-fallback-${Date.now()}`,
        title: `${customGoal} (${level} Plan)`,
        description: `Synthesized curriculum for ${customGoal} tailored for a ${level} level.`,
        targetRole: customGoal,
        level,
        durationMonths: parseInt(duration),
        weeklyHours: parseInt(weeklyHours),
        steps: [
          {
            id: `fb-1-${Date.now()}`,
            title: 'Phase 1: Foundations & Setup',
            desc: `Establish core theoretical concepts and dev settings for ${customGoal}.`,
            resources: ['MDN Web Docs / Tutorial Portals', 'Official Docs'],
            subtopics: ['Basic syntax and rules', 'Core software environments setup', 'Version control (Git) operations'],
            projects: [`Set up a localized playground to test code components for ${customGoal}`],
            estimatedTime: '25 hours'
          },
          {
            id: `fb-2-${Date.now()}`,
            title: 'Phase 2: Project-Based Application',
            desc: `Translate foundational principles into working utilities and applications.`,
            resources: ['Project Tutorial Videos', 'GitHub Open-source Projects'],
            subtopics: ['Component modularization', 'Basic API routing and integrations', 'Data processing workflows'],
            projects: [`Create a fully documented prototype application supporting core tasks`],
            estimatedTime: '40 hours'
          },
          {
            id: `fb-3-${Date.now()}`,
            title: 'Phase 3: Optimization & Deployments',
            desc: `Refine code complexity, security guards, and release packages to public cloud providers.`,
            resources: ['Advanced Systems Design Manuals', 'CI/CD runner blueprints'],
            subtopics: ['Debugging tools and memory profilers', 'Securing endpoint variables', 'Automated build flows'],
            projects: [`Deploy the phase 2 system to static/cloud hosting networks with integration tests`],
            estimatedTime: '30 hours'
          }
        ],
        progress: {},
        subtopicProgress: {},
        projectProgress: {},
        createdAt: new Date().toISOString()
      };
      
      const updated = [fallbackRoadmap, ...roadmaps];
      saveToLocalStorage(updated);
      setSelectedRoadmapId(fallbackRoadmap.id);
      setShowWizard(false);
      setCustomGoal('');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export active roadmap as JSON
  const handleExportJSON = () => {
    if (!activeRoadmap) return;
    const blob = new Blob([JSON.stringify(activeRoadmap, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeRoadmap.title.toLowerCase().replace(/\s+/g, '-')}-roadmap.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const progressPercent = activeRoadmap ? getRoadmapProgressPercent(activeRoadmap) : 0;

  return (
    <div className="space-y-6">
      {/* Top Controls & Navigation Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0B0F19]/60 p-5 rounded-2xl border border-slate-850 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-sora text-white flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-550" />
            AI Roadmap Architect
          </h2>
          <p className="text-xs text-slate-400">
            Generate custom learning paths powered by AI and track progress step-by-step.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Roadmap Library Dropdown */}
          <div className="flex items-center gap-2 bg-[#070913] border border-slate-850 rounded-xl px-3 py-2 shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active Path:</span>
            <select
              value={selectedRoadmapId}
              onChange={(e) => setSelectedRoadmapId(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer border-none p-0 focus:ring-0 max-w-[180px]"
            >
              {roadmaps.map(rm => (
                <option key={rm.id} value={rm.id} className="bg-[#070913] text-slate-200">
                  {rm.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowWizard(!showWizard)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-500/10 border border-blue-500/30 transition-all shrink-0 ml-auto lg:ml-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate New AI Plan</span>
          </button>
        </div>
      </div>

      {/* AI Roadmap Generator Wizard Modal/Accordion */}
      {showWizard && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#090A12] space-y-4 animate-slideDown max-w-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-blue-400" />
              Configure AI Study Architect
            </h3>
            <button 
              onClick={() => setShowWizard(false)}
              className="text-xs text-slate-500 hover:text-slate-200"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Career / Skill Goal</label>
              <input 
                type="text" 
                placeholder="e.g., Solidity Auditor, Next.js SaaS Creator, FastAPI specialist"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
              >
                <option value="Beginner">Beginner (No prior coding experience)</option>
                <option value="Intermediate">Intermediate (Know fundamental concepts)</option>
                <option value="Advanced">Advanced (Experienced developer)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
              >
                <option value="3">3 Months (Intensive boot camp style)</option>
                <option value="6">6 Months (Standard deep-dive)</option>
                <option value="9">9 Months (Comprehensive syllabus)</option>
                <option value="12">12 Months (Complete mastery / university level)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Weekly Commitment</label>
              <select
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
              >
                <option value="5">5 Hours/week (Casual hobbyist)</option>
                <option value="10">10 Hours/week (Regular student)</option>
                <option value="20">20 Hours/week (Dedicated learning)</option>
                <option value="40">40 Hours/week (Full-time focus)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800/40">
            <button 
              onClick={() => setShowWizard(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleGenerateAIPlan}
              disabled={isGenerating || !customGoal.trim()}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-650 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:from-blue-500 transition-all shadow-md"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing roadmap...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Assemble Custom Roadmap</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {activeRoadmap && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Visualizer Area (Timeline or Detailed Content list) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center bg-[#090A12] p-4 rounded-2xl border border-slate-850">
              <div className="flex items-center gap-2 bg-[#07080F] p-1 rounded-xl border border-slate-850">
                <button
                  onClick={() => setViewMode('content')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'content'
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                      : 'text-slate-500 hover:text-slate-350'
                  }`}
                >
                  Syllabus List
                </button>
                <button
                  onClick={() => setViewMode('visual')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'visual'
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                      : 'text-slate-500 hover:text-slate-350'
                  }`}
                >
                  Interactive Flowchart
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleExportJSON}
                  className="p-2 text-slate-400 hover:text-white bg-[#07080F] hover:bg-slate-800 rounded-xl border border-slate-850 transition-colors"
                  title="Export to JSON"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleResetProgress}
                  className="p-2 text-slate-400 hover:text-white bg-[#07080F] hover:bg-slate-800 rounded-xl border border-slate-850 transition-colors"
                  title="Reset Progress"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleDeleteRoadmap}
                  className="p-2 text-red-400 hover:text-red-300 bg-[#07080F] hover:bg-red-950/20 rounded-xl border border-slate-850 transition-colors"
                  title="Delete Roadmap"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Render views */}
            {viewMode === 'visual' ? (
              /* Visual timeline flowchart view */
              <div className="p-8 rounded-2xl border border-slate-850 bg-[#090A12] flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative flex flex-col items-center gap-6 w-full max-w-md">
                  {activeRoadmap.steps.map((step, idx) => {
                    const isCompleted = activeRoadmap.progress[step.id];
                    return (
                      <React.Fragment key={step.id}>
                        <div 
                          onClick={() => toggleStep(step.id)}
                          className={`w-full p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                            isCompleted 
                              ? 'bg-blue-600/10 border-blue-500/40 shadow-lg shadow-blue-500/5' 
                              : 'bg-[#07080F] border-slate-850 hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                            isCompleted ? 'bg-blue-600 text-white' : 'bg-[#090A12] text-slate-500 border border-slate-850'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-4 h-4 text-white" /> : idx + 1}
                          </div>
                          <div className="text-left flex-1">
                            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{step.title}</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">Estimated: {step.estimatedTime || 'N/A'}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </div>
                        {idx < activeRoadmap.steps.length - 1 && (
                          <div className={`w-0.5 h-8 ${isCompleted ? 'bg-blue-500' : 'bg-slate-800'} transition-colors`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* syllabus details accordion list */
              <div className="space-y-3">
                {activeRoadmap.steps.map((step, idx) => {
                  const isStepDone = activeRoadmap.progress[step.id];
                  return (
                    <details 
                      key={step.id} 
                      className="group border border-slate-850 bg-[#090A12] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="p-5 cursor-pointer flex items-center justify-between gap-4 select-none hover:bg-slate-800/20 list-none">
                        <div className="flex items-center gap-4 flex-1">
                          <button
                            type="button"
                            onClick={(e) => { 
                              e.preventDefault(); 
                              e.stopPropagation();
                              toggleStep(step.id); 
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold transition-all shrink-0 ${
                              isStepDone
                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-[#07080F] border-slate-800 text-slate-500'
                            }`}
                          >
                            {isStepDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </button>
                          <div className="text-left flex-1">
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{step.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="hidden sm:block text-right">
                            <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Status</span>
                            <span className={`text-[10px] font-bold ${isStepDone ? 'text-blue-400' : 'text-slate-500'} mt-1 block`}>
                              {isStepDone ? 'Completed' : 'In Progress'}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 transition-transform duration-300 group-open:rotate-90" />
                        </div>
                      </summary>

                      <div className="px-14 pb-5 pt-2 border-t border-slate-850 bg-[#07080F]/40 space-y-4 text-left">
                        {step.estimatedTime && (
                          <div className="flex items-center gap-1.5 text-xs text-orange-400 font-semibold pt-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Estimated Time: {step.estimatedTime}</span>
                          </div>
                        )}

                        {/* Granular Subtopics checklist */}
                        {step.subtopics && step.subtopics.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Core Sub-topics to Master</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {step.subtopics.map((sub, sIdx) => {
                                const isSubDone = activeRoadmap.subtopicProgress[`${step.id}-sub-${sIdx}`];
                                return (
                                  <label 
                                    key={sIdx} 
                                    className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer select-none transition-all ${
                                      isSubDone 
                                        ? 'bg-blue-650/5 border-blue-500/20 text-slate-200' 
                                        : 'bg-[#090A12] border-slate-850 text-slate-400 hover:border-slate-800'
                                    }`}
                                  >
                                    <input 
                                      type="checkbox"
                                      checked={!!isSubDone}
                                      onChange={() => toggleSubtopic(step.id, sIdx)}
                                      className="rounded border-slate-800 text-blue-500 bg-[#07080F] mt-0.5 focus:ring-0"
                                    />
                                    <span>{sub}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Granular Projects checklist */}
                        {step.projects && step.projects.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Practical Labs / Projects</h5>
                            <div className="space-y-1.5">
                              {step.projects.map((proj, pIdx) => {
                                const isProjDone = activeRoadmap.projectProgress[`${step.id}-proj-${pIdx}`];
                                return (
                                  <label 
                                    key={pIdx} 
                                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                                      isProjDone 
                                        ? 'bg-emerald-950/10 border-emerald-500/20 text-slate-250' 
                                        : 'bg-[#090A12] border-slate-850 text-slate-350 hover:border-slate-800'
                                    }`}
                                  >
                                    <input 
                                      type="checkbox"
                                      checked={!!isProjDone}
                                      onChange={() => toggleProject(step.id, pIdx)}
                                      className="rounded border-slate-850 text-emerald-500 bg-[#07080F] mt-0.5 focus:ring-0"
                                    />
                                    <span>{proj}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* resources links list */}
                        {step.resources && step.resources.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended Study Material</h5>
                            <div className="flex flex-wrap gap-2">
                              {step.resources.map((res, rIdx) => (
                                <a 
                                  href={`https://www.google.com/search?q=${encodeURIComponent(res + ' tutorial ' + step.title)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  key={rIdx} 
                                  className="px-3 py-1.5 text-[10px] bg-[#090A12] border border-slate-850 text-slate-300 rounded-lg flex items-center gap-1 hover:border-blue-500 hover:text-white transition-all cursor-pointer"
                                >
                                  <span>📚 {res}</span>
                                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </details>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Status Column */}
          <div className="space-y-4">
            {/* Completion Gauge Widget */}
            <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Enrollment Progress</span>
                <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md font-bold">
                  {progressPercent}% Complete
                </span>
              </div>

              <div className="w-full h-2 bg-[#07080F] rounded-full overflow-hidden border border-slate-850">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-650 transition-all duration-305"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-850/60">
                <div>
                  <span className="block text-[9px] text-slate-500 uppercase font-bold">Level</span>
                  <span className="font-bold text-white mt-0.5 block">{activeRoadmap.level || 'Beginner'}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-500 uppercase font-bold">Target Duration</span>
                  <span className="font-bold text-white mt-0.5 block">{activeRoadmap.durationMonths} Months</span>
                </div>
              </div>
            </div>

            {/* Quick overview of selected roadmap configurations */}
            <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-3 text-left">
              <h5 className="font-bold text-white uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                Plan Configuration
              </h5>
              <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                <p>{activeRoadmap.description}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-semibold bg-indigo-500/5 p-2 rounded-lg border border-indigo-500/10">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Configured for {activeRoadmap.weeklyHours} hours/week commitment.</span>
                </div>
              </div>
            </div>

            {/* Guide Info */}
            <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-2 text-left">
              <h5 className="font-bold text-white uppercase tracking-wider text-[9px]">Roadmap Tips</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check off individual subtopics and projects to complete the stages. Completing tasks updates your global career readiness metrics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
