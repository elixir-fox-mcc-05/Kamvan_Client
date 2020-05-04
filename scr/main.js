import Vue from 'vue';
import App from './App.vue';
const  GSignInButton = require('vue-google-signin-button')
Vue.use(GSignInButton)


new Vue({    
    render: h => h(App)
}).$mount('#App');