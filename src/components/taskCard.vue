<template>
  <div id="taskCard">
    <div class="p-3 m-1" style="background-color: wheat;">
      <div class="column" >
          <h4 style="max-width:100%; width:100%; overflow-wrap: break-word">{{task.title}}</h4> 
          <p>Due date:  {{properDateFormat}}</p>
          <div style="display: flex; justify-content: center;">
              <button type="button" class="btn btn-info btn-lg" data-toggle="modal" :data-target="`#task-${task.id}`" data-backdrop="false">Show Task Detail</button>
          </div>
      </div>
      <!-- MODAL HERE -->
      <!-- <div>
        <b-button v-b-modal.modal-1>Launch demo modal</b-button>

        <b-modal id="modal-1" title="BootstrapVue">
          <p class="my-4">Hello from modal!</p>
        </b-modal>
      </div> -->

      <div :id="`task-${task.id}`" class="modal fade" role="dialog">

        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close mr-3" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 class="modal-title">{{task.title}}</h4>
              </div>
              <div class="modal-body">
                  <p><b>Description:</b></p>
                  <p>{{task.description}}</p>
                  <p>Due date: {{properDateFormat}}</p>
              </div>
              <div class="modal-footer">
                <div> 
                  <button class="btn btn-info" @click="editTaskCategory(task.id , 'backlog')" v-if="task.category === 'todo'">Backlog</button>
                  <button class="btn btn-info" @click="editTaskCategory(task.id , 'todo')" v-else-if="task.category === 'doing'">Todo</button>
                  <button class="btn btn-info" @click="editTaskCategory(task.id , 'doing')" v-else-if="task.category === 'done'">Doing</button>
                </div>
                <div>
                  <button type="button" class="btn btn-warning" @click="editCertainTask(`${task.id}`)">Edit</button>
                  <button type="button" class="btn btn-danger" @click="deleteCertainTask(`${task.id}`)">Delete</button>
                </div>
                <div>
                  <button class="btn btn-info" @click="editTaskCategory(task.id , 'todo')" v-if="task.category === 'backlog'">Todo</button>
                  <button class="btn btn-info" @click="editTaskCategory(task.id , 'doing')" v-else-if="task.category === 'todo'">Doing</button>
                  <button class="btn btn-info" @click="editTaskCategory(task.id , 'done')" v-else-if="task.category === 'doing'">Done</button>
                </div>

              </div>
          </div>


        </div>

      </div>
    
    
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'taskCard',
  props: [ 'task' ],
  data (){
    return {
      selected:""
    }
  },
  methods:{
    editCertainTask( selectedTaskId ){
      $(`#task-${selectedTaskId}`).modal('hide')
      this.$emit( 'setSelectedTaskId', selectedTaskId)
      this.changePage('editTaskPage')
    },
    editTaskCategory( selectedTaskId, newCategory ){
      $(`#task-${selectedTaskId}`).modal('hide')
      axios({
        method: 'PATCH',
        url: 'https://fierce-savannah-25696.herokuapp.com/tasks/' + selectedTaskId + '/?newCategory=' + newCategory,
        headers:{
          access_token: localStorage.access_token
        }
      })
        .then(result =>{
          this.$emit('refetchAllTasks')
          this.changePage('dashboard')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCertainTask( selectedTaskId ){
      $(`#task-${selectedTaskId}`).modal('hide')
      axios({
        method: 'DELETE',
        url: 'https://fierce-savannah-25696.herokuapp.com/tasks/' + selectedTaskId,
        headers:{
          access_token: localStorage.access_token
        }
      })
        .then(result =>{
          this.$emit('refetchAllTasks')
          this.changePage('dashboard')
        })
        .catch(error => {
          console.log(error)
        })
    },
    changePage(page){
      this.$emit( 'changePage', page )
    }
  },
  computed:{
    properDateFormat(){
      // return ('hello hello' + this.task.due_date)
      let StringDate = new Date(this.task.due_date)
      return StringDate.toISOString().substring(0, 10)
    }
  }
}
</script>

<style>

</style>