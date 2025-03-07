import React from "react";
import { ChevronLeft } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ headerTitle, title, backNavigation }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="header">
      <div className="left-section">
        {backNavigation && (
          <button className="back-button" onClick={handleBackClick}>
            <ChevronLeft />
          </button>
        )}
        <span className="header-title">{headerTitle}</span>
      </div>
      <div className="center-section">
        <span className="task-title">{title}</span>
      </div>
      <div className="right-section">
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Header;
