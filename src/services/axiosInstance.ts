import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers.connectin = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;