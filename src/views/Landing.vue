<template>
    <div>
        <div class="landingContainer landingPage" v-if="isLoginForm==false && isRegisterForm==false" >
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                            <a class="navbar-brand nav-link"> KANBAN </a>
                            <div class="navbar-nav right">
                                <a class="nav-link" href="#" @click="homePage"> Home </a>
                                <a class="nav-link" href="#" @click="loginPage"> Login </a>
                                <a class="nav-link" href="#" @click="registerPage"> Register </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="container">
                <h1>FOX KANBAN!</h1>
            </div>
        </div>
        <div class="containerForm loginPage" v-if="isLoginForm==true">
            <div class="img">
                <img src="\img\kanban.svg">
            </div>
            <div class="auth-content">
                <form action="" id="login" @submit.prevent="login">
                    <img src="\img\avatar.svg">
                    <h2 class="title">Login</h2>
                        <div class="input-div one">
                            <div class="i"> <i class="fas fa-user"></i> </div>
                            <div class="div">
                                    <h5></h5>
                                    <input type="email" id="emailLogin" class="input" placeholder="email" v-model="userData.email" required>
                            </div>
                        </div>
                        <div class="input-div pass">
                            <div class="i"> <i class="fas fa-lock"></i> </div>
                            <div class="div">
                                <h5></h5>
                                <input type="password" id="passwordLogin" class="input" placeholder="password" v-model='userData.password' required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4"> <a @click="homePage">Back to home</a> </div>
                        <div class="col-sm"> <a @click="registerPage">Dont have account?</a> </div>
                    </div>
                    <input type="submit" class="formBtn" value="login" @click.prevent="login">
                    <div class="col-sm"> <p>Or Login Using Google Account</p> </div>
                    <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        <i class="fab fa-google"></i> Sign in with Google 
                    </g-signin-button>
                </form>
            </div>
        </div>
        <div class="containerForm registerPage" v-if="isRegisterForm==true">
            <div class="img">
                <img src="\img\regist.svg">
            </div>
            <div class="auth-content">
                <form id="register" @submit.prevent="register">
                    <img src="\img\avatar.svg">
                    <h2 class="title">Regist Now</h2>
                        <div class="input-div one">
                            <div class="i"> <i class="fas fa-user"></i> </div>
                            <div class="div">
                                    <h5></h5>
                                    <input type="email" id="emailRegister" class="input" placeholder="email" v-model="userData.email" required>
                            </div>
                        </div>
                        <div class="input-div pass">
                            <div class="i"> <i class="fas fa-lock"></i> </div>
                            <div class="div">
                                <h5></h5>
                                <input type="password" id="passwordRegister" class="input" placeholder="password" v-model="userData.password" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4"> <a @click="homePage">Back to home</a> </div>
                        <div class="col-sm"> <a @click="loginPage">Already have account?</a> </div>
                    </div>
                    <input type="submit" class="formBtn" value="register">
                    <div class="col-sm"> <p>Or Login Using Google Account</p> </div>
                    <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        <i class="fab fa-google"></i> Sign in with Google 
                    </g-signin-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import swal from 'sweetalert';

export default {
    name: 'Landing',
    components: {

    },
    data(){
        return {
            userData: {
                email:'',
                password:''
            },
            googleSignInParams: {
                client_id: '728032937057-96v2ouehaoqfldqmimsjr5d1bqsv27lq.apps.googleusercontent.com'
            },
            isLoginForm: false,
            isRegisterForm: false,
            isLogin: false
        }
    },
    methods: {
        homePage(){
            this.isLoginForm = false
            this.isRegisterForm = false
        },

        loginPage(){
            this.isLoginForm = true
            this.isRegisterForm = false
        },

        registerPage(){
            this.isRegisterForm = true
            this.isLoginForm = false
        },

        login(){
            let email = this.userData.email
            let password = this.userData.password
            
            axios({
                method: 'POST',
                url: 'https://fierce-reef-02367.herokuapp.com/users/login',
                data: {
                    email,
                    password
                }
            })
                .then(({data}) => {
                    const access_token = data.access_token
                    localStorage.setItem('token', access_token)
                    this.userData.email = ''
                    this.userData.password = ''
                    swal("Yashhh", "Hello :) welcome to kamvban", "success");
                    this.isLogin=true
                    this.$emit('alreadyLogin')
                    this.$emit('refetchTasks')                   
                })
                .catch(err => {
                    console.log(err);
                    swal("Whopss", "Can't login, please try again!", "error");
                })
        },

        register(){
            let email = this.userData.email
            let password = this.userData.password
            
            axios({
                method: 'POST',
                url: 'https://fierce-reef-02367.herokuapp.com/users/register',
                data: {
                    email,
                    password
                }
            })
                .then(({data}) => {
                    const access_token = data.access_token
                    localStorage.setItem('token', access_token)
                    this.userData.email = ''
                    this.userData.password = ''
                    swal("Yashhh", "Hello :) welcome to kamvban", "success");
                    this.isLogin=true
                    this.$emit('alreadyLogin')
                    this.$emit('refetchTasks')                    
                })
                .catch(err => {
                    console.log(err);
                    swal("Whopss", "Can't register, please try again!", "error");
                })
        },

        onSignInSuccess(googleUser){
            const profile = googleUser.getBasicProfile();
            const token = googleUser.getAuthResponse().id_token;
            console.log(profile, 'PROFILE', token, 'TOKEN');
            
            
            axios({
                method: 'post',
                url: 'https://fierce-reef-02367.herokuapp.com/users/googleSign',
                data: {
                    token
                }
            })
                .then(({data}) => {
                    console.log(data);
                    localStorage.setItem('token', data.token)
                    swal("Yashhh", "Hello :) welcome to kamvban", "success");
                    this.isLogin=true
                    this.$emit('alreadyLogin')
                    this.$emit('refetchTasks') 
                })
                .catch(err=> {
                    console.log(err);
                    swal("Whopss", "Can't login, please try again!", "error");
                })
            
        },

        onSignInError(err){
            console.log(err);
            swal("Whopss", "Can't login, please try again!", "error");
        }
    }
}
</script>

<style>

.g-signin-button {
    display: inline-block;
    padding: 6px 10px;
	border-radius: 15px;
    background-color: #B84DE8;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
}

</style>