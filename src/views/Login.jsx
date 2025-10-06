import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/image/Logo.png";
import SideView from "../component/sideView";
import api from "../services/api";
import { useAuth } from "../component/AuthContext";

const Login = () => {
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
          toast.success(response.data.message, { position: "top-right" });
          navigate("/");
          setUserData(response.data.user);

          setFormData({ email: "", password: "" });
          setIcon(false);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              toast.error(error.response?.data?.error, { position: "top-right" });
            } else if (error.response.status === 401) {
              toast.error(error.response?.data?.error, { position: "top-right" });
              setUserId(error.response.data.user);
            } else {
              toast.error(error.response?.data?.message, { position: "top-right" });
            }
          } else if (error.request) {
            toast.error("No response received from server", { position: "top-right" });
          } else {
            console.log("Error:", error.message);
          }
          setIcon(false);
        });
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const response = await api.post("/verifyEmail", { userId, emailVerificationCode });
      setUserId("");
      setEmailVerificationCode("");
      toast.success(response.data.message, { position: "top-right" });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error, { position: "top-right" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Centered card on small screens */}
        <section className="flex flex-1 items-center justify-center bg-gray-50 md:bg-transparent">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8">
            <div className="flex items-center mb-6">
              <img src={Logo} className="w-8 mr-2" alt="banko Logo" />
              <h2 className="text-[26px] text-private font-bold font-playfair">
                Banko.
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="font-roboto w-full text-black">
              <h2 className="my-2 text-black text-[24px] font-semibold">
                Log in to your account
              </h2>
              <p className="text-[14px] text-gray-600 mb-6">
                Don’t have an account?{" "}
                <Link to={"/SignUp"} className="text-blue font-medium">
                  Register Now
                </Link>
              </p>

              {/* Email */}
              <div className="mb-4">
                <label className="text-[14px] font-bold flex justify-between">
                  <span>Email</span>
                  <span className="text-red">{errors.email}</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full outline-none border border-gray rounded-md px-3 py-2 mt-1 text-black"
                  placeholder="johndoe@gmail.com"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="text-[14px] font-bold flex justify-between">
                  <span>Password</span>
                  <span className="text-red">{errors.password}</span>
                </label>
                <div className="border relative flex border-gray rounded-md px-3 py-2 mt-1 text-black">
                <input
                  type={showPassword?"text":"password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full outline-none "
                  placeholder="Password"
                />
                 <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
      >
        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
      </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-private   transition-all text-white font-bold py-2 rounded-md shadow-md"
              >
                {icon ? (
                  <span>
                    Submitting <i className="fas fa-spinner fa-spin"></i>
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Verification Modal */}
            {userId && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                  <button
                    className="absolute top-3 right-3 text-gray-600"
                    onClick={() => setUserId("")}
                  >
                    ✕
                  </button>
                  <h2 className="text-lg mb-4">
                    Your account has not been verified, please verify your account
                  </h2>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 mb-4"
                    placeholder="Your Code"
                    value={emailVerificationCode}
                    onChange={(e) => setEmailVerificationCode(e.target.value)}
                  />
                  <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full bg-private text-white py-2 rounded-md"
                  >
                    {loading ? (
                      <span>
                        Verifying <i className="fas fa-spinner fa-spin"></i>
                      </span>
                    ) : (
                      "Verify Email"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Side Image/Content on Desktop */}
        <div className="hidden md:flex w-1/2 bg-gray-100">
          <SideView />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
