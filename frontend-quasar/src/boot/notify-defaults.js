import { Notify } from "quasar";

Notify.setDefaults({
  position: "top",
  timeout: 5000,
  textColor: "white",
  actions: [{ icon: "close", color: "white" }],
});
