<template>
  <div class="row flex-row flex-sm-nowrap py-3">
    <div>
      <button type="button" class="btn btn-primary fa fa-plus m-1" @click.prevent="addbutton"></button>   
    </div>    
      <div id="container-backlog" class="overflow-auto scrollbar scrollbar-primary card-body">
        <h6 class="card-title text-uppercase text-truncate py-2">Back Log</h6>             
          <!-- <div class="item"> -->
            <task-card @editbutton="editbutton" class="item card text-black bg-danger mb-3 "            
            v-for="task in  StatusCheck('Backlog')"
            :key="task.id"
            :content="task"             
            @refreshData='refreshData'></task-card>            
          <!-- </div> -->           
      </div>
      <div id="container-product" class="overflow-auto scrollbar scrollbar-primary card-body" >
        <h6 class="card-title text-uppercase text-truncate py-2">To Do</h6>
          <task-card @editbutton="editbutton" class="item card text-black bg-warning mb-3 "            
          v-for="task in  StatusCheck('Todo')"
          :key="task.id"
          :content="task"             
          @refreshData='refreshData'></task-card>  
          
      </div>
      <div id="container-development" class="overflow-auto scrollbar scrollbar-primary card-body">
        <h6 class="card-title text-uppercase text-truncate py-2">Done</h6>
          <task-card @editbutton="editbutton" class="item card text-black bg-primary mb-3 "            
          v-for="task in  StatusCheck('Done')"
          :key="task.id"
          :content="task"             
          @refreshData='refreshData'></task-card>  
      </div>
      <div id="container-done" class="overflow-auto scrollbar scrollbar-primary card-body">
        <h6 class="card-title text-uppercase text-truncate py-2">Completed</h6>
          <task-card @editbutton="editbutton" class="item card text-black bg-success mb-3 "            
          v-for="task in  StatusCheck('Completed')"
          :key="task.id"
          :content="task"             
          @refreshData='refreshData'></task-card>  
      </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard"
export default {
  name:"CardContainer",
  components:{
    TaskCard
  },
  props:['dataAllTaskFromHome'],
  data(){
    return {
      backlog:[],
      title:[],
      description:[],
      status:[],
      createdAt:[],
      UpdateAt:[]
    }
  },
  methods:{
    StatusCheck(status){      
      let datafilter=[]
        
      if(this.dataAllTaskFromHome.data != undefined){
        datafilter= this.dataAllTaskFromHome.data.filter(function (item) { return item.status == status });
      }
        return datafilter
    },
    refreshData(){
      this.$emit('refreshData')
    },
    addbutton(){      
      this.$emit('addbutton')
    },
    editbutton(id,title,des){
      this.$emit('editbutton',id,title,des)
    }

  }
  
}
</script>

<style>

</style>