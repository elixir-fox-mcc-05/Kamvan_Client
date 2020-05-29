<template>
    <div id="App">
        <LandingPage
        v-if="page == 'landingPage'"
        @toMainPage="toMainPage"
        >
        </LandingPage>
        <MainPage
        v-if="page == 'mainPage'"
        @toLandingPage="toLandingPage"
        >
        </MainPage>
        <Footer></Footer>
    </div>
</template>

<script>
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'
import Footer from './components//Footer'
export default {
    name: 'App',
    components: {
        LandingPage, MainPage, Footer
    },
    data() {
        return {
            page: 'landingPage'
        }
    },
    methods: {
        toMainPage(){
            this.page = 'mainPage'
        },
        toLandingPage() {
            this.page = 'landingPage'
        }
    },
    created() {
        if(localStorage.token) {
            this.page = 'mainPage'
        }
        else {
            this.page = 'landingPage'
        }
    }
};
</script>

<style>
</style>
