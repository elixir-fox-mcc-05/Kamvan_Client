<template>
    <div>
        <section id="mainPage">
            <Navbar></Navbar>

            <div class="container-fluid mt-3">
                <div class="row" >
                    <KanbanBoard
                        v-for="category in Categories" :key="category"
                        :category="category"
                        :Tasks="Tasks"
                        :Users="Users"
                        @updateTask="updateTask"
                        @changeCategory="changeCategory"
                        @deleteTask="deleteTask"
                    >
                    </KanbanBoard>
                </div>
            </div>

            <NewTaskModal :Users="Users" @createTask="createTask"></NewTaskModal>

        </section>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import KanbanBoard from '../components/KanbanBoard'
import NewTaskModal from '../components/NewTaskModal'

export default {
    name: 'mainPage',
    data: () => {
        return {
            Categories: ['Back-Log', 'Todo', 'Doing', 'Done']
        }
    },
    components: {
        Navbar, KanbanBoard, NewTaskModal
    },
    props: [ 'Tasks', 'Users' ],
    methods: {
        createTask(newTask) {
            this.$emit('createTask', newTask)
        },
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