import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-provider";

export const AuthStatus = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  console.log(auth);

  const handleSignout = () => {
    auth?.signout(() => {
      navigate("/");
    });
  };

  // console.log(auth?.user);
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
