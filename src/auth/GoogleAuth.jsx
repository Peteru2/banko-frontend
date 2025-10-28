import React, {useContext} from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import api from "../services/api"
import { AuthContext } from "../auth/AuthContext";

const GoogleAuth = () => {
  const { login } = useContext(AuthContext)
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwtDecode(token);
    const res = await api.post(`${import.meta.env.VITE_BASE_URL}/googleSignUp`, {
      token,
    });

      login(res.data)
      console.log(res.data);
  };

  useEffect(() => {
    if (!window.google) return;
    const container = document.getElementById("googleBtn");
    container.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleSuccess,
      auto_select: false,
      cancel_on_tap_outside: false,
    });
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.warn("Google prompt not displayed on mobile");
        }
      });
    } else {
      window.google.accounts.id.renderButton(container, {
        theme: "filled_black",
        size: "large",
        text: "continue_with",
        shape: "pill",
      });
    }
  }, []);

  const handleError = () => {
      console.log('Login Failed');
  };

  return (
    <GoogleLogin
  onSuccess={handleSuccess}
  onError={handleError}
  theme="filled_blue"
  size="large"
  text="signin_with"
  shape="pill"
  width="250"
/>
  );
}

export default GoogleAuth;