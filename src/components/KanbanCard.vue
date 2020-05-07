<template>
    <div>
        <div class="container mini-container">
            <div class="card semi-container">
                <div class="card-header text-white bg-primary">
                    {{ task.title }}
                </div>
                <div class="card-body">
                    <p class="card-text">{{ task.description }}</p>
                    <p class="card-text">{{ task.point }}</p>
                    <div class="btn-kanban">
                        <a @click.prevent="showEditForm" href="" class="btn btn-success">Edit</a>
                        <a @click.prevent="deleteKanban" href="" class="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KanbanCard', 
    props: ['task'],
    methods: {
        showEditForm() {
            this.$emit('showEditForm', this.task);
        },
        deleteKanban() {
            const axios = require('axios');
            axios.delete(`http://localhost:3000/kanbans/${this.task.id}`, {
                headers: {
                    token: localStorage.token
                }
            })
            .then(kanban => {
                let { data } = kanban;
                this.$emit('fetchKanban');
                this.$emit('changeLogin');
                console.log(data);
            })
            .catch(err => {
                console.log(err.response);
            })
        }
    }
}
</script>

<style>
.semi-container {
    background: blue;
    margin: 10px;
    width: 200px;
}
.mini-container {
    margin: 10px;
    width: 100px;
}
.btn-kanban ul {
    box-sizing: border-box;
    display: flex;
    
}
</style>