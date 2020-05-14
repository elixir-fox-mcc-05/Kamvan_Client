<template>
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{Task.title}}</h5>
        <p class="card-subtitle">Deadline: {{new Date(Task.due_date).toDateString()}}</p><br>
        <p class="card-text">{{Task.description}}</p>
        <section class="row justify-content-around">
            <a type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" :data-target="EditID">Edit</a>
        </section>
      </div>
      <EditModal
        :Task="Task"
        @update="update"
        @destroy="destroy"
      >
      </EditModal>
  </div>
</template>

<script>
import EditModal from '../components/EditModal'

export default {
    name: "Card",
    components: {
      EditModal
    },
    props: ['Task', 'category'],
    data() {
      return { EditID: `#EditModal${this.Task.id}` }
    },
    methods: {
      destroy(id) { this.$emit('destroy', id) },
      update(id, Task) { this.$emit('update', id, Task) }
    }
}
</script>

<style scoped>
.card {
    min-width: 200px;
    max-width: 400px;
    width: auto;
    margin: 2px;
}
.btn-outline-primary {
  min-width: 50px;
  min-height: 20px;
  color: blue;
}
</style>