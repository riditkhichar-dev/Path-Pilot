import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  MapPin, 
  Award, 
  ExternalLink,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { fetchGroqChatResponse } from '../../services/groqApi';

interface College {
  id: string;
  name: string;
  location: string;
  rank: string;
  acceptanceRate: string;
  avgPackage: string;
  topPrograms: string[];
  stream: 'Engineering' | 'Management' | 'Design' | 'Medical';
  website: string;
}

const STATIC_COLLEGES: College[] = [
  {
    id: 'col-1',
    name: 'Tech Institute of Technology',
    location: 'Boston, MA',
    rank: '#4 National',
    acceptanceRate: '7%',
    avgPackage: '$125,000',
    topPrograms: ['Computer Science', 'Robotics', 'Data Analytics'],
    stream: 'Engineering',
    website: 'https://www.google.com/search?q=MIT'
  },
  {
    id: 'col-2',
    name: 'Global Business School',
    location: 'Stanford, CA',
    rank: '#2 National',
    acceptanceRate: '6%',
    avgPackage: '$140,000',
    topPrograms: ['MBA', 'Finance Strategy', 'Entrepreneurship'],
    stream: 'Management',
    website: 'https://www.google.com/search?q=Stanford+Business'
  },
  {
    id: 'col-3',
    name: 'Metropolitan Art Academy',
    location: 'New York, NY',
    rank: '#1 Design',
    acceptanceRate: '15%',
    avgPackage: '$85,000',
    topPrograms: ['UI/UX Design', 'Digital Media', 'Visual Arts'],
    stream: 'Design',
    website: 'https://www.google.com/search?q=Parsons+Design'
  },
  {
    id: 'col-4',
    name: 'National Medical College',
    location: 'Baltimore, MD',
    rank: '#3 Medical',
    acceptanceRate: '5%',
    avgPackage: '$210,000',
    topPrograms: ['Neuroscience', 'Clinical Surgery', 'Bio-Medicine'],
    stream: 'Medical',
    website: 'https://www.google.com/search?q=Johns+Hopkins'
  }
];

