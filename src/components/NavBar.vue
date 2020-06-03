<template>
  <div>
    <nav class="navbar bg-secondary justify-content-between border-bottom border-dark">
        <div>
            <h3 class="font-weight-bold my-0">{{ organizationName }} Kanban Board</h3>
            <h5 class="font-weight-bold my-0">Welcome {{ emailName }} </h5>
        </div>
        <button class="btn btn-primary btn-md" type="button" @click.prevent="showAddTask">
            <strong>NEW TASK</strong>
        </button>
        <button class="btn btn-dark btn-md" type="button" @click.prevent="toLandingPage">
            <GoogleLogin :params="params" :logoutButton="true"><strong>LOGOUT<strong></GoogleLogin>
        </button>
    </nav>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name: 'NavBar',
    components: {
        GoogleLogin
    },
    data() {
        return {
            emailName: localStorage.email || null,
            organizationName: localStorage.organization || null,
            params: {
                client_id: "188097869036-3uh64feh8ahg3p41jvf49g7589a1l6hm.apps.googleusercontent.com"
            }
        }
    },
    methods: {
        showAddTask() {
            this.$emit('showAddTask')
        },
        toLandingPage() {
            this.$emit('toLandingPage');
        }

    }
}
</script>

<style>
</style>