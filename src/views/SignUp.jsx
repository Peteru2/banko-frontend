import { useState } from "react";
import axios from "axios";
import Logo from "../assets/image/Logo.png";
import SideView from "../component/sideView";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

const SignUp = () => {
  const [icon, setIcon] = useState(false);
  const [userId, setUserId] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    } else if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    } else if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber) || formData.phoneNumber.length !== 11) {
      newErrors.phoneNumber = "Invalid phone number";
    } else if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must not be less than 8 characters";
    } else {
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
          // setUserId(response.data.user._id)
          Swal.fire({
              icon: "success",
              title: "Success!",
              text: "User account created",
            });
      setTimeout(() => navigate("/login"), 1100);
          setIcon(false);
        })
        .catch((error) => {
          Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.response?.data?.error ,
  });
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
    Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
      });
      setTimeout(() => navigate("/login"), 1100);
    } catch (error) {
     Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.response?.data?.error ,
  });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
       
        <section className="flex flex-1 justify-center items-center p-6">
          <div className="w-full max-w-md">
           
            

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6 md:p-8 font-roboto"
            >
              <div className="flex items-center mb-4">
              <img src={Logo} className="w-8 mr-2" alt="banko Logo" />
              <h2 className="text-2xl font-bold font-playfair text-private">Banko.</h2>
            </div>
              <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-private">
                Create your account
              </h2>
              <p className="text-sm text-center mb-6">
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue font-semibold">
                  Login now
                </Link>
              </p>
    

{["firstname", "lastname", "email", "phoneNumber", "password"].map((field, idx) => (
  <div className="mb-4 relative" key={idx}>
    <input
      type={field === "password" && showPassword ? "text" : field === "password" ? "password" : "text"}
      name={field}
      value={formData[field]} 
      onChange={handleInputChange}
      placeholder={
        field === "firstname"
          ? "First Name"
          : field === "lastname"
          ? "Last Name"
          : field === "email"
          ? "Email"
          : field === "phoneNumber"
          ? "Phone Number"
          : "Password"
      }
      className="w-full border border-gray rounded-md px-4 py-2 text-black outline-none focus:ring-2 focus:ring-blue-500"
    />
    {field === "password" && (
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-opacity-70 text-black hover:text-black"
      >
        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
      </button>
    )}

    {errors[field] && (
      <p className="text-red text-sm mt-1">{errors[field]}</p>
    )}
  </div>
))}


              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-private font-bold text-white py-2 rounded-md hover:bg-opacity-90 transition"
              >
                {icon ? (
                  <span>
                    Submitting <i className="fas fa-spinner fa-spin"></i>
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* OTP Modal */}
            {userId && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3">
                  Please enter your Email verification Code
                </h2>
                <input
                  type="text"
                  className="w-full border px-4 py-2 rounded-md mb-3 outline-none focus:ring-2 focus:ring-blue-500"
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
            )}
          </div>
        </section>

       
        <div className="hidden md:flex flex-1">
          <SideView />
        </div>
      </div>
      
    </>
  );
};

export default SignUp;
