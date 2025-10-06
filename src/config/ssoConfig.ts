// SSO Configuration
export const SSO_CONFIG = {
  SHELL_DOMAIN: 'https://bcombuddy.netlify.app',
  APP_TYPE: 'simulator',
  APP_DOMAIN: window.location.origin,
} as const;

// Environment variables (you can set these in your deployment environment)
export const ENV_VARS = {
  SHELL_DOMAIN: import.meta.env.VITE_SHELL_DOMAIN || SSO_CONFIG.SHELL_DOMAIN,
  APP_TYPE: import.meta.env.VITE_APP_TYPE || SSO_CONFIG.APP_TYPE,
} as const;
