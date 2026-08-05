import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthSessionState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

/**
 * Custom React Hook (Step 14)
 * Allows accessing the logged-in Supabase user & session anywhere in the app.
 */
export function useAuthSession(): AuthSessionState {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadActiveSession() {
      try {
        const activeSession = await authService.getSession();
        setSession(activeSession);
        if (activeSession?.user) {
          const mappedUser = authService.mapSupabaseUser(activeSession.user);
          setUser(mappedUser);
        }
      } catch (error) {
        console.error('Error in useAuthSession:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadActiveSession();

    const subscription = authService.onAuthStateChange((updatedUser, activeSession) => {
      setUser(updatedUser);
      setSession(activeSession || null);
      setIsLoading(false);
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  return { user, session, isLoading };
}
