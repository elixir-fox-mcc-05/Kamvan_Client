<template>
    <section id="HomePage" class="container-fluid justify-content-center">
        <section id="title" v-if="currentPage === 'HomePage'">
            <div class="jumbotron text-center bg-dark text-light">
                <h1 class="display-4">Welcome to Kamvan</h1>
                <p class="lead">Organize your life!</p>
                <hr class="my-4">
                <div>
                    <div>
                        <p>New here?</p>
                        <a class="btn btn-primary btn-lg" href="register" role="button" @click.prevent="changePage('RegisterForm')">Register</a>
                    </div><br>
                    <div>
                        <p class="small">Already have an account?</p>
                        <a class="btn btn-primary btn-light btn-lg" href="login" role="button" @click.prevent="changePage('LoginForm')">Login</a>
                    </div>
                </div>
            </div>
        </section>

        <section v-else-if="currentPage === 'RegisterForm'">
            <RegisterForm
                @register="register"
            ></RegisterForm>
        </section>

        <section v-else-if="currentPage === 'LoginForm'">
            <LoginForm
                @login="login"
            ></LoginForm>
        </section>
    </section>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default {
    name: 'HomePage',
    components: {
        LoginForm,
        RegisterForm
    },
    data() {
        return {
            currentPage: 'HomePage'
        }
    },
    methods: {
        login(user) {
            this.$emit('login', user)
        },
        register(user) {
            this.$emit('register', user)
        },
        changePage(page) {
            this.currentPage = page
        }
    }
}
</script>

<style>
</style>