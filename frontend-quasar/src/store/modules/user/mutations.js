export default {
  setUser: (state, item) => {
    if (null !== item) {
      state.auth = true;
      console.log('item.data', item.data);
      state.user = item.data;
    } else {
      state.auth = false;
      state.user = null;
    }
  },
};
