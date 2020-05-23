<template>
  <div class="CardContainer">
    <div class="KanbanCard" v-for="(task, i) in taskCategory" :key="i">
      <div class="title-card">{{ task.title }}</div>
      <p>{{ task.description }}</p>
      <div class="buttonGroup">
        <button
          @click.prevent="showDetail(task.id)"
          :style="{ background: category[1] }"
        >
          Show Detail
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KanbanCard",
  computed: {
    taskList() {
      return this.$store.state.taskList;
    },
    taskCategory() {
      let data = [];
      for (let i = 0; i < this.$store.state.taskList.length; i++) {
        if (this.$store.state.taskList[i].category == this.category[0]) {
          data.push(this.$store.state.taskList[i]);
        }
      }
      return data;
    }
  },
  methods: {
    showDetail(id) {
      this.$router.push(`/detail-task/${id}`);
    }
  },
  props: ["category"],
  created() {
    if (!localStorage.token) {
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    } else {
      this.$store.dispatch("fetchTaskList");
    }
  }
};
</script>

<style scoped>
.KanbanCard {
  background-color: white;
  height: 24vh;
  width: 22vw;
  margin-top: 20px;
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
  margin-bottom: 10px;
}
.title-card {
  text-transform: uppercase;
  color: #424242;
  font-weight: bold;
  font-size: 14px;
}
p {
  margin: 10px 0 10px;
  font-size: 14px;
  text-align: left;
  color: #313236;
}
.buttonGroup {
  display: flex;
  justify-content: flex-start;
}
button {
  width: 7vw;
  height: 4vh;
  border: none;
  border-radius: 20px;
  margin-top: 2vh;
  color: #313236;
  font-size: 12px;
  cursor: pointer;
  z-index: 100;
  position: inherit;
}
button:focus {
  outline: none;
}
</style>
