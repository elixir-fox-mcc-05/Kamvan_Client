<template>
    <div>
        <navbar></navbar>
        <landingPage></landingPage>
        <mainPage :Tasks="Tasks"></mainPage>
    </div>
</template>

<script>
import navbar from './components/1-navbar'
import landingPage from './components/2-landingPage'
import mainPage from './components/3-mainPage'

export default {
    name: 'App',
    components: {
        navbar,
        landingPage,
        mainPage
    },
    data: function() {
        return {
            baseUrl: 'http://localhost:3000',
            Tasks: [],
            Users: [],
            CurrentUser: '',
            Categories: ['Back-Log', 'Todo', 'Doing', 'Done']
        }
    },
    methods: {
        fetchTasks() {
            axios({
                method: 'get',
                url: `http://localhost:3000/tasks`,
            })
                .then(response => {
                    console.log(response.data.Tasks)
                    this.Tasks = response.data.Tasks
                })
                .catch(err => {
                    console.log(err)
                })
        },

        registerUser() {},
        loginUser() {},
        createTask() {},
        updateTask() {},
        deleteTask() {}
    },
    created() {
        this.fetchTasks()
    }


}
</script>

<style>

</style>