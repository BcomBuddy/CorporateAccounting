import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  sendPasswordResetEmail,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Error message mapping for user-friendly messages
const getErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please check your email.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/popup-blocked':
      return 'Popup was blocked by your browser. Please allow popups and try again.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const authService = {
  // Sign in with email and password
  signInWithEmail: async (email: string, password: string): Promise<AuthResult> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: getErrorMessage(authError)
      };
    }
  },

  // Sign in with Google
  signInWithGoogle: async (): Promise<AuthResult> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: getErrorMessage(authError)
      };
    }
  },

  // Sign out
  signOut: async (): Promise<AuthResult> => {
    try {
      await signOut(auth);
      return {
        success: true
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: getErrorMessage(authError)
      };
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!auth.currentUser;
  },

  // Send password reset email
  sendPasswordReset: async (email: string): Promise<AuthResult> => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin,
        handleCodeInApp: false
      });
      return {
        success: true
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: getErrorMessage(authError)
      };
    }
  }
};
