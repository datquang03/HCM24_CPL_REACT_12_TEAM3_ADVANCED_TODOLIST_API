import { useState } from "react";
import { BlogCardProps } from "../../model/ItemProps";
import "./BlogCard.css";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";

const BlogCard: React.FC<BlogCardProps> = ({
  avatar,
  username,
  title,
  description,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    toggleMenu();
  };

  return (
    <div className="blog-card">
      <img src={avatar} alt={username} className="blog-card-avatar" />
      <div className="blog-card-info">
        <h3>{username}</h3>
        <h2>{title}</h2>
        <p>{description}</p>
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
