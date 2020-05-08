<template>
  <div id="app">
    <div>
        <loginPage 
          v-if="currentPage === 'loginPage'" 
          @changePage="changeCurrentPage"
          :successMessage="successMessage">
        </loginPage>
        <registerPage 
          v-else-if="currentPage === 'registerPage'" 
          @changePage="changeCurrentPage"
          @registerSuccessful="registerSuccessful"></registerPage>
        <dashboard 
          v-else-if="currentPage === 'dashboard'" 
          @changePage="changeCurrentPage"
          @setSelectedTaskId="setSelectedTaskId">
        </dashboard>
        <addTaskPage 
          v-else-if="currentPage === 'addTaskPage'" 
          @changePage="changeCurrentPage">
        </addTaskPage>
        <editTaskPage v-else-if="currentPage === 'editTaskPage'" 
          @changePage="changeCurrentPage"
          :selectedTaskId="selectedTaskId">
        </editTaskPage>
    </div>
  </div>
</template>

<script>
import loginPage from "./views/loginPage"
import registerPage from "./views/registerPage"
import dashboard from "./views/dashboard"
import addTaskPage from "./views/addTaskPage"
import editTaskPage from "./views/editTaskPage"

export default {
  name:'app',
  components:{
    loginPage,
    registerPage,
    dashboard,
    addTaskPage,
    editTaskPage 
  },
  data() {
    return {
      message: 'Hello world',
      currentPage: 'loginPage',
      successMessage: null,
      selectedTaskId:""
    };
  },
  methods:{
    setSelectedTaskId( selectedTaskId ){
      this.selectedTaskId = selectedTaskId
    },
    changeCurrentPage(page){
      this.currentPage = page
    },
    registerSuccessful(){
        this.successMessage = "Register successful!"
        setTimeout(() => { // pakai arrow function, supaya this tidak mengacu ke object yang salah
            this.successMessage = null
        }, 3000)
    }
  },
  created(){
    if(localStorage.access_token){
      this.changeCurrentPage('dashboard')
    }
  }
};
</script>

<style scoped>
</style>