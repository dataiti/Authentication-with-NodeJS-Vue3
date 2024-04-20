import { createStore } from "vuex";
import authModule from "./modules/authModule";
import userModule from "./modules/userModule";

const store = createStore({
  modules: {
    auth: authModule,
    user: userModule,
  },
});

export default store;
