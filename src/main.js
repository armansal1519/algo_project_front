import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VTooltip from "v-tooltip";
import axios from "axios";
export const baseUrl = "http://localhost:5000";
axios.defaults.baseURL = baseUrl;

Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
