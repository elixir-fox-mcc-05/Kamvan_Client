import Vue from "vue";
import App from "./App.vue";
import bootstrapvue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(bootstrapvue);

new Vue ({
    render : h => h(App),
}).$mount("#app");