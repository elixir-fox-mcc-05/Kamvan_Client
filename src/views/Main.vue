<template>
    <div>
        <div class="mainPage page">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-mainPage sticky-top">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <a class="navbar-brand nav-link"> Kanban </a>
                    <div class="navbar-nav right">
                        <a class="nav-link" @click.prevent="logout"> Logout </a>
                    </div>
                </div>
            </nav>
            <!-- New Task Form -->
            <NewTask @refetchTasks="refetchTasks"></NewTask>
            <!-- End Task Form -->

            <!-- Kanban Board -->
            <div class="containerBoard">
                <Category v-for="(category, index) in categories" :key="index" :CategoryName="category.name" :list='list[category.key]' @refetchTasks="refetchTasks"></Category>
            </div>
        </div>
    </div>
</template>

<script>
import NewTask from '../components/NewTask.vue'
import Category from '../components/Category'

export default {
    name: 'Main',
    components: {
        NewTask,
        Category
    },
    props: ['list'],
    data(){
      return{
        categories: [
            {
                name: 'Backlog',
                title: 'listBacklog',
                key: 'backlog'
            }, {
                name: 'Todo',
                title: 'listTodo',
                key: 'todo'
            }, {
                name: 'Doing',
                title: 'listDoing',
                key: 'doing'
            }, {
                name: 'Done',
                title: 'listDone',
                key: 'done'
            }]
      }

    },
    methods: {
        logout(){
            localStorage.clear()
            swal("Yashhh", "Goodbye!", "success");
            this.isLogin = false
            this.$emit('alreadyLogout')
        },
        refetchTasks(){
            this.$emit('refetchTasks')
        }
    },
    created(){
        this.refetchTasks()
    }
}
</script>

<style>

</style>