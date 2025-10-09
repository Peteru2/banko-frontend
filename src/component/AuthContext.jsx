import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const [userRes, balanceRes, historyRes] = await Promise.all([
        api.get("/user", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/balance"),
        api.get("/trans-history"),
      ]);

      setUserData({
        ...userRes.data.user,
        balance: balanceRes.data.balance,
        accountNum: balanceRes.data.accountNum,
        transferHistory: historyRes.data.transferHistory || [],
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ logout, userData, fetchData, setUserData, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };

  export default AuthContextProvider;
