<template>
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{Task.title}}</h5>
        <p class="small card-subtitle">Due Date: {{new Date(Task.due_date).toDateString()}}</p><br>
        <p class="card-text">{{Task.description}}</p>
        <section class="row justify-content-around">
            <a class="btn btn-primary btn-sm">Edit</a>
            <a class="btn btn-secondary btn-sm">Delete</a>
        </section>
    </div>
  </div>
</template>

<script>
export default {
    name: "Card",
    components: {

    },
    props: ['Task', 'category']
}
</script>

<style scoped>
.card {
    min-width: 200px;
    width: auto;
    margin: 2px;
}
</style>