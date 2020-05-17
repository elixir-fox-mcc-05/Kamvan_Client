<template>
  <div class="nav-container">
    <ul>
    <div>
      <li><a href v-on:click="logout">Logout</a></li>
    </div>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    props: ['currentPage'],
    methods: {
      logout () {
          localStorage.clear()
      },
    },
  }
  
</script>

<style>

</style>