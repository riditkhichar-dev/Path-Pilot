import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onUnauthorized: () => void;
  fallback?: React.ReactNode;
}

/**
 * ProtectedRoute Component (Step 13)
 * Verifies Supabase authentication using `await supabase.auth.getUser()`.
 * If no user is authenticated, calls `onUnauthorized()` to redirect or open AuthModal.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  onUnauthorized,
  fallback = null,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkUserAuth() {
      const user = await authService.requireAuth(onUnauthorized);
      setIsAuthenticated(Boolean(user));
    }
    checkUserAuth();
  }, [onUnauthorized]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center p-8 text-blue-500">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
