import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown({ items, setIsHovered }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

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
        <div className="hamburger-icon">☰</div>
        {isOpen && (
          <div className="dropdown-menu">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="dropdown-item"
                onClick={{handleClick}}
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
