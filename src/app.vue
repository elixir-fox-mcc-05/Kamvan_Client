<template>
<div id="app">
    <Headerside @logout="logout" 
    :loggedIn="loggedIn" 
    @addNewTaskForm="addNewTaskForm"
    @switchregister="switchregister"
    @switchlogin="switchlogin"
    ></Headerside>
    <div id="background">
    <Login :showlogin="showlogin" 
    @login="login" 
    @switchregister='switchregister'
    :error="error"
    :showError="showError"
    :params="params"
    :renderParams="renderParams"
    @onSuccess="onSuccess"
    :onFailure="onFailure"
    ></Login>

    <Register :showregister="showregister" 
    @register='register'
    :error="error"
    :showErrorReg='showErrorReg'
    ></Register>

    <Column :showColumn="showColumn" :tasks="tasks" @detailBtn="detailBtn"></Column>
    
    <AddTask @addTask="addTask" 
    :showAddTask="showAddTask" 
    @close="showAddTask = false"
    :error="error"
    :showErrorAdd="showErrorAdd"
    ></AddTask>

    <DetailTask :taskDetail="taskDetail" 
    :showDetailTask="showDetailTask" 
    @closeEditModal="closeEditModal" 
    @updateTask="updateTask"
     @deleteTask="deleteTask"
     ></DetailTask>

     <Log :loggedIn="loggedIn" 
     ></Log>
     </div>
</div>
</template>

