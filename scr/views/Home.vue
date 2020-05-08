<template>
  <div id="container">
      <nav class="navbar navbar-dark bg-primary d-flex" style="background-color: #e3f2fd;">     
                      
            <h4>Welcome To G-Kanban {{activeuser}}</h4>
            <button type="button" class="btn btn-primary fa fa-sign-out" @click.prevent="signout"></button>     
          
    </nav>
    <div class="container-login100" style="background-image: url('/images/bg-01.jpg');">
<!-- 
        <div id="container-header">
          <div><h5>Back Log</h5></div>
          <div><h5>Todo</h5></div>
          <div><h5>Done</h5></div>
          <div><h5>Completed</h5></div>
        </div> -->
      
      <add-task v-if="formadd && !formedit" @cancelbutton="cancelbutton" @refreshData="refreshData"></add-task>
      <edit-task v-else-if="!formadd && formedit" @canceleditbutton="canceleditbutton" @refreshData="refreshData" :dataedit="editdata"></edit-task>
      <card-container :dataAllTaskFromHome="dataAllTaskFromApp" @refreshData="refreshData" v-else @addbutton="addbutton" @editbutton="editbutton"></card-container>
    </div>
  </div>

</template>

<script>
import CardContainer from '../components/cardContainer'
import AddTask from '../components/AddTask'
import EditTask from '../components/EditTask'
import axios from 'axios'
export default {
    name:"HomePage",
    components:{
        CardContainer,
        AddTask,
        EditTask        
    },
    data(){
      return{
        formadd : false,
        formedit: false,
        activeuser:localStorage.username,
        editdata:{
          idtask:'',
          title:'',
          description:''
        }
      }
    },
    props:['dataAllTaskFromApp'],
    methods:{
      refreshData(){
        this.formadd = false
        this.formedit = false
        this.$emit('refreshData')
      },
      addbutton(){        
        this.formadd = true
      }, 
      editbutton(id,title,des){
        this.editdata.idtask = id
        this.editdata.title = title
        this.editdata.description = des
        console.log(this.editdata.idtask,this.editdata.title,this.editdata.description);
        
        this.formedit = true
      },
      canceleditbutton(){        
        this.formedit = false
      },
      cancelbutton(){
         this.formadd = false
      },
      signout(){
        this.$emit('logout')
      }
    }
    

}
</script>

<style>

</style>