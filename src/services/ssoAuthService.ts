import { SSO_CONFIG } from '../config/ssoConfig';

export interface UserData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy: string;
  role: string;
  isAdmin: boolean;
  shellDomain?: string;
  microAppDomain?: string;
}

export interface SSOAuthResult {
  success: boolean;
  user?: UserData;
  error?: string;
}

export class SSOAuthService {
  private static readonly USER_KEY = 'sso_user_data';
  private static readonly SHELL_DOMAIN = SSO_CONFIG.SHELL_DOMAIN;

  /**
   * Validates JWT token from URL parameters and extracts user data
   */
  static validateTokenFromShell(): UserData | null {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const isSSO = urlParams.get('sso') === 'true';

    if (!token || !isSSO) {
      return null;
    }

    try {
      // Decode the token (assuming it's URL encoded JSON)
      const tokenData = JSON.parse(decodeURIComponent(token));
      
      // Validate required fields
      if (!tokenData.uid || !tokenData.email) {
        console.error('SSO Token validation failed: Missing required fields');
        return null;
      }

      // Check token expiration
      if (tokenData.exp && tokenData.exp < Math.floor(Date.now() / 1000)) {
        console.error('SSO Token validation failed: Token expired');
        return null;
      }

      // Validate micro app domain matches current domain
      const currentDomain = window.location.origin;
      if (tokenData.microAppDomain && tokenData.microAppDomain !== currentDomain) {
        console.warn('SSO Token domain mismatch:', {
          expected: tokenData.microAppDomain,
          actual: currentDomain
        });
      }

      const userData: UserData = {
        uid: tokenData.uid,
        email: tokenData.email,
        name: tokenData.name || 'User',
        yearOfStudy: tokenData.yearOfStudy || 'Unknown',
        role: tokenData.role || 'student',
        isAdmin: tokenData.isAdmin || false,
        shellDomain: tokenData.shellDomain || this.SHELL_DOMAIN,
        microAppDomain: tokenData.microAppDomain || currentDomain
      };

      // Store user data in localStorage
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      
      // Clean URL parameters after successful validation
      this.cleanUrl();
      
      console.log('✅ SSO Login successful:', userData);
      return userData;
    } catch (error) {
      console.error('SSO Token validation error:', error);
      return null;
    }
  }

  /**
   * Retrieves stored user data from localStorage
   */
  static getUserData(): UserData | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem(this.USER_KEY);
      return null;
    }
  }

  /**
   * Checks if user is authenticated via SSO
   */
  static isAuthenticated(): boolean {
    return this.getUserData() !== null;
  }

  /**
   * Logs out user and redirects to shell application
   */
  static logout(): void {
    const userData = this.getUserData();
    const shellDomain = userData?.shellDomain || 
                       new URLSearchParams(window.location.search).get('shell') || 
                       this.SHELL_DOMAIN;
    
    // Clear stored user data
    localStorage.removeItem(this.USER_KEY);
    
    console.log('SSO Logout: Redirecting to shell:', shellDomain);
    
    // Redirect to shell application
    window.location.href = shellDomain;
  }

  /**
   * Cleans URL parameters after successful authentication
   */
  private static cleanUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('sso');
    url.searchParams.delete('shell');
    window.history.replaceState({}, document.title, url.toString());
  }

  /**
   * Validates SSO token and returns structured result
   */
  static async validateSSOToken(): Promise<SSOAuthResult> {
    try {
      const userData = this.validateTokenFromShell();
      
      if (userData) {
        return {
          success: true,
          user: userData
        };
      } else {
        // Check for stored user data as fallback
        const storedUser = this.getUserData();
        if (storedUser) {
          return {
            success: true,
            user: storedUser
          };
        }
        
        return {
          success: false,
          error: 'No valid SSO token found'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during SSO validation'
      };
    }
  }

  /**
   * Checks if current request is SSO-based
   */
  static isSSORequest(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('sso') === 'true' && urlParams.get('token') !== null;
  }
}
