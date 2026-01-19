// Auth Interfaces
export interface loginFormData {
  email: string;
  password: string;
}

export interface registerFormData {
  email: string;
  userName: string
  password: string;
  confirmPassword: string;
}

// Categories Interfaces
export interface categoriesFormData {
  name: string | null;
  imageUrl: string;
  id: string;
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
