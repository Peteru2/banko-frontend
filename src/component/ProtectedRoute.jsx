import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get('/');
        setIsLoading(false);
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login');
        } else {
        }
      }
    };

    verifyToken();
  }, [navigate]);

  return isLoading ? null : <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
