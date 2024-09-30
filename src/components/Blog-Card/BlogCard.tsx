import { useState } from "react";
import "./BlogCard.css";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { PostInterface } from "../../model/Post";
import { UserInterface } from "../../model/User";

interface BlogCardProps {
  post: PostInterface;
  creator: UserInterface;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, creator }) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    toggleMenu();
  };
  return (
    <div className="blog-card ">
      <img
        src={creator?.avatar}
        alt={creator?.name}
        className="blog-card-avatar"
      />
      <div className="blog-card-info">
        <h3>{creator?.name}</h3>
        <h2>{post?.title}</h2>
        <p>{post?.content}</p>
      </div>
      <div className="blog-card-actions">
        <MoreOutlined className="three-dots-icon" onClick={handleMoreClick} />

        {showMenu && (
          <div className="action-menu">
            <EditOutlined className="action-icon" title="Edit" />
            <DeleteOutlined className="action-icon" title="Delete" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
