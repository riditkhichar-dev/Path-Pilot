import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, Sun, Moon, User } from 'lucide-react';
import { PathPilotLogo } from './PathPilotLogo';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenAssessment: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onOpenAssessment,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'Interactive Demo', href: '#demo' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 shadow-xl shadow-slate-950/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <PathPilotLogo size="md" />
          </a>

          {/* Desktop Nav Links (Visible on lg / 1024px+) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-xs xl:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenChat}
              className="px-3.5 py-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center gap-1.5 transition-all ml-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Ask AI
            </button>
          </nav>

          {/* Desktop Action CTAs (Visible on lg / 1024px+) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            <button
              onClick={onOpenAssessment}
              className="px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-2 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              Login
            </button>

            <button
              onClick={onOpenAssessment}
              className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 rounded-xl shadow-lg shadow-blue-600/30 border border-blue-400/30 flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>
          </div>

          {/* Mobile & Tablet Controls (Visible on screens < lg) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700"
              aria-label="Toggle Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700 flex items-center justify-center"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-blue-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (< lg viewports) */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-t border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-3 animate-fadeIn shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-semibold text-slate-200 hover:bg-slate-800/80 hover:text-blue-400 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-3 text-sm font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              Ask AI Career Advisor
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssessment();
                }}
                className="py-3 text-sm font-semibold text-slate-200 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
              >
                <User className="w-4 h-4" />
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssessment();
                }}
                className="py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5"
              >
                Get Started
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
