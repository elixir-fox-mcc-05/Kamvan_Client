<template>
    <div>
        <nav class="navbar navbar-light">
            <a class="navbar-brand" v-on:click="home"> <span>看板</span> </a>
            <div v-if="!status">
                <button type="button" class="btn btn-style register" v-on:click.prevent="register_form">R</button>
                <button type="button" class="btn btn-style register" v-on:click.prevent="logout">L</button>
                <GoogleButton></GoogleButton>
            </div>
            <div v-else-if="status">
                <button type="button" class="btn btn-style"  v-on:click.prevent="task_form">+</button>
                <button type="button" class="btn btn-style register" v-on:click.prevent="logout">L</button>
            </div>
        </nav>
    </div>
</template>

<script>
import GoogleButton from './Google_Button'

export default {
    name: 'Navigation',
    props: ['status'],
    components: {
        GoogleButton
    },
    methods: {
        home() { this.$emit('home') },
        logout() { this.$emit('logout') },
        task_form() { this.$emit('task_form') },
        register_form() { this.$emit('register_form') },
    }
}
</script>

<style>

</style>