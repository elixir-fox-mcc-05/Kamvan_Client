<template>
<div class="landing-container" v-bind:style="{ height : landingHeight }">
    <div class="register-banner d-flex w-100 h-100">

        <div class="register-left col-md-6 bg-primary vh-100" v-bind:style="{ transform : registerLeftPos, 'background-position' : registerLeftBg }  ">
            <div class="register-card h-auto p-5 d-flex align-self-center flex-column">
                <h1><center>JOIN US</center></h1>
                <button class="btn btn-info col-md-3 d-flex align-self-center" v-on:click="alter('a')" >Registered? Sign in</button>
            </div>
        </div>
        <div class="register-right col-md-6 bg-info vh-100" v-bind:style="{ transform : registerRightPos, 'background-position' : registerLeftBg }" >    
            <div class="register-card h-auto p-5 d-flex align-self-center flex-column">
                <h1><center>Welcome Back</center></h1>
                <button class="btn btn-info col-md-3 d-flex align-self-center" v-on:click="alter('b')">No account? Sign up</button>
            </div>
        </div>

        <div class="register-overlay bg-secondary" v-bind:style="{ transform : registerOverlay }">
            <div class="form-container d-flex flex-nowrap vw-100">
                <div class="register-form-container bg-dark col-md-6" v-bind:style="{ transform : registerFormContainer}" >
                    
                    <form class="" method="POST" @submit.prevent="signUp">
                        <div class="card m-5 p-0 h-100 d-flex align-self-center">
                            <div class="form-group col-md-12"><label class="mt-4"><h1>Sign Up</h1></label><div v-if="registerHasError" id="register-error" class="alert alert-danger">{{registerError}}</div></div>
                            <div>
                                <div class="form-group col-md-12"><input v-model="registerEmail" id="register-email" class="form-control" type="text" name="email" placeholder="E-mail"></div>
                                <div class="form-group col-md-12"><input v-model="registerPass" id="register-password" class="form-control" type="password" name="password" placeholder="Password"></div>
                                <div class="form-group col-md-12"><input v-model="registerOrganization" id="register-organization" class="form-control" type="text" name="organization" placeholder=" e.x : Hacktiv8"></div>
                                <div class="form-group col-md-12"><label></label><input id="register-submit" class="form-control btn-primary" type="submit" value="Register"></div>
                            </div>
                        </div>
                    </form>

                        <div class="card m-5 p-0 h-auto d-flex align-self-center pl-3 pr-3 pb-3">
                            <div class="form-group col-md-12"><label class="mt-4"><h5>Sign via social</h5></label></div>
                            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="btn btn-block btn-social btn-google"><span class="fa fa-google"></span> Sign up   with Google</GoogleLogin>
                        </div>
                
                </div>
                <div class="login-form-container bg-light col-md-6 m-0 vh-100" v-bind:style="{ transform : loginFormContainer}">
                    
                    <form class="" method="POST"  @submit.prevent="login">
                        <div class="card m-5 p-0 h-100 d-flex align-self-center">
                            <div class="form-group col-md-12"><label class="mt-4"><h1>Sign In</h1></label><div v-if="loginHasError" id="login-error" class="alert alert-danger">{{loginError}}</div></div>
                            <div>
                                <div class="form-group col-md-12"><input v-model="loginEmail" id="login-email" class="form-control" type="text" name="email" placeholder="E-mail"></div>
                                <div class="form-group col-md-12"><input v-model="loginPass" id="login-password" class="form-control" type="password" name="password" placeholder="Password"></div>
                                <div class="form-group col-md-12"><label></label><input id="login-submit" class="form-control" type="submit" value="Continue"></div>   
                            </div>
                        </div>
                    </form>
                        <div class="card m-5 p-0 h-auto d-flex align-self-center pl-3 pr-3 pb-3">
                            <div class="form-group col-md-12"><label class="mt-4"><h5>Sign via social</h5></label></div>
                            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="btn btn-block btn-social btn-google"><span class="fa fa-google"></span> Sign in with Google</GoogleLogin>
                        </div>

                </div>
            </div>
        </div>
    </div>
    <!-- <div class="login-banner bg-primary"></div> -->
