import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";
import getUserDashboardData from "../services/userServices";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
    navigate("/login", { replace: true });
  } else {
    fetchData();
  }
  }, [token]);

  const fetchData = async () => {
    try {
      const data = await getUserDashboardData()
      setUserData(data);

    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    }
    finally{
      setLoading(false)
  }
  };

  const logout = async () => {
  try {
    const res = await api.post("/logout"); 
    Swal.fire({
                 icon: "success",
                 title: "Success!",
                 text: res?.data?.message || "User Loggod out successfully",
                 showConfirmButton: false,  
                 timer: 2000,               
                 timerProgressBar: true,
               });
               console.log(res?.data?.message)
  } catch (err) {
    console.error("Logout failed", err);
    Swal.fire({
                 icon: "error",
                 title: "opps!",
                 text: err?.response?.data?.message,
                 showConfirmButton: false,  
                 timer: 2000,               
                 timerProgressBar: true,
               });
  } finally {
    localStorage.removeItem("token");
    navigate("/login");
    
  }
};

  return (
    <AuthContext.Provider
      value={{ logout, userData, fetchData, setUserData, token, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };

  export default AuthContextProvider;
