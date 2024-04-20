import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.VUE_APP_SERVER_URL}/api/v1`,
  timeout: 1000,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
