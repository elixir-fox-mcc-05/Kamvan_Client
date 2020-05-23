<template>
  <div class="dashboard">
    <div class="dashboardPage">
      <h3>Welcome back, {{ this.$store.state.userLogin.name }}</h3>
      <hr />
      <KanbanList></KanbanList>
    </div>
  </div>
</template>

<script>
import KanbanList from "../components/KanbanList";
import DetailTask from "../components/DetailTask";
export default {
  name: "Dashboard",
  data() {
    return {
      detailPage: false
    };
  },
  components: {
    KanbanList,
    DetailTask
  },
  created() {
    if (localStorage.token) {
      this.$store.commit("SET_LOGIN", true);
      this.$store.commit("CHANGE_USERLOGIN", {
        name: localStorage.getItem("userName"),
        id: localStorage.getItem("userId")
      });
    } else {
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.dashboardPage {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
hr {
  border: 0.1px solid rgba(0, 0, 0, 0.048);
}
h3 {
  text-align: center;
  font-size: 16px;
  margin: 0 20px 20px;
}
</style>
