import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'http://localhost:8000'
 
  // baseURL: "https://careen-canvas-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
