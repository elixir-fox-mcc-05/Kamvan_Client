<template>
  <div class="detailTaskPage">
    <div class="detailTaskGroup">
      <p @click.prevent="closeBtn" class="closeAddForm">close</p>
      <h1>
        Detail Task
      </h1>
      <div class="taskDetail">
        <p>Task id: {{ task.id }}</p>
        <p>Task title: {{ task.title }}</p>
        <p>Task description: {{ task.description }}</p>
        <p>Task category: {{ task.category }}</p>
      </div>
      <div class="buttonGroup">
        <button @click.prevent="deleteTask">DELETE</button>
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
      task: {}
    };
  },
  methods: {
    closeBtn() {
      this.$router.push("/dashboard");
    },
    detailBtn() {
      this.$emit("detailBtn");
    },
    getTaskById() {
      server({
        method: "get",
        url: `/tasks/${this.$route.params.id}`,
      })
        .then((response) => {
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
          token: localStorage.token
        }
      })
        .then((response) => {
          this.$store.dispatch("fetchTaskList");
          this.$router.push({ name: "Dashboard" });
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  created() {
    this.getTaskById();
  }
};
</script>

<style scoped>
.detailTaskPage {
  height: 92vh;
  width: 100vw;
  padding: 5vh 10px 0;
  display: flex;
  justify-content: center;
  background: #f3f7f9;
  z-index: 120;
  overflow: hidden;
}

.detailTaskGroup {
  width: 35vw;
  height: 50vh;
  background: white;
  display: flex;
  margin-top: 10vh;
  flex-direction: column;
  padding: 30px 30px 0;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}

.closeAddForm {
  padding-left: 26vw;
  font-size: 18px;
  position: absolute;
  cursor: pointer;
  color: lightcoral;
  margin-top: -2px;
}

h1 {
  text-transform: uppercase;
  color: #313236;
  font-size: 20px;
  margin-left: -21.5vw;
  margin-bottom: 10px;
}

.taskDetail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-top: 10px;
}

p {
  margin-top: 10px;
}

.buttonGroup {
  display: flex;
  justify-content: center;
}

button {
  background: lightcoral;
  color: white;
  border: none;
  height: 4vh;
  width: 100px;
  font-size: 14px;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 8vh;
  /* margin-left: 40%; */
}

button:hover {
  background: #1b80ce;
}

button:focus {
  outline: none;
}
</style>
