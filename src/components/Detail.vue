<template>
    <div class="container bg-light mt-5 w-25 mb-5 pb-3">
        <div close>
            <i class="fas fa-times-circle" @click="$emit('cancel')"></i>
        </div>
        <h3 class="text-center">Detail</h3>
        <h5>Title</h5>
        <p>{{ task.title }}</p>
        <h5>Description</h5>
        <p>{{ task.description }}</p>
        <h5>Assign To</h5>
        <p>{{ task.assignee }}</p>
        <h5>Due Date</h5>
        <p>{{ task.due_date }}</p>
        <h5>Category</h5>
        <p>{{ task.category }}</p>
    </div>
</template>

<script>

export default {
    name: 'DetailCard',
    props: ['task'],    
    // data() {
    //     return{
    //         title: task.title,
    //         description: task.description,
    //         assignee: task.assignee,
    //         due_date: task.due_date,
    //         category: task.category
    //     }
    // }
}
</script>

<style scoped>
    .close {
        display: flex;
        justify-content: flex-start;
    }

    .fa-times-circle {
        color: red;
    }

    .fa-times-circle:hover {
        cursor: pointer;
    }
</style>