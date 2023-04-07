export default {
  setUser: (state, item) => {
    if (null !== item) {
      console.log('item', item.data.token);
      state.auth = item.data.token;
      console.log('state.auth', state.auth);
    } else {
      state.user = null;
    }
  },
};
