import { User } from '../types';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

const STORAGE_KEY = 'pathpilot_auth_user';
const REGISTERED_USERS_KEY = 'pathpilot_registered_users';

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

  // Get currently authenticated user from localStorage session or active cache
  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Get list of registered demo users
  getRegisteredUsers(): User[] {
    try {
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // Step 9: Get the Current User from Supabase
  async getSupabaseUser(): Promise<User | null> {
    if (isSupabaseConfigured()) {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        console.log(user);

        if (error) {
          console.error('Error fetching current user:', error.message);
          return null;
        }

        if (user) {
          const mappedUser = this.mapSupabaseUser(user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedUser));

          // Ensure profile exists in database
          try {
            await supabase.from('profiles').upsert({
              id: mappedUser.id,
              name: mappedUser.name,
              email: mappedUser.email,
              role: mappedUser.role,
              avatar: mappedUser.avatar,
              auth_provider: mappedUser.authProvider
            }, { onConflict: 'id' });
          } catch (e) {
            console.error('Failed to upsert profile:', e);
          }

          return mappedUser;
        }
      } catch (err) {
        console.error('Unexpected error in getSupabaseUser:', err);
      }
    }

    return this.getCurrentUser();
  },

  // Step 7: Supabase Login with Password
  async login(email: string, password?: string): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured() && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        // Standardize error message when account does not exist or credentials are bad
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
    }

    // Demo / Fallback Login mode when Supabase credentials are not active
    await new Promise((resolve) => setTimeout(resolve, 600));

    const registeredUsers = this.getRegisteredUsers();
    const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    // If demo account is not registered and is not default demo account, throw error asking user to sign up
    if (!existingUser && cleanEmail !== 'demo.student@pathpilot.ai') {
      throw new Error('Account does not exist with this email. Please create an account first by signing up.');
    }

    const nameFromEmail = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const user: User = existingUser || {
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      name: formattedName || 'PathPilot Student',
      email: cleanEmail,
      role: 'College Student',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      authProvider: 'email',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  // Email / Password Sign Up
  async signup(name: string, email: string, password?: string, role = 'College Student'): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured() && password) {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
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
    }

    // Demo / Fallback mode registration
    await new Promise((resolve) => setTimeout(resolve, 600));
    const user: User = {
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email: cleanEmail,
      role: role || 'Student',
      avatar: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80`,
      authProvider: 'email',
      createdAt: new Date().toISOString(),
    };

    // Save to registered users list
    const registeredUsers = this.getRegisteredUsers();
    const updatedUsers = [...registeredUsers.filter((u) => u.email.toLowerCase() !== cleanEmail), user];
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  // Google OAuth Login
  async loginWithGoogle(): Promise<User> {
    if (!isSupabaseConfigured()) {
      throw new Error(
        'Supabase is not configured. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable live Google OAuth login.'
      );
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

  // GitHub OAuth Login
  async loginWithGithub(): Promise<User> {
    if (!isSupabaseConfigured()) {
      throw new Error(
        'Supabase is not configured. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable live GitHub OAuth login.'
      );
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

  // Step 11: Reset Password with Supabase
  async resetPassword(email: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw new Error(error.message);
      }

      return true;
    }

    // Demo / Fallback mode
    await new Promise((resolve) => setTimeout(resolve, 600));
    return true;
  },

  // Step 8: Supabase Logout / Sign Out
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

  // Delete Account
  async deleteAccount(): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Attempt to delete user via RPC (requires setting up 'delete_user' RPC in Supabase)
          const { error: rpcError } = await supabase.rpc('delete_user');
          if (rpcError) {
             // Fallback: Delete from profiles table (assuming RLS allows users to delete their own profile)
             await supabase.from('profiles').delete().eq('id', user.id);
          }
          await supabase.auth.signOut();
        }
      } catch (err) {
        console.error('Error deleting user from supabase:', err);
      }
    } else {
      // Demo / Fallback mode
      const current = this.getCurrentUser();
      if (current) {
        const registeredUsers = this.getRegisteredUsers();
        const updatedUsers = registeredUsers.filter(u => u.id !== current.id && u.email !== current.email);
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));
      }
    }
    localStorage.removeItem(STORAGE_KEY);
  },

  // Step 10: Listen for Auth Changes with Supabase
  onAuthStateChange(
    callback: (user: User | null, session?: Session | null, event?: AuthChangeEvent) => void
  ) {
    if (!isSupabaseConfigured()) return { unsubscribe: () => {} };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log(event);
        console.log(session);

        if (session?.user) {
          const user = this.mapSupabaseUser(session.user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

          // Ensure profile exists in database on sign in
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            try {
              await supabase.from('profiles').upsert({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                auth_provider: user.authProvider
              }, { onConflict: 'id' });
            } catch (e) {
              console.error('Failed to upsert profile on auth change:', e);
            }
          }

          callback(user, session, event);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          callback(null, session, event);
        }
      }
    );

    return subscription;
  },

  // Step 13: Protect Routes / Verify Authentication
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

    const current = this.getCurrentUser();
    if (!current) {
      if (onUnauthorized) onUnauthorized();
      return null;
    }
    return current;
  },

  // Step 14: Access the Logged-in User Anywhere via Supabase Session
  async getSession(): Promise<Session | null> {
    if (isSupabaseConfigured()) {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user?.email) {
          console.log(session.user.email);
        }

        return session;
      } catch (err) {
        console.error('Error fetching Supabase session:', err);
      }
    }
    return null;
  }
};

