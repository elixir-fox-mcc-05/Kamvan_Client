<template>
<div class=" column is-offset-one-quarter box is-half" v-if="showlogin">
    <h1 class="is-size-3">Login</h1>
    <article class="message is-danger" v-if="showError">
    <div class="message-body">
        {{error.data.err}}
    </div>
    </article>
    <div class="column">
        <h1 class="subtitle has-text-centered is-size-4" for="name-field">E-mail</h1>
        <input v-model="email" type="text" id="loginemail" class="input is-small">
    </div>
    <div class="column">
        <h1 class="subtitle has-text-centered is-size-4" for="name-field">Password</h1>
        <input v-model="password" type="password" id="loginpassword" class="input is-small">
    </div>
    <hr class="login-hr">
    <div class="level">
    <a @click.prevent="login" class="button  is-medium is-success has-text-centered">Login</a>
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
    <div class="level-right">
    <a @click.prevent="switchregister" class="button is-medium is-success level-item is-5">Register</a>
    </div>
    </div>
    <hr class="login-hr">
     
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
            error: {
                error: ''
            }
            
        }
    },
    props: ['showlogin','params','renderParams','error','showError'],
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