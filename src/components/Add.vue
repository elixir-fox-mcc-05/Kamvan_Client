<template>
    <div class="container bg-light mt-5 w-75 mb-5 pb-3">
        <form id="add-form" @submit.prevent="addNewTask">
            <h3 class="mt-3 text-center">Add New Task</h3>
            <div class="form-group">
                <label for="title">Task Title</label>
                <input type="text" class="form-control" v-model="taskTitle" placeholder="your task title">
            </div>
            <div class="form-group">
                <label for="description">Task Description</label>
                <textarea type="text" class="form-control" v-model="taskDescription" rows="3" placeholder="your task description"></textarea>
            </div>
            <div class="form-group">
                <label for="due_date">Task Due Date</label>
                <input type="date" class="form-control" v-model="taskDueDate" placeholder="your task due date">
            </div>
            <input type="submit" class="btn btn-primary btn-block" value="Add New Task">
            <button type="button" class="btn btn-danger btn-block" @click="$emit('cancel')">Cancel</button>
            <Error
                v-if="errorDetected"
                :alertMessage="alertMessage"
            >
    </Error>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Error from './Error';

export default {
    name: 'AddTaskForm',
    components: {
        Error
    },
    data() {
        return {
            taskTitle: '',
            taskDescription: '',
            taskDueDate: '',
            alertMessage:'',
            errorDetected: false
        }
    },
    methods: {
        addNewTask() {
            const { access_token } = localStorage;
            axios.post('http://localhost:4000/tasks', {
                title: this.taskTitle,
                description: this.taskDescription,
                due_date: this.taskDueDate
            },{
                headers: {
                    access_token
                }
            })
                .then(res => {
                    this.$emit('renew');
                    this.alertMessage = '';
                    this.errorDetected = false;
                })
                .catch(err => {
                    this.errorDetected = true;
                    if(Array.isArray(err.response.data.error)) {
                        let errors = '';
                        err.response.data.error.forEach(e =>  {
                            errors += `${e}, `
                        })
                        this.alertMessage = errors.substring(0, errors.length-2);
                    } else {
                        this.alertMessage = err.response.data.error;
                    }
                })
        }
    }
}
</script>

<style>

</style>