<template>
    <div @submit.prevent="submitForm" class="form-container">
        <h2 class="text-center mt-4">Add Task</h2>
        <form action="" class="mt-4">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" placeholder="Your Title" class="form-control" v-model="title">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" name="description" placeholder="Your Description" class="form-control" v-model="description">
            </div>
            <div class="form-group">
                <label for="point">Points</label>
                <input type="number" name="point" placeholder="Your Point" class="form-control" v-model="point">
                <div v-html="feedback"></div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button @click.prevent="backToMainSection" class="btn btn-primary">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'KanbanAdd',
    data() {
        return {
            title: '',
            description: '',
            point: '',
            feedback: ``
        }
    },
    methods: {
        submitForm() {
            const token = localStorage.token;
            const axios = require('axios');
            axios.post('http://localhost:3000/kanbans', {
                title: this.title,
                description: this.description,
                point: this.point
            }, {
                headers: {
                    token
                }
            }
            )
            .then(response => {
                const { data } = response;
                this.$emit('fetchKanban');
                this.$emit('changeLogin', true);
                this.title = '';
                this.point = '';
                this.description = '';
                this.feedback = '';
                const Swal = require('sweetalert2');
                Swal.fire(
                    'Good job!',
                    'Succsessfully Add Item!',
                    'success'
                )
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