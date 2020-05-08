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
            <Error
                v-if="errorDetected"
                :alertMessage="alertMessage"
            >
            </Error>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Error from './Error'

export default {
    name: 'LoginForm',
    components: {
        Error
    },
    props: ['registered'],
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            alertMessage:'',
            errorDetected: false
        }
    },
    methods: {
        cancel() {
            this.errorDetected = false;
            this.alertMessage = '';
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
                this.errorDetected = false;
                this.alertMessage = '';
                localStorage.setItem('access_token', res.data.access_token);
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
        showMainPage() {
            this.$emit('login');
        }
    }
}
</script>

<style>

</style>