<template>
    <div @submit.prevent="submitForm" class="form-container">
        <h2 class="text-center mt-4">Edit Task</h2>
        <form action="" class="mt-4">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" :value="this.activity.title" name="title" class="form-control">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" :value="this.activity.description" name="description" class="form-control">
            </div>
            <!-- <div class="form-group">
                <label for="status">Status</label>
                <select name="status" id="" class="form-control">
                    <option disabled>Select:</option>
                    <option>Backlog</option>
                    <option>ToDo</option>
                    <option>Doing</option>
                    <option>Done</option>
                </select>
            </div> -->
            <div class="form-group">
                <label for="point">Points</label>
                <input type="number" :value="this.activity.point" name="point" placeholder="Your Point" class="form-control">
                <div></div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button @click.prevent="backToMainSection" type="submit" class="btn btn-primary">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'KanbanUpdate',
    props: ['activity'],
    data() {
        return {
            title: '',
            description: '',
            point: '',
        }
    },
    methods: {
        submitForm(event) {
            const token = localStorage.token;
            const axios = require('axios');
            const id = this.activity.id;
            this.title = event.target.elements.title.value;
            this.description = event.target.elements.description.value;
            this.point = event.target.elements.point.value;
            axios.patch(`http://localhost:3000/kanbans/${id}`, {
                title: this.title,
                description: this.description,
                point: this.point,
            }, { 
                headers: { token }
                }
            )
            .then(response => {
                const { data } = response;
                const token = data.Token;
                this.$emit('fetchKanban');
                this.$emit('changeLogin', true);
                
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
        backToMainSection() {
            this.$emit('fetchKanban');
            this.$emit('changeLogin', true);
        }
    }
}
</script>

<style>

</style>