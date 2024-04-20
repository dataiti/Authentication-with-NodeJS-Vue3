import {
  getUsersAPI,
  getUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "@/services/userService";

const state = {
  users: [],
};

const mutations = {
  setUsers(state, { users }) {
    state.users = users;
  },
  addUser(state, { newUser }) {
    state.users = state.users.unshift(newUser);
  },
  updateUser(state, { userId, updatedUser }) {
    const userIndex = state.users.findIndex((user) => user._id === userId);

    if (userIndex !== -1) {
      state.users[userIndex] = updatedUser;
    }
  },
  deleteUser(state, { userId }) {
    state.users = state.users.filter((user) => user._id !== userId);
  },
};

const actions = {
  async fetchUsers({ commit }, { search, sortBy, orderBy, limit, page }) {
    try {
      const res = await getUsersAPI({ search, sortBy, orderBy, limit, page });
      if (res && res.success) {
        commit("setUsers", { users: res.data.users });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUser(_, { userId }) {
    try {
      return await getUserAPI({ userId });
    } catch (error) {
      console.log(error);
    }
  },
  async updateUser({ commit }, { userId }) {
    try {
      const res = await updateUserAPI({ userId, data });
      if (res && res.success) {
        commit("updateUser", { userId, updateUser: res.data });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteUser({ commit }, { userId }) {
    try {
      const res = await deleteUserAPI({ userId });
      if (res && res.success) {
        commit("deleteUser", { userId });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

const getters = {
  getUsers(state) {
    return state.users;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
