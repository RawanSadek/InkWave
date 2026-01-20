import { createContext, useEffect, useState } from "react";
import {
  type authContextType,
  type AuthProviderProps,
} from "../../Services/INTERFACES";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const AuthContext = createContext<authContextType>({
  loginData: null,
  getLoginData: () => {},
  logout: () => {},
});

export function AuthcontextProvider({ children }: AuthProviderProps) {
  // const [userProfile, setUserProfile] = useState<profileData | null>(null);
  const [loginData, setLoginData] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });

  const getLoginData = () => {
    const encodedData = localStorage.getItem("token");
    if (!encodedData) return;
    const decodedData = jwtDecode(encodedData);
    setLoginData(decodedData);

    const loginUserData = localStorage.getItem("userData");
    setLoginData(loginUserData ? JSON.parse(loginUserData) : null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const getDecodedData = async () => {
      getLoginData();
    };

    getDecodedData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider value={{ loginData, getLoginData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
