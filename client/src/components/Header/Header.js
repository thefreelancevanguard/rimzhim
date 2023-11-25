import "./Header.css";
import KritikaImg from "../../assets/images/Kritika.jpeg";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";

const Header = ({ setShowPostBox }) => {
  const { theme, toggleTheme } = useTheme();
  const user = JSON.parse(localStorage.getItem("rim-userdata"));
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("rim-userdata"))._id;

        const response = await axios.post(`${SERVER_URL}/getuserbyid`, {
          userData: {
            id: id,
          },
        });

        setCurrentUser(response.data?.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const showProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div
      className={`header-container ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="logo-container">
        <img src={KritikaImg} alt="User" />
        <div className="company-name">Family Tree</div>
      </div>
      <div className="info-container">
        <ul className="menu-container">
          <li
            className="icon make-post-icon"
            onClick={() => setShowPostBox(true)}
          >
            <EditNoteIcon />
          </li>
          <li className="icon" onClick={toggleTheme}>
            {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </li>
          <li className="menu-item">Home</li>
          <li className="menu-item">About</li>
          <li className="menu-item">Contact Us</li>
          <li className="menu-item">Family</li>
        </ul>
        <div className="profile-container" onClick={showProfilePage}>
          <div className="username">{currentUser?.name}</div>
          <img
            className="user-profile-img"
            src={currentUser?.profileImg}
            alt="User-Img"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
