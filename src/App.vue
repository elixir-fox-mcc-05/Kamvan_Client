<template>
    <div>
        <LandingPage
            @registerUser="registerUser"
            @loginUser="loginUser"
        ></LandingPage>
        <!-- <MainPage
            :Tasks="Tasks"
            :Users="Users"
            @createTask="createTask"
            @updateTask="updateTask"
            @changeCategory="changeCategory"
            @deleteTask="deleteTask"
        >
        </MainPage> -->
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
            CurrentUser: {},
            isLogin: false
        }
    },
    methods: {
        fetchTasks() {
            axios({
                method: 'get',
                url: `${this.baseUrl}/tasks`,
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
            // axios({
            //     method: 'post',
            //     url: `${this.baseUrl}/users/register`,
            //     data: {
            //         name,
            //         email,
            //         password
            //     }
            // })
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        },

        loginUser(user) {
            console.log('user', user)
            // axios({
            //     method: 'post',
            //     url: `${this.baseUrl}/users/login`,
            //     data: {
            //         email,
            //         password
            //     }
            // })
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        },

        createTask(newTask) {
            console.log('New Task:', newTask)
            // axios({
            //     method: 'post',
            //     url: `${this.baseUrl}/tasks`,
            //     data: {
            //         title,
            //         description,
            //         category,
            //         priority,
            //         deadline,
            //         AssigneeId,
            //     }
            // })
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        },

        updateTask(editedTask) {
            console.log('EditedTask:', editedTask)
            // axios({
            //     method: 'put',
            //     url: `${this.baseUrl}/tasks/${id}`,
            //     data: {
            //         title,
            //         description,
            //         category,
            //         priority,
            //         deadline,
            //         AssigneeId,
            //     }
            // })
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        },

        changeCategory(id, status) {
            console.log('id', id, 'status', status)
            // axios({
            //     method: 'patch',
            //     url: `${this.baseUrl}/tasks/${id}`,
            //     data: {
            //         category: status
            //     }
            // })
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        },

        deleteTask(id) {
            console.log('delete', id)
            // axios({
            //     method: 'delete',
            //     url: `${this.baseUrl}/tasks/${id}`,
            // })
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        }
    },
    created() {
        this.fetchTasks()
        this.fetchUsers()
    }


}
</script>

<style>

</style>