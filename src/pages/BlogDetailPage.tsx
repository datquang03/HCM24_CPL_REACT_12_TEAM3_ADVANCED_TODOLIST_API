import { useParams } from "react-router-dom";

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
  // Add more blog data as needed
];

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Specify the type of useParams
  const blogId = id ? parseInt(id) : null; // Parse the ID only if it is defined
  const blog =
    blogId !== null ? blogs.find((blog) => blog.id === blogId) : null;

  if (!blog) {
    return (
      <div
        style={{ padding: "20px", color: "white", backgroundColor: "#1e1e1e" }}
      >
        Blog not found.
      </div>
    );
  }

  return (
    <div
      style={{ padding: "20px", color: "white", backgroundColor: "#1e1e1e" }}
    >
      <h1 style={{ fontSize: "2rem" }}>{blog.title}</h1>{" "}
      {/* Display blog title */}
      <h2 style={{ fontSize: "1.5rem", color: "#ccc" }}>
        by {blog.username}
      </h2>{" "}
      {/* Display username */}
      <img
        src={blog.avatar}
        alt={blog.username}
        style={{ width: "100px", borderRadius: "50%", marginBottom: "10px" }}
      />{" "}
      {/* Display avatar */}
      <p style={{ fontSize: "1rem" }}>{blog.description}</p>{" "}
      {/* Display blog description */}
      <p style={{ fontSize: "1rem", color: "#aaa" }}>Blog ID: {blogId}</p>{" "}
      {/* Optionally display the blog ID */}
    </div>
  );
};

export default BlogDetailPage;
