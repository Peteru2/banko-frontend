import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/image/Logo.png";
import SideView from "../component/sideView";
import api from "../services/api";
import { useAuth } from "../auth/AuthContext";
import Swal from "sweetalert2";
import GoogleAuth from "../auth/GoogleAuth";
import {useTheme} from "../context/ThemeContext"
import themedSwal from "../utils/themedSwal"
const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme()

  const [icon, setIcon] = useState(false);
  const [userId, setUserId] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;      

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must not be less than 8 characters";
    } else {
      setIcon(true);
      axios
            .post(`${import.meta.env.VITE_BASE_URL}/login`, formData)
            .then((response) => {
              const { token } = response.data;
              localStorage.setItem("token", token);
              themedSwal({
                icon: "success",
                title: "Welcome Back!",
                text: response.data.message,
                showConfirmButton: false,
                  timer: 2000,
                timerProgressBar: true,
              }, theme)
         
          navigate("/");
          setUserData(response.data.user);
          setFormData({ email: "", password: "" });
          setIcon(false);
        })
        .catch((error) => {
          const errMsg =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Login failed";
            themedSwal({
              icon: "error",
            title: "Oops...",
            text: errMsg,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            }, theme)
          setIcon(false);
        });
    }
    setErrors(newErrors);
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const response = await api.post("/verifyEmail", {
        userId,
        emailVerificationCode,
      });
      setUserId("");
      setEmailVerificationCode("");
      themedSwal({
        icon: "success",
        title: "Success!",
        text: response.data.message,
      })
     
      navigate("/login");
    } catch (error) {
      themedSwal({
         icon: "error",
        title: "Oops...",
        text: error.response?.data?.error,
      })
      
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-grayLight dark:bg-neutral-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
       
        <section className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-700 p-6 sm:p-8 space-y-6">
            {/* Logo + Title */}
            <div className="flex items-center  gap-1">
                <div className="h-10 w-10 rounded-md bg-private flex items-center justify-center text-white font-bold">
                  B
                </div>
                <div className="text-lg font-bold">Bankoo</div>
                </div>

            <h1 className="text-xl font-semibold mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-neutral-400 text-sm">
              Log in to access your Bankoo account.
            </p>

         
            <form onSubmit={handleSubmit} className="space-y-5 font-roboto">
           
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                  {errors.email && (
                    <span className="text-red text-xs ml-1">
                      • {errors.email}
                    </span>
                  )}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

            
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                  {errors.password && (
                    <span className="text-red text-xs ml-1">
                      • {errors.password}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

         
              <button
                type="submit"
                disabled={icon}
                className="w-full bg-private text-white font-semibold py-2.5 rounded-md transition-all shadow-sm"
              >
                {icon ? (
                  <span>
                    Signing in <i className="fas fa-spinner fa-spin ml-1"></i>
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

    
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mt-4">
              <span className="mx-2">or</span>
            </div>
            <div className="flex justify-center">
              <GoogleAuth />
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-gray-500 dark:text-neutral-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-private dark:text-private font-medium hover:underline"
              >
                Register Now
              </Link>
            </p>
          </div>
        </section>

    
        
      </div>

    
      {userId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl w-[90%] max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setUserId("")}
            >
              ✕
            </button>
            <h2 className="text-lg font-medium mb-4">
              Please verify your email to activate your account
            </h2>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mb-4 bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-700"
              placeholder="Enter verification code"
              value={emailVerificationCode}
              onChange={(e) => setEmailVerificationCode(e.target.value)}
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-private hover:bg-emerald-600 text-white font-semibold py-2 rounded-md transition"
            >
              {loading ? (
                <span>
                  Verifying <i className="fas fa-spinner fa-spin ml-1"></i>
                </span>
              ) : (
                "Verify Email"
              )}
            </button>
          </div>
        </div>
      )}


    </>
  );
};

export default Login;
