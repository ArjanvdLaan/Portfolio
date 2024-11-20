import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Page1 from "./components/Inspirational Homepage/Page1";
import TopComponent from "./components/RedditClient/TopComponent";
import Dropdown from "./components/Dropdown";
import "./App.css";

function MainContent() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  let page;

  // This switch statement is used to determine the current page based on the URL pathname, 
  // as to set the correct page name for the dropdown menu and the styling of the content.
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
    case "/redditclient":
      page = "Reddit Client";
      break;
    default:
      page = "";
  }

  return (
    <div className="parent">
      <div className={`content ${isHovered ? "blurred" : ""}`}>
        <Dropdown
          className="dropdown"
          items={["Home", "Inspirational Homepage", "Reddit Client" ]}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          page={page} 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inspirationalhomepage" element={<Page1 />} />
          <Route path="/redditclient/*" element={<TopComponent isOpen={isOpen} setIsOpen={setIsOpen} />} />
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
