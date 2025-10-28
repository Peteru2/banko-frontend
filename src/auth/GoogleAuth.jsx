import React, {useContext,useEffect} from 'react'
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