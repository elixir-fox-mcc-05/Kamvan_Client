<template>
  <div>
    <Navbar 
      :page="page" 
      @login="showLogin"
      @logout="logout"
      @register="showRegister"
    ></Navbar>
    <Landing 
      ref="landing"
      v-if="page === 'landing'"
      @login="login" 
      @showLogin="showLogin"
      @showRegister="showRegister"
      @close="modalClosed"
      :registered="registered"
    >
    </Landing>
    <Main 
      v-if="page === 'main'"
    >
    </Main>  
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Main from './components/Main';

export default {
  name: 'App',
  components: {
    Navbar, Landing, Main
  },
  data() {
    return {
      registered: false,
      page: 'landing',
      googleSignInParams: {
          client_id: '701067433216-akosvqvvev2l52s5kso2dqrtior1m7b8.apps.googleusercontent.com'
      }
    };
  },
  methods: {
    showLogin() { 
      this.registered = true;
      this.$refs.landing.showModal();
    },
    showRegister() {
      this.registered = false;
      this.$refs.landing.showModal();
    },
    modalClosed() {
      this.registered = false;
    },
    login() {
      this.page = 'main';
    },
    init() {
      let client_id = this.googleSignInParams.client_id
      gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: client_id,
            fetch_basic_profile: false,
            scope: 'profile'
        });
      })
    },
    logout() {
      this.init();
      this.page = 'landing';
      localStorage.removeItem('access_token');
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        // this.page = 'landing'
      });
    }    
  },
  created() {
    if(localStorage.access_token) {
      this.page = 'main'
    }
  }
};
</script>

<style scoped>
</style>