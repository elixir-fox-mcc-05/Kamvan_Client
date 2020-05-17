<template>
  <GoogleLogin :params="googleSignInParams" :renderParams="renderParams" :onSuccess="onSuccess">HELOOO</GoogleLogin>
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';
export default {
  name: 'App',
  data() {
      return {
          // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
          params: {
              client_id: "218707515829-d1ofmk2idnscp2va1cl23e2q5mpugcpf.apps.googleusercontent.com"
          },
          // only needed if you want to render the button with the google ui
          renderParams: {
              width: 510,
              height: 510,
              longtitle: true
          }
      }
  },
  components: {
      GoogleLogin
  },
  methods: {
    onSuccess(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token
      // console.log(id_token);
        axios({
        method: 'POST',
        url: 'https://damp-woodland-07511.herokuapp.com/googleLogin',
        data: {
          id_token
        }
        })
          .then((result) => {
            localStorage.setItem('access_token', result.data.access_token)
            this.$emit('loging')
          }).catch((err) => {
            console.log(err);
          });
    }
  }
}
</script>

<style>

</style>