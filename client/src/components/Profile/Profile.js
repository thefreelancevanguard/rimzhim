import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { SERVER_URL } from "../../config";
import ProfileImg from "../../assets/images/Luffy Wallpaper.jpg";
import swal from "sweetalert";
import TextInput from "../Shared/TextInput";
import Textarea from "../Shared/Textarea";
import FileInput from "../Shared/FileInput";

const PreviosPostCard = ({ post }) => {
  const { theme } = useTheme();
  const [length, setLength] = useState(Math.min(300, post?.postText?.length));

  return (
    <div className="previous-post-card">
      <div className="post-text">
        {post?.postText?.slice(0, length)}
        {length >= 300 && (
          <span
            className="see-more-btn"
            onClick={() => {
              setLength((prev) => (prev === 300 ? 3000 : 300));
            }}
          >
            &nbsp;...see {length === 300 ? "more" : "less"}
          </span>
        )}
      </div>
      <div
        className={`userinfo ${
          theme === "dark" ? "dark-theme" : "light-theme"
        }`}
      >
        <span className="userinfo-item">{post?.postDate}</span>
        <span className="userinfo-item">{post?.username}</span>
      </div>
    </div>
  );
};

// puf : Profile Update Form
const ProfileUpdateForm = ({ updateProfile }) => {
  const [user, setUser] = useState({
    _id: JSON.parse(localStorage.getItem("rim-userdata"))._id,
    name: "",
    number: "",
    about: "",
    profileImage: "",
  });

  const changeUserData = (label, value) => {
    setUser((prev) => {
      return { ...prev, [label]: value };
    });
  };

  return (
    <div className="puf-container">
      <FileInput
        label="Profile Image"
        userLabel="profileImage"
        changeUserData={changeUserData}
      />
      <TextInput
        label="Name"
        userLabel="name"
        inputType="text"
        placeholder="Name"
        value={user.name}
        changeUserData={changeUserData}
      />
      <TextInput
        label="Phone Number"
        userLabel="number"
        inputType="number"
        placeholder="Phone Number"
        value={user.number}
        changeUserData={changeUserData}
      />
      <Textarea
        label="About"
        userLabel="about"
        placeholder="About section"
        value={user.about}
        changeUserData={changeUserData}
      />
      <button type="submit" onClick={() => updateProfile(user)}>
        Save
      </button>
    </div>
  );
};

const Profile = () => {
  const { theme } = useTheme();

  const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);
  const [user, setUser] = useState();
  const profileUser = JSON.parse(localStorage.getItem("rim-userdata"));
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/getuserbyid`, {
          userData: {
            id: profileUser?._id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = response.data;
        console.log(data.user);
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getAllPostOfUser = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/get-allpost-of-user`, {
          userData: {
            userId: profileUser?._id,
          },
        });

        const data = response.data;
        console.log(data);
        setAllPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllPostOfUser();
  }, []);

  const updateProfile = async (userData) => {
    console.log(userData);

    try {
      const response = await axios.patch(`${SERVER_URL}/update-user`, {
        userData: { ...userData },
      });

      console.log(response.data);
      await swal("Updated!", "Your Profile updated succesfully", "success");
      setShowProfileUpdateForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`profile-page-container ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="profile-left-section">
        <div className="profile-img-section">
          <img src={user?.profileImg} alt="" />
        </div>
        <div className="user-info-section">
          <div className="user-item name">{user?.name}</div>
          <div className="user-item email">{user?.email}</div>
          <div className="user-item phone-number">+91 {user?.number}</div>
        </div>
      </div>
      <div className="profile-right-section">
        <div className="profile-update-btn-container">
          <button
            className="profile-update-btn"
            onClick={() => setShowProfileUpdateForm(true)}
          >
            Update Profile
          </button>
        </div>
        {showProfileUpdateForm && (
          <ProfileUpdateForm updateProfile={updateProfile} />
        )}
        <div className="profile-about-section">
          <h2>About</h2>
          <div>{user?.about}</div>
        </div>
        <div className="previous-post-section">
          <h2>My Posts</h2>
          <div className="previous-all-post-container">
            {allPost?.map((post) => {
              return <PreviosPostCard post={post} key={post?.postId} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
