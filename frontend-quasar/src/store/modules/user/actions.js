import { handleErrors } from 'src/utils';
import { api } from 'boot/axios'

export default {
  registerUser: ({ commit, dispatch }, item) => new Promise ((resolve) => {
    api.post('auth/signup', item)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => handleErrors(dispatch, error));
  }),
  connectUser: ({ commit, dispatch }, item) => new Promise ((resolve) => {
    api.post('auth/login', item)
      .then((res) => {
        commit('setUser', res);
        resolve(res);
      })
      .catch((error) => handleErrors(dispatch, error));
  }),
};
