export default {
  setUser: (state, item) => {
    if (null !== item) {
      state.auth = true;
    } else {
      state.auth = false;
    }
  },
};
