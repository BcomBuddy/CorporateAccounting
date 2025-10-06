import { useState, useEffect } from 'react';
import { SSOAuthService, UserData } from '../services/ssoAuthService';

export interface AuthState {
  user: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  isSSO: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSSO, setIsSSO] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Check if this is an SSO request
        const isSSORequest = SSOAuthService.isSSORequest();
        setIsSSO(isSSORequest);
        
        if (isSSORequest) {
          // Validate SSO token from URL
          const result = await SSOAuthService.validateSSOToken();
          
          if (result.success && result.user) {
            setUser(result.user);
            console.log('✅ SSO Authentication successful:', result.user);
          } else {
            console.error('SSO Authentication failed:', result.error);
            setUser(null);
          }
        } else {
          // Check for existing stored user data
          const storedUser = SSOAuthService.getUserData();
          if (storedUser) {
            setUser(storedUser);
            console.log('✅ Using stored SSO user data:', storedUser);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    SSOAuthService.logout();
    setUser(null);
  };

  const refreshUser = () => {
    const storedUser = SSOAuthService.getUserData();
    setUser(storedUser);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isSSO,
    logout,
    refreshUser
  };
};
