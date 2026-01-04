// src/config/api.config.ts
import { Platform } from 'react-native';

const DEVELOPMENT_IP = '172.27.27.71'; // ← Ton IP actuelle (à mettre à jour si ton Wi-Fi change)
const PORT = 9006;

// URL de base selon la plateforme et l'environnement
const getBaseUrl = () => {
  // En production, utilise ton domaine réel
  if (!__DEV__) {
    return 'https://api.tonapp.com/api/v1'; // ← À remplacer par ton URL de prod plus tard
  }

  // En développement
  if (Platform.OS === 'android') {
    // Émulateur Android : 10.0.2.2 pointe vers localhost du Mac/PC
    return `http://10.0.2.2:${PORT}/api/v1`;
  }

  // iOS (simulateur) → localhost fonctionne
  // iOS (appareil physique) + Android (appareil physique) → IP du Mac
  return `http://${DEVELOPMENT_IP}:${PORT}/api/v1`;
};

const API_CONFIG = {
  // URL de base dynamique
  BASE_URL: getBaseUrl(),

  // Headers d'authentification
  API_KEY: 'aooo',
  API_KEY_HEADER: 'x-api-key',

  // Timeout global
  TIMEOUT: 30000, // 30 secondes

  // Endpoints organisés
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
