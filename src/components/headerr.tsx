import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="container">
      <NavLink className="button" to="/" style={{ marginRight: "20px" }}>
        Вход
      </NavLink>
      <NavLink className="button" to="/signup">
        Регистрация
      </NavLink>
    </div>
  );
};
