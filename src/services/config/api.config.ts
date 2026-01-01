import { Platform } from 'react-native';

const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: Platform.select({
    ios: 'http://localhost:9006/api/v1',
    android: 'http://10.0.2.2:9006/api/v1',
    web: 'http://localhost:9006/api/v1',
    default: 'http://localhost:9006/api/v1',
  }),

  // Headers d'authentification
  API_KEY: 'aooo',
  API_KEY_HEADER: 'x-api-key',

  // Timeouts
  TIMEOUT: 30000, // 30 secondes

  // Endpoints
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      VERIFY_OTP: '/auth/verify-otp',
      RESEND_OTP: '/auth/resend-otp',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      REFRESH_TOKEN: '/auth/refresh-token',
      LOGOUT: '/auth/logout',
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile/update',
      UPLOAD_AVATAR: '/user/avatar/upload',
    },
  },
};

export default API_CONFIG;
