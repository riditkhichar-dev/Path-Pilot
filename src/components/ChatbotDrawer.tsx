import React, { useState, useRef, useEffect } from 'react';
import { fetchGroqChatResponse, ChatMessage } from '../services/groqApi';
import { Bot, Send, X, Sparkles, RefreshCw, Compass, ArrowRight, User } from 'lucide-react';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "👋 Hi there! I'm **PATHPILOT AI**, your 24/7 Career Navigator powered by Groq's high-speed AI engine.\n\nAsk me anything about **high school stream choices, coding roadmaps, college selection, or resume tips**!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "🎓 What stream should I pick in Class 11 for AI?",
    "🚀 6-Month Roadmap for Full-Stack Development",
    "📄 How to make my student resume ATS friendly?",
    "💡 Top 5 high-demand careers for 2026-2030"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Prepare history for Groq API
      const conversationHistory = [...messages, userMessage].map((msg) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.text
      }));

      const aiReply = await fetchGroqChatResponse(conversationHistory);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'ai',
        text: "Conversation reset! How else can I assist your career journey?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Card */}
      <div className="relative w-full max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full z-10 font-inter">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/25 relative">
              <Bot className="w-6 h-6 text-white" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sora font-bold text-white text-base">PATHPILOT AI Assistant</h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Groq 70B
                </span>
              </div>
              <p className="text-xs text-slate-400">Ultra-fast career counseling (15ms latency)</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none font-inter'
                }`}
              >
                {/* Text Formatter helper for bolding & list lines */}
                <div className="space-y-1.5 whitespace-pre-wrap">
                  {msg.text.split('\n').map((line, idx) => {
                    // Simple formatting for bold text **text**
                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return (
                      <p
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: formattedLine }}
                      />
                    );
                  })}
                </div>
                <div
                  className={`text-[10px] mt-2 ${
                    msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-500 text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0 font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-blue-400 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 w-fit animate-pulse">
              <Sparkles className="w-4 h-4 text-orange-400 animate-spin" />
              <span>Groq AI is analyzing your career profile...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 overflow-x-auto whitespace-nowrap">
          <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider px-1">
            Suggested Prompts:
          </p>
          <div className="flex gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white text-xs transition-all shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask PATHPILOT AI about careers, roadmaps, exams..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-blue-600/30 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
