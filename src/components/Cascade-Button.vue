<template>
    <div class="button-group text-center">
        <button class="btn btn-dark-blue " :class="{active: !registered}" @click="$emit('register')">Register</button>
        <button class="btn btn-dark-blue " :class="{active: registered}" @click="$emit('login')">Login</button>
    </div>
</template>

<script>
export default {
    name: 'CascadeButton',
    props: ['registered']
}
</script>

<style scoped>
    .button-group {
        background-color: #1818cc;
        padding: 5px 10px;
        border-radius: 15px;
        margin-top: 5px;
    }

    .btn-dark-blue {
        background-color: #1818cc;
        color: white;
        padding: 5px 35px;
        border-radius: 0;
    }

    .active {
        background-color: darkblue;
    }
</style>