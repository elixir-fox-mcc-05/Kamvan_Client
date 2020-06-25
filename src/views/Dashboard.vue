<template>
  <div>
    <router-link to="/addtask">
      <div class="KanbanAdd">
        AddTask
      </div>
    </router-link>
    <div class="dashboard">
      <div class="dashboardPage">
        <hr />
        <KanbanList></KanbanList>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanList from "../components/KanbanList";

export default {
  name: "Dashboard",
  components: {
    KanbanList,
  },
  created() {
    if (localStorage.token) {
      this.$store.commit("SET_SIGNIN", true);
    } else {
      this.$store.commit("SET_SIGNIN", false);
    }
  },
};
</script>

<style></style>
