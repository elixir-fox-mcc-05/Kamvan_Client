<template>
<div class=" column is-offset-one-quarter box is-half" v-if="showregister">
    <div class="column" >
        <h1 class="subtitle has-text-centered is-size-4" for="name-field">First Name</h1>
        <input v-model="first_name" type="text" id="regfirstname" class="input is-small">
    </div>
    <div class="column" >
        <h1 class="subtitle has-text-centered is-size-4" for="name-field">Last Name</h1>
        <input v-model="last_name" type="text" id="reglastname" class="input is-small">
    </div>
    <div class="column" >
        <h1 class="subtitle has-text-centered is-size-4" for="name-field">E-mail</h1>
        <input v-model="email" type="text" id="regemail" class="input is-small">
    </div>
    <div class="column">
        <h1 class="subtitle has-text-centered is-size-4" for="name-field">Password</h1>
        <input v-model="password" type="password" id="regpassword" class="input is-small">
    </div>
    <hr class="login-hr">
    <div class="level">
    <a @click.prevent="register" class="button is-large">Register</a>
    </div>
</div>
</template>

<script>
export default {
    name : 'Register',
    data(){
        return {
            first_name : '',
            last_name : '',
            email : '',
            password : ''
        }
    },
    props: ['showregister'],
    methods :{
        register(){
            
            let data = {
                first_name : this.first_name,
                last_name : this.last_name,
                email : this.email,
                password : this.password
            }
            // console.log(data)
            // alert(data.password)
            this.$emit('register',data)
            this.email = ''
            this.password = ''
            this.first_name = ''
            this.last_name = ''
        }
    }
}
</script>


<style>

</style>