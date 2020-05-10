<template>
      <div class = "container-fluid">
        
        <div v-if="!isLogin"> 
          <login-page
            :baseUrl='baseUrl'
            :isLogin='isLogin'
            :user='user'
            :newUser='newUser'
            @getTasks='getTasks'
            @changeLogin='changeLogin'
          ></login-page>
        </div>
        <div v-else>
          <main-page
            :baseUrl='baseUrl'
            :task='task'
            :tasks='tasks'
            @getTasks='getTasks'
            @changeLogin='changeLogin'
            :categories='categories'
          ></main-page>
        </div>

    </div>  

</template>

<script>
import LoginPage from './view/LoginPage'
import MainPage from './view/MainPage'

export default {
    name:"App",
    components: {
      LoginPage,
      MainPage
    },
    data() {
        return {
            //localhost
            baseUrl: 'http://localhost:3000',

            //firebase
            // baseUrl: 'https://kanban-server-robin.herokuapp.com',

            isLogin: false,
            user: {
                email: "",
                password: ""
            },
            newUser: {
                email: "",
                password: "",
                confirm: ""
            },
            task: {
                id: "",
                title: "",
                category: ""
            },
            tasks: [],
            categories: {
              backlog: [],
              todo: [],
              done: [],
              completed: []
            }
        }
    },
    methods: {
      changeLogin(status) {
        this.isLogin = status
      },

      getTasks() {
        this.tasks = []
        this.categories.backlog = []
        this.categories.todo = []
        this.categories.done = []
        this.categories.completed = []

        axios({
          method: 'GET',
          url: this.baseUrl + '/tasks',
          headers: {
            access_token: localStorage.token
          }
        })
          .then( result => {
            this.tasks = result.data.result
            console.log('task', this.tasks)
            this.separateCategory()
          })
          .catch( err => {
            console.log(err.response)
          })
      },
      separateCategory(){
        for( let i = 0; i < this.tasks.length; i++) {
          if(this.tasks[i].category == 'backlog') {
            this.categories.backlog.push(this.tasks[i])
          } else if (this.tasks[i].category == 'todo') {
            this.categories.todo.push(this.tasks[i])
          } else if (this.tasks[i].category == 'done') {
            this.categories.done.push(this.tasks[i])
          } else if (this.tasks[i].category == 'completed') {
            this.categories.completed.push(this.tasks[i])
          }
        }
      }
  },
  created() {
    if(localStorage.token){
      this.isLogin = true
      this.getTasks()
    }
  }
}
</script>

<style>

</style>