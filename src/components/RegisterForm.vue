<template>
    <div id="RegisterForm" class="container-fluid col-6">
        <h2 class="text-center">Registration Form</h2>
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
                <button type="button" class="btn btn-primary btn-md" @click.prevent="register">Register</button>
            </div>
        </form>
    </div>

</template>

<script>
export default {
    name: 'RegisterForm',
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        register() {
            let user = this.user
            this.$emit('register', user)
        }
    }
}
</script>

<style>

</style>