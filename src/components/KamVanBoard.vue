<template>
  <div id="board" class="container">
    <button
      type="button"
      class="btn btn-primary pad"
      data-toggle="modal"
      data-target="#newTaskModal"
    >New Task</button>
    <button type="button" class="btn btn-info pad" @click="fetchTasks">Re-fetch</button>

    <div class="modal fade" id="newTaskModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Task</h5>
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
            <form @submit.prevent="addTask">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Task's title"
                  v-model="addNewTaskTitle"
                />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="textarea"
                  class="form-control"
                  placeholder="Task's description"
                  v-model="addNewTaskDescription"
                />
              </div>
              <div class="modal-footer">
                <button
                  @click="fetchTasks()"
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >Cancel</button>
                <input type="submit" class="btn btn-primary" value="create a new task" />
              </div>
              <div
                v-if="failedAddTask"
                class="alert alert-warning"
                role="alert"
              >{{ failedAddTaskMessage }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!anyTask" class="d-flex justify-content-start">
      <h2 class="text-info">Seems empty here..! lets add new Task :)</h2>
    </div>

    <div class="row d-flex flex-sm-wrap">
      <div class="col-lg" v-for="(category, index) in categories" :key="index">
        <div class="card">
          <div class="card-header" :id="category">{{ category }}</div>
          <div class="card-body">
            <KamVanCard
              v-for="task in tasks"
              :key="task.id"
              :serverUrl="serverUrl"
              :category="category"
              :categories="categories"
              :task="task"
              @authentication="authentication"
              @fetchTasks="fetchTasks"
            ></KamVanCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import KamVanCard from "./KamVanCard";

export default {
  name: "KamVanBoard",
  props: ["serverUrl"],
  components: {
    KamVanCard
  },
  data() {
    return {
      categories: ["back-log", "to-do", "doing", "done"],
      tasks: null,
      anyTask: false,
      addNewTaskTitle: "",
      addNewTaskDescription: "",
      newCreatedTask: null,
      failedAddTask: false,
      failedAddTaskMessage: ""
    };
  },
  methods: {
    authentication() {
      this.$emit("authentication", localStorage.getItem("access_token"));
    },
    fetchTasks() {
      this.failedAddTask = false;
      axios({
        method: "get",
        url: this.serverUrl + "/tasks",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.tasks = data.data.Tasks;
          if (!data.data.Tasks.length) {
            this.anyTask = false;
          } else {
            this.anyTask = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTask() {
      axios({
        method: "post",
        url: this.serverUrl + "/tasks",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.addNewTaskTitle,
          description: this.addNewTaskDescription
        }
      })
        .then(data => {
          this.newCreatedTask = data.data.CreatedTask;
          $("#newTaskModal").modal("hide");
          this.addNewTaskTitle = "";
          (this.addNewTaskDescription = ""), this.fetchTasks();
        })
        .catch(err => {
          this.failedAddTaskMessage = "";
          this.failedAddTask = true;
          let manyError = Array.isArray(err.response.data.message);
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              this.failedAddTaskMessage +=
                "!-- " + err.response.data.message[i]["message"] + " ";
            }
          } else {
            this.failedAddTaskMessage += "!-- " + err.response.data.message;
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