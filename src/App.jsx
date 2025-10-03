import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './views/SignUp';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import "./style.css"
import AuthContextProvider from "./component/AuthContext"
import Deposits from './component/footer/Deposits';
import History from './component/footer/History';
import SentimentApp from './views/SentimentApp';


function App() {

  return (
      <>     
     
      
     
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/deposits" element={<Deposits />} />
              <Route path="/history" element={<History />} />
              <Route path="/sentiment" element={<SentimentApp />} />



            </Routes>
        </AuthContextProvider>

        </Router>
      </>

  );
}

export default App;
