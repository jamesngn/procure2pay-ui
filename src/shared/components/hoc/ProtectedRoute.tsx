import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo: string;
  requireAuth: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const { children, requireAuth, redirectTo } = props;

  const { user, token } = useAuthContext();

  if (requireAuth) {
    if (!user || !token) return <Navigate to={redirectTo} replace />;

    return <>{children}</>;
  }

  if (user && token) return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
};
