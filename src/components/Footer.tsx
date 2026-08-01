import React, { useState } from 'react';
import { Twitter, Linkedin, Github, Instagram, CheckCircle2 } from 'lucide-react';
import { PathPilotLogo } from './PathPilotLogo';

interface FooterProps {
  onOpenAssessment: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAssessment, onOpenChat }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-3">
              <PathPilotLogo size="lg" />
            </a>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Discover your future and build your career with AI. PATHPILOT provides students with psychometric career assessments, dynamic learning roadmaps, ATS resume generation, and 24/7 Groq AI guidance.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Join the Student Newsletter
              </p>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your student email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-white px-3.5 py-2.5 rounded-xl flex-1 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shrink-0"
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed! Check your inbox weekly.
                </p>
              )}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-sora text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={onOpenChat} className="hover:text-white transition-colors text-left">
                  AI Career Chatbot
                </button>
              </li>
              <li>
                <button onClick={onOpenAssessment} className="hover:text-white transition-colors text-left">
                  Career Assessment Quiz
                </button>
              </li>
              <li>
                <a href="#demo" className="hover:text-white transition-colors">
                  AI Roadmaps
                </a>
              </li>
              <li>
                <button onClick={onOpenAssessment} className="hover:text-white transition-colors text-left">
                  ATS Resume Builder
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  College Recommendations
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Blog */}
          <div>
            <h4 className="font-sora text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose PATHPILOT</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Career Guidance FAQ</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Student Case Studies</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Student Blog</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-sora text-sm font-bold text-white uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#hero" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Security & Safety</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Social & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © 2026 <strong className="text-white font-sora">PATHPILOT</strong>. All Rights Reserved. Empowering future leaders with AI.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-orange-600 hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
