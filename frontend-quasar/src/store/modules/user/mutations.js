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
  refreshAuthSuccess: (state) => {
    state.auth = true;
    state.user = null;
  },
  refreshAuthError: (state, item) => {
    state.auth = false;
    state.user = item.data;
  },
};
