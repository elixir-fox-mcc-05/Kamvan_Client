<template>
     <div class="column" style="margin-left: 100px;" v-if="showColumn">
      <div class="columns">
          <TaskList v-for="(category,i) in categories" :key="i" :tasks="tasks" :category="category" @detailBtn="detailBtn"></TaskList>
      </div>
     </div>
</template>

<script>
import TaskForm from './ui/TaskForm'
import TaskList from './ui/TaskList'
import AddTask from './ui/AddTask'
import DetailTask from './ui/DetailTask'
export default {
    name : "column",
    data(){
        return{
            categories : ['backlog','todo','doing','done']
        }
    },
    props : ['showColumn','tasks','category'],
    components : {
        TaskForm,
        TaskList,
        // AddTask,
        // DetailTask
    },
    methods : {
        detailBtn(i){
            this.$emit('detailBtn',i)
        }
    }
}
</script>


<style>

</style>