import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Bookmark, 
  ExternalLink, 
  Video, 
  FileText, 
  GraduationCap, 
  Play, 
  Trash2,
  Filter,
  Flame,
  Clock,
  Compass
} from 'lucide-react';
import { fetchGroqChatResponse } from '../../services/groqApi';

interface Resource {
  id: string;
  title: string;
  desc: string;
  type: 'course' | 'article' | 'video';
  category: 'Software & Technology' | 'Design & Creative' | 'Finance & Business' | 'Science & Math';
  platform: string;
  duration?: string;
  url: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

const STATIC_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Python for Data Science & Machine Learning',
    desc: 'Complete bootcamp guide to NumPy, Pandas, Seaborn, Scikit-Learn, and Tensorboard dashboard parameters.',
    type: 'course',
    category: 'Software & Technology',
    platform: 'Coursera Academy',
    duration: '45 hours',
    difficulty: 'Beginner',
    url: 'https://www.coursera.org/specializations/introduction-scripting-in-python'
  },
  {
    id: 'res-2',
    title: 'A Visual Guide to Transformers & Attention Mechanism',
    desc: 'Deep mathematical and structural walkthrough explaining how modern large language models use vector embedding dot products.',
    type: 'article',
    category: 'Science & Math',
    platform: 'Jay Alammar Blog',
    duration: '25 min read',
    url: 'https://jalammar.github.io/illustrated-transformer/'
  },
  {
    id: 'res-3',
    title: 'Modern React Component Architectures & Performance',
    desc: 'In-depth video analysis on reference-equality caching with useMemo, virtual DOM updates, and custom callback optimizations.',
    type: 'video',
    category: 'Software & Technology',
    platform: 'YouTube Tech',
    duration: '18 mins',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/results?search_query=React+Performance+optimization'
  },
  {
    id: 'res-4',
    title: 'Figma Auto-Layout & UI Design Systems',
    desc: 'Master building responsive design templates, wrapping grids, and component libraries inside Figma prototyping boards.',
    type: 'course',
    category: 'Design & Creative',
    platform: 'Figma Education',
    duration: '6 hours',
    difficulty: 'Intermediate',
    url: 'https://www.figma.com/resources/'
  },
  {
    id: 'res-5',
    title: 'Introduction to Quantitative Financial Modeling',
    desc: 'Evaluating portfolio variance weights, options pricing models, and Monte Carlo probability distributions.',
    type: 'article',
    category: 'Finance & Business',
    platform: 'Investopedia Guide',
    duration: '15 min read',
    url: 'https://www.investopedia.com/terms/q/quantitativeanalysis.asp'
  },
  {
    id: 'res-6',
    title: 'Docker Containers & Kubernetes Fleets from Scratch',
    desc: 'Video overview explaining image layers, volume mounting states, network binding protocols, and service ingress setups.',
    type: 'video',
    category: 'Software & Technology',
    platform: 'Traversy Academy',
    duration: '35 mins',
    difficulty: 'Beginner',
    url: 'https://www.youtube.com/results?search_query=Docker+and+Kubernetes+crash+course'
  }
];

interface LearningResourcesProps {
  userId: string;
  isDarkMode: boolean;
}

