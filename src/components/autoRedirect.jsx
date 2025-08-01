import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoRedirect = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("nutrify-user")) ||
      JSON.parse(sessionStorage.getItem("nutrify-user"));

    

    // ✅ Redirect only if user is logged in and not already on /track
    if (storedUser) {
      navigate("/track", { replace: true });
    }
  }, []);

  return null;
};

export default AutoRedirect;
