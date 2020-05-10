<template>
  <!-- LOGIN PAGE -->
        <div class="container">
              <login-content 
                  :baseUrl='baseUrl'
                  :isLogin='isLogin'
                  :user='user'
                  :newUser='newUser'
                  @getTasks='getTasks'
                  @changeLogin='changeLogin'
              />
        </div>
        <!-- END OF LOGIN PAGE   -->
</template>

<script>
import LoginContent from '../component/LoginContent'

export default {
    name: 'LoginPage',
    props: [
      'baseUrl',
      'isLogin',
      'user',
      'newUser'
    ],
    components: {
      LoginContent
    },
    methods: {
      getTasks() {
        this.$emit('getTasks')
      },
      changeLogin() {
        this.$emit('changeLogin', true)
      }
  }
}
</script>

<style>

</style>