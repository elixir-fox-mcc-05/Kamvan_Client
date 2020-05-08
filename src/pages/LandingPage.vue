<template>
    <section id="landingPage" class="container-fluid justify-content-center pr-0 pl-0">
        <Navbar
            @showHome="showHome"
            @logoutUser="logoutUser"
            :currentPage="currentPage"
        ></Navbar>
        <section id="titleJumbotron" v-if="currentSection == 'home'">
            <div class="jumbotron text-center text-light" id="jumbotronLP">
                <h1 class="display-4 pb-5">Welcome to Kanban Board!</h1>
                <p class="lead">"For every minute spent in organizing, an hour is earned"</p>
                <p class="lead pb-4">--Benjamin Franklin--</p>
                <hr class="my-4">
                <div class="row">
                    <div class="col">
                        <p>For new member, please register.</p>
                        <a class="btn btn-primary btn-lg" href="#" role="button" @click="changeSection('register')">Register</a>
                    </div>
                    <div class="col">
                        <p>Login with Google</p>
                        <a class="btn btn-primary btn-lg" href="#" role="button">Google</a>
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
    props: [ 'currentPage' ],
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
        },
        showHome() {
            this.$emit('showHome')
        },
        logoutUser() {
            this.$emit('logoutUser')
        }
    }
}
</script>

<style scoped>
#jumbotronLP {
    background-color: #282828;
}
</style>