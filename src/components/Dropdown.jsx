import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown({ items, setIsHovered, page }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

  // Convert page to a valid CSS class name
  let className = page.toLowerCase().replace(/\s+/g, '');

  return (
    <div className="dropdown-container">
      <div
        className="dropdown"
        onMouseEnter={() => {
          setIsOpen(true);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
          setIsHovered(false);
        }}
      >
        <div className={`hamburger-icon ${className}`}>☰</div>
        {isOpen && (
          <div className={`dropdown-menu ${className}`}>
            {items.map((item, index) => (
              <Link
                key={index}
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.replace(/\s+/g, "").toLowerCase()}`
                }
                className={`dropdown-item ${className}`}
                onClick={ handleClick }
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;