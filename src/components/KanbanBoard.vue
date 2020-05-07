<template>
    <div class="col pl-0 pr-0">
        <div class="container" id="container1">
            <div class="card text-left">
                <div class="card-header text-light bg-dark">
                    <h4>{{category}}</h4>
                </div>
                <div class="card-body align-items-center pt-4">
                    <TaskCard v-for="Task in Tasks" :key="Task.id"
                        :category="category"
                        :Task="Task"
                        :Users="Users"
                        @updateTask="updateTask"
                        @changeCategory="changeCategory"
                        @deleteTask="deleteTask"
                    >
                    </TaskCard>
                </div>
            </div>
        </div>        
    </div>

</template>

<script>
import TaskCard from '../components/TaskCard'

export default {
    name: 'kanbanBoard',
    components: {
        TaskCard
    },
    props: [ 'category', 'Tasks', 'Users' ],
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