<template>
    <div class="container w-25 bg-white">
        <p>Are you sure want to delete this task?</p>
        <div>
            <button class="btn btn-primary btn-sm" @click="$emit('cancel')">no, take me back</button>
            <button class="btn btn-danger btn-sm" @click="deleteTask(deleted)">yes, i'm sure</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Warn',
    props: ['deleted'],
    methods: {
        deleteTask(id) {
            const { access_token } = localStorage;
            axios.delete(`https://server-akbar-kanban.herokuapp.com/tasks/${id}`, {
                params: {
                    id
                },
                headers: {
                    access_token
                }
            })
                .then(res => {
                    this.$emit('renew');
                })
                .catch(err => {
                    this.$emit('tempError', err);
                })
        }
    }
}
</script>

<style scoped>
    .container {
        width: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px;
    }
</style>