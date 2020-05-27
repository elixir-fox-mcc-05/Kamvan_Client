<template>
  <div>
    <b-modal id='registerModal'
    ref='registerModal'
    hide-footer
    no-close-on-backdrop
    centered
    size="lg"
    >
    <template v-slot:modal-title>
      Register Your Account
    </template>
      <h6 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h6>
      <form v-on:submit.prevent="register">
        <div class="modal-body">
          <div class="form-label-group">
              <label for="registerEmail"><strong>Email address</strong></label>
              <input type="email" v-model="registerEmail" class="form-control" placeholder="Email address" required>
          </div><br>
          <div class="form-label-group">
              <label for="registerPassword"><strong>Password</strong></label>
              <input type="password" v-model="registerPassword" class="form-control" placeholder="Password" required>
          </div><br>
          <div class="form-label-group">
              <label for="confirmRegisterPassword"><strong>Confirmation Password</strong></label>
              <input type="password" v-model="confirmRegisterPassword" class="form-control" placeholder="Password" required>
          </div><br>
        </div>
        <div class="modal-footer border-top-0 d-flex justify-content-center">
            <button type="submit" class="btn btn-success"><strong>SUBMIT</strong></button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RegisterModal',
  data() {
    return {
      registerEmail: '',
      registerPassword: '',
      confirmRegisterPassword: '',
      errorMessage: false
    }
  },
  methods : {
    showRegisterModal() {
      this.$refs.registerModal.show()
      this.registerEmail='',
      this.registerPassword='',
      this.confirmRegisterPassword=''
      this.errorMessage = false
    },
    register() {
      if(this.confirmRegisterPassword !== this.registerPassword){
        this.errorMessage = `Invalid Confirmation Password`;
        this.confirmRegisterPassword = '';
      }
      else {
        axios.post('http://localhost:3000/users/register', {
          email: this.registerEmail,
          password: this.registerPassword
        })
          .then(data => {
            this.registerEmail = ''
            this.registerPassword = ''
            this.confirmRegisterPassword = ''
            this.errorMessage = false
            this.$refs.registerModal.hide()
          })
          .catch(err => {
            this.errorMessage = err.response.data.errors[0].message
            this.registerEmail = ''
            this.registerPassword='',
            this.confirmRegisterPassword=''
          })
      }
    }
  }
}
</script>

<style>

</style>