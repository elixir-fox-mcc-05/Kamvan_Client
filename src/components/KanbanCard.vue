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
                        <a @click.prevent="deleteKanban" href="" class="btn btn-danger">Del</a>
                        <a @click.prevent="nextCategory" href="" class="btn btn-secondary">Next</a>
                        <a @click.prevent="backCategory" href="" class="btn btn-secondary">Back</a>
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
    data() {
        return {
            next: ''
        }
    },
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
        },
        nextCategory() {
            // Seleksi category saat ini
            const status = this.task.status;
            if (status === 'Backlog') {
                this.next = 'ToDo';
            } else if ( status === 'ToDo') {
                this.next = 'Doing';
            } else if (status === 'Doing') {
                this.next = 'Done';
            } else if (status === 'Done') {
                this.next = 'Done';
            }
            // Mengerim data dengan Axios
            const token = localStorage.token;
            const axios = require('axios');
            const id = this.task.id;
            axios.patch(`http://localhost:3000/kanbans/${id}/category`, {
                status: this.next
            }, { 
                headers: { token }
                }
            )
            .then(response => {
                const { data } = response;
                const token = data.Token;
                this.$emit('fetchKanban');
                this.$emit('checkLogin');
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
        backCategory() {
            // Seleksi category saat ini
            const status = this.task.status;
            if (status === 'Backlog') {
                this.next = 'Backlog';
            } else if ( status === 'ToDo') {
                this.next = 'Backlog';
            } else if (status === 'Doing') {
                this.next = 'ToDo';
            } else if (status === 'Done') {
                this.next = 'Doing';
            }
            // Mengerim data dengan Axios
            const token = localStorage.token;
            const axios = require('axios');
            const id = this.task.id;
            axios.patch(`http://localhost:3000/kanbans/${id}/category`, {
                status: this.next
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
        }
    }
}
</script>

<style>
.semi-container {
    background: blue;
    margin: 10px;
    width: 245px;
}
.mini-container {
    margin: 10px;
    width: 100px;
}
.btn-kanban ul {
    box-sizing: border-box;
    display: flex;
}
.btn-kanban ul a {
    font-size: 5px;
}
</style>