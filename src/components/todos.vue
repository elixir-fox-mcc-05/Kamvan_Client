<template>
    <div class="card">
        <div class="card-header" style="background-color: orange;">
            <p class="title-card">To-do</p>
        </div>
        <div v-if="todos.Task">
            <innerCard  v-for="todo in todos.Task" :key="todo.id" :data="todo"></innerCard>
        </div>
    </div>
</template>

<script>
import innerCard from "./innercard";
export default {
    name : "todos",
    components : {
        innerCard
    },
    props : ["todos"]
};
</script>

<style>

</style>