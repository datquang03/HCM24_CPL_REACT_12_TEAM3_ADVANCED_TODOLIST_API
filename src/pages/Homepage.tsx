import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/Blog-Card/BlogCard";
import Post, { PostInterface } from "../model/Post";
import User from "../model/User";

const Homepage = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await Post.getAll();
      setPosts(allPosts);
      console.log("Initial posts:", allPosts);
      setPosts(allPosts);
    };
    console.log("Post", posts);
    fetchPosts();
  }, []);

  const navigate = useNavigate();

  return (
    <div
      className="no-scrollbar"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {posts.map(
        (posts) => (
          console.log(User.getById(posts.userId)),
          (
            <div
              key={posts.id}
              style={{ cursor: "pointer", marginBottom: "20px" }} // Add margin for spacing
              onClick={() => navigate(`/detail/${posts.id}`)} // Use template literal to navigate to the detail page
            >
              <BlogCard
                key={posts.id}
                post={posts}
                creator={{
                  id: "1",
                  name: "John Doe",
                  avatar: "https://i.pravatar.cc/150?img=68",
                  email: "johndoe@example.com",
                  password: "password123",
                  createDate: new Date(),
                  updateDate: new Date(),
                }}
              />
            </div>
          )
        )
      )}
    </div>
  );
};

export default Homepage;
