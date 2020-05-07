<template>
  <div class="container">
    <Navbar></Navbar>
    <KanbanList :tasks="tasks"></KanbanList>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import KanbanList from "./components/KanbanList";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      tasks: [],
    };
  },
  components: {
    Navbar,
    KanbanList,

  },
  methods: {
    fetchTasks() {
      axios({
        method: "get",
        url: "http://localhost:3000/tasks",
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped></style>
