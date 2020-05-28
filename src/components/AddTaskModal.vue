<template>
    <div>
        <b-modal id='addTaskModal'
        ref='addTaskModal'
        hide-footer
        no-close-on-backdrop
        centered
        size="lg"
        >
        <template v-slot:modal-title>
            New Task
        </template>
            <h6 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h6>
            <form v-on:submit.prevent="addTask">
                <div class="modal-body">
                    <div class="form-label-group">
                        <label for="addTitle"><strong>Title</strong></label>
                        <input type="text" v-model="addTitle" class="form-control" placeholder="Title" required>
                    </div><br>
                    <div class="form-label-group">
                        <label for="addDescription"><strong>Description</strong></label>
                        <textarea type="text" v-model="addDescription" class="form-control" placeholder="Task Description"></textarea>
                    </div><br>
                </div>
                <div class="modal-footer border-top-0 d-flex justify-content-center">
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AddTaskModal',
    data() {
        return {
            addTitle: '',
            addDescription: '',
            errorMessage: false
        }
    },
    methods: {
        showAddTask() {
            this.$refs.addTaskModal.show()
            this.addTitle='',
            this.addDescription='',
            this.errorMessage = false
        },
        addTask() {
            axios.post('http://localhost:3000/tasks', {
                title: this.addTitle,
                description: this.addDescription
            }, {
                headers: {
                    token: localStorage.token
                }
            })
                .then(data => {
                    this.addTitle = ''
                    this.addDescription = ''
                    this.errorMessage = false
                    this.$refs.addTaskModal.hide()
                    this.$emit('addTask')
                })
                .catch(err => {
                    this.errorMessage = err.response.data.errors[0].message
                })
        }
    }
}
</script>

<style>

</style>