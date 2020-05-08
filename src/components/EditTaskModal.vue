<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-light">
                    <h5 class="modal-title" id="">Edit Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="clearData">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="editTitle" class="text-dark font-weight-bolder">Title</label>
                            <input type="text" v-model="editTask.title" class="form-control" id="editTitle" placeholder="title">
                        </div>
                        <div class="form-group">
                            <label for="editDescription" class="text-dark font-weight-bolder">Description</label>
                            <textarea class="form-control" v-model="editTask.description" id="editDescription" rows="3" placeholder="write description here"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="editCategory" class="text-dark font-weight-bolder">Category</label>
                            <select class="form-control" v-model="editTask.category">
                                <option>Back-Log</option>
                                <option>Todo</option>
                                <option>Doing</option>
                                <option>Done</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="editPriority" class="text-dark font-weight-bolder">Priority</label>
                            <select class="form-control" v-model="editTask.priority">
                                <option>Normal</option>
                                <option>Important</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="editDeadline" class="text-dark font-weight-bolder">Deadline</label>
                            <input type="date"  v-model="editTask.deadline" class="form-control" id="editDeadline">
                        </div>
                        <div class="form-group">
                            <label for="editAssignee" class="text-dark font-weight-bolder">Assign To</label>
                            <select class="form-control" v-model="editTask.AssigneeId">
                                <option v-for="User in Users" :key="User.id" :value="User.id">{{User.name}}</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click.prevent="updateTask">Save</button>    
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'EditTaskModal',
    props: [ 'Task', 'Users' ],
    data() {
        return {
            modalId: `modalEditTask${this.Task.id}`,
            editTask: {
                title: this.Task.title,
                description: this.Task.description,
                category: this.Task.category,
                priority: this.Task.priority,
                deadline: this.Task.deadline,
                AssigneeId: this.Task.AssigneeId,
            }
        }
    },
    methods: {
        clearData() {
            this.editTask.title = ''
            this.editTask.description = ''
            this.editTask.category = ''
            this.editTask.priority = ''
            this.editTask.deadline = ''
            this.editTask.AssigneeId = ''
        },

        updateTask() {
            let id = this.Task.id
            let editedTask = this.editTask
            this.$emit('updateTask', id, editedTask)
        }
    }
}
</script>

<style>

</style>