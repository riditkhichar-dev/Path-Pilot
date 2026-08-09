import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Plus, 
  Trash2, 
  Briefcase, 
  GraduationCap, 
  Code, 
  User as UserIcon, 
  Globe, 
  Linkedin, 
  Github, 
  Phone, 
  Mail,
  Printer,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { fetchGroqChatResponse } from '../../services/groqApi';

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  title: string;
  technologies: string;
  link: string;
  description: string;
}

type TemplateType = 'modern' | 'elegant' | 'tech';

export function ResumeBuilder() {
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [personal, setPersonal] = useState({
    name: 'Alex Rivera',
    title: 'Aspiring Machine Learning Engineer',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://alexrivera.dev',
    linkedin: 'linkedin.com/in/alexrivera',
    github: 'github.com/alexrivera',
    summary: 'Ambitious computer science student passionate about training predictive modeling systems, configuring data pipelines, and implementing high-efficiency backend services.'
  });

  const [education, setEducation] = useState<Education[]>([
    {
      institution: 'State University',
      degree: 'B.S. Computer Science',
      field: 'Machine Learning concentration',
      startDate: '2023',
      endDate: '2027 (Expected)',
      gpa: '3.85/4.0'
    }
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    {
      company: 'PathPilot Studios',
      role: 'Software Development Intern',
      location: 'San Francisco, CA',
      startDate: 'Jun 2025',
      endDate: 'Present',
      description: 'Collaborate with frontend engineers to construct modular React components. Assist in API migration phases and optimize client bundle loading metrics.'
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      title: 'Neural Style Transfer Pipeline',
      technologies: 'Python, PyTorch, FastAPI',
      link: 'github.com/alexrivera/neural-style',
      description: 'Constructed an asynchronous API pipeline to transform input digital graphics into custom textures based on neural networks.'
    }
  ]);

  const [skills, setSkills] = useState({
    languages: 'Python, JavaScript, TypeScript, C++, SQL',
    frameworks: 'React, Next.js, PyTorch, Express, TailwindCSS',
    tools: 'Git, Docker, VS Code, Google Cloud Platform'
  });

  const [isEnhancing, setIsEnhancing] = useState<{ [key: string]: boolean }>({});

  // Add Item helpers
  const addEducation = () => {
    setEducation([...education, { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    setExperience([...experience, { company: '', role: '', location: '', startDate: '', endDate: '', description: '' }]);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { title: '', technologies: '', link: '', description: '' }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // AI Enhancement using Groq API
  const handleAIEnhance = async (type: 'summary' | 'exp' | 'proj', index?: number) => {
    const key = `${type}-${index !== undefined ? index : 'main'}`;
    setIsEnhancing(prev => ({ ...prev, [key]: true }));

    let originalText = '';
    if (type === 'summary') originalText = personal.summary;
    else if (type === 'exp' && index !== undefined) originalText = experience[index].description;
    else if (type === 'proj' && index !== undefined) originalText = projects[index].description;

    if (!originalText.trim()) {
      setIsEnhancing(prev => ({ ...prev, [key]: false }));
      return;
    }

    const systemPrompt = `You are a professional resume writer and career coach. Your task is to rewrite the input description into a highly compelling, action-oriented, and ATS-optimized bullet point or summary. Use strong action verbs (e.g. Architected, Formulated, Integrated) and structure achievements clearly. Do not use conversational preambles; return only the rewritten description.`;

    try {
      const rewritten = await fetchGroqChatResponse([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Please optimize this description for a student's resume: "${originalText}"` }
      ]);

      if (rewritten && rewritten.trim()) {
        const cleanedText = rewritten.replace(/^["'\-\s]+|["'\-\s]+$/g, '').trim();
        
        if (type === 'summary') {
          setPersonal(prev => ({ ...prev, summary: cleanedText }));
        } else if (type === 'exp' && index !== undefined) {
          const updated = [...experience];
          updated[index].description = cleanedText;
          setExperience(updated);
        } else if (type === 'proj' && index !== undefined) {
          const updated = [...projects];
          updated[index].description = cleanedText;
          setProjects(updated);
        }
      }
    } catch (e) {
      console.error('Failed to enhance resume description with AI:', e);
    } finally {
      setIsEnhancing(prev => ({ ...prev, [key]: false }));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* CSS @media print Rules to isolate resume content container */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume-area, #printable-resume-area * {
            visibility: visible;
          }
          #printable-resume-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
        }
      `}} />

      {/* Header controls bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0B0F19]/60 p-5 rounded-2xl border border-slate-850 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-sora text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Resume Builder & AI Optimizer
          </h2>
          <p className="text-xs text-slate-400">
            Select templates, fill career details, optimize bullets with AI, and export print-ready PDFs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Template Switcher */}
          <div className="flex items-center gap-2 bg-[#070913] border border-slate-850 rounded-xl px-3 py-1.5 shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Style:</span>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as TemplateType)}
              className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer border-none p-0 focus:ring-0"
            >
              <option value="modern" className="bg-[#070913]">Modern Minimal</option>
              <option value="elegant" className="bg-[#070913]">Elegant Executive</option>
              <option value="tech" className="bg-[#070913]">Developer Monospace</option>
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-500/10 border border-blue-500/30 transition-all shrink-0 ml-auto lg:ml-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export & Save PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Left Side: Form Editor Panel */}
        <div className="space-y-6 bg-[#090A12] border border-slate-850 p-6 rounded-2xl max-h-[85vh] overflow-y-auto custom-scrollbar text-left">
          
          {/* Section 1: Personal Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-blue-500" />
              Personal details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                <input 
                  type="text" 
                  value={personal.name} 
                  onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Professional Goal / Title</label>
                <input 
                  type="text" 
                  value={personal.title} 
                  onChange={(e) => setPersonal({ ...personal, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  value={personal.email} 
                  onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Phone number</label>
                <input 
                  type="text" 
                  value={personal.phone} 
                  onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Portfolio Link / Website</label>
                <input 
                  type="text" 
                  value={personal.website} 
                  onChange={(e) => setPersonal({ ...personal, website: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400">LinkedIn Username</label>
                <input 
                  type="text" 
                  value={personal.linkedin} 
                  onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="block text-[10px] uppercase font-bold text-slate-400">GitHub Profile</label>
                <input 
                  type="text" 
                  value={personal.github} 
                  onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Professional Summary</label>
                <button
                  onClick={() => handleAIEnhance('summary')}
                  disabled={isEnhancing['summary-main']}
                  className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/5 px-2 py-0.5 rounded-lg border border-blue-500/10"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{isEnhancing['summary-main'] ? 'Optimizing...' : 'AI Professional Summary'}</span>
                </button>
              </div>
              <textarea 
                rows={3} 
                value={personal.summary}
                onChange={(e) => setPersonal({ ...personal, summary: e.target.value })}
                className="w-full p-3.5 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white resize-none leading-relaxed focus:border-blue-500"
              />
            </div>
          </div>

          {/* Section 2: Education */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                Education history
              </h3>
              <button 
                onClick={addEducation}
                className="p-1 hover:bg-slate-800 text-blue-400 hover:text-white rounded-lg transition-colors"
                title="Add Education"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-850 bg-[#07080F]/40 space-y-3 relative group">
                <button
                  onClick={() => removeEducation(idx)}
                  className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Institution</label>
                    <input 
                      type="text" 
                      value={edu.institution} 
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].institution = e.target.value;
                        setEducation(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Degree & Concentration</label>
                    <input 
                      type="text" 
                      value={edu.degree} 
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].degree = e.target.value;
                        setEducation(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Field of Study</label>
                    <input 
                      type="text" 
                      value={edu.field} 
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].field = e.target.value;
                        setEducation(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">GPA / Achievements</label>
                    <input 
                      type="text" 
                      value={edu.gpa} 
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].gpa = e.target.value;
                        setEducation(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Start Date</label>
                    <input 
                      type="text" 
                      value={edu.startDate} 
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].startDate = e.target.value;
                        setEducation(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">End Date</label>
                    <input 
                      type="text" 
                      value={edu.endDate} 
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].endDate = e.target.value;
                        setEducation(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 3: Work Experience */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                Work experience
              </h3>
              <button 
                onClick={addExperience}
                className="p-1 hover:bg-slate-800 text-blue-400 hover:text-white rounded-lg transition-colors"
                title="Add Work Experience"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {experience.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-850 bg-[#07080F]/40 space-y-3 relative group">
                <button
                  onClick={() => removeExperience(idx)}
                  className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Company</label>
                    <input 
                      type="text" 
                      value={exp.company} 
                      onChange={(e) => {
                        const updated = [...experience];
                        updated[idx].company = e.target.value;
                        setExperience(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Role / Position</label>
                    <input 
                      type="text" 
                      value={exp.role} 
                      onChange={(e) => {
                        const updated = [...experience];
                        updated[idx].role = e.target.value;
                        setExperience(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Location</label>
                    <input 
                      type="text" 
                      value={exp.location} 
                      onChange={(e) => {
                        const updated = [...experience];
                        updated[idx].location = e.target.value;
                        setExperience(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase font-bold text-slate-400">Start</label>
                      <input 
                        type="text" 
                        value={exp.startDate} 
                        onChange={(e) => {
                          const updated = [...experience];
                          updated[idx].startDate = e.target.value;
                          setExperience(updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase font-bold text-slate-400">End</label>
                      <input 
                        type="text" 
                        value={exp.endDate} 
                        onChange={(e) => {
                          const updated = [...experience];
                          updated[idx].endDate = e.target.value;
                          setExperience(updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Role Achievements & Description</label>
                    <button
                      onClick={() => handleAIEnhance('exp', idx)}
                      disabled={isEnhancing[`exp-${idx}`]}
                      className="text-[9px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/5 px-2 py-0.5 rounded-lg border border-blue-500/10"
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{isEnhancing[`exp-${idx}`] ? 'Writing...' : 'AI Enhance Bullet'}</span>
                    </button>
                  </div>
                  <textarea 
                    rows={3} 
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...experience];
                      updated[idx].description = e.target.value;
                      setExperience(updated);
                    }}
                    className="w-full p-3 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white resize-none leading-relaxed focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Projects */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-500" />
                Featured projects
              </h3>
              <button 
                onClick={addProject}
                className="p-1 hover:bg-slate-800 text-blue-400 hover:text-white rounded-lg transition-colors"
                title="Add Project"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-850 bg-[#07080F]/40 space-y-3 relative group">
                <button
                  onClick={() => removeProject(idx)}
                  className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Project Title</label>
                    <input 
                      type="text" 
                      value={proj.title} 
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx].title = e.target.value;
                        setProjects(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Tech Stack Used</label>
                    <input 
                      type="text" 
                      value={proj.technologies} 
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx].technologies = e.target.value;
                        setProjects(updated);
                      }}
                      placeholder="e.g. PyTorch, React, SQL"
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Project Link</label>
                    <input 
                      type="text" 
                      value={proj.link} 
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx].link = e.target.value;
                        setProjects(updated);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[9px] uppercase font-bold text-slate-400">Project Achievements / Description</label>
                    <button
                      onClick={() => handleAIEnhance('proj', idx)}
                      disabled={isEnhancing[`proj-${idx}`]}
                      className="text-[9px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/5 px-2 py-0.5 rounded-lg border border-blue-500/10"
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{isEnhancing[`proj-${idx}`] ? 'Writing...' : 'AI Enhance Bullet'}</span>
                    </button>
                  </div>
                  <textarea 
                    rows={3} 
                    value={proj.description}
                    onChange={(e) => {
                      const updated = [...projects];
                      updated[idx].description = e.target.value;
                      setProjects(updated);
                    }}
                    className="w-full p-3 text-xs bg-[#07080F] border border-slate-850 rounded-lg outline-none text-white resize-none leading-relaxed focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Section 5: Skills */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-500" />
              Core Competencies / Skills
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-bold text-slate-400">Programming Languages</label>
                <input 
                  type="text" 
                  value={skills.languages} 
                  onChange={(e) => setSkills({ ...skills, languages: e.target.value })}
                  placeholder="e.g. Python, C++, TypeScript"
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-bold text-slate-400">Frameworks / Libraries</label>
                <input 
                  type="text" 
                  value={skills.frameworks} 
                  onChange={(e) => setSkills({ ...skills, frameworks: e.target.value })}
                  placeholder="e.g. React, Next.js, PyTorch"
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-bold text-slate-400">Developer Tools & Platforms</label>
                <input 
                  type="text" 
                  value={skills.tools} 
                  onChange={(e) => setSkills({ ...skills, tools: e.target.value })}
                  placeholder="e.g. Git, Docker, GCP"
                  className="w-full px-3.5 py-2 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Live preview canvas */}
        <div className="sticky top-24 space-y-4">
          <div className="bg-[#090A12] border border-slate-850 p-2.5 rounded-2xl flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-2.5">Document Live Canvas</span>
            <span className="text-[10px] text-slate-400 font-semibold bg-[#07080F] border border-slate-850 px-3 py-1 rounded-lg">
              Letter format • PDF Optimized
            </span>
          </div>

          {/* Printable Layout Container */}
          <div 
            id="printable-resume-area" 
            className="w-full aspect-[1/1.414] bg-white text-[#1E293B] shadow-2xl p-8 rounded-2xl overflow-y-auto text-left relative"
          >
            {/* Template Layout 1: Modern Minimal */}
            {template === 'modern' && (
              <div className="space-y-6 font-sans text-xs">
                {/* Header */}
                <div className="text-center space-y-1.5 pb-4 border-b border-slate-200">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">{personal.name || 'Your Name'}</h1>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{personal.title || 'Professional Title'}</p>
                  
                  {/* Contact Links */}
                  <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[10px] text-slate-500 pt-1">
                    {personal.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {personal.email}</span>}
                    {personal.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {personal.phone}</span>}
                    {personal.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {personal.website}</span>}
                    {personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {personal.linkedin}</span>}
                    {personal.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" /> {personal.github}</span>}
                  </div>
                </div>

                {/* Summary */}
                {personal.summary && (
                  <div className="space-y-1.5">
                    <h3 className="text-[10px] uppercase font-bold text-slate-900 tracking-wider">Professional Profile</h3>
                    <p className="text-slate-600 leading-relaxed">{personal.summary}</p>
                  </div>
                )}

                {/* Work Experience */}
                {experience.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] uppercase font-bold text-slate-900 tracking-wider pb-1 border-b border-slate-100">Professional Experience</h3>
                    <div className="space-y-4">
                      {experience.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-slate-850">{exp.role || 'Position'}</span>
                              <span className="text-slate-400 mx-1.5">|</span>
                              <span className="font-semibold text-slate-600">{exp.company || 'Company'}</span>
                            </div>
                            <span className="text-[10px] text-slate-500">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          {exp.location && <p className="text-[10px] text-slate-400">{exp.location}</p>}
                          <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] uppercase font-bold text-slate-900 tracking-wider pb-1 border-b border-slate-100">Academic & Independent Projects</h3>
                    <div className="space-y-4">
                      {projects.map((proj, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-slate-850">{proj.title || 'Project Name'}</span>
                              {proj.technologies && (
                                <>
                                  <span className="text-slate-400 mx-1.5">|</span>
                                  <span className="text-[10px] font-semibold text-slate-500 italic">({proj.technologies})</span>
                                </>
                              )}
                            </div>
                            {proj.link && <span className="text-[10px] text-blue-600 font-medium">{proj.link}</span>}
                          </div>
                          <p className="text-slate-600 leading-relaxed">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] uppercase font-bold text-slate-900 tracking-wider pb-1 border-b border-slate-100">Education</h3>
                    <div className="space-y-3">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-start">
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-850">{edu.institution || 'School Name'}</span>
                            <p className="text-slate-600">{edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                          </div>
                          <span className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Skills */}
                <div className="space-y-3">
                  <h3 className="text-[10px] uppercase font-bold text-slate-900 tracking-wider pb-1 border-b border-slate-100">Technical Skills</h3>
                  <div className="space-y-1">
                    {skills.languages && <p><span className="font-bold text-slate-700">Languages:</span> <span className="text-slate-600">{skills.languages}</span></p>}
                    {skills.frameworks && <p><span className="font-bold text-slate-700">Frameworks:</span> <span className="text-slate-600">{skills.frameworks}</span></p>}
                    {skills.tools && <p><span className="font-bold text-slate-700">Developer Tools:</span> <span className="text-slate-600">{skills.tools}</span></p>}
                  </div>
                </div>
              </div>
            )}

            {/* Template Layout 2: Elegant Executive */}
            {template === 'elegant' && (
              <div className="grid grid-cols-3 gap-6 font-serif text-xs">
                {/* Sidebar */}
                <div className="col-span-1 space-y-6 pr-4 border-r border-slate-200">
                  <div className="space-y-1">
                    <h1 className="text-lg font-bold text-slate-900 leading-tight">{personal.name}</h1>
                    <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest leading-tight">{personal.title}</p>
                  </div>

                  {/* Contact Links */}
                  <div className="space-y-2 text-[10px] text-slate-600">
                    <h3 className="text-[9px] uppercase font-bold text-slate-900 tracking-widest border-b border-slate-200 pb-1">Contact</h3>
                    {personal.email && <p className="truncate flex items-center gap-1"><Mail className="w-3 h-3 shrink-0" /> {personal.email}</p>}
                    {personal.phone && <p className="flex items-center gap-1"><Phone className="w-3 h-3 shrink-0" /> {personal.phone}</p>}
                    {personal.website && <p className="truncate flex items-center gap-1"><Globe className="w-3 h-3 shrink-0" /> {personal.website}</p>}
                    {personal.linkedin && <p className="truncate flex items-center gap-1"><Linkedin className="w-3 h-3 shrink-0" /> {personal.linkedin}</p>}
                    {personal.github && <p className="truncate flex items-center gap-1"><Github className="w-3 h-3 shrink-0" /> {personal.github}</p>}
                  </div>

                  {/* Technical Skills */}
                  <div className="space-y-3">
                    <h3 className="text-[9px] uppercase font-bold text-slate-900 tracking-widest border-b border-slate-200 pb-1">Skills</h3>
                    {skills.languages && (
                      <div className="space-y-0.5">
                        <span className="font-bold text-[9px] uppercase text-slate-700">Languages</span>
                        <p className="text-slate-600">{skills.languages}</p>
                      </div>
                    )}
                    {skills.frameworks && (
                      <div className="space-y-0.5">
                        <span className="font-bold text-[9px] uppercase text-slate-700">Frameworks</span>
                        <p className="text-slate-600">{skills.frameworks}</p>
                      </div>
                    )}
                    {skills.tools && (
                      <div className="space-y-0.5">
                        <span className="font-bold text-[9px] uppercase text-slate-700">Tools</span>
                        <p className="text-slate-600">{skills.tools}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Content Pane */}
                <div className="col-span-2 space-y-6">
                  {/* Summary */}
                  {personal.summary && (
                    <div className="space-y-2">
                      <h3 className="text-[9px] uppercase font-bold text-slate-900 tracking-widest pb-1 border-b border-slate-200">Executive Summary</h3>
                      <p className="text-slate-650 leading-relaxed font-sans">{personal.summary}</p>
                    </div>
                  )}

                  {/* Work Experience */}
                  {experience.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[9px] uppercase font-bold text-slate-900 tracking-widest pb-1 border-b border-slate-200">Professional Background</h3>
                      {experience.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-800">{exp.role}</span>
                            <span className="text-[9px] text-slate-500 font-sans">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <p className="text-[10px] font-semibold text-slate-650 italic font-sans">{exp.company} {exp.location && `• ${exp.location}`}</p>
                          <p className="text-slate-650 leading-relaxed font-sans mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Projects */}
                  {projects.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[9px] uppercase font-bold text-slate-900 tracking-widest pb-1 border-b border-slate-200">Key Projects</h3>
                      {projects.map((proj, idx) => (
                        <div key={idx} className="space-y-1 font-sans">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-850 font-serif">{proj.title}</span>
                            {proj.link && <span className="text-[10px] text-blue-600 font-medium">{proj.link}</span>}
                          </div>
                          {proj.technologies && <p className="text-[9px] text-slate-500 font-semibold italic">Stack: {proj.technologies}</p>}
                          <p className="text-slate-650 leading-relaxed mt-0.5">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {education.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[9px] uppercase font-bold text-slate-900 tracking-widest pb-1 border-b border-slate-200">Education</h3>
                      {education.map((edu, idx) => (
                        <div key={idx} className="space-y-1 font-sans">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-850 font-serif">{edu.institution}</span>
                            <span className="text-[9px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                          </div>
                          <p className="text-slate-650">{edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Template Layout 3: Developer Monospace */}
            {template === 'tech' && (
              <div className="space-y-5 font-mono text-[10px]">
                {/* Header */}
                <div className="space-y-1 pb-3 border-b border-dashed border-slate-300">
                  <h1 className="text-lg font-bold text-slate-950 font-sans tracking-tight">&gt; {personal.name}</h1>
                  <p className="text-[11px] text-slate-500 font-semibold">{personal.title}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 pt-1">
                    {personal.email && <span>email: {personal.email}</span>}
                    {personal.phone && <span>phone: {personal.phone}</span>}
                    {personal.website && <span>web: {personal.website}</span>}
                    {personal.linkedin && <span>linkedin: {personal.linkedin}</span>}
                    {personal.github && <span>github: {personal.github}</span>}
                  </div>
                </div>

                {/* Summary */}
                {personal.summary && (
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800">[0] PROFILE</span>
                    <p className="text-slate-650 leading-normal pl-4 border-l border-slate-200">{personal.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                  <div className="space-y-3">
                    <span className="font-bold text-slate-800">[1] EXPERIENCE</span>
                    <div className="space-y-3 pl-4">
                      {experience.map((exp, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="flex justify-between items-start font-bold">
                            <span>* {exp.role} @ {exp.company}</span>
                            <span className="font-normal text-slate-500">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          {exp.location && <p className="text-slate-400">loc: {exp.location}</p>}
                          <p className="text-slate-600 leading-normal pt-0.5">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                  <div className="space-y-3">
                    <span className="font-bold text-slate-800">[2] PROJECTS</span>
                    <div className="space-y-3 pl-4">
                      {projects.map((proj, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="flex justify-between items-start font-bold">
                            <span>* {proj.title}</span>
                            {proj.link && <span className="font-normal text-blue-600">{proj.link}</span>}
                          </div>
                          {proj.technologies && <p className="text-slate-500 font-semibold italic">stack: {proj.technologies}</p>}
                          <p className="text-slate-600 leading-normal pt-0.5">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div className="space-y-3">
                    <span className="font-bold text-slate-800">[3] EDUCATION</span>
                    <div className="space-y-2 pl-4">
                      {education.map((edu, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="flex justify-between items-start font-bold">
                            <span>* {edu.institution}</span>
                            <span className="font-normal text-slate-500">{edu.startDate} - {edu.endDate}</span>
                          </div>
                          <p className="text-slate-600">{edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `• gpa: ${edu.gpa}`}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-800">[4] SKILLS</span>
                  <div className="pl-4 space-y-1 text-slate-600">
                    {skills.languages && <p><span className="font-bold text-slate-700">languages    ::</span> {skills.languages}</p>}
                    {skills.frameworks && <p><span className="font-bold text-slate-700">frameworks    ::</span> {skills.frameworks}</p>}
                    {skills.tools && <p><span className="font-bold text-slate-700">devtools      ::</span> {skills.tools}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
