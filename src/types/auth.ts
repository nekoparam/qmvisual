export interface LoginRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  key: string;
  username: string;
  email: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface RegisterResponse {}

export interface UserProfile {
  id: string;
  credits: number;
  privileges: any[];
  username: string;
  email: string;
}

export interface ChangePasswordRequest {
  new_password1: string;
  new_password2: string;
}

export interface UpdateProfileRequest {
  username: string;
} 