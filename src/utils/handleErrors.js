import { Notify } from "quasar";

export default (dispatch, error) => {
  if (500 === error.response.status) {
    Notify.create({
      position: "top",
      message: "The application has crashed ! Please reload the page.",
      color: "red",
    });
  }
  if ([400, 401, 403, 404].includes(error.response.status)) {
    Notify.create({
      position: "top",
      icon: "warning",
      message: error.response.data.message || "Access restricted.",
      color: "orange",
    });
  }
};
