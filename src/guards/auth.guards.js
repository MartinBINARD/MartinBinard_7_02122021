import store from "src/store";

export const isLoggedIn = async (to, form, next) => {
  const isUser = store().getters["user/user"];

  if (isUser) {
    next();
  } else {
    next({ name: "submit-login" });
  }
};
