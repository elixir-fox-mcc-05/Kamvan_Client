<template>
  <div>
    <Navbar 
      @logout="logout"
      @getHome="getHome"
      :currentPage="currentPage"    
    >
    </Navbar>
    
    <div class="row container-fluid">
      <TaskBoard v-bind:Tasks="Tasks"
        v-for="category in Categories" :key="category"
        :category="category"

      >
      </TaskBoard>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Navbar from '../components/Navbar'
import TaskBoard from '../components/TaskBoard'

export default {
  name: 'Dashboard',
  data: () => {
    return {
      Categories: ['Backlog', 'Todo', 'Doing', 'Done']
    }
  },
  components: {
    Navbar,
    TaskBoard
  },
  props: [ 'currentPage', 'Tasks' ],
  methods: {    
    getHome() { this.$emit('getHome') },
    logout() { this.$emit('logout') }
  }
}
</script>

<style>

</style>