<template>
    <div class="container">
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary m-3" data-toggle="modal" data-target="#register">
                  Register
              </button>
            
            <!-- Modal -->
              <div class="modal fade" id="register" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">Register</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form class="form-signin" @submit.prevent="register">
                          <div class="form-label-group">
                              <input v-model="newUser.email" type="email" id="registerEmail" class="form-control" placeholder="Email Address" required autofocus>
                              <label for="registerEmail">Email</label>
                          </div>
                          <div class="form-label-group">
                              <input v-model="newUser.password" type="password" id="registerPassword" class="form-control" placeholder="Password" required>
                              <label for="registerPassword">Password</label>
                          </div>
                          <div class="form-label-group">
                              <input v-model="newUser.confirm" type="password" id="registerConfirm" class="form-control" placeholder="Confirm Password" required>
                              <label for="registerConfirm">Confirm Password</label>
                          </div>
                          <button class="btn btn-primary" type="submit">Register</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            <!-- END OF MODAL -->
    </div>
</template>

<script>
export default {
    name: "RegisterModal",
    props: [
      'baseUrl',
      'newUser'
    ],
    methods: {
        register() {
        if (this.newUser.password === this.newUser.confirm) {
          axios({
            method: 'POST',
            url: this.baseUrl + '/users/register',
            data: {
              email: this.newUser.email,
              password: this.newUser.password
            }
          })
            .then( result => {
              this.newUser.email = ''
              this.newUser.password = ''
              this.newUser.confirm = ''
              $('#register').modal('hide');
              this.$toasted.success('Successfully register, please login').goAway(5000)
            })
            .catch( err => {
              this.$toasted.error(err.response.data.errors[0].message).goAway(5000)
            })
        } else {
          this.$toasted.error('Password and confirm is not the same').goAway(5000)
        }
      }
    }
}
</script>

<style>

</style>