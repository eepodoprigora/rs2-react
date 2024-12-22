import { FormEvent } from "react";
import { useAuth } from "../context/auth-provider";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string | null;

    if (username) {
      auth?.signin(username, () => {});
      navigate(from, {
        replace: true,
      });
    } else {
      console.error("Username is required");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" />
      <button>Login</button>
    </form>
  );
};

export default Login;
