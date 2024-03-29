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
    state.user = { ...state.user, ...item.data.user };
  },
  uploadAvatar: (state, item) => {
    state.user = { ...state.user, ...item.data.user.avatar };
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
