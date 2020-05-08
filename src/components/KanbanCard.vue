<template>
    <div>
        <div class="container mini-container mt-2 mb-2">
            <div class="card semi-container">
                <div class="card-header text-white bg-primary font-weight-bold header">
                    {{ task.title }}
                    <div>
                        <a @click.prevent="backCategory" href="" class="btn btn-primary">
                            <i class="fas fa-angle-left"></i>
                        </a>
                        <a @click.prevent="nextCategory" href="" class="btn btn-primary">
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">Decription: {{ task.description }}</p>
                    <p class="card-text">Point: {{ task.point }}</p>
                    <div class="btn-kanban">
                        <a @click.prevent="showEditForm" href="" class="btn btn-warning">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a @click.prevent="deleteKanban" href="" class="btn btn-danger">
                             <i class="fas fa-trash-alt"></i>
                        </a>
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
            const Swal = require('sweetalert2');
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
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
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
                    .catch(err => {
                        err = err.response
                        let { data } = err;
                        let error = data.errors;
                        const Swal = require('sweetalert2');
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error[0].message
                        })
                    })
                }
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
                const Swal = require('sweetalert2');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error[0].message
                })
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
                const Swal = require('sweetalert2');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error[0].message
                })
            })
        }
    }
}
</script>

<style>
.btn-kanban {
    display: flex;
    justify-content: space-between;
    align-self: auto;
}
.header {
    display: flex;
    justify-content: space-between;
}
</style>