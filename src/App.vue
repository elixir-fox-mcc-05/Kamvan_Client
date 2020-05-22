<template>
  <div id="app">
    <div id="nav" class="sticky">
      <div class="Logo">
        <p>KamVan</p>
      </div>
      <router-link v-if="!isLogin" class="nav-name" to="/">Login</router-link>
      <router-link v-if="!isLogin" class="nav-name" to="/register">Register</router-link>
      <a v-if="isLogin" @click.prevent="logout" class="nav-name logout" href="">Logout</a>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
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
  color: #6E35A7;
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
  color: #FF7082;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .3s;
}

.fade-enter-active {
  transition-delay: .3s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
