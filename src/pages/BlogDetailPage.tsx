import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post, { PostInterface } from "../model/Post";
import User, { UserInterface } from "../model/User";

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the post ID from the URL
  const [post, setPost] = useState<PostInterface | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        // Fetch the post by ID
        const postData = await Post.getById(id!); // Assuming Post.getById(id) fetches the post
        setPost(postData);

        // Fetch the user by userId from the post
        if (postData && postData.userId) {
          const userData = await User.getById(postData.userId); // Assuming User.getById fetches user
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching post or user:", error);
      }
    };

    fetchPostAndUser();
  }, [id]);

  if (!post || !user) {
    return (
      <div
        style={{ padding: "20px", color: "white", backgroundColor: "#1e1e1e" }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{ padding: "20px", color: "white", backgroundColor: "#1e1e1e" }}
    >
      THIS IS POST {id}
      <img
        src={user.avatar}
        alt={user.name}
        style={{ width: "100px", borderRadius: "50%", marginBottom: "10px" }}
      />
      <h1>{post.title}</h1>
      <h2>by {user.name}</h2>
      <p>{post.content}</p>
      <p style={{ color: "#aaa" }}>
        Posted on: {new Date(post.createDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BlogDetailPage;
