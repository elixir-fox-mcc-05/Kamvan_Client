<template>
  <div>
    <nav class="navbar bg-secondary justify-content-between border-bottom border-dark">
        <div>
            <h3 class="font-weight-bold my-0">{{ organizationName }} Kanban Board</h3>
            <h5 class="font-weight-bold my-0">Welcome {{ emailName }} </h5>
        </div>
        <button class="btn btn-primary btn-sm" type="button" @click.prevent="newTask">
            NEW TASK
        </button>
        <button class="btn btn-dark btn-sm" type="button" @click.prevent="toLandingPage">
            LOGOUT
        </button>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            emailName: localStorage.email || null,
            organizationName: localStorage.organization || null
        }
    },
    methods: {
        newTask() {

        },
        toLandingPage() {
            this.$emit('toLandingPage');
        }

    }
}
</script>

<style>
</style>