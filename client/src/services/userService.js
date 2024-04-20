import axiosClient from "@/configs/axiosConfig";

const getUsersAPI = async ({ search, sortBy, orderBy, limit, page }) => {
  try {
    const res = await axiosClient.get(
      `/user/users?search=${search}&sortBy=${sortBy}&orderBy=${orderBy}&limit=${limit}&page=${page}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserAPI = async ({ userId }) => {
  try {
    const res = await axiosClient.get(`/user/users/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateUserAPI = async ({ userId, data }) => {
  try {
    const res = await axiosClient.put(`/user/users/${userId}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteUserAPI = async ({ userId }) => {
  try {
    const res = await axiosClient.delete(`/user/users/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { getUsersAPI, getUserAPI, updateUserAPI, deleteUserAPI };
