import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUser } from '..//components/Redux/userSlice.js'; // Import updateUser action

const Authentication = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    dispatch(updateUser(null)); // Dispatch updateUser action from Redux to update currentUser
    toast.error("Logged Out");
    navigate('/login');
  };

  return (
    <Authentication.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </Authentication.Provider>
  );
}

const useAuth = () => useContext(Authentication);

export { Authentication, AuthProvider, useAuth };
