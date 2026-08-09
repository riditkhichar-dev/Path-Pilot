import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  Info, 
  Award, 
  Users, 
  Map, 
  CheckCircle2,
  BellRing
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  type: 'info' | 'success' | 'warning';
  category: 'quiz' | 'roadmap' | 'cert' | 'forum';
  time: string;
  read: boolean;
}

const STATIC_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Aptitude Certificate Unlocked!',
    desc: 'Congratulations! Your score in the Tech Aptitude Test has unlocked your Pathfinder Certificate.',
    type: 'success',
    category: 'cert',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Custom AI Roadmap Synthesized',
    desc: 'Your custom study plan for Next.js SaaS Developer has been generated and enrolled in your path library.',
    type: 'success',
    category: 'roadmap',
    time: 'Yesterday',
    read: false
  },
  {
    id: 'notif-3',
    title: 'New Reply on Community Post',
    desc: 'Sarah Chen commented on your post: "How deep should my Math background be for ML roles?"',
    type: 'info',
    category: 'forum',
    time: '2 days ago',
    read: true
  }
];

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(STATIC_NOTIFICATIONS);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'cert': return <Award className="w-4 h-4 text-amber-400" />;
      case 'roadmap': return <Map className="w-4 h-4 text-purple-400" />;
      case 'forum': return <Users className="w-4 h-4 text-blue-400" />;
      default: return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left">
      {/* Top Header controls bar */}
      <div className="flex justify-between items-center bg-[#0B0F19]/60 p-5 rounded-2xl border border-slate-850 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-sora text-white flex items-center gap-2">
            <BellRing className="w-5 h-5 text-blue-500" />
            Alerts & Notifications
          </h2>
          <p className="text-xs text-slate-400">
            Keep track of roadmap events, community comments, and career recommendations.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <button 
              onClick={handleMarkAllRead}
              className="text-[10px] font-bold text-blue-400 hover:text-blue-350 bg-blue-500/5 px-2.5 py-1.5 rounded-lg border border-blue-500/10 transition-colors"
            >
              Mark all read
            </button>
            <button 
              onClick={handleClearAll}
              className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-950/20 transition-colors"
              title="Clear All Notifications"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Notifications lists */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-2xl border flex items-start gap-4 transition-all ${
                notif.read 
                  ? 'bg-[#090A12] border-slate-850 opacity-70' 
                  : 'bg-gradient-to-r from-slate-900 to-[#0B0F19] border-blue-550/30 shadow-md shadow-blue-500/5'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-[#07080F] border border-slate-850 flex items-center justify-center shrink-0">
                {getIcon(notif.category)}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className={`text-xs font-bold text-white leading-tight ${notif.read ? 'font-medium text-slate-300' : ''}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[9px] text-slate-500 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">{notif.desc}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-center">
                {!notif.read && (
                  <button 
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="p-1.5 text-slate-500 hover:text-blue-400 rounded-lg hover:bg-slate-800/40 transition-colors"
                    title="Mark as Read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
                <button 
                  onClick={() => handleClearNotif(notif.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800/40 transition-colors"
                  title="Delete Alert"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-slate-850 bg-[#090A12] rounded-2xl">
          <span className="text-2xl">🔔</span>
          <h3 className="text-sm font-bold text-white mt-2">All Caught Up!</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You have no new alerts. We will notify you when a certificate unlocks, or when new job match updates occur.
          </p>
        </div>
      )}
    </div>
  );
}
