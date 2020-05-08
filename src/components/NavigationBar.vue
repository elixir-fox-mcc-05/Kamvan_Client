<template>
  <nav class="navbar navbar-dark bg-primary">
    <h3 class="text-white">{{ AppName }}</h3>
    <div v-if="signedIn">
      <button @click="signOut" type="button" class="btn btn-danger">sign out</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  props: ["AppName", "signedIn"],
  data() {
    return {};
  },
  methods: {
    authentication() {
      this.$emit("authentication", localStorage.getItem("access_token"));
    },
    signOut() {
      localStorage.clear();
      // let auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function() {});
      this.authentication();
    }
  },
  created() {
    this.authentication();
  }
};
</script>

<style>
</style>