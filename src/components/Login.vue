<template>
    <div>
        <form id="login-form" @submit.prevent="login" v-if="registered">
            <h3 class="mt-3">Login</h3>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" v-model="loginEmail" placeholder="your email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" v-model="loginPassword" placeholder="your password">
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
            <button type="button" class="btn btn-danger btn-block" @click="cancel">Cancel</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginForm',
    props: ['registered'],
    data() {
        return {
            loginEmail: '',
            loginPassword: ''
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        login() {
        axios.post('http://localhost:4000/users/login', {
            email: this.loginEmail,
            password: this.loginPassword
        })
            .then(res => {
            this.loginEmail = '';
            this.loginPassword = '';
            this.showMainPage();
            localStorage.setItem('access_token', res.data.access_token);
            })
            .catch(err => {
            console.log(err);
            })
        },
        showMainPage() {
            this.$emit('login');
        }
    }
}
</script>

<style>

</style>