import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContextProvider from "./auth/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import "./style.css";
import Deposits from "./component/footer/Deposits";
import History from "./component/footer/History";
import Profile from "./views/Profile";
import Notification from "./component/Notification";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <AuthContextProvider>
          <ThemeProvider>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/deposits" element={<Deposits />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
          </ThemeProvider>
        </AuthContextProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
