import Vue from 'vue';
import App from './App.vue';
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import VueJWT from 'vuejs-jwt'

Vue.use(VueJWT)
Vue.use(Notifications)
Vue.use(VModal, { dialog: true }, { dynamic: true, dynamicDefaults: { clickToClose: false } })

new Vue({
  render: h => h(App),
}).$mount('#app');

