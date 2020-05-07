<template>
    <section id="landingPage" class="container-fluid justify-content-center">
        <Navbar></Navbar>
        <section id="titleJumbotron" v-if="currentSection == 'home'">
            <div class="jumbotron text-center bg-dark text-light">
                <h1 class="display-4">Welcome to Kanban Board!</h1>
                <p class="lead">"For every minute spent in organizing, an hour is earned"</p>
                <p class="lead">--Benjamin Franklin--</p>
                <hr class="my-4">
                <div class="row">
                    <div class="col">
                        <p>For new member, please register.</p>
                        <a class="btn btn-primary btn-lg" href="#" role="button" @click="changeSection('register')">Register</a>
                    </div>
                    <div class="col">
                        <p>For our member, please login first.</p>
                        <a class="btn btn-primary btn-lg" href="#" role="button" @click="changeSection('login')">Login</a>
                    </div>
                </div>
            </div>
        </section>

        <section v-else-if="currentSection == 'register'">
            <RegisterForm
                @registerUser="registerUser"
            ></RegisterForm>
        </section>
        <section v-else-if="currentSection == 'login'">
            <LoginForm
                @loginUser="loginUser"
            ></LoginForm>
        </section>
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
    data() {
        return {
            currentSection: 'home'
        }
    },
    methods: {
        registerUser(newUser) {
            this.currentSection = 'login'
            this.$emit('registerUser', newUser)
        },
        loginUser(user) {
            this.$emit('loginUser', user)
        },
        changeSection(section) {
            this.currentSection = section
        }
    }
}
</script>

<style>

</style>