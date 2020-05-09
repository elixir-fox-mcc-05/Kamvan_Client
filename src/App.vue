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
                @logout="logout"
                @getHome="getHome"
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
            currentPage: 'HomePage'
        }
    },
    methods: {
        login(user) {
            console.log('@login', user)
            let { email, password } = user
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
                    console.log(response)
                    this.currentPage = "Dashboard"
                    localStorage.setItem('access_token', response.data.access_token)
                })
                .catch(err => {
                    console.log('@axios', err)
                })
        },
        register(user) {
            console.log('@register', user)
            let { email, password } = user
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
                    console.log('Registration successful', response);
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
                this.currentPage = 'Dashboard'
            } else {
                this.currentPage = 'HomePage'
            }
        }
    },

    created() {
        if (localStorage.access_token) {
            this.currentPage = 'Dashboard'
        } else {
            this.currentPage = 'HomePage'
        }
    }

}
</script>

<style scoped>

</style>