import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Dropdown from "./components/Dropdown";
import "./App.css";

function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Router>
      <div className="app">
        <Dropdown items={["Home", "Page1", "Page2", "Page3"]} setIsHovered={setIsHovered}/>
        <div className={`content ${isHovered ? 'blurred' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;