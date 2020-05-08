<template>
    <div class="vh-100" v-bind:style="{ 'background-image' : `url(${this.bgUrl}`, 'background-color' : `aquamarine` }">
        <Nav v-if="loggedIn" @loggedIn="logout" @rerender="refreshTodo"></Nav>
        <LandingPage @loggedin="login" v-if="!loggedIn"></LandingPage>
        <Kamvan v-if="loggedIn" @rerender="refreshTodo" :key="idkamban"></Kamvan>
        <notifications group="app" position="top center"/>
    </div>
</template>

<script>
import LandingPage from './components/landingPage'
import Kamvan from './components/kamvan'
import Nav from './components/nav'
import GAuth from 'vue-google-login'

import axios from 'axios'

export default {
    name : `App`,
    components : {
        LandingPage,
        Kamvan,
        Nav
    },
    data() {
        return {
            loggedIn : false,
            todoes : [],
            timer : ``,
            idkamban : 0,
            bgUrl : ``,
        };
    },
    methods : {
        login(){
            this.loggedIn = true
        },
        logout(){
            this.loggedIn = false
            localStorage.clear()
            gapi.auth2.getAuthInstance().signOut()
        },
        refreshTodo() {
            this.idkamban += 1;
        }
    },
    computed : {
        bgurl(){
            if(!this.bgUrl){
                return `../bg.jpg`
            } else {
                return this.bgUrl
            }
        }
    },
    created : function () {
        if(localStorage.getItem(`access_token`)){
            this.loggedIn = true;
            // this.fetchTodo();
        } ;
        axios({
            method : `GET`,
            url : `https://api.unsplash.com/photos/random?client_id=uB0iTLuGuthziJ3jGZmTjRVDu5Us4ifS9m_8Qr41L1s`
        }).then( result => {
            this.bgUrl = result.data.urls.full
        }).catch(function (err) {
            console.log(err.response)
        })  
    }
};
</script>

<style scoped>

</style>

