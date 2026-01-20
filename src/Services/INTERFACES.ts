import type { JwtPayload } from "jwt-decode";
import type { ReactNode } from "react";

// Auth Interfaces
export interface authContextType {
  loginData: JwtPayload | null;
  getLoginData: () => void;
  logout: () => void;
  // userProfile: loginFormData;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface loginFormData {
  email: string;
  password: string;
}

export interface registerFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Categories Interfaces
export interface categoriesFormData {
  name: string | null;
  image: string|null;
  id: string;
}

// User Interfaces
export interface UserData{
  sub: string;
  password: string;
  role: 'admin'|'customer'
}

// Shared Interfaces
export interface DeleteConfirmationProps {
  isOpen: boolean;
  itemName: string | null;
  entityName: string;
  isLoading: boolean;
  onClose: () => void;
  onDelete: () => void;
}
