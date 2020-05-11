<template>
      <div ref="modal" :id="EditID" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="EditTask" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
              <div class="modal-header bg-dark text-light">
                    <h5 class="modal-title" id="">Edit Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <label for="CreateTitle">Edit Title</label>
                        <input type="text" v-model="EditTask.title" class="form-control" required autofocus>
                        
                        <label for="CreateDescription">Edit Description</label>
                        <textarea class="form-control" v-model="EditTask.description" rows="3">EditTask.description</textarea>
                    
                        <label for="CreateCategory">Change Category</label>
                        <select class="form-control" v-model="EditTask.category" required>
                            <option>Backlog</option>
                            <option>Todo</option>
                            <option>Doing</option>
                            <option>Done</option>
                        </select>
                    
                        <label for="CreateDue">Change Deadline</label><br>
                        <input type="date" v-model="EditTask.due_date" class="form-control" id="CreateDue" :min="Today"><br>
                        
                        
                    </form>
                </div>
              <div class="modal-footer justify-content-around align-items-centre">
                <button type="button" class="btn btn-danger btn-sm popover-test" data-content="Popover" data-dismiss="modal" @click.prevent="destroy(Task.id)">Delete</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="update()">Save changes</button>
              </div>
            </div>
          </div>
      </div>      
</template>

<script>
export default {
    name: "EditModal",
    props: [ 'Task' ],
    data() {
        return {
            Today: `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`,
            EditID: `EditModal${this.Task.id}`,
            ConfirmID: `ConfirmModal${this.Task.id}`,
            EditTask: {
                title: this.Task.title,
                description: this.Task.description,
                category: this.Task.category,
                due_date: this.Task.due_date.slice(0, 10)
            }
        }
    },
    methods: {
      destroy(id) {
        let self = this
        bootbox.confirm({
          message: "Sure you want to delete the task? You cannot undo this operation.",
          buttons: {
            confirm: {
                label: 'Yes, delete',
                className: 'btn-danger'
            },
            cancel: {
                label: 'No, take me back',
                className: 'btn-primary'
            }
          },
           callback: function (result) {
            if (result) self.$emit('destroy', id)
          }          
        })        
      },
      update() {
        let { id } = this.Task
        let editedTask = this.EditTask
        this.$emit('update', id, editedTask)}
    }
}
</script>

<style>

</style>