<template>
    <div class="card mb-3 bg-light" style="width: 16rem;" v-if="Task.category == category">
        <div class="card-header text-light bg-dark">
            <h5 class="card-text text-center">{{Task.title}}</h5>
        </div>
        <div class="card-body">
            <p class="card-text text-left font-weight-light">Priority: {{Task.priority}}</p>
            <p class="card-text text-left font-weight-light">Deadline: {{Task.deadline}}</p>
            <p class="card-text text-left font-weight-light">Assign To: {{Task.AssigneeDetail.name}}</p>
            <a href="#" class="btn btn-primary btn-sm" data-toggle="modal" :data-target="target">Show Detail</a>
        </div>
        <DetailTaskModal
            :Task="Task"
            :Users="Users"
            @updateTask="updateTask"
            @changeCategory="changeCategory"
            @deleteTask="deleteTask"
        ></DetailTaskModal>
    </div>
</template>

<script>
import DetailTaskModal from './DetailTaskModal'
export default {
    name: 'taskCard',
    components: {
        DetailTaskModal
    },
    props: ['Task', 'category', 'Users'],
    data() {
        return {
            target: `#modalDetailTask${this.Task.id}`
        }
    },
    methods: {
        updateTask(editedTask) {
            this.$emit('updateTask', editedTask)
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