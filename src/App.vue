<template>
  <div class="container">
      <Navbar @registerForm="registerForm" @logout="logout" @addTask="addTask" :currentPage="currentPage"></Navbar>
      <LoginPage :errMsg="errMsg" @login="login" v-if="currentPage == 'login'"></LoginPage>
      <KamvanCard :errMsg="errMsg" :steps ='steps' :tasks='tasks' @editTask='editTask' @deleteTask='deleteTask' v-if="currentPage == 'dashboard'"></KamvanCard>
      <Register :errMsg="errMsg" v-if="currentPage == 'register'" @register="register"></Register>
    </div>
</template>

<script>
import axios from 'axios'
import Register from './components/Register'
import LoginPage from './components/Login'
import KamvanCard from './components/KamvanCard'
import Navbar from './components/Navbar'
export default {
    name: 'App',
    components: {
        LoginPage, KamvanCard, Navbar, Register
    },
    data() {
        return {
        message: 'Hello world',
        steps: ['Back-Log', 'To-Do', 'Doing', 'Done'],
        currentPage: 'login',
        tasks: [],
        loggedin: false,
        access_token: '',
        errMsg: ''
        };
    },
    methods: {
        login(email, password){
            axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    email,
                    password
                }
            })
                .then(data => {
                    console.log(data)
                    // this.tasks = data.data
                    this.access_token = data.data.access_token
                    localStorage.setItem('access_token', this.access_token)
                    this.currentPage='dashboard'
                    this.loggedin=true
                    this.fetchTask()
                })
                .catch(err => {
                    setTimeout(() => {
                      this.errMsg=''
                    }, 3000)
                    this.errMsg = err.response.data.msg
                    console.log('ini error',err)
                })
        },

        registerForm(){
          this.currentPage = "register"
        },

        register(email, password){
          axios({
            method: 'post',
            url: 'http://localhost:3000/register',
            data : {
              email,
              password
            }
          })
              .then(data => {
                this.currentPage = 'login'
              })
              .catch(err => {
                 setTimeout(() => {
                      this.errMsg=''
                    }, 3000)
                    this.errMsg = err.response.data.msg
              })
        },

        logout(){
            localStorage.clear()
            this.currentPage = 'login'
        },

        fetchTask(){
            axios({
                method: 'get',
                url: 'http://localhost:3000/task',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(data => {
                this.tasks = data.data.tasks
            })
            .catch(err => {
                 setTimeout(() => {
                      this.errMsg=''
                    }, 3000)
                    this.errMsg = err.response.data.msg
            })
        },

        addTask(title, description, point, assigned_to){
            axios({
                method: 'post',
                url: 'http://localhost:3000/task',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: title,
                    description: description,
                    point: point,
                    assigned_to: assigned_to
                }
            })
                .then(data => {
                    // console.log(data)
                    this.currentPage = 'dashboard'
                    this.fetchTask()
                    $('#exampleModal3').modal('hide')
                })
                .catch(err => {
                     setTimeout(() => {
                      this.errMsg=''
                    }, 3000)
                    this.errMsg = err.response.data.msg
                })
        },
        editTask(id, title, description, point, assigned_to, category){
            axios({
              method: 'put',
              url: `http://localhost:3000/task/${id}`,
              headers: {
                access_token: localStorage.access_token
                },
              data:{
                title,
                description,
                point,
                assigned_to,
                category
              }
            })  
            .then(data => {
              this.fetchTask()
              $('#exampleModal').modal('hide')
            })
            .catch(err => {
              console.log(err)
            })
        },

        deleteTask(id){
           axios({
              method: 'delete',
              url: `http://localhost:3000/task/${id}`,
              headers: {
                access_token: localStorage.access_token
                }
            })
            .then(data => {
              this.fetchTask()
              $('#exampleModal').modal('hide')
            })
            .catch(err => {
               setTimeout(() => {
                      this.errMsg=''
                    }, 3000)
                    this.errMsg = err.response.data.msg
            })  
        }
    },

    created(){
        console.log('created')
        if(localStorage.getItem('access_token')){
            this.currentPage = 'dashboard'
            this.loggedin = true
            this.fetchTask()
            // this.login()

        }
    }
};
</script>
