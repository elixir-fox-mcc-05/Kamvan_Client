<template>
    <div class="button-group text-center">
        <button class="btn btn-dark-blue " :class="{active: !registered}" @click="showRegisterForm">Register</button>
        <button class="btn btn-dark-blue " :class="{active: registered}" @click="showLoginForm">Login</button>
    </div>
</template>

<script>
export default {
    name: 'CascadeButton',
    props: ['registered'],
    methods: {
        showRegisterForm() {
            this.$emit('register')
        },
        showLoginForm() {
            this.$emit('login')
        }
    }
}
</script>

<style scoped>
    .button-group {
        background-color: darkblue;
        padding: 5px 10px;
        border-radius: 15px;
        margin-top: 5px;
    }

    .btn-dark-blue {
        background-color: darkblue;
        color: white;
        padding: 5px 35px;
        border-radius: 0;
    }

    .active {
        background-color: rgb(5, 5, 43);
    }
</style>