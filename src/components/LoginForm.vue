<template>
    <div id="LoginForm" class="container-fluid col-6">
        <h2 class="text-center">Login Form</h2>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" class="form-control" id="email" placeholder="user@email.com" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="user.password" type="password" class="form-control" id="password" required>
            </div>
            <div>
                <button type="button" class="btn btn-primary btn-md" @click.prevent="login">Login</button>
            </div><br>
            <div id="back">
                <small>New User?</small><br>
                <button type="button" class="btn btn-secondary" @click="reload">Back</button>
            </div>
        </form>
    </div>

</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            let user = this.user
            this.$emit('login', user)
        },
        reload() {
            window.location.reload()
        }
    }
}
</script>

<style>

</style>