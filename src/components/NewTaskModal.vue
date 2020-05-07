<template>
    <div class="modal fade" id="modalNewTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="">New Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="clearData">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="newTitle">Title</label>
                            <input type="text" v-model="newTask.title" class="form-control" id="newTitle" placeholder="title">
                        </div>
                        <div class="form-group">
                            <label for="newDescription">Description</label>
                            <textarea class="form-control" v-model="newTask.description" id="newDescription" rows="3" placeholder="write description here"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="newCategory">Category</label>
                            <select class="form-control" v-model="newTask.category">
                                <option>Back-Log</option>
                                <option>Todo</option>
                                <option>Doing</option>
                                <option>Done</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newPriority">Priority</label>
                            <select class="form-control" v-model="newTask.priority">
                                <option>Normal</option>
                                <option>Important</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newDeadline">Deadline</label>
                            <input type="date"  v-model="newTask.deadline" class="form-control" id="newDeadline">
                        </div>
                        <div class="form-group">
                            <label for="newAssignee">Assign To</label>
                            <select class="form-control" v-model="newTask.AssigneeId">
                                <option v-for="User in Users" :key="User.id" :value="User.id">{{User.name}}</option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" @click.prevent="clearData">Cancel</button>
                        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click.prevent="createTask">Save</button>    
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
    name: 'NewTaskModal',
    data() {
        return {
            newTask: {
                title: '',
                description: '',
                category: '',
                priority: '',
                deadline: '',
                AssigneeId: '',
            }
        }
    },
    props: [ 'Users' ],
    methods: {
        clearData() {
            this.newTask.title = ''
            this.newTask.description = ''
            this.newTask.category = ''
            this.newTask.priority = ''
            this.newTask.deadline = ''
            this.newTask.AssigneeId = ''
        },

        createTask() {
            let newTask = this.newTask
            this.$emit('createTask', newTask)
        }
    }
}
</script>

<style>

</style>