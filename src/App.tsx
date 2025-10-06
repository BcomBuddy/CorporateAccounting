import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import UnitOne from './components/units/UnitOne';
import UnitTwo from './components/units/UnitTwo';
import UnitThree from './components/units/UnitThree';
import UnitFour from './components/units/UnitFour';
import UnitFive from './components/units/UnitFive';
import { ProtectedRoute } from './components/ProtectedRoute';
import { authService } from './services/authService';
import { SSOAuthService } from './services/ssoAuthService';
import { useAuth } from './hooks/useAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

export type ActiveUnit = 'login' | 'home' | 'unit1' | 'unit2' | 'unit3' | 'unit4' | 'unit5';

function App() {
  const [activeUnit, setActiveUnit] = useState<ActiveUnit>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'firebase' | 'sso' | null>(null);
  
  // SSO authentication hook
  const { user: ssoUser, loading: ssoLoading, isAuthenticated: isSSOAuthenticated, isSSO, logout: ssoLogout } = useAuth();

  // Listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !isSSOAuthenticated) {
        setIsLoggedIn(true);
        setActiveUnit('home');
        setAuthMode('firebase');
      } else if (!isSSOAuthenticated) {
        setIsLoggedIn(false);
        setActiveUnit('login');
        setAuthMode(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isSSOAuthenticated]);

  // Handle SSO authentication
  useEffect(() => {
    if (isSSOAuthenticated && ssoUser) {
      setIsLoggedIn(true);
      setActiveUnit('home');
      setAuthMode('sso');
      setIsLoading(false);
    } else if (!ssoLoading && !isSSOAuthenticated && !auth.currentUser) {
      setIsLoggedIn(false);
      setActiveUnit('login');
      setAuthMode(null);
      setIsLoading(false);
    }
  }, [isSSOAuthenticated, ssoUser, ssoLoading]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveUnit('home');
    setAuthMode('firebase');
  };

  const handleLogout = async () => {
    try {
      if (authMode === 'sso') {
        ssoLogout();
      } else {
        await authService.signOut();
        setIsLoggedIn(false);
        setActiveUnit('login');
        setAuthMode(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderContent = () => {
    switch (activeUnit) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'home':
        return <HomePage />;
      case 'unit1':
        return <UnitOne />;
      case 'unit2':
        return <UnitTwo />;
      case 'unit3':
        return <UnitThree />;
      case 'unit4':
        return <UnitFour />;
      case 'unit5':
        return <UnitFive />;
      default:
        return <HomePage />;
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading || ssoLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
          {isSSO && (
            <p className="text-sm text-gray-500 mt-2">Validating SSO token...</p>
          )}
        </div>
      </div>
    );
  }

  // If SSO is detected, wrap everything in ProtectedRoute
  if (isSSO) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen bg-gray-50">
          {/* Fixed Sidebar */}
          <Sidebar 
            activeUnit={activeUnit} 
            setActiveUnit={setActiveUnit} 
            onLogout={handleLogout}
            userInfo={ssoUser ? {
              name: ssoUser.name,
              email: ssoUser.email,
              role: ssoUser.role,
              yearOfStudy: ssoUser.yearOfStudy
            } : undefined}
          />
          
          {/* Main Content Area */}
          <div className="flex-1 ml-80">
            <div className="h-screen overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Show login page if not logged in (Firebase auth)
  if (!isLoggedIn) {
    return renderContent();
  }

  // Regular Firebase authenticated view
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar activeUnit={activeUnit} setActiveUnit={setActiveUnit} onLogout={handleLogout} />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-80">
        <div className="h-screen overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;