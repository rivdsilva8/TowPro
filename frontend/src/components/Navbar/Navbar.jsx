import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/FirebaseFunctions";
import { AuthContext } from "../../firebase/Auth";
export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};
const NavigationAuth = () => {
  const navigate = useNavigate();
  const signout = () => {
    doSignOut();
    navigate("/");
  };
  return (
    <>
      <nav className="title">
        <ul>
          <li>
            <Link to="/" className="playlist-hub">
              PlaylistHub
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="navbar">
        <ul>
          <li>
            <button className="btn" onClick={() => navigate("/account")}>
              Account
            </button>
          </li>
          <li>
            <button className="btn" type="button" onClick={signout}>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
const NavigationNonAuth = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="title">
        <ul>
          <li>
            <Link to="/" className="playlist-hub">
              PlaylistHub
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="navbar">
        <ul>
          <li>
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
