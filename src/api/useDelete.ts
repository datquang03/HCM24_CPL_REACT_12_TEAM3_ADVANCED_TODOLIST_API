import axios from "axios";

const useDelete = async (endpoint: string) => {
  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default useDelete;
