import axios from "axios";

const useGet = async (endpoint: string) => {
  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default useGet;
