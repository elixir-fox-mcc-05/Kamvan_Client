<template>
    <div>
        <section id="mainPage">
            <div class="container-fluid mt-3">
                <div class="row" >
                    <kanbanBoard
                    v-for="category in Categories" :key="category"
                    :category="category"
                    :Tasks="Tasks"
                    :Users="Users"
                    @updateTask="updateTask"
                >
                </kanbanBoard>
                </div>

            </div>

            <NewTaskModal :Users="Users" @createTask="createTask"></NewTaskModal>

        </section>
    </div>
</template>

<script>
import kanbanBoard from './3-1-kanbanBoard'
import NewTaskModal from './NewTaskModal'

export default {
    name: 'mainPage',
    data: () => {
        return {
            Categories: ['Back-Log', 'Todo', 'Doing', 'Done']
        }
    },
    components: {
        kanbanBoard, NewTaskModal
    },
    props: [ 'Tasks', 'Users' ],
    methods: {
        createTask(newTask) {
            this.$emit('createTask', newTask)
        },
        updateTask(editedTask) {
            this.$emit('updateTask', editedTask)
        }
    }
}
</script>

<style>

</style>