import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Database, 
  Sliders, 
  FileText, 
  Settings, 
  Search, 
  UserPlus, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  Server, 
  Cpu, 
  Activity, 
  Sparkles, 
  AlertTriangle,
  Play,
  Save
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  status: 'active' | 'deactivated';
  joinedDate: string;
}

interface SystemLog {
  timestamp: string;
  event: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export function AdminPanel() {
  const [subTab, setSubTab] = useState<'analytics' | 'users' | 'quiz' | 'ai' | 'logs' | 'settings'>('analytics');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Users state
  const [usersList, setUsersList] = useState<AdminUser[]>([
    { id: 'usr-101', name: 'Alex Rivera', email: 'alex.rivera@example.com', role: 'student', status: 'active', joinedDate: 'Aug 02, 2026' },
    { id: 'usr-102', name: 'Sarah Chen', email: 'sarah.chen@tech.org', role: 'admin', status: 'active', joinedDate: 'Jul 28, 2026' },
    { id: 'usr-103', name: 'Tanya Mehta', email: 'tanya.mehta@bizschool.edu', role: 'student', status: 'active', joinedDate: 'Aug 05, 2026' },
    { id: 'usr-104', name: 'Marcus Aurelius', email: 'marcus@philosophy.co', role: 'student', status: 'deactivated', joinedDate: 'Jun 15, 2026' }
  ]);

  // AI settings state
  const [aiConfig, setAiConfig] = useState({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    maxTokens: 600,
    systemPrompt: 'You are PATHPILOT AI, a world-class AI Career Advisor & Mentor designed specifically for students...'
  });

  // Logs state
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    { timestamp: '17:34:10', event: 'Groq LLM response generated for /roadmaps query', type: 'success' },
    { timestamp: '17:33:02', event: 'Certificate PP-GRAD-USR101 verified and unlocked', type: 'success' },
    { timestamp: '17:31:55', event: 'User Alex Rivera authenticated successfully via Google OAuth', type: 'info' },
    { timestamp: '17:28:44', event: 'Database automated query log replication completed', type: 'info' }
  ]);

  // Global settings state
  const [globalSettings, setGlobalSettings] = useState({
    maintenanceMode: false,
    publicRegistrations: true,
    weeklyDigestEmails: true,
    dbCacheLife: 3600
  });

  const [diagnosticStatus, setDiagnosticStatus] = useState<string | null>(null);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New mock log triggers
  const addLog = (event: string, type: 'info' | 'warning' | 'success' | 'error') => {
    const time = new Date().toTimeString().split(' ')[0];
    setSystemLogs(prev => [{ timestamp: time, event, type }, ...prev]);
  };

  const handleToggleRole = (userId: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextRole = u.role === 'admin' ? 'student' : 'admin';
        addLog(`User role updated for ${u.name} to ${nextRole.toUpperCase()}`, 'info');
        return { ...u, role: nextRole };
      }
      return u;
    }));
  };

  const handleToggleStatus = (userId: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'deactivated' : 'active';
        addLog(`User status for ${u.name} set to ${nextStatus.toUpperCase()}`, nextStatus === 'active' ? 'info' : 'warning');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleSaveAIConfig = (e: React.FormEvent) => {
    e.preventDefault();
    addLog(`AI Configuration saved (Model: ${aiConfig.model})`, 'success');
    showNotification('AI Configuration saved successfully!');
  };

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const runDiagnostics = () => {
    setIsDiagnosticRunning(true);
    setDiagnosticStatus('Querying server status...');
    setTimeout(() => {
      setDiagnosticStatus('Testing database replicas query latencies...');
      setTimeout(() => {
        setDiagnosticStatus('System OK • API latency: 124ms • DB replicas online');
        setIsDiagnosticRunning(false);
        addLog('System self-diagnostics completed successfully', 'success');
      }, 1000);
    }, 1000);
  };

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header controls bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0B0F19]/60 p-5 rounded-2xl border border-slate-850 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-sora text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            Admin Operations Panel
          </h2>
          <p className="text-xs text-slate-400">
            Control platform databases, configure model parameters, review logs, and manage user permissions.
          </p>
        </div>

        {successMessage && (
          <div className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-bold animate-fadeIn">
            ✓ {successMessage}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar Sub-tabs */}
        <div className="bg-[#090A12] border border-slate-850 p-3 rounded-2xl flex flex-col space-y-1 text-left">
          {[
            { id: 'analytics', label: 'Operations Analytics', icon: <Activity className="w-4 h-4" /> },
            { id: 'users', label: 'User Directory', icon: <Users className="w-4 h-4" /> },
            { id: 'ai', label: 'AI Prompt Optimizer', icon: <Sliders className="w-4 h-4" /> },
            { id: 'logs', label: 'System Event Stream', icon: <Database className="w-4 h-4" /> },
            { id: 'settings', label: 'Platform Controls', icon: <Settings className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                subTab === tab.id
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Panel Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Subtab 1: Analytics Overview */}
          {subTab === 'analytics' && (
            <div className="space-y-6 text-left animate-fadeIn">
              {/* Stats Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-[#090A12] border border-slate-850 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Total Registrations</span>
                    <span className="text-xl font-extrabold text-white">{usersList.length}</span>
                  </div>
                </div>

                <div className="p-5 bg-[#090A12] border border-slate-850 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">Server Latency</span>
                    <span className="text-xl font-extrabold text-blue-400">124 ms</span>
                  </div>
                </div>

                <div className="p-5 bg-[#090A12] border border-slate-850 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-450">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-wider">LLM Hitrate</span>
                    <span className="text-xl font-extrabold text-emerald-400">100%</span>
                  </div>
                </div>
              </div>

              {/* Health checks panel */}
              <div className="p-6 bg-[#090A12] border border-slate-850 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-850">
                  System Diagnostics & Health
                </h3>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-350">Platform diagnostic verification test</span>
                    <p className="text-[10px] text-slate-500">Checks remote server links, auth servers, and database transactions.</p>
                  </div>

                  <button
                    onClick={runDiagnostics}
                    disabled={isDiagnosticRunning}
                    className="px-4 py-2 bg-[#07080F] border border-slate-800 hover:border-slate-650 hover:bg-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all text-slate-300"
                  >
                    <Activity className={`w-3.5 h-3.5 ${isDiagnosticRunning ? 'animate-pulse text-red-500' : ''}`} />
                    <span>{isDiagnosticRunning ? 'Diagnosing...' : 'Run Diagnostics'}</span>
                  </button>
                </div>

                {diagnosticStatus && (
                  <div className="p-4 bg-[#07080F] border border-slate-850 rounded-xl text-xs text-slate-400 flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{diagnosticStatus}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subtab 2: User Directory */}
          {subTab === 'users' && (
            <div className="space-y-4 text-left animate-fadeIn">
              <div className="relative flex items-center bg-[#090A12] border border-slate-850 rounded-2xl px-3 py-2 w-full max-w-sm">
                <Search className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search user database..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-slate-200 outline-none w-full border-none p-0 focus:ring-0"
                />
              </div>

              <div className="bg-[#090A12] border border-slate-850 rounded-2xl overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-850 text-slate-500 font-bold text-[9px] uppercase tracking-wider">
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/60 text-slate-300">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-900/10">
                        <td className="p-4 font-bold text-white">{u.name}</td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            u.role === 'admin' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`w-2 h-2 rounded-full inline-block mr-1.5 ${u.status === 'active' ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                          <span className="capitalize">{u.status}</span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleToggleRole(u.id)}
                            className="text-[10px] font-bold text-blue-400 hover:text-blue-300 bg-blue-500/5 px-2.5 py-1 rounded-lg border border-blue-500/10 transition-colors"
                          >
                            Toggle Role
                          </button>
                          <button
                            onClick={() => handleToggleStatus(u.id)}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                              u.status === 'active' 
                                ? 'text-slate-400 hover:text-red-400 hover:bg-red-950/10 border-slate-800' 
                                : 'text-emerald-450 hover:text-emerald-400 border-emerald-500/10 bg-emerald-500/5'
                            }`}
                          >
                            {u.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtab 3: AI Configuration */}
          {subTab === 'ai' && (
            <form onSubmit={handleSaveAIConfig} className="p-6 bg-[#090A12] border border-slate-850 rounded-2xl space-y-6 text-left animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-850">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  Model Configuration parameters
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-450">Active LLM Model</label>
                  <select
                    value={aiConfig.model}
                    onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white focus:border-blue-500"
                  >
                    <option value="llama-3.3-70b-versatile">Llama 3.3 70b (High accuracy)</option>
                    <option value="llama3-8b-8192">Llama 3 8b (Fast response)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-450">Temperature ({aiConfig.temperature})</label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.5" 
                    step="0.1" 
                    value={aiConfig.temperature}
                    onChange={(e) => setAiConfig({ ...aiConfig, temperature: parseFloat(e.target.value) })}
                    className="w-full accent-blue-600 bg-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-450">Default System System Prompt</label>
                <textarea 
                  rows={4} 
                  value={aiConfig.systemPrompt}
                  onChange={(e) => setAiConfig({ ...aiConfig, systemPrompt: e.target.value })}
                  className="w-full p-4 text-xs bg-[#07080F] border border-slate-850 rounded-xl outline-none text-white resize-none leading-relaxed focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-850/65">
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:from-red-500 transition-all shadow-md shadow-red-500/10 border border-red-500/30"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Apply AI Config</span>
                </button>
              </div>
            </form>
          )}

          {/* Subtab 4: Event Logs */}
          {subTab === 'logs' && (
            <div className="p-6 bg-[#090A12] border border-slate-850 rounded-2xl space-y-4 text-left animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Event Stream
                </h3>
                <button 
                  onClick={() => addLog('Diagnostics diagnostic health check performed manually', 'info')}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Force Diagnostic log trigger"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-[40vh] overflow-y-auto custom-scrollbar font-mono text-[10px]">
                {systemLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 bg-[#07080F]/50 rounded border border-slate-900 leading-normal">
                    <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                    <span className={`px-1.5 rounded uppercase font-bold text-[8px] tracking-wider shrink-0 ${
                      log.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      log.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      log.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-slate-300">{log.event}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtab 5: Platform Settings */}
          {subTab === 'settings' && (
            <div className="p-6 bg-[#090A12] border border-slate-850 rounded-2xl space-y-6 text-left animate-fadeIn">
              <div className="pb-3 border-b border-slate-850">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Global Configuration Settings
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#07080F] border border-slate-850 rounded-xl">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-300">System Maintenance Mode</span>
                    <p className="text-[10px] text-slate-500">Locks student logins and shows maintenance screen page.</p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={globalSettings.maintenanceMode}
                    onChange={(e) => {
                      const next = e.target.checked;
                      setGlobalSettings({ ...globalSettings, maintenanceMode: next });
                      addLog(`Global Maintenance mode set to ${next ? 'ON' : 'OFF'}`, next ? 'warning' : 'info');
                      showNotification(`Maintenance mode ${next ? 'enabled' : 'disabled'}`);
                    }}
                    className="rounded text-red-500 focus:ring-0 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#07080F] border border-[#13172E] rounded-xl">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-300">Public Signups Enrollment</span>
                    <p className="text-[10px] text-slate-500">Allow guest visitors to register new accounts.</p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={globalSettings.publicRegistrations}
                    onChange={(e) => {
                      const next = e.target.checked;
                      setGlobalSettings({ ...globalSettings, publicRegistrations: next });
                      addLog(`Public registrations set to ${next ? 'ALLOWED' : 'DISABLED'}`, 'info');
                    }}
                    className="rounded text-red-500 focus:ring-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
