<template>
  <div id="dashboard">
      <div id="dashboard-navigation-bar" class="container-fluid" style="background-color: cornflowerblue;">
            <div class="row d-flex justify-content-between align-items-center p-3">
                <h1>SPREE</h1>
                <div>
                    <button class="btn btn-success" @click="changePage('addTaskPage')">Add task</button>
                    <button class="btn btn-danger" @click="logout">Log out</button>
                </div>
            </div>
        </div>
        <div class="container-fluid justify-content-center" id="dashboard-box">
            <div class="row justify-content-center">
                <div class="w-100 border-primary rounded m-3 p-3" style="background-color:wheat;">
                    <h1>Kanban Board here</h1>
                    <div id="taskCategory" class="row">
                        <taskCategory 
                        v-for="taskCategory in categories" 
                        :key="taskCategory.id" 
                        :allTasks="allTasks" 
                        :taskCategory="taskCategory"
                        @changePage="changePage"
                        @refetchAllTasks="fetchAllTasks"
                        @setSelectedTaskId="setSelectedTaskId"
                        ></taskCategory>
                    </div>
                    <!-- <taskCategory
                    :allTasks="allTasks"> -->
                      <!-- <taskCard 
                      :allTasks="allTasks1"></taskCard> -->
                    <!-- </taskCategory> -->
                </div>  
            </div>
        </div>
  </div>
</template>

<script>
import taskCategory from "../components/taskCategory.vue"
import taskCard from "../components/taskCard.vue"
import axios from "axios"

export default {
  name:"dashboard",
  data(){
    return {
        allTasks:[],
        categories:[
            {id:1, name:'backlog'}, 
            {id:2, name:'todo'}, 
            {id:3, name:'doing'}, 
            {id:4, name:'done'}
        ]
    }  
  },
  components:{
    taskCategory, taskCard
  },
  methods:{
    fetchAllTasks(){
        this.allTasks = []
        axios({
            method: 'GET',
            url: "http://localhost:3000/tasks",
            headers:{
                access_token: localStorage.access_token
            }
        })
         .then(result=>{
            // console.log(result.data.allTasks)
            this.allTasks = result.data.allTasks
         })
         .catch(error => {
            console.log(error)
         })

    },
    reassignTasks( selectedTaskId ){
        this.$emit( 'changePage' )
    },
    setSelectedTaskId( selectedTaskId ){
        this.$emit( 'setSelectedTaskId', selectedTaskId )
        this.selectedTaskId = selectedTaskId
    },
    changePage(page){
        this.$emit( 'changePage', page )
    },  
    logout(){
        localStorage.clear()
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
        this.changePage('loginPage')
    }
  },
  created(){
    if(!localStorage.access_token){
        this.changePage('loginPage')
    } else {
        this.fetchAllTasks()
    }
  }
}
</script>

<style>

</style>