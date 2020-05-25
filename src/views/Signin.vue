<template>
  <div>
    <div id="signin-page">
      <h2 class="title">Welcome</h2>
      <div class="div">
        <h5>Email</h5>
        <input v-model="email" type="email" class="input-signin" />
      </div>
      <div class="div">
        <h5>Password</h5>
        <input v-model="password" type="password" class="input-signin" />
      </div>
      <button @click.prevent="signin" class="btn">Signin</button>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import server from "../api";

export default {
  name: "Signin",
  components: {
    GoogleLogin
  },
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "658773830606-d0vhmq63e2f927pkf0up99bnpa1jiol6.apps.googleusercontent.com"
      },
      renderParams: {
        width: 150,
        height: 30,
        longtitle: true,
      }
    };
  },
  methods: {
    signin() {
      server({
        method: "post",
        url: "/users/signin",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.id);
          this.$store.commit('SET_SIGNIN', true)
          this.$router.push("/dashboard");
          (this.email = ""), (this.password = "");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      server({
        method: "post",
        url: "/users/google-signin",
        headers: {
          google_token: id_token
        }
      }).then((response) => {
        this.$store.dispatch("fetchTaskList");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        this.$store.commit("SET_SIGNIN", true);
        this.$store.commit("CHANGE_USERLOGIN", {
          id: localStorage.getItem("userId")
        });
        this.$router.push("/dashboard");
      });
    },
    onFailure() {
      console.log("failed google login");
    },
    created() {
      if(localStorage.token){
        this.$store.commit('SET_SIGNIN', true)
        this.$router.push("/dashboard");
      }
      else{
        this.$store.commit('SET_SIGNIN', false)
      }
    },
  },
};
</script>

<style></style>
