import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    const savedId = localStorage.getItem('patientId');
    if (savedId) {
      setPatientId(savedId);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (id) => {
    // For demonstration, only "P-12345" works, but we'll accept anything for now
    // or just check if it's not empty.
    if (id.trim()) {
      setPatientId(id);
      setIsLoggedIn(true);
      localStorage.setItem('patientId', id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setPatientId('');
    setIsLoggedIn(false);
    localStorage.removeItem('patientId');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, patientId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
