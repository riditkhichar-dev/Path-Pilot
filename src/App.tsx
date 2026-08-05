import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { Features } from './components/Features';
import { InteractiveDemo } from './components/InteractiveDemo';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PlatformPreview } from './components/PlatformPreview';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { DemoVideoModal } from './components/Modals/DemoVideoModal';
import { AssessmentModal } from './components/Modals/AssessmentModal';
import { AuthModal } from './components/Modals/AuthModal';
import { authService } from './services/authService';
import { User, AuthMode } from './types';
import { Bot, Sparkles } from 'lucide-react';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('pathpilot_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isWatchDemoOpen, setIsWatchDemoOpen] = useState(false);
  
  // Auth Modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pathpilot_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pathpilot_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Fetch current user from Supabase on mount (Step 9)
    authService.getSupabaseUser().then((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    const subscription = authService.onAuthStateChange((authUser) => {
      setUser(authUser);
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleOpenAuth = (mode: AuthMode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
  };

  return (
    <div className={`min-h-screen font-inter selection:bg-blue-600 selection:text-white transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sticky Navigation */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <Hero
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
        onOpenWatchDemo={() => setIsWatchDemoOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Trusted By Social Proof */}
      <TrustedBy />

      {/* Features Grid */}
      <Features
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Interactive Sandbox Demo */}
      <InteractiveDemo
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* How It Works Stepper */}
      <HowItWorks
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
      />

      {/* Why Choose PATHPILOT */}
      <WhyChooseUs
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
      />

      {/* SaaS Platform Preview */}
      <PlatformPreview
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Student Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* High Impact Call-to-Action */}
      <CTASection
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Footer */}
      <Footer
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Floating AI Career Assistant Action Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-2xl shadow-blue-600/50 border border-blue-400/40 hover:scale-105 transition-transform duration-300 flex items-center gap-3 group"
        title="Ask PATHPILOT AI Career Advisor"
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-500" />
        </div>
        <span className="font-sora text-xs font-bold hidden sm:inline">Ask AI Counselor</span>
        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
      </button>

      {/* AI Chatbot Drawer (Groq API) */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Demo Video Modal */}
      <DemoVideoModal
        isOpen={isWatchDemoOpen}
        onClose={() => setIsWatchDemoOpen(false)}
        onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
      />

      {/* Career Assessment Quiz Modal */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Authentication Modal (Login / Sign Up / Forgot Password) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
