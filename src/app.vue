<template>
<div id="app">
    <Headerside @logout="logout" 
    :loggedIn="loggedIn" 
    @addNewTaskForm="addNewTaskForm"
    @switchregister="switchregister"
    @switchlogin="switchlogin"
    ></Headerside>
    <Login :showlogin="showlogin" 
    @login="login" 
    @switchregister='switchregister'
    :params="params"
    :renderParams="renderParams"
    @onSuccess="onSuccess"
    :onFailure="onFailure"
    ></Login>
    <Register :showregister="showregister" @register='register'></Register>
    <Column :showColumn="showColumn" :tasks="tasks" @detailBtn="detailBtn"></Column>
    <AddTask @addTask="addTask" :showAddTask="showAddTask" @close="showAddTask = false"></AddTask>
    <DetailTask :taskDetail="taskDetail" 
    :showDetailTask="showDetailTask" 
    @closeEditModal="closeEditModal" 
    @updateTask="updateTask"
     @deleteTask="deleteTask"
     ></DetailTask>
</div>
</template>

<script>
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
    // GoogleLogin
  },
  methods: {
    login(dataLogin) {
      // console.log(dataLogin)
      axios({
        method: "post",
        url: "https://intense-scrubland-11112.herokuapp.com/login",
        data : {
          email : dataLogin.email,
          password : dataLogin.password
        }
      })
        .then(({data}) => {
          let token = data.token
          // console.log(token)
          localStorage.setItem('token', token)
          this.loggedIn = true
          this.showColumn = true
          this.showlogin = false

          // console.log(localStorage.token)
        })
        .catch(err => {
            console.log(err.response.data)
        });
    },
    register(dataRegister){
      // console.log(dataRegister)
      axios({
        method: "post",
        url: "https://intense-scrubland-11112.herokuapp.com/register",
        data : {
          first_name : dataRegister.first_name,
          last_name : dataRegister.last_name,
          email : dataRegister.email,
          password : dataRegister.password
        }
      })
        .then(({data}) => {
            console.log(data)
          // this.showlogin = true
          // this.showregister = false
          // let token = data
          // console.log(token)
          // localStorage.setItem('token', token)
        })
        .catch(err => {
            console.log(err.response.data)
        });
    },
    logout(){
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        localStorage.removeItem('access_token');

      });
      // const auth2 = gapi.auth2.getAuthInstance();
      // localStorage.removeItem('access_token');
      localStorage.clear()
      this.loggedIn = false
      this.showColumn = false
      this.showlogin = true
    },
    switchregister(){
      this.showlogin = false
      this.showregister = true
    },
    switchlogin(){
      this.showlogin = true
      this.showregister = false
    },
    fetchTask(){
      axios({
        method: "get",
        url : 'https://intense-scrubland-11112.herokuapp.com/tasks',
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
      axios({
        method : 'post',
        url : 'https://intense-scrubland-11112.herokuapp.com/tasks/add',
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
      })
    },
    checkdetailTask(i){
      console.log('jalan woi')
      axios({
        method: 'get',
        url : `https://intense-scrubland-11112.herokuapp.com/tasks/${i}`,
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
        url : `https://intense-scrubland-11112.herokuapp.com/tasks/update/${id}`,
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
      })
      .catch(err => {
          console.log(err.response.data)
      })
    },
    deleteTask(id){
      axios({
        method: 'delete',
        url : `https://intense-scrubland-11112.herokuapp.com/tasks/delete/${id}`,
        headers : {
          token : localStorage.token
        },
        params : {
          id
        }
      })
      .then(({data}) => {
        this.fetchTask()
      })
      .catch(err => {
        console.log(err.response.data)
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
              url : 'https://intense-scrubland-11112.herokuapp.com/googlelogin',
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
    this.checkstorage()
    this.fetchTask()
  }
}

</script>

<style scoped>
</style>