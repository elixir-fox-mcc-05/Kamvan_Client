<template>
<div>
    <div class="column" style="position:relative;">
          <div class="box has-background-light">
            <p v-bind:class="[categoryColor]">{{category}}</p>
            <div class="column" style="height:600px;overflow: auto">
              <div id="backLogList" class="box">
                  <!-- task -->
                   <TaskForm v-for="(task,i) in listTask" :key="i" :task="task" @detailBtn="detailBtn" :i="i"></TaskForm> 
                    
              </div>
            </div>
          </div>
        </div>
       
</div>
</template>


<script>
import TaskForm from "./TaskForm"
export default {
    name : "TaskList",
    props : ["tasks","category"],
    components : {
      TaskForm
    },
    methods : {
      detailBtn(i){
        // console.log(i)
        this.$emit('detailBtn', i)
      }
    },
    computed : {
      listTask(){
        let data =[]
        for(let i =0 ; i <this.tasks.length; i++){
          if (this.tasks[i].category == this.category){
            data.push(this.tasks[i])
          }
        }
        return data
      },
      categoryColor(){
        if(this.category == 'backlog'){
          return 'message-header has-background-danger'
        }else if (this.category == 'todo'){
          return 'message-header has-background-warning'
        }else if (this.category == 'doing'){
          return 'message-header has-background-success'
        }else if (this.category == 'done'){
          return 'message-header has-background-link'
        }
      }
    }
}
</script>


<style>

</style>