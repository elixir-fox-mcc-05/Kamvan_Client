import Vue from 'vue';
import Vuetify from 'vuetify'
import GoogleAuth from 'vue-google-signin-button'
import App from './App.vue';

Vue.use(Vuetify)
Vue.use(GoogleAuth)

new Vue({
  render: h => h(App),
}).$mount('#app')
