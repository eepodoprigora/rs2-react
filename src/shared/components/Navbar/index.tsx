import { NavLink } from "react-router-dom";

import "./index.css";

export const Navbar = () => {
  return (
    <ul className="navigation">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/characters">Герои</NavLink>
      </li>
      <li>
        <NavLink to="/location">Локации</NavLink>
      </li>
      <li>
        <NavLink to="/episode">Эпизоды</NavLink>
      </li>
    </ul>
  );
};
