<template>
  <div>
    <div class="addTaskPage">
      <div class="addTaskGroup">
        <p @click.prevent="closeBtn">close</p>
        <h1>
          Add Task
        </h1>
        <div class="formInput">
          <label class="labelAddTask">
            <h4>Title:</h4>
            <input v-model="newTask.title" type="text" class="addTaskInput" />
          </label>
          <label class="labelAddTask">
            <h4>Description:</h4>
            <input
              v-model="newTask.description"
              type="text"
              class="addTaskInput"
            />
          </label>
          <input
            @click.prevent="addNewTask"
            type="submit"
            value="Add Task"
            class="submitForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import server from "../api";

export default {
  name: "AddTask",
  data() {
    return {
      selected: "",
      newTask: {
        title: "",
        description: ""
      },
    };
  },
  methods: {
    closeBtn() {
      this.$router.push("/dashboard");
    },
    addNewTask() {
      server({
        method: "post",
        url: "/tasks",
        headers: {
          token: localStorage.token,
        },
        data: {
          title: this.newTask.title,
          description: this.newTask.description
        },
      }).then((response) => {
        console.log(response);
        this.$store.dispatch("fetchTaskList");
        this.$router.push("/dashboard");
      });
    },
  },
};
</script>

<style></style>
