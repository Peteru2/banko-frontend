import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/image/Logo.png";
import api from "../services/api";
import Swal from "sweetalert2";
import GoogleAuth from "../auth/GoogleAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState(false);
  const [userId, setUserId] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle signup
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^(\+?\d{1,4})?\d{10,14}$/;

    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    else if (!formData.lastname.trim())
      newErrors.lastname = "Last name is required";
    else if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    else if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number";
    else if (!formData.password.trim())
      newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIcon(true);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/signUp`, formData)
      .then((response) => {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          password: "",
        });

        Swal.fire({
          icon: "success",
          title: "Account Created 🎉",
          text: "Please verify your email to continue.",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        setUserId(response.data?.user?._id);
        setIcon(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Something went wrong",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        setIcon(false);
      });
  };

  // handle verification
  const handleVerify = async () => {
    try {
      setLoading(true);
      const response = await api.post("/verifyEmail", {
        userId,
        emailVerificationCode,
      });

      Swal.fire({
        icon: "success",
        title: "Email Verified!",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setUserId("");
      setEmailVerificationCode("");
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.response?.data?.error || "Invalid verification code.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-grayLight dark:bg-neutral-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <section className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-700 p-6 sm:p-8 space-y-6">
            {/* Logo + Title */}
            <div className="flex items-center gap-1">
              <div className="h-10 w-10 rounded-md bg-private flex items-center justify-center text-white font-bold">
                B
              </div>
              <div className="text-lg font-bold">Bankoo</div>
            </div>

            <h1 className="text-xl font-semibold mb-2">Create your account</h1>
            <p className="text-gray-500 dark:text-private text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-private dark:text-private font-medium hover:underline"
              >
                Login now
              </Link>
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-roboto">
              {["firstname", "lastname", "email", "phoneNumber", "password"].map(
                (field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1 capitalize">
                      {field === "phoneNumber" ? "Phone Number" : field}
                      {errors[field] && (
                        <span className="text-red text-xs ml-1">
                          • {errors[field]}
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type={
                          field === "password"
                            ? showPassword
                              ? "text"
                              : "password"
                            : "text"
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                        placeholder={
                          field === "firstname"
                            ? "John"
                            : field === "lastname"
                            ? "Doe"
                            : field === "email"
                            ? "you@example.com"
                            : field === "phoneNumber"
                            ? "08012345678"
                            : "••••••••"
                        }
                      />
                      {field === "password" && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <i
                            className={`fa ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}

              <button
                type="submit"
                disabled={icon}
                className="w-full bg-private hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-md transition-all shadow-sm"
              >
                {icon ? (
                  <span>
                    Creating Account <i className="fas fa-spinner fa-spin ml-1"></i>
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mt-4">
              <span className="mx-2">or</span>
            </div>
            <div className="flex justify-center">
              <GoogleAuth />
            </div>
          </div>
        </section>
      </div>

      {/* Email Verification Modal */}
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
              Verify your email to activate your account
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

export default SignUp;
