<template>
    <div>
        <section id="landingPage" v-if="displayPage === 'login'">
            <div class="container-fluid" id="container">
                <div id="form">
                    <landing @confirmLogin="confirmLogin"></landing>    
                </div>
            </div>
        </section>
        <!-- dasboard -->
        <section id="dashboard" v-else-if="displayPage === 'dashboard' ">
            <div class="container">
                <dashboard></dashboard>
            </div>
        </section>

    </div>
</template>

<script>
import landing from './components/landing/landing'
import dashboard from './components/dashboard/dashboard'
export default {
    components : {
        landing,
        dashboard
    },
    name : "App",
    data() {
        return {
            displayPage : 'login',
        }
    },
    methods : {
        confirmLogin() {
            this.displayPage = 'dashboard'
        },
        confirmLogout(){
            this.displayPage = 'login'
        }
    },
    created() {
        let token = localStorage.getItem('kamvanToken')
        if(token) {
            this.displayPage = 'dashboard'
            // this.fetchTaskList()
        } else {
            this.displayPage = 'login'
        }
    }
}
</script>

<style>

</style>