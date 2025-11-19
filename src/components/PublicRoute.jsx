import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function PublicRoute({ Component }) {
  const loggedData = useContext(UserContext);

  return loggedData.loggedUser !== null
    ? <Navigate to="/track" replace={true} />
    : <Component />;
}
