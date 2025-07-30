import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AutoRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("nutrify-user")) ||
      JSON.parse(sessionStorage.getItem("nutrify-user"));

    const isOnLoginPage =
      location.pathname === "/" || location.pathname === "/login";

    // ✅ Redirect only if user is logged in and not already on /track
    if (storedUser && isOnLoginPage) {
      navigate("/track", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default AutoRedirect;
