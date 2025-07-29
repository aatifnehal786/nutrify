// components/AutoRedirect.jsx
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

    if (storedUser && isOnLoginPage) {
      navigate("/track");
    }
  }, [location.pathname, navigate]);

  return null; // Nothing rendered
};

export default AutoRedirect;
