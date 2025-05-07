import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueLazyload from "vue-lazyload";

const app = createApp(App);

app.use(router);
app.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 2,
  loading: "/assets/placeholder.png",
  error: "/assets/error.png",
});
app.mount("#app");
