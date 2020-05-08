<template>
    <div id="loginForm" class="container-fluid col-6 mt-5 text-light font-weight-bolder">
        <h2 class="text-center">Login Form</h2>
        <ErrorSection
            :currentErr="currentErr"
        ></ErrorSection>
        <NotifSection
            :currentNotif="currentNotif"
        ></NotifSection>
        <form>
            <div class="form-group">
                <label for="userEmail">Email</label>
                <input v-model="user.email" type="email" class="form-control" id="userEmail" placeholder="email@example.com">
            </div>
            <div class="form-group">
                <label for="userPassword">Password</label>
                <input v-model="user.password" type="password" class="form-control" id="userPassword">
            </div>
            <div>
                <button type="button" class="btn btn-primary btn-md" @click.prevent="loginUser">Login</button>
            </div>
        </form>
    </div>

</template>

<script>
import ErrorSection from './ErrorSection'
import NotifSection from './NotifSection'

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
    components: { ErrorSection, NotifSection},
    props: [ 'currentErr', 'currentNotif'],
    methods: {
        loginUser() {
            let user = this.user
            this.$emit('loginUser', user)
        }
    }
}
</script>

<style>

</style>