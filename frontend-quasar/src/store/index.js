import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

import user from "./modules/user";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const vuexSessionStorage = new VuexPersist({
  key: "vuex",
  storage: window.sessionStorage,
});

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      user,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
    plugins: [vuexSessionStorage.plugin],
  });

  return Store;
});
