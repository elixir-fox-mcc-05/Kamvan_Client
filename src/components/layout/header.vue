<template>
      <div class="columns" >
        <div class="column" style="margin:2%;padding-top: 30px;"> 
          <h1 class="is-size-3">KamVan Board</h1>
        </div>
        <div class="column" style="margin:3%;position: relative;">
          <button @click.prevent="logout" class="button is-pulled-right is-danger is-outlined"  v-if="loggedIn == true">Logout</button>
          <button @click.prevent="addNewTaskForm" class="button is-pulled-right is-info is-outlined"  v-if="loggedIn == true">New Task</button>
           <button @click.prevent="switchlogin" class="button is-pulled-right is-primary is-light" v-if="loggedIn == false">Login</button>
             <button @click.prevent="switchregister" class="button is-pulled-right is-link is-light" v-if="loggedIn == false">Register</button>
        </div>
      </div>
      
</template>

<script>
export default {
    name : 'Headerside',
    methods : {
      logout(){
        this.$emit('logout')
      },
      addNewTaskForm(){
        this.$emit('addNewTaskForm')
      },
      switchregister(){
        this.$emit('switchregister')
      },
      switchlogin(){
        this.$emit('switchlogin')
      }
    },
    props : ['loggedIn']
}
</script>


<style>

</style>