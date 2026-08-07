import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiCall, setAuthToken, removeAuthToken } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('maktaba_token'));
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem('maktaba_lang') || 'ar');
  const [theme, setTheme] = useState(localStorage.getItem('maktaba_theme') || 'light');

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      verifySession();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Apply language direction on mount and when lang changes
  useEffect(() => {
    applyLanguageDirection(lang);
  }, [lang]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyLanguageDirection = (newLang) => {
    const html = document.documentElement;
    html.setAttribute('lang', newLang);
    html.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    // Update font family
    html.style.setProperty('--font-current', newLang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)');
    // Update body font
    document.body.style.fontFamily = newLang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)';
  };

  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const verifySession = async () => {
    try {
      const me = await apiCall('/auth/me');
      if (me.role === 'admin') {
        setCurrentAdmin(me);
        setCurrentUser(null);
      } else {
        setCurrentUser(me);
        setCurrentAdmin(null);
      }
    } catch (e) {
      setToken(null);
      removeAuthToken();
      localStorage.removeItem('maktaba_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setToken(data.token);
      setAuthToken(data.token);
      localStorage.setItem('maktaba_token', data.token);
      if (data.user.role === 'admin') {
        setCurrentAdmin(data.user);
        setCurrentUser(null);
      } else {
        setCurrentUser(data.user);
        setCurrentAdmin(null);
      }
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentAdmin(null);
    setToken(null);
    removeAuthToken();
    localStorage.removeItem('maktaba_token');
  };

  const register = async (userData) => {
    try {
      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('maktaba_lang', newLang);
    applyLanguageDirection(newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('maktaba_theme', newTheme);
    applyTheme(newTheme);
  };

  const value = {
    currentUser,
    currentAdmin,
    token,
    loading,
    lang,
    theme,
    login,
    logout,
    register,
    toggleLang,
    toggleTheme,
    isLoggedIn: !!currentUser,
    isAdmin: !!currentAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}