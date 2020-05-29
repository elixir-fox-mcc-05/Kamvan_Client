<template>
    <div>
        <b-modal id='updateTaskModal'
        ref='updateTaskModal'
        hide-footer
        no-close-on-backdrop
        centered
        size="lg"
        >
        <template v-slot:modal-title>
            {{ updateTitle }}
        </template>
            <h6 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h6>
            <form v-on:submit.prevent="updateTask">
                <div class="modal-body my-0">
                    <div class="form-label-group mt-0">
                        <label for="updateDescription"><strong>Description</strong></label>
                        <textarea type="text" v-model="updateDescription" class="form-control" placeholder="Task Description"></textarea>
                    </div><br>
                    <div class="form-label-group mb-3">
                        <label for="updateCategory"><strong>Category</strong></label>
                        <b-form-select v-model="updateCategory">
                            <b-form-select-option value="Back Log">Back Log</b-form-select-option>
                            <b-form-select-option value="To Do">To Do</b-form-select-option>
                            <b-form-select-option value="Doing">Doing</b-form-select-option>
                            <b-form-select-option value="Done">Done</b-form-select-option>
                        </b-form-select>
                    </div>
                    <p><strong>created by :</strong> {{ updateUserEmail }} </p>
                </div>
                <div class="modal-footer border-top-0 d-flex justify-content-around">
                    <button type="submit" class="btn btn-warning">Update</button>
                    <b-button id="popover-button-variant" class="btn btn-danger">Delete</b-button>
                    <b-popover target="popover-button-variant" placement="top" variant="danger" triggers="focus">
                            <template v-slot:title>Are you sure?</template>
                            <div class="text-center">
                                <button type="button" @click.prevent="deleteTask(updateTaskId)" class="btn btn-dark btn-sm">Yes</button>
                            </div>
                    </b-popover>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'UpdateTaskModal',
    data() {
        return {
            updateTitle: '',
            updateDescription: '',
            updateCategory: '',
            updateUserEmail: '',
            updateTaskId: '',
            errorMessage: false
        }
    },
    methods: {
        showUpdateTask(data) {
            this.$refs.updateTaskModal.show()
            this.errorMessage = false
            this.updateTitle = data.title
            this.updateDescription = data.description
            this.updateCategory = data.category
            this.updateUserEmail = data.UserEmail
            this.updateTaskId = data.id
        },
        updateTask() {
            axios.put(`http://localhost:3000/tasks/${this.updateTaskId}`, {
                title: this.updateTitle,
                description: this.updateDescription,
                category: this.updateCategory
            }, {
                headers: {
                    token: localStorage.token
                }
            })
                .then(_ => {
                    this.$refs.updateTaskModal.hide()
                    this.$emit('updateTask')
                })
                .catch(err => {
                    this.errorMessage = err.response.data.errors[0].message
                })
        },
        deleteTask(taskId) {
            axios.delete(`http://localhost:3000/tasks/${taskId}`, {
                headers: {
                    token: localStorage.token
                }
            })
                .then(_ => {
                    this.errorMessage = false
                    this.$refs.updateTaskModal.hide()
                    this.$emit('deleteTask')
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