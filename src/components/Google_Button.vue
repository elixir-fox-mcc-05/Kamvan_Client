<template>
  <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
</template>
 
<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
  name: 'GoogleButton',  
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: '816668206908-rscp616eohf7bu9oh0cjfsb86dfgn82o.apps.googleusercontent.com'
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) { // backend
      axios({
          method: 'POST',
          url: 'http://localhost:3000/google-signin',
          headers: {
              google_token: idToken
          }
      })
      .then(({data}) => {
          localStorage.setItem('access_token', data.token)
      })
      .catch(err => {
          console.log(err)
      })
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script> 
 
<style>
.google-signin-button {
  color: rgb(255, 255, 255);
  background-color: #ffb186;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  border: none;
}

.google-signin-button:hover {
  color: #ffb186;
  background-color: rgb(255, 255, 255);
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  border: none;
}


</style> 