import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type User = {
  email: string;
  name: string;
  passwordHash: string;
  stripeCustomerId: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthContextType>({
    isLoggedIn: false,
    user: null,
    login: async () => {},
    logout: () => {},
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));


        setAuthStatus({ isLoggedIn: true, user: userData, login, logout });
      } else {
        const data = await response.text(); 
        alert(data); 
      }
    } catch (error) {
      console.error('Inloggningsfel:', error);
    }
  };

  const logout = () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('userData');
    setAuthStatus({ isLoggedIn: false, user: null, login, logout });
  };

  useEffect(() => {
    const storedUserCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('authCookie'));

    const storedUserData = localStorage.getItem('userData');

    if (storedUserCookie) {
      const storedUserData = storedUserCookie.split('=')[1];
      const user = JSON.parse(decodeURIComponent(storedUserData));
      setAuthStatus({ isLoggedIn: true, user, login, logout });
    } else if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setAuthStatus({ isLoggedIn: true, user, login, logout });
    } else {
      setAuthStatus({ isLoggedIn: false, user: null, login, logout });
    }
  }, []);

  return (
    <AuthContext.Provider value={authStatus}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth måste användas inuti en AuthProvider.');
  }
  return context;
};
