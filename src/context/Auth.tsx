import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  nome: string;
  email: string;
  bi: string;
  role: 'admin' | 'student';
  universidade?: string;
  curso?: string;
  cidade?: string;
  anoFrequencia?: number;
  telefone?: string;
  documentosIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterData {
  nome: string;
  email: string;
  password: string;
  bi: string;
  telefone: string;
  universidade: string;
  curso: string;
  cidade: string;
  anoFrequencia: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('angola_user');
        const storedToken = localStorage.getItem('angola_token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao verificar status de autenticação:', error);
        localStorage.removeItem('angola_user');
        localStorage.removeItem('angola_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulação de API call - substitua pela sua API real
      const response = await mockApiLogin(email, password);
      
      if (response.success) {
        setUser(response.user!);
        localStorage.setItem('angola_user', JSON.stringify(response.user));
        localStorage.setItem('angola_token', response.token!);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulação de API call - substitua pela sua API real
      const response = await mockApiRegister(userData);
      
      if (response.success) {
        setUser(response.user!);
        localStorage.setItem('angola_user', JSON.stringify(response.user));
        localStorage.setItem('angola_token', response.token!);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('angola_user');
    localStorage.removeItem('angola_token');
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setLoading(true);
    try {
      // Simulação de API call - substitua pela sua API real
      const response = await mockApiUpdateUser(user.id, userData);
      
      if (response.success) {
        const updatedUser = { ...user, ...userData, updatedAt: new Date() };
        setUser(updatedUser);
        localStorage.setItem('angola_user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock API functions - substitua por chamadas reais à sua API
const mockApiLogin = async (email: string, password: string): Promise<{success: boolean; user?: User; token?: string}> => {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Dados mockados - substitua por verificação real
  const mockUsers: User[] = [
    {
      id: '1',
      nome: 'Admin Embaixada',
      email: 'admin@embaixada-angola.ru',
      bi: '000000000BA000',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    },
    {
      id: '2',
      nome: 'João Silva',
      email: 'joao.silva@estudante.com',
      bi: '123456789BA000',
      role: 'student',
      universidade: 'Universidade de Moscou',
      curso: 'Engenharia Informática',
      cidade: 'Moscou',
      anoFrequencia: 3,
      telefone: '+7 (xxx) xxx-xxxx',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date()
    }
  ];
  
  const user = mockUsers.find(u => u.email === email);
  
  if (user && password === '123456') {
    return {
      success: true,
      user,
      token: 'mock_jwt_token_' + user.id
    };
  }
  
  return { success: false };
};

const mockApiRegister = async (userData: RegisterData): Promise<{success: boolean; user?: User; token?: string}> => {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const newUser: User = {
    id: Date.now().toString(),
    nome: userData.nome,
    email: userData.email,
    bi: userData.bi,
    role: 'student',
    universidade: userData.universidade,
    curso: userData.curso,
    cidade: userData.cidade,
    anoFrequencia: userData.anoFrequencia,
    telefone: userData.telefone,
    documentosIds: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  return {
    success: true,
    user: newUser,
    token: 'mock_jwt_token_' + newUser.id
  };
};

const mockApiUpdateUser = async (userId: string, userData: Partial<User>): Promise<{success: boolean}> => {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { success: true };
};