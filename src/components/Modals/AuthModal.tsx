import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight, Check, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { PathPilotLogo } from '../PathPilotLogo';
import { AuthMode, User } from '../../types';
import { authService } from '../../services/authService';
import { isSupabaseConfigured } from '../../services/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onAuthSuccess
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('College Student');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: '', color: '', percent: 0 };
    if (pwd.length < 6) return { label: 'Weak', color: 'bg-rose-500', percent: 33 };
    if (pwd.length < 10 || !/\d/.test(pwd)) return { label: 'Medium', color: 'bg-amber-500', percent: 66 };
    return { label: 'Strong', color: 'bg-emerald-500', percent: 100 };
  };

  const passwordStrength = getPasswordStrength(password);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleModeChange = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (mode === 'login') {
      if (!email || !password) {
        setErrorMessage('Please fill in both email and password.');
        return;
      }
      try {
        setIsLoading(true);
        const user = await authService.login(email, password);
        onAuthSuccess(user);
        onClose();
      } catch (err: any) {
        setErrorMessage(err.message || 'Invalid credentials. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else if (mode === 'signup') {
      if (!name || !email || !password) {
        setErrorMessage('Please complete all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('Please agree to the Terms of Service.');
        return;
      }
      try {
        setIsLoading(true);
        const user = await authService.signup(name, email, password, role);
        onAuthSuccess(user);
        onClose();
      } catch (err: any) {
        setErrorMessage(err.message || 'Failed to create account. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else if (mode === 'forgot') {
      if (!email) {
        setErrorMessage('Please enter your account email address.');
        return;
      }
      try {
        setIsLoading(true);
        await authService.resetPassword(email);
        setSuccessMessage(`Password reset link sent to ${email}. Check your inbox!`);
      } catch (err: any) {
        setErrorMessage(err.message || 'Could not process request. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setErrorMessage('');
      setSocialLoading('google');
      const user = await authService.loginWithGoogle();
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Google Sign-In failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setErrorMessage('');
      setSocialLoading('github');
      const user = await authService.loginWithGithub();
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'GitHub Sign-In failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Container Card */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-6 sm:p-8 space-y-6">
        
        {/* Social Auth Redirect Overlay */}
        {socialLoading && (
          <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-fadeIn space-y-5">
            <div className="relative">
              {/* Pulsing Glow */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
              {socialLoading === 'google' ? (
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shadow-2xl relative z-10 animate-bounce">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shadow-2xl relative z-10 animate-bounce">
                  <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-md font-bold text-white font-sora">
                Redirecting to {socialLoading === 'google' ? 'Google' : 'GitHub'}...
              </h3>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                Opening secure auth portal to fetch your live session credentials
              </p>
            </div>

            {/* Progress Line */}
            <div className="w-40 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto relative">
              <div className="h-full bg-blue-500 rounded-full animate-loadingBar w-24" />
            </div>
          </div>
        )}

        {/* Glow Decorator */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-orange-500/15 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2 pt-2">
          <PathPilotLogo size="md" />
          <h2 className="text-2xl font-extrabold font-sora tracking-tight text-white pt-2">
            {mode === 'login' && 'Welcome Back to PATHPILOT'}
            {mode === 'signup' && 'Create Your Free Account'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-400 font-inter">
            {mode === 'login' && 'Sign in to access your AI roadmaps, assessments & advisor'}
            {mode === 'signup' && 'Unlock AI career guidance, resume tools & personalized roadmaps'}
            {mode === 'forgot' && 'Enter your registered email to receive a password reset link'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs font-semibold">
            <button
              onClick={() => handleModeChange('login')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'login' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleModeChange('signup')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'signup' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Error / Success Alerts */}
        {errorMessage && (
          <div className="flex flex-col gap-2 p-3.5 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
            {errorMessage.toLowerCase().includes('create an account') && mode === 'login' && (
              <button
                type="button"
                onClick={() => handleModeChange('signup')}
                className="mt-1 self-start px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
              >
                <span>Switch to Sign Up Now</span>
                <ArrowRight className="w-3 h-3 text-orange-400" />
              </button>
            )}
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-2.5 p-3.5 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Social Auth Buttons (Google & GitHub) */}
        {mode !== 'forgot' && (
          <div className="space-y-2.5">
            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={socialLoading !== null}
              className="w-full py-2.5 px-4 bg-slate-950/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-3 transition-all duration-200 hover:border-slate-600"
            >
              {socialLoading === 'google' ? (
                <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              onClick={handleGithubLogin}
              disabled={socialLoading !== null}
              className="w-full py-2.5 px-4 bg-slate-950/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-3 transition-all duration-200 hover:border-slate-600"
            >
              {socialLoading === 'github' ? (
                <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              )}
              <span>Continue with GitHub</span>
            </button>

            {/* Divider */}
            <div className="relative py-1 flex items-center justify-center">
              <div className="w-full border-t border-slate-800" />
              <span className="absolute px-3 bg-slate-900 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Or with email
              </span>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sign Up: Full Name */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl outline-none text-white transition-colors"
                />
              </div>
            </div>
          )}

          {/* Email Address Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl outline-none text-white transition-colors"
              />
            </div>
          </div>

          {/* Sign Up: Student Role Dropdown */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Current Education Stage</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl outline-none text-white transition-colors"
              >
                <option value="High School Student">High School Student</option>
                <option value="College Student">College Student / Undergraduate</option>
                <option value="Recent Graduate">Recent Graduate</option>
                <option value="Career Switcher">Career Switcher / Lifelong Learner</option>
              </select>
            </div>
          )}

          {/* Password Input (Login & Signup) */}
          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleModeChange('forgot')}
                    className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl outline-none text-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter for Sign Up */}
              {mode === 'signup' && password && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Password Strength:</span>
                    <span className="font-bold">{passwordStrength.label}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength.percent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sign Up: Confirm Password */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl outline-none text-white transition-colors"
                />
              </div>
            </div>
          )}

          {/* Login: Remember Me */}
          {mode === 'login' && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 w-3.5 h-3.5"
                />
                <span>Remember this device</span>
              </label>
            </div>
          )}

          {/* Sign Up: Terms Agreement */}
          {mode === 'signup' && (
            <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 w-3.5 h-3.5 shrink-0"
              />
              <span>
                I agree to PATHPILOT's{' '}
                <a href="#terms" className="text-blue-400 underline">Terms of Service</a> and{' '}
                <a href="#privacy" className="text-blue-400 underline">Privacy Policy</a>.
              </span>
            </label>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 rounded-xl shadow-lg shadow-blue-600/30 border border-blue-400/30 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Sign In to Dashboard'}
                  {mode === 'signup' && 'Create Free Account'}
                  {mode === 'forgot' && 'Send Password Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4 text-orange-400 shrink-0" />
              </>
            )}
          </button>
        </form>

        {/* Forgot Password Back Button */}
        {mode === 'forgot' && (
          <div className="text-center pt-2">
            <button
              onClick={() => handleModeChange('login')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Sign In
            </button>
          </div>
        )}

        {/* Demo Quick Login Shortcut Footer */}
        {mode === 'login' && (
          <div className="pt-2 border-t border-slate-800/80 text-center">
            <button
              type="button"
              onClick={async () => {
                const user = await authService.login('demo.student@pathpilot.ai');
                onAuthSuccess(user);
                onClose();
              }}
              className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-[11px] font-bold flex items-center gap-1.5 mx-auto transition-colors"
            >
              <Sparkles className="w-3 h-3 text-orange-400" />
              <span>Click for 1-Click Demo Login</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
