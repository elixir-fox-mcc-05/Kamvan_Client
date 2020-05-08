<template>
<div class=" column is-offset-one-quarter box is-half" v-if="showlogin">
    <div class="nes-field" >
        <label class="subtitle" for="name-field">email</label>
        <input v-model="email" type="text" id="loginemail" class="input is-small">
    </div>
    <div class="nes-field">
        <label class="subtitle" for="name-field">password</label>
        <input v-model="password" type="password" id="loginpassword" class="input is-small">
    </div>
    <hr class="login-hr">
    <a @click.prevent="login" class="button">Login</a>
    <a @click.prevent="switchregister" class="button">Register</a>
    <hr class="login-hr">
     <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
</div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name : 'Login',
    components : {
        GoogleLogin
    },
    data(){
        return {
            email : '',
            password : '',
            
            
        }
    },
    props: ['showlogin','params','renderParams'],
    methods :{
        login(){
            
            let data = {
                email : this.email,
                password : this.password
            }
            // console.log(data)
            // alert(data.password)
            this.$emit('login',data)
            this.email = ''
            this.password = ''

        },
        switchregister(){
            this.$emit('switchregister')
        },
        onSuccess(googleUser){
            // console.log(googleUser);
            this.$emit('onSuccess',googleUser)
        },
        onFailure(googleUser){
            this.$emit('onFailure')
        }
    }
}
</script>


<style>

</style>