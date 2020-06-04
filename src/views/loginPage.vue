<template>
  <div id="loginPage">
    <div class="container" id="login-box" >
      <div class="row align-items-center justify-content-center">
          <!-- <div class="col-4"></div> -->
          <div class="col-4 border border-primary rounded m-3 p-3">
              <div class="form-horizontal ">
                  <h1 class="text-center">Welcome to Spree</h1>
                  <p class="lead text-muted text-center">Spree helps you track your team's progress in developing a website using the famous Kanban method.</p>
                  <hr/>
                  <div style="max-width:100%; background-color:#2ecc71; color:white; border-radius:5px; padding:0px 5px;" v-if="successMessage">
                    <p v-if="successMessage">{{successMessage}}</p>
                  </div>
                  <form class="justify-content-center"  @submit.prevent="login()">
                      <label class="control-label" for="loginEmail">Email:</label>
                      <input type="email" class="form-control" id="loginEmail" v-model="user.loginEmail">
                      <label class="control-label" for="loginPassword">Password:</label>
                      <input type="password" class="form-control" id="loginPassword" v-model="user.loginPassword"><br>
                      <button type="submit" class="btn btn-success" style="width:100%;">Log in</button>
                  </form><br>
                  <div style="display:flex;justify-content:flex-end;">
                    <!-- <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure" style="width:100%;">Login with Google</GoogleLogin> -->
                    <g-signin-button
                      :params="googleSignInParams"
                      @success="onSignInSuccess"
                      @error="onSignInError">
                      Sign in with Google
                    </g-signin-button>
                  </div>
                  <hr/>
                  <p>New to Spree? You can <a href="#" @click="changePage('registerPage')">register here!</a></p>
              </div>
          </div>
          <!-- <div class="col-4"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import GoogleLogin from 'vue-google-login';

export default { 
  name:'loginPage',
  data() {
    return {
      params: {
        client_id: "586440042690-mlh4cu9h1ihs7rcseiptgth6ajopa7ch.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      message: "Hello! This is loginPage",
      user:{
        loginEmail:"",
        loginPassword:""
      },
      googleSignInParams: {
        client_id: '586440042690-mlh4cu9h1ihs7rcseiptgth6ajopa7ch.apps.googleusercontent.com'
      }
    }
  },
  props: [ 'successMessage' ] ,
  components: {
    // GoogleLogin
  },
  methods:{
    changePage(page){
      this.$emit( 'changePage', page )
    },
    login(){
      let payload = {
        email: this.user.loginEmail,
        password: this.user.loginPassword
      }
      axios({
        method: 'POST',
        url:'https://fierce-savannah-25696.herokuapp.com/login',
        data:{
          email:payload.email,
          password:payload.password
        }
      })
        .then(result =>{
          // console.log(result.data)
          // console.log("INI ACCESS TOKEN",result.data.access_token)
          localStorage.setItem('access_token', result.data.access_token)
          this.changePage('dashboard')
        })
        .catch(error =>{
          console.log(error)
        })
    },
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      let payload = {
        email: profile.Du
      }
      axios({
        method: 'POST',
        url:'https://fierce-savannah-25696.herokuapp.com/googleSign',
        // url:'http://localhost:3000/googleSign',
        data:{
          email:payload.email,
        }
      })
        .then(result =>{
          // console.log(result.data)
          // console.log("INI ACCESS TOKEN",result.data.access_token)
          localStorage.setItem('access_token', result.data.access_token)
          this.changePage('dashboard')
        })
        .catch(error =>{
          console.log(error)
        })


    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('Google Sign in error:', error)
    },
    // onSuccess(googleUser) {
    //   // console.log(googleUser);
    //   // This only gets the user information: id, name, imageUrl and email
    //   let id_token = googleUser.getAuthResponse().id_token;
    //   axios({
    //     method: 'POST',
    //     url: 'https://fierce-savannah-25696.herokuapp.com/googleSign',
    //     data: {
    //       id_token
    //     }
    //   })
    //   .then(result =>{
    //     console.log("===============")
    //     console.log(result)
    //     console.log("===============")
    //     // localStorage.setItem("access_token", result.data.access_token)
    //     // this.changePage('dashboard')
    //   })
    //   .catch(error =>{
    //     console.log(error)
    //   })
    // },
    logout(){
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
      });
      this.changePage('loginPage')
    }
  },
  created(){
    if(localStorage.access_token){
      this.changePage('dashboard')
    }
  }
}
</script>

<style>

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  text-align: center;
  width:100%;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

</style>