export function LearningResources({ userId, isDarkMode }: LearningResourcesProps) {
  const [resources, setResources] = useState<Resource[]>(STATIC_RESOURCES);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'course' | 'article' | 'video' | 'bookmarked'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // AI query states
  const [aiQuery, setAiQuery] = useState('');
  const [isFinding, setIsFinding] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<Resource[]>([]);

  // Load bookmarks on mount
  useEffect(() => {
    const key = `pathpilot_bookmarked_resources_${userId || 'guest'}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [userId]);

  const saveBookmarks = (newBookmarks: string[]) => {
    const key = `pathpilot_bookmarked_resources_${userId || 'guest'}`;
    localStorage.setItem(key, JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      saveBookmarks(bookmarks.filter(bId => bId !== id));
    } else {
      saveBookmarks([...bookmarks, id]);
    }
  };

  // Filter resources based on type, category, and search query
  const filteredResources = resources.filter(res => {
    // Type Filter
    if (selectedType === 'bookmarked') {
      if (!bookmarks.includes(res.id)) return false;
    } else if (selectedType !== 'all' && res.type !== selectedType) {
      return false;
    }

    // Category Filter
    if (selectedCategory !== 'All' && res.category !== selectedCategory) {
      return false;
    }

    // Search Query
    const query = searchQuery.toLowerCase();
    return (
      res.title.toLowerCase().includes(query) ||
      res.desc.toLowerCase().includes(query) ||
      res.platform.toLowerCase().includes(query)
    );
  });

  // Call Groq API to search & recommend learning resources
  const handleAISearchResources = async () => {
    if (!aiQuery.trim()) return;
    setIsFinding(true);
    setAiSuggestions([]);

    const userPrompt = `Search and suggest exactly 3 high-quality educational learning resources (tutorials, courses, or guides) for the following topic: "${aiQuery}".
Please format your response strictly as a JSON array (no markdown block outside the JSON, no explanation). The structure of the elements in the JSON array must match this layout:
[
  {
    "id": "ai-res-1",
    "title": "Title of the tutorial/course",
    "desc": "Short description of what the tutorial teaches",
    "type": "course", 
    "category": "Software & Technology",
    "platform": "Platform Name (e.g. YouTube, Coursera, MDN)",
    "duration": "10 hours",
    "url": "https://www.google.com/search?q=tutorial-name",
    "difficulty": "Beginner"
  }
]
Types must be exactly: 'course', 'article', or 'video'. Categories must be exactly one of: 'Software & Technology', 'Design & Creative', 'Finance & Business', 'Science & Math'.`;

    try {
      const responseText = await fetchGroqChatResponse([
        { role: 'system', content: 'You are a resource cataloging API that outputs raw, valid, minified JSON resource arrays.' },
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
      } catch (parseErr) {
        console.warn('AI suggestions parse failed, loading fallbacks...', parseErr);
      }

      if (Array.isArray(parsedList) && parsedList.length > 0) {
        const formatted = parsedList.map((item, idx) => ({
          id: item.id || `ai-res-${Date.now()}-${idx}`,
          title: item.title || aiQuery,
          desc: item.desc || `Recommended resources for learning ${aiQuery}`,
          type: item.type || 'article',
          category: item.category || 'Software & Technology',
          platform: item.platform || 'Web Guides',
          duration: item.duration || 'N/A',
          url: item.url || `https://www.google.com/search?q=${encodeURIComponent(item.title || aiQuery)}`,
          difficulty: item.difficulty || 'Intermediate'
        }));

        setAiSuggestions(formatted);
        
        // Add new items to main resources array if they aren't already present
        setResources(prev => {
          const uniqueNew = formatted.filter(newRes => !prev.some(oldRes => oldRes.title === newRes.title));
          return [...prev, ...uniqueNew];
        });
      } else {
        throw new Error('AI returned invalid resource array format.');
      }
    } catch (e) {
      console.error(e);
      // Fallback local suggestions
      const fallbacks: Resource[] = [
        {
          id: `ai-fb-1-${Date.now()}`,
          title: `Comprehensive Guide to ${aiQuery}`,
          desc: `Full roadmap resources, video links and textbook references covering key parts of ${aiQuery}.`,
          type: 'course',
          category: 'Software & Technology',
          platform: 'Coursera / YouTube',
          duration: '12 hours',
          url: `https://www.google.com/search?q=${encodeURIComponent(aiQuery + ' tutorial')}`,
          difficulty: 'Beginner'
        },
        {
          id: `ai-fb-2-${Date.now()}`,
          title: `Best Practices in ${aiQuery}`,
          desc: `Architectural analysis, common pitfalls, and debugging workflows for development in ${aiQuery}.`,
          type: 'article',
          category: 'Software & Technology',
          platform: 'Medium / Medium Dev',
          duration: '15 min read',
          url: `https://www.google.com/search?q=${encodeURIComponent(aiQuery + ' articles best practices')}`
        }
      ];
      setAiSuggestions(fallbacks);
      setResources(prev => [...prev, ...fallbacks]);
    } finally {
      setIsFinding(false);
    }
  };

  const getIcon = (type: 'course' | 'article' | 'video') => {
    switch (type) {
      case 'course': return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'video': return <Video className="w-4 h-4 text-orange-400" />;
      case 'article': return <FileText className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0B0F19]/60 p-5 rounded-2xl border border-slate-850 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-sora text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Learning Resource Center
          </h2>
          <p className="text-xs text-slate-400">
            Discover curated study guides, save material to your library, and search topics with AI.
          </p>
        </div>

        {/* Directory Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex items-center bg-[#070913] border border-slate-850 rounded-xl px-3 py-1.5 w-full md:w-60">
            <Search className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none w-full border-none p-0 focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#070913] border border-slate-850 rounded-xl px-3 py-1.5 shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer border-none p-0 focus:ring-0"
            >
              <option value="All" className="bg-[#070913]">All Categories</option>
              <option value="Software & Technology" className="bg-[#070913]">Tech & Code</option>
              <option value="Science & Math" className="bg-[#070913]">Science & Math</option>
              <option value="Design & Creative" className="bg-[#070913]">Design & Creative</option>
              <option value="Finance & Business" className="bg-[#070913]">Finance & Biz</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Directory and Filters */}
        <div className="lg:col-span-2 space-y-4 text-left">
          {/* Tabs switchers */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'course', label: 'Courses' },
              { id: 'article', label: 'Articles' },
              { id: 'video', label: 'Videos' },
              { id: 'bookmarked', label: 'My Bookmarks' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedType === tab.id
                    ? 'bg-blue-600/10 text-blue-400 border-blue-500/20'
                    : 'bg-[#090A12] text-slate-500 border-slate-850 hover:text-slate-300'
                }`}
              >
                {tab.label}
                {tab.id === 'bookmarked' && ` (${bookmarks.length})`}
              </button>
            ))}
          </div>

          {/* Directory Resource Grid list */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map(res => {
                const isSaved = bookmarks.includes(res.id);
                return (
                  <div 
                    key={res.id} 
                    className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] hover:border-slate-800 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1 text-[9px] uppercase font-bold text-slate-400 bg-[#07080F] border border-slate-850 px-2 py-0.5 rounded">
                          {getIcon(res.type)}
                          <span className="ml-1">{res.type}</span>
                        </span>

                        <button 
                          onClick={() => toggleBookmark(res.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved 
                              ? 'bg-blue-650/10 border-blue-500/30 text-blue-400' 
                              : 'bg-[#07080F] border-slate-850 text-slate-500 hover:text-slate-200'
                          }`}
                          title={isSaved ? "Remove Bookmark" : "Save Bookmark"}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-500' : ''}`} />
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-white leading-snug">{res.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">{res.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-850/60 flex items-center justify-between text-[10px] text-slate-500">
                      <div className="space-y-0.5">
                        <span className="block font-semibold text-slate-350">{res.platform}</span>
                        {res.duration && <span className="block text-[9px]">{res.duration}</span>}
                      </div>

                      <a 
                        href={res.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-[#07080F] border border-slate-850 hover:border-blue-500 hover:text-white rounded-lg font-bold flex items-center gap-1 transition-all"
                      >
                        <span>Launch</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center border border-slate-850 bg-[#090A12] rounded-2xl">
              <span className="text-2xl">📚</span>
              <h3 className="text-sm font-bold text-white mt-2">No Resources Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No items match your filter criteria. Select another tab, change parameters, or use the AI Resource Finder.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: AI Resource Recommendation Widget */}
        <div className="space-y-4 text-left">
          {/* AI finder card */}
          <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              AI Recommendation Finder
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Input any engineering tool, career path, or concept to instantly generate high-quality learning links.
            </p>

            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="e.g. Next.js Routing, Docker, Linear Algebra"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
              />

              <button 
                onClick={handleAISearchResources}
                disabled={isFinding || !aiQuery.trim()}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-650 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:from-blue-500 transition-all shadow-md shadow-blue-500/10 border border-blue-500/30"
              >
                {isFinding ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Searching online databases...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-3.5 h-3.5" />
                    <span>Generate Tutorials</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI generated suggestions list */}
          {aiSuggestions.length > 0 && (
            <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-4">
              <h5 className="font-bold text-white uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                AI Generated Recommendations
              </h5>
              
              <div className="space-y-3">
                {aiSuggestions.map((s, idx) => {
                  const isSaved = bookmarks.includes(s.id);
                  return (
                    <div key={idx} className="p-3 bg-[#07080F]/65 border border-slate-850 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{s.platform}</span>
                        <button 
                          onClick={() => toggleBookmark(s.id)}
                          className="text-slate-500 hover:text-blue-400"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-500 text-blue-400' : ''}`} />
                        </button>
                      </div>
                      <h6 className="text-xs font-bold text-white leading-tight">{s.title}</h6>
                      <p className="text-[10px] text-slate-400 leading-normal">{s.desc}</p>
                      <a 
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 pt-1"
                      >
                        <span>Launch Study Resource</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick tips panel */}
          <div className="p-5 rounded-2xl border border-slate-850 bg-[#090A12] space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[9px]">Resource Tips</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bookmarked resources can be completed alongside your customized AI roadmaps to maximize career learning output.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
