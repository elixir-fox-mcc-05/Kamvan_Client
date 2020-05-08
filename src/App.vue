<template>
    <div>
        <Main v-if="isLogin==true"
            :listBacklog ='category.backlog'
            :listTodo='category.todo'
            :listDoing='category.doing'
            :listDone='category.done'
            @refetchTasks="fetchTask"></Main>
        <Landing v-else @refetchTasks="refetchTasks"></Landing>
    </div>
</template> 

<script>

import axios from 'axios'
import Main from './views/Main.vue'
import Landing from './views/Landing.vue'

export default {
    name: 'App',
    components: {
        Main,
        Landing
 
    },
    data(){
        return{
            category: {
                backlog: [],
                todo: [],
                doing: [],
                done: [],
            },
            isLogin: false,

            tasks: []
        }
    },
    methods: {
        fetchTask(){
            axios({
                method: 'GET',
                url: 'http://localhost:3000/tasks',
                headers : {
                    access_token: localStorage.token
                }
            })
                .then(({data }) => {
                    this.tasks = data
                    let arrBacklog = []
                    let arrTodo = []
                    let arrDoing = []
                    let arrDone = []
                    let tasks = data.task
                    tasks.forEach(task => {
                        let taskObj = {}
                        if(task.category == 'backlog'){
                            taskObj = task
                            arrBacklog.push(task)
                        }
                        else if(task.category == 'todo'){
                            taskObj = task
                            arrTodo.push(task)
                        }
                        else if(task.category == 'doing'){
                            taskObj = task
                            arrDoing.push(task)
                        }
                         else if(task.category == 'done'){
                            taskObj = task
                            arrDone.push(task)
                        }
                    });
                    this.category.backlog = arrBacklog
                    this.category.todo = arrTodo
                    this.category.doing = arrDoing
                    this.category.done = arrDone
                    
                })
                .catch(err => {
                    console.log(err); 
                })
        }
    },
    created(){
        if(localStorage.token){
            this.isLogin = true
            this.fetchTask()
        }
        else {
            this.isLogin = false
        }
    }
}
</script>

<style>

</style>