<template>
    <div>
        <LandingPage
                @login="login"
        ></LandingPage>       
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import LandingPage from './pages/LandingPage'

export default {
    name: 'App',
    components: {
        LandingPage
    },
    data: function() {
        return {
            baseUrl: 'http://localhost:3000',
            currentPage: 'landingPage'
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
                    this.currentPage = "mainPage"
                    localStorage.setItem('access_token', response.data.access_token)
                })
                .catch(err => {
                    console.log('@axios', err)
                })
        },
        register(user) {

        }
    }

}
</script>

<style scoped>

</style>