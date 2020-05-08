<template>
    <div class="container bg-light mt-5 w-75 mb-5 pb-3">
        <form id="add-form" @submit.prevent="updateTask">
            <h3 class="mt-3 text-center">Edit Task</h3>
            <div class="form-group">
                <label for="title">Task Title</label>
                <input type="text" class="form-control" v-model="task.title" placeholder="your task title">
            </div>
            <div class="form-group">
                <label for="description">Task Description</label>
                <textarea type="text" class="form-control" v-model="task.description" rows="3" placeholder="your task description"></textarea>
            </div>
            <div class="form-group">
                <label for="due_date">Task Due Date</label>
                <input type="date" class="form-control" v-model="task.due_date" placeholder="your task due date">
            </div>
            <input type="submit" class="btn btn-primary btn-block" value="Edit Task">
            <button type="button" class="btn btn-danger btn-block" @click="$emit('cancel')">Cancel</button>
            <Error
                v-if="errorDetected"
                :alertMessage="alertMessage"
            >
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Error from './Error';

export default {
    name: 'EditTaskForm',
    components: {
        Error
    },
    props: ['task', 'alertMessage', 'errorDetected'],
    methods: {
        updateTask() {
            const { access_token } = localStorage;
            axios.put(`https://server-akbar-kanban.herokuapp.com/tasks/${this.task.id}`, {
                title: this.task.title,
                description: this.task.description,
                category: this.task.category,
                due_date: this.task.due_date,
            },{
                headers: {
                    access_token
                }
            })
                .then(res => {
                    this.$emit('renew');
                    this.$emit('noError')
                })
                .catch(err => {
                    this.$emit('errorDetected', err);
                })
        }
    }
}
</script>

<style>

</style>