<template>
    <div class="card mb-3 text-light" style="width: 16rem;" v-if="Task.category == category">
        <div class="card-header text-light" id="cardHead">
            <h5 class="card-text text-center font-weight-bolder">{{Task.title}}</h5>
        </div>
        <div class="card-body" id="cardBody">
            <p class="card-text text-left font-weight-bolder">Priority: {{Task.priority}}</p>
            <p class="card-text text-left font-weight-normal">Deadline: {{Task.deadline}}</p>
            <p class="card-text text-left font-weight-normal">Assign By: {{Task.AssignorDetail.name}}</p>
            <p class="card-text text-left font-weight-normal">Assign To: {{Task.AssigneeDetail.name}}</p>
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

<style scoped>
#cardHead {
    background-color: #00897b ;
}

#cardBody {
    background-color: #282828;
    
}
p {
    color: white;
}
</style>