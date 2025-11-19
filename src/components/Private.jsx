import { Navigate } from "react-router-dom";

export default function Private({ Component }) {

  const storedUser =
    JSON.parse(localStorage.getItem("nutrify-user")) ||
    JSON.parse(sessionStorage.getItem("nutrify-user"));

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
}
