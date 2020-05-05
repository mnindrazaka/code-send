export interface AuthState {
  username?: string;
  loading: boolean;
  error?: string;
}

export enum AuthActionTypes {
  LoginRequest = "@Auth/LoginRequest",
  LoginSuccess = "@Auth/LoginSuccess",
  LoginError = "@Auth/LoginError",
  RegisterRequest = "@Auth/RegisterRequest",
  RegisterSuccess = "@Auth/RegisterSuccess",
  RegisterError = "@Auth/RegisterError",
  LogoutRequest = "@Auth/LogoutRequest",
  LogoutSuccess = "@Auth/LogoutSuccess",
  LogoutError = "@Auth/LogoutError"
}
