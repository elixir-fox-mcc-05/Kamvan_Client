<template>
  <div>
    <h1>Signup-Page</h1>
    <div id="signup-page">
      <div class="div">
        <h5>Email</h5>
        <input v-model="email" type="email" class="input-signup" />
      </div>
      <div class="div">
        <h5>Password</h5>
        <input v-model="password" type="password" class="input-signup" />
      </div>
      <button @click.prevent="signup" class="btn">Signup</button>
      <p class="login">
        already have an account?
        <a @click.prevent="signin" href>Signin here</a>
      </p>
    </div>
  </div>
</template>

<script>
import server from "../api"

export default {
  name: "Signup",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signup() {
      server({
        method: "post",
        url: "/users/signup",
        data: {
          email: this.email,
          password: this.password,
        }
      })
        .then(response => {
          this.$router.push("/");
          (this.email = ""),
          (this.password = "")
        })
        .catch(err => {
          console.log(err)
        });
    },
    signin() {
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
