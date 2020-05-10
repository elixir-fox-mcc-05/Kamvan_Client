<template>
  <div id="Navbar" class="container-fluid">
      <div class="row align-items-center justify-content-around">
            <a id="Home" class="btn btn-dark btn-sm" role="button" @click.prevent="getHome">Home</a>
            <a v-if="currentPage == 'Dashboard'" class="btn btn-primary text-white" role="button" data-toggle="modal" data-target="#CreateModal">Add Task</a>
            <a v-if="currentPage == 'Dashboard'" id="Logout" class="btn btn-secondary btn-sm" role="button" @click="logout">Logout</a>
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
#Navbar {
    margin: 2vh;
}
#Home {
    color: blanchedalmond;
}
#Logout {
    color: blanchedalmond;
}
</style>