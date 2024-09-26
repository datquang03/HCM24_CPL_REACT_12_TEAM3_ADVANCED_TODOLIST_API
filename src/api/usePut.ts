import axios from "axios";

const usePut = async (endpoint: string, data: unknown) => {
  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default usePut;