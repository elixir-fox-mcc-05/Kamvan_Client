<template>
    <div>
        <section id="mainPage">
            <Navbar
                @logoutUser="logoutUser"
                :currentPage="currentPage"
            ></Navbar>
            <ErrorSection
                :currentErr="currentErr"
            ></ErrorSection>
            <NotifSection
                :currentNotif="currentNotif"
            ></NotifSection>

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
import ErrorSection from '../components/ErrorSection'
import NotifSection from '../components/NotifSection'

export default {
    name: 'mainPage',
    data: () => {
        return {
            Categories: ['Back-Log', 'Todo', 'Doing', 'Done']
        }
    },
    components: {
        Navbar, KanbanBoard, NewTaskModal, ErrorSection, NotifSection
    },
    props: [ 'Tasks', 'Users', 'currentPage', 'currentErr', 'currentNotif' ],
    methods: {
        createTask(newTask) {
            this.$emit('createTask', newTask)
        },
        updateTask(id, editedTask) {
            this.$emit('updateTask', id,  editedTask)
        },
        changeCategory(id, status) {
            this.$emit('changeCategory', id, status)
        },
        deleteTask(id) {
            this.$emit('deleteTask', id)
        },
        logoutUser() {
            this.$emit('logoutUser')
        }
    }
}
</script>

<style>

</style>