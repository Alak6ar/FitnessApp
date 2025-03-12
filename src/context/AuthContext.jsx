import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const LOGIN_URL = "http://alihuseyn1-001-site1.otempurl.com/api/Auth/Login";
const REFRESH_URL = "http://alihuseyn1-001-site1.otempurl.com/api/Auth/Refresh";  
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = "admin";
  const password = "Admin_123";

  const login = async () => {
    try {
      const response = await axios.post(LOGIN_URL, {
        usernameOrEmail: username,
        password: password,
      });
      const { token: newToken, refreshToken } = response.data;
      setToken(newToken);
      setError(null);
      localStorage.setItem("token", newToken);
      localStorage.setItem("refresh_token", refreshToken);
    } catch (err) {
      setError("Giriş başarısız.");
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    const savedRefreshToken = localStorage.getItem("refresh_token");
    if (!savedRefreshToken) {
      setError("Yeniden giriş yapmanız gerekiyor.");
      return;
    }

    try {
      const response = await axios.post(REFRESH_URL, { refreshToken: savedRefreshToken });
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      setError(null);
    } catch (err) {
      setError("Token yenileme işlemi başarısız.");
    }
  };

  // Axios interceptor kullanarak token'ı kontrol et ve yenile
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          // 401 hatası alındığında refresh token ile yeni access token al
          await refreshToken();
          return axios(error.config); // Yeni token ile tekrar dene
        }
        return Promise.reject(error);
      }
    );
  }, [token]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, error, username, password }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext'i kullanmak için özel hook
export const useAuth = () => {
  return useContext(AuthContext);
};
