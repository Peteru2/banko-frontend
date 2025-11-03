import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";
import getUserDashboardData from "../services/userServices";
import themedSwal from "../utils/themedSwal"
import {useTheme} from "../context/ThemeContext"
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { theme  } = useTheme()

  useEffect(() => {
    if (token === null) {
    navigate("/login", { replace: true });
  } else {
    fetchData();
  }
  }, [token]);

  const fetchData = async () => {
      setLoading(true)

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

  const login = async (data) => {
  try {
    localStorage.setItem("token", data.token);
    if (data.user) {
      setUserData(data.user);
    }
    themedSwal({
      icon: "success",
      title: "Welcome!",
      text: `Hello, ${data?.user?.lastname || "User"}`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }, theme)

    navigate("/");
  } catch (err) {
    console.error("Login failed:", err);
    themedSwal({
      icon: "error",
      title: "Oops!",
      text: "Login failed. Please try again.",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    },theme)
  }
};
  const logout = async () => {
  try {
    const res = await api.post("/logout"); 
    themedSwal({
       icon: "success",
                 title: "Success!",
                 text: res?.data?.message || "User Loggod out successfully",
                 showConfirmButton: false,  
                 timer: 2000,               
                 timerProgressBar: true,
    }, theme)
    
              
  } catch (err) {
    console.error("Logout failed", err);
    theme({
       icon: "error",
                 title: "opps!",
                 text: err?.response?.data?.message,
                 showConfirmButton: false,  
                 timer: 2000,               
                 timerProgressBar: true,
    }, theme)
    
  } finally {
    localStorage.removeItem("token");
    navigate("/login");
    
  }
};

  return (
    <AuthContext.Provider
      value={{  
        login, 
        logout, 
        userData, 
        fetchData, 
        setUserData, 
        token, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };

  export default AuthContextProvider;
