import Cookies from 'js-cookie';
import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router';
export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = Cookies.get('access_token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return children;
}
