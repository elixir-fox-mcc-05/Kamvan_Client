<template>
  <div>
        <navbar :loggedIn="loggedIn" 
                @createTask="createTask"
                @login="login"
                @logout="logout"
                @register="register"
                @onSignIn="onSignIn"
                :message="message"
                :messageSucces="messageSucces"
        >
        </navbar>
        <div style="display : flex; flex-wrap:wrap; height:39px; padding-left:5px;" v-if="!loggedIn">
                                <div id="google-signin-button" class="btn btn-primary" style="height:inherit; background-color: inherit;"></div>
                            </div>
        <dashboard :Tasks="Tasks"
            :loggedIn="loggedIn" 
            :message="message"
            @edit="edit"
            @changeCategory="changeCategory"
            @deleteData="deleteData"
        ></dashboard>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "./components/navbar";
import dashboard from "./components/dashboard";
export default {
    name : "App",
    components : {
        navbar, dashboard
    },
    data() {
        return {
            Tasks : [],
            loggedIn : localStorage.getItem("token") ? true : false,
            baseUrl : "https://mysterious-basin-64968.herokuapp.com/",
            token : localStorage.getItem("token"),
            message : "",
            messageSucces : ""
        }
    },
    methods : {
        fetchData(){
            axios ({
                method : "get",
                url : this.baseUrl + "task",
                headers : {
                    token :  this.token
                }
                })
                .then(({data}) => {
                    this.Tasks = data.Category
                    this.message = ""
                    this.messageSucces = ""
                })
                .catch(err => {
                    this.message = err.response.data.msg;
                });
        },
        createTask(taskData){
            axios({
                method : "POST",
                url : this.baseUrl + "task",
                data : {
                    title : taskData.title,
                    descriptions : taskData.descriptions,
                    point : taskData.point,
                    assigned : taskData.assigned
                },
                headers : {
                    token : this.token
                }
            })
                .then(({data})=>{
                    this.fetchData()
                    this.message = ""
                    this.messageSucces = ""
                    this.$modal.hide("newTask-Form")
                })
                .catch(err => {
                    console.log(err.response.data.msg)
                    this.message = err.response.data.msg;
                })
        },
        login(userData){
            const email = userData.email
            const password = userData.password
            axios({
                method : "POST",
                url : this.baseUrl + "user/login",
                data : {
                    email, password,
                }
            })
                .then(({data}) =>{
                    this.message = ""
                    localStorage.setItem("token", data.acces_token)
                    this.token = data.acces_token
                    this.loggedIn = true
                    this.$modal.hide("login-form")
                    this.fetchData()
                    this.message = ""
                    this.messageSucces = ""
                    this.$modal.hide("newTask-Form")
                })
                .catch(err => {
                    this.message = err.response.data.msg;
                })
        },
        logout(){
            const auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut().then(() => {
                localStorage.clear()
                this.loggedIn = false
                this.message = ""
                this.messageSucces = ""
            });
            gapi.load('auth2', function() {
                gapi.auth2.init();
            });
            gapi.signin2.render('google-signin-button', {
                onsuccess: this.onSignIn
            });
        },
        register(userData){
            axios({
                method : "POST",
                url : this.baseUrl + "user/register",
                data : {
                    email : userData.email,
                    password : userData.password,
                    confirmPassword : userData.confirmPassword,
                    organization : userData.organization
                }
            })
                .then(({data}) => {
                    this.message = ""
                    this.messageSucces = `succes create account with email ${data.email} ${data.organization}`
                    setInterval(() => {
                        this.$modal.hide("register-Form")
                        this.messageSucces = ""
                    }, 2000);
                })
                .catch(err => {
                    this.message = err.response.data.msg;
                })
        },
        edit(data){
            console.log(data)
            axios({
                method : "put",
                url : `${this.baseUrl}task/${data.id}`,
                data : {
                    title : data.title,
                    descriptions : data.descriptions,
                    point : data.point,
                    assigned : data.assigned
                },
                headers : {
                    token : this.token
                }
            })
                .then(result => {
                    this.fetchData();
                    this.message = ""
                    this.messageSucces = ""
                })
                .catch(err => {
                    this.message = err.response.data.msg;
                })
        },
        deleteData(data){
            axios({
                method : "delete",
                url : `${this.baseUrl}task/${data.id}`,
                headers : {
                    token : this.token
                }
            })
                .then(res => {
                    this.fetchData();
                    this.message = ""
                    this.messageSucces = ""
                })
                .catch(err => {
                    this.message = err.response.data.msg;
                })
        },
        changeCategory(data){
            axios({
                method : "put",
                url : `${this.baseUrl}task/${data.id}`,
                headers : {
                    token : this.token
                },
                data : {
                    CategoryId : data.category
                }
            })
                .then(res => {
                    this.fetchData();
                    this.message = ""
                    this.messageSucces = ""
                })
                .catch(err => {
                    this.message = err.response.data.msg;
                })
        },
        onSignIn (user) {
            const profile = user.getAuthResponse().id_token;
            console.log(profile);
            axios({
                method: 'post',
                url : this.baseUrl + 'user/google-login',
                headers : {
                    google_token : profile
                },
            })
                .then(({data}) => {
                    localStorage.setItem('token', data.Token)
                    this.token = data.Token
                    this.loggedIn = true;
                    this.fetchData();
                    setInterval(() => {
                        this.message = ""
                        this.messageSucces = ""
                    }, 2000);
                })
                .catch(err => {
                    this.message = err.response.data.msg;
                })
        }
    },
    mounted(){
        gapi.load('auth2', function() {
            gapi.auth2.init();
        })
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
        })
    },
    created(){
        if(localStorage.getItem("token")){
            this.fetchData()
        }
    }
};
</script>

<style>

</style>