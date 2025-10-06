import React from 'react';
import { SSOAuthService } from '../services/ssoAuthService';
import { useAuth } from '../hooks/useAuth';

export const SSOTestComponent: React.FC = () => {
  const { user, isAuthenticated, isSSO, logout } = useAuth();

  const simulateSSOLogin = () => {
    // Simulate SSO token for testing
    const mockToken = {
      uid: 'test_user_123',
      email: 'test@example.com',
      name: 'Test User',
      yearOfStudy: '2nd Year',
      role: 'student',
      isAdmin: false,
      shellDomain: 'https://bcombuddy.netlify.app',
      microAppDomain: window.location.origin,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      firebaseToken: 'mock_firebase_token'
    };

    // Add token to URL for testing
    const url = new URL(window.location.href);
    url.searchParams.set('token', encodeURIComponent(JSON.stringify(mockToken)));
    url.searchParams.set('sso', 'true');
    url.searchParams.set('shell', 'https://bcombuddy.netlify.app');
    
    window.location.href = url.toString();
  };

  const clearSSOData = () => {
    localStorage.removeItem('sso_user_data');
    window.location.reload();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">SSO Test Panel</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Authentication Status</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
            <p><strong>SSO Mode:</strong> {isSSO ? '✅ Yes' : '❌ No'}</p>
            {user && (
              <>
                <p><strong>User Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Year of Study:</strong> {user.yearOfStudy}</p>
                <p><strong>Shell Domain:</strong> {user.shellDomain}</p>
                <p><strong>Micro App Domain:</strong> {user.microAppDomain}</p>
              </>
            )}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Test Actions</h3>
          <div className="space-y-2">
            <button
              onClick={simulateSSOLogin}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Simulate SSO Login
            </button>
            <button
              onClick={clearSSOData}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Clear SSO Data
            </button>
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">URL Parameters</h3>
          <div className="text-sm space-y-1">
            <p><strong>Current URL:</strong> {window.location.href}</p>
            <p><strong>Has Token:</strong> {new URLSearchParams(window.location.search).get('token') ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Has SSO Flag:</strong> {new URLSearchParams(window.location.search).get('sso') === 'true' ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Has Shell:</strong> {new URLSearchParams(window.location.search).get('shell') ? '✅ Yes' : '❌ No'}</p>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Expected SSO URL Format</h3>
          <code className="text-sm bg-white p-2 rounded block">
            {window.location.origin}?token=ENCODED_JWT_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
          </code>
        </div>
      </div>
    </div>
  );
};
