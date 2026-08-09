import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  Clipboard,
  FileText,
  Bookmark
} from 'lucide-react';
import { fetchGroqChatResponse } from '../../services/groqApi';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'Onsite' | 'Hybrid';
  category: 'Software' | 'Design' | 'Marketing' | 'Finance';
  stipend: string;
  requirements: string;
  url: string;
}

const STATIC_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Junior Machine Learning Engineer Intern',
    company: 'NeuroScale Systems',
    location: 'Remote (US/Canada)',
    type: 'Remote',
    category: 'Software',
    stipend: '$3,500/month',
    requirements: 'Experience training PyTorch model architectures, basic statistics, and data cleaning scripts.',
    url: 'https://www.google.com/search?q=Junior+Machine+Learning+Engineer+Intern+jobs'
  },
  {
    id: 'job-2',
    title: 'UI/UX Product Design Intern',
    company: 'PixelDraft Studios',
    location: 'San Francisco, CA',
    type: 'Hybrid',
    category: 'Design',
    stipend: '$3,000/month',
    requirements: 'Strong Figma prototyping portfolio, wireframing workflows, and basic user interview design.',
    url: 'https://www.google.com/search?q=UI/UX+Product+Design+Intern+jobs'
  },
  {
    id: 'job-3',
    title: 'Growth Marketing Associate',
    company: 'AlphaVenture Media',
    location: 'New York, NY',
    type: 'Onsite',
    category: 'Marketing',
    stipend: '$2,800/month',
    requirements: 'Excellent storytelling copy, basic Google analytics tracking, and social content creation.',
    url: 'https://www.google.com/search?q=Growth+Marketing+Associate+jobs'
  },
  {
    id: 'job-4',
    title: 'Quantitative Research Intern',
    company: 'Apex Capital Management',
    location: 'Chicago, IL',
    type: 'Onsite',
    category: 'Finance',
    stipend: '$5,000/month',
    requirements: 'Mathematics background, Pandas processing scripts, and experience with regression models.',
    url: 'https://www.google.com/search?q=Quantitative+Research+Intern+jobs'
  }
];

export function InternshipJobs() {
  const [jobs, setJobs] = useState<Job[]>(STATIC_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Software' | 'Design' | 'Marketing' | 'Finance'>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(STATIC_JOBS[0]);
  
  // AI cover letter generator states
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateCoverLetter = async () => {
    if (!selectedJob) return;
    setIsGenerating(true);
    setCoverLetter('');
    setCopied(false);

    const userPrompt = `Draft a tailored, professional student cover letter applying for this internship:
Position: ${selectedJob.title}
Company: ${selectedJob.company}
Job Requirements: ${selectedJob.requirements}

Keep the style highly professional, action-oriented, and under 300 words. Return only the text of the cover letter with no conversational introduction or markdown delimiters.`;

    try {
      const letter = await fetchGroqChatResponse([
        { role: 'system', content: 'You are an advanced career writer that drafts high-impact cover letters.' },
        { role: 'user', content: userPrompt }
      ]);
      setCoverLetter(letter);
    } catch (e) {
      console.error(e);
      // Fallback
      setCoverLetter(`Dear Hiring Manager at ${selectedJob.company},

I am writing to express my strong interest in the ${selectedJob.title} opening. 

Given the requirements of ${selectedJob.requirements}, I believe my background in implementing technical algorithms, building user-focused layouts, and conducting structured data processing makes me an excellent candidate. I am eager to contribute to your team's objectives.

Thank you for your time and consideration.

Sincerely,
Student Explorer`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredJobs = jobs.filter(job => {
    if (selectedCategory !== 'All' && job.category !== selectedCategory) return false;
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.requirements.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header controls bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0B0F19]/60 p-5 rounded-2xl border border-slate-850 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-sora text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            Internships & Jobs
          </h2>
          <p className="text-xs text-slate-400">
            Search verified internship openings, apply to listings, and draft customized cover letters using AI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex items-center bg-[#070913] border border-slate-850 rounded-xl px-3 py-1.5 w-full md:w-60">
            <Search className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search companies or requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none w-full border-none p-0 focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#070913] border border-slate-850 rounded-xl px-3 py-1.5 shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Sector:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer border-none p-0 focus:ring-0"
            >
              <option value="All" className="bg-[#070913]">All Sectors</option>
              <option value="Software" className="bg-[#070913]">Engineering & Software</option>
              <option value="Design" className="bg-[#070913]">Design & Creative</option>
              <option value="Marketing" className="bg-[#070913]">Product & Marketing</option>
              <option value="Finance" className="bg-[#070913]">Finance & Auditing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Directory Opportunities List */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map(job => {
              const isSelected = selectedJob?.id === job.id;
              return (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                    isSelected 
                      ? 'border-blue-500 ring-2 ring-blue-500/10 bg-blue-600/5 shadow-md shadow-blue-500/5' 
                      : 'border-slate-850 bg-[#090A12] hover:border-slate-800'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase font-bold text-slate-400 bg-[#07080F] border border-slate-850 px-2 py-0.5 rounded">
                        {job.type}
                      </span>
                      <span className="text-[10px] text-indigo-400 font-semibold">{job.stipend}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">{job.title}</h3>
                    <p className="text-xs text-slate-400 font-bold">{job.company}</p>

                    <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed border-t border-slate-850/60 pt-3">
                    {job.requirements}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: AI Cover Letter Generator */}
        <div className="space-y-4 text-left">
          {selectedJob ? (
            <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-4">
              <div className="pb-2 border-b border-slate-800 flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  AI Cover Letter drafts
                </h4>
                <a 
                  href={selectedJob.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-400 font-bold flex items-center gap-0.5 hover:text-blue-300"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-350">Generate a custom application letter for: <strong className="text-white">{selectedJob.title}</strong> at <strong className="text-white">{selectedJob.company}</strong>.</p>
                
                <button 
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                  className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-650 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:from-blue-500 transition-all shadow-md"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Drafting letter with AI...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>Draft Cover Letter</span>
                    </>
                  )}
                </button>
              </div>

              {coverLetter && (
                <div className="space-y-3 pt-2 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">AI Drafted Letter</span>
                    <button 
                      onClick={handleCopyToClipboard}
                      className="text-[10px] font-bold text-blue-400 hover:text-blue-350 flex items-center gap-1"
                    >
                      <Clipboard className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  
                  <textarea 
                    rows={8}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full p-4 text-xs bg-[#07080F] border border-slate-850 rounded-2xl outline-none text-slate-300 resize-none leading-relaxed focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="p-5 text-center border border-slate-850 bg-[#090A12] rounded-2xl text-xs text-slate-500">
              Select any listing on the left to activate the AI application assistant.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
