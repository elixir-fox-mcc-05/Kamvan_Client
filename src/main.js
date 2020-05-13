import Vue from 'vue';
import GSignInButton from 'vue-google-signin-button'
import App from './App.vue';
Vue.use(GSignInButton)
new Vue({
    render: h => h(App),
}).$mount('#app');