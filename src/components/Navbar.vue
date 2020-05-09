<template>
  <div id="Navbar" class="container-fluid">
      <div class="row align-items-center justify-content-between">
          <div class="col-6 justify-content-start">
              <a id="Home" class="btn" role="button" @click.prevent="getHome">Home</a>
          </div>
        <div v-if="currentPage == 'Dashboard'" class="col-5 justify-content-between pr-0">
            <a class="btn btn-primary btn-sm text-white" role="button" data-toggle="modal" data-target="#modalNewTask">New Task</a>
        </div>
        <div v-if="currentPage == 'Dashboard'" class="col-1 justify-content-between pr-0">
            <a class="btn btn-secondary btn-sm" role="button" @click="logout">Logout</a>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: [ 'currentPage' ],
    methods: {
        getHome() { this.$emit('getHome') },
        logout() { this.$emit('logout') }
    }
}
</script>

<style scoped>
#Home {
    background-color: black;
    color: blanchedalmond;
}
</style>