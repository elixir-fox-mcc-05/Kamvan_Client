<template>
    <div>
        <section v-if="currentPage === 'HomePage'">
            <HomePage
                @login="login"
                @register="register"
            ></HomePage>
        </section>
        <section v-else-if="currentPage === 'Dashboard'" >
            <Dashboard
                :currentPage="currentPage"
                :Tasks="Tasks"
                @logout="logout"
                @getHome="getHome"
                @destroy="destroy"
                @create="create"
                @update="update"
            >
            </Dashboard>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'

export default {
    name: 'App',
    components: {
        HomePage,
        Dashboard
    },
    data: function() {
        return {
            baseUrl: 'http://localhost:3000',
            currentPage: 'HomePage',
            Tasks: []
        }
    },
    methods: {
        login(user) {
            let { email, password } = user
            // console.log('@login', email)
            const data = {
                email,
                password
            }
            axios({
                method: 'post',
                url: `${this.baseUrl}/login`,
                data: qs.stringify(data)
            })
                .then(response => {
                    // console.log(response)
                    this.currentPage = "Dashboard"
                    localStorage.setItem('access_token', response.data.access_token)
                    this.fetchTasks()
                })
                .catch(err => {
                    console.log('@axios', err)
                })
        },
        register(user) {
            let { email, password } = user
            console.log('@register', email)
            const data = {
                email,
                password
            }
            axios({
                method: 'post',
                url: `${this.baseUrl}/register`,
                data: qs.stringify(data)
            })
                .then(response => {
                    // console.log('Registration successful', response);
                    this.currentPage = "HomePage"
                })
                .catch(err => {
                    console.log('@axios', err);                    
                })
        },
        logout() {
            localStorage.clear()
            this.currentPage = "HomePage"
        },
        getHome() {
            if (localStorage.access_token) {
                this.fetchTasks()
                this.currentPage = 'Dashboard'
            } else {
                this.currentPage = 'HomePage'
            }
        },

        fetchTasks() {
            let { access_token } = localStorage            
            axios({
                method: 'get',
                url: `${this.baseUrl}/tasks/`,
                headers: {
                    access_token
                }
            })
                .then(response => {                    
                    this.Tasks = response.data.tasks
                })
                .catch(err => {
                    console.log("@fetch", err)
                })
        },

        create(Task) {
            // console.log("@create", Task.category);
            let { access_token } = localStorage            
            axios({
                method: 'post',
                url: `${this.baseUrl}/tasks/`,
                data: Task,
                headers: { access_token }
            })
                .then(response => {
                    this.fetchTasks()
                })
                .catch(err => console.log(err))
        },

        update(id, Task) {
            console.log("@update", Task);
            let { access_token } = localStorage            
            axios({
                method: 'put',
                url: `${this.baseUrl}/tasks/${id}`,
                data: Task,
                headers: { access_token }
            })
                .then(response => {
                    // console.log("@update", response);
                    this.fetchTasks()
                })
                .catch(err => console.log(err))
        },

        destroy(id) {
            let { access_token } = localStorage            
            axios({
                method: 'delete',
                url: `${this.baseUrl}/tasks/${id}`,
                headers: {
                    access_token
                }
            })
                .then(response => {                    
                    this.fetchTasks()
                })
                .catch(err => { console.log(err) })
        }
    },
    created() {
        this.getHome()
    }
}
</script>

<style scoped>

</style>