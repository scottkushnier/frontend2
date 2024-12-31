import { Link } from "react-router-dom";
import { useContext } from "react";

import UserContext from "./UserContext";

function NavBar({ highlight = "none" }) {
  const user = useContext(UserContext).user;
  if (!user) {
    // different menu items depending if logged in or not
    return (
      <div className="navbar">
        <ul className="navbar-ul">
          <li
            className={
              highlight == "home" ? "highlight navbar-li" : "navbar-li"
            }
          >
            <Link to="/"> Home </Link>
          </li>
          <li
            className={
              highlight == "login" ? "highlight navbar-li" : "navbar-li"
            }
          >
            <Link to="/login">Login</Link>
          </li>
          <li
            className={
              highlight == "signup" ? "highlight navbar-li" : "navbar-li"
            }
          >
            <Link to="/signup">Sign Up </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <ul className="navbar-ul">
          <li
            className={
              highlight == "home" ? "highlight navbar-li" : "navbar-li"
            }
          >
            <Link to="/"> Home </Link>
          </li>
          <li
            className={
              highlight == "companies" ? "highlight navbar-li" : "navbar-li"
            }
          >
            <Link to="/companies">Companies</Link>
          </li>
          <li
            className={
              highlight == "jobs" ? "highlight navbar-li" : "navbar-li"
            }
          >
            <Link to="/jobs"> Jobs </Link>
          </li>
          <li
            className={
              highlight == "profile" ? "highlight navbar-li" : "navbar-li"
            }
          >
            <Link to="/profile"> Profile</Link>
          </li>
          <li className="navbar-li">
            <Link to="/signout"> Sign Out&thinsp; ({user.username}) </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
