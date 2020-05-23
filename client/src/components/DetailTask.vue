<template>
  <div class="detailTaskPage">
    <div class="detailTaskGroup">
      <p @click.prevent="closeBtn" class="closeAddForm">close</p>
      <h1>
        Detail Task
      </h1>
      <div class="taskDetail">
        <p>Task id: <span class="idCard">{{ task.id }}</span></p>
        <p>Task title: <span class="titleCard">{{ task.title }}</span></p>
        <p>Task description: <span class="descCard">{{ task.description }}</span></p>
        <p>Task category: <span class="categoryCard">{{ task.category }}</span></p>
      </div>
      <div v-if="task.UserId == this.$store.state.userLogin.id" class="buttonGroup">
        <button @click.prevent="showUpdatePage(task.id)" class="edit">EDIT</button>
        <button @click.prevent="deleteTask">DELETE</button>
        <button @click.prevent="moveToBtn" class="moveTo">Move To</button>
      </div>
    </div>
    <div v-if="moveTo == true" class="selectPage">
      <div class="selectContainer">
        <p @click.prevent="moveToBtn" class="x">X</p>
        <select v-model="selected" class="selectCategory">
          <option disabled value="">Move To</option>
          <option>Back-Log</option>
          <option>To-Do</option>
          <option>Doing</option>
          <option>Done</option>
        </select>
        <button @click.prevent="updateCategory" class="sendMove">Move</button>
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
      moveTo: false
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
        url: `/tasks/${this.$route.params.id}`
      })
        .then((response) => {
          this.task = response.data.task;
          console.log(this.task, "taskskskskskssk")
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
    },
    moveToBtn() {
      this.moveTo = !this.moveTo;
    },
    updateCategory() {
      server({
        method: "patch",
        url: `/tasks/${this.$route.params.id}/category`,
        headers: {
          token: localStorage.token
        },
        data: {
          category: this.selected,
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
    },
    showUpdatePage(id) {
      this.$router.push(`/update-task/${id}`);
    }
  },
  created() {
    this.getTaskById();
    this.$store.commit("CHANGE_USERLOGIN", {
        name: localStorage.getItem("userName"),
        id: localStorage.getItem("userId")
      });
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

.idCard {
  margin-left: 10px;
  font-size: 22px;
}

.titleCard {
  margin-left: 10px;
  font-size: 22px;
}

.descCard {
  margin-left: 10px;
  font-size: 18px;
}

.categoryCard {
  margin-left: 10px;
  font-size: 22px;
}

.buttonGroup {
  display: flex;
  justify-content: space-between;
}

button {
  background: lightcoral;
  color: #313236;
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

.edit {
  background: #52ef44;
}

.moveTo {
  background: #ade3f8;
}

.selectPage {
  background: rgba(0, 0, 0, 0.082);
  width: 100vw;
  height: 100vh;
  margin-top: -13vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selectContainer {
  background: white;
  /* margin-top: 20vh; */
  /* position: fixed; */
  width: 20vw;
  height: 20vh;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}
.x {
  position: fixed;
  margin-left: 18vw;
  color: lightcoral;
  cursor: pointer;
}
.selectCategory {
  margin-top: 30px;
  /* margin: -15px 0 0 -5vw; */
  border-radius: 20px;
  height: 30px;
  width: 13vw;
  /* position: fixed; */
}
.sendMove {
  margin-top: 25px;
  background: #ade3f8;
}
</style>
