<template>
  <nav class="navbar navbar-dark bg-primary">
    <h3 class="text-white">{{ AppName }}</h3>
    <div v-if="signedIn">
      <button
        type="button"
        class="btn btn-danger"
        data-toggle="modal"
        data-target="#confirm-signout"
      >Sign Out</button>
    </div>
    <div
      class="modal fade"
      id="confirm-signout"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning">Confirm Sign Out</div>
          <div class="modal-body">Are you sure you want to sign out?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button
              @click="signOut"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >Sign Out</button>
          </div>
        </div>
      </div>
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