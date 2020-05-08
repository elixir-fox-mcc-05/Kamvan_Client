<template>
  <div class="card" v-if="category === task.category">
    <div class="card-header">{{ task.title }}</div>
    <div class="card-body">
      <p class="card-text">Description : {{ task.description }}</p>
      <p class="card-text">
        Created By :
        <strong>{{ task.User.name }}</strong>
      </p>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        :data-target="'#detailTaskModal'+task.id"
      >Show Detail</button>

      <div class="modal fade" :id="'detailTaskModal'+task.id" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detail Task</h5>
              <button
                @click="fetchTasks()"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateTask(task)">
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Task's title"
                    v-model="task.title"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description:</label>
                  <input
                    type="textarea"
                    class="form-control"
                    placeholder="Task's description"
                    v-model="task.description"
                  />
                </div>
                <div class="form-group">
                  <label>Created by:</label>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>{{ task.User.name }}</strong>
                        </td>
                        <td>{{ task.User.email }}</td>
                        <td>{{ task.User.organization }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    v-if="failedUpdateTask"
                    class="alert alert-warning"
                    role="alert"
                  >{{ failedUpdateTaskMessage }}</div>
                </div>
                <div class="modal-footer">
                  <button @click="destroy(task)" type="button" class="btn btn-danger">Delete</button>
                  <button
                    @click="fetchTasks"
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >Cancel</button>
                  <input type="submit" class="btn btn-primary" value="Update Task" />
                </div>
              </form>
              <div class="modal-footer d-flex justify-content-around bg-dark">
                <button
                  v-if="task.category !== categories[0]"
                  type="button"
                  class="btn btn-warning"
                  @click="previous(task)"
                >Set Prevoius</button>
                <button
                  v-if="task.category !== categories[categories.length-1]"
                  type="button"
                  class="btn btn-success"
                  @click="next(task)"
                >Set Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "KamVanCard",
  props: ["serverUrl", "category", "categories", "task"],
  data() {
    return {
      updateTaskTitle: "",
      updateTaskDescription: "",
      updatedTask: null,
      failedUpdateTask: false,
      failedUpdateTaskMessage: "",
      destroyedTask: null
    };
  },
  methods: {
    authentication() {
      this.$emit("authentication", localStorage.getItem("access_token"));
    },
    fetchTasks() {
      this.failedUpdateTask = false;
      this.$emit("fetchTasks");
    },
    updateTask(task) {
      axios({
        method: "put",
        url: this.serverUrl + "/tasks/" + task.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: task.title,
          description: task.description
        }
      })
        .then(data => {
          this.updatedTask = data.data.UpdatedTask;
          $("#detailTaskModal" + data.data.UpdatedTask.id).modal("hide");
          this.fetchTasks();
        })
        .catch(err => {
          this.failedUpdateTaskMessage = "";
          this.failedUpdateTask = true;
          let manyError = Array.isArray(err.response.data.message);
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              this.failedUpdateTaskMessage +=
                "!-- " + err.response.data.message[i]["message"] + " ";
            }
          } else {
            this.failedUpdateTaskMessage += "!-- " + err.response.data.message;
          }
        });
    },
    destroy(task) {
      axios({
        method: "delete",
        url: this.serverUrl + "/tasks/" + task.id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.destroyedTask = data.data.DeletedTask;
          $("#detailTaskModal" + data.data.DeletedTask.id).modal("hide");
          this.fetchTasks();
        })
        .catch(err => {
          this.failedUpdateTaskMessage = "";
          this.failedUpdateTask = true;
          let manyError = Array.isArray(err.response.data.message);
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              this.failedUpdateTaskMessage +=
                "!-- " + err.response.data.message[i]["message"] + " ";
            }
          } else {
            this.failedUpdateTaskMessage += "!-- " + err.response.data.message;
          }
        });
    },
    next(task) {
      let nextCategory = "";
      for (let i = 0; i < this.categories.length; i++) {
        if (task.category === this.categories[i]) {
          nextCategory = this.categories[i + 1];
        }
      }
      axios({
        method: "put",
        url: this.serverUrl + "/tasks/" + task.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          category: nextCategory
        }
      })
        .then(data => {
          $("#detailTaskModal" + data.data.UpdatedTask.id).modal("hide");
          this.fetchTasks();
        })
        .catch(err => {
          this.failedUpdateTaskMessage = "";
          this.failedUpdateTask = true;
          let manyError = Array.isArray(err.response.data.message);
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              this.failedUpdateTaskMessage +=
                "!-- " + err.response.data.message[i]["message"] + " ";
            }
          } else {
            this.failedUpdateTaskMessage += "!-- " + err.response.data.message;
          }
        });
    },
    previous(task) {
      let previousCategory = "";
      for (let i = 0; i < this.categories.length; i++) {
        if (task.category === this.categories[i]) {
          previousCategory = this.categories[i - 1];
        }
      }
      axios({
        method: "put",
        url: this.serverUrl + "/tasks/" + task.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          category: previousCategory
        }
      })
        .then(data => {
          $("#detailTaskModal" + data.data.UpdatedTask.id).modal("hide");
          this.fetchTasks();
        })
        .catch(err => {
          this.failedUpdateTaskMessage = "";
          this.failedUpdateTask = true;
          let manyError = Array.isArray(err.response.data.message);
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              this.failedUpdateTaskMessage +=
                "!-- " + err.response.data.message[i]["message"] + " ";
            }
          } else {
            this.failedUpdateTaskMessage += "!-- " + err.response.data.message;
          }
        });
    }
  },
  created() {
    this.authentication();
    this.fetchTasks();
  }
};
</script>

<style>
</style>