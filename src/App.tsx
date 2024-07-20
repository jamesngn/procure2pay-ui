import { LicenseManager } from 'ag-grid-enterprise';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AuthContextProvider, useAuthContext } from './contexts/AuthContext';
import { AppLayout } from './layout/app-layout';
import HomePage from './pages/home.page';
import Login from './pages/login.page';
import RequisitionPage from './pages/requisition.page';
import { ProtectedRoute } from './shared/components/hoc/ProtectedRoute';
import Auth from './shared/services/auth';

const AG_GRID_KEY = import.meta.env.VITE_AG_GRID_KEY;

LicenseManager.setLicenseKey(AG_GRID_KEY);

export enum ROUTES {
  Home = '/',
  Login = '/login'
}

const AppRoutes = () => {
  const { pathname } = useLocation();
  const { user, token } = useAuthContext();

  if (!user || !token) {
    Auth.removeAuth();
    const loginLinkWithRedirect = `${ROUTES.Login}?redirect=${pathname}`;
    return <Navigate replace to={loginLinkWithRedirect} />;
  }

  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/requisition/*" element={<RequisitionPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false} redirectTo="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
