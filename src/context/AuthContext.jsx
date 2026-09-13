import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const STORAGE_KEY_AUTH = 'landslideGuard.auth';

export const PROTOTYPE_USER = {
  name: "Ayush Jha",
  role: "Project Administrator",
  username: "admin",
  initials: "AJ",
  accountType: "Prototype Account"
};

export const DEMO_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize and restore session safely on startup
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEY_AUTH);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.isAuthenticated === true && parsed.user) {
            setUser(parsed.user);
            setIsAuthenticated(true);
          } else {
            // Malformed data: clean up
            localStorage.removeItem(STORAGE_KEY_AUTH);
          }
        } else {
          // Check sessionStorage for non-remembered session
          const sessionStored = sessionStorage.getItem(STORAGE_KEY_AUTH);
          if (sessionStored) {
            const parsedSession = JSON.parse(sessionStored);
            if (parsedSession && parsedSession.isAuthenticated === true && parsedSession.user) {
              setUser(parsedSession.user);
              setIsAuthenticated(true);
            }
          }
        }
      }
    } catch (e) {
      console.warn('Malformed auth session in storage, resetting:', e);
      try {
        localStorage.removeItem(STORAGE_KEY_AUTH);
        sessionStorage.removeItem(STORAGE_KEY_AUTH);
      } catch (_) {}
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Prototype login function
   * @param {string} username 
   * @param {string} password 
   * @param {boolean} rememberMe 
   */
  const login = useCallback(async (username, password, rememberMe = true) => {
    // Trim inputs
    const u = (username || '').trim();
    const p = password || '';

    // Field validations
    if (!u) {
      return { success: false, error: 'Username is required.' };
    }
    if (!p) {
      return { success: false, error: 'Password is required.' };
    }

    // Validate against prototype credentials
    if (u.toLowerCase() === DEMO_CREDENTIALS.username.toLowerCase() && p === DEMO_CREDENTIALS.password) {
      const authUser = {
        ...PROTOTYPE_USER,
        username: u
      };

      setUser(authUser);
      setIsAuthenticated(true);

      const sessionPayload = {
        isAuthenticated: true,
        user: authUser,
        rememberMe: !!rememberMe
      };

      try {
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(sessionPayload));
          sessionStorage.removeItem(STORAGE_KEY_AUTH);
        } else {
          sessionStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(sessionPayload));
          localStorage.removeItem(STORAGE_KEY_AUTH);
        }
      } catch (e) {
        console.warn('Failed to persist auth session to storage:', e);
      }

      return { success: true, user: authUser };
    }

    // Invalid credentials (generic message for security best practice)
    return { success: false, error: 'Invalid username or password.' };
  }, []);

  /**
   * Prototype logout function
   * Only clears authentication state; leaves sensor telemetry, settings, and theme intact.
   */
  const logout = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY_AUTH);
        sessionStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.warn('Error clearing auth storage:', e);
    }
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    demoCredentials: DEMO_CREDENTIALS
  };

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext;
