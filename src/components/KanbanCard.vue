<template>
     <div class="container mini-container">
        <div class="card">
            <div class="card-header text-white bg-primary">
                {{ task.title }}
            </div>
            <div class="card-body">
                <p class="card-text">{{ task.description }}</p>
                <p class="card-text">{{ task.point }}</p>
                <div class="btn-kanban">
                    <a href="#" class="btn btn-danger">Edit</a>
                    <a href="#" class="btn btn-danger">Delete</a>
                    <a href="#" class="btn btn-danger">Move</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KanbanCard', 
    props: ['task']
}
</script>

<style>

</style>