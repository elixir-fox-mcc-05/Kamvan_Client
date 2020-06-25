<template>
  <div>
    <div class="CardContainer">
      <div class="KanbanCard" v-for="(task, i) in taskCategory" :key="i">
        <div>Id : {{ task.id }}</div>
        <div class="title-card">Title : {{ task.title }}</div>
        <p>Description : {{ task.description }}</p>
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
      if(this.$store.state.taskList == undefined){
        this.$store.state.taskList = '';
      }
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

<style></style>
