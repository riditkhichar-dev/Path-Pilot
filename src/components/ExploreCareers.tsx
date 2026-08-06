import React, { useState } from 'react';
import { CAREERS, Career } from '../data/careersData';
import {
  Laptop,
  HeartPulse,
  Database,
  Rocket,
  Dna,
  Fish,
  Calculator,
  TrendingUp,
  ShieldCheck,
  LineChart,
  Calendar,
  Newspaper,
  Palette,
  Scissors,
  ChefHat,
  Megaphone,
  Landmark,
  Shield,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  DollarSign,
  GraduationCap,
  Award
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Laptop,
  HeartPulse,
  Database,
  Rocket,
  Dna,
  Fish,
  Calculator,
  TrendingUp,
  ShieldCheck,
  LineChart,
  Calendar,
  Newspaper,
  Palette,
  Scissors,
  ChefHat,
  Megaphone,
  Landmark,
  Shield
};

export const ExploreCareers: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Science' | 'Commerce' | 'Arts' | 'Vocational' | 'Government'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Science', 'Commerce', 'Arts', 'Vocational', 'Government'] as const;

  const filteredCareers = CAREERS.filter((career) => {
    const matchesCategory = activeCategory === 'All' || career.category === activeCategory;
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.details.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="explore" className="pt-32 pb-24 min-h-[75vh] bg-slate-50 dark:bg-[#0F172A] transition-colors relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 dark:bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" /> Career Database
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sora leading-tight">
            Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-400">Career Paths</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Find detailed careers that match your skills and interests. Click "Learn More" to view entrance exams, average salary, and education paths.
          </p>
        </div>

        {/* Category Filter & Search Bar */}
        <div className="space-y-6 mb-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedId(null); // collapse on filter
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCategory === (cat === 'All' ? 'All' : cat)
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {cat === 'All' ? 'All Careers' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search careers, skills, or paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-purple-500 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl focus:outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Careers Grid */}
        {filteredCareers.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              No career paths match your current search query. Try adjusting your keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCareers.map((career) => {
              const IconComponent = ICON_MAP[career.iconName] || Laptop;
              const isExpanded = expandedId === career.id;

              return (
                <div
                  key={career.id}
                  className={`glass-card p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative group ${
                    isExpanded
                      ? 'border-purple-500/60 shadow-xl shadow-purple-500/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-purple-500/30 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Icon Container */}
                    <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit mb-4 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Title & Tag */}
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-sora">
                        {career.title}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                        {career.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                      {career.description}
                    </p>

                    {/* Expanded details list */}
                    {isExpanded && (
                      <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800/80 space-y-4 text-xs text-left animate-fadeIn">
                        {/* Salary */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Average Salary</span>
                          </div>
                          <div className="text-slate-900 dark:text-white font-extrabold text-sm ml-5">
                            {career.details.salary}
                          </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
                            <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                            <span>Educational Pathway</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 ml-5 leading-relaxed">
                            {career.details.education}
                          </p>
                        </div>

                        {/* Exams */}
                        {career.details.exams.length > 0 && career.details.exams[0] !== 'Direct selection / Internships portfolio' && career.details.exams[0] !== 'Direct admissions' && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
                              <Award className="w-3.5 h-3.5 text-orange-500" />
                              <span>Top Entrance Exams</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 ml-5">
                              {career.details.exams.map((exam, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/30 text-orange-700 dark:text-orange-300 rounded font-bold text-[10px]"
                                >
                                  {exam}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skills */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                            <span>Key Skills Required</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 ml-5">
                            {career.details.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                  className="px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 rounded font-bold text-[10px]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Prospects */}
                        <div className="space-y-1">
                          <div className="text-slate-500 dark:text-slate-400 font-semibold">
                            Career Prospects & Growth
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 ml-5 leading-relaxed">
                            {career.details.prospects}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expand button */}
                  <button
                    onClick={() => toggleExpand(career.id)}
                    className={`w-full mt-6 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                      isExpanded
                        ? 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
