import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/auth/'
});

export default createStore({
  state: {
    userData: {
      fisrtname: '',
      lastname: '',
      email: '',
      password: ''
    }
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
      })
    }
  },
  modules: {
  }
})
