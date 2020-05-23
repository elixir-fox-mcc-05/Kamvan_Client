<template>
  <div class="addTaskPage">
    <div class="addTaskGroup">
      <p @click.prevent="closeBtn" class="closeAddForm">close</p>
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
        <label class="labelAddTask">
          <h4>Category:</h4>
          <select v-model="selected" class="selectCategory">
            <option disabled value="">Choose category</option>
            <option>Back-Log</option>
            <option>To-Do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </label>
        <label class="labelAddTask organization">
          <h4>Organization:</h4>
          <input
            v-model="newTask.organization"
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
        description: "",
        category: "",
        organization: "Hacktiv8"
      }
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
          token: localStorage.token
        },
        data: {
          title: this.newTask.title,
          description: this.newTask.description,
          category: this.selected,
          organization: this.newTask.organization
        }
      }).then((response) => {
        this.$store.dispatch("fetchTaskList");
        this.$router.push("/dashboard");
        console.log(response);
      });
    }
  }
};
</script>

<style scoped>
.addTaskPage {
  height: 100vh;
  width: 100vw;
  padding: 5vh 10px 0;
  display: flex;
  justify-content: center;
  position: fixed;
  background: #f5f6fa;
  z-index: 120;
}

.addTaskGroup {
  width: 35vw;
  height: 76vh;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}

.closeAddForm {
  display: flex;
  padding-left: 29vw;
  font-size: 18px;
  position: absolute;
  cursor: pointer;
  color: lightcoral;
}

h1 {
  text-transform: uppercase;
  color: #313236;
  font-size: 20px;
  margin-left: -23vw;
  margin-bottom: 10px;
}

.labelAddTask {
  display: block;
  width: 24vw;
  margin: 15px 30px;
  text-align: center;
}

h4 {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  color: #778192;
}
.organization {
  margin-top: 60px;
}
.selectCategory {
  margin: -15px 0 0 -5vw;
  border-radius: 20px;
  height: 30px;
  width: 250px;
  position: fixed;
}
.addTaskInput {
  width: 125%;
  margin-top: 20px;
  font-size: 16px;
  border-width: 0px;
  border-bottom: 1px solid #31323623;
  text-align: left;
  margin-bottom: 20px;
  font-size: 18px;
}

textarea:focus,
input:focus {
  outline: none;
  border-bottom: 1px solid #313236;
}

.submitForm {
  background: #2096f3;
  color: white;
  text-transform: uppercase;
  border: none;
  height: 30px;
  width: 250px;
  font-size: 14px;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
}

.submitForm:hover {
  background: #1b80ce;
}
</style>
