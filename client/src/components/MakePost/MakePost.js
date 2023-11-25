import { useContext, useEffect, useState } from "react";
import "./MakePost.css";
import ThemeContext from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import PostCard from "../PostCard/PostCard";
import { getCurrentDate } from "../../utils/getCurrentDate";
import axios from "axios";
import { SERVER_URL } from "../../config";
import swal from "sweetalert";

const MakePost = ({ showPostBox, setShowPostBox }) => {
  const user = JSON.parse(localStorage.getItem("rim-userdata"));
  const { theme } = useContext(ThemeContext);
  const [postText, setPostText] = useState("");
  const [allPost, setAllPost] = useState([]);

  const getAllPost = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/get-all-posts`);
      const data = response.data;

      setAllPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    if (postText === "") {
      await swal("Oops!", "Post text can not be empty!", "warning");
      setShowPostBox(false);
      return;
    }

    const postDate = getCurrentDate();

    try {
      const response = await axios.post(`${SERVER_URL}/create-post`, {
        username: user?.name,
        userId: user?._id,
        postText: postText,
        postDate: postDate,
      });
      const data = response.data;
      console.log(data);

      await swal("Submitted", data?.successMessage, "success");
      getAllPost();
      setShowPostBox(false);
    } catch (error) {
      console.log(error);
    }

    setPostText("");
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="post-area-section">
      {showPostBox && (
        <div className="make-post-container">
          <textarea
            type="text"
            value={postText}
            onChange={(e) => {
              // setIsActive(true);
              setPostText(e.target.value);
            }}
            placeholder="Write your thoughts"
            className={`post-input ${
              theme === "dark" ? "bg-darkgray" : "bg-lightgray"
            }`}
          ></textarea>
          <button className="post-btn" onClick={createPost}>
            Post
          </button>
        </div>
      )}
      <div className="all-post-container">
        {allPost.map((post) => {
          return <PostCard post={post} key={post.postId} />;
        })}
      </div>
    </div>
  );
};

export default MakePost;
