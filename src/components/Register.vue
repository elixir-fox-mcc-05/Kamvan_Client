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
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Register',
    props: ['registered'],
    data() {
        return {
            registrationName: '',
            registrationEmail: '',
            registrationPassword: ''
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        register() {
        axios.post('http://localhost:4000/users/register', {
            name: this.registrationName,
            email: this.registrationEmail,
            password: this.registrationPassword
        })
          .then(res => {
            console.log(res);
            this.registrationName = '';
            this.registrationEmail = '';
            this.registrationPassword = '';
          })
          .catch(err => {
            console.log(err);
          })
    },
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
</style>