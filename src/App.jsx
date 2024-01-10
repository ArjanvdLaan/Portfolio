import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Page1 from "./components/Inspirational Homepage/Page1";
import Page2 from "./components/SongSaver/Page2";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard.jsx";
import Dropdown from "./components/Dropdown";
import "./App.css";

function MainContent() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  let page;

  switch (location.pathname) {
    case "/":
      page = "home";
      break;
    case "/page1":
      page = "page1";
      break;
    case "/page2":
      page = "page2";
      break;
    case "/page3":
      page = "page3";
      break;
    default:
      page = "";
  }

  return (
    <div className="parent">
      <div className={`content ${isHovered ? "blurred" : ""}`}>
        <Dropdown
          className="dropdown"
          items={["Home", "Page1", "Page2", "Page3"]}
          setIsHovered={setIsHovered}
          page={page}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3/*" element={<StudentDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
