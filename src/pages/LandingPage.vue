<template>
    <section id="landingPage" class="container-fluid justify-content-center">
        <Navbar></Navbar>
        <RegisterForm
            @registerUser="registerUser"
        ></RegisterForm>
        <LoginForm
            @loginUser="loginUser"
        ></LoginForm>
    </section>
</template>

<script>
import Navbar from '../components/Navbar'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default {
    name: 'landingPage',
    components: {
        Navbar,
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