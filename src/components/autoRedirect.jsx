import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AutoRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("nutrify-user")) ||
      JSON.parse(sessionStorage.getItem("nutrify-user"));

    // Only redirect from /login or /register
    const publicOnlyPaths = ["/login", "/register", "/forgot-password"];

    if (storedUser && publicOnlyPaths.includes(location.pathname)) {
      navigate("/track", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default AutoRedirect;
