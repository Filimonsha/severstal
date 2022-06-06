import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
//   headers: {
//     Authorization: `Basic ${btoa("admin:tvs-ZWE-LWv-4pb")}`,
//   },
});
export default axiosInstance;
