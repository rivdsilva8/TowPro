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

  const signout = async () => {
    try {
      await doSignOut(); // Wait for sign-out operation to complete
      navigate("/"); // Redirect to home page after signing out
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error, if any
    }
  };

  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          TowPro
        </Link>{" "}
        |
        <Link to="/draw" className="btn btn-ghost text-xl">
          Map
        </Link>
      </div>
      <div className="flex-none">
        <button onClick={signout} className="btn btn-ghost text-xl">
          Sign Out
        </button>
      </div>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          TowPro
        </Link>{" "}
        |
        <Link to="/map" className="btn btn-ghost text-xl">
          Map
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/login" className="btn btn-ghost text-xl">
          Login
        </Link>
        |
        <Link to="/signup" className="btn btn-ghost text-xl">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
