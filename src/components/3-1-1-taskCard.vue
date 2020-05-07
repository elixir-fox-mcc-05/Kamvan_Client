<template>
    <div class="card mb-3 bg-light" style="width: 16rem;" v-if="Task.category == category">
        <div class="card-body">
            <h5 class="card-header">{{Task.title}}</h5>
            <p class="card-text text-left font-weight-light">Priority: {{Task.priority}}</p>
            <p class="card-text text-left font-weight-light">Deadline: {{Task.deadline}}</p>
            <p class="card-text text-left font-weight-light">Assign To: {{Task.AssigneeDetail.name}}</p>
            <a href="#" class="btn btn-primary btn-sm" data-toggle="modal" :data-target="target">Show Detail</a>
        </div>
        <DetailTaskModal
            :Task="Task"
            :Users="Users"
            @updateTask="updateTask"
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
        }
    }
}
</script>

<style>

</style>