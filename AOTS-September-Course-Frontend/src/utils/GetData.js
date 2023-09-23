import axios from "../api/axios";

const getData = async (path) => {
  const response = await axios.get(path);
  const data = response.data;
  return data;
};

export default getData;