</div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';
import dotenv from 'dotenv'
dotenv.config()

export default {
    components: {
        GoogleLogin
    },
    data(){
        return {
            loginEmail : ``,
            loginPass : ``,
            registerEmail : ``,
            registerOrganization : ``,
            registerPass : ``,
            loggedIn : false,
            loginHasError : false,
            loginError : ``,
            registerHasError : false,
            registerError : ``,
            //
            landingHeight : ``,
            registerOverlay : ``,
            registerFormContainer : ``,
            loginFormContainer : ``,
            registerLeftBg : ``,
            registerLeftPos : ``,
            registerRightBg : ``,
            registerRightPos : ``,
            //
            params: {
                    client_id: process.env.VUE_APP_clientId
                },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        };
    },
    methods : {
        alter(key){
            if(key===`a`){
                this.registerOverlay = `translateX(-100%)`;
                this.registerFormContainer = `translateX(-100%)`;
                this.loginFormContainer = `translateX(-100%)`;
                this.registerLeftBg = `center right`;
                this.registerLeftPos = `translateX(-30%)`;
                this.registerRightBg = `center right`;
                this.registerRightPos = `translateX(0)`;
            } else {
                this.registerOverlay = `translateX(0)`;
                this.registerFormContainer = `translateX(0)`;
                this.loginFormContainer = `translateX(0)`;
                this.registerLeftBg = `center left`;
                this.registerLeftPos = `translateX(0)`;
                this.registerRightBg = `center left`;
                this.registerRightPos = `translateX(30%)`;         
            }
        },
        login(){
            this.loginHasError = false;
            this.loginError = ``
            axios({
                method : `post`,
                url : `http://localhost:3000/users/login`,
                data : {
                    email : this.loginEmail,
                    password : this.loginPass
                }
            })  .then(({data}) => {
                this.loginEmail = ``;
                this.loginPass = ``;
                this.$emit(`loggedin`)
                localStorage.setItem(`access_token`, data.token)
            })  .catch( err => {
                this.loginHasError = true,
                this.loginError = err.response.data.Error.message
                this.notification(`warn`,`INFO`, `There's an error to your request`)
            })

        },
        signUp(){
            this.registerHasError = false,
            this.registerError = ``
            axios.post('http://localhost:3000/users/register', {
                    email : this.registerEmail,
                    password : this.registerPass,
                    organization : this.registerOrganization
                 })
                 .then( data => {
                    console.log(data)
                    this.alter(`a`);
                    this.notification(`success`,`Registration Accepted`, `You may now login with ${this.registerEmail}`)
                    this.registerEmail = ``;
                    this.registerPass = ``;

                 })
                 .catch( err => {
                    console.log(err.message)
                    this.registerHasError = true,
                    this.registerError = err.response.data.Error
                    this.notification(`warn`,`INFO`, `There's an error to your request`)
                 })
        },
        notification(type, title, msg) {
            this.$notify({
                group: 'app',
                type : type,
                title: title,
                text: msg
            });
        },        
        onSuccess(googleUser) {
            // console.log(googleUser);
            // console.log(googleUser.getBasicProfile());
            axios({
                method : `post`,
                url : `http://localhost:3000/users/googleauth`,
                headers : {
                    google_token : googleUser.getAuthResponse().id_token
                }
            })  .then(({data}) => {
                   this.$emit(`loggedin`)
                localStorage.setItem(`access_token`, data.token)
            })  .catch( err => {
                  this.notification(`warn`,`INFO`, `There's an error to your request : <br> ${err.response.data.Error.message}`)
            })
        },
        onFailure(){}
    }
}

</script>

<style>
.GAauth{
    width: 100px;
    height: 50px;
    background-color: black;
}
</style>