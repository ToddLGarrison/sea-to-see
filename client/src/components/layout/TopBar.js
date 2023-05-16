import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text sea-to-see">Sea to See</li>
          <li className="menu-text">
              <Link to="/">Home</Link>
            </li>
        </ul>
      </div>

      <div className="top-bar-right">
        {user ?(
          <ul className="dropdown menu">
            <li>
              <div className="menu-text">
                <button onClick={toggleDropDown} className="username user-greeting">
                    Hello {user?.username}!
                </button>
                {showDropDown && (
                  <ul className="dropdown-menu">
                    <li className="menu-text">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <a key="sign-out" className="sign-out-button"> <SignOutButton /></a>
                    </li>
                  </ul>
                )}
              </div>
            </li>
        </ul>
        ) : (
          <ul className="menu">
            <li className="menu-text">
              <Link to="/user-sessions/new">Sign In</Link>
            </li>
            <li className="menu-text">
              <Link to="/users/new">Sign Up</Link>
            </li>
          </ul>
        ) }
      </div>
    </div>
  );
};

export default TopBar;