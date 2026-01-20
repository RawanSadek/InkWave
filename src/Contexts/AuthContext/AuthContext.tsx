import { createContext, useEffect, useState } from "react";
import { type loginFormData, type authContextType, type AuthProviderProps } from "../../Services/INTERFACES";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext<authContextType>({
  loginData: null,
  getLoginData: () => {},
  logout: () => {},
});

export function AuthcontextProvider ({children}:AuthProviderProps){
    const [loginData, setLoginData] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });

  const getLoginData = () => {
    const encodedData = localStorage.getItem('token');
    if (!encodedData) return;
    const decodedData = jwtDecode(encodedData);
    setLoginData(decodedData);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) getLoginData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/login" />;
  };

  return <AuthContext.Provider value={{loginData, getLoginData, logout}}>{children}</AuthContext.Provider>

}