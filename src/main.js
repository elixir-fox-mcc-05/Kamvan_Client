import Vue from 'vue';
import App from './app.vue';
import VueGoogleApi from 'vue-google-api'

const config = {
    apiKey: 'your_api_key',
    clientId: '352204718470-r8jhv922iacikpn3rk1b5msm5eipfo9p.apps.googleusercontent.com',
    scope: 'space_separated_scopes',
    discoveryDocs: [ list_of_discoverydocs_urls ]
  }
  Vue.use(VueGoogleApi, config)

new Vue({
    render: h => h(App)
}).$mount('#app')



