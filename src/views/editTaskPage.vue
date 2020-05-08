<template>
  <div class="container" id="editTask-box"> 
        <div class="row align-items-center justify-content-center">
            <div class="col-6 border border-primary rounded m-3 p-3">
                <h3>Edit current task...</h3>
                <hr/>
                <form class="form-horizontal">
                    <label class="control-label" for="editTaskTitle">Title:</label>
                    <input type="text" class="form-control" id="editTaskTitle" v-model="selectedTask.title">
                    <label class="control-label" for="editTaskDescription">Description:</label>
                    <input type="text" class="form-control" id="editTaskDescription" v-model="selectedTask.description">
                    <label class="control-label" for="editTaskDueDate">Due date:</label><br>
                    <input type="date" :placeholder="selectedTask.due_date" onfocus="(this.type='date')" v-model="selectedTask.due_date"><br><br>
                    <button type="button" class="btn btn-success" @click="updateSpecificTask()">Submit</button>
                    <button type="button" class="btn btn-danger" @click="changePage('dashboard')">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'editTaskPage',
  props: [ 'selectedTaskId' ],
  data(){
      return {
         selectedTask: {
             title:"", 
             description:"", 
             due_date:""
         }
      }
  },
  methods:{
    changePage(page){
        this.$emit( 'changePage', page )
    },
    updateSpecificTask(){
        axios({
            method: 'PUT',
            url: 'http://localhost:3000/tasks/' + this.selectedTaskId,
            headers:{
                access_token: localStorage.access_token
            },
            data:{
                title: this.selectedTask.title,
                description: this.selectedTask.description,
                due_date: this.selectedTask.due_date
            }
        })
        .then(result => {
            this.changePage('dashboard')
        })
        .catch(error =>{
            console.log(error)
        })
    },
    fetchSpecificTask(){
        axios({
            method: 'GET',
            url: 'http://localhost:3000/tasks/' + this.selectedTaskId,
            headers:{
                access_token: localStorage.access_token
            }
        })
          .then(result =>{
              console.log(result.data.result.title)
              this.selectedTask.title = result.data.result.title
              this.selectedTask.description = result.data.result.description
              this.selectedTask.due_date = (new Date(result.data.result.due_date)).toISOString().substring(0, 10)
          })
          .catch(error =>{
              console.log(error)
          })

    },
    makeProperDateFormat(){
      let StringDate = new Date(this.selectedTask.due_date)
      return StringDate.toISOString().substring(0, 10)
    }
  },
  computed:{
    properDateFormat(){
      let StringDate = new Date(this.selectedTask.due_date)
      return StringDate.toISOString().substring(0, 10)
    }
  },
  created(){
      if(!localStorage.access_token){
        this.changePage('loginPage')
    } else {
        this.fetchSpecificTask()
    }
  }
}
</script>

<style>

</style>