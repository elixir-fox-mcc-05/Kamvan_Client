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
            <strong>LOGOUT</strong>
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