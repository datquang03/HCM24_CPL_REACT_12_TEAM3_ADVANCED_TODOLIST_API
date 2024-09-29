import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/Blog-Card/BlogCard";
import Post, { PostInterface } from "../model/Post";
import User, { UserInterface } from "../model/User";
import PostComponent from "../components/PostComponent";
import { useUserContext } from "../context/UserContext";

const Homepage = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await Post.getAll();
      setPosts(allPosts);
      console.log("Initial posts:", allPosts);
    };

    const fetchUsers = async () => {
      const allUsers = await User.getAll(); // Assuming you have a User model with a getAll method
      setUsers(allUsers);
      console.log("Initial users:", allUsers);
    };

    fetchPosts();
    fetchUsers();
  }, []);

  const getUser = (userId: string): UserInterface => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return {
        id: "default-user-id",
        name: "Unknown User",
        email: "",
        password: "",
        avatar: "",
        createDate: new Date(),
        updateDate: new Date(),
      };
    }
    return user;
  };

  const navigate = useNavigate();

  return (
    <>
      {user &&(
        <div>
          {/* post wrapper */}
          <div>
            <PostComponent />
          </div>
        </div>
      )}
      {/* post */}

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
        {posts.map((post) => (
          <div
            key={post.id}
            style={{ cursor: "pointer", marginBottom: "20px" }} // Add margin for spacing
            onClick={() => navigate(`/detail/${post.id}`)} // Use template literal to navigate to the detail page
          >
            <BlogCard
              key={post.id}
              post={post}
              creator={getUser(post.userId)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Homepage;
