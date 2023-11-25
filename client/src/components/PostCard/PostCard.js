import { useContext, useState } from "react";
import "./PostCard.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThemeContext from "../../context/ThemeContext";

const PostCard = ({ post }) => {
  const { theme } = useContext(ThemeContext);
  // console.log(theme);
  const [length, setLength] = useState(Math.min(300, post?.postText?.length));

  return (
    <div className="post-card">
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

export default PostCard;
