import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

import { defaultErrorMessage, getErrorMessage } from '@/shared/helpers/error';
import Auth from '@/shared/services/auth';
import userService from '@/shared/services/user';
import { IUserProfileResponse } from '@/shared/services/user/dto';
import { useLocalStorage } from '@/shared/hooks/userLocalStorage';

export interface UserState extends IUserProfileResponse {}

interface AuthContextValue {
  user: UserState | null;
  token: string | null;
  logout: () => void;
  login: ({
    username,
    password
  }: {
    username: string;
    password: string;
  }) => Promise<{ data?: null | any; error?: string }>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useState<string | null>(Auth.token);

  useEffect(() => {
    async function fetchProfile() {
      if (token) {
        try {
          const res = await userService.getUserProfile();
          if (res.successful && res.data) {
            setUser(res.data as UserState);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    }
    fetchProfile();
  }, [token]); // Dependency on token ensures this runs only when token changes

  const login = async ({ username, password }: { username: string; password: string }) => {
    try {
      const res = await Auth.login({ email: username, password: password });

      if (res.successful && res.data) {
        const data = res.data;

        if (data) {
          const decoded = jwtDecode(data.access_token);

          setUser({ ...(decoded as UserState) });
          setToken(data.access_token);

          return { data };
        }
      } else {
        return { error: getErrorMessage({ code: res.code, status: res.status }) };
      }
    } catch (error) {
      const { code, status } = error as any;

      if (code && status) {
        const errorMessage = getErrorMessage({ code, status });

        return { error: errorMessage };
      }
    }

    return { error: defaultErrorMessage };
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    Auth.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logout,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
