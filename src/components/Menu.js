import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@mui/icons-material";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("email");

    if (emailFromUrl) {
      localStorage.setItem("userEmail", emailFromUrl);
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsMenuOpen(false);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    // Added a dynamic class to the main wrapper to control the height of the whole bar
    <div className={`menu-container ${isMenuOpen ? "is-open" : ""}`}>
      <div className="menu-header">
        <img src="logo.png" className="logo-img" alt="logo" />
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </div>
      </div>

      <div className={`menus ${isMenuOpen ? "is-open" : ""}`}>
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr className="mobile-hr" />

        <div className="profile">
          <a
            href="https://zerodha-frontend-xi.vercel.app/"
            className="avatar-link"
            style={{ textDecoration: "none" }}
          >
            // Inside your profile div
            <div
              className="avatar"
              style={{
                backgroundColor: "#fff5f5", // Light red tint
                border: "1px solid #ffe3e3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <LogoutIcon style={{ fontSize: "1.1rem", color: "#eb5757" }} />
            </div>
          </a>
          <p className="username">
            {localStorage.getItem("userEmail") || "USERID"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
