import { useNavigate } from "react-router-dom";
import { useAuth } from "../model/useAuth";

import "./AuthStatus.css";

export const AuthStatus = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    auth?.signout(() => {
      navigate("/");
    });
  };

  return (
    <div>
      {auth?.user && (
        <>
          <span style={{ marginRight: "10px" }}>{auth.user}</span>
          <button className="auth-button" onClick={handleSignout}>
            logout
          </button>
        </>
      )}
      {!auth?.user && (
        <button className="auth-button" onClick={() => navigate("/login")}>
          login
        </button>
      )}
    </div>
  );
};
