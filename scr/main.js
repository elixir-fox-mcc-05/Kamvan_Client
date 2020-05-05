import Vue from 'vue';
import App from './App.vue';
const  GSignInButton = require('vue-google-signin-button')
import GoogleSignInButton from 'vue-google-signin-button-directive'

// Vue.use(GSignInButton)


new Vue({    
    GoogleSignInButton,
    render: h => h(App)
}).$mount('#App');