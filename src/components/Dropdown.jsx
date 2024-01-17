import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown({ items, isHovered, setIsHovered, page }) {
  console.log(page);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

  // Convert page to a valid CSS class name
  let pageName = page.toLowerCase().replace(/\s+/g, "");
  console.log(pageName)

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown ${isOpen ? "open" : ""}`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) {
            setIsHovered(false);
          } else {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className={`hamburger-icon ${pageName}`}>☰</div>
        {isOpen && (
          <div
            className={`dropdown-menu ${pageName} ${isOpen ? "open" : ""}`}
            onMouseLeave={() => setIsHovered(false)}
          >
            {items.map((item, index) => (
              <Link
                key={index}
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.replace(/\s+/g, "").toLowerCase()}`
                }
                className={`dropdown-item ${pageName} ${isOpen ? "open" : ""}`}
                onClick={handleClick}
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