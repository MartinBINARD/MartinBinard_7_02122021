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
    api.post('auth/signin', item)
      .then((res) => {
        console.log('RES', res);
        commit('setUser', res);
        resolve(res);
      })
      .catch((error) => handleErrors(dispatch, error));
  }),
  disconnectUser: ({ commit, dispatch }) => new Promise ((resolve) => {
    api.get('auth/signout')
      .then((res) => {
        commit('logOut', res);
        resolve(res);
      })
      .catch((error) => handleErrors(dispatch, error));
  }),
  refreshUserAuth: ({ commit, dispatch }) => new Promsie ((resolve) => {
    api.get('auth/refresh')
      .then((res) =>{
        setTimeout(() => {
          commit('refreshAuthSuccess', res);
          console.log('Refresh Autth !');
        }, 5 * 1000);
        resolve(res);
      })
      .catch((error) => {
        commit('refreshAuthError');
        handleErrors(dispatch, error);
      });
  }),
};
