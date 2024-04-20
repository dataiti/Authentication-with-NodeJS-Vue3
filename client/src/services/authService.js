import axiosClient from "@/configs/axiosConfig";

const registerAPI = async ({ credentials }) => {
  try {
    const res = await axiosClient.post("/auth/register", credentials);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const loginAPI = async ({ credentials }) => {
  try {
    const res = await axiosClient.post("/auth/login", credentials);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const logoutAPI = async () => {
  try {
    const res = await axiosClient.post("/auth/logout");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const forgotPassworAPI = async ({}) => {
  try {
    const res = await axiosClient.post("/auth/forgot-password");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const resetPasswordAPI = async ({}) => {
  try {
    const res = await axiosClient.post("/auth/reset-password");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { registerAPI, loginAPI, logoutAPI, resetPasswordAPI, forgotPassworAPI };
