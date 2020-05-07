<template>
    <div @submit.prevent="submitForm" class="form-container">
        <h2 class="text-center mt-4">Edit Task</h2>
        <form action="" class="mt-4">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" class="form-control" v-model="title">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" name="description" class="form-control" v-model="description">
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select name="status" id="" class="form-control" v-model="status">
                    <option disabled value="">Select:</option>
                    <option>Backlog</option>
                    <option>ToDo</option>
                    <option>Doing</option>
                    <option>Done</option>
                </select>
            </div>
            <div class="form-group">
                <label for="point">Points</label>
                <input type="number" name="point" placeholder="Your Point" class="form-control" v-model="point">
                <div></div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'KanbanUpdate',
    props: ['activity'],
    data() {
        return {
            title: this.titles,
            description: this.activity.description,
            status: this.activity.status,
            point: this.activity.point,
            taskId: this.activity.id
        }
    },
    methods: {
        submitForm() {
            const token = localStorage.token;
            const axios = require('axios');
            console.log(this.taskId);
            axios.patch(`http://localhost:3000/kanbans/${this.taskId}`, {
                title: this.title,
                description: this.description,
                point: this.point,
                status: this.status
            }, { 
                headers: { token }
                }
            )
            .then(response => {
                const { data } = response;
                const token = data.Token;
                this.$emit('changeLogin', this.hasil);
                
            })
            .catch(err => {
               err = err.response
                let { data } = err;
                let error = data.errors;
                for (let i = 0; i < error.length; i++) {
                    this.feedback = `<p>${error[i].message}</p>`
                    console.log(error[i].message);
                }
            })
        },
        computed: {
            titles() {
                return this.activity.title
            }
        }
    }
}
</script>

<style>

</style>