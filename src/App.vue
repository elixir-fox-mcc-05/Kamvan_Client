<template>
  <div>
        <navbar :loggedIn="loggedIn" 
                @createTask="createTask"
                @login="login"
                @logout="logout"
                @register="register"
                :message="message"
                :messageSucces="messageSucces"
        >
        </navbar>
        <section id="firebaseui-auth-container"></section>
        <card :backlogs="backlogs" 
            :todos="todos" 
            :doings="doings" 
            :dones="dones" 
            :loggedIn="loggedIn" 
            :message="message"
            @edit="edit"
            @changeCategory="changeCategory"
            @deleteData="deleteData"
        ></card>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "./components/navbar";
import card from "./components/card";
export default {
    name : "App",
    components : {
        navbar, card
    },
    data() {
        return {
            backlogs : [],
            todos : [],
            doings : [],
            dones : [],
            loggedIn : localStorage.getItem("token") ? true : false,
            baseUrl : "http://localhost:3000/",
            token : localStorage.getItem("token"),
            message : "",
            messageSucces : ""
        }
    },
    methods : {
        fetchData(){
            axios ({
                method : "get",
                url : this.baseUrl + "task/backlogs",
                headers : {
                    token :  this.token
                }
                })
                .then(({data}) => {
                    this.backlogs = data;
                    return axios({
                        url : this.baseUrl + "task/todos",
                        method : "get",
                        headers : {
                                    token :  this.token
                                }
                        });
                })
                .then(({data}) =>{
                    this.todos = data;
                    return axios({
                        url : this.baseUrl + "task/doings",
                        method : "get",
                        headers : {
                                    token :  this.token
                                }
                        });
                })
                .then(({data})=>{
                    this.doings = data;
                    return axios({
                        url : this.baseUrl + "task/dones",
                        method : "get",
                        headers : {
                                    token :  this.token
                                }
                        });
                })
                .then(({data})=>{
                    this.dones = data;
                })
                .catch(err => {
                    this.message = "Ada Error"
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
                    console.log(data.Task)
                    this.backlogs.Task.push(data.Task)
                })
                .catch(err => {
                    console.log(err.response)
                    this.message = "ada error" 
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
                    this.loggedIn = true
                    this.fetchData()
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        logout(){
            localStorage.clear()
            this.loggedIn = false
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
                    this.messageSucces = `succes create account with email ${data.email} ${data.organization}`
                    this.message = ""
                })
                .catch(err => {
                    this.message = "Ada error"
                    console.log(this.message)
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
                    this.fetchData()
                })
                .catch(err => {
                    this.message = "Ada error"
                    console.log(this.message)
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
                    console.log("succes")
                    this.fetchData()
                })
                .catch(err => {
                    this.message = ""
                    console.log(this.message)
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
                    category : data.category
                }
            })
                .then(res => {
                    this.fetchData()
                })
                .catch(err => {
                    this.message = "ada error"
                    console.log(this.message)
                })
        }
    }
};
</script>

<style>

</style>