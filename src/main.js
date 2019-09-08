import Vue from "vue";
import App from "./App.vue";
import http from "./http";
import router from "./router";
import store from "./store";
import moment from "dayjs";
import VCharts from "v-charts";
import lodash from "lodash";
import enLocale from "./components/language/enlanguage";
import zhLocale from "./components/language/zhlanguage";
import tcLocale from "./components/language/tclanguage";
// import ElementLocale from "element-ui/lib/locale";
import ElementUI from "element-ui";
import VueI18n from "vue-i18n";
import "./mockjs";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(VueI18n);
//改变element组件国际化
const messages = {
  en: enLocale,
  zh: zhLocale,
  tc: tcLocale
};
const i18n = new VueI18n({
  locale: "localStorage.getItem('language')||'en'",
  messages
});
// ElementLocale.i18n((key, value) => i18n.t(key, value));
//改变element组件国际化
Vue.prototype.$axios = http;
Vue.prototype.$lodash = lodash;
Vue.prototype.$moment = moment;
Vue.use(ElementUI);
Vue.use(VCharts);

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
