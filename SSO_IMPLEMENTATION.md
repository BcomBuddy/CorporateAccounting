# JWT-based Single Sign-On (SSO) Implementation

This document describes the JWT-based Single Sign-On (SSO) implementation for the Corporate Accounting Simulator micro-app.

## Overview

The SSO system allows users to authenticate through the main BcomBuddy shell application and access this micro-app seamlessly without requiring separate login credentials.

## Architecture

### Components

1. **SSOAuthService** (`src/services/ssoAuthService.ts`) - Core authentication service
2. **useAuth Hook** (`src/hooks/useAuth.ts`) - React hook for authentication state management
3. **ProtectedRoute Component** (`src/components/ProtectedRoute.tsx`) - Route protection wrapper
4. **SSO Configuration** (`src/config/ssoConfig.ts`) - Configuration constants

### Authentication Flow

1. User accesses micro-app via shell application
2. Shell app redirects with JWT token in URL parameters
3. Micro-app validates token and extracts user data
4. User data is stored in localStorage for session persistence
5. URL parameters are cleaned for security
6. User can access protected content

## URL Format

When users access this app from the shell, the URL will be:
```
https://my-app.netlify.app?token=ENCODED_JWT_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
```

## JWT Token Structure

The token contains the following user data:

```json
{
  "uid": "user_id",
  "email": "user@example.com", 
  "name": "User Name",
  "yearOfStudy": "1st Year",
  "role": "student",
  "isAdmin": false,
  "shellDomain": "https://bcombuddy.netlify.app",
  "microAppDomain": "https://my-app.netlify.app",
  "iat": 1234567890,
  "exp": 1234654290,
  "firebaseToken": "firebase_jwt_token"
}
```

## Key Features

### Token Validation
- Parses JWT from URL parameters
- Validates token structure and expiration
- Checks micro-app domain matches current domain
- Handles invalid or expired tokens gracefully

### Automatic Login
- Extracts user data from validated token
- Stores user information in localStorage
- Maintains session across page refreshes
- Falls back to stored data if URL token is missing

### URL Security
- Removes sensitive token parameters after validation
- Prevents token exposure in browser history
- Maintains clean URLs for user experience

### Logout Handling
- Clears stored user data
- Redirects to shell application using shellDomain from token
- Supports fallback to default shell domain

### Loading States
- Shows appropriate loading indicators during authentication
- Handles both SSO and Firebase authentication modes
- Provides user feedback during token validation

## Implementation Details

### SSOAuthService Methods

- `validateTokenFromShell()` - Validates JWT from URL parameters
- `getUserData()` - Retrieves stored user data
- `isAuthenticated()` - Checks authentication status
- `logout()` - Clears data and redirects to shell
- `cleanUrl()` - Removes token parameters from URL

### useAuth Hook

- Manages authentication state
- Handles automatic token validation on app load
- Provides loading state during authentication
- Supports both SSO and stored data authentication

### ProtectedRoute Component

- Wraps protected content
- Shows loading spinner during authentication
- Displays authentication required message if not authenticated
- Handles SSO-specific loading states

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
REACT_APP_SHELL_DOMAIN=https://bcombuddy.netlify.app
REACT_APP_APP_TYPE=simulator
```

### SSO Configuration

The `src/config/ssoConfig.ts` file contains:
- Shell domain configuration
- App type settings
- Domain validation settings

## Testing

### SSO Test Component

The `SSOTestComponent` provides:
- Authentication status display
- Mock SSO login simulation
- URL parameter inspection
- Data clearing functionality

### Test URL Format

For testing, use this URL format:
```
https://your-app.netlify.app?token=ENCODED_MOCK_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
```

## Security Considerations

1. **Token Validation**: Validates token structure before parsing
2. **Expiration Checking**: Verifies token hasn't expired
3. **Domain Validation**: Ensures micro-app domain matches token
4. **URL Cleaning**: Removes sensitive data from URL after validation
5. **HTTPS**: Requires HTTPS in production environments

## Error Handling

- Invalid tokens are handled gracefully
- Expired tokens show appropriate error messages
- Network errors are caught and logged
- Fallback to authentication required state

## Integration with Existing Firebase Auth

The SSO system works alongside the existing Firebase authentication:
- SSO takes precedence when detected
- Falls back to Firebase auth for direct access
- Maintains separate authentication modes
- Supports both authentication methods simultaneously

## Deployment Notes

1. Set environment variables in your deployment platform
2. Ensure HTTPS is enabled for production
3. Configure proper CORS settings if needed
4. Test SSO flow with actual shell application
5. Monitor authentication logs for debugging

## Troubleshooting

### Common Issues

1. **Token not validating**: Check token structure and expiration
2. **Domain mismatch**: Verify microAppDomain in token matches current domain
3. **URL not cleaning**: Ensure cleanUrl() is called after validation
4. **Logout not redirecting**: Check shellDomain configuration

### Debug Information

Enable console logging to debug authentication issues:
- Token validation errors
- User data extraction
- URL parameter handling
- Authentication state changes

## Future Enhancements

- Token refresh mechanism
- Multi-domain support
- Enhanced security validation
- Analytics integration
- Error reporting system
