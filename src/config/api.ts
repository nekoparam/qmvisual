export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/v1/api',
  AUTH_ENDPOINT: process.env.NEXT_PUBLIC_AUTH_ENDPOINT || 'http://localhost:9000/v1/api/user',
  TIMEOUT: 10000,
} as const; 

export const API_ENDPOINTS = {
  auth: {
    signIn: `${API_CONFIG.AUTH_ENDPOINT}/auth/login/`,
    userProfile: `${API_CONFIG.AUTH_ENDPOINT}/user_profile`,
  },
} 