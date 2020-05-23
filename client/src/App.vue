<template>
  <div id="app">
    <div id="nav" class="sticky">
      <div class="Logo">
        <p>KamVan</p>
      </div>
      <router-link v-if="!isLogin" class="nav-name" to="/">Login</router-link>
      <router-link v-if="!isLogin" class="nav-name" to="/register"
        >Register</router-link
      >
      <a
        v-if="isLogin"
        @click.prevent="logout"
        :logoutButton="true"
        :params="params"
        class="nav-name logout"
        href=""
      >
        Logout
      </a>
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
        client_id: "228781523398-vdju82mh3d70vtuo76o2q73vkff21f60.apps.googleusercontent.com"
      }
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.Logo {
  font-weight: bold;
  font-size: 26px;
  color: #6e35a7;
  margin-right: 20px;
}

.nav-name {
  margin: 0 20px 0;
  text-decoration: none;
}

.logout {
  margin-left: 70vw;
}

#nav {
  padding: 10px 100px 10px;
  background: white;
  display: flex;
  align-items: center;
  position: sticky;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #909090;
}

#nav a.router-link-exact-active {
  color: #ff7082;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
