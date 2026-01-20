import { useContext } from "react";
import type { AuthProviderProps } from "../../../Services/INTERFACES";
import AuthContext from "../../../Contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }: AuthProviderProps) {
  const { loginData } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  } else if (
    token ||
    (loginData && localStorage.getItem("loginUserData") === "admin")
  ) {
    return <>{children}</>;
  } else if (
    token ||
    (loginData && localStorage.getItem("loginUserData") === "customer")
  ) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/login" />;
  }
};

