<template>
    <div>   
        <form id="register-form" @submit.prevent="register" v-if="!registered">
            <h3 class="mt-3">Register</h3>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" v-model="registrationName" placeholder="your name">
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" v-model="registrationEmail" placeholder="your email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="registrationPassword" placeholder="your password">
            </div>
            <button type="submit" class="btn btn-primary btn-block" @click.prevent="register">Register</button>
            <button type="button" class="btn btn-danger btn-block" @click="cancel">Cancel</button>
            <h6 class="text-center mt-1">Or</h6>
            <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                Sign in with Google
            </g-signin-button> 
            <Error
                v-if="errorDetected"
                :alertMessage="alertMessage"
            >
            </Error>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import GSignInButton from 'vue-google-signin-button';
import Error from './Error';

export default {
    name: 'Register',
    components: {
        GSignInButton, Error
    },
    props: ['registered'],
    data() {
        return {
            registrationName: '',
            registrationEmail: '',
            registrationPassword: '',
            alertMessage:'',
            errorDetected: false,
            googleSignInParams: {
                client_id: '701067433216-akosvqvvev2l52s5kso2dqrtior1m7b8.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        cancel() {
            this.errorDetected = false;
            this.alertMessage = '';
            this.$emit('cancel');
        },
        register() {
            axios.post('https://server-akbar-kanban.herokuapp.com/users/register', {
                name: this.registrationName,
                email: this.registrationEmail,
                password: this.registrationPassword
            })
            .then(res => {
                this.registrationName = '';
                this.registrationEmail = '';
                this.registrationPassword = '';
                this.errorDetected = false;
                this.alertMessage = '';
                this.$emit('showLogin');
            })
            .catch(err => {
                this.errorDetected = true;
                if(Array.isArray(err.response.data.error)) {
                    let errors = '';
                    err.response.data.error.forEach(e =>  {
                        errors += `${e}, `
                    })
                    this.alertMessage = errors.substring(0, errors.length-2);
                } else {
                    this.alertMessage = err.response.data.error;
                }
            })
        },
        onSignInSuccess(googleUser){
            var id_token = googleUser.getAuthResponse().id_token;
            axios.post('https://server-akbar-kanban.herokuapp.com/users/google-login', null, {
                headers: {
                    google_token: id_token
                }
            })
                .then(res => {
                    console.log(res);
                    localStorage.setItem('access_token', res.data.access_token);
                    this.$emit('login');
                    this.errorDetected = false;
                    this.alertMessage = '';
                })
                .catch(err => {
                    this.errorDetected = true;
                    this.alertMessage = err;
                })
        },
        onSignInError (error) {
            console.log(error);
        }
    }
}
</script>

<style>
    .container {
        border: solid 2px rgb(156, 148, 148);
        border-radius: 10px;
        -webkit-box-shadow: -2px 3px 14px -2px rgba(71,68,71,0.46);
        -moz-box-shadow: -2px 3px 14px -2px rgba(71,68,71,0.46);
        box-shadow: -2px 3px 14px -2px rgba(71,68,71,0.46);
    }

    .g-signin-button {
        margin-top: 5px;
        text-align: center;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #DD4C39;
        color: #fff;
        box-shadow: 0 3px 0 rgb(105, 32, 22);
    }

    .g-signin-button:hover {
        cursor: pointer;
        background-color: rgb(105, 32, 22);;
    }
</style>

<style scoped>
    .form-group {
        margin: 5px 0;
    }
</style>