import store from "src/store";

export const isLoggedIn = async (to, form, next) => {
  const isUser = store().getters["user/isUser"];

  if (isUser) {
    console.log("isUser", isUser);
    next();
  } else {
    next({ name: "submit-login" });
  }
};
