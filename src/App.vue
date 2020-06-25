<template>
  <div id="app">
    <div id="nav" class="sticky alert alert-primary" role="alert">
      <div class="Logo">
        <p>KamVan</p>
      </div>
      <router-link v-if="!isSignin" class="nav-name" to="/">Signin</router-link>
      <router-link v-if="!isSignin" class="nav-name" to="/signup"
        >Signup</router-link
      >
      <a
        v-if="isSignin"
        @click.prevent="signout"
        :logoutButton="true"
        :params="params"
        class="nav-name logout"
        href=""
        >Signout</a
      >
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "App",
  components: {
    GoogleLogin
  },
  data() {
    return {
      params: {
        client_id: "658773830606-d0vhmq63e2f927pkf0up99bnpa1jiol6.apps.googleusercontent.com"
      }
    };
  },
  computed: {
    isSignin() {
      return this.$store.state.isSignin;
    }
  },
  methods: {
    signout() {
      localStorage.clear();
      this.$router.push("/");
      this.$store.commit('SET_SIGNIN', false)
    }
  }
};
</script>

<style scoped>
.sticky alert alert-primary{
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
