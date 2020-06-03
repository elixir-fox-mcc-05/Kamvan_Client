<template>
  <div>
    <NavBar 
    @toLandingPage="toLandingPage"
    @showAddTask="showAddTask"
    ></NavBar>
    <div class="container mt-3 mb-5">
        <div class="row row-cols-1 row-cols-lg-4">
            <div class="col md-4" v-for="(category, i) in categories" :key="i">
                <CategoryList
                :category="category"
                :tasks="tasks"
                @showUpdateData="showUpdateData"
                ></CategoryList>
            </div>
        </div>
    </div>
    <AddTaskModal ref="addTaskModalComponent"
    @addTask="addTask"
    ></AddTaskModal>
    <UpdateTaskModal ref="UpdateTaskModalComponent"
    @updateTask="updateTask"
    @deleteTask="deleteTask"
    ></UpdateTaskModal>
  </div>
</template>

<script>
import NavBar from './NavBar'
import AddTaskModal from './AddTaskModal'
import CategoryList from './CategotyList'
import UpdateTaskModal from './UpdateTaskModal'
import axios from 'axios'
export default {
    name: 'MainPage',
    components: {
        NavBar, AddTaskModal, CategoryList, UpdateTaskModal
    },
    data() {
        return {
            categories: ['Back Log', 'To Do', 'Doing', 'Done'],
            tasks: [],
        }
    },
    methods: {
        toLandingPage() {
            this.$emit('toLandingPage');
            localStorage.clear()
        },
        showAddTask() {
            this.$refs.addTaskModalComponent.showAddTask()
        },
        showUpdateData(data) {
            this.$refs.UpdateTaskModalComponent.showUpdateTask(data)
        },
        getTask() {
            axios.get(`https://mighty-spire-18757.herokuapp.com/tasks`, {
                headers: {
                    token:localStorage.token
                }
            })
                .then(data => {
                    this.tasks = data.data.tasks
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        addTask() {
            this.getTask()
        },
        updateTask() {
            this.getTask()
        },
        deleteTask() {
            this.getTask()
        }
    },
    created() {
        this.getTask()
    }
}
</script>

<style>
    .container{
        max-width: 90% !important;
    }
</style>