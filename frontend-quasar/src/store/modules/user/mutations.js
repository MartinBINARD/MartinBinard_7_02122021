import { createCookie } from 'src/utils';
import { Cookies } from 'quasar'

export default {
  setUser: (state, item) => {
    if (null !== item) {
      console.log('---------');
      const value = Cookies.get('auth')
      console.log(value);
      createCookie('hello', 'hello');
      state.auth = true;
    } else {
      state.auth = false;
    }
  },
};
