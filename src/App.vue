<template>
  <div>
    <Navbar 
      :page="page" 
      @login="showLogin"
      @logout="logout"
    ></Navbar>
    <Landing 
      ref="landing"
      v-if="page === 'landing'"
      @login="login" 
      @showLogin="showLogin"
      @showRegister="showRegister"
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
      page: 'landing'
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
    login() {
      this.page = 'main';
    },
    logout() {
      localStorage.removeItem('access_token');
      this.page = 'landing';
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