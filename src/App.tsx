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
import { Bot, Sparkles } from 'lucide-react';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isWatchDemoOpen, setIsWatchDemoOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-inter selection:bg-blue-600 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Hero Section */}
      <Hero
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        onOpenWatchDemo={() => setIsWatchDemoOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Trusted By Social Proof */}
      <TrustedBy />

      {/* Features Grid */}
      <Features
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Interactive Sandbox Demo */}
      <InteractiveDemo
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* How It Works Stepper */}
      <HowItWorks
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* Why Choose PATHPILOT */}
      <WhyChooseUs
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* SaaS Platform Preview */}
      <PlatformPreview
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Student Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* High Impact Call-to-Action */}
      <CTASection
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Footer */}
      <Footer
        onOpenAssessment={() => setIsAssessmentOpen(true)}
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
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* Career Assessment Quiz Modal */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
      />
    </div>
  );
}
