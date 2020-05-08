<template>
<div class=" column is-offset-one-quarter box is-half" v-if="showregister">
    <div class="nes-field" >
        <label class="subtitle" for="name-field">first_name</label>
        <input v-model="first_name" type="text" id="regfirstname" class="input is-small">
    </div>
    <div class="nes-field" >
        <label class="subtitle" for="name-field">last_name</label>
        <input v-model="last_name" type="text" id="reglastname" class="input is-small">
    </div>
    <div class="nes-field" >
        <label class="subtitle" for="name-field">email</label>
        <input v-model="email" type="text" id="regemail" class="input is-small">
    </div>
    <div class="nes-field">
        <label class="subtitle" for="name-field">password</label>
        <input v-model="password" type="password" id="regpassword" class="input is-small">
    </div>
    <hr class="login-hr">
    <a @click.prevent="register" class="button">Register</a>
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