<script>
import io from 'socket.io-client'
import {mapState} from 'vuex'
import Log from './components/Log'
import Headerside from './components/layout/header'
import Login from './components/article/login'
import Register from './components/article/register'
import Column from './components/Column'
import DetailTask from './components/ui/DetailTask'
import AddTask from './components/ui/AddTask'
import GoogleLogin from 'vue-google-login';
import axios from 'axios'
export default {
  name: "App",
  data() {
    return {
      tasks: [{
        title : 'tidur',
        description : 'selamat',
        points : '300',
        category : 'backlog'
      }],
      taskDetail: {
        title : 'tidur',
        description : 'selamat',
        points : '300',
        category : 'backlog',
        User : {
          first_name : 'bobo',
          last_name : 'shleep'
        }
      },
      category : ['backlog','todo','doing','done'],
      showlogin : true,
      showregister : true,
      showColumn : true,
      showAddTask : true,
      showDetailTask : true,
      loggedIn : false,
      showError : false,
      showErrorReg : false,
      showErrorAdd : false,
      error : '',
      params: {
                    client_id: "352204718470-j9o7cm2ippmp6i1705sbhj3h6741234e.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 150,
                    height: 50,
                    longtitle: false
                }
            
    }
  },
  components: {
    Headerside,
    Login,
    Register,
    Column,
    AddTask,
    DetailTask,
    Log
    // GoogleLogin
  },
  methods: {
    login(dataLogin) {
      // let socket = io()
      this.showError = false
      // console.log(dataLogin)
      axios({
        method: "post",
        url: "http://localhost:3000/login",
        data : {
          email : dataLogin.email,
          password : dataLogin.password
        }
      })
        .then(({data}) => {
          // this.socket.on('log',function(log){
          //   console.log(log)
          // })
          // console.log('testsocket:',this.socket.on())
          let token = data.token
          // console.log(token)
          localStorage.setItem('token', token)
          this.loggedIn = true
          this.showColumn = true
          this.showlogin = false
          this.fetchTask()
          // console.log(localStorage.token)
        })
        .catch(err => {
           this.error = err.response
           this.showError = true
           setTimeout(function(){
             this.showError = false
           }.bind(this),15000)
        });
    },
    register(dataRegister){
      // console.log(dataRegister)
      axios({
        method: "post",
        url: "http://localhost:3000/register",
        data : {
          first_name : dataRegister.first_name,
          last_name : dataRegister.last_name,
          email : dataRegister.email,
          password : dataRegister.password
        }
      })
        .then(({data}) => {
            // console.log(data)
          this.showlogin = true
          this.showregister = false
        })
        .catch(err => {
            // console.log(err.response.data)
            this.error=err.response.data
            this.showErrorReg = true


        });
        setTimeout(function(){
              this.showErrorReg = false
            }.bind(this),30000)
    },
    logout(){
      // const auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      //   localStorage.removeItem('access_token');

      // });
      // const auth2 = gapi.auth2.getAuthInstance();
      // localStorage.removeItem('access_token');
      this.socket.emit('log','')
      localStorage.clear()
      this.loggedIn = false
      this.showColumn = false
      this.showlogin = true
    },
    switchregister(){
      this.showlogin = false
      this.showregister = true
      this.showErrorReg = false
    },
    switchlogin(){
      this.showlogin = true
      this.showregister = false
      this.showError = false
    },
    fetchTask(){
      axios({
        method: "get",
        url : 'http://localhost:3000/tasks',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data}) => {
        // console.log(data.data)
        this.tasks = data.data
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    addTask(data){
      this.showErrorAdd = false
      axios({
        method : 'post',
        url : 'http://localhost:3000/tasks/add',
        headers : {
          token : localStorage.token
        },
        data : {
          title : data.title,
          points : data.points,
          description : data.points,
          category : data.category
        }
      })
      .then(({data}) => {
        this.checkstorage()
        this.fetchTask()
      })
      .catch(err => {
        console.log(err.response.data)
        this.error=err.response.data
        this.showErrorAdd = true
        setTimeout(function(){
          this.showErrorAdd = false
        }.bind(this),15000)
      })
    },
    checkdetailTask(i){
      // console.log('jalan woi')
      axios({
        method: 'get',
        url : `http://localhost:3000/tasks/${i}`,
        headers : {
          token : localStorage.token
        },
        params : {
          id : i
        }
      })
      .then(({data}) => {
        // console.log(data)
        this.taskDetail = data
      })
      .catch(err => {
        console.log(err.response.data)
        this.$buefy.toast.open(err.response.data)
      })
    },
    detailBtn(i){
      // console.log('asd')
      this.showDetailTask = !this.showDetailTask
      this.checkdetailTask(i)
    },
    showlogin(){
      this.showlogin = true,
      this.showregister = false
    },
    showregister(){
      this.showlogin = false,
      this.showregister = true
    },
    checkstorage(){
      if(localStorage.token){
      this.showregister = false
      this.showlogin = false
      this.showColumn = true
      this.loggedIn = true
      this.showAddTask = false
      this.showDetailTask = false
      this.fetchTask()
    }else {
      this.showregister = false
      this.showlogin = true
      this.showColumn = false
      this.loggedIn =  false
      this.showAddTask = false
      this.showDetailTask = false
    }
    },
    addNewTaskForm(){
      this.showAddTask = !this.showAddTask
    },
    updateTask(id,category){
      // console.log('h')
      axios({
        method: 'put',
        url : `http://localhost:3000/tasks/update/${id}`,
        headers : {
          token : localStorage.token
        },
        params : {
          id
        },
        data :{
          category
        }
      })
      .then(({data})=> {
          this.fetchTask()
          this.checkstorage()
      })
      .catch(err => {
          console.log(err.response.data)
          this.$buefy.toast.open(err.response.data.err)
      })
    },
    deleteTask(id){
      axios({
        method: 'delete',
        url : `http://localhost:3000/tasks/delete/${id}`,
        headers : {
          token : localStorage.token
        },
        params : {
          id
        }
      })
      .then(({data}) => {
        this.checkstorage()
        this.fetchTask()
      })
      .catch(err => {
        console.log(err.response.data)
        this.$buefy.toast.open(err.response.data)
      })
    },
    closeEditModal(){
      // console.log('editclose')
      this.showDetailTask = !this.showDetailTask
    },
    onSuccess(googleUser) {
            // console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getAuthResponse());
            let google_token = googleUser.getAuthResponse().id_token
            axios({
              method : 'post',
              url : 'localhost:3000/googlelogin',
              headers : {
                google_token
              }
            })
            .then(({data}) => {
              console.log(data.token)
              let token = data.token
              localStorage.setItem('token', token)
              this.checkstorage()
              this.fetchTask()
            })
            .catch(err => {
              console.log(err.response.data)
            })
    },
    onFailure(googleUser) {
        // console.log('googleUser error');

        // This only gets the user information: id, name, imageUrl and email
        console.log(googleUser.getBasicProfile());
    }
  },
  created() {
     if(this.socket === null){
         let socket = io("http://localhost:3000")
         //let socket = io("https://murmuring-wildwood-15232.herokuapp.com/")
         //let socket = io("https://guarded-harbor-22113.herokuapp.com/")
         //let socket = io("http://localhost:3000")
         this.$store.commit('setSocket',socket)
       }
    this.checkstorage()
    // this.fetchTask()
  },
  computed: {
        ...mapState(["socket"])
  },
}

</script>

<style scoped>
#background{
padding-bottom: 20%;
position:relative;
background-position:center;
background-image: url('./assets/2927262.jpg');
height:100%;
background-size:cover;
}
</style>