import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users - replace with actual API
  const mockUsers = [
    {
      id: 1,
      email: 'admin@insite.health',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      avatar: 'assets/images/team-1.jpg'
    },
    {
      id: 2,
      email: 'editor@insite.health',
      password: 'editor123',
      name: 'Content Editor',
      role: 'editor',
      avatar: 'assets/images/team-2.jpg'
    },
    {
      id: 3,
      email: 'author@insite.health',
      password: 'author123',
      name: 'Blog Author',
      role: 'author',
      avatar: 'assets/images/team-3.jpg'
    }
  ];

  useEffect(() => {
    // Check for stored auth token on mount
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          u => u.email === email && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('authUser', JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          resolve(userWithoutPassword);
        } else {
          setIsLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'author': 1,
      'editor': 2,
      'admin': 3
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;