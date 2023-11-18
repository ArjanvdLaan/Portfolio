import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "./components/Home";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  console.log("is open state:", isOpen);
  return (
    <>
      <Router>
        <div>
          <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
            &#9776;
          </button>

          <div className={`menu-sidebar ${isOpen ? "open" : ""}`}>
            <nav>
              <ul>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/page1" onClick={() => setIsOpen(false)}>
                    Page 1
                  </Link>
                </li>
                <li>
                  <Link to="/page2" onClick={() => setIsOpen(false)}>
                    Page 2
                  </Link>
                </li>
                <li>
                  <Link to="/page3" onClick={() => setIsOpen(false)}>
                    Page 3
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <Routes>
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
