import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { Features } from './components/Features';
import { InteractiveDemo } from './components/InteractiveDemo';
import { ExploreCareers } from './components/ExploreCareers';
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
import { DeleteAccountModal } from './components/Modals/DeleteAccountModal';
import { OnboardingModal } from './components/Modals/OnboardingModal';
import { Dashboard } from './components/Dashboard/Dashboard';
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
  const [currentPage, setCurrentPage] = useState<'home' | 'explore' | 'dashboard'>(() => {
    return window.location.hash === '#explore' 
      ? 'explore' 
      : window.location.hash === '#dashboard' 
      ? 'dashboard' 
      : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#explore') {
        setCurrentPage('explore');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#dashboard') {
        setCurrentPage('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        if (hash && hash !== '#') {
          setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Auth Modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  // Delete Account Modal state
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  // Onboarding Modal state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

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
    // Fetch current user from Supabase on mount
    authService.getSupabaseUser().then((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if onboarding completed
        const completed = localStorage.getItem(`pathpilot_onboarding_completed_${currentUser.id}`);
        if (!completed) {
          setIsOnboardingOpen(true);
        }
      }
    });

    const subscription = authService.onAuthStateChange((authUser) => {
      setUser(authUser);
      if (authUser) {
        const completed = localStorage.getItem(`pathpilot_onboarding_completed_${authUser.id}`);
        if (!completed) {
          setIsOnboardingOpen(true);
        }
      }
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
    setCurrentPage('home');
    window.location.hash = '#';
  };

  const handleDeleteAccount = async () => {
    setIsDeleteAccountOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    const completed = localStorage.getItem(`pathpilot_onboarding_completed_${authenticatedUser.id}`);
    if (!completed) {
      setIsOnboardingOpen(true);
    } else {
      setCurrentPage('dashboard');
      window.location.hash = '#dashboard';
    }
  };

  const handleOnboardingComplete = () => {
    if (user) {
      localStorage.setItem(`pathpilot_onboarding_completed_${user.id}`, 'true');
    }
    setIsOnboardingOpen(false);
    setCurrentPage('dashboard');
    window.location.hash = '#dashboard';
  };

  return (
    <div className={`min-h-screen font-inter selection:bg-blue-600 selection:text-white transition-colors duration-305 ${
      isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sticky Navigation */}
      {currentPage !== 'dashboard' && (
        <Navbar
          onOpenChat={() => setIsChatOpen(true)}
          onOpenAssessment={() => setIsAssessmentOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          user={user}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
          onDeleteAccount={handleDeleteAccount}
        />
      )}

      {currentPage === 'dashboard' ? (
        <Dashboard
          user={user}
          onUpdateUser={(updatedUser) => setUser(updatedUser)}
          isDarkMode={isDarkMode}
          onToggleTheme={(dark) => setIsDarkMode(dark)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenAssessment={() => setIsAssessmentOpen(true)}
          onNavigateHome={() => {
            setCurrentPage('home');
            window.location.hash = '#';
          }}
          onLogout={handleLogout}
          onExploreCareers={() => {
            setCurrentPage('explore');
            window.location.hash = '#explore';
          }}
        />
      ) : currentPage === 'explore' ? (
        <ExploreCareers />
      ) : (
        <>
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
        </>
      )}

      {/* Footer */}
      {currentPage !== 'dashboard' && (
        <Footer
          onOpenAssessment={() => (user ? setIsAssessmentOpen(true) : handleOpenAuth('signup'))}
          onOpenChat={() => setIsChatOpen(true)}
        />
      )}

      {/* Floating AI Career Assistant Action Button */}
      {currentPage !== 'dashboard' && (
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
      )}

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

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
        onSuccess={() => setUser(null)}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        user={user}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}
