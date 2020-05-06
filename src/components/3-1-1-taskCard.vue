<template>
    <div class="card mb-3 bg-light" style="width: 16rem;" v-if="Task.category == category">
        <div class="card-body">
            <h5 class="card-header">{{Task.title}}</h5>
            <p class="card-text text-left font-weight-light">Priority: {{Task.priority}}</p>
            <p class="card-text text-left font-weight-light">Deadline: {{Task.deadline}}</p>
            <p class="card-text text-left font-weight-light">Assign To: {{Task.AssigneeDetail.name}}</p>
            <a href="#" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalDetailTask">Show Detail</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'taskCard',
    props: ['Task', 'category'],
    methods: {

    }
}
</script>

<style>

</style>