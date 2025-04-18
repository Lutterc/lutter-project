import { createApp } from "vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
import "./mock";
import ArcoVue from "@arco-design/web-vue";
import LutterPlus from "lutter-plus";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";
import 'lutter-plus/dist/lutter-plus.css';

import App from "./App.vue";
const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(LutterPlus);
app.use(router);
app.use(store);
app.use(i18n);

app.mount("#app");