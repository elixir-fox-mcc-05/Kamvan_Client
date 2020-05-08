<template>
    <section id="landingPage" class="container-fluid justify-content-center">
        <section id="titleJumbotron" v-if="currentSection == 'home'">
            <div class="jumbotron text-center bg-dark text-light">
                <h1 class="display-4">Welcome to Kamvan!</h1>
                <p class="small">Organize your life</p>
                <hr class="my-4">
                <div class="row">
                    <div class="col">
                        <p>Login here.</p>
                        <a class="btn btn-primary btn-lg" href="login" role="button" @click="changeSection('login')">Login</a>
                    </div>
                </div>
            </div>
        </section>

        
            <LoginForm
                @login="login"
            ></LoginForm>
    </section>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
    name: 'landingPage',
    components: {
        LoginForm
    },
    data() {
        return {
            currentSection: 'home'
        }
    },
    methods: {
        login(user) {
            this.$emit('login', user)
        }
    }
}
</script>

<style>

</style>