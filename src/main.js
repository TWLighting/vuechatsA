// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueCharts from "vue-chartjs";
import ECharts from "vue-echarts"; // 在 webpack 环境下指向 components/ECharts.vue
Vue.use(BootstrapVue);
Vue.use(VueCharts);
Vue.use(ECharts);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.component("Cum", require("./components/Sidebar"));
// J-DONE 棄用
/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: {},
  render: h => h(App)
});
