<template>
  <div>
    <div class="detailTaskPage">
      <div class="detailTaskGroup">
        <p @click.prevent="closeBtn" class="closeAddForm">close</p>
        <h1>
          Detail Task
        </h1>
        <div class="taskDetail">
          <p>
            Task id: <span class="idCard">{{ task.id }}</span>
          </p>
          <p>
            Task title: <span class="titleCard">{{ task.title }}</span>
          </p>
          <p>
            Task description:
            <span class="descCard">{{ task.description }}</span>
          </p>
          <p>
            Task category: <span class="categoryCard">{{ task.category }}</span>
          </p>
        </div>
        <div
          v-if="task.UserId == this.$store.state.userLogin.id"
          class="buttonGroup"
        >
          <button @click.prevent="showUpdatePage(task.id)" class="edit">
            EDIT
          </button>
          <button @click.prevent="deleteTask">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import server from "../api";

export default {
  name: "DetailTask",
  data() {
    return {
      selected: "",
      task: {},
      moveTo: false,
    };
  },
  methods: {
    closeBtn() {
      this.$router.push("/dashboard");
    },
    getTaskById() {
      server({
        method: "get",
        url: `/tasks/${this.$route.params.id}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((response) => {
          console.log(response)
          this.task = response.data.task;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask() {
      server({
        method: "delete",
        url: `/tasks/${this.$route.params.id}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((response) => {
          this.$store.dispatch("fetchTaskList");
          this.$router.push({ name: "Dashboard" });
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showUpdatePage(id) {
      this.$router.push(`/update-task/${id}`);
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getTaskById();
      this.$store.commit("SET_SIGNIN", true);
      this.$store.commit("CHANGE_USERLOGIN", {
        id: localStorage.getItem("userId")
      });
    } else {
      this.$store.commit("SET_SIGNIN", false);
    }
  },
};
</script>

<style></style>
