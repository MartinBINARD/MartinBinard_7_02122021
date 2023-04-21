export default {
  setUser: (state, item) => {
    if (null !== item) {
      console.log('document.cookie', document.cookie);
      state.auth = true;
    } else {
      state.auth = false;
    }
  },
};
