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
      page = "Home";
      break;
    case "/inspirationalhomepage":
      page = "Inspirational Homepage";
      break;
    case "/Film-finder/index.html":
      page = "Film Finder";
      break;
    case "/project3":
      page = "Project 3";
      break;
    default:
      page = "";
  }

  return (
    <div className="parent">
      <div className={`content ${isHovered ? "blurred" : ""}`}>
        <Dropdown
          className="dropdown"
          items={["Home", "Inspirational Homepage"]}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          page={page} 
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inspirationalhomepage" element={<Page1 />} />
          <Route path="/project2" element={<Page2 />} />
          <Route path="/project3/*" element={<StudentDashboard />} />
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
