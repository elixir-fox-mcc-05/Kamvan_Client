<template>
  <div id="Dashboard">
    <Navbar 
      @logout="logout"
      @getHome="getHome"
      :currentPage="currentPage"    
    >
    </Navbar><br>
    
    <div class="row container-fluid">
      <TaskBoard v-bind:Tasks="Tasks"
        v-for="category in Categories" :key="category"
        :category="category"
        @destroy="destroy"

      >
      </TaskBoard>
    </div>

    <CreateModal @create="create"></CreateModal><br>
    
    <div class="row justify-content-around">
      <a class="btn btn-primary text-white" role="button" data-toggle="modal" data-target="#CreateModal">Add Task</a>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Navbar from '../components/Navbar'
import TaskBoard from '../components/TaskBoard'
import CreateModal from '../components/CreateModal'

export default {
  name: 'Dashboard',
  data: () => {
    return {
      Categories: ['Backlog', 'Todo', 'Doing', 'Done']
    }
  },
  components: {
    Navbar,
    TaskBoard,
    CreateModal
  },
  props: [ 'currentPage', 'Tasks' ],
  methods: {    
    getHome() { this.$emit('getHome') },
    logout() { this.$emit('logout') },
    create(Task) { this.$emit('create', Task) },
    destroy(id) { this.$emit('destroy', id) }
  }
}
</script>

<style scoped>
.btn {
  margin-bottom: 20px;
}
.row {
  max-width: 100vw;
}
</style>