import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://localhost:3000/api/auth'
});

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    signUp: ({commit}, userData) => {
      commit;
      instance.post('/signup', { userData })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  modules: {
  }
})
