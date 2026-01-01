import API_CONFIG from '../config/api.config';
import ApiService from '../config/api.service';

interface RegisterRequest {
  fullName: string;
  email?: string;
  phone: string;
  phoneCountryCode: string;
  password: string;
  otpMethod: 'sms' | 'email';
}

interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    fullName: string;
    email?: string;
    phone: string;
  };
}

interface LoginRequest {
  identifier: string; // phone
  password: string;
}

interface LoginResponse {
  user: {
    _id: string;
    fullName: string;
    phone: string;
    phoneCountryCode: string;
    status: string;
    phoneVerified: boolean;
    isAdmin: boolean;
    image?: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
  };
  message: string;
}

interface VerifyOTPRequest {
  userId: string;
  code: string;
}

interface VerifyOTPResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

interface ForgotPasswordRequest {
  identifier: string;
  otpMethod: 'sms' | 'email';
}

interface ResetPasswordRequest {
  identifier: string;
  otp: string;
  newPassword: string;
}

class AuthService {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await ApiService.post<RegisterResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        data,
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await ApiService.post<LoginResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        data,
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async verifyOTP(data: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    try {
      const response = await ApiService.post<VerifyOTPResponse>(
        API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP,
        data,
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async resendOTP(
    identifier: string,
    purpose: 'registration' | 'forgot-password',
  ): Promise<any> {
    try {
      const response = await ApiService.post(
        API_CONFIG.ENDPOINTS.AUTH.RESEND_OTP,
        { identifier, purpose },
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<any> {
    try {
      const response = await ApiService.post(
        API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD,
        data,
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async resetPassword(data: ResetPasswordRequest): Promise<any> {
    try {
      const response = await ApiService.post(
        API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD,
        data,
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }
  private handleError(error: any): Error {
    if (error.response?.data) {
      const errorData = error.response.data;

      // Si c'est le format de ton backend
      if (errorData.errors && errorData.errors.length > 0) {
        const firstError = errorData.errors[0];
        return new Error(firstError.clean_message || firstError.message);
      }

      // Sinon message générique
      return new Error(errorData.message || 'Une erreur est survenue');
    } else if (error.request) {
      return new Error(
        'Impossible de contacter le serveur. Vérifiez votre connexion.',
      );
    } else {
      return new Error(error.message || 'Une erreur inattendue est survenue');
    }
  }
}

export default new AuthService();
