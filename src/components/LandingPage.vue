<template>
    <div>
        <div class="container mt-2 mb-5">
            <div class="row">
                <div class="col-lg-9 col-lg-7 col-lg-5 mx-auto text-center">
                    <h1 class="font-weight-bold display-4">KANBAN BOARD</h1>
                    <div class="card card-signin my-5">
                        <div class="card-body">
                            <h5 class="card-title text-center font-weight-bold h3">LOGIN</h5>
                            <hr class="my-2">
                            <h6 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h6>
                            <form class="form-signin" v-on:submit.prevent="login">
                                <div class="form-label-group">
                                    <label for="inputEmail"><strong>Email Address</strong></label>
                                    <input type="email" v-model="loginEmail" class="form-control" placeholder="Email address" required autofocus>
                                </div><br>
                                <div class="form-label-group">
                                    <label for="inputPassword"><strong>Password</strong></label>
                                    <input type="password" v-model="loginPassword" class="form-control" placeholder="Password" required>
                                </div><br>
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit"><strong>Login</strong></button>
                            </form>
                            <h5 class="mt-3"><strong>OR</strong></h5>
                            <button class="btn">
                                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                            </button>
                            <hr class="my-4">
                            <p>Don't have account? Please Register Here</p>
                            <!-- register -->
                            <button class="btn btn-warning btn-lg btn-block text-uppercase" v-on:click.prevent="showModal()">
                                <strong>Register</strong>
                            </button>
                            <RegisterModal ref="registerModalComponent"></RegisterModal>
                            <!-- register -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterModal from './RegisterModal'
import axios from 'axios'
import GoogleLogin from 'vue-google-login'
export default {
    name: 'LandingPage',
    components: {
        RegisterModal, GoogleLogin
    },
    data() {
        return {
            errorMessage: false,
            loginEmail: '',
            loginPassword: '',
            params: {
                client_id: "188097869036-3uh64feh8ahg3p41jvf49g7589a1l6hm.apps.googleusercontent.com"
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    methods: {
        login() {
            axios.post(`https://mighty-spire-18757.herokuapp.com/users/login`, {
                email: this.loginEmail,
                password: this.loginPassword
            })
                .then(data => {
                    this.loginEmail = '';
                    this.loginPassword = '';
                    this.errorMessage = false;
                    this.$emit('toMainPage');
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('email', data.data.email);
                    localStorage.setItem('organization', data.data.organization);
                })
                .catch(err => {
                    this.errorMessage = err.response.data.errors[0].message;
                    this.loginEmail = '';
                    this.loginPassword = '';
                })
        },
        showModal() {
            this.errorMessage = false
            this.$refs.registerModalComponent.showRegisterModal()
        },
        onSuccess(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            axios.post('https://mighty-spire-18757.herokuapp.com/users/google-login', {
              headers: {
                'googleToken': id_token
              }
            })
                .then(data => {
                    this.loginEmail = '';
                    this.loginPassword = '';
                    this.errorMessage = false;
                    this.$emit('toMainPage');
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('email', data.data.email);
                    localStorage.setItem('organization', data.data.organization);
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        onFailure(error) {
            console.log("google login fail", error)
        }

    }
}
</script>

<style>

</style>