<template>
  <div>
    <NavBar 
    @toLandingPage="toLandingPage"
    @showAddTask="showAddTask"
    ></NavBar>
      ini main page
    <AddTaskModal ref="addTaskModalComponent"></AddTaskModal>
  </div>
</template>

<script>
import NavBar from './NavBar'
import AddTaskModal from './AddTaskModal'
export default {
    name: 'MainPage',
    components: {
        NavBar, AddTaskModal
    },
    methods: {
        toLandingPage() {
            this.$emit('toLandingPage');
            localStorage.clear()
        },
        showAddTask() {
            this.$refs.addTaskModalComponent.showAddTask()
        }

    }
}
</script>

<style>
</style>