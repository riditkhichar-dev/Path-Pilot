import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Menu, X, ArrowRight, Sun, Moon, User as UserIcon, LogOut, ShieldCheck, Compass, Settings, ChevronDown, Trash2, LayoutDashboard } from 'lucide-react';
import { PathPilotLogo } from './PathPilotLogo';
import { User, AuthMode } from '../types';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenAssessment: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  user: User | null;
  onOpenAuth: (mode: AuthMode) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onOpenAssessment,
  isDarkMode,
  onToggleDarkMode,
  user,
  onOpenAuth,
  onLogout,
  onDeleteAccount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    ...(user ? [{ name: 'Dashboard', href: '#dashboard' }] : []),
    { name: 'Features', href: '#features' },
    { name: 'Interactive Demo', href: '#demo' },
    { name: 'Explore Careers', href: '#explore' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-305 ${
        isScrolled
          ? 'glass-nav py-3 shadow-xl shadow-slate-950/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group shrink-0">
            <PathPilotLogo size="md" />
          </a>

          {/* Desktop Nav Links (Visible on lg / 1024px+) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-200/80 dark:bg-slate-900/60 border border-slate-300/80 dark:border-slate-800 p-1.5 rounded-full backdrop-blur-md shrink-0 transition-colors">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-2.5 xl:px-4 py-2 text-xs xl:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-slate-800/80 rounded-full transition-all duration-200 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenChat}
              className="px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center gap-1.5 transition-all ml-1 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 shrink-0" />
              <span>Ask AI</span>
            </button>
          </nav>

          {/* Desktop Action CTAs (Visible on lg / 1024px+) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-200/90 dark:bg-slate-900/80 hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 transition-colors shrink-0"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Authenticated User Menu vs Guest Login/Signup */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs shrink-0 select-none">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PP'}
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[110px] truncate">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[110px]">
                      {user.role || 'Student'}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 animate-fadeIn z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>

                    <a
                      href="#dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 transition-colors text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>My Dashboard</span>
                    </a>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAssessment();
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 transition-colors text-left"
                    >
                      <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>My Career Roadmap</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenChat();
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 transition-colors text-left"
                    >
                      <Sparkles className="w-4 h-4 text-orange-500 dark:text-orange-400 shrink-0" />
                      <span>Saved AI Chats</span>
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onDeleteAccount();
                        }}
                        className="w-full px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2.5 transition-colors text-left"
                      >
                        <Trash2 className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Delete Account</span>
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2.5 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 xl:px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center gap-2 rounded-xl hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <UserIcon className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>Login</span>
                </button>

                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 xl:px-5 py-2.5 text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 rounded-xl shadow-lg shadow-blue-600/30 border border-blue-400/30 flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                >
                  <span className="whitespace-nowrap">Get Started Free</span>
                  <ArrowRight className="w-4 h-4 text-orange-400 shrink-0" />
                </button>
              </>
            )}
          </div>

          {/* Mobile & Tablet Controls (Visible on screens < lg) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
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
                className="block px-4 py-3 text-base font-semibold text-slate-200 hover:bg-slate-800/80 hover:text-blue-400 rounded-xl transition-colors whitespace-nowrap"
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
              className="w-full py-3 text-sm font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Ask AI Career Advisor</span>
            </button>

            {user ? (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm shrink-0 select-none">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PP'}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white">{user.name}</span>
                    <span className="text-[10px] text-blue-400">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDeleteAccount();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center justify-center gap-2 mb-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-3 text-sm font-semibold text-slate-200 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <UserIcon className="w-4 h-4 shrink-0" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">Get Started</span>
                  <ArrowRight className="w-4 h-4 text-orange-400 shrink-0" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
