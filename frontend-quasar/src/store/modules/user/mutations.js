import { Cookies } from "quasar";

export default {
  setUser: (state, item) => {
    if (null !== item) {
      state.auth = true;
      state.user = item.data;
    } else {
      state.auth = false;
      state.user = null;
    }
  },
  logOut: (state) => {
    state.user = null;
    state.auth = false;
  },
};
