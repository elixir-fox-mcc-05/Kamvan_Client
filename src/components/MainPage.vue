<template>
  <div>
    <NavBar @toLandingPage="toLandingPage"></NavBar>
      ini main page
  </div>
</template>

<script>
import NavBar from './NavBar'
export default {
    name: 'MainPage',
    components: {
        NavBar
    },
    methods: {
        toLandingPage() {
            this.$emit('toLandingPage');
            localStorage.clear()
        }
    }
}
</script>

<style>

</style>