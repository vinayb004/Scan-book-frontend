import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            SCAN BOOK
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/searchbook"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Searchbook
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/allbooks"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Allbooks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/addbook"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Addbook
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink
                exact
                to="/updatebook"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Updatebook
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/deletebook"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Deletebook
              </NavLink>
            </li>
           
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
