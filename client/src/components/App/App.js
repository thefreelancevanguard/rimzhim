import Header from "../Header/Header";
import MakePost from "../MakePost/MakePost";
import "./App.css";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import Tree from "../FamilyTree/Tree/Tree";

function App() {
  const { theme } = useTheme();
  const [showPostBox, setShowPostBox] = useState(false);

  return (
    <div
      className={`app-container ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <Header setShowPostBox={setShowPostBox} />
      <MakePost showPostBox={showPostBox} setShowPostBox={setShowPostBox} />
      <Tree />
    </div>
  );
}

export default App;
