  import { BrowserRouter as Router  } from "react-router-dom";
  import { GoogleOAuthProvider } from "@react-oauth/google";
  import AuthContextProvider from "./auth/AuthContext";
  import { ThemeProvider } from "./context/ThemeContext";
  import AnimatedRoutes from "./AnimatedRoutes";
  
  import "./style.css";
  
  function App() {

  
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Router>
          <AuthContextProvider>
            <ThemeProvider>
             <AnimatedRoutes />
            </ThemeProvider>
          </AuthContextProvider>
        </Router>
      </GoogleOAuthProvider>
    );
  }

  export default App;
