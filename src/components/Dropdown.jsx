import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown({ items, isHovered, setIsHovered, page }) {
  console.log(page);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsHovered(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen, setIsHovered]);

  // Convert page to a valid CSS class name
  let pageName = page.toLowerCase().replace(/\s+/g, "");
  console.log("pageName:", pageName);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
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
             <a className={`dropdown-item ${pageName} ${isOpen ? "open" : ""}`}  href="/Film-finder/index.html">Film Finder</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
