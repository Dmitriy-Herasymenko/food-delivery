import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { LogIn } from "./pages";

export const App = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
};


