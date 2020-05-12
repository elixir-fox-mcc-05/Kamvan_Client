<template>
    <div id="RegisterForm" class="container-fluid col-6">
        <h2 class="text-center">Registration Form</h2>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" class="form-control" id="registerEmail" placeholder="user@email.com" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="user.password" type="password" class="form-control" id="registerPassword" required><br>
                <input type="checkbox" @click="show()">Show Password</button>
            </div>
            <div>
                <button type="button" class="btn btn-primary btn-md" @click.prevent="register">Register</button>
            </div><br>
            <div id="back">
                <small>Already have an account?</small>
                <button type="button" class="btn btn-secondary" @click="reload">Back</button>
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
        },
        reload() {
            window.location.reload()
        },
        show() {
            let x = document.getElementById("registerPassword");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        }
    }
}
</script>

<style>

</style>