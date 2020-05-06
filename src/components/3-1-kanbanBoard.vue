<template>
    <div class="col pl-0 pr-0">
        <div class="container" id="container1">
            <div class="card text-left">
                <div class="card-header text-dark">
                <h4>{{category}}</h4>
                </div>
                <div class="card-body align-items-center">
                    <taskCard v-for="Task in Tasks" :key="Task.id" :category="category" :Task="Task"></taskCard>
                </div>
            </div>
        </div>        
    </div>

</template>

<script>
import taskCard from './3-1-1-taskCard'


export default {
    name: 'kanbanBoard',
    components: {
        taskCard
    },
    props: [ 'category', 'Tasks' ]
}
</script>

<style>

</style>