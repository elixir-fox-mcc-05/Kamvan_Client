<template>
  <div v-show="currentPage === 'login'" @submit.prevent="login" class="form-container">
        <h2 class="text-center mt-4">Login</h2>
        <form action="" class="mt-4">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" name="email" placeholder="Your Email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Your Password" class="form-control" v-model="password">
                <div v-html="feedback"></div>
            </div>
            <div>
                <br>
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name: 'login-form',
    props: ['currentPage', 'isLogin'],
    data() {
        return {
            email: '',
            password: '',
            feedback: ``,
            hasil: true,
            params: {
                client_id: "498944937485-q32jf14hhda5hrlah85ia01tlja386gk.apps.googleusercontent.com"
            },
            // only needed if you want to render the button with the google ui
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        login() {
            const axios = require('axios');
            axios.post('http://localhost:3000/users/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                const { data } = response;
                const token = data.Token;
                this.$emit('changeLogin', this.hasil);
                localStorage.setItem('token', token);
                
            })
            .catch(err => {
                err = err.response
                let { data } = err;
                let error = data.errors;
                this.feedback = `<p>${error}</p>`
                console.log(error)
            })
        },
        onSuccess(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);
            const axios = require('axios');
            axios.post('http://localhost:3000/users/google-login', {}, {
                headers: {
                    google_token: id_token
                }
            })
            .then(response => {
                const { data } = response;
                const token = data.token;
                this.$emit('changeLogin', true);
                localStorage.setItem('token', token);
            })
        },
        onFailure() {
            console.log('gagal')
        }
    }
}
</script>

<style>

</style>