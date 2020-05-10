<template>
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{Task.title}}</h5>
        <p class="card-subtitle">Deadline: {{new Date(Task.due_date).toDateString()}}</p><br>
        <p class="card-text">{{Task.description}}</p>
        <section class="row justify-content-around">
            <a type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#edit">Edit</a>
            <!-- <a type="button" class="btn btn-secondary btn-sm" @click.prevent="destroy(Task.id)">Delete</a> -->
        </section>
      </div>
      <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ Task.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {{ Task.description }}
              </div>
              <div class="modal-footer justify-content-around align-items-centre">
                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" @click.prevent="destroy(Task.id)">Delete</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Card",
    components: {

    },
    props: ['Task', 'category'],
    methods: {
      destroy(id) { this.$emit('destroy', id) }
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