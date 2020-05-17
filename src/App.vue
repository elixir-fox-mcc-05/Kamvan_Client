<template>
  <div>
    <div v-if="isLogin">
      <NavBar :currentPage="currentPage"></NavBar>
      <FormContainer @fect="fect" :toggleAdd="toggleAdd" @createTask="createTask"></FormContainer>
      <div class="main-container">    
        <MainContainer @fect="fect" @addTask="addTask" v-for="(box, ibx) in boxes" :key="ibx" :items="items" :headerName="box.headerName" :status="box.status"> </MainContainer>
      </div>
    </div>
    <LoginRegist v-if="!isLogin" @loging="loging" :currentPage="currentPage"></LoginRegist>
  </div>
</template>

<script>
import axios from 'axios'
import FormContainer from './components/form-container.vue'
import MainContainer from './components/main-container.vue'
import NavBar from './components/navigation-bar.vue'
import LoginRegist from './components/login-regist.vue'
export default {
  name: 'app',
  data() {
    return {
      isLogin: false,
      toggleAdd: false,
      message: "Kanban!",
      currentPage: "notlogin",
        items: [],
        boxes: [
          {headerName:'Back-Log',status:1},
          {headerName:'To-Do',status:2},
          {headerName:'Doing',status:3},
          {headerName:'Finish',status:4},
        ]
    };
  },
  components : {
    MainContainer,
    NavBar,
    LoginRegist,
    FormContainer,
  },
  created: function () {
    this.fect()
    if(localStorage.access_token) {
      this.isLogin = 'login'
    }
  },
  methods: {
      loging() {
        return this.isLogin = true
      },
      fect() {
        axios.get('https://damp-woodland-07511.herokuapp.com/task')
          .then((result) => {
            this.items = result.data.data
          })
          .catch((err) => {
            console.log(err);
          })
      },
      addTask() {
        this.toggleAdd = !this.toggleAdd
      },
      createTask(dataTask) {
        console.log('masuk');
        axios({
          method:'POST',
          url:'https://damp-woodland-07511.herokuapp.com/task',
          data: {
            point: dataTask.point,
            title: dataTask.title,
            assign: dataTask.assign,
            status: localStorage.task
          },
          headers: {
            access_token : localStorage.access_token
          }
        })
          .then((result) => {
            this.items.push(result)
          })
          .catch((err) => {
            this.loginMsg = 'Wrong email / password'
          })
      }
  },
};
</script>

<style>
</style>