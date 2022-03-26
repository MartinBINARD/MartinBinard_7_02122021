import { createStore } from 'vuex'

// const axios = require('axios');

// const instance = axios.create({
//   baseURL: 'http://localhost:3001/api/auth/'
// });

export default createStore({
  state: {
    reloadThreadPost: 0
  },
  mutations: {
    reloadThread (state) {
      state.reloadThreadPost++
    }
  },
  actions: {
    
  },
  modules: {
  }
})
