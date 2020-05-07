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
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'login-form',
    props: ['currentPage', 'isLogin'],
    data() {
        return {
            email: '',
            password: '',
            feedback: ``,
            hasil: true
        }
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
        }
    }
}
</script>

<style>

</style>