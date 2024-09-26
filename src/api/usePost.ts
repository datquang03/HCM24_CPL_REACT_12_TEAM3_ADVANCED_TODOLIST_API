import axios from "axios";

const usePost = async (endpoint: string, data: unknown) => {
  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export default usePost;
