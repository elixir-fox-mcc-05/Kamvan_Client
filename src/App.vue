<template>
    <div>
        <div v-if="currentPage == 'landingPage'">
            <LandingPage
                :currentErr="currentErr"
                :currentNotif="currentNotif"
                @registerUser="registerUser"
                @loginUser="loginUser"
                @logoutUser="logoutUser"
                @showHome="showHome"
                @success="onSignInSuccess"
                @error="onSignInError"
                :currentPage="currentPage"
            ></LandingPage>
        </div>
        <div v-else-if="currentPage == 'mainPage'">
            <MainPage
                :Tasks="Tasks"
                :Users="Users"
                :currentPage="currentPage"
                :currentErr="currentErr"
                :currentNotif="currentNotif"
                @createTask="createTask"
                @updateTask="updateTask"
                @changeCategory="changeCategory"
                @deleteTask="deleteTask"
                @showHome="showHome"
                @logoutUser="logoutUser"
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
            currentErr: '',
            currentNotif: '',
            currentPage: 'landingPage'
        }
    },
    methods: {
        showHome() {
            this.currentErr = ''
            this.currentNotif = ''
            if(localStorage.token) {
                this.currentPage = 'mainPage'
                this.fetchTasks()
                this.fetchUsers()
            } else {
                this.currentPage = 'landingPage'
            }
        },

        fetchTasks() {
            axios({
                method: 'get',
                url: `${this.baseUrl}/tasks`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(response => {
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
                    this.Users = response.data.Users
                })
                .catch(err => {
                    console.log(err)
                })
        },

        registerUser(newUser) {
            this.currentErr = ''
            this.currentNotif = ''
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
                    this.currentNotif = response.data.notif
                    this.fetchUsers()
                })
                .catch(err => {
                    this.currentErr = err
                    console.log(err)
                })
        },

        loginUser(user) {
            this.currentErr = ''
            this.currentNotif = ''
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
                    this.currentNotif = response.data.notif
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('currentUserId', response.data.user.id)
                    localStorage.setItem('currentUserName', response.data.user.name)
                    this.fetchTasks()
                    this.fetchUsers()
                    this.currentPage = "mainPage"
                })
                .catch(err => {
                    this.currentErr = err
                    console.log(err)
                })
        },

        createTask(newTask) {
            this.currentErr = ''
            this.currentNotif = ''
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
                    AssignorId: localStorage.currentUserId
                },
                headers: {
                    token: localStorage.token
                }
            })
                .then(response => {
                    this.currentNotif = response.data.notif
                    this.fetchTasks()
                })
                .catch(err => {
                    this.currentErr = err
                    console.log(err)
                })
        },

        updateTask(id, editedTask) {
            this.currentErr = ''
            this.currentNotif = ''
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
                    this.currentNotif = response.data.notif
                    this.fetchTasks()
                })
                .catch(err => {
                    this.currentErr = err
                    console.log(err)
                })
        },

        changeCategory(id, status) {
            this.currentErr = ''
            this.currentNotif = ''
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
                    this.currentNotif = response.data.notif
                    this.fetchTasks()
                })
                .catch(err => {
                    this.currentErr = err
                    console.log(err)
                })
        },

        deleteTask(id) {
            this.currentErr = ''
            this.currentNotif = ''
            axios({
                method: 'delete',
                url: `${this.baseUrl}/tasks/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(response => {
                    this.currentNotif = response.data.notif
                    this.fetchTasks()
                })
                .catch(err => {
                    this.currentErr = err
                    console.log(err)
                })
        },

        logoutUser() {
            this.currentErr = ''
            this.currentNotif = ''
            localStorage.clear()
            this.currentPage = 'landingPage'
        },

        onSignInSuccess (googleUser) {
            this.currentErr = ''
            this.currentNotif = ''
            const profile = googleUser.getBasicProfile()
            let name = profile.getName()
            let email = profile.getEmail()
            let id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: 'GET',
                url: `${this.baseUrl}/users/google-login`,
                headers: {
                    google_token: id_token,
                    name,
                    email,
                }
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('currentUserId', response.data.user.id)
                    localStorage.setItem('currentUserName', response.data.user.name)
                    this.fetchTasks()
                    this.fetchUsers()
                    this.currentPage = "mainPage"
                })
                .catch(err => {
                    this.currentErr = err
                    console.log(err);
                })
        },

        onSignInError (error) {
            this.currentErr = ''
            this.currentNotif = ''
            console.log('OH NOES', error)
        },

        showError(err) {
            this.currentNotif = ''
            this.currentErr = err
        },

        showNotif(notif) {
            this.currentErr = ''
            this.currentNotif = notif
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