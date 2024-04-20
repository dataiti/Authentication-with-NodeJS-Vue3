import {
  registerAPI,
  loginAPI,
  logoutAPI,
  forgotPassworAPI,
  resetPasswordAPI,
} from "@/services/authService";

const state = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  isLoggedIn: !!localStorage.getItem("accessToken"),
};

const mutations = {
  setUser(state, { user }) {
    console.log(user);
    state.user = user;
  },
  setAccessToken(state, { accessToken }) {
    state.accessToken = accessToken;
    state.isLoggedIn = true;
    localStorage.setItem("accessToken", accessToken);
  },
  clearAccessToken(state) {
    state.accessToken = null;
    state.isLoggedIn = false;
    localStorage.removeItem("accessToken");
  },
};

const actions = {
  async register(_, { credentials }) {
    try {
      return await registerAPI({ credentials });
    } catch (error) {
      console.error("Register failed:", error);
    }
  },
  async login({ commit }, { credentials }) {
    try {
      const res = await loginAPI({ credentials });
      if (res && res.success) {
        const { accessToken, data } = res;
        commit("setAccessToken", { accessToken });
        commit("setUser", { user: data });
      }
      return res;
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
  async logout({ commit }) {
    try {
      const res = await logoutAPI();
      commit("clearAccessToken");
      commit("setUser", null);
      return res;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
