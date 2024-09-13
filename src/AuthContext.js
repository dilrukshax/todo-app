import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (savedToken && savedUsers.length > 0) {
      const currentUser = savedUsers.find(u => u.token === savedToken);
      if (currentUser) {
        setUser(currentUser);
        setToken(savedToken);
      }
    }
  }, []);

  const register = (name, email, password) => {
    const newUser = { name, email, password, todos: [] };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === email)) {
      return false;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(u => u.email === email && u.password === password);

    if (currentUser) {
      const newToken = uuidv4();
      currentUser.token = newToken;

      const updatedUsers = users.map(u =>
        u.email === email ? { ...u, token: newToken } : u
      );

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('token', newToken);

      setUser(currentUser);
      setToken(newToken);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const saveTodos = (todos) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u =>
      u.email === user.email ? { ...u, todos: todos } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ ...user, todos });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, saveTodos }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
