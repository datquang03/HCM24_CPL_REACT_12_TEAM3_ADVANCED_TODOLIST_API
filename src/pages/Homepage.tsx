import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/Blog-Card/BlogCard";
import { Modal, Input, Button } from "antd";

const blogs = [
  {
    id: 1,
    avatar: "path-to-avatar-1",
    username: "User 1",
    title: "Blog Title 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ad at deleniti fuga quae consectetur recusandae minima voluptates vero assumenda!",
  },
  {
    id: 2,
    avatar: "path-to-avatar-2",
    username: "User 2",
    title: "Blog Title 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aspernatur dicta deleniti tempore asperiores ad ducimus odit et quam repellat aperiam vel voluptatem, quas earum doloremque ipsam commodi ratione tenetur!",
  },
  {
    id: 3,
    avatar: "path-to-avatar-3",
    username: "User 3",
    title: "Blog Title 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aspernatur dicta deleniti tempore asperiores ad ducimus odit et quam repellat aperiam vel voluptatem, quas earum doloremque ipsam commodi ratione tenetur!",
  },
  {
    id: 4,
    avatar: "path-to-avatar-4",
    username: "User 4",
    title: "Blog Title 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aspernatur dicta deleniti tempore asperiores ad ducimus odit et quam repellat aperiam vel voluptatem, quas earum doloremque ipsam commodi ratione tenetur!",
  },
  {
    id: 5,
    avatar: "path-to-avatar-5",
    username: "User 5",
    title: "Blog Title 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aspernatur dicta deleniti tempore asperiores ad ducimus odit et quam repellat aperiam vel voluptatem, quas earum doloremque ipsam commodi ratione tenetur!",
  },
  // Add more blog data as needed
];

const Homepage = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postContent, setPostContent] = useState("");

  const handleInputClick = () => {
    setIsModalVisible(true); // Show the modal when input is clicked
  };

  const handlePostButtonClick = () => {
    setIsModalVisible(true); // Show the modal when the Post button is clicked
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setPostContent(""); // Clear the input content when modal closes
  };

  const handleInputChange = (e: any) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted post content:", postContent);
    // Here you can handle the submission, e.g., save the post content
    handleModalClose(); // Close the modal after submission
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Row for Input and Post Button */}
      <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
        <Input
          placeholder="Type your post here..."
          value={postContent}
          onClick={handleInputClick} // Open modal on input click
          readOnly // Make input read-only to prevent typing directly
          style={{ flex: 1, marginRight: "10px" }}
        />
        <Button type="primary" onClick={handlePostButtonClick}>
          Post
        </Button>
      </div>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{ cursor: "pointer", marginBottom: "20px" }} // Add margin for spacing
          onClick={() => navigate(`/detail/${blog.id}`)} // Use template literal to navigate to the detail page
        >
          <BlogCard
            avatar={blog.avatar}
            username={blog.username}
            title={blog.title}
            description={blog.description}
          />
        </div>
      ))}

      {/* Ant Design Modal */}
      <Modal
        title="Enter Post Content"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Input
          placeholder="Type your content here..."
          value={postContent}
          onChange={handleInputChange}
        />
      </Modal>
    </div>
  );
};

export default Homepage;
