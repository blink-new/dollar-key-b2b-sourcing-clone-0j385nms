export interface User {
  id: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  accountType?: 'buyer' | 'supplier';
  isVerified?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (nextUrl?: string) => void;
  logout: (redirectUrl?: string) => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}