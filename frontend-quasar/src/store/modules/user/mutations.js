import { createCookie } from 'src/utils';

export default {
  setUser: (state, item) => {
    if (null !== item) {
      createCookie('Token', item.data.token);
      state.auth = true;
    } else {
      state.auth = false;
    }
  },
};
