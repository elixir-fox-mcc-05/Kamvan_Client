<template>
    <div id="registerForm" class="container-fluid mt-5 col-8 text-light font-weight-bolder">
        <h2 class="text-center">Register Form</h2>
        <form>
            <div class="form-group">
                <label for="newName">Name</label>
                <input v-model="newUser.name" type="text" class="form-control" id="newName" placeholder="Full Name">
            </div>
            <div class="form-group">
                <label for="newOrganization">Organization</label>
                <input v-model="newUser.organization" type="text" class="form-control" id="newOrganization" placeholder="Organization Name">
            </div>
            <div class="form-group">
                <label for="newEmail">Email</label>
                <input v-model="newUser.email" type="email" class="form-control" id="newEmail" placeholder="email@example.com">
            </div>
            <div class="form-group">
                <label for="newPassword">Password</label>
                <input v-model="newUser.password" type="password" class="form-control" id="newPassword">
            </div>
            <button type="button" class="btn btn-primary btn-md" @click.prevent="registerUser">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    data() {
        return {
            newUser: {
                name: '',
                organization: 'Hacktiv8',
                email: '',
                password: '',
            }
        }
    },
    methods: {
        registerUser() {
            let newUser = this.newUser
            this.$emit('registerUser', newUser)
        },
    }
}
</script>

<style>

</style>