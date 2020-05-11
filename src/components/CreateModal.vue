<template>
  <div ref="modal" id="CreateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="CreateTask" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-light">
                    <h5 class="modal-title" id="">Add Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="clear()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <label for="CreateTitle">Title</label>
                        <input type="text" v-model="CreateTask.title" class="form-control" id="CreateTitle" required autofocus>
                        
                        <label for="CreateDescription">Description</label>
                        <textarea class="form-control" v-model="CreateTask.description" id="CreateDescription" rows="3">CreateTask.description</textarea>
                    
                        <label for="CreateCategory">Category</label>
                        <select class="form-control" v-model="CreateTask.category" required>
                            <option>Backlog</option>
                            <option>Todo</option>
                            <option>Doing</option>
                            <option>Done</option>
                        </select>
                    
                        <label for="CreateDue">Deadline</label><br>
                        <input type="date" v-model="CreateTask.due_date" class="form-control" id="CreateDue" :min="Today"><br>
                        <section class="row justify-content-around">
                            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="clear()">Clear</button>
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" @click.prevent="clear()">Cancel</button>
                            <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click.prevent="create()">Save</button>
                        </section>
                        
                    </form>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'CreateForm',
    data() {
        return {
            Today: `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`,
            CreateTask: {
                title: '',
                description: '',
                category: '',
                due_date: ''
            }
        }
    },
    methods: {
        clear() {
            for (const key in this.CreateTask) {
                this.CreateTask[key] = '' 
            }
        },

        // asyncCreate() {
        //     return new Promise((resolve, reject) => {
        //         const Task = this.CreateTask
        //         console.log('@modal', Task.category)
        //         this.$emit('create', Task)
        //     })  
        // },

        create() {
            const Task = this.CreateTask
            console.log('@modal', Task.category)
            this.$emit('create', Task)
            // this.clear() // async makes it impossible to clear after create
        }
    },
    mounted() {
        this.clear()
    }
}
</script>

<style>

</style>