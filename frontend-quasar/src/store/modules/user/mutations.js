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
  updateUser: (state, item) => {
    state.user = item;
  },
  logOut: (state) => {
    state.user = null;
    state.auth = false;
  },
  refreshAuthSuccess: (state, item) => {
    state.auth = true;
    state.user = item.data;
  },
  refreshAuthError: (state) => {
    state.auth = false;
    state.user = null;
  },
};
