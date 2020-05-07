<template>
    <section id="landingPage" class="container-fluid justify-content-center">
        <RegisterForm
            @registerUser="registerUser"
        ></RegisterForm>
        <LoginForm
            @loginUser="loginUser"
        ></LoginForm>
    </section>
</template>

<script>
import RegisterForm from './2-1-register'
import LoginForm from './2-2-login'

export default {
    name: 'landingPage',
    components: {
        RegisterForm,
        LoginForm
    },
    methods: {
        registerUser(newUser) {
            this.$emit('registerUser', newUser)
        },
        loginUser(user) {
            this.$emit('loginUser', user)
        }
    }
}
</script>

<style>

</style>