export function CollegeRecommendations() {
  const [colleges, setColleges] = useState<College[]>(STATIC_COLLEGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<'All' | 'Engineering' | 'Management' | 'Design' | 'Medical'>('All');
  
  // AI recommendations state
  const [studentGrades, setStudentGrades] = useState('');
  const [targetGoal, setTargetGoal] = useState('');
  const [isFinding, setIsFinding] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<College[]>([]);

  const handleAICollegeSearch = async () => {
    if (!studentGrades.trim() || !targetGoal.trim()) return;
    setIsFinding(true);
    setAiSuggestions([]);

    const userPrompt = `Recommend exactly 2 universities or colleges for a student with these parameters:
Current Grades/GPA: ${studentGrades}
Target Career Goal: ${targetGoal}

Please structure your response strictly as a JSON array (no conversational markers, no markdown blocks outside the JSON). The structure of the elements in the JSON array must match this layout:
[
  {
    "id": "ai-col-1",
    "name": "University Name",
    "location": "City, Country",
    "rank": "Rank description",
    "acceptanceRate": "Acceptance Rate e.g. 10%",
    "avgPackage": "$90,000",
    "topPrograms": ["Program A", "Program B"],
    "stream": "Engineering",
    "website": "https://www.google.com/search?q=University+Name"
  }
]
Streams must be exactly one of: 'Engineering', 'Management', 'Design', 'Medical'.`;

    try {
      const responseText = await fetchGroqChatResponse([
        { role: 'system', content: 'You are an educational directory API that outputs raw, valid, minified JSON college arrays.' },
        { role: 'user', content: userPrompt }
      ]);

      let parsedList: any[] = [];
      try {
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          parsedList = JSON.parse(jsonMatch[0]);
        } else {
          parsedList = JSON.parse(responseText);
        }
      } catch (e) {
        console.warn('Failed to parse AI colleges recommendations:', e);
      }

      if (Array.isArray(parsedList) && parsedList.length > 0) {
        const formatted = parsedList.map((item, idx) => ({
          id: item.id || `ai-col-${Date.now()}-${idx}`,
          name: item.name || 'Recommended College',
          location: item.location || 'USA',
          rank: item.rank || 'Top Tier',
          acceptanceRate: item.acceptanceRate || 'N/A',
          avgPackage: item.avgPackage || 'N/A',
          topPrograms: item.topPrograms || [],
          stream: item.stream || 'Engineering',
          website: item.website || `https://www.google.com/search?q=${encodeURIComponent(item.name || 'College')}`
        }));

        setAiSuggestions(formatted);
        setColleges(prev => {
          const uniqueNew = formatted.filter(newCol => !prev.some(oldCol => oldCol.name === newCol.name));
          return [...prev, ...uniqueNew];
        });
      } else {
        throw new Error('AI returned invalid college array format.');
      }
    } catch (e) {
      console.error(e);
      // Fallback local suggestions
      const fallbacks: College[] = [
        {
          id: `ai-fb-col-1-${Date.now()}`,
          name: 'Advanced Science Academy',
          location: 'Austin, TX',
          rank: '#12 National',
          acceptanceRate: '12%',
          avgPackage: '$110,000',
          topPrograms: ['Computer Science', 'Cybersecurity'],
          stream: 'Engineering',
          website: 'https://www.google.com/search?q=UT+Austin'
        }
      ];
      setAiSuggestions(fallbacks);
      setColleges(prev => [...prev, ...fallbacks]);
    } finally {
      setIsFinding(false);
    }
  };

  const filteredColleges = colleges.filter(col => {
    if (selectedStream !== 'All' && col.stream !== selectedStream) return false;
    const query = searchQuery.toLowerCase();
    return (
      col.name.toLowerCase().includes(query) ||
      col.location.toLowerCase().includes(query) ||
      col.topPrograms.some(p => p.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header controls bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0B0F19]/60 p-5 rounded-2xl border border-slate-850 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-sora text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-500" />
            University & College Insights
          </h2>
          <p className="text-xs text-slate-400">
            Explore world-class academic institutions, compare placement records, and fetch AI admissions recommendations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex items-center bg-[#070913] border border-slate-850 rounded-xl px-3 py-1.5 w-full md:w-60">
            <Search className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search colleges or courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none w-full border-none p-0 focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#070913] border border-slate-850 rounded-xl px-3 py-1.5 shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Stream:</span>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer border-none p-0 focus:ring-0"
            >
              <option value="All" className="bg-[#070913]">All Streams</option>
              <option value="Engineering" className="bg-[#070913]">Engineering</option>
              <option value="Management" className="bg-[#070913]">Management</option>
              <option value="Design" className="bg-[#070913]">Design & Arts</option>
              <option value="Medical" className="bg-[#070913]">Medical Sciences</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Directory Cards Grid */}
        <div className="lg:col-span-2 space-y-4 text-left">
          {filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredColleges.map(col => (
                <div 
                  key={col.id} 
                  className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] hover:border-slate-800 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase font-bold text-blue-400 bg-blue-500/5 border border-blue-500/10 px-2.5 py-0.5 rounded-md">
                        {col.stream}
                      </span>
                      <span className="text-[9px] font-bold text-amber-500 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {col.rank}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">{col.name}</h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{col.location}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#07080F]/55 rounded-xl border border-slate-850 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Acceptance Rate:</span>
                      <span className="text-white font-semibold">{col.acceptanceRate}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Avg Placement:</span>
                      <span className="text-emerald-450 font-semibold">{col.avgPackage}</span>
                    </div>
                    
                    {col.topPrograms && (
                      <div className="pt-1.5 border-t border-slate-850/60 space-y-1">
                        <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Top Programs</span>
                        <div className="flex flex-wrap gap-1">
                          {col.topPrograms.map(p => (
                            <span key={p} className="px-2 py-0.2 text-[8px] bg-slate-900 border border-slate-850 text-slate-300 rounded font-medium">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <a 
                    href={col.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#07080F] hover:bg-slate-800 border border-slate-850 text-xs font-bold text-slate-300 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Visit College portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center border border-slate-850 bg-[#090A12] rounded-2xl">
              <span className="text-2xl">🎓</span>
              <h3 className="text-sm font-bold text-white mt-2">No Matching Colleges</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for another stream or use the AI Recommendations Finder to target private institutions.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: AI Finder Widget */}
        <div className="space-y-4 text-left">
          <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              AI Admission Advisor
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesize custom college options matching your academic metrics and career aspirations.
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-bold text-slate-400">Current Grades / GPA</label>
                <input 
                  type="text" 
                  placeholder="e.g. GPA 3.8, 92% in CBSE Class 12"
                  value={studentGrades}
                  onChange={(e) => setStudentGrades(e.target.value)}
                  className="w-full px-4 py-2 bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white text-xs focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase font-bold text-slate-400">Target Career Goal</label>
                <input 
                  type="text" 
                  placeholder="e.g. Robotics Engineer, Corporate Lawyer"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className="w-full px-4 py-2 bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white text-xs focus:border-blue-500"
                />
              </div>

              <button 
                onClick={handleAICollegeSearch}
                disabled={isFinding || !studentGrades.trim() || !targetGoal.trim()}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-650 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:from-blue-500 transition-all shadow-md shadow-blue-500/10 border border-blue-500/30"
              >
                {isFinding ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing admissions data...</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Generate College List</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI generated suggestions list */}
          {aiSuggestions.length > 0 && (
            <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-4 animate-fadeIn">
              <h5 className="font-bold text-white uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-550" />
                AI Curated Matches
              </h5>
              
              <div className="space-y-3">
                {aiSuggestions.map((s, idx) => (
                  <div key={idx} className="p-3 bg-[#07080F]/65 border border-slate-850 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] font-bold text-blue-400 bg-blue-500/5 px-2 py-0.2 rounded border border-blue-500/10">{s.stream}</span>
                      <span className="text-[9px] font-bold text-amber-500">{s.rank}</span>
                    </div>
                    <h6 className="text-xs font-bold text-white leading-tight">{s.name}</h6>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{s.location}</span>
                    </div>
                    <div className="text-[9px] text-slate-500">Acceptance Rate: {s.acceptanceRate} • Avg Package: {s.avgPackage}</div>
                    <a 
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 pt-1"
                    >
                      <span>Explore Admission Criteria</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
