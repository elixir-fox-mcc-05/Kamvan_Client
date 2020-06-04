<template>
  <div id="addTaskPage">
      <div class="container" id="addTask-box"> 
            <div class="row align-items-center justify-content-center">
                <div class="col-6 border border-primary rounded m-3 p-3">
                    <h3>Add a new task!</h3>
                    <hr/>
                    <form class="form-horizontal">
                        <label class="control-label" for="newTaskTitle">Title:</label>
                        <input type="text" class="form-control" id="newTaskTitle" v-model="newTask.title">
                        <label class="control-label" for="newTaskDescription">Description:</label>
                        <input type="text" class="form-control" id="newTaskDescription" v-model="newTask.description">
                        <label class="control-label" for="newTaskDueDate">Due date:</label>
                        <input type="date" class="form-control" id="newTaskDueDate" v-model="newTask.due_date"><br>
                        <button type="button" class="btn btn-success" @click="addTask()">Submit</button>
                        <button type="button" class="btn btn-danger" @click="changePage('dashboard')">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
  </div>


</template>

<script>
import axios from 'axios'

export default {
    name:"addTaskPage",
    data(){
        return{
            newTask:{
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
        refetchAllTask(){
            this.$emit( 'refetchAllTask' )
        },
        addTask(){
            axios({
                method: 'POST',
                url: 'https://fierce-savannah-25696.herokuapp.com/tasks',
                headers:{
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.newTask.title,
                    description: this.newTask.description,
                    due_date: this.newTask.due_date
                }
            })
              .then(result=>{
                  console.log(result)
                  this.changePage('dashboard')
              })
              .catch(error =>{
                  console.log(error)
              })
        }
    }
}
</script>

<style>

</style>