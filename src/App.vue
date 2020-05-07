<template>
    <div>
        <div v-if="currentPage == 'landingPage'">
            <LandingPage
                @registerUser="registerUser"
                @loginUser="loginUser"
            ></LandingPage>
        </div>
        <div v-else-if="currentPage == 'mainPage'">
            <MainPage
                :Tasks="Tasks"
                :Users="Users"
                @createTask="createTask"
                @updateTask="updateTask"
                @changeCategory="changeCategory"
                @deleteTask="deleteTask"
            >
            </MainPage>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import LandingPage from './pages/LandingPage'
import MainPage from './pages/MainPage'

export default {
    name: 'App',
    components: {
        LandingPage,
        MainPage
    },
    data: function() {
        return {
            baseUrl: 'http://localhost:3000',
            Tasks: [],
            Users: [],
            currentUser: {
                id: ''
            },
            currentPage: 'landingPage'
        }
    },
    methods: {
        fetchTasks() {
            axios({
                method: 'get',
                url: `${this.baseUrl}/tasks`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(response => {
                    console.log(response.data.Tasks)
                    this.Tasks = response.data.Tasks
                })
                .catch(err => {
                    console.log(err)
                })
        },

        fetchUsers() {
            axios({
                method: 'get',
                url: `${this.baseUrl}/users`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(response => {
                    console.log(response.data.Users)
                    this.Users = response.data.Users
                })
                .catch(err => {
                    console.log(err)
                })
        },

        registerUser(newUser) {
            console.log('newuser', newUser)
            let {name, organization, email, password} = newUser
            axios({
                method: 'post',
                url: `${this.baseUrl}/users/register`,
                data: {
                    name,
                    organization,
                    email,
                    password
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        loginUser(user) {
            console.log('user', user)
            let {email, password} = user
            axios({
                method: 'post',
                url: `${this.baseUrl}/users/login`,
                data: {
                    email,
                    password
                }
            })
                .then(response => {
                    console.log(response)
                    this.currentPage = "mainPage"
                    this.fetchTasks()
                    this.fetchUsers()
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('currentUserId', response.data.user.id)
                    localStorage.setItem('currentUserName', response.data.user.name)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        createTask(newTask) {
            console.log('New Task:', newTask)
            let {title, description, category, priority, deadline, AssigneeId} = newTask
            axios({
                method: 'post',
                url: `${this.baseUrl}/tasks`,
                data: {
                    title,
                    description,
                    category,
                    priority,
                    deadline,
                    AssigneeId,
                },
                headers: {
                    token: localStorage.token
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        updateTask(id, editedTask) {
            console.log('EditedTask:', editedTask)
            let {title, description, category, priority, deadline, AssigneeId} = editedTask
            axios({
                method: 'put',
                url: `${this.baseUrl}/tasks/${id}`,
                data: {
                    title,
                    description,
                    category,
                    priority,
                    deadline,
                    AssigneeId,
                },
                headers: {
                    token: localStorage.token
                }

            })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        changeCategory(id, status) {
            console.log('id', id, 'status', status)
            axios({
                method: 'patch',
                url: `${this.baseUrl}/tasks/${id}`,
                data: {
                    id,
                    category: status
                },
                headers: {
                    token: localStorage.token
                }

            })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        deleteTask(id) {
            console.log('delete', id)
            axios({
                method: 'delete',
                url: `${this.baseUrl}/tasks/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        logoutUser() {
            this.currentPage = 'landingPage'
            localStorage.clear()
        }
    },
    created() {
        if(localStorage.token) {
            this.currentPage = 'mainPage'
            this.fetchTasks()
            this.fetchUsers()
        } else {
            this.currentPage = 'landingPage'
        }
    }


}
</script>

<style>

</style>