const InputCard = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "100%", // Adjust width as necessary
        marginBottom: "20px", // Space between this and the blog cards
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        type="text"
        placeholder="Type your post here..."
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid white",
          borderRadius: "4px",
          padding: "10px",
          marginBottom: "10px", // Space between input and button
        }}
      />
      <button
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => {
          // Handle post action
          console.log("Post clicked");
        }}
      >
        Post
      </button>
    </div>
  );
};

export default InputCard;
