import { httpClient, APIResponseMessage } from '../http-client';
import { API_CONFIG } from '../../config/api';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserProfile,
  ChangePasswordRequest,
  UpdateProfileRequest,
} from '../../types/auth';
import { API_ENDPOINTS } from '@/config/api'

interface SignInCredentials {
  email: string
  password: string
}

interface SignInResponse {
  success: boolean
  message?: string
  token?: string
  user?: {
    id: string
    email: string
    // ... 其他用户信息字段
  }
}

const USER_PROFILE_CACHE_KEY = '@qmauth/user_profile';

class AuthService {
  private baseUrl = API_CONFIG.AUTH_ENDPOINT;

  async login(data: LoginRequest): Promise<APIResponseMessage<LoginResponse>> {
    const response = await httpClient.post(`${this.baseUrl}/user/auth/login/`, data);
    return new APIResponseMessage<LoginResponse>(response);
  }

  async register(data: RegisterRequest): Promise<APIResponseMessage<RegisterResponse>> {
    const response = await httpClient.post(`${this.baseUrl}/api/user/auth/registration/`, data);
    return new APIResponseMessage<RegisterResponse>(response);
  }

  async changePassword(data: ChangePasswordRequest): Promise<APIResponseMessage<{}>> {
    const response = await httpClient.post(`${this.baseUrl}/api/user/auth/password/change/`, data);
    return new APIResponseMessage<{}>(response);
  }

  async getProfile(): Promise<APIResponseMessage<UserProfile>> {
    const response = await httpClient.get(`${this.baseUrl}/user_profile`);
    if (response.status >= 200 && response.status < 300) {
      // 将获取到的用户信息存入缓存
      localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(response.data.data));
    }
    return new APIResponseMessage<UserProfile>(response);
  }

  async getCachedProfile(): Promise<UserProfile | null> {
    const cachedProfile = localStorage.getItem(USER_PROFILE_CACHE_KEY);
    if (cachedProfile) {
      return JSON.parse(cachedProfile);
    } else {
        return (await this.getProfile()).data();
    }
    return null;
  }

  async updateProfile(data: UpdateProfileRequest): Promise<APIResponseMessage<UserProfile>> {
    const response = await httpClient.patch(`${this.baseUrl}/api/user/user_profile`, data);
    return new APIResponseMessage<UserProfile>(response);
  }

  async signIn(credentials: SignInCredentials): Promise<SignInResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.auth.signIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: data.message || '登录失败',
        }
      }

      // 如果登录成功，存储 token 并清除用户信息缓存
      if (data.data.key) {
        localStorage.setItem('@qmauth/token', data.data.key)
        localStorage.removeItem(USER_PROFILE_CACHE_KEY); // 清除用户信息缓存
      }

      return {
        success: true,
        ...data,
      }
    } catch (error) {
      return {
        success: false,
        message: '网络错误，请稍后重试',
      }
    }
  }

}

export const authService = new AuthService();
export const { signIn } = authService; 