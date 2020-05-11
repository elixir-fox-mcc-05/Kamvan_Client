<template>
  <div class="container">
      <form class="form-signin" @submit.prevent="login">
          <div class="text-center mb-4">
            <img class="mb-4" src="../hacktiv8.png" alt="" width="72" height="72">         
            <h1>Kanban Board</h1>
          </div>
          
          <div class="form-label-group">
            <input v-model="user.email" type="email" id="email" class="form-control" placeholder="Email address" required autofocus>
            <label for="email">Email address</label>
          </div>
      
          <div class="form-label-group">
            <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Password" required>
            <label for="password">Password</label>
          </div>
          <div v-if="isLoading" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>

          <button v-else class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
      <div class="container">
        <div class="row" style="justify-content: center;">   
          <div id="google-signin-button" class="m-3"></div>           
          <register-modal
              :baseUrl='baseUrl'
              :newUser='newUser'
          />
         </div>
      </div>
  </div>
</template>

<script>
import RegisterModal from '../component/RegisterModal'

export default {
    name: "LoginContent",
    data () {
        return{
            isLoading: false
        }
    },
    props: [
      'baseUrl',
      'isLogin',
      'user',
      'newUser'
    ],
    components: {
        RegisterModal
    },
    methods: {
    login() {
          this.isLoading = true
          axios({
            method: 'POST',
            url: this.baseUrl + '/users/login',
            data: {
              email: this.user.email,
              password: this.user.password
            }
          })
            .then( result => {
              localStorage.setItem('token', result.data.access_token)
              this.user.email = ''
              this.user.password = ''
              this.$emit('changeLogin', true)    
              this.$emit('getTasks')
              this.$toasted.success('Successfully logged in').goAway(5000)
            })
            .catch( err => {
              this.$toasted.error(err.response.data.errors[0].message).goAway(5000)
            })
            .finally(() => {
                this.isLoading = false
            })
      },
      onSignIn(googleUser) {
        let id_token = googleUser.getAuthResponse().id_token
        axios({
          method: 'POST',
          url: this.baseUrl + '/users/googleSign',
          data: {
            id_token
          }
        })
          .then( result => {
            localStorage.setItem('token', result.data.access_token)
            this.user.email = ''
            this.user.password = ''
            this.$emit('changeLogin', true) 
            this.$emit('getTasks')
            this.$toasted.success('Successfully logged in').goAway(5000)
          })
          .catch( err => {
            console.log(err.responseJSON, 'err')
          })
          .finally(() => {
              this.isLoading = false
          })
      }
    },
        mounted() {
            setTimeout(() => {  
                gapi.signin2.render('google-signin-button', {
                    onsuccess: this.onSignIn
                })
             }, 100);
        }
}
</script>

<style>

</style>