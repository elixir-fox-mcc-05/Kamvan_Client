<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-light">
                    <h5 class="modal-title">{{Task.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="">Description</p>
                    <p class="text-left font-weight-light">{{Task.description}}</p>
                    <p class="">Category:</p>
                    <p class=" text-left font-weight-light">{{Task.category}}</p>
                    <p class="">Priority:</p>
                    <p class=" text-left font-weight-light">{{Task.priority}}</p>
                    <p class="">Deadline:</p>
                    <p class=" text-left font-weight-light">{{Task.deadline}}</p>
                    <p class="">Assign By:</p>
                    <p class=" text-left font-weight-light">{{Task.AssignorDetail.name}}</p>
                    <p class="">Assign To:</p>
                    <p class=" text-left font-weight-light">{{Task.AssigneeDetail.name}}</p>
                </div>
                <div class="modal-footer justify-content-between" v-if="Task.AssignorId == currentUserId">
                    <div>
                        <button v-if="Task.category == 'Todo'" type="button" class="btn btn-danger btn-sm" data-dismiss="modal" @click.prevent="changeCategory(Task.id,'Back-Log')">Back-Log</button>
                        <button v-else-if="Task.category == 'Doing'" type="button" class="btn btn-warning btn-sm" data-dismiss="modal" @click.prevent="changeCategory(Task.id,'Todo')">Todo</button>
                        <button v-else-if="Task.category == 'Done'" type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click.prevent="changeCategory(Task.id,'Doing')">Doing</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" :data-target="target">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" @click.prevent="deleteTask(Task.id)">Delete</button>
                    </div>
                    <div>
                        <button v-if="Task.category == 'Back-Log'" type="button" class="btn btn-warning btn-sm" data-dismiss="modal" @click.prevent="changeCategory(Task.id,'Todo')">Todo</button>
                        <button v-else-if="Task.category == 'Todo'" type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click.prevent="changeCategory(Task.id,'Doing')">Doing</button>
                        <button v-else-if="Task.category == 'Doing'" type="button" class="btn btn-success btn-sm" data-dismiss="modal" @click.prevent="changeCategory(Task.id,'Done')">Done</button>
                    </div>
                </div>
            </div>
        </div>
        <EditTaskModal
            :Task="Task"
            :Users="Users"
            @updateTask="updateTask"
        ></EditTaskModal>
    </div>
</template>

<script>
import EditTaskModal from './EditTaskModal'

export default {
    name: 'DetailTaskModal',
    components: {
        EditTaskModal
    },
    data() {
        return {
            modalId: `modalDetailTask${this.Task.id}`,
            target: `#modalEditTask${this.Task.id}`,
            currentUserId: localStorage.currentUserId
        }
    },
    props: [ 'Task', 'Users' ],
    methods: {
        updateTask(id, editedTask) {
            this.$emit('updateTask', id, editedTask)
        },

        changeCategory(id, status) {
            this.$emit('changeCategory', id, status)
        },

        deleteTask(id) {
            this.$emit('deleteTask', id)
        }
    }
}
</script>

<style>

</style>