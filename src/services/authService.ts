import { User } from '../types';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

const STORAGE_KEY = 'pathpilot_auth_user';

export const authService = {
  // Helper to map Supabase User object to PathPilot User interface
  mapSupabaseUser(sbUser: any, fallbackRole = 'College Student'): User {
    const metadata = sbUser.user_metadata || {};
    const nameFromEmail = sbUser.email ? sbUser.email.split('@')[0].replace(/[._-]/g, ' ') : '';
    const formattedName = nameFromEmail ? nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1) : 'PathPilot Student';

    return {
      id: sbUser.id,
      name: metadata.full_name || metadata.name || formattedName,
      email: sbUser.email || '',
      role: metadata.role || fallbackRole,
      avatar: metadata.avatar_url || sbUser.user_metadata?.picture || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      authProvider: sbUser.app_metadata?.provider || 'email',
      createdAt: sbUser.created_at || new Date().toISOString(),
    };
  },

  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  async getSupabaseUser(): Promise<User | null> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching current user:', error.message);
        return null;
      }

      if (user) {
        // Try to fetch profile to get up-to-date role and name
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        
        let mappedUser = this.mapSupabaseUser(user);
        if (profile) {
          mappedUser = {
            ...mappedUser,
            name: profile.name || mappedUser.name,
            role: profile.role || mappedUser.role,
            avatar: profile.avatar || mappedUser.avatar
          };
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedUser));
        return mappedUser;
      }
    } catch (err) {
      console.error('Unexpected error in getSupabaseUser:', err);
    }

    return null;
  },

  async login(email: string, password?: string): Promise<User> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password || '',
    });

    if (error) {
      if (
        error.message.toLowerCase().includes('invalid login credentials') ||
        error.message.toLowerCase().includes('user not found')
      ) {
        throw new Error('Account does not exist with this email. Please create an account first by signing up.');
      }
      throw new Error(error.message);
    }

    if (data.user) {
      const user = this.mapSupabaseUser(data.user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    }

    throw new Error('Login failed.');
  },

  async signup(name: string, email: string, password?: string, role = 'College Student'): Promise<User> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: password || '',
      options: {
        data: {
          name,
          full_name: name,
          role,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      const user = this.mapSupabaseUser(data.user, role);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    
    throw new Error('Signup failed.');
  },

  async loginWithGoogle(): Promise<User> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: 'oauth_pending',
      name: 'Authenticating...',
      email: '',
      createdAt: new Date().toISOString(),
    };
  },

  async loginWithGithub(): Promise<User> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: 'oauth_pending',
      name: 'Authenticating...',
      email: '',
      createdAt: new Date().toISOString(),
    };
  },

  async resetPassword(email: string): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return true;
  },

  async logout(): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Supabase signout error:', error.message);
        }
      } catch (err) {
        console.error('Supabase signout unexpected error:', err);
      }
    }
    localStorage.removeItem(STORAGE_KEY);
  },

  async deleteAccount(): Promise<void> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: rpcError } = await supabase.rpc('delete_user');
        if (rpcError) {
           await supabase.from('profiles').delete().eq('id', user.id);
        }
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error('Error deleting user from supabase:', err);
    }
    localStorage.removeItem(STORAGE_KEY);
  },

  onAuthStateChange(
    callback: (user: User | null, session?: Session | null, event?: AuthChangeEvent) => void
  ) {
    if (!isSupabaseConfigured()) return { unsubscribe: () => {} };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          let user = this.mapSupabaseUser(session.user);
          
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            try {
              // Try to insert/upsert the profile
              await supabase.from('profiles').upsert({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
              }, { onConflict: 'id' });
              
              const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
              if (profile) {
                user = { ...user, name: profile.name || user.name, role: profile.role || user.role, avatar: profile.avatar || user.avatar };
              }
            } catch (e) {
              console.error('Failed to upsert profile on auth change:', e);
            }
          }
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          callback(user, session, event);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          callback(null, session, event);
        }
      }
    );

    return subscription;
  },

  async requireAuth(onUnauthorized?: () => void): Promise<User | null> {
    if (isSupabaseConfigured()) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (onUnauthorized) onUnauthorized();
        return null;
      }
      return this.mapSupabaseUser(user);
    }

    return null;
  },

  async getSession(): Promise<Session | null> {
    if (isSupabaseConfigured()) {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        return session;
      } catch (err) {
        console.error('Error fetching Supabase session:', err);
      }
    }
    return null;
  }
};
