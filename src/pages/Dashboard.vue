<template>
  <div>
    <Navbar 
      @logout="logout"
      @getHome="getHome"
      :currentPage="currentPage"    
    >
    </Navbar>
    
    <p>Bisa ke Dashboard</p>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Dashboard',
  components: {
    Navbar
  },
  props: ['currentPage'],
  methods: {    
    getHome() { this.$emit('getHome') },
    logout() { this.$emit('logout') }
  }
}
</script>

<style>

</style>