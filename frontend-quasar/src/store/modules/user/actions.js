import { handleErrors } from "src/utils";
import { api } from "boot/axios";

export default {
  registerUser: ({ commit, dispatch }, item) =>
    new Promise((resolve) => {
      api
        .post("auth/signup", item)
        .then((res) => {
          commit("setUser", res);
          resolve(res);
        })
        .catch((error) => handleErrors(dispatch, error));
    }),
  connectUser: ({ commit, dispatch }, item) =>
    new Promise((resolve) => {
      api
        .post("auth/signin", item)
        .then((res) => {
          commit("setUser", res);
          resolve(res);
        })
        .catch((error) => handleErrors(dispatch, error));
    }),
  disconnectUser: ({ commit, dispatch }) =>
    new Promise((resolve) => {
      api
        .get("auth/signout")
        .then((res) => {
          commit("logOut", res);
          window.sessionStorage.removeItem("vuex");
          resolve(res);
        })
        .catch((error) => handleErrors(dispatch, error));
    }),
  updateUser: ({ commit, dispatch }, item) =>
    new Promise((resolve) => {
      const userId = JSON.parse(window.sessionStorage.getItem("vuex")).user.user
        .id;
      api
        .put(`user/${userId}`, item)
        .then((res) => {
          commit("updateUser", res);
          resolve(res);
        })
        .catch((error) => handleErrors(dispatch, error));
    }),
  refreshUserAuth: ({ commit, dispatch }) =>
    new Promsie((resolve) => {
      api
        .get("auth/refresh")
        .then((res) => {
          setTimeout(() => {
            dispatch("refreshUserAuth");
          }, 3 * 1000);
          commit("refreshAuthSuccess", res);
          resolve(res);
        })
        .catch((error) => {
          commit("refreshAuthError");
          window.sessionStorage.removeItem("vuex");
          handleErrors(dispatch, error);
        });
    }),
};
