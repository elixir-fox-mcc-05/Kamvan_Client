<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
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
                <div class="modal-footer">
                    <button type="button btn-sm" class="btn btn-primary" data-dismiss="modal">Before</button>
                    <button type="button btn-sm" class="btn btn-warning" data-toggle="modal" :data-target="target">Modify</button>
                    <button type="button btn-sm" class="btn btn-danger">Delete</button>
                    <button type="button btn-sm" class="btn btn-success" data-dismiss="modal">Next</button>
                </div>
            </div>
        </div>
        <EditTaskModal
            :Task="Task"
            :Users="Users"
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
            target: `#modalEditTask${this.Task.id}`
        }
    },
    props: [ 'Task', 'Users' ],
    methods: {
        updateTask(editedTask) {
            this.$emit('updateTask', editedTask)
        }
    }
}
</script>

<style>

</style>